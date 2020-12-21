<<<<<<< HEAD
Un número positivo con una parte decimal opcional es (de acuerdo a la tarea anterior): `pattern:\d+(\.\d+)?`.
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f

Agreguemos el opcional al comienzo `pattern:-`:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
