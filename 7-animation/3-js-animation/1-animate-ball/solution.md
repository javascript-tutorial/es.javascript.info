Para rebotar podemos usar la propiedad CSS `top` y `position:absolute` para la pelota dentro del campo con `position:relative`.

La coordenada inferior del campo es `field.clientHeight`. La propiedad CSS `top` se refiere al borde superior de la bola. Por lo tanto, debe ir desde `0` hasta `field.clientHeight - ball.clientHeight`, que es la posición final más baja del borde superior de la pelota.

Para obtener el efecto de "rebote", podemos usar la función de sincronización `bounce` en el modo `easeOut`.

Aquí está el código final de la animación:

```js
let to = field.clientHeight - ball.clientHeight;

animate({
  duration: 2000,
  timing: makeEaseOut(bounce),
  draw(progress) {
    ball.style.top = to * progress + 'px'
  }
});
```
