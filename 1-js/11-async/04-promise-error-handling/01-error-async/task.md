# Error en setTimeout

¿Qué crees que pasará? ¿Se disparará el `.catch`? Explica tu respuesta.

```js
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);
```
