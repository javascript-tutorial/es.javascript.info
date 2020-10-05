
# Fetch: Abort

<<<<<<< HEAD
Como sabemos `fetch` devuelve una promesa, y generalmente JavaScript no tiene un concepto de "abortar" una promesa. Entonces, ¿cómo podemos abortar una llamada al método `fetch`?

Existe para esto de forma nativa un objeto especial: `AbortController`, este puede ser utilizado para abortar una tarea `fetch`, así como otras tareas asincrónicas.

Su uso es muy sencillo:

- Paso 1: crear un controlador:
=======
As we know, `fetch` returns a promise. And JavaScript generally has no concept of "aborting" a promise. So how can we cancel an ongoing `fetch`? E.g. if the user actions on our site indicate that the `fetch` isn't needed any more.

There's a special built-in object for such purposes: `AbortController`. It can be used to abort not only `fetch`, but other asynchronous tasks as well.

The usage is very straightforward:

## The AbortController object
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

Create a controller:

<<<<<<< HEAD
    Este controlador es un objeto extremadamente simple.

    - Tiene un único método `abort()`, así como una única propiedad `signal`.
    - Cuando `abort()` es invocado:
        - El evento `abort` se dispara en `controller.signal`
        - La propiedad `controller.signal.aborted` toma el valor `true`.

    Todas las partes interesadas en estar al tanto de una llamada a `abort()` realizan un seguimiento a la propiedad `controller.signal`.

    Tal como se muestra a continuación (por ahora sin `fetch`):
=======
```js
let controller = new AbortController();
```

A controller is an extremely simple object.

- It has a single method `abort()`,
- And a single property `signal` that allows to set event liseners on it.

When `abort()` is called:
- `controller.signal` emits the `"abort"` event.
- `controller.signal.aborted` property becomes `true`.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

Generally, we have two parties in the process: 
1. The one that performs an cancelable operation, it sets a listener on `controller.signal`.
2. The one one that cancels: it calls `controller.abort()` when needed.

Here's the full example (without `fetch` yet):

```js run
let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation 
// gets "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

<<<<<<< HEAD
- Paso 2: Se pasa la propiedad `signal` en la opción de `fetch`:
=======
// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true
```
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

As we can see, `AbortController` is just a means to pass `abort` events when `abort()` is called on it.

<<<<<<< HEAD
    El método `fetch` conoce como funciona `AbortController`, el escucha por `abort` en `signal`.

- Paso 3: Se llama al método `controller.abort()` para abortar:
=======
We could implement same kind of event listening in our code on our own, without `AbortController` object at all.

But what's valuable is that `fetch` knows how to work with `AbortController` object, it's integrated with it. 
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

## Using with fetch

<<<<<<< HEAD
    Y así `fetch` obtiene el evento desde `signal` y aborta la solicitud.

Cuando un fetch es abortado su promesa es rechazada con un error del tipo `AbortError`, por lo que es posible responder a esto utilizando un bloque `try..catch` por ejemplo:
=======
To become able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:

```js
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
```

The `fetch` method knows how to work with `AbortController`. It will listen to `abort` events on `signal`.

Now, to to abort, call `controller.abort()`:

```js
controller.abort();
```

We're done: `fetch` gets the event from `signal` and aborts the request.

When a fetch is aborted, its promise rejects with an error `AbortError`, so we should handle it, e.g. in `try..catch`.

Here's the full example with `fetch` aborted after 1 second:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

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

<<<<<<< HEAD
**`AbortController` es escalable, permitiendo cancelar múltiples fetch a la vez.**

Por ejemplo, aquí tenemos muchas `urls` en paralelo, y el controlador las aborta todas:
=======
## AbortController is scalable

`AbortController` is scalable, it allows to cancel multiple fetches at once.

Here's a sketch of code that fetches many `urls` in parallel, and uses a single controller to abort them all:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

```js
let urls = [...]; // una lista de urls para utilizar fetch en paralelo

let controller = new AbortController();

// an array of fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// si controller.abort() es llamado,
// se abortaran todas las solicitudes fetch
```

<<<<<<< HEAD
En el caso de tener nuestras propias tareas asincrónicas aparte de `fetch`, podemos utilizar un único `AbortController` para detenerlas junto con fetch.

Solo es necesario escuchar el evento `abort`:
=======
If we have our own asynchronous tasks, different from `fetch`, we can use a single `AbortController` to stop those, together with fetches.

We just need to listen to its `abort` event in our tasks:
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca

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

<<<<<<< HEAD
Por lo tanto, si bien `fetch` incorpora esta funcionalidad de forma nativa, `AbortController` no es sólo para `fetch`, sino que es un objeto universal para abortar tareas asincrónicas.
=======
## Summary

- `AbortController` is a simple object that generates `abort` event on it's `signal` property when `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass `signal` property as the option, and then `fetch` listens to it, so it becomes possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> 181cc781ab6c55fe8c43887a0c060db7f93fb0ca
