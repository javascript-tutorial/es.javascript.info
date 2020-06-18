

Eso es porque `map.keys()` devuelve un iterable, pero no un array.

Podemos convertirlo en un array usando `Array.from`:


```js run
let map = new Map();

map.set("name", "John");

*!*
let keys = Array.from(map.keys());
*/!*

keys.push("more");

alert(keys); // name, more
```
