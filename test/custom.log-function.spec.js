const { expect } = require("chai");
const sinon = require("sinon");
const funlog = require("../src/index");

describe("Use custom log function in options", function() {
  let sandbox;
  this.beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  this.afterEach(function() {
    sandbox.restore();
  });

  it("should log error to console", function() {
    const func = sandbox.fake.returns(0);
    const spy = sandbox.spy(console, "error");
    const opts = {
      logger: console,
      log: function(logger, message) {
        logger.error(message);
      }
    };
    const res = funlog(func, opts);
    res();
    expect(spy.callCount).to.be.equal(1);
    expect(spy.lastCall.args[0].search("[0]")).to.be.not.equal(-1);
    spy.restore();
  });

  it("should log different string to console", function() {
    const func = sandbox.fake.returns(0);
    const spy = sandbox.spy(console, "error");
    const randomStr = "123";
    const opts = {
      logger: console,
      log: function(logger, message) {
        logger.error(randomStr);
      }
    };
    const res = funlog(func, opts);
    res();
    expect(spy.callCount).to.be.equal(1);
    expect(spy.alwaysCalledWith(randomStr)).to.be.true;
    spy.restore();
  });
  it("should log different error to console", function() {
    const func = sandbox.fake.throws("Error");
    const spy = sandbox.spy(console, "error");
    const opts = {
      logger: console,
      logErr: function(logger, message) {
        logger.error("123");
      },
      reThrowErr: false
    };
    const res = funlog(func, opts);
    res();
    expect(spy.calledOnceWith("123")).to.be.true;
    spy.restore();
  });
});
