
# Función en if

Mira el código ¿Cuál será el resultado de la llamada en la última línea?

```js run
let phrase = "Hello";

if (true) {
  let user = "John";

  function sayHi() {
    alert(`${phrase}, ${user}`);
  }
}

*!*
sayHi();
*/!*
```
