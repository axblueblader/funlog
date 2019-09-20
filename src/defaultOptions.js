module.exports = {
  logger: console,
  log: (logger, message) => {
    logger.info(message);
  },
  preEx: "Input: ",
  durEx: "Process: ",
  postEx: "Output: ",
  logErr: (logger, message) => {
    logger.error(message);
  },
  reThrowErr: true
};
