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

likes = tweet.getLikes()
console.log({likes})

likes = tweet.setLikes(666).getLikes()
console.log({likes})


/**
 * Декларация и конфигурирование свойств объекта
 */
console.warn('Декларация и конфигурирование свойств объекта')
tweet2 = {
  toString: function () {
    return 'Хэй!'
  },
}

// Ключи перечисляемых свойств
console.log(Object.keys(tweet2)); // ['toString']
// test comment