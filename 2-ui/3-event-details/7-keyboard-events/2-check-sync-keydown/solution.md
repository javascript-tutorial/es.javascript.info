
Debemos manejar dos eventos: `document.onkeydown` y `document.onkeyup`.

Creemos un set `pressed = new Set()` para registrar las teclas presionads actualmente.

El primer manejador las agrega en él, mientras que el segundo las quita. Con cada `keydown` verificamos si tenemos suficientes teclas presionadas, y ejecutamos la función si es así.
