# Variables

La mayor parte del tiempo, una aplicación JavaScript necesita trabajar con información. Aquí hay dos ejemplos:
1. Una tienda online -- La información puede incluir bienes vendidos y un carrito de compras.
2. Una aplicación de chat -- La información puede incluir usuarios, mensajes, y mucho mas.

Las variables son usadas para almacenar esta información.

## Una variable

Una [variable](https://en.wikipedia.org/wiki/Variable_(computer_science)) es un "nombre de almacenamiento" para datos. Podemos usar variables para almacenar golosinas, visitantes, y otros datos.

Para crear una variable en JavaScript, usa la palabra clave `let`.

La siguiente declaración crea (en otras palabras: *declara* o *define*) una variable con el nombre "message":

```js
let message;
```

Ahora, podemos poner algunos datos dentro de ella usando el operador de asignación `=`:

```js
let message;

*!*
message = 'Hello'; // almacena la cadena
*/!*
```

La cadena ahora es guardada en el área de memoria asociada con la variable. Podemos acceder a ella usando el nombre de la variable:

```js run
let message;
message = 'Hello!';

*!*
alert(message); // muestra el contenido de la variable
*/!*
```

Para ser conciso, podemos combinar la variable declarada y la asignación en una sola línea.:

```js run
let message = 'Hello!'; // define la variable y asigna el valor

alert(message); // Hello!
```

También podemos declarar múltiples variables en una sola linea:

```js no-beautify
let user = 'John', age = 25, message = 'Hello';
```

Eso puede parecer mas corto, pero no es recomendable. Para una mejor legibilidad, por favor usa una sola linea por variable.

Las variables multilinea es un poco mas larga, pero mas facil de leer:

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

Algunas personas también definen múltiples variables en este estilo multilinea:
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hello';
```

...O incluso en el estilo de "comas-primero":

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hello';
```

Técnicamente, todas estas variables hacen la misma cosa. Por lo tanto, es una cuestión de gusto personal y estética..


````smart header="`var` instead of `let`"
En scripts anteriores, puedes encontrar otra palabra clave: `var` en lugar de `let`:

```js
*!*var*/!* message = 'Hello';
```

La palabra clave `var` es *casi* lo mismo que `let`. También declara una variable, pero un poco diferente, a la manera "vieja-escuela".

Ha diferencias sutiles entre `let` y `var`, pero no nos importan todavía. Lo descubriremos en detalle en el capitulo <info:var>.
````

## Una analogia de la vida real

Podemos comprender fácilmente el concepto de "variable" si imaginamos que es una "caja" para datos, con una pegatina de nombre único en ella.

Por ejemplo, la variable `message` se puede imaginar como una caja etiquetada `"message"` con el valor `"Hello!"` en ella:

![](variable.png)

Podemos poner cualquier valor en la caja.

También podemos cambiarlo cuantas veces queramos:
```js run
let message;

message = 'Hello!';

message = 'World!'; // valor cambiado

alert(message);
```

Cuando el valor es cambiado, el dato anterior es removido de la variable:

![](variable-change.png)

También podemos declarar dos variables y copiar datos de una a la otra.

```js run
let hello = 'Hello world!';

let message;

*!*
// copia 'Hello world' de hello a message
message = hello;
*/!*

// ahora dos variables contienen los mismos datos
alert(hello); // Hello world!
alert(message); // Hello world!
```

```encabezado inteligente="Lenguajes funcionales"
Es interesante notar que [functional](https://en.wikipedia.org/wiki/Functional_programming) los lenguajes de programación, como [Scala](http://www.scala-lang.org/) o [Erlang](http://www.erlang.org/), prohiben el cambio de valores en variables.

En tales lenguajes, una vez que almacena el valor "en la caja", estará ahí para siempre. Si necesitamos almacenar algo mas, el lenguaje nos fuerza a crear una nueva caja (declarar una nueva variable). No podemos reutilizar la vieja.

Aunque pueda parecer un poco extraño a primera vista, estos lenguajes son capaces de desarrollarse seriamente. Mas que eso, hay áreas como cálculos paralelos donde esta limitación confiere ciertos beneficios. Estudiando tal lenguaje (incluso si no planeas usarlo pronto) se recomienda ampliar la mente.
```

## Nombrando Variables [#variable-naming]

Hay dos limitaciones en los nombres de variables en JavaScript:

1. El nombre debe contener solo letras, dígitos, o los símbolos `$` y `_`.
2. El primer carácter no debe ser un digito.

Ejemplos de nombres validos:

```js
let userName;
let test123;
```

Cuando el nombre contiene múltiples palabras, [camelCase](https://en.wikipedia.org/wiki/CamelCase) es comúnmente usado. Entonces: las palabras van una tras otra, cada palabra comienza con una letra mayúscula: `myVeryLongName`.

Lo  que es interesante -- el signo dólar `'$'` y el guion bajo `'_'` también se pueden usar en los  nombres. Son símbolos regulares, como las letras, sin ningún significado especial.

Estos nombres son validos:

```js run untrusted
let $ = 1; // declara una variable  con el nombre "$"
let _ = 2; // y ahora  una variable con el nombre "_"

alert($ + _); // 3
```

Ejemplos de nombres de variables incorrectos:

```js no-beautify
let 1a; // no puede empezar con un digito

let my-name; // guiones '-' no están permitidos en el nombre
```

```cabecera inteligente="El caso importa"
Variables llamadas `apple` y `AppLE` son dos variables diferentes.
```

````cabecerainteligente="Se permiten las letras que no estan en ingles, perono es recomendado"
Es posible utilizar cualquier idioma, incluyendo letras cirílicas o incluso jeroglíficos, como estas:

```js
let имя = '...';
let 我 = '...';
```

Tecnicamente, aqui no hay error, tales nombres están permitidos, pero hay una tradición internacional para usar el inglés en nombres de variables. Incluso si estamos escribiendo un pequeño script, puede tener una larga vida por delante. Las personas de otros países pueden necesitar leerlo en algún momento.
````

````warn header="Nombres Reservados"
Hay una [lista de palabras reservadas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords), que no se pueden usar como nombres de variables porque son usados por el propio lenguaje.

Por ejemplo: `let`, `class`, `return`, y `function` están reservadas.

El siguiente código da un error de sintaxis:

```js run no-beautify
let let = 5; // no puede ser un nombre de variable "let", error!
let return = 5; // tampoco puedo nombrarlo "return", error!
```
````

````warn header="Una tarea sin `use strict`"

Normalmente, necesitamos definir una variable antes de usarla. Pero en los viejos  tiempos, era técnicamente posible crear una variable por una mera asignación del valor sin utilizar `let`. Esto todavía funciona ahora si no ponemos `use strict` en nuestro scripts para mantener la compatibilidad con scripts antiguos.

```js run no-strict
// note: no "use strict" en este ejemplo

num = 5; // la variable "num" es creada si no existe

alert(num); // 5
```

Esta es una mala practica y causaría un error en modo estricto:

```js
"use strict";

*!*
num = 5; // error: num no esta definido
*/!*
```
````

## Constantes

To declare a constant (unchanging) variable, use `const` instead of `let`:

```js
const myBirthday = '18.04.1982';
```

Variables declared using `const` are called "constants". They cannot be changed. An attempt to do so would cause an error:

```js run
const myBirthday = '18.04.1982';

myBirthday = '01.01.2001'; // error, can't reassign the constant!
```

When a programmer is sure that a variable will never change, they can declare it with `const` to guarantee and clearly communicate that fact to everyone.


### Uppercase constants

There is a widespread practice to use constants as aliases for difficult-to-remember values that are known prior to execution.

Such constants are named using capital letters and underscores.

Like this:

```js run
const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE = "#00F";
const COLOR_ORANGE = "#FF7F00";

// ...when we need to pick a color
let color = COLOR_ORANGE;
alert(color); // #FF7F00
```

Benefits:

- `COLOR_ORANGE` is much easier to remember than `"#FF7F00"`.
- It is much easier to mistype `"#FF7F00"` than `COLOR_ORANGE`.
- When reading the code, `COLOR_ORANGE` is much more meaningful than `#FF7F00`.

When should we use capitals for a constant and when should we name it normally? Let's make that clear.

Being a "constant" just means that a variable's value never changes. But there are constants that are known prior to execution (like a hexadecimal value for red) and there are constants that are *calculated* in run-time, during the execution, but do not change after their initial assignment.

For instance:
```js
const pageLoadTime = /* time taken by a webpage to load */;
```

The value of `pageLoadTime` is not known prior to the page load, so it's named normally. But it's still a constant because it doesn't change after assignment.

In other words, capital-named constants are only used as aliases for "hard-coded" values.  

## Name things right

Talking about variables, there's one more extremely important thing.

Please name your variables sensibly. Take time to think about this.

Variable naming is one of the most important and complex skills in programming. A quick glance at variable names can reveal which code was written by a beginner versus an experienced developer.

In a real project, most of the time is spent modifying and extending an existing code base rather than writing something completely separate from scratch. When we return to some code after doing something else for a while, it's much easier to find information that is well-labeled. Or, in other words, when the variables have good names.

Please spend time thinking about the right name for a variable before declaring it. Doing so will repay you handsomely.

Some good-to-follow rules are:

- Use human-readable names like `userName` or `shoppingCart`.
- Stay away from abbreviations or short names like `a`, `b`, `c`, unless you really know what you're doing.
- Make names maximally descriptive and concise. Examples of bad names are `data` and `value`. Such names say nothing. It's only okay to use them if the context of the code makes it exceptionally obvious which data or value the variable is referencing.
- Agree on terms within your team and in your own mind. If a site visitor is called a "user" then we should name related variables `currentUser` or `newUser` instead of `currentVisitor` or `newManInTown`.

Sounds simple? Indeed it is, but creating descriptive and concise variable names in practice is not. Go for it.

```smart header="Reuse or create?"
And the last note. There are some lazy programmers who, instead of declaring new variables, tend to reuse existing ones.

As a result, their variables are like boxes into which people throw different things without changing their stickers. What's inside the box now? Who knows? We need to come closer and check.

Such programmers save a little bit on variable declaration but lose ten times more on debugging.

An extra variable is good, not evil.

Modern JavaScript minifiers and browsers optimize code well enough, so it won't create performance issues. Using different variables for different values can even help the engine optimize your code.
```

## Summary

We can declare variables to store data by using the `var`, `let`, or `const` keywords.

- `let` -- is a modern variable declaration. The code must be in strict mode to use `let` in Chrome (V8).
- `var` -- is an old-school variable declaration. Normally we don't use it at all, but we'll cover subtle differences from `let` in the chapter <info:var>, just in case you need them.
- `const` -- is like `let`, but the value of the variable can't be changed.

Variables should be named in a way that allows us to easily understand what's inside them.
