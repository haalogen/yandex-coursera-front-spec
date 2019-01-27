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

var person =
