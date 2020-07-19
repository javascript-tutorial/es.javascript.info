Necesitamos encontrar el inicio del comentario `match:<!--`, después todo hasta el fin de `match:-->`.

Una variante aceptable es `pattern:<!--.*?-->` -- el cuantificador perezoso detiene el punto justo antes de `match:-->`. También necesitamos agregar la bandera `pattern:s` al punto para incluir líneas nuevas.

De lo contrario, no se encontrarán comentarios multilínea:

```js run
let regexp = /<!--.*?-->/gs;

let str = `... <!-- Mi -- comentario
 prueba --> ..  <!----> ..
`;

alert( str.match(regexp) ); // '<!-- Mi -- comentario \n prueba -->', '<!---->'
```
