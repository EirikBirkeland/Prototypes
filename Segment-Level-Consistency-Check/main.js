"use strict";

var sArr = ["cat", "dog", "dog", "dog", "dog", "fish", "monkey", "monkey", "chair", "stool"];
var tArr = ["katt", "hund", "bikkje", "sjefer", "puddel", "fish", "ape", "apekatt", "stol", "stol"];

//var sArr = ["katt", "dog", "dog"];
//var tArr = ["katt", "hund", "bikkje"];

console.log("Final output is " + findInconsistent(sArr, tArr));

Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
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
  console.log("The object's content is: ");
  console.log(obj);
  
  var outArr = [];
  // Move to array:
  for (let key of Object.keys(obj)) {
    outArr.push([key, String(obj[key])]);
  }
  console.log(outArr);

  outArr = mergeArrays(outArr);
  outArr[0] = arrayUnique(outArr[0]);
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
function mergeArrays(AoA) { // Merge arrays with any common items
  if (!AoA instanceof Array) throw (AoA + " is not an array!");
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
}