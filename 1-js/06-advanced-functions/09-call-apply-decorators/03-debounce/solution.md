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

>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
