const funlog = require("../src/index");

// Log exception and rethrow
function div() {
  throw "Error";
}

const loggedDiv = funlog(div);

try {
  loggedDiv();
} catch (err) {
  // It should log out 2 "Error" line
  console.log(err);
}

const opts = {
  reThrowErr: false
};

const loggedDivOne = funlog(div, opts);
try {
  loggedDivOne();
} catch (err) {
  // It won't reach this line
  // Because the exception has been swallowed
  console.log("This is not reached");
}

const optsLogErr = {
  // Customize how errors are logged
  logErr: function(logger, message) {
    logger.info("Customized: " + message);
  }
};
const loggedDivCustomErr = funlog(div, optsLogErr);

try {
  loggedDivCustomErr();
} catch (err) {
  console.log(err);
}
