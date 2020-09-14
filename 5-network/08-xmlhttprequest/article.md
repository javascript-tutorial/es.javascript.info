# XMLHttpRequest

`XMLHttpRequest` es un objeto nativo del navegador que permite hacer solicitudes HTTP desde JavaScript.

A pesar de tener la palabra "XML" en su nombre, se puede operar sobre cualquier dato, no solo en formato XML. Podemos cargar/descargar archivos, dar seguimiento y mucho más.

Ahora hay un método más moderno `fetch` que en algún sentido hace obsoleto a `XMLHttpRequest`.

En el desarrollo web moderno `XMLHttpRequest` se usa por tres razones:

1. Razones históricas: necesitamos soportar scripts existentes con `XMLHttpRequest`.
2. Necesitamos soportar navegadores viejos, y no queremos `polyfills` (p.ej. para mantener los scripts pequeños).
3. Necesitamos hacer algo que `fetch` no puede todavía, ej. rastrear el progreso de subida.

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

````smart header="Par&aacute;metros de búsqueda URL"
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

`XMLHttpRequest` permite tanto enviar cabeceras personalizadas como leer cabeceras de la respuesta.

Existen 3 metodos para las cabeceras HTTP:

`setRequestHeader(name, value)`
: Asigna la cabecera de la solicitud con los valores `name` y `value` provistos.

    Por ejemplo:

    ```js
    xhr.setRequestHeader('Content-Type', 'application/json');
    ```

    ```warn header="Limitaciones de cabeceras"
    Muchas cabeceras se administran exclusivamente por el navegador, ej. `Referer` y `Host`.
    La lista completa est&aacute; [en la especificaci&aacute;n](http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader-method).

    `XMLHttpRequest` no est&aacute; permitido cambiarlos, por motivos de seguridad del usuario y la exactitud de la solicitud.
    ```

    ````warn header="No se pueden eliminar cabeceras"
    Otra peculiaridad de `XMLHttpRequest` es que no puede deshacer un `setRequestHeader`.

    Una vez que una cabecera es asignada, ya est&aacute; asignada. Llamadas adicionales agregan informaci&oacute;n a la cabecera, no la sobre-escriben.

    Por ejemplo:

    ```js
    xhr.setRequestHeader('X-Auth', '123');
    xhr.setRequestHeader('X-Auth', '456');

    // la cabecera ser&aacute;:
    // X-Auth: 123, 456
    ```
    ````

`getResponseHeader(name)`
: Obtiene la cabecera de la respuesta con el `name` dado (excepto `Set-Cookie` y `Set-Cookie2`).

    Por ejemplo:

    ```js
    xhr.getResponseHeader('Content-Type')
    ```

`getAllResponseHeaders()`
: Devuelve todas las cabeceras de la respuesta, excepto por `Set-Cookie` y `Set-Cookie2`.

    Las cabeceras se devuelven como una sola l&iacute;nea, ej.:

    ```http
    Cache-Control: max-age=31536000
    Content-Length: 4260
    Content-Type: image/png
    Date: Sat, 08 Sep 2012 16:53:16 GMT
    ```

    El salto de l&iacute;nea entre las cabeceras siempre es un `"\r\n"` (independiente del SO), as&iacute; podemos dividirlas en cabeceras individuales. El separador entre el nombre y el valor siempre es dos puntos seguido de un espacio `": "`. Eso se fija en la especificaci&oacute;n.

    As&iacute;, si queremos obtener un objeto con pares nombre/valor, necesitamos tratarlas con un poco de JS.

    Como esto (asumiendo que si dos cabeceras tienen el mismo nombre, entonces el &uacute;ltimo sobreecribe al primero):

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

## POST, Formularios

Para hacer una solicitud POST, podemos utilizar el objeto [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) nativo.

La sintaxis:

```js
let formData = new FormData([form]); // crea un objeto, opcionalmente se completa con un <form>
formData.append(name, value); // a&ntilde;ade un campo
```

Lo creamos, opcionalmente lleno desde un formulario, `append` (agrega) m&aacute;s campos si se necesitan, y entonces:

1. `xhr.open('POST', ...)` – se utiliza el m&eacute;todo `POST`.
2. `xhr.send(formData)` para enviar el formulario al servidor.

Por ejemplo:

```html run refresh
<form name="person">
  <input name="name" value="John">
  <input name="surname" value="Smith">
</form>

<script>
  // pre llenado del objeto FormData desde el formulario
  let formData = new FormData(document.forms.person);

  // agrega un campo m&aacute;s
  formData.append("middle", "Lee");

  // lo enviamos
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/article/xmlhttprequest/post/user");
  xhr.send(formData);

  xhr.onload = () => alert(xhr.response);
</script>
```

El formulario fue enviado con codificaci&oacute;n `multipart/form-data`.

O, si nos gusta m&aacute;s JSON, entonces, un `JSON.stringify` y lo enviamos como un string.

Solo no te olvides de asignar la cabecera `Content-Type: application/json`, muchos frameworks del lado del servidor decodifican autom&aacute;ticamente JSON con este:

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

El m&eacute;todo `.send(body)` es bastante omnivoro. Puede enviar casi cualquier `body`, incluyendo objetos `Blob` y `BufferSource`.

## Progreso de carga

El evento `progress` se dispara solo en la fase de descarga.

Esto es: si hacemos un `POST` de algo, `XMLHttpRequest` primero sube nuestros datos (el cuerpo de la respuesta), entonces descarga la respuesta.

Si estamos subiendo algo grande, entonces seguramente estaremos interesados en rastrear el progreso de nuestra carga. Pero `xhr.onprogress` no ayuda aqu&iacute;.

Hay otro objeto, sin m&eacute;todos, exclusivamente para rastrear los eventos de subida: `xhr.upload`.

&Eacute;ste genera eventos, similares a `xhr`, pero `xhr.upload` se dispara solo en las subidas:

- `loadstart` -- carga iniciada.
- `progress` -- se dispara periodicamente durante la subida.
- `abort` -- carga abortada.
- `error` -- error no HTTP.
- `load` -- carga finalizada con exito.
- `timeout` -- carga caducada (si la propiedad `timeout` esta asignada).
- `loadend` -- carga finalizada con exito o error.

Ejemplos de manejadores:

```js
xhr.upload.onprogress = function(event) {
  alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
};

xhr.upload.onload = function() {
  alert(`Upload finished successfully.`);
};

xhr.upload.onerror = function() {
  alert(`Error durante la carga: ${xhr.status}`);
};
```

Aqu&iacute; un ejemplo de la vida real: indicaci&oacute;n del progreso de subida de un archivo:

```html run
<input type="file" onchange="upload(this.files[0])">

<script>
function upload(file) {
  let xhr = new XMLHttpRequest();

  // rastrea el progreso de la subida
*!*
  xhr.upload.onprogress = function(event) {
    console.log(`Uploaded ${event.loaded} of ${event.total}`);
  };
*/!*

  // seguimiento completado: sea satisfactorio o no
  xhr.onloadend = function() {
    if (xhr.status == 200) {
      console.log("Logrado");
    } else {
      console.log("error " + this.status);
    }
  };

  xhr.open("POST", "/article/xmlhttprequest/post/upload");
  xhr.send(file);
}
</script>
```

## Solicitudes de origen cruzado (Cross-origin)

`XMLHttpRequest` puede hacer solicitudes de origen cruzado, utilizando la misma pol&iacute;tica CORS que se [solicita](info:fetch-crossorigin).

Tal como `fetch`, no env&iacute;a cookies ni autorizaci&oacute;n HTTP a otro origen por omisi&oacute;n. Para activarlas, asigna `xhr.withCredentials` como `true`:

```js
let xhr = new XMLHttpRequest();
*!*
xhr.withCredentials = true;
*/!*

xhr.open('POST', 'http://anywhere.com/request');
...
```

Ve el cap&iacute;tulo <info:fetch-crossorigin> para detalles sobre las cabeceras de origen cruzado.


## Resumen

Codificaci&oacute;n t&iacute;pica de la solicitud GET con `XMLHttpRequest`:

```js
let xhr = new XMLHttpRequest();

xhr.open('GET', '/my/url');

xhr.send();

xhr.onload = function() {
  if (xhr.status != 200) { // error HTTP?
    // maneja el error
    alert( 'Error: ' + xhr.status);
    return;
  }

  // obtiene la respuesta de xhr.response
};

xhr.onprogress = function(event) {
  // reporta progreso
  alert(`Loaded ${event.loaded} of ${event.total}`);
};

xhr.onerror = function() {
  // manejo de un error no HTTP (ej. red caida)
};
```

De hecho hay m&aacute;s eventos, la [especificaci&oacute;n moderna](http://www.w3.org/TR/XMLHttpRequest/#events) los lista (en el orden del ciclo de vida):

- `loadstart` -- la solicitud ha empezado.
- `progress` -- un paquete de datos de la respuesta ha llegado, el cuerpo completo de la respuesta al momento est&aacute; en `response`.
- `abort` -- la solicitud ha sido cancelada por la llamada de `xhr.abort()`.
- `error` -- un error de conecci&oacute;n ha ocurrido, ej. nombre de dominio incorrecto. No pasa con errores HTTP como 404.
- `load` -- la solicitud se ha completado satisfactoriamente.
- `timeout` -- la solicitud fue cancelada debido a que caducó (solo pasa si fue configurado).
- `loadend` -- se dispara después de `load`, `error`, `timeout` o `abort`.

Los eventos `error`, `abort`, `timeout`, y `load` son mutuamente exclusivos. Solo uno de ellos puede pasar.

Los eventos m&aacute;s usados son la carga terminada (`load`), falla de carga (`error`), o podemos usar un solo `loadend` manejador y comprobar las propiedades del objeto solicitado `xhr` para ver qu&eacute; ha pasado.

Ya hemos visto otro evento: `readystatechange`. Hist&oacute;ricamente, apareci&oacute; hace mucho tiempo, antes de que la especificaci&oaucte;n fuera colocada. Hoy en d&iacute;a, no es necesario usarlo, podemos reemplazarlo con eventos m&aacute;s nuevos, pero puede ser encontrado a menudo en scripts viejos.

Si necesitamos rastrear espec&iacute;ficamente, entonces debemos escuchar a los mismos eventos en el objeto `xhr.upload`.
