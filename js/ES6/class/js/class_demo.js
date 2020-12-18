class Animal{
  static _data = "Animal data";
  constructor(){

  }
  howl(sound){
    console.log(sound);
    console.log(sound);
    console.log(sound);
    console.log(sound);
    console.log(sound);
  }
  static callData(){
    console.log(this._data);
  }
}



class Dog extends Animal{
  static _data = "Dog data";
  constructor(){
    super();
  }
  howl(){
    super.howl("汪汪");
  }
}

let animal = new Animal();
animal.howl("haha");
Animal.callData();

let dog = new Dog();
dog.howl("haha");
Dog.callData();
