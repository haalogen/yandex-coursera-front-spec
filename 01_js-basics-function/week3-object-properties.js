console.error('Week 3 - Свойства объекта и работа с ними');
/**
 *  Методы объекта
 */
console.warn('Методы объекта')
var tweet = {
  likes: 17,
  getLikes: function () {
    return this.likes;
  },
  setLikes: function (value) {
    this.likes = parseInt(value) || 0;
    return this;
  },
}

console.log({tweet});

var likes = tweet.getLikes()
console.log({likes})

var likes = tweet.setLikes(666).getLikes()
console.log({likes})


/**
 * Декларация и конфигурирование свойств объекта
 */
console.warn('Декларация и конфигурирование свойств объекта');
var tweet2 = {
  toString: function () {
    return 'Хэй!'
  },
}

// Ключи перечисляемых свойств
console.log(Object.keys(tweet2)); // ['toString']

var emptyObject = {};
console.log(Object.keys(tweet2)); // []

// Object.definePropery
// writable - редактируемое,
// enumerable - перечислимое,
// configurable - удалимое,
// Все по умолчанию: false
var tweet3 = {};
Object.defineProperty(tweet3, 'text', {
  value:  'Hey',
  writable: false,
});


const tweet3Descriptor = Object.getOwnPropertyDescriptor(tweet3, 'text');
console.log({tweet3Descriptor});
// tweet3Descriptor: {
//   configurable: false,
//   enumerable: false,
//   value: "Hey",
//   writable: false,
// }
// Пробуем изменить
tweet3.text = 'New text';
console.log({tweet3}); // { value: "Hey", ... }

// "configurable"
Object.defineProperty(tweet3, 'motto', {
  value:  'Go dance!',
  configurable: false,
});

// Пробуем удалить
console.log(delete tweet3.motto); // false
console.log(tweet3);
