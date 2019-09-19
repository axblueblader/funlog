const funlog = require("../src/index");

function sum(a, b) {
  return a + b;
}

function printArray(arr) {
  arr.forEach(value => {
    console.log(value);
  });
}

function printObject(obj) {
  console.log(obj);
  return obj;
}

sum = funlog(sum);
sum(1, 2);
funlog(printArray)([1, 2, 3, 4]);
funlog(printObject)({ a: "h", h: "a" });
