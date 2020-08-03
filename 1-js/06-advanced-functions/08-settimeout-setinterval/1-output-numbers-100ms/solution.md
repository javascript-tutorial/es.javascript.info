
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

<<<<<<< HEAD
Usando `setTimeout` anidado:
=======
Using nested `setTimeout`:

>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

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

<<<<<<< HEAD
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

=======
Note that in both solutions, there is an initial delay before the first output. The function is called after `1000ms` the first time.

If we also want the function to run immediately, then we can add an additional call on a separate line, like this:

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

>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
printNumbers(5, 10);
```
