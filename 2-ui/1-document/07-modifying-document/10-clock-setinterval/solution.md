Primero escribamos HTML/CSS.

Cada componente de la hora se verá muy bien dentro de su propio `<span>`:

```html
<div id="clock">
  <span class="hour">hh</span>:<span class="min">mm</span>:<span class="sec">ss</span>
</div>
```

También necesitamos CSS para colorearlos.

La función `update` que refrescará el reloj será llamada por `setInterval` una vez por segundo:

```js
function update() {
  let clock = document.getElementById('clock');
*!*
  let date = new Date(); // (*)
*/!*
  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}
```

En la línea `(*)` verificamos la hora cada vez. Las llamadas a `setInterval` no son confiables: pueden ocurrir con demoras.

Las funciones que manejan el reloj:

```js
let timerId;

function clockStart() { // ejecuta el reloj  
  if (!timerId) { // solo establece un nuevo intervalo si el reloj no está corriendo
    timerId = setInterval(update, 1000);
  }
  update(); // (*)
}

function clockStop() {
  clearInterval(timerId);
  timerId = null; // (**)
}
```

Nota que la llamada a `update()` no solo está agendada en `clockStart()`, también la ejecuta inmediatamente en la línea `(*)`. De otro modo el visitante tendría que esperar hasta la primera ejecución de `setInterval`. Y el reloj estaría vacío hasta entonces.

También es importante establecer un nuevo intervalo en `clockStart()` solamente cuando el reloj no está corriendo. De otra forma al cliquear el botón de inicio varias veces se establecerían múltiples intervalos concurrentes. Peor aún, solo mantendríamos el `timerID` del último intervalo, perdiendo referencia a todos los demás. ¡No podríamos detener el reloj nunca más! Nota que necesitamos limpiar `timerID` cuando el reloj es detenido en la línea `(**)`, así puede ser reiniciado corriendo `clockStart()`.
