!function(chai,fillObject){
 
  
  // var assert = require('assert');
  var expect = chai.expect;
  
  describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        expect([1,2,3].indexOf(4)).to.be.equal(-1);
        // assert.equal([1,2,3].indexOf(4), -1);
      });
    });
  });
  
  
  describe('fillObject', function() {
    it('{} == {}', function() {
      expect({}).to.deep.equal({});
      // expect('hello').to.equal('hello')
      // expect(42).to.equal(42)
      // expect(1).to.not.equal(true)
      // expect({ foo: 'bar'}).to.not.equal({ foo: 'bar'})
      // expect({ foo: 'bar'}).to.deep.equal({foo: 'bar'})
      // assert.equal([1,2,3].indexOf(4), -1);
    });
  
  
    it('test 没有则覆盖', function() {
      var source = {
        a:"a"
      };
      var pattern = {
        b:"b"
      };
      var exp = {
        a:"a",
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test 有则不覆盖', function() {
      var source = {
        a:"a"
      };
      var pattern = {
        b:"b",
        a:"aa"
      };
      var exp = {
        a:"a",
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test null 也要覆盖', function() {
      var source = {
        a: null
      };
      var pattern = {
        b:"b",
        a:"aa"
      };
      var exp = {
        a:"aa",
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test undefined 也要覆盖', function() {
      var source = {
        a: undefined
      };
      var pattern = {
        b:"b",
        a:"aa"
      };
      var exp = {
        a:"aa",
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test 深度遍历 不覆盖1', function() {
      var source = {
        a: {
          a:"a"
        } 
      };
      var pattern = {
        b:"b",
        a:"aa"
      };
      var exp = {
        a: {
          a:"a"
        },
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test 深度遍历 不覆盖2', function() {
      var source = {
        a: {
          a:null
        } 
      };
      var pattern = {
        b:"b",
        a:"aa"
      };
      var exp = {
        a: {
          a:null
        },
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test 深度遍历 覆盖1', function() {
      var source = {
        a: {
          a:null
        } 
      };
      var pattern = {
        b:"b",
        a: {
          a:"a"
        },
      };
      var exp = {
        a: {
          a:"a"
        },
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test 深度遍历 覆盖2', function() {
      var source = {
        a: {
          a:undefined
        } 
      };
      var pattern = {
        b:"b",
        a: {
          a:"a"
        },
      };
      var exp = {
        a: {
          a:"a"
        },
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test 深度遍历 覆盖3 null 覆盖 undefined', function() {
      var source = {
        a: {
          a:undefined
        } 
      };
      var pattern = {
        b:"b",
        a: {
          a:null
        },
      };
      var exp = {
        a: {
          a:null
        },
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
  
    it('test 深度遍历 覆盖4 null 可以覆盖 undefined', function() {
      var source = {
        a: {
          a:undefined,
          b:"ab",
          c:null
        } 
      };
      var pattern = {
        b:"b",
        a: {
          a:null,
          b:"ab",
          c:undefined
        }
      };
      var exp = {
        a: {
          a:null,
          b:"ab",
          c:null
        },
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test 深度遍历  0 会覆盖 null', function() {
      var source = {
        a: {
          d:0,
          e:null,
          f:3
        } 
      };
      var pattern = {
        b:"b",
        a: {
          d:5,
          e:0,
          f:0
        },
      };
      var exp = {
        a: {
          d:0,
          e:0,
          f:3
        },
        b:"b"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
    it('test fn 的覆盖1', function() {
      var fn = ()=>"fn";
      var source = {
        a: "a"
      };
      var pattern = {
        fn,
      };
      var exp = {
        a: "a",
        fn,
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
  
    it('test class实例的fn不覆盖', function() {
      class A{
        constructor(){
          this.a = "a";
        }
        fn(){
          return "fn";
        }
      }
      var source = {
      };
      var pattern = new A();
      var exp = {
        a: "a"
      };
      expect(fillObject(source,pattern)).to.deep.equal(exp);
    });
  
  });
  
}(
  typeof module != "undefined" ? require('chai') : chai,
  typeof module != "undefined" ? require("../js/fill-object") : fillObject
)
