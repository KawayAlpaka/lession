interface iAnimal{
  skin:string;
}
interface iPerson {
  name:string;
}
interface iPersonClass {
  new (name:string,age:number):iPerson;
}
class Person implements iPerson,iAnimal{
  name:string;
  skin:string;
  age:number;
  constructor (name:string,age:number) {
    this.name = name;
    this.age = age;
  }
}
let myName = (p:iPerson) => {
  console.log(p.name);
}
let p1: iPerson = {
  name: 'name',
  // age: 20
}
let p2: Person = new Person('LL',20);
myName({
  name: 'name',
  // age: 20
});
myName(p2);

let PersonClass = (name:string,age:number) => {};
const factory = (Class:iPersonClass): iPerson => {
  // Class('name1',12);
  return new Class('name1',12);
}
console.log(factory(Person));

