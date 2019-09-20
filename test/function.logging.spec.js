const { expect, assert } = require("chai");
const sinon = require("sinon");
const funlog = require("../src/index");

describe("Function logging feature", function() {
  let sandbox;
  this.beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  this.afterEach(function() {
    sandbox.restore();
  });

  it("should not change the function output", function() {
    const func = sandbox.fake.returns(0);
    const res = funlog(func);
    expect(res()).to.be.equal(0);
  });

  it("should log arguments correctly", function() {
    const func = sandbox.fake.returns(0);
    const spy = sandbox.spy(console, "info");
    const res = funlog(func);
    const num = 1;
    const string = "abc";
    const float = 1.1;
    const arr = [0];
    const obj = { a: "bc" };

    res(num, string, float, arr, obj);
    spy.calledOnceWith(`${typeof num} : ${JSON.stringify(num)}`);
    spy.calledOnceWith(`${typeof string} : ${JSON.stringify(string)}`);
    spy.calledOnceWith(`${typeof float} : ${JSON.stringify(float)}`);
    spy.calledOnceWith(`${typeof arr} : ${JSON.stringify(arr)}`);
    spy.calledOnceWith(`${typeof obj} : ${JSON.stringify(obj)}`);
    spy.restore();
  });

  it("should log anonymous function with assigned name", function() {
    const res = funlog(() => {});
    const spy = sandbox.spy(console, "info");
    const name = "Anonymous function";
    res();
    expect(spy.calledWith(`[funlog] called ${name}:`)).to.be.true;
    spy.restore();
  });

  // Better to use basic assert for throws
  it("should throw exception", function() {
    const func = sandbox.fake.throws("Error");
    const res = funlog(func);
    assert.throws(res, "Error");
    assert.throws(func, "Error");
  });

  it("should not throw exception but only logs it", function() {
    const func = sandbox.fake.throws("Error");
    const spy = sandbox.spy(console, "error");
    const opts = {
      reThrowErr: false
    };
    const res = funlog(func, opts);
    assert.throw(func, "Error");
    expect(res()).to.be.null;
    expect(spy.calledOnce).to.be.true;
    spy.restore();
  });
});
