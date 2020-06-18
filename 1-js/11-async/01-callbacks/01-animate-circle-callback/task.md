
# Círculo animado con función de callback

En la tarea <info:task/animate-circle> se muestra un círculo creciente animado.

Ahora digamos que necesitamos no solo un círculo, sino mostrar un mensaje dentro de él. El mensaje debería aparecer *después* de que la animación esté completa (el círculo es desarrollado completamente), de lo contrario se vería feo.

En la solución de la tarea, la función `showCircle(cx, cy, radius)` dibuja el círculo, pero no hay forma de saber cuando lo termina.

Agrega un argumento callback: `showCircle(cx, cy, radius, callback)` que se llamará cuando se complete la animación. El `callback` debería recibir el círculo `<div>` como argumento.

Aqui el ejemplo:

```js
showCircle(150, 150, 100, div => {
  div.classList.add('message-ball');
  div.append("Hola, mundo!");
});
```

Demostración:

[iframe src="solution" height=260]

Toma la solución de la tarea <info:task/animate-circle> como base.
