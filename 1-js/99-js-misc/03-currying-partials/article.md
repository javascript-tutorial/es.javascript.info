libs:
  - lodash

---

# Currificación

La [Currificación](https://es.wikipedia.org/wiki/Currificación) es una técnica avanzada de trabajo con funciones. No solo se usa en JavaScript, sino también en otros lenguajes.

La currificación es una transformación de funciones que traduce una función invocable como `f(a, b, c)` a invocable como `f(a)(b)(c)`.

La currificación no llama a una función. Simplemente la transforma.

Veamos primero un ejemplo, para comprender mejor de qué estamos hablando, y luego sus aplicaciones prácticas.

Crearemos una función auxiliar `curry(f)` que realice el curry para una `f` de dos argumentos. En otras palabras, `curry(f)` para dos argumentos `f(a, b)` lo traduce en una función que se ejecuta como `f(a)(b)`:

```js run
*!*
function curry(f) { // curry (f) realiza la transformación curry
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
*/!*

// uso
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

Como se puede ver, la implementación es sencilla: son solo dos contenedores.

- El resultado de `curry(func)` es un contenedor `function(a)`.
- Cuando se llama como `curriedSum(1)`, el argumento se guarda en el entorno léxico y se devuelve un nuevo contenedor `function(b)`.
- Luego se llama a este contenedor con `2` como argumento, y pasa la llamada a la función `sum` original.

Las implementaciones más avanzadas de currificación, como [_.curry](https://lodash.com/docs#curry) de la librería lodash, devuelven un contenedor que permite llamar a una función de manera normal y parcial:

```js run
function sum(a, b) {
  return a + b;
}

let curriedSum = _.curry(sum); // usando _.curry desde la librería lodash

alert( curriedSum(1, 2) ); // 3, todavía se puede llamar normalmente
alert( curriedSum(1)(2) ); // 3, llamada parcial
```

## ¿Curry? ¿Para qué?

Para comprender los beneficios, necesitamos un ejemplo digno, de la vida real.

Por ejemplo, tenemos la función de registro `log(date, importance, message)` que formatea y genera la información. En proyectos reales, tales funciones tienen muchas características útiles, como enviar registros a través de la red, aquí solo usaremos `alert`:

```js
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
```

¡Pongámosle curry!

```js
log = _.curry (log);
```

Después de eso, `log` funciona normalmente:

```js
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
```

...Pero también funciona en forma de curry:

```js
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```

Ahora podemos hacer fácilmente una función conveniente para los registros actuales:

```js
// logNow será el parcial del registro con el primer argumento fijo
let logNow = log(new Date());

// uso
logNow("INFO", "message"); // [HH: mm] mensaje INFO
```

Ahora `logNow` es `log` con un primer argumento fijo, en otras palabras, "función parcialmente aplicada" o "parcial" para abreviar.

Podemos ir más allá y hacer una función conveniente para los registros de depuración actuales:

```js
let debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] mensaje DEBUG
```

Entonces:
1. No perdimos nada después del curry: `log` todavía se puede llamar normalmente.
2. Podemos generar fácilmente funciones parciales, como los registros de hoy.

## Implementación avanzada de curry

En caso de que quiera entrar en detalles, aquí está la implementación de curry "avanzado" para funciones de múltiples argumentos que podríamos usar arriba.

Es bastante corto:

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

Ejemplos de uso:

```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, todavía se puede llamar con normalidad
alert( curriedSum(1)(2,3) ); // 6, curry en el primer argumento
alert( curriedSum(1)(2)(3) ); // 6, curry completo
```

El nuevo `curry` puede parecer complicado, pero en realidad es fácil de entender.

El resultado de la llamada `curry(func)` es el contenedor `curried` que se ve así:

```js
// func es la función a transformar
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```

Cuando lo ejecutamos, hay dos ramas de ejecución `if`:

1. Si el recuento de `args` pasado es el mismo que tiene la función original en su definición (`func.length`), entonces simplemente páselo usando `func.apply`.
2. De lo contrario, obtenga un parcial: No llamamos a `func` aún. En cambio, se devuelve otro contenedor que volverá a aplicar `curried` proporcionando los argumentos anteriores junto con los nuevos. 

Luego, en una nueva llamada, nuevamente obtendremos un nuevo parcial (si no hay suficientes argumentos) o, finalmente, el resultado.

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
