<<<<<<< HEAD
# Funciones Flecha, lo básico

Hay otra sintaxis muy simple y concisa para crear funciones, que a menudo es mejor que las Expresiones de funciones.

Se llama "funciones de flecha", porque se ve así:
=======
# Arrow functions, the basics

There's another very simple and concise syntax for creating functions, that's often better than Function Expressions.

It's called "arrow functions", because it looks like this:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
let func = (arg1, arg2, ...argN) => expression
```

<<<<<<< HEAD
...Esto crea una función `func` que acepta parámetros `arg1..argN`, luego evalúa la `expression` de la derecha con su uso y devuelve su resultado.

En otras palabras, es la versión más corta de:
=======
...This creates a function `func` that accepts arguments `arg1..argN`, then evaluates the `expression` on the right side with their use and returns its result.

In other words, it's the shorter version of:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
let func = function(arg1, arg2, ...argN) {
  return expression;
};
```

<<<<<<< HEAD
Veamos un ejemplo concreto:
=======
Let's see a concrete example:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let sum = (a, b) => a + b;

<<<<<<< HEAD
/* Esta función de flecha es una forma más corta de:
=======
/* This arrow function is a shorter form of:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

let sum = function(a, b) {
  return a + b;
};
*/

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
Como puedes ver `(a, b) => a + b` significa una función que acepta dos parámetros llamados `a` y `b`. Tras la ejecución, evalúa la expresión `a + b` y devuelve el resultado.

- Si solo tenemos un argumento, se pueden omitir paréntesis alrededor de los parámetros, lo que lo hace aún más corto.

    Por ejemplo:
=======
As you can, see `(a, b) => a + b` means a function that accepts two arguments named `a` and `b`. Upon the execution, it evaluates the expression `a + b` and returns the result.

- If we have only one argument, then parentheses around parameters can be omitted, making that even shorter.

    For example:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

    ```js run
    *!*
    let double = n => n * 2;
<<<<<<< HEAD
    // Más o menos lo mismo que: let double = function(n) { return n * 2 }
=======
    // roughly the same as: let double = function(n) { return n * 2 }
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
    */!*

    alert( double(3) ); // 6
    ```

<<<<<<< HEAD
- Si no hay parámetros, los paréntesis estarán vacíos (pero deberían estar presentes):
=======
- If there are no arguments, parentheses will be empty (but they should be present):
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

    ```js run
    let sayHi = () => alert("Hello!");

    sayHi();
    ```

<<<<<<< HEAD
Las funciones de flecha se pueden usar de la misma manera que las expresiones de función.

Por ejemplo, para crear dinámicamente una función:
=======
Arrow functions can be used in the same way as Function Expressions.

For instance, to dynamically create a function:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
  () => alert('Hello') :
  () => alert("Greetings!");

welcome();
```

<<<<<<< HEAD
Las funciones de flecha pueden parecer desconocidas y poco legibles al principio, pero eso cambia rápidamente a medida que los ojos se acostumbran a la estructura.

Son muy convenientes para acciones simples de una línea, cuando somos demasiado flojos para escribir muchas palabras.

## Funciones de flecha multilínea

Los ejemplos anteriores tomaron parámetros de la izquierda de `=>` y evaluaron el lado derecho de la expressión con ellos.

A veces necesitamos algo un poco más complejo, como múltiples expresiones o declaraciones. También es posible, pero debemos encerrarlos entre llaves. Luego usa un `return` normal dentro de ellas.

Como esto:

```js run
let sum = (a, b) => {  // la llave abre una función multilínea
  let result = a + b;
*!*
  return result; // si usamos llaves, entonces necesitamos un "return" explícito
=======
Arrow functions may appear unfamiliar and not very readable at first, but that quickly changes as the eyes get used to the structure.

They are very convenient for simple one-line actions, when we're just too lazy to write many words.

## Multiline arrow functions

The examples above took arguments from the left of `=>` and evaluated the right-side expression with them.

Sometimes we need something a little bit more complex, like multiple expressions or statements. It is also possible, but we should enclose them in curly braces. Then use a normal `return` within them.

Like this:

```js run
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
*!*
  return result; // if we use curly braces, then we need an explicit "return" 
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
*/!*
};

alert( sum(1, 2) ); // 3
```

<<<<<<< HEAD
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
=======
```smart header="More to come"
Here we praised arrow functions for brevity. But that's not all!

Arrow functions have other interesting features.

To study them in-depth, we first need to get to know some other aspects of JavaScript, so we'll return to arrow functions later in the chapter <info:arrow-functions>.

For now, we can already use arrow functions for one-line actions and callbacks.
```

## Summary

Arrow functions are handy for one-liners. They come in two flavors:

1. Without curly braces: `(...args) => expression` -- the right side is an expression: the function evaluates it and returns the result.
2. With curly braces: `(...args) => { body }` -- brackets allow us to write multiple statements inside the function, but we need an explicit `return` to return something.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
