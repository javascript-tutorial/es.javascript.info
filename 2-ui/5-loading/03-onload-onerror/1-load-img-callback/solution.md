
El algoritmo:
1. Crear una `img` para cada fuente.
2. Agregar los eventos `onload/onerror` para cada imágen.
3. Incrementar el contador cuando el evento `onload` o el evento `onerror` se dispare.
4. Cuando el valor del contador es igual a la cantidad de fuentes, hemos terminado: `callback()`.
