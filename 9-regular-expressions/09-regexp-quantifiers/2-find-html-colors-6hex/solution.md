Necesitamos buscar `#` seguido de 6 caracteres hexadecimales.

Un carácter hexadecimal se puede describir como `pattern:[0-9a-fA-F]`. O si usamos la bandera `pattern:i`, entonces simplemente `pattern:[0-9a-f]`.

Entonces podemos buscar 6 de ellos usando el cuantificador `pattern:{6}`.

Como resultado, tenemos la regexp: `pattern:/#[a-f0-9]{6}/gi`.

```js run
let regexp = /#[a-f0-9]{6}/gi;

let str = "color:#121212; background-color:#AA00ef bad-colors:f#fddee #fd2"

alert( str.match(regexp) );  // #121212,#AA00ef
```

El problema es que también encuentra el color en secuencias más largas:

```js run
alert( "#12345678".match( /#[a-f0-9]{6}/gi ) ) // #123456
```

Para corregir eso, agregamos `pattern:\b` al final:

```js run
// color
alert( "#123456".match( /#[a-f0-9]{6}\b/gi ) ); // #123456

// sin color
alert( "#12345678".match( /#[a-f0-9]{6}\b/gi ) ); // null
```
