module.exports = function(func, options) {
  const { logger, log, preEx, durEx, postEx, logErr, reThrowErr } = options;
  return function(...args) {
    // Function name

    // Input (arguments)
    let argsMsg = "";
    args.forEach(arg => {
      argsMsg += `${typeof arg}:${JSON.stringify(arg)};`;
    });

    let output = null;
    let timestamp = null;
    try {
      timestamp = new Date();
      output = func(...args);
    } catch (exception) {
      logErr(logger, exception);
      if (reThrowErr) {
        throw exception;
      }
    } finally {
      const msg = `[funlog] [${timestamp}] [${func.name ||
        "Anonymous function"}] called with:[${argsMsg}] [${preEx}] [${durEx}] [${postEx}] output [${JSON.stringify(
        output
      )}]`;

      log(logger, msg);
    }
    return output;
  };
};
