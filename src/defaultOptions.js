module.exports = {
  logger: console,
  log: (logger, message) => {
    logger.info(message);
  },
  preEx: "Before",
  durEx: "During",
  postEx: "After",
  logErr: (logger, message) => {
    logger.error(message);
  },
  reThrowErr: true
};
