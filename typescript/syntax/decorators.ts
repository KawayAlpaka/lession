 /**
  * 类装饰器demo.
  * 注册一个方法,在每个实例方法运行前,运行这个方法.
  * @param before 被注册的方法
*/
function before(before: Function) {
  return function (constructor: Function) {
    console.log('before decorators');
    var keys = Object.keys(constructor.prototype);
    keys.forEach((key) => {
      var desc = Object.getOwnPropertyDescriptor(constructor.prototype,key);
      if (desc.get || desc.set) {
      } else if (typeof desc.value === 'function' ) {
        var _f = constructor.prototype[key];
        constructor.prototype[key] = function (...args) {
          before();
          _f.apply(this,args);
        }
      }
    });
  }
}
@before(function() {
  console.log('before');
})
class Person {
  public _name: string = 'xiaoming';
  public static myType () {
    let type = 'Person';
    console.log(type);
    return type;
  }
  constructor (name: string) {
    this._name = name;
  }
  public myName (greet: string) {
    console.log(greet + this._name);
    return this._name;
  }
  get name () {
    return this._name;
  }
}
Person.myType();
let p1 = new Person('xiaohong');
p1.myName('my name is ');
