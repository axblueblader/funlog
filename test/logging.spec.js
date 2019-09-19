const { expect } = require("chai");
const sinon = require("sinon");
const funlog = require("../src/index");

describe("Module intialization", function() {
  describe("when passing no parameter", function() {
    it("should return null", function() {
      const res = funlog();
      expect(res).to.be.null;
    });
  });

  describe("when passing only one parameter", function() {
    it("should return a function if passed a function", function() {
      const func = sinon.fake();
      const res = funlog(func);
      expect(res).to.be.an.instanceof(Function);
    });

    it("should return an object if passed an object", function() {
      const obj = {};
      const res = funlog(obj);
      expect(res).to.be.an.instanceof(Object);
    });

    it("should return null if pass a different type", function() {
      const string = "123";
      const res = funlog(string);
      expect(res).to.be.null;
    });
  });

  describe("when passing more than 2 parameters", function() {
    const func = sinon.fake();
    const opts = {};
    const tmp = 123;
    const res = funlog(func, opts, tmp);
    expect(res).to.be.null;
  });
});
