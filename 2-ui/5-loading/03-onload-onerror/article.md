# Carga de recursos: onload and onerror

El navegador nos permite hacer seguimiento de la carga de recursos externos -- scripts, iframes, imagenes y más.

Hay dos eventos para eso:

- `onload` -- cuando cargo exitosamente,
- `onerror` -- cuando un error ha ocurrido.

## Cargando un script

Digamos que tenemos que cargar un script de terceros y llamar una función que se encuentra dentro.

Podemos cargarlo dinámicamente de esta manera:

```js
let script = document.createElement('script');
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

Please note that we can't get HTTP error details here. We don't know if it was an error 404 or 500 or something else. Just that the loading failed.

```warn
Los eventos `onload/onerror` rastrean solamente la carga de ellos mismos.

Errors that may occur during script processing and execution are out of scope for these events. That is: if a script loaded successfully, then `onload` triggers, even if it has programming errors in it. To track script errors, one can use `window.onerror` global handler.
```

## Other resources

Los eventos `load` y `error` también funcionan para otros recursos, basicamente para cualquier que tiene una externa `src`

Por ejemplo:

```js run
let img = document.createElement('img');
img.src = "https://js.cx/clipart/train.gif"; // (*)

img.onload = function() {
  alert(`Image loaded, size ${img.width}x${img.height}`);
};

img.onerror = function() {
  alert("Error occurred while loading image");
};
```

There are some notes though:

- Most resources start loading when they are added to the document. But `<img>` is an exception. It starts loading when it gets a src `(*)`.
- For `<iframe>`, the `iframe.onload` event triggers when the iframe loading finished, both for successful load and in case of an error.

Por históricas razones.

## Política de Crossorigin

There's a rule: scripts from one site can't access contents of the other site. So, e.g. a script at `https://facebook.com` can't read the user's mailbox at `https://gmail.com`.

Or, to be more precise, one origin (domain/port/protocol triplet) can't access the content from another one. So even if we have a subdomain, or just another port, these are different origins with no access to each other.

Esta regla también afecta a recursos de otros dominios.

If we're using a script from another domain, and there's an error in it, we can't get error details.

For example, let's take a script `error.js` that consists of a single (bad) function call:
```js
// 📁 error.js
noSuchFunction();
```

Ahora cargalo desde el mismo sitio donde esta alojado:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
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
window.onerror = function(message, url, line, col, errorObj) {
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
You can read more about cross-origin access in the chapter <info:fetch-crossorigin>. It describes the `fetch` method for network requests, but the policy is exactly the same.

Such thing as "cookies" is out of our current scope, but you can read about them in the chapter <info:cookie>.
```

In our case, we didn't have any crossorigin attribute. So the cross-origin access was prohibited. Let's add it.

We can choose between `"anonymous"` (no cookies sent, one server-side header needed) and `"use-credentials"` (sends cookies too, two server-side headers needed).

If we don't care about cookies, then `"anonymous"` is the way to go:

```html run height=0
<script>
window.onerror = function(message, url, line, col, errorObj) {
  alert(`${message}\n${url}, ${line}:${col}`);
};
</script>
<script *!*crossorigin="anonymous"*/!* src="https://cors.javascript.info/article/onload-onerror/crossorigin/error.js"></script>
```

Now, assuming that the server provides an `Access-Control-Allow-Origin` header, everything's fine. We have the full error report.

## Summary

Las imagenes `<img>`, estilos externos, scripts y otros recursos proveen los eventos `load` and `error` para rastrear sus cargas:

- `load` se ejecuta cuando la carga ha sido exitosa,
- `error` se ejecuta cuando una carga ha fallado.

La única exception es el `<iframe>`: for razones historicas siempre dispara el evento `load`, incluso sino no encontró la página.

El evento `readystatechange` también funciona para recursos, pero es muy poco usado debido a que los eventos `load/error` son mas simples.
