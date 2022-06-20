# Promesa

Imagina que eres un gran cantante y los fanáticos te preguntan día y noche por tu próxima canción.

Para obtener algo de alivio, prometes enviárselos cuando se publique. Le das a tus fans una lista. Ellos pueden registrar allí sus direcciones de correo electrónico, de modo que cuando la canción esté disponible, todas las partes suscritas la reciban instantáneamente. E incluso si algo sale muy mal, digamos, un incendio en el estudio tal que no puedas publicar la canción, aún se les notificará.

Todos están felices: tú, porque la gente ya no te abruma, y los fanáticos, porque no se perderán la canción.

Esta es una analogía de la vida real para las cosas que a menudo tenemos en la programación:

1. Un "código productor" que hace algo y toma tiempo. Por ejemplo, algún código que carga los datos a través de una red. Eso es un "cantante".
2. Un "código consumidor" que quiere el resultado del "código productor" una vez que está listo. Muchas funciones pueden necesitar ese resultado. Estos son los "fans".
3. Una *promesa* es un objeto JavaScript especial que une el "código productor" y el "código consumidor". En términos de nuestra analogía: esta es la "lista de suscripción". El "código productor" toma el tiempo que sea necesario para producir el resultado prometido, y la "promesa" hace que ese resultado esté disponible para todo el código suscrito cuando esté listo.

La analogía no es terriblemente precisa, porque las promesas de JavaScript son más complejas que una simple lista de suscripción: tienen características y limitaciones adicionales. Pero está bien para empezar.

La sintaxis del constructor para un objeto promesa es:

```js
let promise = new Promise(function(resolve, reject) {
  // Ejecutor (el código productor, "cantante")
});
```

La función pasada a `new Promise` se llama *ejecutor*. Cuando se crea `new Promise`, el ejecutor corre automáticamente. Este contiene el código productor que a la larga debería producir el resultado. En términos de la analogía anterior: el ejecutor es el "cantante".

Sus argumentos `resolve` y `reject` son callbacks proporcionadas por el propio JavaScript. Nuestro código solo está dentro del ejecutor.

Cuando el ejecutor, más tarde o más temprano, eso no importa, obtiene el resultado, debe llamar a una de estos callbacks:

- `resolve(value)` - si el trabajo finalizó con éxito, con el resultado `value`.
- `reject(error)` - si ocurrió un error, `error` es el objeto error.

Para resumir: el ejecutor corre automáticamente e intenta realizar una tarea. Cuando termina con el intento, llama a `resolve` si fue exitoso o `reject` si hubo un error.

El objeto `promise` devuelto por el constructor `new Promise` tiene estas propiedades internas:

- `state` - inicialmente `"pendiente"`, luego cambia a `"cumplido"` cuando se llama a `resolve` o `"rechazado"` cuando se llama a `reject`.
- `result` - inicialmente `undefined`, luego cambia a `valor` cuando se llama a `resolve(valor)` o `error` cuando se llama a `reject(error)`.

Entonces el ejecutor eventualmente mueve la `promise` a uno de estos estados:

![](promise-resolve-reject.svg)

Después veremos cómo los "fanáticos" pueden suscribirse a estos cambios.

Aquí hay un ejemplo de un constructor de promesas y una función ejecutora simple con "código productor" que toma tiempo (a través de `setTimeout`):

```js run
let promise = new Promise(function(resolve, reject) {
  // la función se ejecuta automáticamente cuando se construye la promesa

  // después de 1 segundo, indica que la tarea está hecha con el resultado "hecho"
  setTimeout(() => *!*resolve("hecho")*/!*, 1000);
});
```

Podemos ver dos cosas al ejecutar el código anterior:

1. Se llama al ejecutor de forma automática e inmediata (por `new Promise`).
2. El ejecutor recibe dos argumentos: `resolve` y `reject`. Estas funciones están predefinidas por el motor de JavaScript, por lo que no necesitamos crearlas. Solo debemos llamar a uno de ellos cuando esté listo.

    Después de un segundo de "procesamiento", el ejecutor llama a `resolve("hecho")` para producir el resultado. Esto cambia el estado del objeto `promise`:

    ![](promise-resolve-1.svg)

Ese fue un ejemplo de finalización exitosa de la tarea, una "promesa cumplida".

Y ahora un ejemplo del ejecutor rechazando la promesa con un error:

```js
let promise = new Promise(function(resolve, reject) {
  // después de 1 segundo, indica que la tarea ha finalizado con un error
  setTimeout(() => *!*reject(new Error("¡Vaya!"))*/!*, 1000);
});
```

La llamada a `reject(...)` mueve el objeto promise al estado  `"rechazado"`:

![](promise-reject-1.svg)

Para resumir, el ejecutor debe realizar una tarea (generalmente algo que toma tiempo) y luego llamar a "resolve" o "reject" para cambiar el estado del objeto promise correspondiente.

Una promesa que se resuelve o se rechaza se denomina "resuelta", en oposición a una promesa inicialmente "pendiente".

````smart header="Solo puede haber un único resultado o un error"
El ejecutor debe llamar solo a un 'resolve' o un 'reject'. Cualquier cambio de estado es definitivo.

Se ignoran todas las llamadas adicionales de 'resolve' y 'reject':

```js
let promise = new Promise(function(resolve, reject) {
*!*
  resolve("hecho");
*/!*

  reject(new Error("…")); // ignorado
  setTimeout(() => resolve("…")); // ignorado
});
```

La idea es que una tarea realizada por el ejecutor puede tener solo un resultado o un error.

Además, `resolve`/`reject` espera solo un argumento (o ninguno) e ignorará argumentos adicionales.
````

```smart header="Rechazar con objetos `Error`"
En caso de que algo salga mal, el ejecutor debe llamar a 'reject'. Eso se puede hacer con cualquier tipo de argumento (al igual que `resolve`). Pero se recomienda usar objetos `Error` (u objetos que hereden de `Error`). El razonamiento para eso pronto se hará evidente.
```

````smart header="Inmediatamente llamando a `resolve`/`reject`"
En la práctica, un ejecutor generalmente hace algo de forma asíncrona y llama a `resolve`/`reject` después de un tiempo, pero no tiene que hacerlo. También podemos llamar a `resolve` o `reject` inmediatamente, así:

```js
let promise = new Promise(function(resolve, reject) {
  // sin que nos quite tiempo para hacer la tarea
  resolve(123); // dar inmediatamente el resultado: 123
});
```

Por ejemplo, esto puede suceder cuando comenzamos una tarea pero luego vemos que todo ya se ha completado y almacenado en caché.

Está bien. Inmediatamente tenemos una promesa resuelta.
````

```smart header="El `state` y el `result` son internos"
Las propiedades `state` y `result` del objeto Promise son internas. No podemos acceder directamente a ellas. Podemos usar los métodos `.then`/`.catch`/`.finally` para eso. Se describen a continuación.
```

<<<<<<< HEAD
## Consumidores: then, catch, finally

Un objeto Promise sirve como enlace entre el ejecutor (el "código productor" o el "cantante") y las funciones consumidoras (los "fanáticos"), que recibirán el resultado o error. Las funciones de consumo pueden registrarse (suscribirse) utilizando los métodos `.then`, `.catch` y `.finally`.
=======
## Consumers: then, catch

A Promise object serves as a link between the executor (the "producing code" or "singer") and the consuming functions (the "fans"), which will receive the result or error. Consuming functions can be registered (subscribed) using methods `.then` and `.catch`.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

### then

El más importante y fundamental es `.then`.

La sintaxis es:

```js
promise.then(
  function(result) { *!*/* manejar un resultado exitoso */*/!* },
  function(error) { *!*/* manejar un error */*/!* }
);
```

El primer argumento de `.then` es una función que se ejecuta cuando se resuelve la promesa y recibe el resultado.

El segundo argumento de `.then` es una función que se ejecuta cuando se rechaza la promesa y recibe el error.

Por ejemplo, aquí hay una reacción a una promesa resuelta con éxito:

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

Y en el caso de un rechazo, el segundo:

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
promise.then(alert); // muestra "hecho!" después de 1 segundo
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

## Cleanup: finally

Al igual que hay una cláusula `finally` en un `try {...} catch {...}` normal, hay un `finally` en las promesas.

<<<<<<< HEAD
La llamada `.finally(f)` es similar a `.then(f, f)` en el sentido de que `f` siempre se ejecuta cuando se resuelve la promesa: ya sea que se resuelva o rechace.

`finally` es un buen manejador para realizar la limpieza, por ejemplo detener nuestros indicadores de carga que ya no son necesarios sin importar cuál sea el resultado.

Como esto:

```js
new Promise((resolve, reject) => {
  /* hacer algo para tomar tiempo y luego llamar a resolve/reject */
=======
The call `.finally(f)` is similar to `.then(f, f)` in the sense that `f` runs always, when the promise is settled: be it resolve or reject.

The idea of `finally` is to set up a handler for performing cleanup/finalizing after the previous operations are complete.

E.g. stopping loading indicators, closing no longer needed connections etc.

Think of it as a party finisher. No matter was a party good or bad, how many friends were in it, we still need (or at least should) do a cleanup after it.

The code may look like this:

```js
new Promise((resolve, reject) => {
  /* do something that takes time, and then call resolve or maybe reject */
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
})
*!*
  // se ejecuta cuando se cumple la promesa, no importa con éxito o no
  .finally(() => stop loading indicator)
<<<<<<< HEAD
  // entonces el indicador de carga siempre es detenido antes de que procesemos result/error
=======
  // so the loading indicator is always stopped before we go on
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
*/!*
  .then(result => show result, err => show error)
```

<<<<<<< HEAD
Sin embargo, no es exactamente un alias de `then(f, f)`. Hay varias diferencias importantes:

1. Un manejador `finally` no tiene argumentos. En `finally` no sabemos si la promesa es exitosa o no. Eso está bien, ya que nuestra tarea generalmente es realizar procedimientos de finalización "generales".
2. Un manejador `finally` traspasa resultados y errores al siguiente manejador.

    Por ejemplo, aquí el resultado se pasa a través de `finally` a `then`:
    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("resultado"), 2000)
    })
      .finally(() => alert("Promesa lista"))
      .then(result => alert(result)); // <-- .luego maneja el resultado
    ```

    Y aquí hay un error en la promesa, pasado por `finally` a `catch`:
=======
Please note that `finally(f)` isn't exactly an alias of `then(f,f)` though.

There are important differences:

1. A `finally` handler has no arguments. In `finally` we don't know whether the promise is successful or not. That's all right, as our task is usually to perform "general" finalizing procedures.

    Please take a look at the example above: as you can see, the `finally` handler has no arguments, and the promise outcome is handled in the next handler.
2. A `finally` handler "passes through" the result or error to the next suitable handler.

    For instance, here the result is passed through `finally` to `then`:

    ```js run
    new Promise((resolve, reject) => {
      setTimeout(() => resolve("value"), 2000);
    })
      .finally(() => alert("Promise ready")) // triggers first
      .then(result => alert(result)); // <-- .then shows "value"
    ```

    As you can see, the `value` returned by the first promise is passed through `finally` to the next `then`.

    That's very convenient, because `finally` is not meant to process a promise result. As said, it's a place to do generic cleanup, no matter what the outcome was.

    And here's an example of an error, for us to see how it's passed through `finally` to `catch`:
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

    ```js run
    new Promise((resolve, reject) => {
      throw new Error("error");
    })
<<<<<<< HEAD
      .finally(() => alert("Promesa lista"))
      .catch(err => alert(err));  // <-- .catch maneja el objeto error
    ```

    Eso es muy conveniente, porque 'finally' no está destinado a procesar un resultado "promesa". Entonces lo pasa.

    Hablaremos más sobre el encadenamiento de promesas y la transmisión de resultados entre los manejadores en el próximo capítulo.

````smart header="En promesas establecidas, los manejadores se ejecutan inmediatamente"
Si hay una promesa pendiente, los manejadores `.then/catch/finally` la esperan. De lo contrario, si una promesa ya se resolvió, se ejecutan inmediatamente:
=======
      .finally(() => alert("Promise ready")) // triggers first
      .catch(err => alert(err));  // <-- .catch shows the error
    ```

3. A `finally` handler also shouldn't return anything. If it does, the returned value is silently ignored.

    The only exception from this rule is when a `finally` handler throws an error. Then this error goes to the next handler, instead of any previous outcome.

To summarize:

- A `finally` handler doesn't get the outcome of the previous handler (it has no arguments). This outcome is passed through instead, to the next suitable handler.
- If a `finally` handler returns something, it's ignored.
- When `finally` throws an error, then the execution goes to a nearest error handler.

These features are helpful and make things work just the right way if we `finally` how it's supposed to be used: for generic cleanup procedures.

````smart header="We can attach handlers to settled promises"
If a promise is pending, `.then/catch/finally` handlers wait for its outcome.

Sometimes, it might be that a promise is already settled when we add a handler to it.

In such case, these handlers just run immediately:
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

```js run
// la promesa se resuelve inmediatamente después de la creación
let promise = new Promise(resolve => resolve("hecho!"));

promise.then(alert); // ¡hecho! (aparece ahora)
```

Ten en cuenta que esto es diferente y más poderoso que el escenario de la "lista de suscripción" de la vida real. Si el cantante ya lanzó su canción y luego una persona se registra en la lista de suscripción, probablemente no recibirá esa canción. Las suscripciones en la vida real deben hacerse antes del evento.

Las promesas son más flexibles. Podemos agregar manejadores en cualquier momento: si el resultado ya está allí, nuestros manejadores lo obtienen de inmediato.
````

<<<<<<< HEAD
A continuación, veamos ejemplos más prácticos de cómo las promesas pueden ayudarnos a escribir código asincrónico.

## Ejemplo: loadScript [#loadscript]

Tenemos la función `loadScript` para cargar un script del capítulo anterior.
=======
## Example: loadScript [#loadscript]

Next, let's see more practical examples of how promises can help us write asynchronous code.

We've got the `loadScript` function for loading a script from the previous chapter.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

Aquí está la variante basada callback, solo para recordarnos:

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Error de carga de script para $ {src}`));

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
    script.onerror = () => reject(new Error(`Error de carga de script para $ {src}`));

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

promise.then(script => alert('Otro manejador...'));
```

Podemos ver inmediatamente algunos beneficios sobre el patrón basado en callback:


| Promesas | Callbacks |
|----------|-----------|
| Las promesas nos permiten hacer las cosas en el orden natural. Primero, ejecutamos `loadScript (script)`, y `.then` escribimos qué hacer con el resultado. | Debemos tener una función `callback` a nuestra disposición al llamar a 'loadScript(script, callback)'. En otras palabras, debemos saber qué hacer con el resultado *antes* de llamar a `loadScript`. |
| Podemos llamar a ".then" en una promesa tantas veces como queramos. Cada vez, estamos agregando un nuevo "fan", una nueva función de suscripción, a la "lista de suscripción". Más sobre esto en el próximo capítulo: [](info:promise-chaining). | Solo puede haber un callback. |

Entonces, las promesas nos dan un mejor flujo de código y flexibilidad. Pero hay más. Lo veremos en los próximos capítulos.
