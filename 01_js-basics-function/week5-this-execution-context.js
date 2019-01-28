console.error('Week 5 - Контекст исполнения');
/**
 * this в JS:
 * + нельзя перезаписать
 * + указывает на текущий объект
 * + можно использовать за пределом объекта
 */
console.warn('this')

function User () {
  return {
    age: 24,
    showAge: function () {
      console.log(this)
      console.log(this.age)
    }
  }
}

var mike = new User()
mike.showAge()

/**
 * Тип учатка кода
 */

// // Node.js модуль: this === module.exports
// module.exports.days = 366
// // Or
// this.isLeapYear = true

// // Импорт Node.js модуля
// var year2016 = require('./year-2016');
// year2016.days;


/**
 * Как попали на участок кода
 */
console.warn('Как попали на участок кода');

// Метод объекта
var block = {
  innerHeight: 300,
  getHeight: function () {
    return this.innerHeight;
  }
}

console.log(block.getHeight()) // 300

var getHeight = block.getHeight
console.log(getHeight()) // global.innerHeight

/**
 * Заимствование метода: Function#call()
 */
console.warn('Заимствование метода: Function#call(), Function#apply() ')
// fun.call(thisArg, arg1, arg2, ...)

// fun.apply(thisArg, [arg1, arg2, ...])
Math.min(4, 7, 2, 9) // 2
var arr = [4, 7, 2, 9]
Math.min(arr) // [] -to Number-> NaN
console.log(Math.min.apply(Math, arr)) // 2
// Можно так -- min() не использует this в своей реализации
console.log(Math.min.apply(null, arr)) // 2


/**
 * Callback
 */
console.warn('Callback')

var person = {
  name: 'Sergey',
  items: ['keys', 'phone', 'banana'],
  showItems: function () {
    return this.items.map(function (item) {
      // Контекст коллбэка не задан => this === global
      // console.log(this);
      console.log(this.name + ' has ' + item);
      return this.name + ' has ' + item
    })
  }
}

person.showItems() // ["undefined has keys", "undefined has phone", ...]

// Способ 1. Сохранить контекст исполнения в переменную
var person2 = {
  name: 'Sergey',
  items: ['keys', 'phone', 'banana'],
  showItems: function () {
    var _this = this;

    return _this.items.map(function (item) {
      console.log(_this.name + ' has ' + item);
      return _this.name + ' has ' + item
    })
  }
}

person2.showItems()

// Способ 2. Передать контекст исполнения в Array#map(cb, thisArg) вторым аргументом
var person3 = {
  name: 'Sergey',
  items: ['keys', 'phone', 'banana'],
  showItems: function () {
    return this.items.map(function (item) {
      console.log(this.name + ' has ' + item);
      return this.name + ' has ' + item
    }, this)
  }
}

// Способ 3. bind() создает новую ф-ию, которая при вызове устанавливает
// в качестве контекста исполнения this предоставленное значение
// fun.bind(thisArg, arg1, arg2, ...)
var person4 = {
  name: 'Sergey',
  items: ['keys', 'phone', 'banana'],
  showItems: function () {
    return this.items.map(function (item) {
      console.log(this.name + ' has ' + item);
      return this.name + ' has ' + item
    }.bind(this))
  }
}

// Реализация bind()
Function.prototype.myBind = function(_this){
  var fn = this; // Функция с непривязанным контекстом
  var args = [].slice.call(arguments, 1); // Аргументы из myBind

  return function () {
    var curArgs = [].slice.call(arguments) // Аргументы при вызове привязанной ф-ии
    return fn.apply(_this, args.concat(curArgs))
  }
};

function getThis () {
  console.log(this);
  console.log(arguments);
  return this;
}

getThis(1, 2)
getThis.myBind({hey: 'how'}, 1, 2)(3, 4)

// Частичное применение
console.log(Math.pow(2, 10)) // 1024
var binPow = Math.pow.bind(null, 2)
console.log(binPow(11))


/**
 * Режим работы интерпретатора:
 */

// 1) Режим обратной совместимости / Sloppy mode
getThis() // global

 // 2) Строгий режим
function getThisStrict () {
  'use strict'
  console.log(this);
  // console.log(arguments);
  return this;
}

getThisStrict() // undefined


/**
 * eval
 */

var temperature = 12;
console.log(eval('temperature + 5')) // 17

// Если сохранить eval в переменную
var person5 = {
  name: 'Sergey',
  showName: function () {
    var evil = eval;
    console.log(evil('this.name')); // Всегда this === global
    return evil('this.name')
  }
}

person5.showName()