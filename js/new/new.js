
const Person = function(name){
// const Person = (name) => {
  // console.log(arguments)
  this.name = name;
  // console.log(this)
}

Person.prototype.SayName = function(){
  console.log("my name is",this.name);
}

const New = (Fn,...args)=>{
  const o = {};
  o.__proto__ = Fn.prototype;
  Fn.apply(o,args);
  return o
}

// const p1 = new Person("xiao ming");
const p1 = New(Person,"xiao ming");
console.log(p1);
p1.SayName()
console.log(p1.__proto__.constructor === Person)