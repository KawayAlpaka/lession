const assert = require('assert');
const myBind = require('../bind');

describe('测试bind', () => {
  before(async () => {
    myBind();
    // Function.prototype.bind = myBind();
  });
  it('测试1+1是不是2',()=>{
    assert.equal(1+1,2);
  });
  it('测试bind',()=>{
    var objA = {};
    objA.name = "A";
    objA.funcA = function (str1,str2) {
      return this.name + str1 + str2;
    };
    var objB = {};
    objB.name = "B";
    assert.equal( objA.funcA("你好","吗？"),"A你好吗？" );
    var funcA = objA.funcA.bind(objB);
    assert.equal( funcA("你好","吗？"),"B你好吗？");
    var funcB = objA.funcA.bind(objB,"他好");
    assert.equal( funcB("吧？"),"B他好吧？");
  });
});