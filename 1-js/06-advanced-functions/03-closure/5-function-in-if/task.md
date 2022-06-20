importance: 5

<<<<<<< HEAD
# Función en if
=======
---
# Function in if
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

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
