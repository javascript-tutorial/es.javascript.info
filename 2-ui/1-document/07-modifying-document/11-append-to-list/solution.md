
Cuando necesitamos insertar una pieza de HTML en algún lugar, `insertAdjacentHTML` es lo más adecuado.
  
La solución:

```js
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');
```
