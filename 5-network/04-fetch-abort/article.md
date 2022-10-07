
# Fetch: Abort

Como sabemos `fetch` devuelve una promesa. Y generalmente JavaScript no tiene un concepto de "abortar" una promesa. Entonces, ¿cómo podemos abortar una llamada al método `fetch`? Por ejemplo si las acciones del usuario en nuestro sitio indican que `fetch` no se necesitará más.

Existe para esto de forma nativa un objeto especial: `AbortController`. Puede ser utilizado para abortar no solo `fetch` sino otras tareas asincrónicas también.

Su uso es muy sencillo:

## El objeto AbortController

Crear un controlador:

```js
let controller = new AbortController();
```

Este controlador es un objeto extremadamente simple.

- Tiene un único método `abort()`,
- y una única propiedad `signal` que permite establecerle escuchadores de eventos.

Cuando `abort()` es invocado:
- `controller.signal` emite el evento `"abort"`.
- La propiedad `controller.signal.aborted` toma el valor `true`.

Generalmente tenemos dos partes en el proceso: 
1. El que ejecuta la operación de cancelación, genera un listener que escucha a `controller.signal`.
2. El que cancela: este llama a `controller.abort()` cuando es necesario.

Tal como se muestra a continuación (por ahora sin `fetch`):

```js run
let controller = new AbortController();
let signal = controller.signal;

// La parte que ejecuta la operación de cancelación 
// obtiene el objeto "signal"
// y genera un listener que se dispara cuando es llamado controller.abort()
signal.addEventListener('abort', () => alert("abort!"));

// El que cancela (más tarde en cualquier punto):
controller.abort(); // abort!

// El  evento se dispara y signal.aborted se vuelve true
alert(signal.aborted); // true
```

Como podemos ver, `AbortController` es simplemente la via para pasar eventos `abort` cuando `abort()` es llamado sobre él.

Podríamos implementar alguna clase de escucha de evento en nuestro código por nuestra cuenta, sin el objeto `AbortController` en absoluto.

Pero lo valioso es que `fetch` sabe cómo trabajar con el objeto `AbortController`, está integrado con él. 

## Uso con fetch

Para posibilitar la cancelación de `fetch`, pasa la propiedad `signal` de un `AbortController` como una opción de `fetch`:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

El método `fetch` conoce cómo trabajar con `AbortController`. Este escuchará eventos `abort` sobre `signal`.

Ahora, para abortar, llamamos `controller.abort()`:

```js
controller.abort();
```

Terminamos: `fetch` obtiene el evento desde `signal` y aborta el requerimiento.

Cuando un fetch es abortado, su promesa es rechazada con un error `AbortError`, así podemos manejarlo, por ejemplo en `try..catch`.

Aquí hay un ejemplo completo con `fetch` abortado después de 1 segundo:

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

## AbortController es escalable

`AbortController` es escalable, permite cancelar múltiples fetch de una vez.

Aquí hay un bosquejo de código que de muchos fetch de `url` en paralelo, y usa un simple controlador para abortarlos a todos:

```js
let urls = [...]; // una lista de urls para utilizar fetch en paralelo

let controller = new AbortController();

// un array de promesas fetch
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// si controller.abort() es llamado,
// se abortaran todas las solicitudes fetch
```

En el caso de tener nuestras propias tareas asincrónicas aparte de `fetch`, podemos utilizar un único `AbortController` para detenerlas junto con fetch.

Solo es necesario escuchar el evento `abort` en nuestras tareas:

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

## Resumen

- `AbortController` es un simple objeto que genera un evento `abort` sobre su propiedad `signal` cuando el método `abort()` es llamado (y también establece `signal.aborted` en `true`).
- `fetch` está integrado con él: pasamos la propiedad `signal` como opción, y entonces `fetch` la escucha, así se vuelve posible abortar `fetch`.
- Podemos usar `AbortController` en nuestro código. La interacción "llamar `abort()`" -> "escuchar evento `abort`" es simple y universal. Podemos usarla incluso sin `fetch`.
