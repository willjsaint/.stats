tool for measuring time of execution of async code

## START / END
```
var asyncTimer = require('async-timer');

var timer = asyncTimer();

var task = function () {
  timer.end('KEY1');
  console.log(timer.getMeasured());
}

timer.start('KEY1');
setTimeout(task, 500);
```

## WRAP
```
var asyncTimer = require('async-timer');

var timer = asyncTimer();

var task = function (next) {
  setTimeout(next, 500);
}

var callback = function (next) {
  console.log(timer.getMeasured());
}

var wrapped = timer.wrap(task, 'KEY2');
wrapped(callback);
```
