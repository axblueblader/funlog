module.exports = function(func, options) {
  const { logger, log, preEx, durEx, postEx, logErr, reThrowErr } = options;
  return function(...args) {
    // Function name

    // Input (arguments)
    let argsMsg = "";
    args.forEach(arg => {
      argsMsg += `${typeof arg} : ${JSON.stringify(arg)};`;
    });

    let output = null;
    try {
      output = func(...args);

      const msg = `[funlog] [${new Date()}] [${func.name ||
        "Anonymous function"}] called with:[${argsMsg}] [${preEx}] [${durEx}] [${postEx}] output [${JSON.stringify(
        output
      )}]`;

      log(logger, msg);
    } catch (exception) {
      logErr(logger, exception);
      if (reThrowErr) {
        throw exception;
      }
    }
    return output;
  };
};
