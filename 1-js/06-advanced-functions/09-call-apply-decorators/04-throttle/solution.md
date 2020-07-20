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

Una llamada a `throttle(func, ms)` devuelve un `wrapper`.

<<<<<<< HEAD
1. Durante la primera llamada, el `wrapper` solo ejecuta `func` y establece el estado de enfriamiento (`isThrottled = true`).
2. En este estado, todas las llamadas se memorizan en `savedArgs/savedThis`. Tenga en cuenta que tanto el contexto como los argumentos son igualmente importantes y deben memorizarse. Los necesitamos simultáneamente para reproducir la llamada.
3. Después de que pasan `ms` milisegundos, se activa `setTimeout`. El estado de enfriamiento se elimina (`isThrottled = false`) y, si ignoramos las llamadas,`wrapper` se ejecuta con los últimos argumentos y contexto memorizados.
=======
1. During the first call, the `wrapper` just runs `func` and sets the cooldown state (`isThrottled = true`).
2. In this state all calls are memorized in `savedArgs/savedThis`. Please note that both the context and the arguments are equally important and should be memorized. We need them simultaneously to reproduce the call.
3. After `ms` milliseconds pass, `setTimeout` triggers. The cooldown state is removed (`isThrottled = false`) and, if we had ignored calls, `wrapper` is executed with the last memorized arguments and context.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

El tercer paso no ejecuta `func`, sino `wrapper`, porque no solo necesitamos ejecutar `func`, sino que una vez más ingresamos al estado de enfriamiento y configuramos el tiempo de espera para restablecerlo.
