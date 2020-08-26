
# Fetch: Abort

Como sabemos `fetch` devuelve una promesa, y generalmente JavaScript no tiene un concepto de "abortar" una promesa. Entonces, ¿cómo podemos abortar una llamada al método `fetch`?

Existe para esto de forma nativa un objeto especial: `AbortController`, este puede ser utilizado para abortar una tarea `fetch`, así como otras tareas asincrónicas.

Su uso es muy sencillo:

- Paso 1: crear un controlador:

    ```js
    let controller = new AbortController();
    ```

    Este controlador es un objeto extremadamente simple.

    - Tiene un único método `abort()`, así como una única propiedad `signal`.
    - Cuando `abort()` es invocado:
        - El evento `abort` se dispara en `controller.signal`
        - La propiedad `controller.signal.aborted` toma el valor `true`.

    Todas las partes interesadas en estar al tanto de una llamada a `abort()` realizan un seguimiento a la propiedad `controller.signal`.

    Tal como se muestra a continuación (por ahora sin `fetch`):

    ```js run
    let controller = new AbortController();
    let signal = controller.signal;

    // triggers when controller.abort() is called
    signal.addEventListener('abort', () => alert("abort!"));

    controller.abort(); // abort!

    alert(signal.aborted); // true
    ```

- Paso 2: Se pasa la propiedad `signal` en la opción de `fetch`:

    ```js
    let controller = new AbortController();
    fetch(url, {
      signal: controller.signal
    });
    ```

    El método `fetch` conoce como funciona `AbortController`, el escucha por `abort` en `signal`.

- Paso 3: Se llama al método `controller.abort()` para abortar:

    ```js
    controller.abort();
    ```

    Y así `fetch` obtiene el evento desde `signal` y aborta la solicitud.

Cuando un fetch es abortado su promesa es rechazada con un error del tipo `AbortError`, por lo que es posible responder a esto utilizando un bloque `try..catch` por ejemplo:

```js run async
// Se abortara en un segundo
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // se maneja el abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}
```

**`AbortController` es escalable, permitiendo cancelar múltiples fetch a la vez.**

Por ejemplo, aquí tenemos muchas `urls` en paralelo, y el controlador las aborta todas:

```js
let urls = [...]; // una lista de urls para utilizar fetch en paralelo

let controller = new AbortController();

let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// si controller.abort() es llamado,
// se abortaran todas las solicitudes fetch
```

En el caso de tener nuestras propias tareas asincrónicas aparte de `fetch`, podemos utilizar un único `AbortController` para detenerlas junto con fetch.

Solo es necesario escuchar el evento `abort`:

```js
let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // nuestra tarea
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // varios fetch
  signal: controller.signal
}));

// Se espera por la finalización de los fetch y nuestra tarea
let results = await Promise.all([...fetchJobs, ourJob]);

// en caso de que se llame al método controller.abort() desde algún sitio,
// se abortan todos los fetch y nuestra tarea.
```

Por lo tanto, si bien `fetch` incorpora esta funcionalidad de forma nativa, `AbortController` no es sólo para `fetch`, sino que es un objeto universal para abortar tareas asincrónicas.
