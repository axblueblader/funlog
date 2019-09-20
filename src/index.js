function wrapFunc(func, options) {
  const logger = options.logger;
  const log = options.log;

  const preEx = options.preEx;
  const durEx = options.durEx;
  const postEx = options.postEx;
  const { logErr, reThrowErr } = options;
  return function(...args) {
    // Function name
    const msg = `[funlog] called ${func.name || "Anonymous function"}:`;
    log(logger, msg);

    // Input (arguments)
    log(logger, preEx);
    args.forEach(arg => {
      const msg = `${typeof arg} : ${JSON.stringify(arg)}`;
      log(logger, msg);
    });

    // Process (inner logs)
    log(logger, durEx);
    let output = null;
    try {
      output = func(...args);

      // Output (result)
      log(logger, postEx);
      log(logger, JSON.stringify(output));
    } catch (exception) {
      logErr(logger, exception.message);
      if (reThrowErr) {
        throw exception;
      }
    }
    return output;
  };
}

function wrapObj(holder, options) {
  const res = {};
  Object.keys(holder).forEach(key => {
    if (typeof holder[key] !== "function") {
      res[key] = holder[key];
    } else {
      res[key] = wrapFunc(holder[key], options);
    }
  });
  return res;
}

const defaultOptions = require("../src/defaultOptions");
const parseOptions = require("../src/parseOptions");

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
    return wrapObj(obj, options);
  } else {
    console.error(
      "[funlog] Error: First argument must be a function or object"
    );
    return null;
  }
};
