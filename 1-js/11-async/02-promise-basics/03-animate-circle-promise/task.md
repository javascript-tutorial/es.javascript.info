
# Círculo animado con promesa

Vuelva a escribir la función `showCircle` en la solución de la tarea <info:task/animate-circle-callback> para que devuelva una promesa en lugar de aceptar un callback.

El nuevo uso:

```js
showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hola, mundo!");
});
```

Tome la solución de la tarea <info:task/animate-circle-callback> como base.
