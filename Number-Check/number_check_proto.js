"use strict";
let say = console.log;
let seg1 = "I have 4 cats and 3 dogs";
let seg2 = "Jeg har fire katter og 3 hunder" ;
say("Test string is: " + seg1);
say("Test string is: " + seg2);

let m1 = seg1.match(/([0-9]+)/g);
let m2 = seg2.match(/([0-9]+)/g);

const arabicLatin = {
   "1":"en|éng", "2":"to",
   "3":"tre","4":"fire","5":"fem","6":"seks","7":"sju|syv","8":"åtte","9":"ni","10":"ti","11":"elleve","12":"tolv"}

   // approach: organize first into general, then wrap into specific
   function lookupInHashAndReturnEquivalents (string, hash, arr) {
      if(!arr) var arr = [];
      for(let key in hash){
         if(hash.hasOwnProperty(key)){
            // First do initial check
            if(string.match(hash[key])){
               var regexVer = new RegExp("\\b(?:" + hash[key] + ")\\b", "i");
               if(string.match(regexVer)){
                  arr.push(hash[key]);
               }
            }
         }
      }
      return arr;
   }

   function addLatinNumbers () {
      return lookupInHashAndReturnEquivalents (seg2, arabicLatin, m2);
   }

   m2 = addLatinNumbers(seg2, arabicLatin, m2);
   say(m2);

   //m1 = removeExceptions(m1);
   ////m2 = removeExceptions(m2);
   say(compareSimple(m1,m2));
   //say(compareSimple(m2,m1));
   say(compareImprov(m1,m2));
   //say(compareNumCount(m1, m2));*/

// TODO: use hash to count the number of instances.
function compareSimple (arr1, arr2) {
   let missing = [];
   for(let i=0;i<arr1.length;i++){
      for(let j=0;j<arr2.length;j++){
         if(arr1[i] == arr2[j]) {
            break;
         }
         if(j == arr2.length-1) missing.push(arr1[i] + " was not found in arr2");
      }
   }
   return missing.length > 0 ? missing : "OK"; 
}

function compareImprov (arr1, arr2) {
   let missing = [];
   for(let i=0;i<arr1.length;i++){
      for(let j=0;j<arr2.length;j++){
         if(arr2[j] == arr1[i]) {
            break;
         } else if(arr2[j] == arabicLatin[arr1[i]]) {
            //say(`${arr2[j]} matches ${arabicLatin[arr1[i]]}`);
            say("The literal number " + arabicLatin[arr1[i]] + " matches " + arr1[i]);
            break;
         }
         if(j == arr2.length-1) missing.push(arr1[i] + " was not found in arr2");
      }
   }
   return missing.length > 0 ? missing : "OK"; 
}

function compareNumCount (arr1, arr2) {
   if(arr1.length > arr2.length) return "arr2 is shorter than arr1";
   if(arr1.length < arr2.length) return "arr2 is longer than arr1";
}

function removeExceptions (arr) {
   for(let i=0;i<arr.length;i++){
      if(arr[i].match(/1254346/)){
         arr[i].splice(1);
      }
   }
   return "unimplemented.";
}


