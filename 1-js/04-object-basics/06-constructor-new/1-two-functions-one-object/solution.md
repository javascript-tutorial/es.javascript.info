Si, es posible.

Si una función devuelve un objeto, entonces `new` lo devuelve en vez de `this`.

Por lo tanto pueden, por ejemplo, devolver el mismo objeto definido externamente `obj`:

```js run no-beautify
let obj = {};

function A() { return obj; }
function B() { return obj; }

alert( new A() == new B() ); // true
```
