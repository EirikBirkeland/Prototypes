"use strict";

Array.prototype.isAoA = function() {
  if (this[0] instanceof Array) return true;
  else return false;
}

var sArr = ["cat", "dog", "dog", "dog", "dog", "fish", "monkey", "monkey", "chair", "stool"];
var tArr = ["katt", "hund", "bikkje", "sjefer", "puddel", "fish", "ape", "apekatt", "stol", "stol"];

console.log("Final output is " + findInconsistent(sArr, tArr));

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
    console.log("The object's contents are: ");
    console.log(obj);

    var outArr = [];

    for (let key of Object.keys(obj)) {
      outArr.push([key, String(obj[key])]);
    }
    outArr = mergeArrays(outArr);
    //  outArr = outArr.isAoA() ? outArr.map(a => arrayUnique(a)) : arrayUnique(outArr);
    outArr = outArr.map(a => arrayUnique(a));
    return outArr;
  }
  // set aside for now

// GOOD
function arrayUnique(a) { // IN ["12", "12"]
    return a.reduce(function(p, c) {
      if (p.indexOf(c) < 0) p.push(c);
      return p;
    }, []);
  } // OUT ["12"]

// GOOD
function mergeArrays(AoA) { // IN ["12", "21", "34"] OUT ["1221", "34"]
  if (!AoA.isAoA()) throw (AoA + " is not an array!");
  //AoA is [[1,2], [2,3], [1,4]]
  for (let i = 0; i < AoA.length; i++) {
    for (let j = 0; j < AoA.length; j++) {
      if (i != j && anyMatch(AoA[i], AoA[j])) {
        AoA[i] = AoA[i].concat(AoA[j]); // ok
        AoA.splice(j, 1); // ok
      }
    }
  }
  // AoA = arrayUnique(AoA); //Output should be [[1,2,3,4]]
  return AoA;

  function anyMatch(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] == arr2[j]) return true;
      }
    }
    return false;
  }