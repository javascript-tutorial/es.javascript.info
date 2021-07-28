
# Fetch: Progreso de la descarga

El método `fetch` permite rastrear el progreso de *descarga*.

Ten en cuenta: actualmente no hay forma de que `fetch` rastree el progreso de *carga*. Para ese propósito, utiliza [XMLHttpRequest](info:xmlhttprequest), lo cubriremos más adelante.

Para rastrear el progreso de la descarga, podemos usar la propiedad `response.body`. Esta propiedad es un `ReadableStream`, un objeto especial que proporciona la transmisión del cuerpo fragmento a fragmento tal como viene. Estas se describen en la especificación de la [API de transmisiones](https://streams.spec.whatwg.org/#rs-class).

A diferencia de `response.text()`, `response.json()` y otros métodos, `response.body` da control total sobre el proceso de lectura, y podemos contar cuánto se consume en cualquier momento.

Aquí está el bosquejo del código que lee la respuesta de `response.body`:

```js
// en lugar de response.json() y otros métodos
const reader = response.body.getReader();

// bucle infinito mientras el cuerpo se descarga
while(true) {
  // done es true para el último fragmento
  // value es Uint8Array de los bytes del fragmento
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  console.log(`Recibí ${value.length} bytes`)
}
```

El resultado de la llamada `await reader.read()` es un objeto con dos propiedades:
- **`done`** -- `true` cuando la lectura está completa, de lo contrario `false`.
- **`value`** -- una matriz de tipo bytes: `Uint8Array`.

```smart
La API de transmisiones también describe la iteración asincrónica sobre `ReadableStream` con el bucle `for await..of`, pero aún no es ampliamente compatible (consulta [problemas del navegador](https://github.com/whatwg/streams/issues/778#issuecomment-461341033)), por lo que usamos el bucle `while`.
```

Recibimos fragmentos de respuesta en el bucle, hasta que finaliza la carga, es decir: hasta que `done` se convierte en `true`.

Para registrar el progreso, solo necesitamos que cada `value` de fragmento recibido agregue su longitud al contador.

Aquí está el ejemplo funcional completo que obtiene la respuesta y registra el progreso en la consola, seguido de su explicación:

```js run async
// Paso 1: iniciar la búsqueda y obtener un lector
let response = await fetch('https://api.github.com/repos/javascript-tutorial/es.javascript.info/commits?per_page=100');

const reader = response.body.getReader();

// Paso 2: obtener la longitud total
const contentLength = +response.headers.get('Content-Length');

// Paso 3: leer los datos
let receivedLength = 0; // cantidad de bytes recibidos hasta el momento
let chunks = []; // matriz de fragmentos binarios recibidos (comprende el cuerpo)
while(true) {
  const {done, value} = await reader.read();

  if (done) {
    break;
  }

  chunks.push(value);
  receivedLength += value.length;

  console.log(`Recibí ${receivedLength} de ${contentLength}`)
}

// Paso 4: concatenar fragmentos en un solo Uint8Array
let chunksAll = new Uint8Array(receivedLength); // (4.1)
let position = 0;
for(let chunk of chunks) {
	chunksAll.set(chunk, position); // (4.2)
	position += chunk.length;
}

// Paso 5: decodificar en un string
let result = new TextDecoder("utf-8").decode(chunksAll);

// ¡Hemos terminado!
let commits = JSON.parse(result);
alert(commits[0].author.login);
```

Expliquemos esto paso a paso:

1. Realizamos `fetch` como de costumbre, pero en lugar de llamar a `response.json()`, obtenemos un lector de transmisión `response.body.getReader()`.

    Ten en cuenta que no podemos usar ambos métodos para leer la misma respuesta: usa un lector o un método de respuesta para obtener el resultado.
2. Antes de leer, podemos averiguar la longitud completa de la respuesta del encabezado `Content-Length`.

    Puede estar ausente para solicitudes cross-origin (consulta el capítulo <info:fetch-crossorigin>) y, bueno, técnicamente un servidor no tiene que configurarlo. Pero generalmente está en su lugar.
3. Llama a `await reader.read()` hasta que esté listo.

    Recopilamos fragmentos de respuesta en la matriz `chunks`. Eso es importante, porque después de consumir la respuesta, no podremos "releerla" usando `response.json()` u otra forma (puedes intentarlo, habrá un error).
4. Al final, tenemos `chunks` - una matriz de fragmentos de bytes `Uint8Array`. Necesitamos unirlos en un solo resultado. Desafortunadamente, no hay un método simple que los concatene, por lo que hay un código para hacerlo:
    1. Creamos `chunksAll = new Uint8Array(selectedLength)` -- una matriz del mismo tipo con la longitud combinada.
    2. Luego usa el método `.set(chunk, position)` para copiar cada `chunk` uno tras otro en él.
5. Tenemos el resultado en `chunksAll`. Sin embargo, es una matriz de bytes, no un string.

    Para crear un string, necesitamos interpretar estos bytes. El [TextDecoder](info:text-decoder) nativo hace exactamente eso. Luego podemos usar el resultado en `JSON.parse`, si es necesario.

    ¿Qué pasa si necesitamos contenido binario en lugar de un string? Eso es aún más sencillo. Reemplaza los pasos 4 y 5 con una sola línea que crea un `Blob` de todos los fragmentos:
    ```js
    let blob = new Blob(chunks);
    ```

Al final tenemos el resultado (como un string o un blob, lo que sea conveniente) y el seguimiento del progreso en el proceso.

Una vez más, ten en cuenta que eso no es para el progreso de *carga* (hasta ahora eso no es posible con `fetch`), solo para el progreso de *descarga*.

Además, si el tamaño es desconocido, deberíamos chequear `receivedLength` en el bucle y cortarlo en cuanto alcance cierto límite, así los `chunks` no agotarán la memoria. 
