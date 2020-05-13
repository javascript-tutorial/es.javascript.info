
# ¿Volver a resolver una promesa?


¿Cuál es el resultado del código a continuación?

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
