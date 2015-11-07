"use strict";

var sArr = ["cat", "dog", "dog", "dog", "dog", "fish", "monkey", "monkey", "chair", "stool"];
var tArr = ["katt", "hund", "bikkje", "sjefer", "puddel", "fish", "ape", "apekatt", "stol", "stol"];

findInconsistent(sArr, tArr);

function arrayUnique (a) {
  return a.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c);
    return p;
  }, []);
}

function findInconsistent(arr1, arr2) {

  var obj = {};
  // Find inconsistent translations in source/target or target/source
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr1.length; j++) {
      // not same item && strlen same && identical text content
      if ((i != j) && (arr1[i].length == arr1[j].length) && (arr1[i] == arr1[j])) {
        if (arr2[i] != arr2[j]) {
          if (i <= j) {
            console.log(`${arr2[i]} (index ${i}) is different from ${arr2[j]} (index ${j})`);
            obj[i] = j;
          }
        }
      }
    }
  }
  var outArr = [];
  // Extract related key pairs
  console.log(obj);
  for (let key1 of Object.keys(obj)) {
    for (let key2 of Object.keys(obj)) {
      if (obj[key1] == obj[key2] && key1 != key2) {
        var tmpStr = key1 + key2 + obj[key1] + obj[key2];
        tmpStr = arrayUnique(tmpStr.split("")).join("");
        outArr.push(tmpStr);
        delete obj[key1];
        delete obj[key2];
      }
    }
  }
  // Extract remaining unrelated key pairs
  for (let key1 of Object.keys(obj)) {
    outArr.push(key1 + obj[key1]);
  }
  // "Indexes _ in sArr are inconsistent with source equivalent".console.log for outArr;
  for (let i = 0; i < outArr.length; i++) {
    outArr[i] = outArr[i].split("");
  }
  return outArr;
}
