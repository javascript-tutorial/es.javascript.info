
La expresión regular para un número entero es `pattern:\d+`.

Podemos excluir los negativos anteponiendo un "lookbehind negativo": `pattern:(?<!-)\d+`.

Pero al probarlo, notamos un resultado de más:

```js run
let regexp = /(?<!-)\d+/g;

let str = "0 12 -5 123 -18";

console.log( str.match(regexp) ); // 0, 12, 123, *!*8*/!*
```

Como puedes ver, hay coincidencia de `match:8`, con `subject:-18`. Para excluirla necesitamos asegurarnos de que `regexp` no comience la búsqueda desde el medio de otro número (no coincidente).

Podemos hacerlo especificando otra precedencia "lookbehind negativo": `pattern:(?<!-)(?<!\d)\d+`. Ahora `pattern:(?<!\d)` asegura que la coicidencia no comienza después de otro dígito, justo lo que necesitamos.

También podemos unirlos en un único "lookbehind":

```js run
let regexp = /(?<![-\d])\d+/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```
