# Async/await

Existe una sintaxis especial para trabajar con promesas de una forma más confortable, llamada "async/await". Es sorprendentemente fácil de entender y usar.

## Funciones async

Comencemos con la palabra clave `async`. Puede ser ubicada delante de una función como aquí:

```js
async function f() {
  return 1;
}
```

<<<<<<< HEAD
La palabra "async" ante una función significa solamente una cosa: que la función siempre devolverá una promesa. Otros valores serán envueltos y resueltos en una promesa automáticamente.

Por ejemplo, esta función devuelve una promesa resuelta con el resultado de `1`; Probémosla:
=======
The word "async" before a function means one simple thing: a function always returns a promise. Other values are wrapped in a resolved promise automatically.

For instance, this function returns a resolved promise with the result of `1`; let's test it:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
async function f() {
  return 1;
}

f().then(alert); // 1
```

<<<<<<< HEAD
...Podríamos explícitamente devolver una promesa, lo cual sería lo mismo:
=======
...We could explicitly return a promise, which would be the same:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
async function f() {
  return Promise.resolve(1);
}

f().then(alert); // 1
```

Entonces, `async` se asegura de que la función devuelva una promesa, o envuelve las no promesas y las transforma en una. Bastante simple, ¿correcto? Pero no solo eso. Hay otra palabra, `await`, que solo trabaja dentro de funciones `async` y es muy interesante.

## Await

La sintaxis:

```js
// funciona solamente dentro de funciones async
let value = await promise;
```

`await` hace que JavaScript espere hasta que la promesa responda y devuelve su resultado.

Aquí hay un ejemplo con una promesa que resuelve en 1 segundo:
```js run
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("¡Hecho!"), 1000)
  });

*!*
<<<<<<< HEAD
  let result = await promise; // espera hasta que la promesa se resuelva (*)
=======
  let result = await promise; // wait until the promise resolves (*)
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
*/!*

  alert(result); // "¡Hecho!"
}

f();
```

La ejecución de la función es pausada en la línea `(*)` y se reanuda cuando la promesa responde, con `result` volviéndose su resultado. Entonces el código arriba muestra "¡Hecho!" en un segundo.

<<<<<<< HEAD
Enfaticemos: `await` literalmente hace que JavaScript espere hasta que la promesa responda, entonces sigue con el resultado. No tiene costo en recursos de CPU, porque mientras tanto el motor puede hacer otros trabajos: ejecutar otros scripts, manejar eventos, etc.
=======
Let's emphasize: `await` literally makes JavaScript wait until the promise settles, and then go on with the result. That doesn't cost any CPU resources, because the engine can do other jobs in the meantime: execute other scripts, handle events, etc.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Es simplemente una sintaxis más elegante para tener el resultado de una promesa que `promise.then`, es más facil de leer y de escribir.

````warn header="No se puede usar `await` en funciones regulares"
Si tratamos de usar `await` en una función no async, habría un error de sintaxis:

```js run
function f() {
  let promise = Promise.resolve(1);
*!*
  let result = await promise; // Syntax error
*/!*
}
```

Obtendremos este error si no ponemos `async` delante de una función. Como se dijo, `await` solo funciona dentro de una `función async`.
````

Tomemos el ejemplo `showAvatar()` del capítulo <info:promise-chaining> y rescribámoslo usando `async/await`:

1. Necesitaremos reemplazar los llamados `.then` con `await`.
2. También debemos hacer que la función sea `async` para que aquellos funcionen.

```js run
async function showAvatar() {

  // leer nuestro JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // leer usuario github
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // muestra el avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // espera 3 segundos
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

showAvatar();
```

Bien limpio y fácil de leer, ¿no es cierto? Mucho mejor que antes.

````smart header="`await` no funcionará en el código de nivel superior"
La gente que empieza a usar `await` tiende a olvidar el hecho de que no podemos uar `await` en el código de nivel superior. Por ejemplo, esto no funcionará:

```js run
// error de sintaxis en el nivel superior de código
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

<<<<<<< HEAD
Pero podemos envolverlo dentro de una función async anónima, como esto:
=======
But we can wrap it into an anonymous async function, like this:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```


````
<<<<<<< HEAD
````smart header="`await` acepta \"thenables\""
Tal como `promise.then`, `await` nos permite el uso de objetos "thenable" (aquellos con el método `then`). La idea es que un objeto de terceras partes pueda no ser una promesa, sino compatible con una: si soporta `.then`, es suficiente para el uso con `await`.

Aquí hay una clase `Thenable` de demo; el `await` debajo acepta sus instancias:
=======
````smart header="`await` accepts \"thenables\""
Like `promise.then`, `await` allows us to use thenable objects (those with a callable `then` method). The idea is that a third-party object may not be a promise, but promise-compatible: if it supports `.then`, that's enough to use it with `await`.

Here's a demo `Thenable` class; the `await` below accepts its instances:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve);
    // resuelve con this.num*2 después de 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
};

async function f() {
  // espera durante 1 segundo, entonces el resultado se vuelve 2
  let result = await new Thenable(1);
  alert(result);
}

f();
```

<<<<<<< HEAD
Si `await` obtiene un objeto no-promesa con `.then`, llama tal método proveyéndole con las funciones incorporadas `resolve` y `reject` como argumentos (exactamente como lo hace con ejecutores `Promise` regulares). Entonce `await` espera hasta que une de ellos es llamado (en el ejemplo previo esto pasa en la línea `(*)`) y entonces procede con el resultado.
````

````smart header="Métodos de clase Async"
Para declarar un método de clase async, simplemente se le antepone `async`:
=======
If `await` gets a non-promise object with `.then`, it calls that method providing the built-in functions `resolve` and `reject` as arguments (just as it does for a regular `Promise` executor). Then `await` waits until one of them is called (in the example above it happens in the line `(*)`) and then proceeds with the result.
````

````smart header="Async class methods"
To declare an async class method, just prepend it with `async`:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
class Waiter {
*!*
  async wait() {
*/!*
    return await Promise.resolve(1);
  }
}

new Waiter()
  .wait()
  .then(alert); // 1
```
El significado es el mismo: Asegura que el valor devuelto es una promesa y habilita `await`.

````
## Manejo de Error

<<<<<<< HEAD
Si una promesa se resuelve normalmente, entonces `await promise` devuelve el resultado. Pero en caso de rechazo, dispara un error, tal como si hubiera una intrucción `throw` en aquella línea.
=======
If a promise resolves normally, then `await promise` returns the result. But in the case of a rejection, it throws the error, just as if there were a `throw` statement at that line.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Este código:

```js
async function f() {
*!*
  await Promise.reject(new Error("Whoops!"));
*/!*
}
```

<<<<<<< HEAD
...es lo mismo que esto:
=======
...is the same as this:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js
async function f() {
*!*
  throw new Error("Whoops!");
*/!*
}
```

<<<<<<< HEAD
En situaciones reales, la promesa tomará algún tiempo antes del rechazo.  En tal caso habrá un retardo antes de que `await` dispare un error.
=======
In real situations, the promise may take some time before it rejects. In that case there will be a delay before `await` throws an error.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Podemos atrapar tal error usando `try..catch`, de la misma manera que con un `throw` normal:

```js run
async function f() {

  try {
    let response = await fetch('http://no-such-url');
  } catch(err) {
*!*
    alert(err); // TypeError: failed to fetch
*/!*
  }
}

f();
```

<<<<<<< HEAD
En el casso de un error, el control salta al bloque `catch`. Podemos también envolver múltiples líneas:
=======
In the case of an error, the control jumps to the `catch` block. We can also wrap multiple lines:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
async function f() {

  try {
    let response = await fetch('/no-user-here');
    let user = await response.json();
  } catch(err) {
    // atrapa errores tanto en fetch como en response.json
    alert(err);
  }
}

f();
```

Si no tenemos `try..catch`, entonces la promesa generada por el llamado de la función async `f()` se vuelve rechazada. Podemos añadir `.catch` para manejarlo:

```js run
async function f() {
  let response = await fetch('http://no-such-url');
}

// f() se vuelve una promesa rechazada 
*!*
f().catch(alert); // TypeError: failed to fetch // (*)
*/!*
```

<<<<<<< HEAD
Si olvidamos añadir `.catch` allí, obtendrenos un error de promesa no manejado (visible en consola). Podemos atrapar tales errores usando un manejador de evento global `unhandledrejection` como está descrito en el capítulo <info:promise-error-handling>.


```smart header="`async/await` y `promise.then/catch`"
Cuando usamos `async/await`, raramente necesitamos `.then`, porque `await` maneja la espera por nosotros. Y podemos usar un `try..catch` normal en lugar de `.catch`. Esto usualmente (no siempre) es más conveniente.

Pero en el nivel superior del código, cuando estamos fuera de cualquier función `async`, no estamos sintácticamente habilitados para usar `await`, entonces es práctica común agregar `.then/catch` para manejar el resultado final o errores que caigan a través, como en la línea `(*)` del ejemplo arriba.
=======
If we forget to add `.catch` there, then we get an unhandled promise error (viewable in the console). We can catch such errors using a global `unhandledrejection` event handler as described in the chapter <info:promise-error-handling>.


```smart header="`async/await` and `promise.then/catch`"
When we use `async/await`, we rarely need `.then`, because `await` handles the waiting for us. And we can use a regular `try..catch` instead of `.catch`. That's usually (but not always) more convenient.

But at the top level of the code, when we're outside any `async` function, we're syntactically unable to use `await`, so it's a normal practice to add `.then/catch` to handle the final result or falling-through error, like in the line `(*)` of the example above.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
```

````smart header="`async/await` funciona bien con `Promise.all`"
Cuando necesitamos esperar por múltiples promesas, podemos envolverlas en un `Promise.all` y luego `await`:

```js
// espera por el array de resultados
let results = await Promise.all([
  fetch(url1),
  fetch(url2),
  ...
]);
```

<<<<<<< HEAD
En caso de error, se propaga como es usual, desde la promesa que falla a `Promise.all`, y entonces se vuelve una excepción que podemos atrapar usando `try..catch` alrededor del llamado.

````

## Resumen
=======
In the case of an error, it propagates as usual, from the failed promise to `Promise.all`, and then becomes an exception that we can catch using `try..catch` around the call.

````

## Summary
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

El comando `async` antes de una función tiene dos efectos:

<<<<<<< HEAD
1. Hace que siempre devuelva una promesa.
2. Permite que sea usado `await` dentro de ella.
=======
1. Makes it always return a promise.
2. Allows `await` to be used in it.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

El comando `await` antes de una promesa hace que JavaScript espere hasta que la promesa responda, entonces:

<<<<<<< HEAD
1. Si es un error, la excepción es generada — lo mismo que si `throw error` fuera llamado en ese mismo lugar.
2. De otro modo, devuelve el resultado.

Juntos proveen un excelente marco para escribir código asincrónico que es fácil de leer y escribir.

Con `async/await` raramente necesitamos escribir `promise.then/catch`, pero aún no deberíamos olvidar que están basados en promesas porque a veces (ej. como en el nivel superior de código) tenemos que usar esos métodos. También `Promise.all` es adecuado cuando esperamos por varias tareas simultáneas.
=======
1. If it's an error, the exception is generated — same as if `throw error` were called at that very place.
2. Otherwise, it returns the result.

Together they provide a great framework to write asynchronous code that is easy to both read and write.

With `async/await` we rarely need to write `promise.then/catch`, but we still shouldn't forget that they are based on promises, because sometimes (e.g. in the outermost scope) we have to use these methods. Also `Promise.all` is nice when we are waiting for many tasks simultaneously.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
