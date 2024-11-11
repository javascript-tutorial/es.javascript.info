# Variables

La mayoría del tiempo, una aplicación de JavaScript necesita trabajar con información. Aquí hay 2 ejemplos:
1. Una tienda en línea -- La información puede incluir los bienes a la venta y un "carrito de compras".
2. Una aplicación de chat -- La información puede incluir los usuarios, mensajes, y mucho más.

Utilizamos las variables para almacenar esta información.

## Una variable

Una [variable](https://es.wikipedia.org/wiki/Variable_(programaci%C3%B3n)) es un "almacén con un nombre" para guardar datos. Podemos usar variables para almacenar golosinas, visitantes, y otros datos.


Para generar una variable en JavaScript, se usa la palabra clave `let`.

La siguiente declaración genera (en otras palabras: *declara* o *define*) una variable con el nombre "message":
```js
let message;
```

Ahora podemos introducir datos en ella al utilizar el operador de asignación `=`:

```js
let message;

*!*
message = 'Hola'; // almacenar la cadena 'Hola' en la variable llamada message
*/!*
```

La cadena ahora está almacenada en el área de la memoria asociada con la variable. La podemos acceder utilizando el nombre de la variable:

```js run
let message;
message = 'Hola!';

*!*
alert(message); // muestra el contenido de la variable
*/!*
```

Para ser concisos, podemos combinar la declaración de la variable y su asignación en una sola línea:

```js run
let message = 'Hola!'; // define la variable y asigna un valor

alert(message); // Hola!
```

También podemos declarar variables múltiples en una sola línea:

```js no-beautify
let user = 'John', age = 25, message = 'Hola';
```

Esto puede parecer más corto, pero no lo recomendamos. Por el bien de la legibilidad, por favor utiliza una línea por variable.

La versión de líneas múltiples es un poco más larga, pero se lee más fácil:

```js
let user = 'John';
let age = 25;
let message = 'Hola';
```

Algunas personas también definen variables múltiples en estilo multilínea:

```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hola';
```

...Incluso en este estilo "coma primero":

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hola';
```

Técnicamente, todas estas variantes hacen lo mismo. Así que, es cuestión de gusto personal y preferencia estética.

````smart header="`var` en vez de `let`"
En scripts más viejos, a veces se encuentra otra palabra clave: `var` en lugar de `let`:

```js
*!*var*/!* mensaje = 'Hola';
```

<<<<<<< HEAD
La palabra clave `var` es *casi* lo mismo que `let`. También hace la declaración de una variable, aunque de un modo ligeramente distinto, y más antiguo.

Existen sutiles diferencias entre `let` y `var`, pero no nos interesan en este momento. Cubriremos el tema a detalle en el capítulo <info:var>.
=======
The `var` keyword is *almost* the same as `let`. It also declares a variable but in a slightly different, "old-school" way.

There are subtle differences between `let` and `var`, but they do not matter to us yet. We'll cover them in detail in the chapter <info:var>.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

## Una analogía de la vida real

Podemos comprender fácilmente el concepto de una "variable" si nos la imaginamos como una "caja" con una etiqueta de nombre único pegada en ella.

<<<<<<< HEAD
Por ejemplo, podemos imaginar la variable `message` como una caja etiquetada `"message"` con el valor `"Hola!"` adentro:
=======
For instance, the variable `message` can be imagined as a box labelled `"message"` with the value `"Hello!"` in it:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

![](variable.svg)

Podemos introducir cualquier valor a la caja.

También la podemos cambiar cuantas veces queramos:

```js run
let message;

message = 'Hola!';

message = 'Mundo!'; // valor alterado

alert(message);
```

Cuando el valor ha sido alterado, los datos antiguos serán removidos de la variable:

![](variable-change.svg)

También podemos declarar dos variables y copiar datos de una a la otra.

```js run
let hello = 'Hola mundo!';

let message;

*!*
// copia 'Hola mundo' de hello a message
message = hello;
*/!*

// Ahora, ambas variables contienen los mismos datos
alert(hello); // Hola mundo!
alert(message); // Hola mundo!
```

````warn header="Declarar dos veces lanza un error"
Una variable debe ser declarada solamente una vez.

Una declaración repetida de la misma variable es un error:

```js run
let message = "This";

// 'let' repetidos lleva a un error
let message = "That"; // SyntaxError: 'message' ya fue declarado
```
Debemos declarar una variable una sola vez y desde entonces referirnos a ella sin `let`.
````

```smart header="Lenguajes funcionales"
Es interesante notar la existencia de la [programación funcional](https://es.wikipedia.org/wiki/Programaci%C3%B3n_funcional). Los lenguajes funcionales "puros", como [Haskell](https://es.wikipedia.org/wiki/Haskell), prohíben cambiar el valor de las variables.

En tales lenguajes, una vez que la variable ha sido almacenada "en la caja", permanece allí por siempre. Si necesitamos almacenar algo más, el lenguaje nos obliga a crear una nueva caja (generar una nueva variable). No podemos reusar la antigua.

Aunque a primera vista puede parecer un poco extraño, estos lenguajes son muy capaces de desarrollo serio. Más aún: existen áreas, como la computación en paralelo, en las cuales esta limitación otorga ciertas ventajas.
```

## Nombramiento de variables [#variable-naming]

Existen dos limitaciones de nombre de variables en JavaScript:

1. El nombre únicamente puede incluir letras, dígitos, o los símbolos `$` y `_`.
2. El primer carácter no puede ser un dígito.

Ejemplos de nombres válidos:

```js
let userName;
let test123;
```

Cuando el nombre contiene varias palabras, se suele usar el estilo [camelCase](https://es.wikipedia.org/wiki/Camel_case) (capitalización en camello), donde las palabras van pegadas una detrás de otra, con cada inicial en mayúscula: `miNombreMuyLargo`.

Es interesante notar que el símbolo del dólar `'$'` y el guion bajo `'_'` también se utilizan en nombres. Son símbolos comunes, tal como las letras, sin ningún significado especial.

Los siguientes nombres son válidos:

```js run untrusted
let $ = 1; // Declara una variable con el nombre "$"
let _ = 2; // y ahora una variable con el nombre "_"

alert($ + _); // 3
```

Ejemplos de nombres incorrectos:

```js no-beautify
let 1a; // no puede iniciar con un dígito

let my-name; // los guiones '-' no son permitidos en nombres
```

```smart header="La Capitalización es Importante"
Dos variables con nombres `manzana` y `MANZANA` son variables distintas.
```

<<<<<<< HEAD
````smart header="Las letras que no son del alfabeto inglés están permitidas, pero no se recomiendan"
Es posible utilizar letras de cualquier alfabeto, incluyendo letras del cirílico, logogramas chinos, etc.:
=======
````smart header="Non-Latin letters are allowed, but not recommended"
It is possible to use any language, including Cyrillic letters, Chinese logograms and so on, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let имя = '...';
let 我 = '...';
```

<<<<<<< HEAD
Técnicamente, no existe ningún error aquí. Tales nombres están permitidos, pero existe una tradición internacional de utilizar inglés en el nombramiento de variables. Incluso si estamos escribiendo un script pequeño, este puede tener una larga vida por delante. Puede ser necesario que gente de otros países deba leerlo en algún momento.
=======
Technically, there is no error here. Such names are allowed, but there is an international convention to use English in variable names. Even if we're writing a small script, it may have a long life ahead. People from other countries may need to read it sometime.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
````

````warn header="Nombres reservados"
Hay una [lista de palabras reservadas](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), las cuales no pueden ser utilizadas como nombre de variable porque el lenguaje en sí las utiliza.

Por ejemplo: `let`, `class`, `return`, y `function` están reservadas.

El siguiente código nos da un error de sintaxis:

```js run no-beautify
let let = 5; // no se puede le nombrar "let" a una variable  ¡Error!
let return = 5; // tampoco se le puede nombrar "return", ¡Error!
```
````

````warn header="Una asignación sin utilizar `use strict`"

Normalmente, debemos definir una variable antes de utilizarla. Pero, en los viejos tiempos, era técnicamente posible crear una variable simplemente asignando un valor sin utilizar 'let'. Esto aún funciona si no ponemos 'use strict' en nuestros scripts para mantener la compatibilidad con scripts antiguos.

```js run no-strict
// nota: no se utiliza "use strict" en este ejemplo

num = 5; // se crea la variable "num" si no existe antes

alert(num); // 5
```

Esto es una mala práctica que causaría errores en 'strict mode':

```js
"use strict";

*!*
num = 5; // error: num no está definida
*/!*
```
````

## Constantes

Para declarar una variable constante (inmutable) use `const` en vez de `let`:

```js
const myBirthday = '18.04.1982';
```

Las variables declaradas utilizando `const` se llaman "constantes". No pueden ser alteradas. Al intentarlo causaría un error:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // ¡error, no se puede reasignar la constante!
```

<<<<<<< HEAD
Cuando un programador está seguro de que una variable nunca cambiará, puede declarar la variable con `const` para garantizar y comunicar claramente este hecho a todos.
=======
When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and communicate that fact to everyone.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

### Constantes mayúsculas

<<<<<<< HEAD
Existe una práctica utilizada ampliamente de utilizar constantes como aliases de valores difíciles-de-recordar y que se conocen previo a la ejecución.
=======
There is a widespread practice to use constants as aliases for difficult-to-remember values that are known before execution.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Tales constantes se nombran utilizando letras mayúsculas y guiones bajos.

Por ejemplo, creemos constantes para los colores en el formato "web" (hexadecimal):

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...cuando debemos elegir un color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Ventajas:

- `COLOR_ORANGE` es mucho más fácil de recordar que `"#FF7F00"`.
- Es mucho más fácil escribir mal `"#FF7F00"` que `COLOR_ORANGE`.
- Al leer el código, `COLOR_ORANGE` tiene mucho más significado que `#FF7F00`.

¿Cuándo se deben utilizar letras mayúsculas para una constante, y cuando se debe nombrarla de manera normal? Dejémoslo claro.

<<<<<<< HEAD
Ser una "constante" solo significa que el valor de la variable nunca cambia. Pero hay constantes que son conocidas previo a la ejecución (como el valor hexadecimal del color rojo) y hay constantes que son *calculadas* en el tiempo de ejecución, pero no cambian después de su asignación inicial.
=======
Being a "constant" just means that a variable's value never changes. But some constants are known before execution (like a hexadecimal value for red) and some constants are *calculated* in run-time, during the execution, but do not change after their initial assignment.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Por ejemplo:

```js
const pageLoadTime = /* el tiempo que tardó la página web para cargar */;
```

<<<<<<< HEAD
El valor de `pageLoadTime` no se conoce antes de cargar la página, así que la nombramos normalmente. No obstante, es una constante porque no cambia después de su asignación inicial.
=======
The value of `pageLoadTime` is not known before the page load, so it's named normally. But it's still a constant because it doesn't change after the assignment.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

En otras palabras, las constantes con nombres en mayúscula son utilizadas solamente como alias para valores invariables y preestablecidos ("hard-coded").

## Nombrar cosas correctamente

Estando en el tema de las variables, existe una cosa de mucha importancia.

Una variable debe tener un nombre claro, de significado evidente, que describa el dato que almacena.

<<<<<<< HEAD
Nombrar variables es una de las habilidades más importantes y complejas en la programación. Un vistazo rápido a el nombre de las variables nos revela cuál código fue escrito por un principiante o por un desarrollador experimentado.

En un proyecto real, la mayor parte de el tiempo se pasa modificando y extendiendo una base de código en vez de empezar a escribir algo desde cero. Cuando regresamos a algún código después de hacer algo distinto por un rato, es mucho más fácil encontrar información que está bien etiquetada. O, en otras palabras, cuando las variables tienen nombres adecuados.
=======
Variable naming is one of the most important and complex skills in programming. A glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labelled. Or, in other words, when the variables have good names.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

Por favor pasa tiempo pensando en el nombre adecuado para una variable antes de declararla. Hacer esto te da un retorno muy sustancial.

Algunas reglas buenas para seguir:

<<<<<<< HEAD
- Use términos legibles para humanos como `userName` p `shoppingCart`.
- Evite abreviaciones o nombres cortos `a`, `b`, `c`, al menos que en serio sepa lo que está haciendo.
- Cree nombres que describen al máximo lo que son y sean concisos. Ejemplos que no son adecuados son `data` y `value`. Estos nombres no nos dicen nada. Estos solo está bien usarlos en el contexto de un código que deje excepcionalmente obvio cuál valor o cuales datos está referenciando la variable.
- Acuerda en tu propia mente y con tu equipo cuáles términos se utilizarán. Si a un visitante se le llamara "user", debemos llamar las variables relacionadas `currentUser` o `newUser` en vez de `currentVisitor` o `newManInTown`.
=======
- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, and `c`, unless you know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

¿Suena simple? De hecho lo es, pero no es tan fácil crear nombres de variables descriptivos y concisos a la hora de practicar. Inténtelo.

```smart header="¿Reusar o crear?"
Una última nota. Existen programadores haraganes que, en vez de declarar una variable nueva, tienden a reusar las existentes.

El resultado de esto es que sus variables son como cajas en las cuales la gente introduce cosas distintas sin cambiar sus etiquetas. ¿Que existe dentro de la caja? ¿Quién sabe? Necesitamos acercarnos y revisar.

Dichos programadores se ahorran un poco durante la declaración de la variable, pero pierden diez veces más a la hora de depuración.

Una variable extra es algo bueno, no algo malvado.

Los minificadores de JavaScript moderno, y los navegadores optimizan el código suficientemente bien para no generar cuestiones de rendimiento. Utilizar diferentes variables para distintos valores incluso puede ayudar a optimizar su código
```

## Resumen

Podemos declarar variables para almacenar datos al utilizar las palabra clave `var`, `let`, o `const`.

- `let` -- es la forma moderna de declaración de una variable.
- `var` -- es la declaración de variable de vieja escuela. Normalmente no lo utilizamos en absoluto. Cubriremos sus sutiles diferencias con `let` en el capítulo <info:var>, por si lo necesitaras.
- `const` -- es como `let`, pero el valor de la variable no puede ser alterado.

Las variables deben ser nombradas de tal manera que entendamos fácilmente lo que está en su interior.
