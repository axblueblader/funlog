const { expect } = require("chai");
const sinon = require("sinon");
const funlog = require("../src/index");
const winston = require("winston");

describe("Use custom logger in option", function() {
  it("should log function to console", function() {
    const func = sinon.fake.returns(0);
    const consoleLogger = winston.createLogger({
      transports: [new winston.transports.Console()]
    });
    const spy = sinon.spy(consoleLogger, "info");
    const opts = {
      logger: consoleLogger
    };
    const res = funlog(func, opts);
    res();
    expect(spy.callCount).to.be.equal(5);
    expect(spy.lastCall.calledWith(JSON.stringify(0))).to.be.true;
  });

  it("should log function to file", function() {
    const func = sinon.fake.returns(0);
    const fileLogger = winston.createLogger({
      transports: [new winston.transports.File({ filename: "combined.log" })]
    });
    const spy = sinon.spy(fileLogger, "info");
    const opts = {
      logger: fileLogger
    };
    const res = funlog(func, opts);
    res();
    expect(spy.callCount).to.be.equal(5);
    expect(spy.lastCall.calledWith(JSON.stringify(0))).to.be.true;
  });
});
