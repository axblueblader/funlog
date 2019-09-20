module.exports = function(func, options) {
  const { logger, log, preEx, durEx, postEx, logErr, reThrowErr } = options;
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
      logErr(logger, exception);
      if (reThrowErr) {
        throw exception;
      }
    }
    return output;
  };
};
