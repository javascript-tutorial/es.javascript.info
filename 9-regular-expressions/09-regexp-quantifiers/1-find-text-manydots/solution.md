
Solución:

```js run
let regexp = /\.{3,}/g;
alert( "Hola!... ¿Cómo vas?.....".match(regexp) ); // ..., .....
```

Tenga en cuenta que el punto es un carácter especial, por lo que debemos escaparlo e insertarlo como `\.`.
