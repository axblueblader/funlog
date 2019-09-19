const { expect } = require("chai");
const sinon = require("sinon");
const funlog = require("../src/index");

describe("Function logging feature", function() {
  it("should not change the function output", function() {
    const func = sinon.fake.returns(0);
    const res = funlog(func);
    expect(res()).to.be.equal(0);
  });

  it("should log arguments correctly", function() {
    const func = sinon.fake.returns(0);
    const spy = sinon.spy(console, "info");
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
    const spy = sinon.spy(console, "info");
    const name = "Anonymous function";
    res();
    spy.calledOnceWith(`[funlog] called ${name}:`);
    spy.restore();
  });
});
