Un número positivo con una parte decimal opcional es: `pattern:\d+(\.\d+)?`.

Agreguemos el opcional al comienzo `pattern:-`:

```js run
let regexp = /-?\d+(\.\d+)?/g;

let str = "-1.5 0 2 -123.4.";

alert( str.match(regexp) );   // -1.5, 0, 2, -123.4
```
