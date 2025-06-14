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

console.log('----------------------------');

// Приватные свойства и методы класса

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
  }
}

const person = new Person('John', 'Smith');

console.log(person.firstName); // John
console.log(person.lastName); // Smith
console.log(person.fullName); // John Smith

person.firstName = 'Alice';
person.fullName = 'Ivan Ivanov';

console.log(person.firstName); // Alice
console.log(person.lastName); // Smith
console.log(person.fullName); // Ivan Ivanov

console.log('----------------------------');

class PersonImproved {
  #firstName;
  #lastName;
  #fullName;

  constructor(firstName, lastName) {
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.#fullName = `${firstName} ${lastName}`;
  }

  get firstName() {
    return this.#firstName;
  }

  set firstName(newName) {
    this.#firstName = newName;
    this.#fullName = `${newName} ${this.#lastName}`;
  }

  get lastName() {
    return this.#lastName;
  }

  set lastName(newName) {
    this.#lastName = newName;
    this.#fullName = `${this.#firstName} ${newName}`;
  }

  get fullName() {
    return this.#fullName;
  }
}

const personImproved = new PersonImproved('John', 'Smith');

console.log(personImproved.firstName); // John
console.log(personImproved.lastName); // Smith
console.log(personImproved.fullName); // John Smith

personImproved.firstName = 'Alice';
personImproved.lastName = 'Ivanova';
personImproved.fullName = 'Ivan Ivanov'; // <- обновление не должно происходить, специально не написан сеттер

console.log(personImproved.firstName); // Alice
console.log(personImproved.lastName); // Ivanova
console.log(personImproved.fullName); // Alice Ivanova

// Проверка класса: "instanceof"

console.log(character instanceof Character); // true
console.log(enemy instanceof Enemy); // true
console.log(character instanceof Enemy); // false

class EntityNotFound {
  type = 'EntityNotFound';
  message = 'Entity not found';
}

try {
  const resultIndex = [1,2,3,4,5,6,7,8,9].findIndex(item => item === 25);

  if (resultIndex === -1) {
    throw new EntityNotFound();
  }
} catch (error) {
  if (error instanceof EntityNotFound) {
    alert(error.message);
  } else {
    alert(error);
  }
}
