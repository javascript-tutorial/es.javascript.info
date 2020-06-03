libs:
  - lodash

---

# Función binding (vinculadora)


Al pasar métodos de objeto como devoluciones de llamada, por ejemplo a `setTimeout`, se genera un problema conocido: "pérdida de `this`".

En este capítulo veremos las formas de solucionarlo.


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


// ...el valor de user cambia en 1 segundo

user = {
  sayHi() { alert("Another user in setTimeout!"); }
};


// Otro user en setTimeout!

```

La siguiente solución garantiza que tal cosa no sucederá.

## Solución 2: bind

Las funciones proporcionan un método incorporado [bind](mdn:js/Function/bind) que permite encontrar a `this`.

La sintaxis básica es:

```js

// la sintaxis más compleja vendrá un poco más tarde

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

// puede ejecutarlo sin un objeto

sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// incluso si el valor del usuario cambia en 1 segundo
// sayHi usa el valor pre-enlazado

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

Las bibliotecas de JavaScript también proporcionan funciones para un enlace masivo, e.j. [_.bindAll(obj)](http://lodash.com/docs#bindAll) en lodash.
````

## Funciones parciales

Hasta ahora solo hemos estado hablando de vincular `this`. Vamos un paso más allá.

Podemos vincular no solo `this`, sino también argumentos. Es algo que no suele hacerse, pero a veces puede ser útil.

Sintáxis completa de `bind`:


```js
let bound = func.bind(context, [arg1], [arg2], ...);
```


Permite vincular el contexto como `this` y los argumentos iniciales de la función.

Por ejemplo, tenemos una función de multiplicación `mul(a, b)`:


```js
function mul(a, b) {
  return a * b;
}
```


Usemos `bind` para crear una función` double` en su base:


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


La llamada a `mul.bind(null, 2)` crea una nueva función `double` que pasa las llamadas a `mul`, fijando `null` como contexto y `2` como primer argumento. Otros argumentos se pasan "tal cual".

Eso se llama [aplicación parcial de una función](https://en.wikipedia.org/wiki/Partial_application) -- creamos una nueva función arreglando algunos parámetros de la existente.

Tenga en cuenta que aquí en realidad no usamos `this`. Pero `bind` lo requiere, por lo que debemos poner algo como `null`.

La función `triple` en el siguiente código triplica el valor:


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

¿Por qué solemos hacer una función parcial?

El beneficio es que podemos crear una función independiente con un nombre legible (`double`,`triple`). Podemos usarlo y no proporcionar el primer argumento cada vez, ya que se fija con `bind`.

En otros casos, la aplicación parcial es útil cuando tenemos una función muy genérica y queremos una variante menos universal para mayor comodidad.

Por ejemplo, tenemos una función `send(from, to, text)`. Luego, dentro de un objeto `user` podemos querer usar una variante parcial del mismo: `sendTo(to, text)` que envía desde el usuario actual.

## Parcial sin contexto

¿Qué pasa si nos gustaría fijar algunos argumentos, pero no el contexto `this`? Por ejemplo, para un método de objeto.

El método `bind` nativo no permite eso. No podemos simplemente omitir el contexto y saltar a los argumentos.

Afortunadamente, se puede implementar fácilmente una función `parcial` para vincular solo argumentos.

Como esto:

```js run
*!*
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}
*/!*


// Uso:

let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};


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


Los parciales son convenientes cuando no queremos repetir el mismo argumento una y otra vez. Al igual que si tenemos una función `send(from, to)`, y `from` siempre debe ser igual para nuestra tarea, entonces, podemos obtener un parcial y continuar la tarea con él.

