# Carga de recursos: onload y onerror

El navegador nos permite hacer seguimiento de la carga de recursos externos -- scripts, iframes, imagenes y más.

Hay dos eventos para eso:

- `onload` -- cuando cargo exitosamente,
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
Para nuestros scripts podemos usar [JavaScript modules](info:modules) esto, pero no esta adoptado ampliamente por bibliotecas de terceros.
```

### script.onload

El evento `load` se ejecuta despues de que el script sea cargado y ejecutado.

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

Errors that may occur during script processing and execution are out of scope for these events. That is: if a script loaded successfully, then `onload` triggers, even if it has programming errors in it. To track script errors, one can use `window.onerror` global handler.
```

## Other resources

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

There are some notes though:

- Most resources start loading when they are added to the document. But `<img>` is an exception. It starts loading when it gets a src `(*)`.
- For `<iframe>`, the `iframe.onload` event triggers when the iframe loading finished, both for successful load and in case of an error.

Por históricas razones.

## Política de Crossorigin

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

Details may vary depending on the browser, but the idea is the same: any information about the internals of a script, including error stack traces, is hidden. Exactly because it's from another domain.

¿Por qué necesitamos detalles de error?

There are many services (and we can build our own) that listen for global errors using `window.onerror`, save errors and provide an interface to access and analyze them. That's great, as we can see real errors, triggered by our users. But if a script comes from another origin, then there's not much information about errors in it, as we've just seen.

Similar cross-origin policy (CORS) is enforced for other types of resources as well.

**To allow cross-origin access, the `<script>` tag needs to have the `crossorigin` attribute, plus the remote server must provide special headers.**

Hay 3 niveles de acceso a cross-origin:

1. **No `crossorigin` attribute** -- access prohibited.
2. **`crossorigin="anonymous"`** -- access allowed if the server responds with the header `Access-Control-Allow-Origin` with `*` or our origin. Browser does not send authorization information and cookies to remote server.
3. **`crossorigin="use-credentials"`** -- access allowed if the server sends back the header `Access-Control-Allow-Origin` with our origin and `Access-Control-Allow-Credentials: true`. Browser sends authorization information and cookies to remote server.

```smart
Tu puedes leer más sobre accesos de origen cruzado (`cross-origin`)

Cosas como las "cookies" estan fuera de nuestro alcance, pero podemos leer sobre ellas en <info:cookie>.
```

En nuetro caso no teníamos ningún atributo de origen cruzado `cross-origin`. Por lo que se prohibió el acceso de origen cruzado. Vamos a agregarlo.

Podemos elegir entre `"anonymous"` (no se envian las cookies, una sola cabecera esa necesaria en el lado del servidor) y `"use-credentials"` (envias las cookies, dos cabeceras son necesarias en el lado del servidor).

Si no nos importan las las `cookies`, entonces `"anonymous"` es el camino a seguir:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script *!*crossorigin="anonymous"*/!* src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Ahora, asumiendo que el servedor provee una cabecera `Access-Control-Allow-Origin`, todo esta bien. Podemos tener el reporte completo del error.

## Summary

Las imagenes `<img>`, estilos externos, scripts y otros recursos proveen los eventos `load` and `error` para rastrear sus cargas:

- `load` se ejecuta cuando la carga ha sido exitosa,
- `error` se ejecuta cuando una carga ha fallado.

La única exception es el `<iframe>`: for razones historicas siempre dispara el evento `load`, incluso sino no encontró la página.

El evento `readystatechange` también funciona para recursos, pero es muy poco usado debido a que los eventos `load/error` son mas simples.
