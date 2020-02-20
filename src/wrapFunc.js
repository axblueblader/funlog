module.exports = function(func, options) {
  const { logger, log, logErr, reThrowErr } = options;
  return function(...args) {
    // Function name

    // Input (arguments)
    let argsMsg = "";
    args.forEach(arg => {
      argsMsg += `${typeof arg}:${JSON.stringify(arg)};`;
    });

    let output = null;
    let timestamp = null;
    let errObj = null;
    try {
      timestamp = new Date().toUTCString();
      output = func(...args);
    } catch (exception) {
      errObj = exception;
      logErr(logger, exception);
      if (reThrowErr) {
        throw exception;
      }
    } finally {
      const msg = `[funlog] [${timestamp}] [${func.name ||
        "Anonymous function"}] called with:[${argsMsg}] output [${JSON.stringify(
        output
      )}] exception [${errObj}]`;

      log(logger, msg);
    }
    return output;
  };
};
