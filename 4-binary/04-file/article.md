# File y FileReader

<<<<<<< HEAD
Un [File](https://www.w3.org/TR/FileAPI/#dfn-file) hereda de `Blob` y extiende las capacidades relacionadas con el sistema de archivos.
=======
A [File](https://www.w3.org/TR/FileAPI/#dfn-file) object inherits from `Blob` and is extended with filesystem-related capabilities.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Hay dos maneras de obtenerlo

Primero, hay un constructor, similar al de `Blob`:

```js
new File(fileParts, fileName, [options])
```

<<<<<<< HEAD
- **`fileParts`** -- es un array con valores de tipo Blob/BufferSource/String.
- **`fileName`** -- el nombre del archivo..
- **`options`** -- objeto opcional:
    - **`lastModified`** -- la  marca de tiempo (fecha en mili-segundos, de tipo entero) de la última modificación.

Segundo, a menudo obtenemos un archivo mediante un `<input type="file">` o arrastrar y soltar u otras interfaces del navegador. En este caso el archivo obtiene la información del Sistema Operativo.

Como `File` (Archivo) hereda de `Blob`, objetos de tipo `File` tienen las mismas propiedades, mas:
- `name` -- el nombre del archivo,
- `lastModified` -- la marca de tiempo de la última modificación.

Así es como obtenemos un objeto `File` desde `<input type="file">` :
=======
- **`fileParts`** -- is an array of Blob/BufferSource/String values.
- **`fileName`** -- file name string.
- **`options`** -- optional object:
    - **`lastModified`** -- the timestamp (integer date) of last modification.

Second, more often we get a file from `<input type="file">` or drag'n'drop or other browser interfaces. In that case, the file gets this information from OS.

As `File` inherits from `Blob`, `File` objects have the same properties, plus:
- `name` -- the file name,
- `lastModified` -- the timestamp of last modification.

That's how we can get a `File` object from `<input type="file">`:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```html run
<input type="file" onchange="showFile(this)">

<script>
function showFile(input) {
  let file = input.files[0];

  alert(`File name: ${file.name}`); // e.g my.png
  alert(`Last modified: ${file.lastModified}`); // e.g 1552830408824
}
</script>
```

```smart
El input puede seleccionar varios archivos, por lo que `input.files` es un array de dichos archivos . En este caso tenemos un solo archivo por lo que solo es necesario usar `input.files[0]`.
```

## FileReader

<<<<<<< HEAD
[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) es un objeto con el único porpósito de leer datos desde  objetos  de tipo `Blob` (por lo tanto `File` también).

El entrega los datos usando eventos debido a que leerlos desde el disco puede tomar un tiempo.
=======
[FileReader](https://www.w3.org/TR/FileAPI/#dfn-filereader) is an object with the sole purpose of reading data from `Blob` (and hence `File` too) objects.

It delivers the data using events, as reading from disk may take time.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

El constructor:

```js
let reader = new FileReader(); // sin argumentos
```

Los métodos principales:

- **`readAsArrayBuffer(blob)`** -- lee los datos en formato binario `ArrayBuffer`.
- **`readAsText(blob, [codificación])`** -- lee los datos como una cadena de texto con la codificación dada (por defecto es `utf-8`).
- **`readAsDataURL(blob)`** -- lee los datos binarios y los codifica como [Datos URIs] en base 64 (https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/Datos_URIs).
- **`abort()`** -- cancela la operación.

La opción del método `read*` depende de qué formato preferimos y cómo vamos a usar los datos.

<<<<<<< HEAD
- `readAsArrayBuffer` -- para archivos binarios, en donde se hacen operaciones binarias de bajo nivel. Para operaciones de alto nivel, como slicing, `File` hereda de `Blob` por lo que podemos llamarlas directamente sin tener que leer.
- `readAsText` -- para archivos de texto, cuando nesecitamos obtener una cadena.
- `readAsDataURL` -- cuando necesitamos usar estos datos como valores de `src` en `img` u otras etiquetas html. Hay otra alternativa para leer archivos de ese tipo como discutimos en el capítulo <info:blob>: `URL.createObjectURL(file)`.

Mientras se va realizando la lectura, suceden varios eventos:
- `loadstart` -- la carga comenzó.
- `progress` -- ocurre mientras se lee.
- `load` -- lectura completada, sin errores.
- `abort` -- `abort()` ha sido llamado.
- `error` -- ha ocurrido un error .
- `loadend` -- la lectura finalizó exitosa o no .
=======
- **`readAsArrayBuffer(blob)`** -- read the data in binary format `ArrayBuffer`.
- **`readAsText(blob, [encoding])`** -- read the data as a text string with the given encoding (`utf-8` by default).
- **`readAsDataURL(blob)`** -- read the binary data and encode it as base64 data url.
- **`abort()`** -- cancel the operation.

The choice of `read*` method depends on which format we prefer, how we're going to use the data.

- `readAsArrayBuffer` -- for binary files, to do low-level binary operations. For high-level operations, like slicing, `File` inherits from `Blob`, so we can call them directly, without reading.
- `readAsText` -- for text files, when we'd like to get a string.
- `readAsDataURL` -- when we'd like to use this data in `src` for `img` or another tag. There's an alternative to reading a file for that, as discussed in chapter <info:blob>: `URL.createObjectURL(file)`.

As the reading proceeds, there are events:
- `loadstart` -- loading started.
- `progress` -- occurs during reading.
- `load` -- no errors, reading complete.
- `abort` -- `abort()` called.
- `error` -- error has occurred.
- `loadend` -- reading finished with either success or failure.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Cuando la lectura finaliza, podemos acceder al resultado como:
- `reader.result` el resultado (si fue exitoso)
- `reader.error` el error (si hubo fallo).

Los mas ampliamente usados son seguramente `load` y `error`. 

Un ejemplo de como leer un archivo:

```html run
<input type="file" onchange="readFile(this)">

<script>
function readFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function() {
    console.log(reader.result);
  };

  reader.onerror = function() {
    console.log(reader.error);
  };

}
</script>
```

<<<<<<< HEAD
```smart header="`FileReader` para blobs"
Como mencionamos en el capítulo <info:blob>, `FileReader` no solo lee archivos sino también cualquier blob.

Podemos usarlo para convertir un blob a otro formato:
- `readAsArrayBuffer(blob)` -- a `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- a una cadena (una alternativa al `TextDecoder`),
- `readAsDataURL(blob)` -- a Datos URI en base 64.
```


```smart header="`FileReaderSync` está disponible dentro de  Web Workers"
Para los Web Workers también existe una variante síncrona de `FileReader` llamada [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).
=======
```smart header="`FileReader` for blobs"
As mentioned in the chapter <info:blob>, `FileReader` can read not just files, but any blobs.

We can use it to convert a blob to another format:
- `readAsArrayBuffer(blob)` -- to `ArrayBuffer`,
- `readAsText(blob, [encoding])` -- to string (an alternative to `TextDecoder`),
- `readAsDataURL(blob)` -- to base64 data url.
```


```smart header="`FileReaderSync` is available inside Web Workers"
For Web Workers, there also exists a synchronous variant of `FileReader`, called [FileReaderSync](https://www.w3.org/TR/FileAPI/#FileReaderSync).
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Sus metodos `read*` no generan eventos sino que devuelven un resultado como las funciones regulares.

<<<<<<< HEAD
Esto es solo dentro de un Web Worker, debido a que  demoras en  llamadas síncronas  mientras se lee el archivo en Web Worker no son tan importantes. No afectan la página.
=======
That's only inside a Web Worker though, because delays in synchronous calls, that are possible while reading from files, in Web Workers are less important. They do not affect the page.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

## Resumen

<<<<<<< HEAD
Los objetos `File` heredan de  `Blob`.

Además de los métodos y propiedades de `Blob`, los objetos `File` también tienen las propiedades `name` y `lastModified` mas la habilidad interna de leer del sistema de archivos. Usualmente obtenemos los objetos `File` mediante la entrada del el usuario con `<input>` o eventos Drag'n'Drop (`ondragend`).
=======
`File` objects inherit from `Blob`.

In addition to `Blob` methods and properties, `File` objects also have `name` and `lastModified` properties, plus the internal ability to read from filesystem. We usually get `File` objects from user input, like `<input>` or Drag'n'Drop events (`ondragend`).
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Los objetos `FileReader` pueden leer desde un archivo o un blob en uno de estos tres formatos:
- String (`readAsText`) .
- `ArrayBuffer` (`readAsArrayBuffer`).
- Datos URI codificado en base 64 (`readAsDataURL`).

En muchos casos no necesitamos leer el contenido de un archivo como hicimos con los blobs, podemos crear un enlace corto con `URL.createObjectURL(file)` y asignárselo a un `<a>` o `<img>`. De esta manera el archivo puede ser descargado, mostrado como una imagen o como parte de un canvas, etc.

<<<<<<< HEAD
Y si vamos a mandar un `File` por la red, es fácil utilizando APIs como `XMLHttpRequest` o `fetch` que aceptan nativamente objetos `File` . 
=======
And if we're going to send a `File` over a network, that's also easy: network API like `XMLHttpRequest` or `fetch` natively accepts `File` objects.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
