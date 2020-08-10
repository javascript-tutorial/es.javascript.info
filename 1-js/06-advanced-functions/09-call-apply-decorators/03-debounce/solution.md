```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```
<<<<<<< HEAD

Una llamada a `debounce` devuelve un contenedor wrapper. Cuando se le llama, planifica la llamada a la función original después de los `ms` dados y cancela el tiempo de espera anterior.
=======

A call to `debounce` returns a wrapper. When called, it schedules the original function call after given `ms` and cancels the previous such timeout.

>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
