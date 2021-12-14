# Funciones Flecha, lo básico

Hay otra sintaxis muy simple y concisa para crear funciones, que a menudo es mejor que las Expresiones de funciones.

Se llama "funciones de flecha", porque se ve así:

```js
let func = (arg1, arg2, ..., argN) => expression;
```

Esto crea una función `func` que acepta los parámetros `arg1..argN`, luego evalúa la `expression` del lado derecho mediante su uso y devuelve su resultado.

En otras palabras, es la versión más corta de:

```js
let func = function(arg1, arg2, ..., argN) {
  return expression;
};
```

Veamos un ejemplo concreto:

```js run
let sum = (a, b) => a + b;

/* Esta función de flecha es una forma más corta de:

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

Como puedes ver `(a, b) => a + b` significa una función que acepta dos parámetros llamados `a` y `b`. Tras la ejecución, evalúa la expresión `a + b` y devuelve el resultado.

- Si solo tenemos un argumento, se pueden omitir paréntesis alrededor de los parámetros, lo que lo hace aún más corto.

    Por ejemplo:

    ```js run
    *!*
    let double = n => n * 2;
    // Más o menos lo mismo que: let double = function(n) { return n * 2 }
    */!*

    alert( double(3) ); // 6
    ```

- Si no hay parámetros, los paréntesis estarán vacíos (pero deben estar presentes):

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

Las funciones de flecha se pueden usar de la misma manera que las expresiones de función.

Por ejemplo, para crear dinámicamente una función:

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome();
```

Las funciones de flecha pueden parecer desconocidas y poco legibles al principio, pero eso cambia rápidamente a medida que los ojos se acostumbran a la estructura.

Son muy convenientes para acciones simples de una línea, cuando somos demasiado flojos para escribir muchas palabras.

## Funciones de flecha multilínea

Los ejemplos anteriores tomaron parámetros de la izquierda de `=>` y evaluaron el lado derecho de la expresión con ellos.

A veces necesitamos algo un poco más complejo, como múltiples expresiones o declaraciones. También es posible: en ese caso debemos encerrarlos entre llaves y luego usar un `return` normal dentro de ellas.

Como esto:

```js run
let sum = (a, b) => {  // la llave abre una función multilínea
  let result = a + b;
*!*
  return result; // si usamos llaves, entonces necesitamos un "return" explícito
*/!*
};

alert( sum(1, 2) ); // 3
```

```smart header="Más por venir"
Aquí elogiamos las funciones de flecha por su brevedad. ¡Pero eso no es todo!

Las funciones de flecha tienen otras características interesantes.

Para estudiarlas en profundidad, primero debemos conocer algunos otros aspectos de JavaScript, por lo que volveremos a las funciones de flecha más adelante en el capítulo <info:arrow-functions>.

Por ahora, ya podemos usar las funciones de flecha para acciones de una línea y devoluciones de llamada.
```

## Resumen

Las funciones de flecha son útiles para líneas simples. Vienen en dos variantes:

1. Sin llaves: `(...args) => expression` -- el lado derecho es una expresión: la función lo evalúa y devuelve el resultado.
2. Con llaves: `(...args) => { body }` -- los paréntesis nos permiten escribir varias declaraciones dentro de la función, pero necesitamos un `return` explícito para devolver algo.
