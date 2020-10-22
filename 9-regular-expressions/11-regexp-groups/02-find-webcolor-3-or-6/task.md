# Encuentra el color en el formato #abc o #abcdef

Escriba una expresión regular que haga coincidir los colores en el formato `#abc` o `#abcdef`. Esto es: `#` seguido por 3 o 6 dígitos hexadecimales.

Ejemplo del uso:
```js
let regexp = /your regexp/g;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```

P.D. Esto debe ser exactamente 3 o 6 dígitos hexadecimales. Valores con 4 dígitos, tales como `#abcd`, no deben coincidir.
