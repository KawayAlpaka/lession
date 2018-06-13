class Person {
    constructor (name) {
        this.name = name;
    }
    static getString () {
        return "Person.getString";
    }
    getString () {
        return Person.name;
    }
}

class Boy extends Person {
    constructor (name, long) {
        super(name); // 调用父类的constructor()
        this.long = long;
    }
    getString () {
        return Boy.name;
    }
}

export {
    Person,
    Boy
}
