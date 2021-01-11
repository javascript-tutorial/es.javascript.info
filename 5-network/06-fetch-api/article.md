
# Fetch API

Hasta ahora, sabemos bastante sobre `fetch`.

Veamos el resto de API, para cubrir todas sus capacidades.

```smart
Ten en cuenta: la mayoría de estas opciones se utilizan con poca frecuencia. Puedes saltarte este capítulo y seguir utilizando bien `fetch`.

Aún así, es bueno saber lo que puede hacer `fetch`, por lo que si surge la necesidad, puedes regresar y leer los detalles.
```

Aquí está la lista completa de todas las posibles opciones de `fetch` con sus valores predeterminados (alternativas en los comentarios):

```js
let promise = fetch(url, {
  method: "GET", // POST, PUT, DELETE, etc.
  headers: {
    // el valor del encabezado Content-Type generalmente se establece automáticamente
    // dependiendo del cuerpo de la solicitud
    "Content-Type": "text/plain;charset=UTF-8"
  },
  body: undefined // string, FormData, Blob, BufferSource, o URLSearchParams
  referrer: "about:client", // o "" para no enviar encabezado de Referer,
  // o una URL del origen actual
  referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
  mode: "cors", // same-origin, no-cors
  credentials: "same-origin", // omit, include
  cache: "default", // no-store, reload, no-cache, force-cache, o only-if-cached
  redirect: "follow", // manual, error
  integrity: "", // un hash, como "sha256-abcdef1234567890"
  keepalive: false, // true
  signal: undefined, // AbortController para cancelar la solicitud
  window: window // null
});
```

Una lista impresionante, ¿verdad?

Cubrimos completamente `method`, `headers` y `body` en el capítulo <info:fetch>.

La opción `signal` está cubierta en <info:fetch-abort>.

<<<<<<< HEAD
Ahora exploremos el resto de capacidades.

## referrer, referrerPolicy

Estas opciones gobiernan cómo `fetch` establece el encabezado HTTP `Referer`.
=======
Now let's explore the remaining capabilities.

## referrer, referrerPolicy

These options govern how `fetch` sets the HTTP `Referer` header.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Por lo general, ese encabezado se establece automáticamente y contiene la URL de la página que realizó la solicitud. En la mayoría de los escenarios, no es importante en absoluto, a veces, por motivos de seguridad, tiene sentido eliminarlo o acortarlo.

**La opción `referrer` permite establecer cualquier `Referer` (dentro del origen actual) o eliminarlo.**

Para no enviar ningún referer, establece un string vacío:
```js
fetch('/page', {
*!*
  referrer: "" // sin encabezado Referer
*/!*
});
```

Para establecer otra URL dentro del origen actual:

```js
fetch('/page', {
  // asumiendo que estamos en https://javascript.info
  // podemos establecer cualquier encabezado Referer, pero solo dentro del origen actual
*!*
  referrer: "https://javascript.info/anotherpage"
*/!*
});
```

**La opción `referrerPolicy` establece reglas generales para `Referer`.**

Las solicitudes se dividen en 3 tipos:

1. Solicitud al mismo origen.
2. Solicitud a otro origen.
3. Solicitud de HTTPS a HTTP (de protocolo seguro a no seguro).

<<<<<<< HEAD
A diferencia de la opción `referrer` que permite establecer el valor exacto de `Referer`, `referrerPolicy` indica al navegador las reglas generales para cada tipo de solicitud.
=======
Unlike the `referrer` option that allows to set the exact `Referer` value, `referrerPolicy` tells the browser general rules for each request type.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Los valores posibles se describen en la [Especificación de la política Referrer](https://w3c.github.io/webappsec-referrer-policy/):

<<<<<<< HEAD
- **`"no-referrer-when-downgrade"`** -- el valor predeterminado: el `Referer` completo se envía siempre, a menos que enviemos una solicitud de HTTPS a HTTP (a un protocolo menos seguro).
- **`"no-referrer"`** -- nunca envía `Referer`.
- **`"origin"`** -- solo envía el origen en `Referer`, no la URL de la página completa. Por ejemplo, solo `http://site.com` en lugar de `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- envía el `Referrer` completo al mismo origen, pero solo la parte de origen para solicitudes cross-origin (como se indica arriba).
- **`"same-origin"`** -- envía un `Referer` completo al mismo origen, pero no un `Referer` para solicitudes cross-origin.
- **`"strict-origin"`** -- envía solo el origen, no envía `Referer` para solicitudes HTTPS→HTTP.
- **`"strict-origin-when-cross-origin"`** -- para el mismo origen, envía el `Referer` completo. Para el envío cross-origin envía solo el origen, a menos que sea una solicitud HTTPS→HTTP, entonces no envía nada.
- **`"unsafe-url"`** -- envía siempre la URL completa en `Referer`, incluso para solicitudes HTTPS→HTTP.
=======
- **`"no-referrer-when-downgrade"`** -- the default value: full `Referer` is always sent, unless we send a request from HTTPS to HTTP (to the less secure protocol).
- **`"no-referrer"`** -- never send `Referer`.
- **`"origin"`** -- only send the origin in `Referer`, not the full page URL, e.g. only `http://site.com` instead of `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- send the full `Referer` to the same origin, but only the origin part for cross-origin requests (as above).
- **`"same-origin"`** -- send the full `Referer` to the same origin, but no `Referer` for cross-origin requests.
- **`"strict-origin"`** -- send only the origin, not the `Referer` for HTTPS→HTTP requests.
- **`"strict-origin-when-cross-origin"`** -- for same-origin send the full `Referer`, for cross-origin send only the origin, unless it's HTTPS→HTTP request, then send nothing.
- **`"unsafe-url"`** -- always send the full url in `Referer`, even for HTTPS→HTTP requests.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Aquí hay una tabla con todas las combinaciones:

| Valor | Al mismo origen | A otro origen | HTTPS→HTTP |
|-------|----------------|-------------------|------------|
| `"no-referrer"` | - | - | - |
| `"no-referrer-when-downgrade"` o `""` (predeterminado) | completo | completo | - |
| `"origin"` | origen | origen | origen |
| `"origin-when-cross-origin"` | completo | origen | origen |
| `"same-origin"` | completo | - | - |
| `"strict-origin"` | origen | origen | - |
| `"strict-origin-when-cross-origin"` | completo | origen | - |
| `"unsafe-url"` | completo | completo | completo |

<<<<<<< HEAD
Digamos que tenemos una zona de administración con una estructura de URL que no debería conocerse desde fuera del sitio.
=======
Let's say we have an admin zone with a URL structure that shouldn't be known from outside of the site.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Si enviamos un `fetch`, entonces de forma predeterminada siempre envía el encabezado `Referer` con la URL completa de nuestra página (excepto cuando solicitamos de HTTPS a HTTP, entonces no hay `Referer`).

Por ejemplo, `Referer: https://javascript.info/admin/secret/paths`.

<<<<<<< HEAD
Si queremos que otros sitios web solo conozcan la parte del origen, no la ruta de la URL, podemos configurar la opción:
=======
If we'd like other websites know only the origin part, not the URL-path, we can set the option:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```

Podemos ponerlo en todas las llamadas `fetch`, tal vez integrarlo en la biblioteca JavaScript de nuestro proyecto que hace todas las solicitudes y que usa `fetch` por dentro.

Su única diferencia en comparación con el comportamiento predeterminado es que para las solicitudes a otro origen, `fetch` envía solo la parte de origen de la URL (por ejemplo, `https://javascript.info`, sin ruta). Para las solicitudes a nuestro origen, todavía obtenemos el `Referer` completo (quizás útil para fines de depuración).

```smart header="La política Referrer no es solo para `fetch`"
La política Referrer, descrita en la [especificación](https://w3c.github.io/webappsec-referrer-policy/), no es solo para `fetch`, sino más global.

<<<<<<< HEAD
En particular, es posible establecer la política predeterminada para toda la página utilizando el encabezado HTTP `Referrer-Policy`, o por enlace, con `<a rel="noreferrer">`.
=======
In particular, it's possible to set the default policy for the whole page using the `Referrer-Policy` HTTP header, or per-link, with `<a rel="noreferrer">`.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
```

## mode

La opción `mode` es una protección que evita solicitudes cross-origin ocasionales:

- **`"cors"`** -- por defecto, se permiten las solicitudes cross-origin predeterminadas, como se describe en <info:fetch-crossorigin>,
- **`"same-origin"`** -- las solicitudes cross-origin están prohibidas,
- **`"no-cors"`** -- solo se permiten solicitudes cross-origin seguras.

Esta opción puede ser útil cuando la URL de `fetch` proviene de un tercero y queremos un "interruptor de apagado" para limitar las capacidades cross-origin.

## credentials

La opción `credentials` especifica si `fetch` debe enviar cookies y encabezados de autorización HTTP con la solicitud.

- **`"same-origin"`** -- el valor predeterminado, no enviar solicitudes cross-origin,
- **`"include"`** -- enviar siempre, requiere `Accept-Control-Allow-Credentials` del servidor cross-origin para que JavaScript acceda a la respuesta, que se cubrió en el capítulo <info:fetch-crossorigin>,
- **`"omit"`** -- nunca enviar, incluso para solicitudes del mismo origen.

## cache

<<<<<<< HEAD
De forma predeterminada, las solicitudes `fetch` utilizan el almacenamiento en caché HTTP estándar. Es decir, respeta los encabezados `Expires`, `Cache-Control`, envía `If-Modified-Since`, y así sucesivamente. Al igual que lo hacen las solicitudes HTTP habituales.
=======
By default, `fetch` requests make use of standard HTTP-caching. That is, it respects the `Expires` and `Cache-Control` headers, sends `If-Modified-Since` and so on. Just like regular HTTP-requests do.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Las opciones de `cache` permiten ignorar el caché HTTP o ajustar su uso:

<<<<<<< HEAD
- **`"default"`** -- `fetch` utiliza reglas y encabezados de caché HTTP estándar,
- **`"no-store"`** -- ignoramos por completo el caché HTTP, este modo se convierte en el predeterminado si configuramos un encabezado `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match` o `If-Range`,
- **`"reload"`** -- no toma el resultado del caché HTTP (si corresponde), pero completa el caché con la respuesta (si los encabezados de respuesta lo permiten),
- **`"no-cache"`** -- crea una solicitud condicional si hay una respuesta en caché y una solicitud normal en caso contrario. Llena el caché HTTP con la respuesta,
- **`"force-cache"`** -- usa una respuesta del caché HTTP, incluso si está obsoleta. Si no hay respuesta en el caché HTTP, hace una solicitud HTTP regular, se comporta normalmente,
- **`"only-if-cached"`** -- usa una respuesta del caché HTTP, incluso si está obsoleta. Si no hay respuesta en el caché HTTP, entonces envía un error. Solo funciona cuando `mode` es `"same-origin"`.
=======
- **`"default"`** -- `fetch` uses standard HTTP-cache rules and headers,
- **`"no-store"`** -- totally ignore HTTP-cache, this mode becomes the default if we set a header `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, or `If-Range`,
- **`"reload"`** -- don't take the result from HTTP-cache (if any), but populate the cache with the response (if the response headers permit this action),
- **`"no-cache"`** -- create a conditional request if there is a cached response, and a normal request otherwise. Populate HTTP-cache with the response,
- **`"force-cache"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, make a regular HTTP-request, behave normally,
- **`"only-if-cached"`** -- use a response from HTTP-cache, even if it's stale. If there's no response in HTTP-cache, then error. Only works when `mode` is `"same-origin"`.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

## redirect

Normalmente, `fetch` sigue de forma transparente las redirecciones HTTP, como 301, 302, etc.

La opción `redirect` permite cambiar eso:

- **`"follow"`** -- el predeterminado, sigue las redirecciones HTTP,
- **`"error"`** -- error en caso de redireccionamiento HTTP,
- **`"manual"`** -- no sigue el redireccionamiento HTTP, pero `response.url` será la nueva URL y `response.redirected` será `true`, de modo que podamos realizar el redireccionamiento manualmente a la nueva URL (si es necesario).

## integrity

La opción `integrity` permite comprobar si la respuesta coincide con el known-ahead checksum.

<<<<<<< HEAD
Como se describe en la [especificación](https://w3c.github.io/webappsec-subresource-integrity/), las funciones hash admitidas son SHA-256, SHA-384 y SHA-512. Puede haber otras dependiendo de un navegador.
=======
As described in the [specification](https://w3c.github.io/webappsec-subresource-integrity/), supported hash-functions are SHA-256, SHA-384, and SHA-512, there might be others depending on the browser.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Por ejemplo, estamos descargando un archivo y sabemos que su checksum SHA-256 es "abcdef" (un checksum real es más largo, por supuesto).

Lo podemos poner en la opción `integrity`, así:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Luego, `fetch` calculará SHA-256 por sí solo y lo comparará con nuestro string. En caso de discrepancia, se activa un error.

## keepalive

La opción `keepalive` indica que la solicitud puede "vivir más alla" de la página web que la inició.

<<<<<<< HEAD
Por ejemplo, recopilamos estadísticas sobre cómo el visitante actual usa nuestra página (clics del mouse, fragmentos de página que ve), para analizar y mejorar la experiencia del usuario.

Cuando el visitante abandona nuestra página, nos gustaría guardar los datos en nuestro servidor.

Podemos usar el evento `window.onunload` para eso:
=======
For example, we gather statistics on how the current visitor uses our page (mouse clicks, page fragments he views), to analyze and improve the user experience.

When the visitor leaves our page -- we'd like to save the data to our server.

We can use the `window.onunload` event for that:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
window.onunload = function() {
  fetch('/analytics', {
    method: 'POST',
    body: "statistics",
*!*
    keepalive: true
*/!*
  });
};
```

<<<<<<< HEAD
Normalmente, cuando se descarga un documento, se cancelan todas las solicitudes de red asociadas. Pero la opción `keepalive` le dice al navegador que realice la solicitud en segundo plano, incluso después de salir de la página. Por tanto, esta opción es fundamental para que nuestra solicitud tenga éxito.
=======
Normally, when a document is unloaded, all associated network requests are aborted. But the `keepalive` option tells the browser to perform the request in the background, even after it leaves the page. So this option is essential for our request to succeed.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f


<<<<<<< HEAD
Tiene algunas limitaciones:

- No podemos enviar megabytes: el límite de cuerpo para las solicitudes `keepalive` es de 64 KB.
    - Si necesitamos recopilar muchas estadísticas sobre la visita, deberíamos enviarlas regularmente en paquetes, de modo que no quede mucho para la última solicitud `onunload`.
    - Este límite se aplica a todas las solicitudes `keepalive` juntas. En otras palabras, podemos realizar múltiples solicitudes `keepalive` en paralelo, pero la suma de las longitudes de sus cuerpos no debe exceder los 64 KB.
- No podemos manejar la respuesta del servidor si el documento no está cargado. Entonces, en nuestro ejemplo, `fetch` tendrá éxito debido a `keepalive`, pero las funciones posteriores no funcionarán.
    - En la mayoría de los casos, como enviar estadísticas, no es un problema, ya que el servidor simplemente acepta los datos y generalmente envía una respuesta vacía a tales solicitudes.
=======
- We can't send megabytes: the body limit for `keepalive` requests is 64KB.
    - If we need to gather a lot of statistics about the visit, we should send it out regularly in packets, so that there won't be a lot left for the last `onunload` request.
    - This limit applies to all `keepalive` requests together. In other words, we can perform multiple `keepalive` requests in parallel, but the sum of their body lengths should not exceed 64KB.
- We can't handle the server response if the document is unloaded. So in our example `fetch` will succeed due to `keepalive`, but subsequent functions won't work.
    - In most cases, such as sending out statistics, it's not a problem, as the server just accepts the data and usually sends an empty response to such requests.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
