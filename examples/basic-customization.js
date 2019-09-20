const funlog = require("../src/index");
const winston = require("winston");

// Pass in a custom logger
const sum = (a, b) => {
  return a + b;
};
const fileLogger = winston.createLogger({
  transports: [new winston.transports.File({ filename: "combined.log" })]
});

let opts = {
  logger: fileLogger
};
const loggedSum = funlog(sum, opts);
loggedSum(1, 2);

// Pass in a custom log function

const minus = (a, b) => {
  return a - b;
};

opts = {
  log: (logger, message) => {
    logger.error(message);
  }
};

const loggedMinus = funlog(minus, opts);
loggedMinus(3, 4);
