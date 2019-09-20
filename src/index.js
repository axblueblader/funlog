const defaultOptions = require("../src/defaultOptions");
const parseOptions = require("../src/parseOptions");
const wrapFunc = require("../src/wrapFunc");
const wrapObj = require("../src/wrapObj");

module.exports = function(...args) {
  if (args.length === 0) {
    console.error("[funlog] Error: Too few arguments");
    return null;
  }
  if (args.length > 2) {
    console.error("[funlog] Error: Too many arguments");
    return null;
  }

  let func = null;
  let obj = null;
  let options = defaultOptions;

  if (args[1]) {
    if (typeof args[1] !== "object") {
      console.error("[funlog] Error: Second argument must be an object");
      return null;
    } else {
      options = parseOptions(defaultOptions, args[1]);
    }
  }

  if (typeof args[0] === "function") {
    func = args[0];
    return wrapFunc(func, options);
  } else if (typeof args[0] === "object") {
    obj = args[0];
    return wrapObj(obj, options, wrapFunc);
  } else {
    console.error(
      "[funlog] Error: First argument must be a function or object"
    );
    return null;
  }
};
