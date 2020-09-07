
<<<<<<< HEAD
El algorítmo luce simple:
1. Coloca los controladores `onmouseover/out` en el elemento. Aquí también podemos usar `onmouseenter/leave` pero son menos universales, no funcionan si introducimos delegaciones.
2. Cuando el cursor ingrese al elemento debes medir la velocidad en `mousemove`.
3. Si la velocidad es lenta hay que ejecutar `over`.
4. Si estamos saliendo del elemento, y `over` ya se había ejecutado, ahora ejecutamos `out`.

¿Pero cómo mediremos la velocidad?

La primera idea puede ser: correr una función cada `100ms` y medir la distancia entre la coordenada anterior y la actual. Si es pequeña entonces la velocidad fue rápida.
=======
The algorithm looks simple:
1. Put `onmouseover/out` handlers on the element. Also can use `onmouseenter/leave` here, but they are less universal, won't work if we introduce delegation.
2. When a mouse cursor entered the element, start measuring the speed on `mousemove`.
3. If the speed is slow, then run `over`.
4. When we're going out of the element, and `over` was executed, run `out`.

But how to measure the speed?

The first idea can be: run a function every `100ms` and measure the distance between previous and new coordinates. If it's small, then the speed is small.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Desafortunadamente no hay manera para obtener las coordenadas actuales del mouse en JavaScript. No existe algo así como `getCurrentMouseCoordinates()`.

<<<<<<< HEAD
La única manera es registrando los eventos del mouse, como `mousemove`, y tomar las coordenadas del objeto del evento.

Entonces configuremos un `mousemove` para registrar las coordenadas y recordarlas. Y entonces las comparamos, una por cada `100ms`.
=======
The only way to get coordinates is to listen for mouse events, like `mousemove`, and take coordinates from the event object.

So let's set a handler on `mousemove` to track coordinates and remember them. And then compare them, once per `100ms`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

PD. Toma nota: El test de la solución usa `dispatchEvent` para ver si el tooltip funciona bien.
