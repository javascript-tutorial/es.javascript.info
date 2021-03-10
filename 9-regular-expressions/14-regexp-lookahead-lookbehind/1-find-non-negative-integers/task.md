# Encontrar enteros no negativos

Tenemos un string de números enteros.

Crea una expresión regular que encuentre solamente los no negativos (el cero está permitido).

Un ejemplo de uso:
```js
let regexp = /tu regexp/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
