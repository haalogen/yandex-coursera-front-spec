// 'use strict';
console.error('Week 3 - Асинхронный код');
/**
 * Стек вызовов и очередь событий
 */
console.warn('Стек вызовов и очередь событий')

// // Стек вызовов
// preparecoffee
// toCheerUp
// anonymous

// Очередь событий:
// anonymous 

// Как только интерпретатор начинает исполнять наш код, он складывает анонимную функцию 
// не сразу в стек вызовов, а для начала помещает ее в очередь событий.
// Как только стек вызовов пустеет, он достает первую функцию из очереди событий.



/**
 * Системные таймеры
 */
console.warn('Системные таймеры')


// setTimeout(handler: any, timeout?: long, arguments...: any)
// setTimeout(func[, delay, param1, param2, ...])

function toStove() {
  return console.log('Поставить на плиту')
}
function fromStove() {
  return console.log('Снять с плиты');
}
toStove();
setTimeout(fromStove, 2000);

// Интерпретатор положит коллбэк fromStove в очередь событий через 2 сек после вызова setTimeout


// setInterval(func[, delay, param1, param2, ...]);
// setInterval(handler: any, timeout?: long, arguments...: any)

function toStir() {
  return console.log('Помешивать');
}
toStove();
var id = setInterval(toStir, 1000);
setTimeout(() => {
  clearInterval(id);
  console.log('Хватит помешивать')
}, 4000)
// Интерпретатор положит коллбэк toStir в очередь событий через 1 сек после вызова setInterval



/**
 * Работа с файлами
 */
console.warn('Работа с файлами -- в отдельном скрипте')