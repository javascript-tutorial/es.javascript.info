Seguramente funcionará bien.

Ambas funciones anidadas se crean dentro del mismo entorno léxico externo, por lo que comparten acceso a la misma variable `count`:

```js run
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };

  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // 1
alert( counter.up() ); // 2
alert( counter.down() ); // 1
```
