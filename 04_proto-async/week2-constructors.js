// 'use strict';
console.error('Week 2 - Constructors');
/**
 * Конструкторы
 */
console.warn('Конструкторы')

// Самодельный конструктор
function createStudent(name) {
  return {
    name: name,
    // каждый раз при вызове конструктора мы будем
    // создавать новую функцию, которая будет реализовывать метод sleep.
    // Можно вынести его в прототип.
    sleep: function () {
      console.info('zzzZZ ...');
    }
  };
}
var billy = createStudent('Billy');
var willy = createStudent('Willy');


var studentProto = {
  sleep: function () {
   console.info('zzzZZ ...');
  }
}
console.log(studentProto)

function createStudent2(name) {
  var student = {
    name: name
  };
  Object.setPrototypeOf(student, studentProto);
  return student;
}

var billy = createStudent2('Billy');
var willy = createStudent2('Willy');
console.log({willy})


// Конструктор "из коробки"
// Любая функция, вызванная оператором new.
function Student(name) {
  // var this = {}; // Делает интерпретатор
  this.name = name;
  // return this; // // Делает интерпретатор
}
var billy = new Student('Billy');

// (!) При вызове функции как конструктора с оператором new,
// this внутри этой функции при исполнении будет указывать на вновь создаваемый объект.

function Student2(name) {
  this.name = name;
  return { // Интерпретатор доверяет объекту
    name: 'Muahahahahaha!'
  };
  // return 3;
}
var billy = new Student2('Billy');
console.log(billy.name); // Muahahahahaha


// (!) Интерпретатор нам полностью доверяет и вернет тот объект,
// который мы возвращаем при помощи оператора return.
// (!) Но если мы попытаемся вернуть из конструктора какое-то примитивное зна-
// чение — число, строку или null, в этом случае интерпретатор просто проигно-
// рирует эту строку и будет работать как раньше: он будет возвращать вновь
// создаваемый объект.

function Student3(name) {
  this.name = name;
  // Интерпретатор вернет this -- созданный объект
  return null; // Evil mode on!
}
var billy = new Student3('Billy');
console.info(billy.name); // Billy


/**
 * Конструкторы и прототипы
 */
console.warn('Конструкторы и прототипы')

function Student4(name) {
  // var this = {};
  this.name = name;
  // Object.setPrototypeOf(this, Student.prototype);
  // return this;
}
Student4.prototype = {
  sleep: function () {}
}; // (!) При этом мы затерли .prototype.constructor

var billy4 = new Student4('Billy');
console.log({billy4})

// (!) Конструктор в момент исполнения выполняет дополнительный шаг:
// привязывает тот объект, который мы поместили в хранилище, в качестве
// прототипа для всех вновь создаваемых объектов;

// (!) специальное поле .prototype:
// • есть у каждой функции;
// • хранит объект;
// • этот объект имеет смысл только при вызове функции как конструктора;
//
// • (!) имеет вложенное поле .constructor:
//    + неперечисляемое,
//    + хранит ссылку на саму функцию.

var billy = { name: 'Billy' };
// Интерпретатор вызывает так:
var billy = new Object({ name: 'Billy' })


// (!) специальное поле .constructor:


function Student5(name) {
  this.name = name;
}
Student5.prototype.sleep = function () {
  console.info('zzzZZ ...');
}

var billy5 = new Student5('Billy');
console.log({billy5})
console.log(billy5.constructor.name)



/**
 * Конструкторы и цепочки прототипов
 */
console.warn('Конструкторы и цепочки прототипов')

function Person() {
  this.type = 'human';
}
Person.prototype.getName = function () {
  return this.name;
}

function Student6(name) {
  this.name = name;
}
Student6.prototype = Person.prototype
Student6.prototype.sleep = function () {
  console.info('zzzZZ ...');
}

var billy6 = new Student6('Billy');
console.log(billy6.getName())
console.log({billy6})

// (!) Подводный камень: объект другого "класса" получит все поля прототипа Student
// т.к. .prototype ссылаются на один и тот же объект
// billy -> Student.prototype === Person.prototype -> Object.prototype -> null
function Lecturer(name) {
  this.name = name;
}
Lecturer.prototype = Person.prototype;

var sergey = new Lecturer('Sergey');
sergey.sleep(); // zzzZZ ...


// Решение: Object.create(o: Object, properties?: any)
function Person7() {
  this.type = 'human';
}
Person7.prototype.getName = function () {
  return this.name;
}

function Student7(name) {
  this.name = name;
}
Student7.prototype = Object.create(Person7.prototype);
Student7.prototype.sleep = function () {};

function Lecturer7(name) {
  this.name = name;
}
Lecturer7.prototype = Object.create(Person7.prototype);

var sergey = new Lecturer7('Sergey');
// sergey.sleep(); //TypeError: sergey.sleep is not a function


// Object.create(o: Object, properties?: any)
// Создает пустой объект, прототипом которого становится объект, переданный первым аргументом.
var fruitProto = {
  isUsefull: true
}
var apple = Object.create(fruitProto);
console.log(apple.isUsefull); // true

// Как устроен Object.create(o: Object, properties?: any)
Object.create2 = function(prototype) {
  // Простейший конструктор пустых объектов
  function EmptyFunction() {};
  EmptyFunction.prototype = prototype;
  return new EmptyFunction();
};

// Объект с самой короткой цепочкой прототипов: foreverAlone -> null
var foreverAlone = Object.create(null)
console.log(foreverAlone.hasOwnProperty)


// Итоговое решение
function Person8() {
  this.type = 'human';
}
Person8.prototype.getName = function () {
  return this.name;
};

function Student8(name) {
  this.name = name;
}
Student8.prototype = Object.create(Person8.prototype);
// Student8.prototype = Object.create(Person8);
Student8.prototype.sleep = function () {};
Student8.prototype.constructor = Student8;

var billy8 = new Student8('Billy');


/**
 * Инспектирование связей между объектами, конструкторами и прототипами
 */
console.warn('Инспектирование связей между объектами, конструкторами и прототипами')

// Object.getPrototypeOf(o: Object): protoObj: Object
var student = {
  name: 'Billy',
  // [[Prototype]]: <person>
}
var person = {
  type: 'human',
  getName: function () {}
}
Object.getPrototypeOf(student) === person; // true

// (!)
// Object.getPrototypeOf('foo'); // TypeError: "foo" is not an object (ES5 code)
Object.getPrototypeOf('foo'); // coerced to an Object: String.prototype (ES2015 code)


// Object.prototype.isPrototypeOf(o: Object)
// TRUE - Для всех прототипов в цепочке!
// Прототип == хранилище
function Person8() {
  this.type = 'human';
}
Person8.prototype.getName = function () {
  return this.name;
};
function Student8(name) {
  this.name = name;
}
Student8.prototype = Object.create(Person8.prototype);
Student8.prototype.sleep = function () {};
Student8.prototype.constructor = Student8;
var billy8 = new Student8('Billy');

console.log(Student8.prototype.isPrototypeOf(billy8)) // true
console.log(Person8.prototype.isPrototypeOf(billy8)) // true
console.log(Object.prototype.isPrototypeOf(billy8)) // true


/**
 * оператор "instanceof"
 */
// Он позволяет ответить на вопрос:
// «Является ли объект Студентом\Личностью\Объектом?»
// (!) `instanceof` lies. Ducktype instead.
console.warn('оператор "instanceof"')

console.log(billy8 instanceof Student8) // true
console.log(billy8 instanceof Person8) // true
console.log(billy8 instanceof Object) // true
// console.log(billy8 instanceof null) // TypeError: Right-hand side of 'instanceof' is not an object

// Как работает "instanceof":
billy8 instanceof Person8;
console.log(billy8.__proto__ === Person8.prototype);
// false -> Может, там null?
console.log(billy8.__proto__ === null);
// false -> Идём дальше по цепочке
console.log(billy8.__proto__.__proto__ === Person8.prototype);
// true -> Возвращаем true


// Объект с самой короткой цепочкой прототипов: foreverAlone -> null
var foreverAlone = Object.create(null);
foreverAlone instanceof Object; // false
Object.create(null).__proto__ === Object.prototype;
// false -> Может, там null?
Object.create(null).__proto__ === null;
// true -> Так и есть, возращаем false!



/**
 * Решение проблемы дублирования кода в конструкторах
 */
console.warn('Решение проблемы дублирования кода в конструкторах')

function Person9(name) {
  this.type = 'human';
  this.name = name;
}
function Student9(name) {
  // Вызываем конструктор Person9 внутри конструктора Student9
  // this ссылается на новый объект студента
  Person9.call(this, name);
}
var billy9 = new Student9('Billy');
console.info(billy9.name); // Billy



/**
 * Вызов затеняемого метода в затеняющем
 */
console.warn('Вызов затеняемого метода в затеняющем')

function Person10(name) {
  this.type = 'human';
  this.name = name;
}
Person10.prototype.getName = function () {
  return this.name;
}

function Student10(name) {
  Person10.call(this, name);
}
Student10.prototype = Object.create(Person10.prototype);
Student10.prototype.getName = function () {
  // Вызываем затеняемый метод из цеп-ки прототипов от лица объекта типа Student10
  return 'Student10 ' + Person10.prototype.getName.call(this);
};

var billy10 = new Student10('Billy');
console.info(billy10); // Billy



/**
 * Сравнение трёх подходов к конструированию объектов: функции-конструкторы, метод create, «Классы»
 */
console.warn('Сравнение трёх подходов к конструированию объектов: функции-конструкторы, метод create, «Классы»')


// Object.create(o: Object, properties?: any)
var personProto = {};
personProto.getName = function () { return this.name; }

var studentProto = Object.create(personProto);
studentProto.sleep = function () {};
// Хелпер-фабрика объектов
studentProto.create = function (name) {
  return Object.create(this, {
    name: { value: name }
  });
}

var billy = studentProto.create('Billy');


// «Классы» -- новая синтаксическая конструкция
// Классы - это не более, чем обычные функции-конструкторы.
class Student11 {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
console.log(Student11.prototype)

var billy11 = new Student11('Billy');
billy11.getName(); // Billy

console.log(Student11.prototype.isPrototypeOf(billy11)); // true
console.log(typeof Student11); // function


// Concatenative inheritance | Object.assign
var skydiving = require('skydiving');
var ninja = require('ninja');
var mouse = require('mouse');
var wingsuit = require('wingsuit');

// The amount of awesome in this next bit might be too much
// for seniors with heart conditions or young children.
var skydivingNinjaMouseWithWingsuit = Object.assign({}, // create a new object
  skydiving, ninja, mouse, wingsuit); // copy all the awesome to it.