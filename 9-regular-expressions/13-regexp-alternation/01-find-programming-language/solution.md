
La primera idea puede ser listar los idiomas con `|` en el medio.

Pero eso no funciona bien:

```js run
let regexp = /Java|JavaScript|PHP|C|C\+\+/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,Java,PHP,C,C
```

El motor de expresiones regulares busca las alternancias una por una. Es decir: primero verifica si tenemos `match: Java`, de lo contrario - busca `match: JavaScript` y así sucesivamente.

Como resultado, nunca se puede encontrar `match: JavaScript`, simplemente porque encuentra primero `match: Java`.

Lo mismo con `match: C` y `match: C++ `.

Hay dos soluciones para ese problema:

1. Cambiar el orden para comprobar primero la coincidencia más larga: `pattern:JavaScript|Java|C\+\+|C|PHP`.
2. Fusionar variantes con el mismo inicio: `pattern:Java(Script)?|C(\+\+)?|PHP`.

En acción:

```js run
let regexp = /Java(Script)?|C(\+\+)?|PHP/g;

let str = "Java, JavaScript, PHP, C, C++";

alert( str.match(regexp) ); // Java,JavaScript,PHP,C,C++
```
