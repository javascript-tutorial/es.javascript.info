
# La vieja "var"

```smart header="Este artículo es para entender código antiguo"
La información en este artículo es útil para entender código antiguo.

No es así como escribimos código moderno.
```

En el primer capítulo acerca de [variables](info:variables), mencionamos tres formas de declarar una variable:

1. `let`
2. `const`
3. `var`

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

*!*
alert(test); // true, la variable vive después del if
*/!*
```

Como `var` ignora los bloques de código, tenemos una variable global `test`.  

Si usáramos `let test` en vez de `var test`, la variable sería visible solamente dentro del `if`:

```js run
if (true) {
  let test = true; // uso de "let"
}

*!*
alert(test); // ReferenceError: test no está definido
*/!*
```

Lo mismo para los bucles: `var` no puede ser local en los bloques ni en los bucles:

```js
for (var i = 0; i < 10; i++) {
  var one = 1;
  // ...
}

*!*
alert(i); // 10, "i" es visible después del bucle, es una variable global
alert(one); // 1, "one" es visible después del bucle, es una variable global
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
alert(phrase); // ReferenceError: phrase no está definida
```

Como podemos ver, `var` atraviesa `if`, `for` u otros bloques. Esto es porque mucho tiempo atrás los bloques en JavaScript no tenían ambientes léxicos. Y `var` es un remanente de aquello.

## "var" tolera redeclaraciones

Declarar la misma variable con `let` dos veces en el mismo entorno es un error:

```js run
let user;
let user; // SyntaxError: 'user' ya fue declarado
```

Con `var` podemos redeclarar una variable muchas veces. Si usamos `var` con una variable ya declarada, simplemente se ignora:

```js run
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

Es mejor demostrarlo con un ejemplo:

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

## IIFE

Como en el pasado solo existía `var`, y no había visibilidad a nivel de bloque, los programadores inventaron una manera de emularla. Lo que hicieron fue el llamado "expresiones de función inmediatamente invocadas (abreviado IIFE en inglés).

No es algo que debiéramos usar estos días, pero puedes encontrarlas en código antiguo.

Un IIFE se ve así:

```js run
(function() {

  var message = "Hello";

  alert(message); // Hello

})();
```

Aquí la expresión de función es creada e inmediatamente llamada. Entonces el código se ejecuta enseguida y con sus variables privadas propias.

La expresión de función es encerrada entre paréntesis `(function {...})`, porque cuando JavaScript se encuentra con `"function"` en el flujo de código principal lo entiende como el principio de una declaración de función. Pero una declaración de función debe tener un nombre, entonces ese código daría error:

```js run
// Trata de declarar e inmediatamente llamar una función
function() { // <-- SyntaxError: la instrucción de función requiere un nombre de función

  var message = "Hello";

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

*!*(*/!*function() {
  alert("Paréntesis alrededor de la función");
}*!*)*/!*();

*!*(*/!*function() {
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

## Resumen

Hay dos diferencias principales entre `var` y `let/const`:

1. Las variables `var` no tienen alcance de bloque: su visibilidad alcanza a la función, o es global si es declarada fuera de las funciones.
2. Las declaraciones `var` son procesadas al inicio de la función (o del script para las globales) .

Hay otra diferencia menor relacionada al objeto global que cubriremos en el siguiente capítulo.

Estas diferencias casi siempre hacen a `var` peor que `let`. Las variables a nivel de bloque son mejores. Es por ello que `let` fue presentado en el estándar mucho tiempo atrás, y es ahora la forma principal (junto con `const`) de declarar una variable.
