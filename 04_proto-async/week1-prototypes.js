// 'use strict';
console.error('Week 1 - Prototypes');
/**
 * Прототипы
 */
console.warn('Прототипы')

var student = {
  name: 'Billy',
  type: 'human',

  getName: function () {
    return this.name;
  },
  sleep: function () {
    console.info('zzzZZZ...');
  }
};

student.getName(); // Billy

var student = {
  name: 'Billy',
};

var person = {
  type: 'human',
  getName: function () {
    return this.name;
  }
};

// специальное внутреннее поле [[Prototype]]; содержит ссылку на объект,
// который и является прототипом данного объекта

// геттер и сеттер __proto__
student.__proto__ = person;


/**
 * Цепочки прототипов и прототипы по умолчанию
 */
console.warn('Цепочки прототипов и прототипы по умолчанию')

// person -> Object -> null

Object.prototype
Array.prototype
Function.prototype


var lecturer = {
  name: 'Sergey'
}
var student = {
  name: 'Billy'
}

lecturer.__proto__ = student;
// student.__proto__ = lecturer; // Uncaught TypeError: Cyclic __proto__ value
console.info(lecturer.abrakadabra);


/**
 * Способы установки прототипов
 */
console.warn('Способы установки прототипов')

// 1) Сеттер\геттер __proto__
// * Не является частью ES5, появился в браузерах
// * Появился в ES6


// 2) Object.create(protoObj)
// * ES5
// * Делает больше работы, чем простое присваивание ссылки;
// * Создаёт новые объекты и не может менять прототип существующих.
var student = Object.create(person)


// 3) Object.setPrototypeOf(obj, protoObj);
// * ES6
// * близок к __proto__, но имеет особенность:

student.__proto__ = 42 // Неявно проигнорируется
// Object.setPrototypeOf(student, 42) // TypeError: Object prototype may only be an Object or null: 42

Object.setPrototypeOf(student, person);


// Object.getPrototypeOf(obj) -- парный метод к setPrototypeOf
console.log(Object.getPrototypeOf(student))


// (!!) Changing the prototype chain of an already existing object kills optimisations. Instead, you're supposed to create a new object with a different prototype chain via Object.create().
// https://stackoverflow.com/questions/23807805/why-is-mutating-the-prototype-of-an-object-bad-for-performance




/**
 * Эффект затенения
 */
console.warn('Эффект затенения')

var student = {
  name: 'Billy',
  toString: function () {
    return 'Student: ' + this.name;
  }
};

console.log('Hello, ' + student);


/**
 * Поля только для чтения в прототипах
 */
console.warn('Поля только для чтения в прототипах')

var student = { name: 'Billy' };
// Read-only поле
Object.defineProperty(student, 'gender', {
  writable: false,
  value: 'male',
});

student.gender = 33; // Интерпретатор НЕЯВНО не разрешит изменить

// Строгий режим
// 'use strict'; // -- Добавить в начало области видимости
var student = { name: 'Billy' };
// Read-only поле
Object.defineProperty(student, 'color', {
  writable: false,
  value: 'blue',
});

student.color = 33; // TypeError: Cannot assign to read only property 'gender'


// Read-only поля в прототипах 'use strict';
Object.defineProperty(person, 'planet', {
  writable: false,
  value: 'Earth'
});
console.info(student.planet); // Earth

student.planet = 'Mars'; // TypeError: Cannot assign to read only property 'planet' of object


/**
 * Сеттеры и геттеры в прототипах
 */
console.warn('Сеттеры и геттеры в прототипах')

var student = {
  name: 'Billy',
  // [[Prototype]]: <person>
};
var person = {
  type: 'human'
};
Object.setPrototypeOf(student, person)

// Если ПОЛЕ В ПРОТОТИПЕ определено как ГЕТТЕР ИЛИ СЕТТЕР, то эффект
// затенения НЕ РАБОТАЕТ. Копии поля у объекта student не появится, геттеров/сеттеров -- тоже.
Object.defineProperty(person, 'age', {
  set: function(age) { this._age = parseInt(age); },
  get: function() { return this._age; }
});

student.age = '20 лет';
console.info(student.age); // 20;
student.age = '9 грамм'
console.info(student.age); // 9
console.info(person.age); // undefined
console.info(person); // undefined

console.log(student.hasOwnProperty('age')); // false;
console.log(student.hasOwnProperty('_age')); // true;
console.log(person.hasOwnProperty('age')); // true;


/**
 * Неперечисляемые поля в прототипах
 */
console.warn('Неперечисляемые поля в прототипах')

// Если поля перечисляемые, то при помощи оператора for...in мы можем
// получить весь список полей объекта.

var student = {
  name: 'Billy',
  age: 20,
  // [[Prototype]]: <person>
};
var person = {
  type: 'human',
  getName: function () {}
};
Object.setPrototypeOf(student, person)


// Перечислит в том числе и все перечисляемые поля во всей цепочке прототипов
for (var key in student) {
  console.info(key);
}
// 'age', 'name', 'type', 'getName'

console.log('')

// Только собственные поля объекта
for (var key in student) {
  if (student.hasOwnProperty(key)) console.info(key);
}
// 'age', 'name'

// Также только собственные поля объекта
console.log(Object.keys(student));


Object.defineProperty(person, 'type', {
  enumerable: false
});

for (var key in student) { console.info(key); }
// 'age', 'name', 'getName'

// (!) У глобальных прототипов для объектов или для массивов поля, обозначенные там, неперечисляемые.