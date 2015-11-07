"use strict";

Array.prototype.isAoA = function() {
  if (this[0] instanceof Array) return true;
  else return false;
}

Array.prototype.anyMatch = function(arr2) {
  for (let i = 0; i < this.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (this[i] == arr2[j]) return true;
    }
  }
  return false;
}

var sArr = ["cat", "dog", "dog", "dog", "dog", "fish", "monkey", "monkey", "chair", "stool"];
var tArr = ["katt", "hund", "bikkje", "sjefer", "puddel", "fish", "ape", "apekatt", "stol", "stol"];

console.log("Final output is :");
var result = findInconsistent(sArr, tArr);
for(let i=0;i<result.length;i++){
  console.log("Indices " + result[i] + " are inconsistently translated");
}

var result = findInconsistent(tArr, sArr);
for(let i=0;i<result.length;i++){
  console.log("Indices " + result[i] + " are translated the same way, but source segments are different");
}

function findInconsistent(arr1, arr2) {
  // Find inconsistent translations in source/target or target/source
  var obj = generateObj(arr1, arr2);
  var outArr = [];
  outArr = objToArr(obj, outArr);
  outArr = mergeArrays(outArr);
  outArr = outArr.isAoA() ? outArr.map(a => arrayUnique(a).sort()) : arrayUnique(outArr).sort();
  return outArr;
}

function generateObj(arr1, arr2) {
  var obj = {};
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr1.length; j++) {
      // not same item && strlen same && identical text content
      if ((i != j) && (arr1[i].length == arr1[j].length) && (arr1[i] == arr1[j])) {
        if (arr2[i] != arr2[j]) {
          if (i <= j) {
            // console.log(`${arr2[i]} (index ${i}) is different from ${arr2[j]} (index ${j})`);
            obj[i] = j;
          }
        }
      }
    }
  }
  return obj;
}

function objToArr(obj, arr) {
  for (let key of Object.keys(obj)) {
    arr.push([key, String(obj[key])]);
  }
  return arr;
}

function arrayUnique(a) { // IN ["12", "12"]
    return a.reduce(function(p, c) {
      if (p.indexOf(c) < 0) p.push(c);
      return p;
    }, []);
  } // OUT ["12"]

function mergeArrays(AoA) { // IN ["12", "21", "34"] OUT ["1221", "34"]
  if (!AoA.isAoA()) throw (AoA + " is not an array!");
  for (let i = 0; i < AoA.length; i++) {
    for (let j = 0; j < AoA.length; j++) {
      if (i != j && AoA[i].anyMatch(AoA[j])) {
        AoA[i] = AoA[i].concat(AoA[j]);
        AoA.splice(j, 1);
      }
    }
  }
  return AoA;
}