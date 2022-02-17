# Blob

Los `ArrayBuffer` y las vistas son parte del estándar ECMA, una parte de JavaScript.

En el navegador, hay objetos de alto nivel adicionales, descritas en la [API de Archivo](https://www.w3.org/TR/FileAPI/), en particular `Blob`.

`Blob` consta de un tipo especial de cadena (usualmente de tipo MIME), más partes Blob: una secuencia de otros objetos `Blob`, cadenas y `BufferSource`.

![](blob.svg)

La sintaxis del constructor es:

```js
new Blob(blobParts, opciones);
```

- **`blobParts`** es un array de valores `Blob`/`BufferSource`/`String`.
- **`opciones`** objeto opcional:
  - **`tipo`** -- `Blob`, usualmente un tipo MIME, por ej. `image/png`,
  - **`endings`** -- para transformar los finales de línea para hacer que el `Blob` coincida con los caracteres de nueva línea del Sistema Operativo actual (`\r\n` or `\n`). Por omisión es `"transparent"` (no hacer nada), pero también puede ser `"native"` (transformar).

Por ejemplo:

```js
// crear un Blob a partir de una cadena
let blob = new Blob(["<html>…</html>"], {type: 'text/html'});
// observación: el primer argumento debe ser un array [...]
```

```js
// crear un Blob a partir de un array tipado y cadenas
let hello = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" en formato binario

let blob = new Blob([hello, ' ', 'world'], {type: 'text/plain'});
```


Podemos extraer porciones del `Blob` con:

```js
blob.slice([byteStart], [byteEnd], [contentType]);
```

- **`byteStart`** -- el byte inicial, por omisión es 0.
- **`byteEnd`** -- el último byte (exclusivo, por omisión es el final).
- **`contentType`** -- el `tipo` del nuevo blob, por omisión es el mismo que la fuente.

Los argumentos son similares a `array.slice`, los números negativos también son permitidos.

```smart header="los objetos `Blob` son inmutables"
No podemos cambiar datos directamente en un `Blob`, pero podemos obtener partes de un `Blob`, crear nuevos objetos `Blob` a partir de ellos, mezclarlos en un nuevo `Blob` y así por el estilo.

Este comportamiento es similar a las cadenas de JavaScript: no podemos cambiar un carácter en una cadena, pero podemos hacer una nueva, corregida.
```

## Blob como URL

Un Blob puede ser utilizado fácilmente como una URL para `<a>`, `<img>` u otras etiquetas, para mostrar su contenido.

Gracias al `tipo`, también podemos descargar/cargar objetos `Blob`, y el `tipo` se convierte naturalmente en `Content-Type` en solicitudes de red.

Empecemos con un ejemplo simple. Al hacer click en un link, descargas un `Blob` dinámicamente generado con contenido `hello world` en forma de archivo:

```html run
<!-- descargar atributos fuerza al navegador a descargar en lugar de navegar -->
<a download="hello.txt" href='#' id="link">Descargar</a>

<script>
let blob = new Blob(["Hello, world!"], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);
</script>
```

También podemos crear un link dinámicamente en JavaScript y simular un click con `link.click()`, y la descarga inicia automáticamente.

Este es un código similar que permite al usuario descargar el `Blob` creado dinámicamente, sin HTML:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

link.href = URL.createObjectURL(blob);

link.click();

URL.revokeObjectURL(link.href);
```

`URL.createObjectURL` toma un `Blob` y crea una URL única para él, con la forma `blob:<origin>/<uuid>`.

Así es como se ve el valor de `link.href`:

```
blob:https://javascript.info/1e67e00e-860d-40a5-89ae-6ab0cbee6273
```

Por cada URL generada por `URL.createObjectURL` el navegador almacena un URL -> `Blob` mapeado internamente. Así que las URLs son cortas, pero permiten acceder al `Blob`.

Una URL generada (y por lo tanto su enlace) solo es válida en el documento actual, mientras está abierto. Y este permite referenciar al `Blob` en `<img>`, `<a>`, básicamente cualquier otro objeto que espera un URL.

También hay efectos secundarios. Mientras haya un mapeado para un `Blob`, el `Blob` en sí mismo se guarda en la memoria. El navegador no puede liberarlo.

El mapeado se limpia automáticamente al vaciar un documento, así los objetos `Blob` son liberados. Pero si una aplicación es de larga vida, entonces eso no va a pasar pronto.

**Entonces, si creamos una URL, este `Blob` se mantendrá en la memoria, incluso si ya no se necesita.**

`URL.revokeObjectURL(url)` elimina la referencia el mapeo interno, además de permitir que el `Blob` sea borrado (si ya no hay otras referencias), y que la memoria sea liberada.

En el último ejemplo, intentamos que el `Blob` sea utilizado una sola vez, para descargas instantáneas, así llamamos `URL.revokeObjectURL(link.href)` inmediatamente.

En el ejemplo anterior con el link HTML cliqueable, no llamamos `URL.revokeObjectURL(link.href)`, porque eso puede hacer la URL del `Blob` inválido. Después de la revocación, como el mapeo es eliminado, la URL ya no volverá a funcionar.

## Blob a base64

Una alternativa a `URL.createObjectURL` es convertir un `Blob` en una cadena codificada en base64.

Esa codificación representa datos binarios como una cadena ultra segura de caracteres "legibles" con códigos ASCII desde el 0 al 64. Y lo que es más importante, podemos utilizar codificación en las "URLs de datos".

Un [URL de datos](https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/Datos_URIs) tiene la forma `data:[<mediatype>][;base64],<data>`. Podemos usar suficientes URLs por doquier, junto a URLs "regulares".

Por ejemplo, aquí hay una sonrisa:

```html
<img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">
```

El navegador decodificará la cadena y mostrará la imagen: <img src="data:image/png;base64,R0lGODlhDAAMAKIFAF5LAP/zxAAAANyuAP/gaP///wAAAAAAACH5BAEAAAUALAAAAAAMAAwAAAMlWLPcGjDKFYi9lxKBOaGcF35DhWHamZUW0K4mAbiwWtuf0uxFAgA7">


Para transformar un `Blob` a base64, usaremos el objeto nativo `FileReader`. Puede leer datos de Blobs en múltiples formatos. En el [siguiente capítulo](info:file) lo cubriremos en profundidad.

Aquí está el demo de descarga de un blob, ahora con base-64:

```js run
let link = document.createElement('a');
link.download = 'hello.txt';

let blob = new Blob(['Hello, world!'], {type: 'text/plain'});

*!*
let reader = new FileReader();
reader.readAsDataURL(blob); // convierte el blob a base64 y llama a onload
*/!*

reader.onload = function() {
  link.href = reader.result; // URL de datos
  link.click();
};
```

Se pueden utilizar ambas maneras para hacer una URL de un `Blob` . Pero usualmente `URL.createObjectURL(blob)` es más simple y rápido.

```compare title-plus="URL.createObjectURL(blob)" title-minus="Blob a URL de datos"
+ Necesitamos revocarlos para cuidar la memoria.
+ Acceso directo al blob, sin "codificación/decodificación"
- No necesitamos revocar nada.
- Se pierde rendimiento y memoria en grandes objetos `Blob` al codificar.
```

## imagen a blob

Podemos crear un `Blob` de una imagen, una parte de una imagen, o incluso hacer una captura de la página. Es práctico para subirlo a algún lugar.

Las operaciones de imágenes se hacen a través del elemento `<canvas>`:

1. Dibuja una imagen (o una parte) en el canvas utilizando [canvas.drawImage](https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage).
2. Llama el método de canvas [.toBlob(callback, format, quality)](https://developer.mozilla.org/es/docs/Web/API/HTMLCanvasElement/toBlob) que crea un `Blob` y llama el `callback` cuando termina.

En el ejemplo siguiente, un imagen se copia, pero no podemos cortarla o transformarla en el canvas hasta convertirla en blob:

```js run
// tomar cualquier imagen
let img = document.querySelector('img');

// hacer el <canvas> del mismo tamaño
let canvas = document.createElement('canvas');
canvas.width = img.clientWidth;
canvas.height = img.clientHeight;

let context = canvas.getContext('2d');

// copiar la imagen en él (este método permite cortar la imagen)
context.drawImage(img, 0, 0);
// podemos hacer un context.rotate(), y muchas otras cosas en canvas

// toBlob es una operación asincrónica, callback es llamada al terminar
canvas.toBlob(function(blob) {
  // blob listo, descárgalo
  let link = document.createElement('a');
  link.download = 'example.png';

  link.href = URL.createObjectURL(blob);
  link.click();

  // borrar la referencia interna del blob, para permitir al navegador eliminarlo de la memoria
  URL.revokeObjectURL(link.href);
}, 'image/png');
```

Si preferimos `async/await` en lugar de callbacks:
```js
let blob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));
```

Para capturar la página, podemos utilizar una librería como <https://github.com/niklasvh/html2canvas>. Que lo que hace es escanear toda la página y dibujarla en el `<canvas>`. Entonces podemos obtener un `Blob` de la misma manera que arriba.

## De Blob a ArrayBuffer

El constructor de `Blob` permite crear un blob de casi cualquier cosa, incluyendo cualquier `BufferSource`.

Pero si queremos ejecutar un procesamiento de bajo nivel, podemos obtener el nivel más bajo de un `ArrayBuffer` desde `blob.arrayBuffer()`:

```js
// obtener un arrayBuffer desde un blob
const bufferPromise = await blob.arrayBuffer();

// or
blob.arrayBuffer().then(buffer => /* process the ArrayBuffer */);
```

## De Blob a stream

Cuando leemos y escribimos un blob de más de `2 GB`, `arrayBuffer` hace un uso demasiado intensivo de la memoria para nosotros. En este punto, podemos convertir directamente el blob a un stream.

Un stream (flujo, corriente) es un objeto especial que permite leer (o escribir) porción por porción. Está fuera de nuestro objetivo aquí, pero este es un ejemplo que puedes leer <https://developer.mozilla.org/en-US/docs/Web/API/Streams_API>. Los streams son convenientes para datos que son adecuados para el proceso pieza por pieza. 

El método interfaz `stream()` de `Blob` devuelve un `ReadableStream` que al leerlo devuelve datos contenidos dentro del `Blob`.

Entonces podemos leerlos desde él, como aquí:

```js
// obtiene readableStream desde blob
const readableStream = blob.stream();
const stream = readableStream.getReader();

while (true) {
  // para cada iteración: data es el siguiente fragmento del blob
  let { done, data } = await stream.read();
  if (done) {
    // no hay más data en el stream
    console.log('todo el blob procesado.');
    break;
  }

   // hacer algo con la porción de datos que acabamos de leer del blob
  console.log(data);
}
```

## Resumen

Mientras `ArrayBuffer`, `Uint8Array` y otros `BufferSource` son "datos binarios", un [Blob](https://www.w3.org/TR/FileAPI/#dfn-Blob) representa "datos binarios con tipo".

Esto hace a los Blobs convenientes para operaciones de carga/descarga, estos son muy comunes en el navegador.

Los métodos que ejecutan solicitudes web, como [XMLHttpRequest](info:xmlhttprequest), [fetch](info:fetch) y otros, pueden trabajar nativamente con `Blob`, como con otros tipos binarios.

Podemos convertir fácilmente entre `Blob` y tipos de datos binarios de bajo nivel:

- Podemos crear un Blob desde un array tipado usando el constructor `new Blob(...)`.
- Podemos obtener de vuelta un `ArrayBuffer` desde un Blob usando `blob.arrayBuffer()`, y entonces crear una vista sobre él para procesamiento binario de bajo nivel.

Los streams de conversión son muy útiles cuando necesitamos manejar grandes blob. Puedes crear un `ReadableStream` desde un blob. El método interfaz `stream()` de `Blob` devuelve un `ReadableStream` que una vez leído devuelve los datos contenido en el blob.
