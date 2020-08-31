libs:
  - lodash

---

# Función binding (vinculadora)

<<<<<<< HEAD

Al pasar métodos de objeto como devoluciones de llamada, por ejemplo a `setTimeout`, se genera un problema conocido: "pérdida de `this`".
=======
When passing object methods as callbacks, for instance to `setTimeout`, there's a known problem: "losing `this`".

In this chapter we'll see the ways to fix it.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

En este capítulo veremos las formas de solucionarlo.

<<<<<<< HEAD
=======
We've already seen examples of losing `this`. Once a method is passed somewhere separately from the object -- `this` is lost.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

## Pérdida de "this"


Ya hemos visto ejemplos de pérdida de `this`. Una vez que se pasa un método en algún lugar separado del objeto -- `this` se pierde.


Así es como puede suceder con `setTimeout`:

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(user.sayHi, 1000); // Hello, undefined!
*/!*
```

Como podemos ver, el resultado no muestra "John" como `this.firstName`, ¡sino como `undefined`!

Esto se debe a que `setTimeout` tiene la función `user.sayHi`, separada del objeto. La última línea se puede reescribir como:

```js
let f = user.sayHi;
setTimeout(f, 1000); // user pierde el contexto
```

<<<<<<< HEAD
=======
The method `setTimeout` in-browser is a little special: it sets `this=window` for the function call (for Node.js, `this` becomes the timer object, but doesn't really matter here). So for `this.firstName` it tries to get `window.firstName`, which does not exist. In other similar cases, usually `this` just becomes `undefined`.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

El método `setTimeout` en el navegador es un poco especial: establece `this = window` para la llamada a la función (para Node.js, `this` se convierte en el objeto temporizador (timer), pero realmente no importa aquí). Entonces, en `this.firstName` intenta obtener `window.firstName`, que no existe. En otros casos similares, `this` simplemente se vuelve `undefined`.


La tarea es bastante típica --queremos pasar un método de objeto a otro lugar (aquí --al planificador) donde se llamará. ¿Cómo asegurarse de que se llamará en el contexto correcto?

## Solución 1: un wrapper  (envoltura)

La solución más simple es usar una función wrapper (envoltura):

```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
setTimeout(function() {
  user.sayHi(); // Hello, John!
}, 1000);
*/!*
```

Ahora funciona, porque recibe a `user` del entorno léxico externo, y luego llama al método normalmente.

Aquí hacemos lo mismo, pero de otra manera:

```js
setTimeout(() => user.sayHi(), 1000); // Hello, John!
```

Se ve bien, pero aparece una ligera vulnerabilidad en nuestra estructura de código..

¿Qué pasa si antes de que `setTimeout` se active (¡hay un segundo retraso!) `user` cambia el valor? Entonces, de repente, ¡llamará al objeto equivocado!


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

setTimeout(() => user.sayHi(), 1000);

<<<<<<< HEAD

// ...el valor de user cambia en 1 segundo

user = {
  sayHi() { alert("Another user in setTimeout!"); }
};


// Otro user en setTimeout!

=======
// ...the value of user changes within 1 second
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};

// Another user in setTimeout!
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
```

La siguiente solución garantiza que tal cosa no sucederá.

## Solución 2: bind

Las funciones proporcionan un método incorporado [bind](mdn:js/Function/bind) que permite encontrar a `this`.

La sintaxis básica es:

```js
<<<<<<< HEAD

// la sintaxis más compleja vendrá un poco más tarde

=======
// more complex syntax will come a little later
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
let boundFunc = func.bind(context);
```

El resultado de `func.bind(context)` es un "objeto exótico", una función similar a una función regular, que se puede llamar como función y pasa la llamada de forma transparente a `func` estableciendo `this = context`.

En otras palabras, llamar a `boundFunc` es como `func` con un `this` fijo.

Por ejemplo, aquí `funcUser` pasa una llamada a `func` con `this = user`:

```js run  
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

*!*
let funcUser = func.bind(user);
funcUser(); // John  
*/!*
```

Aquí `func.bind(user)` es como una "variante ligada" de `func`, con `this = user` fijo en ella.

Todos los argumentos se pasan al `func` original "tal cual", por ejemplo:

```js run  
let user = {
  firstName: "John"
};

function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}

// vincula this a user
let funcUser = func.bind(user);

*!*
funcUser("Hello"); // Hello, John (argumento "Hello" se pasa, y this=user)
*/!*
```

Ahora intentemos con un método de objeto:


```js run
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

*!*
let sayHi = user.sayHi.bind(user); // (*)
*/!*

<<<<<<< HEAD
// puede ejecutarlo sin un objeto

=======
// can run it without an object
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

<<<<<<< HEAD
// incluso si el valor del usuario cambia en 1 segundo
// sayHi usa el valor pre-enlazado

=======
// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

En la línea `(*)` tomamos el método `user.sayHi` y lo vinculamos a `user`. `sayHi` es una función "bound" (enlazada). Si se llama sola o se pasa en `setTimeout` no importa, el contexto será el correcto.

Aquí podemos ver que los argumentos se pasan "tal cual", solo que `this` se fija mediante` bind`:

```js run
let user = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user.say.bind(user);

say("Hello"); // Hello, John ("Hello" se pasa a say)
say("Bye"); // Bye, John ("Bye" is passed to say)
```

````smart header="Convenience method:bindAll"
Si un objeto tiene muchos métodos y planeamos pasarlo activamente, podríamos vincularlos a todos en un bucle:

```js
for (let key in user) {
  if (typeof user[key] == 'function') {
    user[key] = user[key].bind(user);
  }
}
```

<<<<<<< HEAD
Las bibliotecas de JavaScript también proporcionan funciones para un enlace masivo, e.j. [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) en lodash.
````

## Funciones parciales

Hasta ahora solo hemos estado hablando de vincular `this`. Vamos un paso más allá.

Podemos vincular no solo `this`, sino también argumentos. Es algo que no suele hacerse, pero a veces puede ser útil.

Sintáxis completa de `bind`:

=======
JavaScript libraries also provide functions for convenient mass binding , e.g. [_.bindAll(object, methodNames)](http://lodash.com/docs#bindAll) in lodash.
````

## Partial functions

Until now we have only been talking about binding `this`. Let's take it a step further.

We can bind not only `this`, but also arguments. That's rarely done, but sometimes can be handy.

The full syntax of `bind`:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js
let bound = func.bind(context, [arg1], [arg2], ...);
```

<<<<<<< HEAD

Permite vincular el contexto como `this` y los argumentos iniciales de la función.

Por ejemplo, tenemos una función de multiplicación `mul(a, b)`:

=======
It allows to bind context as `this` and starting arguments of the function.

For instance, we have a multiplication function `mul(a, b)`:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js
function mul(a, b) {
  return a * b;
}
```

<<<<<<< HEAD

Usemos `bind` para crear una función` double` en su base:

=======
Let's use `bind` to create a function `double` on its base:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
function mul(a, b) {
  return a * b;
}

*!*
let double = mul.bind(null, 2);
*/!*

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

<<<<<<< HEAD

La llamada a `mul.bind(null, 2)` crea una nueva función `double` que pasa las llamadas a `mul`, fijando `null` como contexto y `2` como primer argumento. Otros argumentos se pasan "tal cual".

Eso se llama [aplicación parcial de una función](https://en.wikipedia.org/wiki/Partial_application) -- creamos una nueva función arreglando algunos parámetros de la existente.

Tenga en cuenta que aquí en realidad no usamos `this`. Pero `bind` lo requiere, por lo que debemos poner algo como `null`.

La función `triple` en el siguiente código triplica el valor:

=======
The call to `mul.bind(null, 2)` creates a new function `double` that passes calls to `mul`, fixing `null` as the context and `2` as the first argument. Further arguments are passed "as is".

That's called [partial function application](https://en.wikipedia.org/wiki/Partial_application) -- we create a new function by fixing some parameters of the existing one.

Please note that here we actually don't use `this` here. But `bind` requires it, so we must put in something like `null`.

The function `triple` in the code below triples the value:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
function mul(a, b) {
  return a * b;
}

*!*
let triple = mul.bind(null, 3);
*/!*

alert( triple(3) ); // = mul(3, 3) = 9
alert( triple(4) ); // = mul(3, 4) = 12
alert( triple(5) ); // = mul(3, 5) = 15
```

<<<<<<< HEAD
¿Por qué solemos hacer una función parcial?

El beneficio es que podemos crear una función independiente con un nombre legible (`double`,`triple`). Podemos usarlo y no proporcionar el primer argumento cada vez, ya que se fija con `bind`.

En otros casos, la aplicación parcial es útil cuando tenemos una función muy genérica y queremos una variante menos universal para mayor comodidad.

Por ejemplo, tenemos una función `send(from, to, text)`. Luego, dentro de un objeto `user` podemos querer usar una variante parcial del mismo: `sendTo(to, text)` que envía desde el usuario actual.

## Parcial sin contexto

¿Qué pasa si nos gustaría fijar algunos argumentos, pero no el contexto `this`? Por ejemplo, para un método de objeto.

El método `bind` nativo no permite eso. No podemos simplemente omitir el contexto y saltar a los argumentos.

Afortunadamente, se puede implementar fácilmente una función `parcial` para vincular solo argumentos.

Como esto:
=======
Why do we usually make a partial function?

The benefit is that we can create an independent function with a readable name (`double`, `triple`). We can use it and not provide the first argument every time as it's fixed with `bind`.

In other cases, partial application is useful when we have a very generic function and want a less universal variant of it for convenience.

For instance, we have a function `send(from, to, text)`. Then, inside a `user` object we may want to use a partial variant of it: `sendTo(to, text)` that sends from the current user.

## Going partial without context

What if we'd like to fix some arguments, but not the context `this`? For example, for an object method.

The native `bind` does not allow that. We can't just omit the context and jump to arguments.

Fortunately, a function `partial` for binding only arguments can be easily implemented.

Like this:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*

<<<<<<< HEAD

// Uso:

=======
// Usage:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

<<<<<<< HEAD

// agregar un método parcial con tiempo fijo
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Algo como:
// [10:00] John: Hello!
```

El resultado de la llamada `parcial(func [, arg1, arg2 ...])` es un contenedor `(*)` que llama a `func` con:
- El mismo `this` (para la llamada a `user.sayNow` es `user`)
- Luego le da `...argsBound` -- argumentos desde la llamada a `partial` (`"10:00"`)
- Luego le da `...args` -- argumentos dados desde la envoltura (`"Hello"`)

Muy fácil de hacer con la sintaxis de propagación, ¿verdad?

También hay una implementación preparada [_.partial](https://lodash.com/docs#partial) desde la librería lodash.

## Resumen

El método `func.bind(context, ... args)` devuelve una "variante ligada" de la función `func` que fija el contexto `this` y los primeros argumentos si se dan.

Por lo general, aplicamos `bind` para fijar `this` a un método de objeto, de modo que podamos pasarlo en otro lugar. Por ejemplo, en `setTimeout`.


Cuando fijamos algunos argumentos de una función existente, la función resultante (menos universal) se llama *aplicación parcial* o *parcial*.

=======
// add a partial method with fixed time
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

user.sayNow("Hello");
// Something like:
// [10:00] John: Hello!
```

The result of `partial(func[, arg1, arg2...])` call is a wrapper `(*)` that calls `func` with:
- Same `this` as it gets (for `user.sayNow` call it's `user`)
- Then gives it `...argsBound` -- arguments from the `partial` call (`"10:00"`)
- Then gives it `...args` -- arguments given to the wrapper (`"Hello"`)

So easy to do it with the spread syntax, right?

Also there's a ready [_.partial](https://lodash.com/docs#partial) implementation from lodash library.

## Summary
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

Los parciales son convenientes cuando no queremos repetir el mismo argumento una y otra vez. Al igual que si tenemos una función `send(from, to)`, y `from` siempre debe ser igual para nuestra tarea, entonces, podemos obtener un parcial y continuar la tarea con él.

<<<<<<< HEAD
=======
Usually we apply `bind` to fix `this` for an object method, so that we can pass it somewhere. For example, to `setTimeout`.

When we fix some arguments of an existing function, the resulting (less universal) function is called *partially applied* or *partial*.

Partials are convenient when we don't want to repeat the same argument over and over again. Like if we have a `send(from, to)` function, and `from` should always be the same for our task, we can get a partial and go on with it.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
