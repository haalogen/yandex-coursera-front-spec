console.error('Week 4 - Функции');
/**
 * Аргументы функции
 */
console.warn('Аргументы функции')

function min(a, b) {
  return a < b ? a : b;
}

// Лишние аргументы игнорируются
console.log(min(3, 4, 2)) // 3

// (!) Сравнение с Undefined всегда дает false
console.log(min(13)) // undefined

/**
 * Массиво-подобный объект arguments
 */
console.warn('Массиво-подобный объект arguments')

function sum2() {
  // (!) Приводим arguments к массиву (делаем копию в виде массива)
  var args = [].slice.call(arguments)
  // (!) Если в reduce(cb, initValue) не передать initValue, то в качестве
  // initValue будет взят args[0], итерации начнутся с args[1]
  return args.reduce(function (acc, item) {
    return acc + item;
  }, 0);
}


/**
 * Объявление функции
 */
console.warn('Объявление функции')

// Function declaration
console.log(add(2, 3)) // 5

function add(a, b) {
  return a + b
}

// Function expression
// add2(1, 2) // TypeError: add2 is not a function

var add2 = function(a, b) {
  return a + b
}

// Named function expression
// console.log(factorial(3)) // TypeError: factorial is not a function

var factorial = function inner(n) {
  return n === 1 ? 1 : n * inner(n - 1)
}

console.log(typeof factorial) // 'function'
console.log(typeof inner) // ReferenceError: inner is not defined -- Ошибка интерпретатора | "undefined"

// Конструктор Function -- для генерации кода на лету
var add3 = new Function('b', 'b', 'return a + b')


/**
 * Всплытие
 */
console.warn('Всплытие')

// Выполнение кода:
// 1. Инициализация
//   a. function declaration
//   b. var varname; // === undefined
// 2. Выполнение


/**
 * Замыкание
 */
console.warn('Замыкание')

// (!) Замыкание — это функция со всеми ее внешними переменными,
// к которым она имеет доступ.

function greet() {
  var text = 'Hi' // Счетчик ссылок { text: 1 }
}
greet(); // Счетчик ссылок { text: 0 }


function makeCounter() {
  var count = 0
  return function() {
    return count++;
  }
}

var counter = makeCounter();


/**
 * Модуль
 */
console.warn('Модуль')

// Для чего используется паттерн "модуль"?
// Чтобы создать область видимости, внутри которой переменные будут иметь уникальные имена.

// IIFE
var getDateString = (function () {
  function format (date) {
    return date.toGMTString()
  }

  return function getDateString (date) {
    date = date || new Date;
    return format(date)
  }
}());