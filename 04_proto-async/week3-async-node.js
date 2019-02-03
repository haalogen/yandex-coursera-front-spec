// 'use strict';
/**
 * Работа с файлами
 */
console.warn('\n' + '# Работа с файлами' + '\n')

// Подключаем встроенный модуль "fs" при помощи ф-ии require()
var fs = require('fs');
// var request = require('request');
// Переменная __dirname
var fileName = __dirname + '/data.json';

console.time('readFileSync');
// Если не указать кодировку, в переменной будет буфер с данными, иначе -- строка
var data = fs.readFileSync(fileName, 'utf-8'); // Синхронный
console.timeEnd('readFileSync');

console.log('Sync:', data); // readFileSync: 3ms

// Если мы возьмем файл побольше, например, файл bigData.mov и выполним те же самые замеры, 
// мы увидим, что время файла заняло аж целых три споловиной секунды.
// (!) Это огромное время, на протяжении которого интерпретатор ничего не делал. Он просто ждал, 
// пока ОС прочитает файл и отдаст команду на продолжение выполнения кода.
// Во время синхр. операций не обрабатываются другие события: таймеры, пользовательские события, замирает анимация.

var data = fs.readFile(fileName + 'q', 'utf-8', function (err, data) {
  console.log('Async read data.json: ' + data)
}); // Асинхронный



/**
 * Функция обратного вызова (callback)
 */
console.warn('\n' + '# Функция обратного вызова (callback)' + '\n')

// Callback или функция обратного вызова в Node.js
// Если при выполнении асинхронной операции не возникло ошибок, то в качестве 
// первого аргумента принято передавать null.
// Второй аргумент содержит данные, с которыми завершилась асинхронная операция.
function cb(err, data) {
  if (err) {
   console.error(err.stack);
  } else {
    console.log(data)
  }
}


// Недостатки callback:
// 1) Уровень вложенности нашего кода растет вместе с ростом его сложности.
fs.readFile('data.json', function (err, data) {
  if (err) {
    console.error(err.stack);
  } else {
    fs.readFile('ext.json', function (e, ext) {
      if(e) {
        console.error(e.stack);
      } else {
        console.log(data + ext);
      }
    });
  }
});

// 2) Обработчик ошибок и данных, разных по своей природе, находится в одном месте кода
// Все наши callback-и начинались с if. Если в переменной error находится какая-то ошибка, 
// то мы идем по одной ветке кода, иначе — идем по другой. Это увеличивает сложность нашего кода.

// 3) Необработанные исключения:
// Мы можем пропустить некоторые исключения, когда пишем функцию, которая принимает callback.
// 4) Лишние переменные (tmp)
function readTwoFiles(cb) {
  var tmp; // Результат чтения файла, который окажется прочитан первым

  fs.readFile('data.json', function (err, data) {
    if (tmp) { cb(err, data + tmp); }
    else { 
      throw Error('Mu-ha-ha!'); /* метод throw */ 
    }
  });

  fs.readFile('ext.json', function (err, data) {
    if (tmp) { cb(err, data + tmp); }
    else { tmp = data; }
  });
}

// callback. Когда использовать:
// * если вам нужно написать высокопроизводительный код,
// * пишете код какой-то внешней библиотеки.



/**
 * Промисы
 */
console.warn('\n' + '# Промисы' + '\n')
// Как только мы создали promise, он находится в состоянии pending — неопределенное состояние. 
// Если асинхронная операция завершилась хорошо, то есть позвали метод resolve, то promise 
// переходит в состояние fulfilled. Если во время выполнения асинхронной операции произошла 
// ошибка или позвали метод reject, то promise переходит в состояние rejected. Оба эти состояния 
// являются конечными. После перехода в одно из этих состояний, Промис больше не может изменить свое состояние.

var promise = new Promise(function (resolve, reject) {
  fs.readFile('data.json', function (err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

// Чтобы получить результат работы promise, нам необходимо навесить обработчики: метод .then()
// Первым аргументов then получает функцию, которая будет вызвана в случае, если promise 
// завершился успешно. Если во время выполнения promise произошла ошибка, то вызовется функция, которая 
// передается вторым аргументом.
promise.then(function (data) {
    console.log(data)
  }, function (err) {
    console.error(err);
});

// Лаконичнее
promise.then(console.log, console.error);

// Метод .then() можно вызывать, даже если промис уже имеет конечное состояние.


// Promise. Недостатки:
// * Дополнительные обертки -- нам приходится писать больше кода, поскольку появляются функции-
// обработчики, кот-ые разделяют работу асинхронного кода и работу с результатом.
// * Производительность promise немного ниже, чем производительность callback.

// Promise. Достоинства:
// * Контролируем исключения: отловим неконтролируемые исключения.

var promise2 = new Promise(function (resolve, reject) {
  fs.readFile('data.json', function (err, data) {
    if (err) {
      reject(err);
    } else {
      // throw new Error('Mu-ha-ha!'); // Crashes ;(
    }
  });
});

promise2.then(console.log, console.error); // [Error: Mu-ha-ha!]

setTimeout(() => console.log('hey'), 1000)

// Promise. Достоинства:
// * Несколько обработчиков: цепочка промисов


/**
 * Цепочки промисов -- Чейниниг
 */
console.warn('\n' + '# Цепочки промисов' + '\n')

var promise3 = new Promise(function (resolve, reject) {
  fs.readFile('data.json', function (err, data) {
    if (err) {
      reject(err);
    } else {
      resolve(data);
      // throw new Error('Mu-ha-ha!'); // Crashes ;(
    }
  });
});

function identity(data) {
  return data;
}

// если при чтении файла произошла ошибка, функция thrower 
// пробросит ее дальше по цепочке промисов.
function thrower(err) {
  throw err;
}

promise3
  .then((data) => console.log('Promise3: ' + data), thrower) // Возвращает новый промис
  .then(identity, (err) => console.error('Promise3: ' + err))
  .catch((err) => {
    // Handle any error that occurred in any of the previous
    // promises in the chain.
    console.log('Promise3 Catch:', err)
});


function getDefault() {
  return { name: 'Sergey' };
}

function getAvatar (data) {
  var name = data.name;
  // return request('https://my.avatar/' + name);
}

promise3
  .then(JSON.parse, thrower)
  .then(identity, getDefault)
  .then(getAvatar, thrower)
  .then(identity, console.error);

// (!) Если в цепочке промисов встречается обработчик, который 
// ответственен за ошибку, и мы в него попадаем, то цепочка 
// промисов переходит из rejected в  состояние fulfilled.

// Правила, по которым осуществляются переходы по цепочке промисов:
// * then вернул данные -- передаем по цепочке дальше
// * then вернул промис -- дожидаемся, пока выполнится
//   этот промис, и далее передаем уже результат его работы;
// * произошла ошибка -- промис переходит в состояние rejected.


// Лаконичнее:
// * убираем thrower()
// * then(identity, onRejected) -- заменяем на catch(onRejected)
// суть: Promise.prototype.then(undefined, onRejected) 
promise3
  .then(JSON.parse)
  .catch(getDefault)
  .then(getAvatar)
  .catch(console.error);


/**
 * Параллельное выполнение промисов | Promise.all
 */
console.warn('\n' + '# Параллельное выполнение промисов | Promise.all' + '\n')

function readFile(name) {
  return new Promise(function (resolve, reject) {
    fs.readFile(name, function (err, data) {
      err ? reject(err) : resolve(data);
    });
  });
}

Promise
  .all([
    readFile('data.json'),
    readFile('ext.json')
  ])
  .then(function (data) {
    console.log('\n' + data[0] + data[1] + '\n')
  });


// Промисы без совершения асинхронных операций: 
// Promise.resolve(data) -- синхронный, fulfilled, с данными
Promise
  .resolve('{"name": "Sergey"}')
  .then(console.log); // '{"name": "Sergey"}'


// Парный Promise.reject(errorObj) -- в состоянии rejected с той 
// ошибкой, которую мы передали в метод reject.
Promise
  .reject(new Error('Mu-ha-ha!'))
  .catch(console.error);