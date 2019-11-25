# La sintáxis "new Function"

Existe más de una manera de crear una función. Raramente usada, pero en ocasiones no tenemos otra alternativa.

## Sintáxis

La sintáxis para crear una función:

```js
let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

En otras palabras, los parámetros de la función (o, para ser más precisos, los nombres de los parámetros) van primero, y luego el cuerpo de la función. Todos los argumentos son de tipo strings

Es más fácil entender viendo un ejemplo: Aquí tenemos una función con dos argumentos:

```js run
let sumar = new Function('a', 'b', 'return a + b');

alert(sumar(1, 2)); // 3
```

Si no hay argumentos, entonces hay sólo un único argumento, el cuerpo de la función sería:

```js run
let diHola = new Function('alert("Hola")');

diHola(); // Hola
```

La mayor diferencia sobre las otras maneras de crear funciones que hemos visto, es que la función se crea literalmente con un string y es pasada en tiempo de ejecución.

Las declaraciones anteriores nos obliga a nosotros, los programadores, a escribir el código de la función en el script.

Pero `new Function` nos permite convertir cualquier string en una función. Por ejemplo, podemos recibir una nueva función desde el servidor y ejecutarlo.

```js
let str = ... recibir el código de un servidor dinámicamente ...

let func = new Function(str);
func();
```

Se utilizan en casos muy específicos, como cuando recibimos código de un servidor, o compilar dinámicamente una función a partir de una plantilla. La necesidad surge en etapas avanzadas de desarrollo.

## Closure

Normalmente, una función recuerda dónde nació en una propiedad especial llamada `[[Environment]]`. Hace referencia al entorno léxico desde dónde se creó.

Pero cuando una función es creada usando `new Function`, su `[[Environment]]` no hace referencia al entorno léxico actual, sino al global.

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

El problema es que antes de publicar el JavaScript a producción, este es comprimido usando un _minifier_ -- un programa especial que comprime código elimiando los comentarios extras, espacios -- y lo que es más importante, renombra las variables locales a otras más cortas.

Por ejemplo, si una función tiene `let userName`, el _minifier_ lo reemplaza a `let a` (o otra letra si esta está siendo utilizada), y lo hace en todas partes. Esto es normalmente una práctica segura, al ser una variable local, nada de fuera de la función puede acceder a ella. Y dentro de una función, el _minifier_ reemplaza todo lo que le menciona. Los Minificadores son inteligiente, ellos analizan la estructura del código, por lo tanto, no rompen nada. No realizan un simple buscar y reemplazar.

Pero, si `new Function` puede acceder a las variables externas, entonces no podría encontrar `userName`, ya que esto es pasada como un string _después_ de que el código haya sido minificado.

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

La sintáxis:

```js
let func = new Function(arg1, arg2, ..., body);
```

Por razones históricas, los argumentos también pueden ser pasados como una lista separada por comas.

Estos tres significan lo mismo:

```js
new Function('a', 'b', 'return a + b'); // sintáxis básica
new Function('a,b', 'return a + b'); // separados por coma
new Function('a , b', 'return a + b'); // separados por coma y espacios
```

Las funciones creadas con `new Function`, tienen un `[[Environment]]` que hace referencia al entorno léxico global, no al exterior. Por lo tanto, no pueden usar las variables externas. Pero en realidad eso es bueno, porque nos salva de errores. Pasar parámetros explícitamente es un método mucho mejor arquitectónicamente y no provoca problemas con los minificadores.
