
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

Ahora exploremos el resto de capacidades.

## referrer, referrerPolicy

Estas opciones gobiernan cómo `fetch` establece el encabezado HTTP `Referer`.

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

A diferencia de la opción `referrer` que permite establecer el valor exacto de `Referer`, `referrerPolicy` indica al navegador las reglas generales para cada tipo de solicitud.

Los valores posibles se describen en la [Especificación de la política Referrer](https://w3c.github.io/webappsec-referrer-policy/):

- **`"no-referrer-when-downgrade"`** -- el valor predeterminado: el `Referer` completo se envía siempre, a menos que enviemos una solicitud de HTTPS a HTTP (a un protocolo menos seguro).
- **`"no-referrer"`** -- nunca envía `Referer`.
- **`"origin"`** -- solo envía el origen en `Referer`, no la URL de la página completa. Por ejemplo, solo `http://site.com` en lugar de `http://site.com/path`.
- **`"origin-when-cross-origin"`** -- envía el `Referrer` completo al mismo origen, pero solo la parte de origen para solicitudes cross-origin (como se indica arriba).
- **`"same-origin"`** -- envía un `Referer` completo al mismo origen, pero no un `Referer` para solicitudes cross-origin.
- **`"strict-origin"`** -- envía solo el origen, no envía `Referer` para solicitudes HTTPS→HTTP.
- **`"strict-origin-when-cross-origin"`** -- para el mismo origen, envía el `Referer` completo. Para el envío cross-origin envía solo el origen, a menos que sea una solicitud HTTPS→HTTP, entonces no envía nada.
- **`"unsafe-url"`** -- envía siempre la URL completa en `Referer`, incluso para solicitudes HTTPS→HTTP.

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

Digamos que tenemos una zona de administración con una estructura de URL que no debería conocerse desde fuera del sitio.

Si enviamos un `fetch`, entonces de forma predeterminada siempre envía el encabezado `Referer` con la URL completa de nuestra página (excepto cuando solicitamos de HTTPS a HTTP, entonces no hay `Referer`).

Por ejemplo, `Referer: https://javascript.info/admin/secret/paths`.

Si queremos que otros sitios web solo conozcan la parte del origen, no la ruta de la URL, podemos configurar la opción:

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

En particular, es posible establecer la política predeterminada para toda la página utilizando el encabezado HTTP `Referrer-Policy`, o por enlace, con `<a rel="noreferrer">`.
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
- **`"include"`** -- enviar siempre, requiere `Access-Control-Allow-Credentials` del servidor cross-origin para que JavaScript acceda a la respuesta, que se cubrió en el capítulo <info:fetch-crossorigin>,
- **`"omit"`** -- nunca enviar, incluso para solicitudes del mismo origen.

## cache

De forma predeterminada, las solicitudes `fetch` utilizan el almacenamiento en caché HTTP estándar. Es decir, respeta los encabezados `Expires`, `Cache-Control`, envía `If-Modified-Since`, y así sucesivamente. Al igual que lo hacen las solicitudes HTTP habituales.

Las opciones de `cache` permiten ignorar el caché HTTP o ajustar su uso:

- **`"default"`** -- `fetch` utiliza reglas y encabezados de caché HTTP estándar,
- **`"no-store"`** -- ignoramos por completo el caché HTTP, este modo se convierte en el predeterminado si configuramos un encabezado `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match` o `If-Range`,
- **`"reload"`** -- no toma el resultado del caché HTTP (si corresponde), pero completa el caché con la respuesta (si los encabezados de respuesta lo permiten),
- **`"no-cache"`** -- crea una solicitud condicional si hay una respuesta en caché y una solicitud normal en caso contrario. Llena el caché HTTP con la respuesta,
- **`"force-cache"`** -- usa una respuesta del caché HTTP, incluso si está obsoleta. Si no hay respuesta en el caché HTTP, hace una solicitud HTTP regular, se comporta normalmente,
- **`"only-if-cached"`** -- usa una respuesta del caché HTTP, incluso si está obsoleta. Si no hay respuesta en el caché HTTP, entonces envía un error. Solo funciona cuando `mode` es `"same-origin"`.

## redirect

Normalmente, `fetch` sigue de forma transparente las redirecciones HTTP, como 301, 302, etc.

La opción `redirect` permite cambiar eso:

- **`"follow"`** -- el predeterminado, sigue las redirecciones HTTP,
- **`"error"`** -- error en caso de redireccionamiento HTTP,
- **`"manual"`** -- permite procesar redireccionamiento HTTP manualmente. En caso de redireccionamiento obtendremos un objeto response especial, con `response.type="opaqueredirect"` y cero o vacío en la mayor parte de las demás propiedades.

## integrity

La opción `integrity` permite comprobar si la respuesta coincide con el known-ahead checksum.

Como se describe en la [especificación](https://w3c.github.io/webappsec-subresource-integrity/), las funciones hash admitidas son SHA-256, SHA-384 y SHA-512. Puede haber otras dependiendo de un navegador.

Por ejemplo, estamos descargando un archivo y sabemos que su checksum SHA-256 es "abcdef" (un checksum real es más largo, por supuesto).

Lo podemos poner en la opción `integrity`, así:

```js
fetch('http://site.com/file', {
  integrity: 'sha256-abcdef'
});
```

Luego, `fetch` calculará SHA-256 por sí solo y lo comparará con nuestro string. En caso de discrepancia, se activa un error.

## keepalive

La opción `keepalive` indica que la solicitud puede "vivir más allá" de la página web que la inició.

Por ejemplo, recopilamos estadísticas sobre cómo el visitante actual usa nuestra página (clics del mouse, fragmentos de página que ve), para analizar y mejorar la experiencia del usuario.

Cuando el visitante abandona nuestra página, nos gustaría guardar los datos en nuestro servidor.

Podemos usar el evento `window.onunload` para eso:

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

Normalmente, cuando se descarga un documento, se cancelan todas las solicitudes de red asociadas. Pero la opción `keepalive` le dice al navegador que realice la solicitud en segundo plano, incluso después de salir de la página. Por tanto, esta opción es fundamental para que nuestra solicitud tenga éxito.


Tiene algunas limitaciones:

- No podemos enviar megabytes: el límite de cuerpo para las solicitudes `keepalive` es de 64 KB.
    - Si necesitamos recopilar muchas estadísticas sobre la visita, deberíamos enviarlas regularmente en paquetes, de modo que no quede mucho para la última solicitud `onunload`.
    - Este límite se aplica a todas las solicitudes `keepalive` juntas. En otras palabras, podemos realizar múltiples solicitudes `keepalive` en paralelo, pero la suma de las longitudes de sus cuerpos no debe exceder los 64 KB.
- No podemos manejar la respuesta del servidor si el documento no está cargado. Entonces, en nuestro ejemplo, `fetch` tendrá éxito debido a `keepalive`, pero las funciones posteriores no funcionarán.
    - En la mayoría de los casos, como enviar estadísticas, no es un problema, ya que el servidor simplemente acepta los datos y generalmente envía una respuesta vacía a tales solicitudes.
