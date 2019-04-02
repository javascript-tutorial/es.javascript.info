# Círculo animado con callbacks

En esta tarea <info:task/animate-circle> se muestra un círculo animado creciendo.

Ahora, digamos que no necesitamos sólo un círculo, sino también mostrar un mensaje dentro de él. El mensaje debe aparecer _después_ que se ha completado la animación (el círculo ha crecido por completo), de otra manera se vería feo.

El la solución de esta tarea, la función `showCircle(cx, cy, radius)` dibuja el círulo, pero no hay manera de rastrea cuando está listo.

Agrega un argumento callback: `showCircle(cx, cy, radius, callback)` a ser llamado cuando la animación se halla completado. El `callback` debe recibir como un argumonto el `<div>` del círculo.

Aquí hay un ejemplo:

```js
showCircle(150, 150, 100, div => {
  div.classList.add("message-ball");
  div.append("Hello, world!");
});
```

Demo:

[iframe src="solution" height=260]

Toma la solución de la tarea <info:task/animate-circle> como base.
