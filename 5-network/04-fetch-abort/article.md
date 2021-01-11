
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

- Tiene un único método `abort()`
- Y una única propiedad `signal`.

Cuando `abort()` es invocado:
- `controller.signal` emite el evento `"abort"`.
- La propiedad `controller.signal.aborted` toma el valor `true`.

<<<<<<< HEAD
Generalmente tenemos dos partes en el proceso: 
1. El que ejecuta la operación de cancelación, genera un listener que escucha a `controller.signal`.
2. El que cancela: este llama a `controller.abort()` cuendo es necesario.
=======
Generally, we have two parties in the process: 
1. The one that performs a cancelable operation, it sets a listener on `controller.signal`.
2. The one that cancels: it calls `controller.abort()` when needed.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Tal como se muestra a continuación (por ahora sin `fetch`):

```js run
let controller = new AbortController();
let signal = controller.signal;

<<<<<<< HEAD
// El que ejecuta la operación de cancelación 
// obtiene el objeto "signal"
// y genera un listener que se dispara cuando es llamado controller.abort()
=======
// The party that performs a cancelable operation 
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
signal.addEventListener('abort', () => alert("abort!"));

// El que cancela (más tarde en cualquier punto):
controller.abort(); // abort!

// El  evento se dispara y signal.aborted se vuelve true
alert(signal.aborted); // true
```

<<<<<<< HEAD
Como podemos ver, `AbortController` es simplemente la via para pasar eventos `abort` cuando `abort()` es llamado sobre él.

Podríamos implementar alguna clase de escucha de evento en nuestro código por nuestra cuenta, sin el objeto `AbortController` en absoluto.

Pero lo valioso es que `fetch` sabe cómo trabajar con el objeto `AbortController`, está integrado con él. 
=======
As we can see, `AbortController` is just a mean to pass `abort` events when `abort()` is called on it.

We could implement the same kind of event listening in our code on our own, without the `AbortController` object.

But what's valuable is that `fetch` knows how to work with the `AbortController` object. It's integrated in it.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

## Uso con fetch

<<<<<<< HEAD
Para posibilitar la cancelación de `fetch`, pasa la propiedad `signal` de un `AbortController` como una opción de `fetch`:
=======
To be able to cancel `fetch`, pass the `signal` property of an `AbortController` as a `fetch` option:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

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

<<<<<<< HEAD
`AbortController` es escalable, permite cancelar múltiples fetch de una vez.
=======
`AbortController` is scalable. It allows to cancel multiple fetches at once.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Aquí hay un bosquejo de código que de muchos fetch de `url` en paralelo, y usa un simple controlador para abortarlos a todos:

```js
let urls = [...]; // una lista de urls para utilizar fetch en paralelo

let controller = new AbortController();

// un array de promesas fetch
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

<<<<<<< HEAD
// si controller.abort() es llamado,
// se abortaran todas las solicitudes fetch
=======
// if controller.abort() is called from anywhere,
// it aborts all fetches
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
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

<<<<<<< HEAD
// en caso de que se llame al método controller.abort() desde algún sitio,
// se abortan todos los fetch y nuestra tarea.
=======
// if controller.abort() is called from anywhere,
// it aborts all fetches and ourJob
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
```

## Resumen

<<<<<<< HEAD
- `AbortController` es un simple objeto que genera un evento `abort` sobre su propiedad `signal` cuando el método `abort()` es llamado (y tambien establece `signal.aborted` en `true`).
- `fetch` está integrado con él: pasamos la propiedad `signal` como opción, y entonces `fetch` la escucha, así se vuelve posible abortar `fetch`.
- Podemos usar `AbortController` en nuestro código. La interacción "llamar `abort()`" -> "escuchar evento `abort`" es simple y universal. Podemos usarla incluso sin `fetch`.
=======
- `AbortController` is a simple object that generates an `abort` event on it's `signal` property when the `abort()` method is called (and also sets `signal.aborted` to `true`).
- `fetch` integrates with it: we pass the `signal` property as the option, and then `fetch` listens to it, so it's possible to abort the `fetch`.
- We can use `AbortController` in our code. The "call `abort()`" -> "listen to `abort` event" interaction is simple and universal. We can use it even without `fetch`.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
