
# Función dentro de if

Mira el código. ¿Qué resultado tendrá la llamada en la última línea?

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
