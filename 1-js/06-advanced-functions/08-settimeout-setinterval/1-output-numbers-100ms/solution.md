
Usando `setInterval`:

```js run
function printNumbers(from, to) {
  let current = from;

  let timerId = setInterval(function() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }, 1000);
}

// uso:
printNumbers(5, 10);
```

Usando `setTimeout` anidado:


```js run
function printNumbers(from, to) {
  let current = from;

  setTimeout(function go() {
    alert(current);
    if (current < to) {
      setTimeout(go, 1000);
    }
    current++;
  }, 1000);
}

// uso:
printNumbers(5, 10);
```

Tenga en cuenta que en ambas soluciones, hay un retraso inicial antes de la primera salida. La función se llama después de `1000ms` la primera vez.

Si también queremos que la función se ejecute inmediatamente, entonces podemos agregar una llamada adicional en una línea separada, como esta:

```js run
function printNumbers(from, to) {
  let current = from;

  function go() {
    alert(current);
    if (current == to) {
      clearInterval(timerId);
    }
    current++;
  }

*!*
  go();
*/!*
  let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);
```
