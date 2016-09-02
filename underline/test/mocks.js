'use strict';

// Utilities
function returnArgs () {
  return arguments;
}

// Mocks
var mocks = {
  arr: ['a','b','c','d'], // >= 4 elements, all should be truthy
  obj: {a:1,b:2,c:3,d:4}, // >= 4 values, all should be truthy
  halfTruthyArr: [false,'b',false,'d'], // >= 4 elements, half should be false
  halfTruthyObj: {a:1,b:false,c:3,d:false}, // >= 4 values, half should be false
  string: 'This is a string.',
  reverseString: function (string) {
    if (typeof string === 'string') return string.split('').reverse().join('');
  }
};

mocks.argumentsObj = returnArgs.apply(null, mocks.arr);
mocks.stringifiedArrElms = mocks.arr.join('');
mocks.objKeysArr = Object.keys(mocks.obj);
mocks.objValuesArr = mocks.objKeysArr.map(function (key) {
  return mocks.obj[key];
});
mocks.stringifiedObjKeys = mocks.objKeysArr.join('');
mocks.stringifiedObjValues = mocks.objValuesArr.join('');
mocks.halfTruthyObjKeysArr = Object.keys(mocks.halfTruthyObj);
mocks.halfTruthyObjValuesArr = mocks.halfTruthyObjKeysArr.map(function (key) {
  return mocks.halfTruthyObj[key];
});
mocks.reversedString = mocks.reverseString(mocks.string);

// Allow mocks to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = mocks;
}
