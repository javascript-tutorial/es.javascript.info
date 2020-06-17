# Parámetros Rest y spread syntax

Muchas funciones incorporadas de JavaScript admiten una cantidad arbitraria de argumentos.

Por ejemplo:

- `Math.max(arg1, arg2, ..., argN)` -- devuelve el mayor de los argumentos.
- `Object.assign(dest, src1, ..., srcN)` -- copia propiedades desde `src1..N` a `dest`.
- ...y así.

En este capítulo aprenderemos cómo hacer lo mismo. Y también, cómo pasar Arrays a funciones tales como parámetros.

## Parámetros rest `...`

Se puede llamar a una función con cualquier número de argumentos, sin importar cómo se defina.

Como aquí:
```js run
function sum(a, b) {
  return a + b;
}

alert( sum(1, 2, 3, 4, 5) );
```

No habrá errores debido a argumentos "excesivos". Pero, por supuesto, en el resultado solo se contarán los dos primeros.

El resto de los parámetros se pueden incluir en la definición de la función utilizando tres puntos `...` seguidos del nombre del array que los contendrá. Los puntos literalmente significan "reunir los parámetros restantes en un Array".

Por ejemplo, para reunir todos los argumentos en el array `args`:

```js run
function sumAll(...args) { // args es el mismo para el array
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert( sumAll(1) ); // 1
alert( sumAll(1, 2) ); // 3
alert( sumAll(1, 2, 3) ); // 6
```

Podemos elegir obtener los primeros parámetros como variables y luego reunir solo el resto.

Aquí los dos primeros argumentos van a las variables y el resto va el array `titles`:

```js run
function showName(firstName, lastName, ...titles) {
  alert( firstName + ' ' + lastName ); // Julius Caesar

  // el resto va a el array titles:
  // ej: titles = ["Consul", "Imperator"]
  alert( titles[0] ); // Consul
  alert( titles[1] ); // Imperator
  alert( titles.length ); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
```

````warn header="Los parámetros rest deben estar al final"
Los parámetros rest recopilan todos los argumentos restantes, por lo que lo siguiente no tiene sentido y causa un error:

```js
function f(arg1, ...rest, arg2) { // arg2 after ...rest ?!
  // error
}
```

El parámetro `...rest` siempre debe ser último.
````

## La variable "argumentos"

También hay un objeto especial tipo array llamado `arguments` que contiene todos los argumentos por su índice.

Por ejemplo:

```js run
function showName() {
  alert( arguments.length );
  alert( arguments[0] );
  alert( arguments[1] );

  // Es iterable
  // for(let arg of arguments) alert(arg);
}

// muestra: 2, Julius, Caesar
showName("Julius", "Caesar");

// muestra: 1, Ilya, undefined (No hay segundo argumento)
showName("Ilya");
```

En los viejos tiempos, los *parámetros rest* no existían en el lenguaje, y el uso de `arguments` era la única forma de obtener todos los argumentos de la función. Y aún funciona, podemos encontrarlo en el código anterior.

Pero la desventaja es que aunque los `arguments` son a la vez como un Array e iterables, no es un Array. No admite métodos Array, por lo que no podemos llamar a `arguments.map(...)`.

Además, siempre contiene todos los argumentos. No podemos capturarlos parcialmente, como hicimos con los parámetros rest.

Entonces, cuando necesitamos estas características, se prefieren los parámetros rest.

````smart header="Arrow functions do not have `\"arguments\"`"
Si accedemos al objeto `arguments` desde una arrow function, los toma desde la función "normal" externa.

Aquí hay un ejemplo:

```js run
function f() {
  let showArg = () => alert(arguments[0]);
  showArg();
}

f(1); // 1
```

Como recordamos, las arrow functions no tienen su propio `this`. Ahora sabemos que tampoco tienen el objeto especial `arguments`.
````


## Spread syntax [#spread-syntax]

Acabamos de ver cómo obtener un Array de la lista de parámetros.

Pero a veces necesitamos hacer exactamente lo contrario.

Por ejemplo, hay una función incorporada [Math.max](mdn:js/Math/max) que devuelve el mayor número de una lista:

```js run
alert( Math.max(3, 5, 1) ); // 5
```

Ahora digamos que tenemos Array `[3, 5, 1]`. ¿Cómo llamamos a `Math.max` con él?

Pasarlo "como está" no funcionará, porque `Math.max` espera una lista de argumentos numéricos, no un solo Array:

```js run
let arr = [3, 5, 1];

*!*
alert( Math.max(arr) ); // NaN
*/!*
```

Y seguramente no podemos enumerar manualmente los elementos en el código `Math.max(arr [0], arr [1], arr [2])`, porque podemos no estar seguros de cuántos hay. A medida que se ejecuta nuestro script, podrían haber muchos o no podría haber ninguno. Y eso se pondría feo.

*Spread syntax* al rescate! Se ve similar a los parámetros rest, también usando `...`, pero hace todo lo contrario.

Cuando se usa `... arr` en la llamada a la función, "expande" un objeto iterable `arr` en la lista de argumentos.

Para `Math.max`:

```js run
let arr = [3, 5, 1];

alert( Math.max(...arr) ); // 5 (spread convierte el Array en una lista de argumentos)
```

También podemos pasar múltiples iterables de esta manera:

```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(...arr1, ...arr2) ); // 8
```

Incluso podemos combinar spread syntax con valores normales:


```js run
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert( Math.max(1, ...arr1, 2, ...arr2, 25) ); // 25
```

Además, spread syntax se puede utilizar para fusionar Arrays:

```js run
let arr = [3, 5, 1];
let arr2 = [8, 9, 15];

*!*
let merged = [0, ...arr, 2, ...arr2];
*/!*

alert(merged); // 0,3,5,1,2,8,9,15 (0, luego arr, luego 2, luego arr2)
```

En los ejemplos anteriores, utilizamos un Array para demostrar spread syntax, pero cualquier iterable funcionará.

Por ejemplo, aquí usamos spread syntax para convertir la cadena en un Array de caracteres:

```js run
let str = "Hello";

alert( [...str] ); // H,e,l,l,o
```

Spread syntax utiliza internamente iteradores para reunir elementos, de la misma manera que lo hace `for..of`.

Entonces, para un string, `for..of` devuelve caracteres y `...str` se convierte en `"H","e","l","l","o"`. La lista de caracteres se pasa al inicializador de array `[...str]`.

Para esta tarea en particular también podríamos usar `Array.from`, porque convierte un iterable (como un string) en un Array:

```js run
let str = "Hello";

// Array.from convierte un iterable en un array
alert( Array.from(str) ); // H,e,l,l,o
```

El resultado es el mismo que `[...str]`.

Pero hay una sutil diferencia entre `Array.from(obj)` y `[...obj]`:

- `Array.from` opera en ambos, arrays e iterables
- El spread syntax solo funciona con iterables.

Entonces, para la tarea de convertir algo en un array, `Array.from` tiende a ser más universal.

## Obtener una nueva copia de un objeto/array

Recuerdas cuando hablamos sobre `Object.assign()` [en el pasado](https://javascript.info/object#cloning-and-merging-object-assign)?

¡Es posible hacer lo mismo con el operador spread!


```js run
let arr = [1, 2, 3];
let arrCopy = [...arr]; // difunde el array en una lista de parámetros
                        // luego coloca el resultado en un nuevo array

// ¿Los Arrays tienen el mismo contenido?
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// ¿Los arrays son iguales?
alert(arr === arrCopy); // false (no es la misma referencia)

// Modificar nuestro array inicial no modifica la copia:
arr.push(4);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3
```

Tenga en cuenta que es posible hacer lo mismo para hacer una copia de un objeto:

```js run
let obj = { a: 1, b: 2, c: 3 };
let objCopy = { ...obj }; // difunde el array en una lista de parámetros
                          // luego coloca el resultado en un nuevo array

// ¿Los objetos tienen el mismo contenido?
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// ¿Son iguales los objetos?
alert(obj === objCopy); // false (no es la misma referencia)

// La modificación de nuestro objeto inicial no modifica la copia:
obj.d = 4;
alert(JSON.stringify(obj)); // {"a":1,"b":2,"c":3,"d":4}
alert(JSON.stringify(objCopy)); // {"a":1,"b":2,"c":3}
```

Esta forma de copiar un objeto es mucho más corta que `let objCopy = Object.assign({}, obj);` o para un array `let arrCopy = Object.assign ([], arr);` por lo que preferimos usarlo siempre que podamos.


## Resumen

Cuando vemos `" ... "` en el código, se trata de parámetros rest o de spread syntax.

Hay una manera fácil de distinguirlos:

- Cuando `...` está al final de los parámetros de la función, se trata de "parámetros rest" y reúne el resto de la lista de argumentos en un array.
- Cuando `...` ocurre en una llamada de función o similar, se llama "spread syntax" y expande un array en una lista.

Usar patrones:

- Parámetros rest se utilizan para crear funciones que aceptan cualquier número de argumentos.
- Spread syntax se utiliza para pasar un array a funciones que normalmente requieren una lista de muchos argumentos.

Juntos ayudan a viajar entre una lista y una variedad de parámetros con facilidad.

Todos los argumentos de una llamada a función también están disponibles en el "viejo estilo" `arguments`: objeto iterable tipo array.
