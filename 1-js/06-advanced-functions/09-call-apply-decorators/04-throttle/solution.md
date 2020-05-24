```js demo
function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) { // (2)
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments); // (1)

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false; // (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
```

Una llamada a `throttle(func, ms)` devuelve `wrapper`.

1. Durante la primera llamada, el `wrapper` solo ejecuta `func` y establece el estado de enfriamiento (`isThrottled = true`).
2. En este estado, todas las llamadas se memorizan en `savedArgs/savedThis`. Tenga en cuenta que tanto el contexto como los argumentos son igualmente importantes y deben memorizarse. Los necesitamos simultáneamente para reproducir la llamada.
3. Después de que pasan `ms` milisegundos, se activa `setTimeout`. El estado de enfriamiento se elimina (`isThrottled = false`) y, si ignoramos las llamadas,`wrapper` se ejecuta con los últimos argumentos y contexto memorizados.

El tercer paso no ejecuta `func`, sino `wrapper`, porque no solo necesitamos ejecutar `func`, sino que una vez más ingresamos al estado de enfriamiento y configuramos el tiempo de espera para restablecerlo.
