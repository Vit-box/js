// Конструктор, оператор "new"
function NPC(name, age, health) {
  // this = {}; <- что происходит под капотом

  this.name = name;
  this.age = age;
  this.health = health;

  // return this; <- что происходит под капотом
}

const character1 = new NPC("John", 30, 200); // <- создаем экземпляр данного класса (функции-контруктора)
const character2 = new NPC("Alice", 22, 170);
const character3 = new NPC("Ivan", 45, 250);

console.log(character1); // { name: 'John', age: 30, health: 200 }

// Прототипы, наследование (прототипное наследование)
let animal = {
  eat() {
    console.log("I am eating");
  },
};

const rabbit = Object.create(animal);

rabbit.jump = () => {
  console.log("I am jumping");
};

rabbit.eat(); // есть доступ к методу eat из прототипа
rabbit.jump();

// String('test').toUpperCase();

// Классы

class BaseCharacter {
  constructor(health, speed) {
    this.health = health;
    this.speed = speed;
  }
}

class Character extends BaseCharacter {
  weapon = "gun";
  attack = 10;

  constructor(name) {
    super(100, 5); // health === 100, speed === 5
    this.name = name;
  }
}

class Enemy extends BaseCharacter {
  weapon = "sword";
  attack = 20;

  constructor() {
    super(20, 3);
  }
}

const character = new Character('Alice'); // <- создаем экземпляр данного класса
const enemy = new Enemy(); // <- создаем экземпляр данного класса
const enemy2 = new Enemy();
const enemy3 = new Enemy();