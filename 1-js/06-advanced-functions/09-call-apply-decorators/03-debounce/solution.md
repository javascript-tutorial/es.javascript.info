```js demo
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

```

Una llamada a `debounce` devuelve un contenedor o "wrapper". Cuando se la llama, planifica la llamada a la función original después de los `ms` dados y cancela el tiempo de espera anterior.
