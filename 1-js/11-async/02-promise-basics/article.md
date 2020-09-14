# Promesa

Imagina que eres un gran cantante y los fanáticos te preguntan día y noche por tu próximo sencillo.

<<<<<<< HEAD
Para obtener algo de alivio, prometes enviárselos cuando se publique. Le das a tus fans una lista. Pueden completar sus direcciones de correo electrónico, de modo que cuando la canción esté disponible, todas las partes suscritas la reciban instantáneamente. E incluso si algo sale muy mal, digamos, un incendio en el estudio, para que no puedas publicar la canción, aún se les notificará.

Todos están felices: tú, porque la gente ya no te abruma, y los fanáticos, porque no se perderán el sencillo.
=======
To get some relief, you promise to send it to them when it's published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, a fire in the studio, so that you can't publish the song, they will still be notified.

Everyone is happy: you, because the people don't crowd you anymore, and fans, because they won't miss the single.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Esta es una analogía de la vida real para las cosas que a menudo tenemos en la programación:

<<<<<<< HEAD
1. Un "código productor" que hace algo y toma tiempo. Por ejemplo, algún código que carga los datos a través de una red. Eso es un "cantante".
2. Un "código consumidor" que quiere el resultado del "código productor" una vez que está listo. Muchas funciones pueden necesitar ese resultado. Estos son los "fanáticos".
3. Una *promesa* es un objeto JavaScript especial que une el "código productor" y el "código consumidor". En términos de nuestra analogía: esta es la "lista de suscripción". El "código productor" toma el tiempo que sea necesario para producir el resultado prometido, y la "promesa" hace que ese resultado esté disponible para todo el código suscrito cuando esté listo.
=======
1. A "producing code" that does something and takes time. For instance, some code that loads the data over a network. That's a "singer".
2. A "consuming code" that wants the result of the "producing code" once it's ready. Many functions  may need that result. These are the "fans".
3. A *promise* is a special JavaScript object that links the "producing code" and the "consuming code" together. In terms of our analogy: this is the "subscription list". The "producing code" takes whatever time it needs to produce the promised result, and the "promise" makes that result available to all of the subscribed code when it's ready.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

La analogía no es terriblemente precisa, porque las promesas de JavaScript son más complejas que una simple lista de suscripción: tienen características y limitaciones adicionales. Pero está bien para empezar.

La sintaxis del constructor para un objeto promesa es:

```js
let promise = new Promise(function(resolve, reject) {
  // Ejecutor (el código productor, "cantante")
});
```

<<<<<<< HEAD
La función pasada a `new Promise` se llama *ejecutor*. Cuando se crea `new Promise`, el ejecutor corre automáticamente. Contiene el código productor que eventualmente debería producir el resultado. En términos de la analogía anterior: el ejecutor es el "cantante".

Sus argumentos `resolve` y `reject` son callbacks proporcionadas por el propio JavaScript. Nuestro código solo está dentro del ejecutor.

Cuando el ejecutor obtiene el resultado, ya sea pronto o tarde, no importa, debe llamar a una de estos callbacks:

- `resolve(value)` - si el trabajo finalizó con éxito, con el resultado `value`.
- `reject(error)` - si ocurrió un error, `error` es el objeto error.

Para resumir: el ejecutor corre automáticamente e intenta realizar una tarea. Cuando termina con el intento, llama a 'resolve' si fue exitoso o 'reject' si hubo un error.

El objeto `promise` devuelto por el constructor `new Promise` tiene estas propiedades internas:

- `state` - inicialmente `"pendiente"`, luego cambia a `"cumplido"` cuando se llama a `resolve` o `"rechazado"` cuando se llama a `reject`.
- `result` - inicialmente `indefinido`, luego cambia a `valor` cuando se llama a `resolve(valor)` o `error` cuando se llama a `reject(error)`.

Entonces el ejecutor eventualmente mueve la `promise` a uno de estos estados:

![](promise-resolve-reject.svg)

Después veremos cómo los "fanáticos" pueden suscribirse a estos cambios.

Aquí hay un ejemplo de un constructor de promesas y una función ejecutora simple con "código productor" que toma tiempo (a través de `setTimeout`):
=======
The function passed to `new Promise` is called the *executor*. When `new Promise` is created, the executor runs automatically. It contains the producing code which should eventually produce the result. In terms of the analogy above: the executor is the "singer".

Its arguments `resolve` and `reject` are callbacks provided by JavaScript itself. Our code is only inside the executor.

When the executor obtains the result, be it soon or late, doesn't matter, it should call one of these callbacks:

- `resolve(value)` — if the job finished successfully, with result `value`.
- `reject(error)` — if an error occurred, `error` is the error object.

So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt it calls `resolve` if it was successful or `reject` if there was an error.

The `promise` object returned by the `new Promise` constructor has these internal properties:

- `state` — initially `"pending"`, then changes to either `"fulfilled"` when `resolve` is called or `"rejected"` when `reject` is called.
- `result` — initially `undefined`, then changes to `value` when `resolve(value)` called or `error` when `reject(error)` is called.

So the executor eventually moves `promise` to one of these states:

![](promise-resolve-reject.svg)

Later we'll see how "fans" can subscribe to these changes.

Here's an example of a promise constructor and a simple executor function with  "producing code" that takes time (via `setTimeout`):
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
let promise = new Promise(function(resolve, reject) {
  // la función se ejecuta automáticamente cuando se construye la promesa

  // después de 1 segundo, indica que la tarea está hecha con el resultado "hecho"
  setTimeout(() => *!*resolve("hecho")*/!*, 1000);
});
```

Podemos ver dos cosas al ejecutar el código anterior:

<<<<<<< HEAD
1. Se llama al ejecutor de forma automática e inmediata (por `new Promise`).
2. El ejecutor recibe dos argumentos: `resolve` y `reject`. Estas funciones están predefinidas por el motor de JavaScript, por lo que no necesitamos crearlas. Solo debemos llamar a uno de ellos cuando esté listo.

    Después de un segundo de "procesamiento", el ejecutor llama a `resolve("hecho")` para producir el resultado. Esto cambia el estado del objeto `promise`:
=======
1. The executor is called automatically and immediately (by `new Promise`).
2. The executor receives two arguments: `resolve` and `reject`. These functions are pre-defined by the JavaScript engine, so we don't need to create them. We should only call one of them when ready.

    After one second of "processing" the executor calls `resolve("done")` to produce the result. This changes the state of the `promise` object:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    ![](promise-resolve-1.svg)

Ese fue un ejemplo de finalización exitosa de la tarea, una "promesa cumplida".

Y ahora un ejemplo del ejecutor rechazando la promesa con un error:

```js
let promise = new Promise(function(resolve, reject) {
  // después de 1 segundo, indica que la tarea ha finalizado con un error
  setTimeout(() => *!*reject(new Error("¡Vaya!"))*/!*, 1000);
});
```

<<<<<<< HEAD
La llamada a `reject(...)` mueve el objeto promise al estado  `"rechazado"`:

![](promise-reject-1.svg)

Para resumir, el ejecutor debe realizar una tarea (generalmente algo que toma tiempo) y luego llamar a "resolve" o "reject" para cambiar el estado del objeto promise correspondiente.

Una promesa que se resuelve o se rechaza se denomina "resuelta", en oposición a una promesa inicialmente "pendiente".
=======
The call to `reject(...)` moves the promise object to `"rejected"` state:

![](promise-reject-1.svg)

To summarize, the executor should perform a job (usually something that takes time) and then call `resolve` or `reject` to change the state of the corresponding promise object.

A promise that is either resolved or rejected is called "settled", as opposed to an initially "pending" promise.

````smart header="There can be only a single result or an error"
The executor should call only one `resolve` or one `reject`. Any state change is final.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

````smart header="Solo puede haber un único resultado o un error"
El ejecutor debe llamar solo a un 'resolve' o un 'reject'. Cualquier cambio de estado es definitivo.

Se ignoran todas las llamadas adicionales de 'resolve' y 'reject':

```js
let promise = new Promise(function(resolve, reject) {
*!*
<<<<<<< HEAD
  resolve("hecho");
=======
  resolve("done");
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
*/!*

  reject(new Error("…")); // ignorado
  setTimeout(() => resolve("…")); // ignorado
});
```

La idea es que una tarea realizada por el ejecutor puede tener solo un resultado o un error.

Además, `resolve`/`reject` espera solo un argumento (o ninguno) e ignorará argumentos adicionales.
````

<<<<<<< HEAD
```smart header="Rechazar con objetos `Error`"
En caso de que algo salga mal, el ejecutor debe llamar a 'reject'. Eso se puede hacer con cualquier tipo de argumento (al igual que `resolve`). Pero se recomienda usar objetos `Error` (u objetos que hereden de `Error`). El razonamiento para eso pronto se hará evidente.
=======
```smart header="Reject with `Error` objects"
In case something goes wrong, the executor should call `reject`. That can be done with any type of argument (just like `resolve`). But it is recommended to use `Error` objects (or objects that inherit from `Error`). The reasoning for that will soon become apparent.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```

````smart header="Inmediatamente llamando a `resolve`/`reject`"
En la práctica, un ejecutor generalmente hace algo de forma asíncrona y llama a `resolve`/`reject` después de un tiempo, pero no tiene que hacerlo. También podemos llamar a `resolve` o `reject` inmediatamente, así:

```js
let promise = new Promise(function(resolve, reject) {
  // sin que nos quite tiempo para hacer la tarea
  resolve(123); // dar inmediatamente el resultado: 123
});
```

<<<<<<< HEAD
Por ejemplo, esto puede suceder cuando comenzamos una tarea pero luego vemos que todo ya se ha completado y almacenado en caché.

Está bien. Inmediatamente tenemos una promesa resuelta.
````

```smart header="El `state` y el `result` son internos"
Las propiedades `state` y `result` del objeto Promise son internas. No podemos acceder directamente a ellas. Podemos usar los métodos `.then`/`.catch`/`.finally` para eso. Se describen a continuación.
=======
For instance, this might happen when we start to do a job but then see that everything has already been completed and cached.

That's fine. We immediately have a resolved promise.
````

```smart header="The `state` and `result` are internal"
The properties `state` and `result` of the Promise object are internal. We can't directly access them. We can use the methods `.then`/`.catch`/`.finally` for that. They are described below.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```

## Consumidores: then, catch, finally

Un objeto Promise sirve como enlace entre el ejecutor (el "código productor" o el "cantante") y las funciones consumidoras (los "fanáticos"), que recibirán el resultado o error. Las funciones de consumo pueden registrarse (suscribirse) utilizando los métodos `.then`, `.catch` y `.finally`.

### then

El más importante y fundamental es `.then`.

La sintaxis es:

```js
promise.then(
  function(result) { *!*/* manejar un resultado exitoso */*/!* },
  function(error) { *!*/* manejar un error */*/!* }
);
```

<<<<<<< HEAD
El primer argumento de `.then` es una función que se ejecuta cuando se resuelve la promesa y recibe el resultado.

El segundo argumento de `.then` es una función que se ejecuta cuando se rechaza la promesa y recibe el error.

Por ejemplo, aquí hay una reacción a una promesa resuelta con éxito:
=======
The first argument of `.then` is a function that runs when the promise is resolved, and receives the result.

The second argument of `.then` is a function that runs when the promise is rejected, and receives the error.

For instance, here's a reaction to a successfully resolved promise:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("hecho!"), 1000);
});

// resolve ejecuta la primera función en .then
promise.then(
*!*
  result => alert(result), // muestra "hecho!" después de 1 segundo
*/!*
  error => alert(error) // no se ejecuta
);
```

La primera función fue ejecutada.

<<<<<<< HEAD
Y en el caso de un rechazo, el segundo:
=======
And in the case of a rejection, the second one:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Vaya!")), 1000);
});

// reject ejecuta la segunda función en .then
promise.then(
  result => alert(result), // no se ejecuta
*!*
  error => alert(error) // muestra "Error: ¡Vaya!" después de 1 segundo
*/!*
);
```

Si solo nos interesan las terminaciones exitosas, entonces podemos proporcionar solo un argumento de función para `.then`:

```js run
let promise = new Promise(resolve => {
  setTimeout(() => resolve("hecho!"), 1000);
});

*!*
promise.then(alert); // muestra "Error: ¡Vaya!" después de 1 segundo
*/!*
```

### catch

Si solo nos interesan los errores, entonces podemos usar `null` como primer argumento: `.then(null, errorHandlingFunction)`. O podemos usar `.catch(errorHandlingFunction)`, que es exactamente lo mismo:


```js run
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Vaya!")), 1000);
});

*!*
// .catch(f) es lo mismo que promise.then(null, f)
promise.catch(alert); // muestra "Error: ¡Vaya!" después de 1 segundo
*/!*
```

La llamada `.catch(f)` es un análogo completo de `.then(null, f)`, es solo una abreviatura.

### finally

<<<<<<< HEAD
Al igual que hay una cláusula `finally` en un `try {...} catch {...}` normal, hay un `finally` en las promesas.

La llamada `.finally(f)` es similar a `.then(f, f)` en el sentido de que `f` siempre se ejecuta cuando se resuelve la promesa: ya sea que se resuelva o rechace.

`finally` es un buen controlador para realizar la limpieza, por ejemplo, detener nuestros indicadores de carga, ya que ya no son necesarios, sin importar cuál sea el resultado.
=======
Just like there's a `finally` clause in a regular `try {...} catch {...}`, there's `finally` in promises.

The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` always runs when the promise is settled: be it resolve or reject.

`finally` is a good handler for performing cleanup, e.g. stopping our loading indicators, as they are not needed anymore, no matter what the outcome is.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Como esto:

```js
new Promise((resolve, reject) => {
  /* hacer algo para tomar tiempo y luego llamar a resolve/reject */
})
*!*
  // se ejecuta cuando se cumple la promesa, no importa con éxito o no
  .finally(() => stop loading indicator)
*/!*
  .then(result => show result, err => show error)
```

<<<<<<< HEAD
Sin embargo, no es exactamente un alias de `then(f, f)`. Hay varias diferencias importantes:

1. Un manejador `finally` no tiene argumentos. En `finally` no sabemos si la promesa es exitosa o no. Eso está bien, ya que nuestra tarea generalmente es realizar procedimientos de finalización "generales".
2. Un controlador `finally` pasa a través de resultados y errores al siguiente controlador.
=======
It's not exactly an alias of `then(f,f)` though. There are several important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.
2. A `finally` handler passes through results and errors to the next handler.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    Por ejemplo, aquí el resultado se pasa a través de `finally` a `then`:
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("resultado"), 2000)
    })
      .finally(() => alert("Promesa lista"))
      .then(result => alert(result)); // <-- .luego maneja el resultado
    ```

    Y aquí hay un error en la promesa, pasado por `finally` a `catch`:

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
<<<<<<< HEAD
      .finally(() => alert("Promesa lista"))
      .catch(err => alert(err));  // <-- .catch maneja el objeto error
    ```

    Eso es muy conveniente, porque 'finally' no está destinado a procesar un resultado "promesa". Entonces lo pasa.
=======
      .finally(() => alert("Promise ready"))
      .catch(err => alert(err));  // <-- .catch handles the error object
    ```

    That's very convenient, because `finally` is not meant to process a promise result. So it passes it through.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    Hablaremos más sobre el encadenamiento de promesas y la transmisión de resultados entre los manejadores en el próximo capítulo.

<<<<<<< HEAD
3. Por último, pero no menos importante, `.finally(f)` es una sintaxis más conveniente que `.then(f, f)`: no es necesario duplicar la función `f`.

````smart header="En promesas establecidas, los manejadores se ejecutan inmediatamente"
Si hay una promesa pendiente, los manejadores `.then/catch/finally` la esperan. De lo contrario, si una promesa ya se resolvió, se ejecutan inmediatamente:

```js run
// la promesa se resuelve inmediatamente después de la creación
let promise = new Promise(resolve => resolve("hecho!"));
=======
3. Last, but not least, `.finally(f)` is a more convenient syntax than `.then(f, f)`: no need to duplicate the function `f`.

````smart header="On settled promises handlers run immediately"
If a promise is pending, `.then/catch/finally` handlers wait for it. Otherwise, if a promise has already settled, they execute immediately:

```js run
// the promise becomes resolved immediately upon creation
let promise = new Promise(resolve => resolve("done!"));
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

promise.then(alert); // ¡hecho! (aparece ahora)
```

<<<<<<< HEAD
Ten en cuenta que esto es diferente y más poderoso que el escenario de la "lista de suscripción" de la vida real. Si el cantante ya lanzó su canción y luego una persona se registra en la lista de suscripción, probablemente no recibirá esa canción. Las suscripciones en la vida real deben hacerse antes del evento.

Las promesas son más flexibles. Podemos agregar manejadores en cualquier momento: si el resultado ya está allí, nuestros manejadores lo obtienen de inmediato.
````

A continuación, veamos ejemplos más prácticos de cómo las promesas pueden ayudarnos a escribir código asincrónico.

## Ejemplo: loadScript [#loadscript]
=======
Note that this is different, and more powerful than the real life "subscription list" scenario. If the singer has already released their song and then a person signs up on the subscription list, they probably won't receive that song. Subscriptions in real life must be done prior to the event.

Promises are more flexible. We can add handlers any time: if the result is already there, our handlers get it immediately.
````

Next, let's see more practical examples of how promises can help us write asynchronous code.

## Example: loadScript [#loadscript]
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Tenemos la función `loadScript` para cargar un script del capítulo anterior.

Aquí está la variante basada callback, solo para recordarnos:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
<<<<<<< HEAD
  script.onerror = () => callback(new Error(`Error de carga de script para $ {src}`));
=======
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

  document.head.append(script);
}
```

Reescribámoslo usando Promesas.

La nueva función `loadScript` no requerirá una callback. En su lugar, creará y devolverá un objeto Promise que se resuelve cuando se completa la carga. El código externo puede agregar manejadores (funciones de suscripción) usando `.then`:

```js run
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
<<<<<<< HEAD
    script.onerror = () => reject(new Error(`Error de carga de script para $ {src}`));
=======
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    document.head.append(script);
  });
}
```

Uso:

```js run
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} está cargado!`),
  error => alert(`Error: ${error.message}`)
);

<<<<<<< HEAD
promise.then(script => alert('Otro manejador...'));
=======
promise.then(script => alert('Another handler...'));
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```

Podemos ver inmediatamente algunos beneficios sobre el patrón basado en callback:


| Promesas | Callbacks |
|----------|-----------|
| Las promesas nos permiten hacer las cosas en el orden natural. Primero, ejecutamos `loadScript (script)`, y `.then` escribimos qué hacer con el resultado. | Debemos tener una función `callback` a nuestra disposición al llamar a 'loadScript(script, callback)'. En otras palabras, debemos saber qué hacer con el resultado *antes* de llamar a `loadScript`. |
| Podemos llamar a ".then" en una promesa tantas veces como queramos. Cada vez, estamos agregando un nuevo "fan", una nueva función de suscripción, a la "lista de suscripción". Más sobre esto en el próximo capítulo: [](info:promise-chaining). | Solo puede haber un callback. |

<<<<<<< HEAD
Entonces, las promesas nos dan un mejor flujo de código y flexibilidad. Pero hay más. Lo veremos en los próximos capítulos.
=======
So promises give us better code flow and flexibility. But there's more. We'll see that in the next chapters.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
