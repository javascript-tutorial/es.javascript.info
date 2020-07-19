
La solución es `pattern:<[^<>]+>`.

```js run
let regexp = /<[^<>]+>/g;

let str = '<> <a href="/"> <input type="radio" comprobado> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" comprobado>', '<b>'
```
