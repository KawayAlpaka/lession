// import my_func from './m.d';
// console.log(my_func);
import { Interface } from './interface';
console.log(Interface);
namespace Generice {
  console.log(1);
  export class Person<T> {
    data: T;
    constructor (data: T) {
      this.data = data;
    }
  }
  export class Car {
    type: string;
    constructor () {
      this.type = 'car';
    }
  }
  export const factory = <T>(c: {new(): T}) => {
    return new c();
  }
  export const logType = <T extends Car>(i: T) => {
    return console.log(i.type);
  }
  let p1 = new Interface.Person('name',12);
  let p2 = new Generice.Person('data');
  let p3 = new Generice.Person(111);
  let p4 = new Generice.Person(new Generice.Person(true));
  let p5 = new Generice.Person<number>(222);
  console.log(p1);
  console.log(p2);
  console.log(p3);
  console.log(p4);
  console.log(p5);
  let c1 = factory(Car);
  console.log(c1);
  logType(c1);
  logType({type:'BYD'});
}
