# La sintaxis "new Function"

Hay una forma más de crear una función. Raramente se usa, pero a veces no hay alternativa.

## Sintaxis

La sintaxis para crear una función:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

<<<<<<< HEAD
La función se crea con los argumentos `arg1 ... argN` y el `functionBody` dado.
=======
The function is created with the arguments `arg1...argN` and the given `functionBody`.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Es más fácil entender viendo un ejemplo: Aquí tenemos una función con dos argumentos:

```js run
<<<<<<< HEAD
let sumar = new Function('a', 'b', 'return a + b');
alert(sumar(1, 2)); // 3
```

Si no hay argumentos, entonces hay sólo un único argumento, el cuerpo de la función sería:
=======
let sum = new Function('a', 'b', 'return a + b');

alert( sum(1, 2) ); // 3
```

And here there's a function without arguments, with only the function body:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js run
let diHola = new Function('alert("Hola")');

diHola(); // Hola
```
La mayor diferencia sobre las otras maneras de crear funciones que hemos visto, es que la función se crea literalmente con un string y es pasada en tiempo de ejecución.

<<<<<<< HEAD
Las declaraciones anteriores nos obliga a nosotros, los programadores, a escribir el código de la función en el script.
=======
The major difference from other ways we've seen is that the function is created literally from a string, that is passed at run time.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Pero `new Function` nos permite convertir cualquier string en una función. Por ejemplo, podemos recibir una nueva función desde el servidor y ejecutarlo.

```js
let str = ... recibir el código de un servidor dinámicamente ...

let func = new Function(str);
func();
```
<<<<<<< HEAD
Se utilizan en casos muy específicos, como cuando recibimos código de un servidor, o compilar dinámicamente una función a partir de una plantilla. La necesidad surge en etapas avanzadas de desarrollo.

## Closure

Normalmente, una función recuerda dónde nació en una propiedad especial llamada `[[Environment]]`. Hace referencia al entorno léxico desde dónde se creó.

Pero cuando una función es creada usando `new Function`, su `[[Environment]]` no hace referencia al entorno léxico actual, sino al global.
=======

It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template, in complex web-applications.

## Closure

Usually, a function remembers where it was born in the special property `[[Environment]]`. It references the Lexical Environment from where it's created  (we covered that in the chapter <info:closure>).

But when a function is created using `new Function`, its `[[Environment]]` is set to reference not the current Lexical Environment, but the global one.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

So, such function doesn't have access to outer variables, only to the global ones.

```js run
function getFunc() {
  let valor = "test";

*!*
  let func = new Function('alert(valor)');
*/!*

  return func;
}

getFunc()(); // error: valor is not defined
```

Compáralo con el comportamiento normal:

```js run
function getFunc() {
  let valor = "test";

*!*
  let func = function() { alert(valor); };
*/!*

  return func;
}

getFunc()(); // *!*"test"*/!*, obtenido del entorno léxico de getFunc
```

Esta característica especial de `new Function` parece estraño, pero parece muy útil en la práctica.

Imagina que debemos crear una funcion apartir de una string. El código de dicha función no se conoce al momento de escribir el script (es por eso que no usamos funciones regulares), pero se conocerá en el proceso de ejecución. Podemos recibirlo del servidor o de otra fuente.

¿Quizás queremos que pueda acceder a las variables locales externas?

<<<<<<< HEAD
El problema es que antes de publicar el JavaScript a producción, este es comprimido usando un _minifier_ -- un programa especial que comprime código elimiando los comentarios extras, espacios -- y lo que es más importante, renombra las variables locales a otras más cortas.
=======
What if it could access the outer variables?
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Por ejemplo, si una función tiene `let userName`, el _minifier_ lo reemplaza a `let a` (o otra letra si esta está siendo utilizada), y lo hace en todas partes. Esto es normalmente una práctica segura, al ser una variable local, nada de fuera de la función puede acceder a ella. Y dentro de una función, el _minifier_ reemplaza todo lo que le menciona. Los Minificadores son inteligiente, ellos analizan la estructura del código, por lo tanto, no rompen nada. No realizan un simple buscar y reemplazar.

Pero, si `new Function` puede acceder a las variables externas, entonces no podría encontrar `userName`, ya que esto es pasada como un string _después_ de que el código haya sido minificado.

<<<<<<< HEAD
**Incluso si podemos acceder al entorno léxico con `new Function`, tendríamos problemas con los minificadores**

La "característica especial" de `new Function` nos salva de errores.

Y obliga a un mejor código. Si necesitamos pasarle algo a la función creada con `new Function`, debemos pasarle explícitamente como argumento.

Nuestra función "suma" lo hace bien:

```js run
*!*
let suma = new Function('a', 'b', 'return a + b');
*/!*

let a = 1, b = 2;

*!*
// outer values are passed as arguments
alert( sum(a, b) ); // 3
*/!*
```
## Resumen
=======
So if `new Function` had access to outer variables, it would be unable to find renamed  `userName`.

**If `new Function` had access to outer variables, it would have problems with minifiers.**

Besides, such code would be architecturally bad and prone to errors.

To pass something to a function, created as `new Function`, we should use its arguments.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

La sintáxis:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```
Por razones históricas, los argumentos también pueden ser pasados como una lista separada por comas.

<<<<<<< HEAD
Estos tres significan lo mismo:

```js
new Function('a', 'b', 'return a + b'); // sintáxis básica
=======
For historical reasons, arguments can also be given as a comma-separated list.

These three declarations mean the same:

```js
new Function('a', 'b', 'return a + b'); // basic syntax
new Function('a,b', 'return a + b'); // comma-separated
new Function('a , b', 'return a + b'); // comma-separated with spaces
```

Functions created with `new Function`, have `[[Environment]]` referencing the global Lexical Environment, not the outer one. Hence, they cannot use outer variables. But that's actually good, because it insures us from errors. Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
