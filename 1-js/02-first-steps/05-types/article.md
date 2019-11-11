<<<<<<< HEAD
# Tipos de datos

Una variable en JavaScript puede contener cualquier dato. Una variable puede ser una cadena en un momento dado y en otro, un número:

```js
// no hay error
let message = "hola";
message = 123456;
```

Los lenguajes de programación que permiten estas cosas se denominan "dinámicamente tipeados", lo que significa que hay tipos de datos, pero las variables no están vinculadas a ninguno de ellos.

Hay siete tipos de datos básicos en JavaScript. Aquí, los cubriremos en general y en los próximos capítulos hablaremos de cada uno de ellos detalladamente.

## Un number
```js
let n = 123;
n = 12.345;
```

El tipo *number* (número) representa tanto números enteros como de punto flotante.

Hay muchas operaciones para números, por ejemplo, multiplicación `*`, división `/`, suma `+`, resta `-`, y demás.

Además de los números comunes, existen los llamados "valores numéricos especiales" que también pertenecen a este tipo de dato: `Infinity`, `-Infinity` and `NaN`.


- `Infinity` representa el [Infinito](https://es.wikipedia.org/wiki/Infinito) matemático ∞. Es un valor especial que es mayor que cualquier número.

    Podemos obtenerlo como resultado de la división por cero:

    ```js run
    alert( 1 / 0 ); // Infinito
    ```

    O simplemente hacer referencia a ello directamente:

    ```js run
    alert( Infinity ); // Infinito
    ```
- `NaN` representa un error de cálculo. Es el resultado de una operación matemática incorrecta o indefinida, por ejemplo:

    ```js run
    alert( "no es un número" / 2 ); // NaN, tal división es errónea
    ```

    `NaN` es "pegajoso". Cualquier otra operación sobre `NaN` retorna `NaN`:

    ```js run
    alert( "no es un número" / 2 + 5); // NaN
    ```

    Por lo tanto, si hay un `NaN` en alguna parte de una expresión matemática, se propaga a todo el resultado.

```smart header="Las operaciones matemáticas son seguras"
Hacer matemáticas es "seguro" en JavaScript. Podemos hacer cualquier cosa: dividir por cero, tratar las cadenas no numéricas como números, etc.

El script nunca se detendrá con un error fatal ("morir"). En el peor de los casos, obtendremos `NaN` como resultado.
```

Los valores numéricos especiales pertenecen formalmente al tipo "número". Por supuesto que no son números en el sentido estricto de la palabra.

Veremos más sobre el trabajo con números en el capítulo <info:number>.

## Un string

Un string (cadena de caracteres) en JavaScript debe estar encerrado entre comillas.

```js
let str = "Hola";
let str2 = 'Las comillas simples también están bien';
let phrase = `puede incrustar ${str}`;
```

En JavaScript, hay 3 tipos de comillas.

1. Comillas dobles: `"Hola"`.
2. Comillas simples: `'Hola'`.
3. Backticks (acento grave): <code>&#96;Hola&#96;</code>.

Las comillas dobles y simples son comillas "simples". No hay diferencia entre ellas en JavaScript.

Los Backticks son comillas de "funcionalidad extendida". Nos permiten incrustar variables y expresiones en una cadena de caracteres encerrándolas en `${...}`, por ejemplo:

```js run
let name = "Juan";

// incrustar una variable
alert( `Hola, *!*${name}*/!*!` ); // Hola, John!

// incrustar una expresión
alert( `el resultado es *!*${1 + 2}*/!*` ); //el resultado es 3
```

La expresión dentro de `${...}` se evalúa y el resultado pasa a formar parte de la cadena. Podemos poner cualquier cosa ahí dentro: una variable como `name`, una expresión aritmética como `1 + 2`, o algo más complejo.

Tenga en cuenta que esto sólo se puede hacer en los "backticks". Otras comillas no tienen esta capacidad de incrustación!
```js run
alert( "el resultado es ${1 + 2}" ); // el resultado es ${1 + 2} (las comillas dobles no hacen nada)
```

En el capítulo <info:string> trataremos más a fondo las cadenas.

```smart header="No existe el tipo *carácter*".
En algunos idiomas, hay un tipo especial "carácter" para un solo carácter. Por ejemplo, en el lenguaje C y en Java es `char`.

En JavaScript no existe tal tipo. Sólo hay un tipo: `string`. Una cadena puede estar formada por un solo carácter o por varios de ellos.
```

## Un boolean (tipo lógico)

El tipo boolean (booleano) tiene sólo dos valores: `verdadero` y `falso`.

Este tipo se utiliza comúnmente para almacenar valores de sí/no: `verdadero` significa "sí, correcto", y `falso` significa "no, incorrecto".

Por ejemplo:

```js
let nameFieldChecked = true; // sí, el campo name está marcado
let ageFieldChecked = false; // no, el campo age no está marcado
```

Los valores booleanos también son el resultado de comparaciones:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // verdadero (el resultado de la comparación es "sí")
```

En el capítulo <info:logical-operators> trataremos más a fondo el tema de los booleanos.

## El valor "null" (nulo)

El valor especial `null` no pertenece a ninguno de los tipos descritos anteriormente.

Forma un tipo propio separado que contiene sólo el valor `null`:

```js
let age = null;
```

En JavaScript, `null` no es una "referencia a un objeto inexistente" o un "puntero nulo" como en otros lenguajes.

Es sólo un valor especial que representa "nada", "vacío" o "valor desconocido".

El código anterior indica que la "edad" es desconocida o está vacía por alguna razón.

## El valor "undefined" (indefinido)

El valor especial `undefined` también se distingue. Hace un tipo propio, igual que `null`.

El significado de `undefined` es "valor no asignado".

Si una variable es declarada pero no asignada, entonces su valor es `undefined`:

```js run
let x;

alert(x); // muestra "undefined"
```

Técnicamente, es posible asignar `undefined` a cualquier variable:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

...Pero no recomendamos hacer eso. Normalmente, usamos `null` para asignar un valor "vacío" o "desconocido" a una variable, y usamos `undefined` para chequeos como ver si una variable ha sido asignada.

## Objects y symbols

El tipo `object` (objeto) es especial.

Todos los demás tipos se llaman "primitivos" porque sus valores pueden contener una sola cosa (ya sea una cadena,  un número o lo que sea). Por el contrario, los objetos se utilizan para almacenar colecciones de datos y entidades más complejas. Nos ocuparemos de ellos más adelante en el capítulo <info:object> después de aprender más sobre los primitivos.

El tipo `symbol` (símbolo) se utiliza para crear identificadores únicos para los objetos. Tenemos que mencionarlo aquí para una mayor completitud, pero es mejor estudiar este tipo después de los objetos.

## El operador typeof [#type-typeof]

El operador `typeof` retorna el tipo del argumento. Es útil cuando queremos procesar valores de diferentes tipos de forma diferente o simplemente queremos hacer una comprobación rápida.

Soporta dos formas de sintaxis:

1. Como operador: `typeof x`.
2. Como una función: `typeof(x)`.

En otras palabras, funciona con paréntesis o sin ellos. El resultado es el mismo.

La llamada a `typeof x` devuelve una cadena con el nombre del tipo:

```js
typeof undefined // "undefined" (indefinido)

typeof 0 // "number" (número)

typeof true // "boolean" (booleano)

typeof "foo" // "string" (cadena)

typeof Symbol("id") // "symbol" (símbolo)

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

Las últimas tres líneas pueden necesitar una explicación adicional:

1. `Math` es un objeto incorporado (built-in) que proporciona operaciones matemáticas. Lo aprenderemos en el capítulo <info:number>. Aquí, sólo sirve como ejemplo de un objeto.
2. El resultado de `typeof null` es `"object"`. Esto es incorrecto, es un error oficialmente reconocido de `typeof` que se mantiene por cuestiones de compatibilidad. Por supuesto, `null` no es un objeto. Es un valor especial con un tipo propio separado. Así que, de nuevo, esto es un error en el lenguaje.
3. El resultado de `typeof alert` es `"function"`, porque `alert` es una función del lenguaje. Estudiaremos las funciones en los próximos capítulos donde veremos que no hay ningún tipo especial "function" en JavaScript. Las funciones pertenecen al tipo objeto. Pero `typeof` las trata de manera diferente. Formalmente, es incorrecto, pero muy conveniente en la práctica.


## Resumen

Hay 7 tipos básicos en JavaScript.

- `number` para números de cualquier tipo: enteros o en punto flotante.
- `string` para cadenas. Una cadena puede tener uno o más caracteres, no hay un tipo especial para un único carácter.
- `boolean` para `verdadero`/`falso`.
- `null` para valores desconocidos -- un tipo independiente que tiene un solo valor `nulo`.
- `undefined` para valores no asignados -- un tipo independiente que tiene un único valor `indefinido`.
- `object` para estructuras de datos más complejas.
- `symbol` para identificadores únicos.

El operador `typeof` nos permite ver qué tipo está almacenado en una variable.

- Dos formas: `typeof x` o `typeof(x)`.
- Retorna una cadena con el nombre del tipo, por ejemplo `"string"`.
- Para `null` retorna `"object"` -- esto es un error en el lenguaje, en realidad no es un objeto.

En los siguientes capítulos, nos concentraremos en los valores primitivos y una vez que nos familiaricemos con ellos, pasaremos a los objetos.
=======
# Data types

A variable in JavaScript can contain any data. A variable can at one moment be a string and at another be a number:

```js
// no error
let message = "hello";
message = 123456;
```

Programming languages that allow such things are called "dynamically typed", meaning that there are data types, but variables are not bound to any of them.

There are seven basic data types in JavaScript. Here, we'll cover them in general and in the next chapters we'll talk about each of them in detail.

## A number

```js
let n = 123;
n = 12.345;
```

The *number* type represents both integer and floating point numbers.

There are many operations for numbers, e.g. multiplication `*`, division `/`, addition `+`, subtraction `-`, and so on.

Besides regular numbers, there are so-called "special numeric values" which also belong to this data type: `Infinity`, `-Infinity` and `NaN`.

- `Infinity` represents the mathematical [Infinity](https://en.wikipedia.org/wiki/Infinity) ∞. It is a special value that's greater than any number.

    We can get it as a result of division by zero:

    ```js run
    alert( 1 / 0 ); // Infinity
    ```

    Or just reference it directly:

    ```js run
    alert( Infinity ); // Infinity
    ```
- `NaN` represents a computational error. It is a result of an incorrect or an undefined mathematical operation, for instance:

    ```js run
    alert( "not a number" / 2 ); // NaN, such division is erroneous
    ```

    `NaN` is sticky. Any further operation on `NaN` returns `NaN`:

    ```js run
    alert( "not a number" / 2 + 5 ); // NaN
    ```

    So, if there's a `NaN` somewhere in a mathematical expression, it propagates to the whole result.

```smart header="Mathematical operations are safe"
Doing maths is "safe" in JavaScript. We can do anything: divide by zero, treat non-numeric strings as numbers, etc.

The script will never stop with a fatal error ("die"). At worst, we'll get `NaN` as the result.
```

Special numeric values formally belong to the "number" type. Of course they are not numbers in the common sense of this word.

We'll see more about working with numbers in the chapter <info:number>.

## A string

A string in JavaScript must be surrounded by quotes.

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed ${str}`;
```

In JavaScript, there are 3 types of quotes.

1. Double quotes: `"Hello"`.
2. Single quotes: `'Hello'`.
3. Backticks: <code>&#96;Hello&#96;</code>.

Double and single quotes are "simple" quotes. There's no difference between them in JavaScript.

Backticks are "extended functionality" quotes. They allow us to embed variables and expressions into a string by wrapping them in `${…}`, for example:

```js run
let name = "John";

// embed a variable
alert( `Hello, *!*${name}*/!*!` ); // Hello, John!

// embed an expression
alert( `the result is *!*${1 + 2}*/!*` ); // the result is 3
```

The expression inside `${…}` is evaluated and the result becomes a part of the string. We can put anything in there: a variable like `name` or an arithmetical expression like `1 + 2` or something more complex.

Please note that this can only be done in backticks. Other quotes don't have this embedding functionality!
```js run
alert( "the result is ${1 + 2}" ); // the result is ${1 + 2} (double quotes do nothing)
```

We'll cover strings more thoroughly in the chapter <info:string>.

```smart header="There is no *character* type."
In some languages, there is a special "character" type for a single character. For example, in the C language and in Java it is `char`.

In JavaScript, there is no such type. There's only one type: `string`. A string may consist of only one character or many of them.
```

## A boolean (logical type)

The boolean type has only two values: `true` and `false`.

This type is commonly used to store yes/no values: `true` means "yes, correct", and `false` means "no, incorrect".

For instance:

```js
let nameFieldChecked = true; // yes, name field is checked
let ageFieldChecked = false; // no, age field is not checked
```

Boolean values also come as a result of comparisons:

```js run
let isGreater = 4 > 1;

alert( isGreater ); // true (the comparison result is "yes")
```

We'll cover booleans more deeply in the chapter <info:logical-operators>.

## The "null" value

The special `null` value does not belong to any of the types described above.

It forms a separate type of its own which contains only the `null` value:

```js
let age = null;
```

In JavaScript, `null` is not a "reference to a non-existing object" or a "null pointer" like in some other languages.

It's just a special value which represents "nothing", "empty" or "value unknown".

The code above states that `age` is unknown or empty for some reason.

## The "undefined" value

The special value `undefined` also stands apart. It makes a type of its own, just like `null`.

The meaning of `undefined` is "value is not assigned".

If a variable is declared, but not assigned, then its value is `undefined`:

```js run
let x;

alert(x); // shows "undefined"
```

Technically, it is possible to assign `undefined` to any variable:

```js run
let x = 123;

x = undefined;

alert(x); // "undefined"
```

...But we don't recommend doing that. Normally, we use `null` to assign an "empty" or "unknown" value to a variable, and we use `undefined` for checks like seeing if a variable has been assigned.

## Objects and Symbols

The `object` type is special.

All other types are called "primitive" because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities. We'll deal with them later in the chapter <info:object> after we learn more about primitives.

The `symbol` type is used to create unique identifiers for objects. We mention it here for completeness, but we'll study it after objects.

## The typeof operator [#type-typeof]

The `typeof` operator returns the type of the argument. It's useful when we want to process values of different types differently or just want to do a quick check.

It supports two forms of syntax:

1. As an operator: `typeof x`.
2. As a function: `typeof(x)`.

In other words, it works with parentheses or without them. The result is the same.

The call to `typeof x` returns a string with the type name:

```js
typeof undefined // "undefined"

typeof 0 // "number"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

*!*
typeof Math // "object"  (1)
*/!*

*!*
typeof null // "object"  (2)
*/!*

*!*
typeof alert // "function"  (3)
*/!*
```

The last three lines may need additional explanation:

1. `Math` is a built-in object that provides mathematical operations. We will learn it in the chapter <info:number>. Here, it serves just as an example of an object.
2. The result of `typeof null` is `"object"`. That's wrong. It is an officially recognized error in `typeof`, kept for compatibility. Of course, `null` is not an object. It is a special value with a separate type of its own. So, again, this is an error in the language.
3. The result of `typeof alert` is `"function"`, because `alert` is a function. We'll study functions in the next chapters where we'll also see that there's no special "function" type in JavaScript. Functions belong to the object type. But `typeof` treats them differently, returning `"function"`. That's not quite correct, but very convenient in practice.


## Summary

There are 7 basic data types in JavaScript.

- `number` for numbers of any kind: integer or floating-point.
- `string` for strings. A string may have one or more characters, there's no separate single-character type.
- `boolean` for `true`/`false`.
- `null` for unknown values -- a standalone type that has a single value `null`.
- `undefined` for unassigned values -- a standalone type that has a single value `undefined`.
- `object` for more complex data structures.
- `symbol` for unique identifiers.

The `typeof` operator allows us to see which type is stored in a variable.

- Two forms: `typeof x` or `typeof(x)`.
- Returns a string with the name of the type, like `"string"`.
- For `null` returns `"object"` -- this is an error in the language, it's not actually an object.

In the next chapters, we'll concentrate on primitive values and once we're familiar with them, we'll move on to objects.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd
