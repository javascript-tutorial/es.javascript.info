
# Función en if

<<<<<<< HEAD:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md
Mira el código ¿Cuál será el resultado de la llamada en la última línea?
=======
Look at the code. What will be the result of the call at the last line?
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1:1-js/06-advanced-functions/03-closure/5-function-in-if/task.md

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
