<<<<<<< HEAD
Necesitamos encontrar el inicio del comentario `match:<!--`, después todo hasta el fin de `match:-->`.

Una variante aceptable es `pattern:<!--.*?-->` -- el cuantificador perezoso detiene el punto justo antes de `match:-->`. También necesitamos agregar la bandera `pattern:s` al punto para incluir líneas nuevas.

De lo contrario, no se encontrarán comentarios multilínea:
=======
We need to find the beginning of the comment `match:<!--`, then everything till the end of `match:-->`.

An acceptable variant is `pattern:<!--.*?-->` -- the lazy quantifier makes the dot stop right before `match:-->`. We also need to add flag `pattern:s` for the dot to include newlines.

Otherwise multiline comments won't be found:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let regexp = /<!--.*?-->/gs;

<<<<<<< HEAD
let str = `... <!-- Mi -- comentario
 prueba --> ..  <!----> ..
`;

alert( str.match(regexp) ); // '<!-- Mi -- comentario \n prueba -->', '<!---->'
=======
let str = `... <!-- My -- comment
 test --> ..  <!----> ..
`;

alert( str.match(regexp) ); // '<!-- My -- comment \n test -->', '<!---->'
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
```
