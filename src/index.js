function wrapFunc(func, options) {
  const defaultlogger = console;
  const defaultLog = function(logger, string) {
    logger.info(string);
  };

  const logger = options.logger || defaultlogger;
  const log = options.log || defaultLog;

  const preEx = options.preEx || "Input: ";
  const durEx = options.durEx || "Process: ";
  const postEx = options.postEx || "Output: ";
  return function(...args) {
    // Function name
    const msg = `[funlog] called ${func.name}:`;
    log(logger, msg);

    // Input (arguments)
    log(logger, preEx);
    args.forEach(arg => {
      const msg = `${typeof arg} : ${JSON.stringify(arg)}`;
      log(logger, msg);
    });

    // Process (inner logs)
    log(logger, durEx);
    const output = func(...args);

    // Output (result)
    log(logger, postEx);
    log(logger, JSON.stringify(output));

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
  let options = {};
  if (typeof args[0] === "function") {
    func = args[0];
  } else if (typeof args[0] === "object") {
    obj = args[0];
  } else {
    console.error(
      "[funlog] Error: First argument must be a function or object"
    );
    return null;
  }
  if (args[1]) {
    if (typeof args[1] !== "object") {
      console.error("[funlog] Error: Second argument must be an object");
      return null;
    } else {
      options = args[1];
    }
  }

  if (func !== null) {
    return wrapFunc(func, options);
  } else if (obj !== null) {
    return wrapObj(obj, options);
  }
};
