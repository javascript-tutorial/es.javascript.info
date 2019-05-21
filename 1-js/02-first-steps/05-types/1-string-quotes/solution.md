
Los "backticks" incrustan la expresión dentro de `${...}` en la cadena.

```js run
let name = "Ilya";

// la expresión es un número 1
alert( `hola ${1}` ); // hola 1

// la expresión es una cadena "nombre"
alert( `hola ${"name"}` ); // hola name

// la expresión es una variable, incrustarla
alert( `hola ${name}` ); // hola Ilya
```
