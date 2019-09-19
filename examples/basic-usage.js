const funlog = require("../src/index");

// Log a function
function sum(a, b) {
  return a + b;
}

const loggedSum = funlog(sum);
loggedSum(1, 2);

// Log an anonymous function
setTimeout(
  funlog(() => {
    console.log("Inside of anonymous function");
  }),
  0
);

// Log all functions of an object
const obj = {
  sum: (a, b) => {
    return a + b;
  },
  minus: (a, b) => {
    return a - b;
  },
  unchanged: "property"
};

const loggedObj = funlog(obj);
loggedObj.sum(1, 2);
loggedObj.minus(3, 4);
console.log(loggedObj.unchanged, obj.unchanged);
