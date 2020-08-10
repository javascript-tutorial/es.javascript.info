# Promise API

<<<<<<< HEAD
Hay 5 métodos estáticos en la clase `Promise`. Veremos sus casos de uso aquí.

## Promise.all

Digamos que queremos que muchas promesas se ejecuten en paralelo y esperar hasta que todas ellas estén listas.

Por ejemplo, descargar varias URLs en paralelo y procesar su contenido en cuanto todas ellas finalicen.
=======
There are 5 static methods in the `Promise` class. We'll quickly cover their use cases here.

## Promise.all

Let's say we want many promises to execute in parallel and wait until all of them are ready.

For instance, download several URLs in parallel and process the content once they are all done.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Para ello es `Promise.all`.

La sintaxis es:

```js
let promise = Promise.all([...promises...]);
```

<<<<<<< HEAD
`Promise.all` toma un array de promesas (técnicamente puede ser cualquier iterable pero usualmente es un array) y devuelve una nueva promesa.

Esta nueva promesa es resuelta en cuanto todas las promesas listadas se resuelven y el array de aquellos resultados se vuelve su resultado.
=======
`Promise.all` takes an array of promises (it technically can be any iterable, but is usually an array) and returns a new promise.

The new promise resolves when all listed promises are settled, and the array of their results becomes its result.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Por ejemplo, el `Promise.all` debajo se resuelve después de 3 segundos, y su resultado es un array `[1, 2, 3]`:

```js run
Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]).then(alert); // 1,2,3 cuando las promesas están listas: cada promesa constituye un miembro del array
```

<<<<<<< HEAD
Ten en cuenta que el orden de los miembros del array es el mismo que el de las promesas que los originan. Aunque la primera promesa es la que toma más tiempo en resolverse, es aún la primera en el array de resultados.
=======
Please note that the order of the resulting array members is the same as in its source promises. Even though the first promise takes the longest time to resolve, it's still first in the array of results.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Un truco común es mapear un array de datos de trabajo dentro de un array de promesas, y entonces envolverlos dentro de un `Promise.all`.

Por ejemplo, si tenemos un array de URLs, podemos usar `fetch` en todos ellos así:

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

<<<<<<< HEAD
// "mapear" cada url a la promesa de su fetch
=======
// map every url to the promise of the fetch
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
let requests = urls.map(url => fetch(url));

// Promise.all espera hasta que todas la tareas estén resueltas
Promise.all(requests)
  .then(responses => responses.forEach(
    response => alert(`${response.url}: ${response.status}`)
  ));
```

<<<<<<< HEAD
Un mayor ejemplo con fetch: la búsqueda de información de usuario para un array de usuarios de GitHub por sus nombres (o podríamos buscar un array de bienes por sus "id", la lógica es idéntica):
=======
A bigger example with fetching user information for an array of GitHub users by their names (we could fetch an array of goods by their ids, the logic is identical):
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
let names = ['iliakan', 'remy', 'jeresig'];

let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

Promise.all(requests)
  .then(responses => {
<<<<<<< HEAD
    // todas las respuestas son resueltas satisfactoriamente
=======
    // all responses are resolved successfully
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
    for(let response of responses) {
      alert(`${response.url}: ${response.status}`); // muestra 200 por cada url
    }

    return responses;
  })
<<<<<<< HEAD
  // mapea el array de resultados dentro de un array de response.json() para leer sus contenidos
=======
  // map array of responses into an array of response.json() to read their content
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
  .then(responses => Promise.all(responses.map(r => r.json())))
  // todas las respuestas JSON son analizadas: "users" es el array de ellas
  .then(users => users.forEach(user => alert(user.name)));
```

<<<<<<< HEAD
**Si cualquiera de las promesas es rechazada, la promesa devuelta por `Promise.all` inmediatamente rechaza: "reject" con ese error.**
=======
**If any of the promises is rejected, the promise returned by `Promise.all` immediately rejects with that error.**
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Por ejemplo:

```js run
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
*!*
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
*/!*
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
Aquí la segunda promesa se rechaza en dos segundos. Esto lleva a un rechazo inmediato de `Promise.all`, entonces `.catch` se ejecuta: el error del rechazo se vuelve la salida del `Promise.all` entero.

```warn header="En caso de error, las demás promesas son ignoradas"
Si una promesa se rechaza, `Promise.all` se rechaza inmediatamente, olvidando completamente las otras de la lista. Aquellos resultados son ignorados.

Por ejemplo, si hay múltiples llamados `fetch`, como en el ejemplo arriba, y uno falla, los demás aún continuarán en ejecución, pero `Promise.all` no las observará más. Ellas probablemente respondan pero sus resultados serán ignorados.

`Promise.all` no hace nada para cancelarlas, no existe un concepto de "cancelación" en las promesas. En [otro capítulo](info:fetch-abort) veremos `AbortController` que puede ayudar con ello pero no es parte de la API de las promesas.
```

````smart header="`Promise.all(iterable)` permite valores \"comunes\" que no sean promesas en `iterable` "
Normalmente, `Promise.all(...)` acepta un iterable (array en la mayoría de los casos) de promesas. Pero si alguno de esos objetos no es una promesa, es pasado al array resultante "tal como está".
=======
Here the second promise rejects in two seconds. That leads to an immediate rejection of `Promise.all`, so `.catch` executes: the rejection error becomes the outcome of the entire `Promise.all`.

```warn header="In case of an error, other promises are ignored"
If one promise rejects, `Promise.all` immediately rejects, completely forgetting about the other ones in the list. Their results are ignored.

For example, if there are multiple `fetch` calls, like in the example above, and one fails, the others will still continue to execute, but `Promise.all` won't watch them anymore. They will probably settle, but their results will be ignored.

`Promise.all` does nothing to cancel them, as there's no concept of "cancellation" in promises. In [another chapter](info:fetch-abort) we'll cover `AbortController` that can help with that, but it's not a part of the Promise API.
```

````smart header="`Promise.all(iterable)` allows non-promise \"regular\" values in `iterable`"
Normally, `Promise.all(...)` accepts an iterable (in most cases an array) of promises. But if any of those objects is not a promise, it's passed to the resulting array "as is".
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Por ejemplo, aquí los resultados son `[1, 2, 3]`:

```js run
Promise.all([
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000)
  }),
  2,
  3
]).then(alert); // 1, 2, 3
```

<<<<<<< HEAD
Entonces podemos pasar valores listos a `Promise.all` donde sea conveniente.
=======
So we are able to pass ready values to `Promise.all` where convenient.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
````

## Promise.allSettled

[recent browser="new"]

<<<<<<< HEAD
`Promise.all` rechaza como un todo si cualquiera de sus promesas es rechazada. Esto es bueno para los casos de "todo o nada", cuando necesitamos que *todos* los resultados sean exitosos para proceder:
=======
`Promise.all` rejects as a whole if any promise rejects. That's good for "all or nothing" cases, when we need *all* results successful to proceed:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js
Promise.all([
  fetch('/template.html'),
  fetch('/style.css'),
  fetch('/data.json')
<<<<<<< HEAD
]).then(render); // el método render necesita los resultados de todos los fetch
```

`Promise.allSettled` solo espera que todas las promesas se resuelvan sin importar sus resultados. El array resultante tiene:

- `{status:"fulfilled", value:result}` para respuestas exitosas,
- `{status:"rejected", reason:error}` para errores.

Por ejemplo, quisiéramos hacer "fetch" de la información de múltiples usuarios. Incluso si uno falla, aún estaremos interesados en los otros.

Usemos `Promise.allSettled`:
=======
]).then(render); // render method needs results of all fetches
```

`Promise.allSettled` just waits for all promises to settle, regardless of the result. The resulting array has:

- `{status:"fulfilled", value:result}` for successful responses,
- `{status:"rejected", reason:error}` for errors.

For example, we'd like to fetch the information about multiple users. Even if one request fails, we're still interested in the others.

Let's use `Promise.allSettled`:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
  .then(results => { // (*)
    results.forEach((result, num) => {
      if (result.status == "fulfilled") {
        alert(`${urls[num]}: ${result.value.status}`);
      }
      if (result.status == "rejected") {
        alert(`${urls[num]}: ${result.reason}`);
      }
    });
  });
```

<<<<<<< HEAD
El `results` de la línea `(*)` de arriba será:
=======
The `results` in the line `(*)` above will be:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

<<<<<<< HEAD
Entonces para cada promesa obtendremos su estado y `value/error`.

### Polyfill

Si el browser no soporta `Promise.allSettled`, es fácil implementarlo:
=======
So for each promise we get its status and `value/error`.

### Polyfill

If the browser doesn't support `Promise.allSettled`, it's easy to polyfill:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      status: 'fulfilled',
      value
    }), reason => ({
      status: 'rejected',
      reason
    }))));
  };
}
```

<<<<<<< HEAD
En este código, `promises.map` toma los valores de entrada, los transforma en promesas (por si no lo eran) con `p => Promise.resolve(p)`, entonces agrega un manejador `.then` a cada una.

Este manejador ("handler") transforma un resultado extitoso `value` en `{status:'fulfilled', value}`, y un error `reason` en `{status:'rejected', reason}`. Ese es exactamente el formato de `Promise.allSettled`.

Ahora podemos usar `Promise.allSettled` para obtener el resultado de *todas* las promesas dadas incluso si algunas son rechazadas.

## Promise.race

Similar a `Promise.all` pero espera solamente por la primera respuesta y obtiene su resultado (o error).
=======
In this code, `promises.map` takes input values, turns them into promises (just in case a non-promise was passed) with `p => Promise.resolve(p)`, and then adds `.then` handler to every one.

That handler turns a successful result `value` into `{status:'fulfilled', value}`, and an error `reason` into `{status:'rejected', reason}`. That's exactly the format of `Promise.allSettled`.

Now we can use `Promise.allSettled` to get the results of *all* given promises, even if some of them reject.

## Promise.race

Similar to `Promise.all`, but waits only for the first settled promise and gets its result (or error).
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Su sintaxis es:

```js
let promise = Promise.race(iterable);
```

Por ejemplo, aquí el resultado será `1`:

```js run
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

<<<<<<< HEAD
La primera promesa fue la más rápida, por lo que se vuelve resultado. En cuanto una promesa responde, "gana la carrera", y todos los resultados o errores posteriores son ignorados.
=======
The first promise here was fastest, so it became the result. After the first settled promise "wins the race", all further results/errors are ignored.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c


## Promise.resolve/reject

<<<<<<< HEAD
Los métodos `Promise.resolve` y `Promise.reject` son raramente necesitados en código moderno porque la sintaxis `async/await` (que veremos [luego](info:async-await)) las hace algo obsoletas.

Las tratamos aquí para completar la cobertura y por aquellos casos que por algún motivo no puedan usar `async/await`.

### Promise.resolve

`Promise.resolve(value)` crea una promesa resuelta con el resultado `value`.

Tal como:
=======
Methods `Promise.resolve` and `Promise.reject` are rarely needed in modern code, because `async/await` syntax (we'll cover it [a bit later](info:async-await)) makes them somewhat obsolete.

We cover them here for completeness and for those who can't use `async/await` for some reason.

### Promise.resolve

`Promise.resolve(value)` creates a resolved promise with the result `value`.

Same as:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js
let promise = new Promise(resolve => resolve(value));
```

<<<<<<< HEAD
El método es usado por compatibilidad, cuando se espera que una función devuelva una promesa.

Por ejemplo, la función `loadCached` abajo busca una URL y recuerda (en caché) su contenido. Futuros llamados con la misma URL devolverá el contenido de caché, pero usa `Promise.resolve` para hacer una promesa de él y así el valor devuelto es siempre una promesa:
=======
The method is used for compatibility, when a function is expected to return a promise.

For example, the `loadCached` function below fetches a URL and remembers (caches) its content. For future calls with the same URL it immediately gets the previous content from cache, but uses `Promise.resolve` to make a promise of it, so the returned value is always a promise:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
*!*
    return Promise.resolve(cache.get(url)); // (*)
*/!*
  }

  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}
```

<<<<<<< HEAD
Podemos escribir `loadCached(url).then(…)` porque se garantiza que la función devuelve una promesa. Siempre podremos usar `.then` después de `loadCached`. Ese es el propósito de `Promise.resolve` en la línea `(*)`.

### Promise.reject

`Promise.reject(error)` crea una promesa rechazada con `error`.

Tal como:
=======
We can write `loadCached(url).then(…)`, because the function is guaranteed to return a promise. We can always use `.then` after `loadCached`. That's the purpose of `Promise.resolve` in the line `(*)`.

### Promise.reject

`Promise.reject(error)` creates a rejected promise with `error`.

Same as:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js
let promise = new Promise((resolve, reject) => reject(error));
```

<<<<<<< HEAD
En la práctica este método casi nunca es usado.
=======
In practice, this method is almost never used.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

## Resumen

<<<<<<< HEAD
Existen 5 métodos estáticos de la clase `Promise`:

1. `Promise.all(promises)` -- espera que todas las promesas se resuelvan y devuelve un array de sus resultados. Si cualquiera es rechazada se vuelve el error de `Promise.all` y los demás resultados son ignorados.
2. `Promise.allSettled(promises)` (método recientemente añadido) -- espera que toda las promesas respondan y devuelve sus resultados como un array de objetos con:
    - `status`: `"fulfilled"` o `"rejected"`
    - `value` (si fulfilled) o `reason` (si rejected).
3. `Promise.race(promises)` -- espera a la primera promesa que responda y aquel resultado o error se vuelve su resultado o error.
4. `Promise.resolve(value)` -- crea una promesa resuelta con el "value" dado.
5. `Promise.reject(error)` -- crea una promesa rechazada con el "error" dado.

De las 5, `Promise.all` es probablemente la más común en la práctica.
=======
There are 5 static methods of `Promise` class:

1. `Promise.all(promises)` -- waits for all promises to resolve and returns an array of their results. If any of the given promises rejects, it becomes the error of `Promise.all`, and all other results are ignored.
2. `Promise.allSettled(promises)` (recently added method) -- waits for all promises to settle and returns their results as an array of objects with:
    - `status`: `"fulfilled"` or `"rejected"`
    - `value` (if fulfilled) or `reason` (if rejected).
3. `Promise.race(promises)` -- waits for the first promise to settle, and its result/error becomes the outcome.
4. `Promise.resolve(value)` -- makes a resolved promise with the given value.
5. `Promise.reject(error)` -- makes a rejected promise with the given error.

Of these five, `Promise.all` is probably the most common in practice.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
