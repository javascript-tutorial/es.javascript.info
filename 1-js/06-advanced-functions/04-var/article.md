
# La vieja "var"

<<<<<<< HEAD
```smart header="Este artículo es para entender código antiguo"
La información en este artículo es útil para entender código antiguo.

Así no es como escribimos código moderno.
```

En el primer capítulo acerca de [variables](info:variables), mencionamos tres formas de declarar una variable:
=======
```smart header="This article is for understanding old scripts"
The information in this article is useful for understanding old scripts.

That's not how we write a new code.
```

In the very first chapter about [variables](info:variables), we mentioned three ways of variable declaration:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

1. `let`
2. `const`
3. `var`

<<<<<<< HEAD
La declaración `var` es similar a `let`. Casi siempre podemos reemplazar `let` por `var` o viceversa y esperar que las cosas funcionen: 

```js run
var message = "Hola";
alert(message); // Hola
```

Pero internamente `var` es una bestia diferente, originaria de muy viejas épocas. Generalmente no se usa en código moderno pero aún habita en el antiguo.

Si no planeas encontrarte con tal código bien puedes saltar este capítulo o posponerlo, pero hay posibilidades de que esta bestia pueda morderte más tarde.

Por otro lado, es importante entender las diferencias cuando se migra antiguo código de `var` a `let` para evitar extraños errores.

## "var" no tiene alcance (visibilidad) de bloque.

Las variables declaradas con `var` pueden: tener a la función como entorno de visibilidad, o bien ser globales. Su visibilidad atraviesa los bloques.

Por ejemplo:

```js run
if (true) {
  var test = true; // uso de "var" en lugar de "let"
}
=======
The `var` declaration is similar to `let`. Most of the time we can replace `let` by `var` or vice-versa and expect things to work:

```js run
var message = "Hi";
alert(message); // Hi
```

But internally `var` is a very different beast, that originates from very old times. It's generally not used in modern scripts, but still lurks in the old ones.

If you don't plan on meeting such scripts you may even skip this chapter or postpone it.

On the other hand, it's important to understand differences when migrating old scripts from `var` to `let`, to avoid odd errors.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

*!*
alert(test); // true, la variable vive después del if
*/!*
```

<<<<<<< HEAD
Como `var` ignora los bloques de código, tenemos una variable global `test`.  
=======
Variables, declared with `var`, are either function-wide or global. They are visible through blocks.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Si usáramos `let test` en vez de `var test`, la variable sería visible solamente dentro del `if`:

```js run
if (true) {
  let test = true; // uso de "let"
}

*!*
alert(test); // Error: test no está definido
*/!*
```

<<<<<<< HEAD
Lo mismo para los bucles: `var` no puede ser local en los bloques ni en los bucles:
=======
As `var` ignores code blocks, we've got a global variable `test`.

If we used `let test` instead of `var test`, then the variable would only be visible inside `if`:

```js run
if (true) {
  let test = true; // use "let"
}

*!*
alert(test); // Error: test is not defined
*/!*
```

The same thing for loops: `var` cannot be block- or loop-local:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js
for (var i = 0; i < 10; i++) {
  // ...
}

*!*
alert(i); // 10, "i" es visible después del bucle, es una variable global
*/!*
```

Si un bloque de código está dentro de una función, `var` se vuelve una variable a nivel de función:

```js run
function sayHi() {
  if (true) {
    var phrase = "Hello";
  }

  alert(phrase); // funciona
}

sayHi();
<<<<<<< HEAD
alert(phrase); // Error: phrase no está definida (Revise consola de desarrollador)
=======
alert(phrase); // Error: phrase is not defined (Check the Developer Console)
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
```

Como podemos ver, `var` atraviesa `if`, `for` u otros bloques. Esto es porque mucho tiempo atrás los bloques en JavaScript no tenían ambientes léxicos. Y `var` es un remanente de aquello.

<<<<<<< HEAD
## "var" tolera redeclaraciones
=======
## "var" tolerates redeclarations

If we declare the same variable with `let` twice in the same scope, that's an error:

```js run
let user;
let user; // SyntaxError: 'user' has already been declared
```

With `var`, we can redeclare a variable any number of times. If we use `var` with an already-declared variable, it's just ignored:

```js run
var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

alert(user); // John
```

## "var" variables can be declared below their use
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Declarar la misma variable con `let` dos veces en el mismo entorno es un error:

```js run
let user;
let user; // SyntaxError: 'user' ya fue declarado
```

Con `var` podemos redeclarar una variable muchas veces. Si usamos `var` con una variable ya declarada, simplemente se ignora:

```js run
<<<<<<< HEAD
var user = "Pete";

var user = "John"; // este "var" no hace nada (ya estaba declarado)
// ...no dispara ningún error

alert(user); // John
```

## Las variables "var" pueden ser declaradas debajo del lugar en donde se usan

Las declaraciones `var` son procesadas cuando se inicia la función (o se inicia el script para las globales).

En otras palabras, las variables `var` son definidas desde el inicio de la función, no importa dónde esté tal definición (asumiendo que la definición no está en una función anidada).

Entonces el código:

```js run
=======
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
function sayHi() {
  phrase = "Hello";

  alert(phrase);

*!*
  var phrase;
*/!*
}
sayHi();
```

...es técnicamente lo mismo que esto (se movió `var phrase` hacia arriba):

```js run
function sayHi() {
*!*
  var phrase;
*/!*

  phrase = "Hello";

  alert(phrase);
}
sayHi();
```

...O incluso esto (recuerda, los códigos de bloque son ignorados):

```js run
function sayHi() {
  phrase = "Hello"; // (*)

  *!*
  if (false) {
    var phrase;
  }
  */!*

  alert(phrase);
}
sayHi();
```

Este comportamiento también se llama "hoisting" (elevamiento), porque todos los `var` son "hoisted" (elevados) hacia el tope de la función.

Entonces, en el ejemplo anterior, la rama `if (false)` nunca se ejecuta pero eso no tiene importancia. El `var` dentro es procesado al iniciar la función, entonces al momento de `(*)` la variable existe.

**Las declaraciones son "hoisted" (elevadas), pero las asignaciones no lo son.**

<<<<<<< HEAD
Es mejor demostrarlo con un ejemplo:
=======
That's best demonstrated with an example:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
function sayHi() {
  alert(phrase);  

*!*
  var phrase = "Hello";
*/!*
}

sayHi();
```

La línea `var phrase = "Hello"` tiene dentro dos acciones:

1. La declaración `var`
2. La asignación `=`.

La declaración es procesada al inicio de la ejecución de la función ("hoisted"), pero la asignación siempre se hace en el lugar donde aparece. Entonces lo que en esencia hace el código es:

```js run
function sayHi() {
*!*
  var phrase; // la declaración se hace en el inicio...
*/!*

  alert(phrase); // undefined

*!*
  phrase = "Hello"; // ...asignación - cuando la ejecución la alcanza.
*/!*
}

sayHi();
```

Como todas las declaraciones `var` son procesadas al inicio de la función, podemos referenciarlas en cualquier lugar. Pero las variables serán indefinidas hasta que alcancen su asignación.

En ambos ejemplos de arriba `alert` se ejecuta sin un error, porque la variable `phrase` existe. Pero su valor no fue asignado aún, entonces muestra `undefined`.

### IIFE

Como en el pasado solo existía `var`, y no había visibilidad a nivel de bloque, los programadores inventaron una manera de emularla. Lo que hicieron fue el llamado "expresiones de función inmediatamente invocadas (abreviado IIFE en inglés).

No es algo que debiéramos usar estos días, pero puedes encontrarlas en código antiguo.

Un IIFE se ve así:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Aquí la expresión de función es creada e inmediatamente llamada. Entonces el código se ejecuta enseguida y con sus variables privadas propias.

La expresión de función es encerrada entre paréntesis `(function {...})`, porque cuando JavaScript se encuentra con `"function"` en el flujo de código principal lo entiende como el principio de una declaración de función. Pero una declaración de función debe tener un nombre, entonces ese código daría error:

```js run
// Trata de declarar e inmediatamente llamar una función
function() { // <-- Error: la instrucción de función requiere un nombre de función

  let message = "Hello";

  alert(message); // Hello

}();
```

Incluso si decimos: "okay, agreguémosle un nombre", no funcionaría, porque JavaScript no permite que las declaraciones de función sean llamadas inmediatamente:

```js run
// error de sintaxis por causa de los paréntesis debajo
function go() {

}(); // <-- no puede llamarse una declaración de función inmediatamente 
```

Entonces, los paréntesis alrededor de la función es un truco para mostrarle a JavaScript que la función es creada en el contexto de otra expresión, y de allí lo de "expresión de función", que no necesita un nombre y puede ser llamada inmediatamente.

Existen otras maneras además de los paréntesis para decirle a JavaScript que queremos una expresión de función:

```js run
// Formas de crear IIFE

(function() {
  alert("Paréntesis alrededor de la función");
}*!*)*/!*();

(function() {
  alert("Paréntesis alrededor de todo");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Operador 'Bitwise NOT' como comienzo de la expresión");
}();

*!*+*/!*function() {
  alert("'más unario' como comienzo de la expresión");
}();
```

En todos los casos de arriba declaramos una expresión de función y la ejecutamos inmediatamente. Tomemos nota de nuevo: Ahora no hay motivo para escribir semejante código.

<<<<<<< HEAD
## Resumen

Hay dos diferencias principales entre `var` y `let/const`:

1. Las variables `var` no tienen alcance de bloque, su mínimo de alcance es a nivel de función.
2. Las declaraciones `var` son procesadas al inicio de la función (o del script para las globales) .

Hay otra diferencia menor relacionada al objeto global que cubriremos en el siguiente capítulo.

Estas diferencias casi siempre hacen a `var` peor que `let`. Las variables a nivel de bloque son mejores. Es por ello que `let` fue presentado en el estándar mucho tiempo atrás, y es ahora la forma principal (junto con `const`) de declarar una variable.
=======
### IIFE

As in the past there was only `var`, and it has no block-level visibility, programmers invented a way to emulate it. What they did was called "immediately-invoked function expressions" (abbreviated as IIFE).

That's not something we should use nowadays, but you can find them in old scripts.

An IIFE looks like this:

```js run
(function() {

  let message = "Hello";

  alert(message); // Hello

})();
```

Here a Function Expression is created and immediately called. So the code executes right away and has its own private variables.

The Function Expression is wrapped with parenthesis `(function {...})`, because when JavaScript meets `"function"` in the main code flow, it understands it as the start of a Function Declaration. But a Function Declaration must have a name, so this kind of code will give an error:

```js run
// Try to declare and immediately call a function
function() { // <-- Error: Function statements require a function name

  let message = "Hello";

  alert(message); // Hello

}();
```

Even if we say: "okay, let's add a name", that won't work, as JavaScript does not allow Function Declarations to be called immediately:

```js run
// syntax error because of parentheses below
function go() {

}(); // <-- can't call Function Declaration immediately
```

So, the parentheses around the function is a trick to show JavaScript that the function is created in the context of another expression, and hence it's a Function Expression: it needs no name and can be called immediately.

There exist other ways besides parentheses to tell JavaScript that we mean a Function Expression:

```js run
// Ways to create IIFE

(function() {
  alert("Parentheses around the function");
}*!*)*/!*();

(function() {
  alert("Parentheses around the whole thing");
}()*!*)*/!*;

*!*!*/!*function() {
  alert("Bitwise NOT operator starts the expression");
}();

*!*+*/!*function() {
  alert("Unary plus starts the expression");
}();
```

In all the above cases we declare a Function Expression and run it immediately. Let's note again: nowadays there's no reason to write such code.

## Summary

There are two main differences of `var` compared to `let/const`:

1. `var` variables have no block scope, they are visible minimum at the function level.
2. `var` declarations are processed at function start (script start for globals).

There's one more very minor difference related to the global object, that we'll cover in the next chapter.

These differences make `var` worse than `let` most of the time. Block-level variables is such a great thing. That's why `let` was introduced in the standard long ago, and is now a major way (along with `const`) to declare a variable.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
