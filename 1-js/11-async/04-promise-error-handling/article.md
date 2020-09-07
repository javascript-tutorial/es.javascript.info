
# Manejo de errores con promesas

<<<<<<< HEAD
Las promesas encadenadas son excelentes manejando los errores. Cuando una promesa es rechazada, el control salta al manejador de rechazos más cercano. Esto es muy conveniente en la práctica.

Por ejemplo, en el código de abajo, la URL a la cual se le hace `fetch` es incorrecta (no existe el sitio) y al ser rechazada`.catch` maneja el error:
=======
Promise chains are great at error handling. When a promise rejects, the control jumps to the closest rejection handler. That's very convenient in practice.

For instance, in the code below the URL to `fetch` is wrong (no such site) and `.catch` handles the error:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
*!*
fetch('https://no-such-server.blabla') // Promesa rechazada
*/!*
  .then(response => response.json())
  .catch(err => alert(err)) // TypeError: failed to fetch (El texto puede variar, dependiendo del error)
```

<<<<<<< HEAD
Como puedes ver, el `.catch` no tiene que escribirse inmediatamente después de la promesa. Este puede aparecer después de uno o quizás varios `.then`.

O, puede ocurrir, que todo en el sitio se encuentre bien, pero la respuesta no es un JSON válido. La forma más fácil de detectar todos los errores es agregando `.catch` al final de la cadena de promesas:
=======
As you can see, the `.catch` doesn't have to be immediate. It may appear after one or maybe several `.then`.

Or, maybe, everything is all right with the site, but the response is not valid JSON. The easiest way to catch all errors is to append `.catch` to the end of chain:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
fetch('/article/promise-chaining/user.json')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/${user.name}`))
  .then(response => response.json())
  .then(githubUser => new Promise((resolve, reject) => {
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  }))
*!*
  .catch(error => alert(error.message));
*/!*
```

<<<<<<< HEAD
Lo normal es que tal `.catch` no se dispare en absoluto. Pero si alguna de las promesas anteriores es rechazada (por un error de red, un JSON inválido or cualquier otra razón), entonces el error es capturado.
=======
Normally, such `.catch` doesn't trigger at all. But if any of the promises above rejects (a network problem or invalid json or whatever), then it would catch it.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

## try..catch implícito

<<<<<<< HEAD
El código de un ejecutor de promesas y de manejadores de promesas tiene embebido un " `try..catch` invisible". Si ocurre una excepción, esta es atrapada y es tratada como un rechazo.
=======
The code of a promise executor and promise handlers has an "invisible `try..catch`" around it. If an exception happens, it gets caught and treated as a rejection.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Por ejemplo, este código:

```js run
new Promise((resolve, reject) => {
*!*
  throw new Error("Whoops!");
*/!*
}).catch(alert); // Error: Whoops!
```

...Hace exactamente lo mismo que este:

```js run
new Promise((resolve, reject) => {
*!*
  reject(new Error("Whoops!"));
*/!*
}).catch(alert); // Error: Whoops!
```

<<<<<<< HEAD
El "`try..catch` invisible" embebido en el ejecutor detecta automáticamente el error y lo convierte en una promesa rechazada.

Esto sucede no solo en la función ejecutora, sino también en sus manejadores. Si hacemos `throw` dentro de una llamada a `.then`, esto devolverá una promesa rechazada, por lo que el control salta al manejador de errores más cercano.
=======
The "invisible `try..catch`" around the executor automatically catches the error and turns it into rejected promise.

This happens not only in the executor function, but in its handlers as well. If we `throw` inside a `.then` handler, that means a rejected promise, so the control jumps to the nearest error handler.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Por ejemplo:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  throw new Error("Whoops!"); // rechaza la promesa
*/!*
}).catch(alert); // Error: Whoops!
```

Esto sucede con todos los errores, no solo los causados por la sentencia de excepción `throw`. Por ejemplo, un error de programación:

```js run
new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
*!*
  blabla(); // Función inexistente
*/!*
}).catch(alert); // ReferenceError: blabla is not defined
```

<<<<<<< HEAD
El `.catch` del final no solo detecta rechazos explícitos, sino también los errores accidentales en los manejadores anteriores.
=======
The final `.catch` not only catches explicit rejections, but also accidental errors in the handlers above.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

## Rethrowing (relanzamiento de errores)

<<<<<<< HEAD
Como ya vimos, el `.catch` del final es similar a `try..catch`. Podemos tener tantos manejadores `.then` como queramos, y luego usar un solo `.catch` al final para manejar los errores en todos ellos.

En un `try..catch` normal, podemos analizar el error y quizá volver a lanzarlo si no se puede manejar. Lo mismo podemos hacer con las promesas.

Si hacemos `throw` dentro de `.catch`, el control pasa a otro manejador de errores más cercano. Y, si manejamos el error y terminamos de forma correcta, entonces se continúa con el siguiente manejador `.then` existoso.
=======
As we already noticed, `.catch` at the end of the chain is similar to `try..catch`. We may have as many `.then` handlers as we want, and then use a single `.catch` at the end to handle errors in all of them.

In a regular `try..catch` we can analyze the error and maybe rethrow it if it can't be handled. The same thing is possible for promises.

If we `throw` inside `.catch`, then the control goes to the next closest error handler. And if we handle the error and finish normally, then it continues to the next closest successful `.then` handler.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

En el ejemplo de abajo, el `.catch` maneja el error de forma exitosa:

```js run
// Ejecución: catch -> then
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) {

  alert("Error manejado, se continuará con la ejecución del código");

}).then(() => alert("El siguiente manejador exitoso se ejecuta"));
```

Aqui el `.catch` termina de forma correcta. Entonces se ejecuta el siguiente manejador exitoso `.then`.

En el siguiente ejemplo podemos ver otra situación con `.catch`. El manejador `(*)` detecta el error y simplemente no puede manejarlo (en el ejemplo solo sabe que hacer con un `URIError`), por lo que lo lanza nuevamente:

```js run
<<<<<<< HEAD
// Ejecución: catch -> catch
=======
// the execution: catch -> catch
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
new Promise((resolve, reject) => {

  throw new Error("Whoops!");

}).catch(function(error) { // (*)

  if (error instanceof URIError) {
    // Aqui se manejaría el error
  } else {
    alert("No puedo manejar este error");

*!*
    throw error; // Lanza este error u otro error que salte en el siguiente catch.
*/!*
  }

}).then(function() {
<<<<<<< HEAD
  /* Esto no se ejecuta */
=======
  /* doesn't run here */
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
}).catch(error => { // (**)

  alert(`Ocurrió un error desconocido: ${error}`);
  // No se devuelve nada => La ejecución continúa de forma normal

});
```

<<<<<<< HEAD
La ejecución salta del primer `.catch` `(*)` al siguiente `(**)` en la cadena.

## Rechazos no manejados

¿Que sucede cuanto un error no es manejado? Por ejemplo, si olvidamos agregar `.catch` al final de una cadena de promesas, como aquí:
=======
The execution jumps from the first `.catch` `(*)` to the next one `(**)` down the chain.

## Unhandled rejections

What happens when an error is not handled? For instance, we forgot to append `.catch` to the end of the chain, like here:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Aquí hay un error (no existe la función)
})
  .then(() => {
<<<<<<< HEAD
    // manejador de una o más promesas existosas
  }); // sin .catch al final!
```

En caso de que se genere un error, la promesa se rechaza y la ejecución salta al manejador de rechazos más cercano. Pero aquí no hay ninguno. Entonces el error se "atasca", ya que no hay código para manejarlo.

En la práctica, al igual que con los errores comunes no manejados en el código, esto significa que algo ha salido terriblemente mal.

¿Que sucede cuando ocurre un error regular y no es detectado por `try..catch`? El script muere con un mensaje en la consola. Algo similar sucede con los rechazos de promesas no manejadas.

En este caso, el motor de JavaScript rastrea el rechazo y lo envía al ámbito global. Puedes ver en consola el error generado si ejecutas el ejemplo anterior.
=======
    // successful promise handlers, one or more
  }); // without .catch at the end!
```

In case of an error, the promise becomes rejected, and the execution should jump to the closest rejection handler. But there is none. So the error gets "stuck". There's no code to handle it.

In practice, just like with regular unhandled errors in code, it means that something has gone terribly wrong.

What happens when a regular error occurs and is not caught by `try..catch`? The script dies with a message in the console. A similar thing happens with unhandled promise rejections.

The JavaScript engine tracks such rejections and generates a global error in that case. You can see it in the console if you run the example above.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

En el navegador podemos detectar tales errores usando el evento `unhandledrejection`:

```js run
*!*
window.addEventListener('unhandledrejection', function(event) {
  // el objeto event tiene dos propiedades especiales:
  alert(event.promise); // [objeto Promesa] - La promesa que fue rechazada
  alert(event.reason); // Error: Whoops! - Motivo por el cual se rechaza la promesa
});
*/!*

new Promise(function() {
  throw new Error("Whoops!");
}); // No hay un .catch final para manejar el error
```

Este evento es parte del [standard HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

Si se produce un error, y no hay un `.catch`, se dispara `unhandledrejection`, y se obtiene el objeto `event` el cual contiene información sobre el error, por lo que podemos hacer algo con el error (manejar el error).

<<<<<<< HEAD
Usualmente estos errores no son recuperables, por lo que la mejor salida es informar al usuario sobre el problema y probablemente reportar el incidente al servidor.

En entornos fuera del navegador como Node.js existen otras formas de rastrear errores no manejados.

## Resumen

- `.catch` maneja errores de todo tipo: ya sea una llamada a `reject()`, o un error que arroja un manejador.
- Debemos colocar `.catch` exáctamente en los lugares donde queremos manejar los errores y saber como manejarlos. El manejador analiza los errores (los errores personalizados) y, (en caso de no conocerse la razón del error) se lanzan los errores desconocidos (tal vez sean errores de programación).
- Está bien no usar siempre `.catch`, si no hay forma de recuperarse de un error.
- En cualquier caso, deberíamos tener el evento `unhandledrejection` (para navegadores, o el equivalente en otros entornos) para rastrear errores no manejados e informar al usuario (y probablemente al servidor) para que nuestra aplicación nunca "simplemente muera".
=======
In non-browser environments like Node.js there are other ways to track unhandled errors.

## Summary

- `.catch` handles errors in promises of all kinds: be it a `reject()` call, or an error thrown in a handler.
- We should place `.catch` exactly in places where we want to handle errors and know how to handle them. The handler should analyze errors (custom error classes help) and rethrow unknown ones (maybe they are programming mistakes).
- It's ok not to use `.catch` at all, if there's no way to recover from an error.
- In any case we should have the `unhandledrejection` event handler (for browsers, and analogs for other environments) to track unhandled errors and inform the user (and probably our server) about them, so that our app never "just dies".
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
