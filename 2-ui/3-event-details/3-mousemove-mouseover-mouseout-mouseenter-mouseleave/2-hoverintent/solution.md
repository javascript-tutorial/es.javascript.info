
El algorítmo luce simple:
1. Coloca los controladores `onmouseover/out` en el elemento. Aquí también podemos usar `onmouseenter/leave` pero son menos universales, no funcionan si introducimos delegaciones.
2. Cuando el cursor ingrese al elemento debes medir la velocidad en `mousemove`.
3. Si la velocidad es lenta hay que ejecutar `over`.
4. Si estamos saliendo del elemento, y `over` ya se había ejecutado, ahora ejecutamos `out`.

¿Pero cómo mediremos la velocidad?

La primera idea puede ser: correr una función cada `100ms` y medir la distancia entre la coordenada anterior y la actual. Si es pequeña entonces la velocidad fue rápida.

Desafortunadamente no hay manera para obtener las coordenadas actuales del mouse en JavaScript. No existe algo así como `getCurrentMouseCoordinates()`.

La única manera es registrando los eventos del mouse, como `mousemove`, y tomar las coordenadas del objeto del evento.

Entonces configuremos un `mousemove` para registrar las coordenadas y recordarlas. Y entonces las comparamos, una por cada `100ms`.

PD. Toma nota: El test de la solución usa `dispatchEvent` para ver si el tooltip funciona bien.
