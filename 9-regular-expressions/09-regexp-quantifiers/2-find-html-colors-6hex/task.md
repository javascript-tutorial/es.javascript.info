# Regexp para colores HTML

Escribe una regexp para encontrar colores HTML escritos como `#ABCDEF`: primero `#`  y luego 6 caracteres hexadecimales.

Un ejemplo de uso:

```js
let regexp = /...tu regexp.../

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2 #12345678";

alert( str.match(regexp) )  // #121212,#AA00ef
```

P.D. En esta tarea no necesitamos otro formato de color como `#123` o `rgb(1,2,3)`, etc.
