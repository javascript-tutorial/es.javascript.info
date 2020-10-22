# Encuentra el comentario HTML

Encuentra todos los comentarios HTML en el texto:

```js
let regexp = /your regexp/g;

let str = `... <!-- Mi -- comentario
 prueba --> ..  <!----> .. 
`;

alert( str.match(regexp) ); // '<!-- Mi -- comentario \n prueba -->', '<!---->'
```
