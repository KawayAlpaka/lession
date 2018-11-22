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
        var original = constructor.prototype[key];
        constructor.prototype[key] = function (...args) {
          before();
          return original.apply(this,args);
        };
        // desc.value = function (...args) {
        //   before();
        //   original.apply(this,args);
        // };
      }
    });
  }
}
/**
  * 方法装饰器demo.
  * 注册一个方法,在被装饰的方法运行后运行.
  * @param after 被注册的方法
*/
function after(after: Function) {
  console.log('');
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('after decorators');
    // console.log('target',target);
    // console.log('propertyKey',propertyKey);
    // console.log('descriptor',descriptor);
    var original = descriptor.value;
    descriptor.value = function (...args) {
      var r = original.apply(this,args);
      after();
      return r;
    }
  }
}

function property(options?:any) {
  return function (Class:any, key:any) {
    console.log('property');
    // console.log(arguments);
  }
};

@before(function() {
  console.log('before');
})
class Person {
  @property()
  public _name: string = 'xiaoming';
  public static myType () {
    let type = 'Person';
    console.log(type);
    return type;
  }
  constructor (name: string) {
    this._name = name;
  }
  @after(function(){
    console.log('after');
  })
  public myName (greet: string) {
    console.log(greet + this._name);
    return this._name;
  }
  get name () {
    return this._name;
  }
}
Person.myType();
let p1 = new Person('lilei');
let p2 = new Person('hanmeimei');
console.log(p1.myName('my name is '));
console.log(p2.myName('my name is '));
