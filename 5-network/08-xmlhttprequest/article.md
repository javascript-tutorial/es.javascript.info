# XMLHttpRequest

`XMLHttpRequest` es un objeto nativo del navegador que permite hacer solicitudes HTTP desde JavaScript.

A pesar de tener la palable "XML" en su nombre, se puede operar sobre cualquier dato, no solo en formato XML. Podemos cargar/descargar archivos, dar seguimiento y mucho m&aacute;s.

Justo ahora, hay otro m&eacute;todo m&aacute;s moderno, `fetch`, &eacute;ste, en alg&uacute;n sentido hace obsoleto a `XMLHttpRequest`.

En el desarrollo web moderno `XMLHttpRequest` se usa por tres razones:

1. Razones hist&oacute;ricas: necesitamos soportar scripts existentes con `XMLHttpRequest`.
2. Necesitamos soportar navegadores viejos, y no queremos `polyfills` (ej. mantener los scripts peque&ntilde;os).
3. Necesitamos hacer algo que `fetch` no puede todav&iacute;a, ej. rastrear el progreso de subida.

&iquest;Te suena familiar? Si as&iacute; es, entonces todo est&aacute; bien, adelante con `XMLHttpRequest`. De otra forma, por favor, dir&iacute;gete a <info:fetch>.

## Lo b&aacute;sico

XMLHttpRequest tiene dos modos de operaci&oacute;n: sincr&oacute;nica y as&iacute;ncrona.

Veamos primero la as&iacute;ncrona, ya que es utilizada en la mayor&iacute;a de los casos.

Para hacer la petici&oacute;n, necesitamos seguir 3 pasos:

1. Crear el objeto `XMLHttpRequest`:
    ```js
    let xhr = new XMLHttpRequest();
    ```
    El constructor no tiene argumentos.

2. Inicializarlo, usualmente justo despu&eacute;s de `new XMLHttpRequest`:
    ```js
    xhr.open(method, URL, [async, user, password])
    ```

    Este m&eacute;todo esp&eacute;cifica los par&aacute;metros principales para la petici&oacute;n:

    - `method` -- m&eacute;todo HTTP. Usualmente `"GET"` o `"POST"`.
    - `URL` -- la URL a solicitar, una cadena, puede ser un objeto [URL](info:url).
    - `async` -- si se asigna explic&iacute;tamente a `false`, entonces la petici&oacute;n ser&aacute; asincr&oacute;nica, Cubriremos esto un poco m&aacute;s adelante.
    - `user`, `password` -- usuario y contrase&ntilde;a para autenticaci&oacute;n HTTP b&aacute;sica (si se requiere).

    Por favor, toma en cuenta que la llamada a `open`, contrario a su nombre, no abre la conecci&oacute;n. Solo configura la solicitud, pero la actividad de red solo empieza con la llamada del m&eacute;todo `send`.

3. Enviar.

    ```js
    xhr.send([body])
    ```

    Este m&eacute;todo abre la conecci&oacute;n y env&iacute;a ka solicitud al servidor. El par&aacute;metro adicional `body` contiene el cuerpo de la solicitud.

    Algunos m&eacute;todos como `GET` no tienen un cuerpo. Y otros como `POST` usan el par&aacute;metro `body` para enviar datos al servidor. Vamos a ver unos ejemplos de eso m&aacute;s tarde.

4. Escuchar los eventos de respuesta `xhr`.

    Estos son los tres eventos m&aacute;s comunmente utilizados:
    - `load` -- cuando la solicitud est&aacute; completa (incluso si el estado HTTP es 400 o 500), y la respuesta se descarg&oacute; por completo.
    - `error` -- cuando la solicitud no pudo ser realizada satisfactoriamente, ej. red ca&iacute;da o una URL inv&aacute;lida.
    - `progress` -- se dispara peri&oacute;dicamente mientras la respuesta est&aacute; siendo descargada, reporta cu&aacute;nto se ha descargado.

    ```js
    xhr.onload = function() {
      alert(`Cargado: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // solo se activa si la solicitud no se puede realizar
      alert(`Error de red`);
    };

    xhr.onprogress = function(event) { // se dispara periodicamente
      // event.loaded - cuantos bytes se han descargado
      // event.lengthComputable = devuelve true si el servidor envia la cabecera Content-Length (longitud del contenido)
      // event.total - numero total de bytes (si lengthComputable es true)
      alert(`Recibido ${event.loaded} of ${event.total}`);
    };
    ```

Aqu&iacute; un ejemplo completo. El siguiente c&oacute;digo carga la URL en `/article/xmlhttprequest/example/load` desde el servidor e imprime el progreso:

```js run
// 1. Crea un nuevo objeto XMLHttpRequest
let xhr = new XMLHttpRequest();

// 2. Configuracion: solicitud GET para la URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Envia la solicitud a la red
xhr.send();

// 4. Esto se llamara despues de que la respuesta se reciba
xhr.onload = function() {
  if (xhr.status != 200) { // analiza el estado HTTP de la respuesta
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // ej. 404: No encontrado
  } else { // muestra el resultado
    alert(`Hecho, obtenidos ${xhr.response.length} bytes`); // Respuesta del servidor
  }
};

xhr.onprogress = function(event) {
  if (event.lengthComputable) {
    alert(`Recibidos ${event.loaded} de ${event.total} bytes`);
  } else {
    alert(`Recibidos ${event.loaded} bytes`); // sin Content-Length
  }

};

xhr.onerror = function() {
  alert("Solicitud fallida");
};
```

Una vez el servidor haya respondido, podemos recibir el resultado en las siguientes propiedades de `xhr`:

`status`
: C&oacute;digo del estado HTTP (un n&uacute;mero): `200`, `404`, `403` y as&iacute; por el estilo, puede ser `0` en caso de una falla no HTTP.

`statusText`
: Mensaje del estado HTTP (una cadena): usualmente `OK` para `200`, `Not Found` para `404`, `Forbidden` para `403` y as&acute; por el estilo.

`response` (scripts antig&uuml;os deben usar `responseText`)
: El cuerpo de la respuesta del servidor.

Tambi&eacute;n podemos espec&iacute;ficar un tiempo l&iacute;mite usando la propiedad correspondiente:

```js
xhr.timeout = 10000; // limite de tiempo en milisegundos, 10 segundos
```

Si la solicitud no es realizada con &eacute;xito dentro del tiempo dado, se cancela y el evento `timeout` se activa.

````smart header="URL search parameters"
Para agregar los parametros a la URL, como `?nombre=valor`, y asegurar la codificacion adecuada, podemos utilizar un objeto [URL](info:url):

```js
let url = new URL('https://google.com/search');
url.searchParams.set('q', 'pruebame!');

// el parametro 'q' esta codificado
xhr.open('GET', url); // https://google.com/search?q=test+me%21
```

````

## Tipo de respuesta

Podemos usar la propiedad `xhr.responseType` para asignar el formato de la respuesta:

- `""` (default) -- obtiene una cadena,
- `"text"` -- obtiene una cadena,
- `"arraybuffer"` -- obtiene un `ArrayBuffer` (para datos binarios, vee el cap&iacute;tulo <info:arraybuffer-binary-arrays>),
- `"blob"` -- obtiene un `Blob` (para datos binarios, vee el cap&iacute;tulo <info:blob>),
- `"document"` -- obtiene un documento XML (puede usar XPath y otros m&eacute;todos XML),
- `"json"` -- obtiene un JSON (autom&aacute;ticamente analizado).

Por ejemplo, obtengamos una respuesta como JSON:

```js run
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/example/json');

*!*
xhr.responseType = 'json';
*/!*

xhr.send();

// la respuesta es {"message": "Hola, Mundo!"}
xhr.onload = function() {
  let responseObj = xhr.response;
  alert(responseObj.message); // Hola, Mundo!
};
```

```smart
En los scripts antig&uuml;os debes encontrar tambi&eacute;n las propiedades `xhr.responseText` e incluso `xhr.responseXML`.

Existen por razones hist&oacute;ricas, para obtener ya sea una cadena o un documento XML. Hoy en d&iacute;a, debemos seleccionar el formato en `xhr.responseType` y obtener `xhr.response` como se demuestra debajo.
```

## Estados 

`XMLHttpRequest` cambia entre estados a medida que avanza. El estado actual es accesible como `xhr.readyState`.

Todos los estados, como en [la especificaci&oacute;n](https://xhr.spec.whatwg.org/#states):

```js
UNSENT = 0; // estado inicial
OPENED = 1; // llamada abierta
HEADERS_RECEIVED = 2; // cabeceras de respuesta recibidas
LOADING = 3; // la respuesta esta cargando (un paquete de datos es recibido)
DONE = 4; // solicitud completa
```

Un objeto `XMLHttpRequest` escala en orden `0` -> `1` -> `2` -> `3` -> ... -> `3` -> `4`. El estado `3` se repite cada vez que un paquete de datos se recibe a trav&eacute;z de la red.

Podemos seguirlos usando el evento `readystatechange`:

```js
xhr.onreadystatechange = function() {
  if (xhr.readyState == 3) {
    // cargando
  }
  if (xhr.readyState == 4) {
    // solicitud finalizada
  }
};
```

Puedes encontrar oyentes del evento `readystatechange` en c&oacute;digo realmente viejo, est&aacute; ah&iacute; por razones hist&oacute;ricas, hab&iacute;a un tiempo cuando no hab&iacute;a `load` y otros evento. Hoy en d&iacute;a, los manipuladores `load/error/progress` lo hacen obsoleto.

## Abortando solicitudes

Podemos terminar la solicitud en cualquier momento. La llamada a `xhr.abort()` hace eso:

```js
xhr.abort(); // termina la solicitud
```

Este dispara el evento `abort`, y el `xhr.status` se convierte en `0`.

## Solicitudes sincr&oacute;nicas

Si en el m&eacute;todo `open` el tercer par&aacute;metro `async` se asigna como `false`, la solicitud se hace sincr&oacute;nicamente.

En otras palabras, la ejecuci&oacute;n de JavaScript se pause en el `send()` y se resume cuando la respuesta es recibida. Algo como comandos `alert` o `prompt`.

Aqu&iacute; est&aacute; el ejemplo reescrito, el tercer par&aacute;metro de `open` es `false`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/article/xmlhttprequest/hello.txt', *!*false*/!*);

try {
  xhr.send();
  if (xhr.status != 200) {
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    alert(xhr.response);
  }
} catch(err) { // en lugar de onerror
  alert("Solicitud fallida");
}
```

Puede verse bien, pero las llamadas sincr&oacute;nicas son rara vez utilizadas, porque bloquean todo el JavaScript de la p&aacute;gina hasta que la carga est&eacute; completa. En algunos navegadores se hace imposible hacer scroll. Si una llamada s&iacute;ncrona toma mucho tiempo, el navegador puede sugerir cerrar el sitio web "colgado".

Algunas capacidades avanzadas de `XMLHttpRequest`, como solicitar desde otro dominio o especificando un tiempo l&iacute;mite, no est&aacute;n disponibles para solicitudes s&iacute;ncronas. Tambi&eacute;n, como puedes ver, sin indicaci&oacute;n de progreso.

La raz&oacute;n de esto, es que las solicitudes sincr&oacute;nicas son utilizadas muy escasamente, casi nunca. No hablaremos m&aacute;s sobre ellas.

## Cabeceras HTTP

`XMLHttpRequest` allows both to send custom headers and read headers from the response.

There are 3 methods for HTTP-headers:

`setRequestHeader(name, value)`
: Sets the request header with the given `name` and `value`.

    For instance:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Headers limitations"
    Several headers are managed exclusively by the browser, e.g. `Referer` and `Host`.
    The full list is [in the specification](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).

    `XMLHttpRequest` is not allowed to change them, for the sake of user safety and correctness of the request.
    ```

    ````warn header="Can't remove a header"
    Another peculiarity of `XMLHttpRequest` is that one can't undo `setRequestHeader`.

    Once the header is set, it's set. Additional calls add information to the header, don't overwrite it.

    For instance:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // the header will be:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Gets the response header with the given `name` (except `Set-Cookie` and `Set-Cookie2`).

    For instance:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Returns all response headers, except `Set-Cookie` and `Set-Cookie2`.

    Headers are returned as a single line, e.g.:

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    The line break between headers is always `"\r\n"` (doesn't depend on OS), so we can easily split it into individual headers. The separator between the name and the value is always a colon followed by a space `": "`. That's fixed in the specification.

    So, if we want to get an object with name/value pairs, we need to throw in a bit JS.

    Like this (assuming that if two headers have the same name, then the latter one overwrites the former one):

    ```js
    let headers = xhr
      .getAllResponseHeaders()
      .split('\r\n')
      .reduce((result, current) => {
        let [name, value] = current.split(': ');
        result[name] = value;
        return result;
      }, {});

    // headers['Content-Type'] = 'image/png'
    ```

## POST, FormData

To make a POST request, we can use the built-in [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

The syntax:

```js
let formData = new FormData([form]); // creates an object, optionally fill from <form>
formData.append(name, value); // appends a field
```

We create it, optionally fill from a form, `append` more fields if needed, and then:

1. `xhr.open('POST', ...)` – use `POST` method.
2. `xhr.send(formData)` to submit the form to the server.

For instance:

```html run refresh
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // pre-fill FormData from the form
  let formData = new FormData(document.forms.person);

  // add one more field
  formData.append("middle", "Lee");

  // send it out
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

The form is sent with `multipart/form-data` encoding.

Or, if we like JSON more, then `JSON.stringify` and send as a string.

Just don't forget to set the header `Content-Type: application/json`, many server-side frameworks automatically decode JSON with it:

```js
let xhr = new XMLHttpRequest();

let json = JSON.stringify({
  name: "John",
  surname: "Smith"
});

xhr.open("POST", '/submit')
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.send(json);
```

The `.send(body)` method is pretty omnivore. It can send almost any `body`, including `Blob` and `BufferSource` objects.

## Upload progress

The `progress` event triggers only on the downloading stage.

That is: if we `POST` something, `XMLHttpRequest` first uploads our data (the request body), then downloads the response.

If we're uploading something big, then we're surely more interested in tracking the upload progress. But `xhr.onprogress` doesn't help here.

There's another object, without methods, exclusively to track upload events: `xhr.upload`.

It generates events, similar to `xhr`, but `xhr.upload` triggers them solely on uploading:

- `loadstart` -- upload started.
- `progress` -- triggers periodically during the upload.
- `abort` -- upload aborted.
- `error` -- non-HTTP error.
- `load` -- upload finished successfully.
- `timeout` -- upload timed out (if `timeout` property is set).
- `loadend` -- upload finished with either success or error.

Example of handlers:

```js
xhr.upload.onprogress = function(event) {
  alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload finished successfully.`);
};

xhr.upload.onerror = function() {
  alert(`Error during the upload: ${xhr.status}`);
};
```

Here's a real-life example: file upload with progress indication:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // track upload progress
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // track completion: both successful or not
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("success");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

## Cross-origin requests

`XMLHttpRequest` can make cross-origin requests, using the same CORS policy as [fetch](info:fetch-crossorigin).

Just like `fetch`, it doesn't send cookies and HTTP-authorization to another origin by default. To enable them, set `xhr.withCredentials` to `true`:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

See the chapter <info:fetch-crossorigin> for details about cross-origin headers.


## Summary

Typical code of the GET-request with `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // HTTP error?
    // handle error
    alert( 'Error: ' + xhr.status);
    return;
  }

  // get the response from xhr.response
};

xhr.onprogress = function(event) {
  // report progress
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // handle non-HTTP error (e.g. network down)
};
```

There are actually more events, the [modern specification](http://www.w3.org/TR/XMLHttpRequest/#events) lists them (in the lifecycle order):

- `loadstart` -- the request has started.
- `progress` -- a data packet of the response has arrived, the whole response body at the moment is in `response`.
- `abort` -- the request was canceled by the call `xhr.abort()`.
- `error` -- connection error has occurred, e.g. wrong domain name. Doesn't happen for HTTP-errors like 404.
- `load` -- the request has finished successfully.
- `timeout` -- the request was canceled due to timeout (only happens if it was set).
- `loadend` -- triggers after `load`, `error`, `timeout` or `abort`.

The `error`, `abort`, `timeout`, and `load` events are mutually exclusive. Only one of them may happen.

The most used events are load completion (`load`), load failure (`error`), or we can use a single `loadend` handler and check the properties of the request object `xhr` to see what happened.

We've already seen another event: `readystatechange`. Historically, it appeared long ago, before the specification settled. Nowadays, there's no need to use it, we can replace it with newer events, but it can often be found in older scripts.

If we need to track uploading specifically, then we should listen to same events on `xhr.upload` object.
