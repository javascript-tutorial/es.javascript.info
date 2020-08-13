# Encuentre todos los números

Escribe una expresión regular que busque todos los números decimales, incluidos los enteros, con el punto flotante y los negativos.

Un ejemplo de uso:

```js
let regexp = /your regexp/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) ); // -1.5, 0, 2, -123.4
```
