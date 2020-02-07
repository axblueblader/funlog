module.exports = {
  logger: console,
  log: (logger, message) => {
    logger.info(message);
  },
  logErr: (logger, message) => {
    logger.error(message);
  },
  reThrowErr: true
};
