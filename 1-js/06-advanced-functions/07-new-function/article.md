
# La sintaxis "new Function"

Hay una forma más de crear una función. Raramente se usa, pero a veces no hay alternativa.

## Sintaxis

La sintaxis para crear una función:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

La función se crea con los argumentos `arg1 ... argN` y el cuerpo `functionBody` dado.

Es más fácil entender viendo un ejemplo: Aquí tenemos una función con dos argumentos:

```js run
let sumar = new Function('a', 'b', 'return a + b');

alert(sumar(1, 2)); // 3
```

Y aquí tenemos unaa función sin argumentos, con solo el cuerpo de la función:

```js run
let diHola = new Function('alert("Hola")');

diHola(); // Hola
```

La mayor diferencia sobre las otras maneras de crear funciones que hemos visto, es que la función se crea desde un string y es pasada en tiempo de ejecución.

Las declaraciones anteriores nos obliga a nosotros, los programadores, a escribir el código de la función en el script.

Pero `new Function` nos permite convertir cualquier string en una función. Por ejemplo, podemos recibir una nueva función desde el servidor y ejecutarlo.

```js
let str = ... recibir el código de un servidor dinámicamente ...

let func = new Function(str);
func();
```

Se utilizan en casos muy específicos, como cuando recibimos código de un servidor, o compilar dinámicamente una función a partir de una plantilla. La necesidad surge en etapas avanzadas de desarrollo.

## Closure

Normalmente, una función recuerda dónde nació en una propiedad especial llamada `[[Environment]]`, que hace referencia al entorno léxico desde dónde se creó.

Pero cuando una función es creada usando `new Function`, su `[[Environment]]` no hace referencia al entorno léxico actual, sino al global.

Entonces, tal función no tiene acceso a las variables externas, solo a las globales.

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

Esta característica especial de `new Function` parece extraña, pero resulta muy útil en la práctica.

Imagina que debemos crear una función a partir de una string. El código de dicha función no se conoce al momento de escribir el script (es por eso que no usamos funciones regulares), sino que se conocerá en el proceso de ejecución. Podemos recibirlo del servidor o de otra fuente.

Nuestra nueva función necesita interactuar con el script principal.

¿Qué pasa si pudiera acceder a las variables locales externas?

El problema es que antes de publicar el JavaScript a producción, este es comprimido usando un _minifier_ : un programa especial que comprime código eliminando los comentarios extras, espacios y, lo que es más importante, renombra las variables locales a otras más cortas.

Por ejemplo, si una función tiene `let userName`, el _minifier_ lo reemplaza con `let a` (u otra letra si ésta está siendo utilizada), y lo hace en todas partes. Esto normalmente es una práctica segura, porque al ser una variable local, nada de fuera de la función puede acceder a ella. Y dentro de una función, el _minifier_ reemplaza todo lo que la menciona. Los Minificadores son inteligentes, ellos analizan la estructura del código, por lo tanto, no rompen nada. No realizan un simple buscar y reemplazar.

Pero si `new Function` pudiera acceder a las variables externas, no podría encontrar la variable `userName` renombrada.

**Si `new Function` tuviera acceso a variables externas, tendríamos problemas con los minificadores**

Además, tal código sería una mala arquitectura y propensa a errores.

Para pasar algo a una función creada como `new Function`, debemos usar sus argumentos.

## Resumen

La sintaxis:

```js
let func = new Function ([arg1, arg2, ...argN], functionBody);
```

Por razones históricas, los argumentos también pueden ser pasados como una lista separada por comas.

Estas tres declaraciones significan lo mismo:

```js
new Function('a', 'b', 'return a + b'); // sintaxis básica
new Function('a,b', 'return a + b'); // separación por comas
new Function('a , b', 'return a + b'); // separación por comas con espacios
```

Las funciones creadas con `new Function`, tienen `[[Environment]]` haciendo referencia a ambiente léxico global, no al externo. En consecuencia no pueden usar variables externas. Pero eso es en realidad algo bueno, porque nos previene de errores. Pasar parámetros explícitamente es mucho mejor arquitectónicamente y no causa problemas con los minificadores.
