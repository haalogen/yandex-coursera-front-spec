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