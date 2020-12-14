<<<<<<< HEAD
Un número positivo con una parte decimal opcional es (de acuerdo a la tarea anterior): `pattern:\d+(\.\d+)?`.
=======
A positive number with an optional decimal part is: `pattern:\d+(\.\d+)?`.
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557

Agreguemos el opcional al comienzo `pattern:-`:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
