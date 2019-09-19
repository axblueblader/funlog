const { expect } = require("chai");
const sinon = require("sinon");
const funlog = require("../src/index");

describe("Functions in an object logging feature", function() {
  it("should not change function output", function() {
    const func0 = sinon.fake.returns(0);
    const func1 = sinon.fake.returns(1);
    const obj = {
      func0: func0,
      func1: func1
    };

    const res = funlog(obj);
    expect(res.func0()).to.be.equal(0);
    expect(res.func1()).to.be.equal(1);
  });

  it("should not change object other fields value", function() {
    const func = sinon.fake.returns(0);
    const string = "123";
    const float = 1.1;
    const num = 1;
    const arr = [0];
    const tmp = { a: "bc" };

    const obj = {
      func: func,
      string: string,
      float: float,
      num: num,
      arr: arr,
      tmp: tmp
    };

    const res = funlog(obj);
    expect(res.func()).to.be.equal(0);
    expect(res.string).to.be.equal(string);
    expect(res.float).to.be.equal(float);
    expect(res.num).to.be.equal(num);
    expect(res.arr).to.be.equal(arr);
    expect(res.tmp).to.be.equal(tmp);
  });
});
