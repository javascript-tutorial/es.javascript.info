libs:
  - lodash

---

<<<<<<< HEAD
# Currificación

La [Currificación](https://es.wikipedia.org/wiki/Currificación) es una técnica avanzada de trabajo con funciones. No solo se usa en JavaScript, sino también en otros lenguajes.

La currificación es una transformación de funciones que traduce una función invocable como `f(a, b, c)` a invocable como `f(a)(b)(c)`.

La currificación no llama a una función. Simplemente la transforma.

Veamos primero un ejemplo, para comprender mejor de qué estamos hablando, y luego sus aplicaciones prácticas.

Crearemos una función auxiliar `curry(f)` que realice el curry para una `f` de dos argumentos. En otras palabras, `curry(f)` para dos argumentos `f(a, b)` lo traduce en una función que se ejecuta como `f(a)(b)`:

```js run
*!*
function curry(f) { // curry (f) realiza la transformación curry
=======
# Currying

[Currying](https://en.wikipedia.org/wiki/Currying) is an advanced technique of working with functions. It's used not only in JavaScript, but in other languages as well.

Currying is a transformation of functions that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`.

Currying doesn't call a function. It just transforms it.

Let's see an example first, to better understand what we're talking about, and then practical applications.

We'll create a helper function `curry(f)` that performs currying for a two-argument `f`. In other words, `curry(f)` for two-argument `f(a, b)` translates it into a function that runs as `f(a)(b)`:

```js run
*!*
function curry(f) { // curry(f) does the currying transform
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

<<<<<<< HEAD
// uso
=======
// usage
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

<<<<<<< HEAD
Como se puede ver, la implementación es sencilla: son solo dos contenedores.

- El resultado de `curry(func)` es un contenedor `function(a)`.
- Cuando se llama como `curriedSum(1)`, el argumento se guarda en el entorno léxico y se devuelve un nuevo contenedor `function(b)`.
- Luego se llama a este contenedor con `2` como argumento, y pasa la llamada a la función `sum` original.

Las implementaciones más avanzadas de currificación, como [_.curry](https://lodash.com/docs#curry) de la libreria lodash, devuelven un contenedor que permite llamar a una función de manera normal y parcial:
=======
As you can see, the implementation is straightforward: it's just two wrappers.

- The result of `curry(func)` is a wrapper `function(a)`.
- When it is called like `curriedSum(1)`, the argument is saved in the Lexical Environment, and a new wrapper is returned `function(b)`.
- Then this wrapper is called with `2` as an argument, and it passes the call to the original `sum`.

More advanced implementations of currying, such as [_.curry](https://lodash.com/docs#curry) from lodash library, return a wrapper that allows a function to be called both normally and partially:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js run
function sum(a, b) {
  return a + b;
}

<<<<<<< HEAD
let curriedSum = _.curry(sum); // usando _.curry desde la libreria lodash

alert( curriedSum(1, 2) ); // 3, todavía se puede llamar normalmente
alert( curriedSum(1)(2) ); // 3, llamada parcial
```

## ¿Curry? ¿Para qué?

Para comprender los beneficios, necesitamos un ejemplo digno, de la vida real.

Por ejemplo, tenemos la función de registro `log(date, importance, message)` que formatea y genera la información. En proyectos reales, tales funciones tienen muchas características útiles, como enviar registros a través de la red, aquí solo usaremos `alert`:
=======
let curriedSum = _.curry(sum); // using _.curry from lodash library

alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially
```

## Currying? What for?

To understand the benefits we need a worthy real-life example.

For instance, we have the logging function `log(date, importance, message)` that formats and outputs the information. In real projects such functions have many useful features like sending logs over the network, here we'll just use `alert`:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

<<<<<<< HEAD
¡Pongámosle curry!

```js
log = _.curry (log);
```

Después de eso, `log` funciona normalmente:
=======
Let's curry it!

```js
log = _.curry(log);
```

After that `log` works normally:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

<<<<<<< HEAD
...Pero también funciona en forma de curry:
=======
...But also works in the curried form:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

<<<<<<< HEAD
Ahora podemos hacer fácilmente una función conveniente para los registros actuales:

```js
// logNow será el parcial del registro con el primer argumento fijo
let logNow = log(new Date());

// uso
logNow("INFO", "message"); // [HH: mm] mensaje INFO
```

Ahora `logNow` es `log` con un primer argumento fijo, en otras palabras, "función parcialmente aplicada" o "parcial" para abreviar.

Podemos ir más allá y hacer una función conveniente para los registros de depuración actuales:
=======
Now we can easily make a convenience function for current logs:

```js
// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());

// use it
logNow("INFO", "message"); // [HH:mm] INFO message
```

Now `logNow` is `log` with fixed first argument, in other words "partially applied function" or "partial" for short.

We can go further and make a convenience function for current debug logs:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
let debugNow = logNow("DEBUG");

<<<<<<< HEAD
debugNow("message"); // [HH:mm] mensaje DEBUG
```

Entonces:
1. No perdimos nada después del curry: `log` todavía se puede llamar normalmente.
2. Podemos generar fácilmente funciones parciales, como los registros de hoy.

## Implementación avanzada de curry

En caso de que quiera entrar en detalles, aquí está la implementación de curry "avanzado" para funciones de múltiples argumentos que podríamos usar arriba.

Es bastante corto:
=======
debugNow("message"); // [HH:mm] DEBUG message
```

So:
1. We didn't lose anything after currying: `log` is still callable normally.
2. We can easily generate partial functions such as for today's logs.

## Advanced curry implementation

In case you'd like to get in to the details, here's the "advanced" curry implementation for multi-argument functions that we could use above.

It's pretty short:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
```

<<<<<<< HEAD
Ejemplos de uso:
=======
Usage examples:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

<<<<<<< HEAD
alert( curriedSum(1, 2, 3) ); // 6, todavía se puede llamar con normalidad
alert( curriedSum(1)(2,3) ); // 6, curry en el primer argumento
alert( curriedSum(1)(2)(3) ); // 6, curry completo
```

El nuevo `curry` puede parecer complicado, pero en realidad es fácil de entender.

El resultado de la llamada `curry(func)` es el contenedor `curried` que se ve así:

```js
// func es la función a transformar
=======
alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

The new `curry` may look complicated, but it's actually easy to understand.

The result of `curry(func)` call is the wrapper `curried` that looks like this:

```js
// func is the function to transform
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

<<<<<<< HEAD
Cuando lo ejecutamos, hay dos ramas de ejecución `if`:

1. Llame ahora: si el recuento de `args` pasado es el mismo que tiene la función original en su definición (`func.length`) o más, entonces simplemente páselo.
2. Obtenga un parcial: de lo contrario, `func` aún no se llama. En cambio, se devuelve otro contenedor `pass`, que volverá a aplicar `curried` proporcionando argumentos anteriores junto con los nuevos. Luego, en una nueva llamada, nuevamente obtendremos un nuevo parcial (si no hay suficientes argumentos) o, finalmente, el resultado.

Por ejemplo, veamos qué sucede en el caso de `sum(a, b, c)`. Tres argumentos, entonces `sum.length = 3`.

Para la llamada `curried(1)(2)(3)`:

1. La primera llamada `curried(1)` recuerda `1` en su entorno léxico, y devuelve un contenedor` pass`.
2. El contenedor `pass` se llama con `(2)`: toma los argumentos anteriores `(1)`, los concatena con lo que obtuvo `(2)` y llama `curried(1, 2)` con ambos argumentos. Como el recuento de argumentos es aún menor que 3, `curry` devuelve `pass`.
3. El contenedor `pass` se llama nuevamente con` (3) `, para la próxima llamada` pass(3) `toma los argumentos anteriores (`1`, `2`) y agrega` 3` a ellos, haciendo la llamada `curried(1, 2, 3)` -- finalmente hay 3 argumentos , y son pasados a la función original.

Si eso todavía no es obvio, solo rastrea la secuencia de llamadas en tu mente o en papel.

```smart header="Solo funciones de longitud fija "
El currying requiere que la función tenga un número fijo de argumentos.

Una función que utiliza múltiples parámetros, como `f(...args)`, no se puede currificar.
```

```smart header="Un poco más que curry "
Por definición, el curry debería convertir `sum(a, b, c)` en `sum(a)(b)(c)`.

Pero la mayoría de las implementaciones de curry en JavaScript son avanzadas, como se describe: también mantienen la función invocable en la variante de múltiples argumentos.
```

## Resumen

*Currificación* es una transformación que hace que `f(a, b, c)` sea invocable como `f(a)(b)(c)`. Las implementaciones de JavaScript generalmente mantienen la función invocable normalmente y devuelven el parcial si el conteo de argumentos no es suficiente.

La currificación nos permite obtener parciales fácilmente. Como hemos visto en el ejemplo de registro, después de aplicar currificación a la función universal de tres argumentos `log(fecha, importancia, mensaje)` nos da parciales cuando se llama con un argumento (como `log(fecha)`) o dos argumentos (como ` log(fecha, importancia) `).
=======
When we run it, there are two `if` execution branches:

1. Call now: if passed `args` count is the same as the original function has in its definition (`func.length`) or longer, then just pass the call to it.
2. Get a partial: otherwise, `func` is not called yet. Instead, another wrapper `pass` is returned, that will re-apply `curried` providing previous arguments together with the new ones. Then on a new call, again, we'll get either a new partial (if not enough arguments) or, finally, the result.

For instance, let's see what happens in the case of `sum(a, b, c)`. Three arguments, so `sum.length = 3`.

For the call `curried(1)(2)(3)`:

1. The first call `curried(1)` remembers `1` in its Lexical Environment, and returns a wrapper `pass`.
2. The wrapper `pass` is called with `(2)`: it takes previous args (`1`), concatenates them with what it got `(2)` and calls `curried(1, 2)` with them together. As the argument count is still less than 3, `curry` returns `pass`.
3. The wrapper `pass` is called again with `(3)`,  for the next call `pass(3)` takes previous args (`1`, `2`) and adds `3` to them, making the call `curried(1, 2, 3)` -- there are `3` arguments at last, they are given to the original function.

If that's still not obvious, just trace the calls sequence in your mind or on paper.

```smart header="Fixed-length functions only"
The currying requires the function to have a fixed number of arguments.

A function that uses rest parameters, such as `f(...args)`, can't be curried this way.
```

```smart header="A little more than currying"
By definition, currying should convert `sum(a, b, c)` into `sum(a)(b)(c)`.

But most implementations of currying in JavaScript are advanced, as described: they also keep the function callable in the multi-argument variant.
```

## Summary

*Currying* is a transform that makes `f(a,b,c)` callable as `f(a)(b)(c)`. JavaScript implementations usually both keep the function callable normally and return the partial if the arguments count is not enough.

Currying allows us to easily get partials. As we've seen in the logging example, after currying the three argument universal function `log(date, importance, message)` gives us partials when called with one argument (like `log(date)`) or two arguments (like `log(date, importance)`).  
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
