# Carga de recursos: onload y onerror

El navegador nos permite hacer seguimiento de la carga de recursos externos: scripts, iframes, imagenes y más.

Hay dos eventos para eso:

- `onload` -- cuando cargó exitosamente,
- `onerror` -- cuando un error ha ocurrido.

## Cargando un script

Digamos que tenemos que cargar un script de terceros y llamar una función que se encuentra dentro.

Podemos cargarlo dinámicamente de esta manera:

```js
let script = document.createElement("script");
script.src = "my.js";

document.head.append(script);
```

...pero como podemos ejecutar la función que esta dentro del script? Necesitamos esperar hasta que el script haya cargado, y solo después podemos llamarlo.

```smart
Para nuestros scripts podemos usar [JavaScript modules](info:modules) aquí, pero no está adoptado ampliamente por bibliotecas de terceros.
```

### script.onload

El evento `load` se dispara después de que script sea cargado y ejecutado.

Por ejemplo:

```js run untrusted
let script = document.createElement('script');

// podemos cargar cualquier script desde cualquier dominio
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
document.head.append(script);

*!*
script.onload = function() {
  // el script crea una función de ayuda "_"
  alert(_); // la función está disponible
};
*/!*
```

Entonces en `onload` podemos usar variables, ejecutar funciones, etc.

...y que si la carga falla? Por ejemplo: no hay tal script (error 404) en el servidor o el servidor esta caido (unavailable).

### script.onerror

Los errors que ocurren durante la carga de un script puede ser rastreados en el evento `error`.

Por ejemplo, hagamos una petición a un script que no existe:

```js run
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // no hay tal script
document.head.append(script);

*!*
script.onerror = function() {
  alert("Error al cargar " + this.src); // Error al cargar https://example.com/404.js
};
*/!*
```

Por favor nota que como no podemos obtener detalles del error HTTP aquí, no podemos saber if fue un error 404 o algo diferente. Solo el error de carga.

```warn
Los eventos `onload/onerror` rastrean solamente la carga de ellos mismos.

Los errores que ocurren durante el procesamiento y ejecución estan fuera del alcance para esos eventos. Eso es: si un script es cargado de manera exitosa, es decir cuando el evento `onload` se dispara, incluso si tiene errores de programación adentro. Para rastrear los errores del script un puede usar el manejador global `window.onerror`;
```

## Otros recursos

Los eventos `load` y `error` también funcionan para otros recursos, basicamente para cualquier que tiene una externa `src`

Por ejemplo:

```js run
let img = document.createElement("img");
img.src = "https://js.cx/clipart/train.gif"; // (*)

img.onload = function () {
  alert(`Image loaded, size ${img.width}x${img.height}`);
};

img.onerror = function () {
  alert("Error occurred while loading image");
};
```

Sin embargo, hay algunas notas:

- La mayoría de recursos empiezan a cargarse cuando son agregados al documento. Pero `<img>` es una excepción, comienza la carga cuando tiene una fuente `(*)`.
- Para `<iframe>`, el evento `iframe.onload` se dispara cuando el iframe ha terminado de cargar, tanto para una carga exitosa como en caso de un error.

Por históricas razones.

## Política de origen cruzado

Hay algunas reglas: los scripts un sitio cuyo contenido no puede ser accedido de otro sitio. Por ejemplo: un script de `https://facebook.com` no puede leer la bandeja de correros del usuario en `https://gmail.com`.

O para ser mas precisos, un origen (dominio/puerto/protocolo trillizo) no puede acceder al contenido de otro. Entonces, incluso si tenemos un sub-dominio o solo otro puerto son diferentes origenes sin acceso al otro.

Esta regla también afecta a recursos de otros dominios.

Si usamos un script de otro dominio y tiene un error,, no podemos obtener detalles del error.

Por ejemplo, tomemos un script `error.js` que consta de un única llamda a una función (mala).
```js
// 📁 error.js
noSuchFunction();
```

Ahora cargalo desde el mismo sitio donde esta alojado:

```html run height=0
<script>
  window.onerror = function (message, url, line, col, errorObj) {
    alert(`${message}\n${url}, ${line}:${col}`);
  };
</script>
<script src="/article/onload-onerror/crossorigin/error.js"></script>
```

Podemos ver un buen reporte de error, como este:

```
Uncaught ReferenceError: noSuchFunction is not defined
https://javascript.info/article/onload-onerror/crossorigin/error.js, 1:1
```

Ahora carguemos el mismo script desde otro dominio:

```html run height=0
<script>
  window.onerror = function (message, url, line, col, errorObj) {
    alert(`${message}\n${url}, ${line}:${col}`);
  };
</script>
<script src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

El reporte es diferente, como este:

```
Script error.
, 0:0
```

Los detalles pueden variar dependiendo del navegador, pero la idea es la misma: cualquier información sobre las partes internas de un script, incluyendo el rastreo de la pila de errores, oculta. Exactamente porque es de otro dominio.

¿Por qué necesitamos detalles de error?

Hay muchos servicios (y podemos contruir uno nuestro) que escuchan lo errores globales usando `window.onerror`, guardan los errores y proveen una interfaz para acceder a ellos y analizarlos. Eso es grandioso ya que podemos ver los errores originales ocasionados por nuestros usuarios. Pero si el script viene desde otro origen no hay mucha información sobre los errores como acabamos de ver.

También se aplica políticas similares de origen cruzado (CORS) a otros tipos de recursos.

**Para permitir el accesso de origen cruzado, la etiqueta `<script>` necesita tener el atributo `crossorigin`, además el servidor remoto debe proporcionar cabeceras especiales.**

Hay 3 niveles de acceso de origen cruzado:

1. **Sin el atributo `crossorigin`** -- acceso prohibido.
2. **`crossorigin="anonymous"`** -- acceso permitido si el servidor responde con la cabecera `Access-Control-Allow-Origin` con `*` o nuestro origen. El navegador no envía la información de la autorización y cookies al servidor remoto.
3. **`crossorigin="use-credentials"`** -- acceso permitido si el servidor envia de vuelta la cabecera `Access-Control-Allow-Origin` con nuestro origen y `Access-Control-Allow-Credentials: true`. El navegador envía la información de la autorización y las cookies al servidor remoto.

```smart
Tu puedes leer más sobre accesos de origen cruzado (`cross-origin`)

Cosas como las "cookies" estan fuera de nuestro alcance, pero podemos leer sobre ellas en <info:cookie>.
```

En nuetro caso no teníamos ningún atributo de origen cruzado (`cross-origin`). Por lo que se prohibió el acceso de origen cruzado. Vamos a agregarlo.

Podemos elegir entre `"anonymous"` (no se envian las cookies, una sola cabecera esa necesaria en el lado del servidor) y `"use-credentials"` (envias las cookies, dos cabeceras son necesarias en el lado del servidor).

Si no nos importan las `cookies`, entonces `"anonymous"` es el camino a seguir:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script *!*crossorigin="anonymous"*/!* src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Ahora, asumiendo que el servedor provee una cabecera `Access-Control-Allow-Origin`, todo esta bien. Podemos tener el reporte completo del error.

## Resumen

Las imágenes `<img>`, estilos externos, scripts y otros recursos proveen los eventos `load` y `error` para rastrear sus cargas:

- `load` se ejecuta cuando la carga ha sido exitosa,
- `error` se ejecuta cuando una carga ha fallado.

La única exception es el `<iframe>`: for razones historicas siempre dispara el evento `load`, incluso sino no encontró la página.

El evento `readystatechange` también funciona para recursos, pero es muy poco usado debido a que los eventos `load/error` son mas simples.
