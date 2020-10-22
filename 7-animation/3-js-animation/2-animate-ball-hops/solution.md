En la tarea <info:task/animate-ball> solo teníamos una propiedad para animar. Ahora necesitamos una más: `elem.style.left`.

La coordenada horizontal cambia por otra ley: no "rebota", sino que aumenta gradualmente desplazando la pelota hacia la derecha.

Podemos escribir una `animate` más para ello.

Como función de tiempo podríamos usar `linear`, pero algo como `makeEaseOut(quad)` se ve mucho mejor.

El código:

```js
let height = field.clientHeight - ball.clientHeight;
let width = 100;

// animate top (rebotando)
animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw: function(progress) {
    ball.style.top = height * progress + 'px'
  }
});

// animate left (moviéndose a la derecha)
animate({
  duration: 2000,
  timing: makeEaseOut(quad),
  draw: function(progress) {
    ball.style.left = width * progress + "px"
  }
});
```
