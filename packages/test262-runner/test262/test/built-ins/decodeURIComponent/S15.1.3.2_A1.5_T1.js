// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: If B = 1110xxxx (n = 3) and (k + 2) + 6 >= length, throw URIError
esid: sec-decodeuricomponent-encodeduricomponent
description: Complex tests. B = [0xE0 - 0xEF]
includes: [decimalToHexString.js]
---*/

var errorCount = 0;
var count = 0;
var indexP;
var indexO = 0;

for (var index = 0xE0; index <= 0xEF; index++) {
  count++;
  var str = "";
  var result = true;
  for (var len = 0; len < 6; len++) {
    var hex = decimalToPercentHexString(index);
    try {
      decodeURIComponent(hex + str);
    } catch (e) {
      if ((e instanceof URIError) === true) continue;
    }
    result = false;
    str = str + "1";
  }
  if (result !== true) {
    if (indexO === 0) {
      indexO = index;
    } else {
      if ((index - indexP) !== 1) {
        if ((indexP - indexO) !== 0) {
          var hexP = decimalToHexString(indexP);
          var hexO = decimalToHexString(indexO);
          $ERROR('#' + hexO + '-' + hexP + ' ');
        }
        else {
          var hexP = decimalToHexString(indexP);
          $ERROR('#' + hexP + ' ');
        }
        indexO = index;
      }
    }
    indexP = index;
    errorCount++;
  }
}

if (errorCount > 0) {
  if ((indexP - indexO) !== 0) {
    var hexP = decimalToHexString(indexP);
    var hexO = decimalToHexString(indexO);
    $ERROR('#' + hexO + '-' + hexP + ' ');
  } else {
    var hexP = decimalToHexString(indexP);
    $ERROR('#' + hexP + ' ');
  }
  $ERROR('Total error: ' + errorCount + ' bad Unicode character in ' + count + ' ');
}