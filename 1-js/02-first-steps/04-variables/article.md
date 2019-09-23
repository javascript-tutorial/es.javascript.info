# Variables

La mayoría del tiempo, una aplicación de JavaScript necesita trabajar con información. Aquí hay 2 ejemplos:
1. Una tienda en línea -- La información puede incluir los bienes a la venta y un "carrito de compras".
2. Una aplicación de chat -- La información puede incluir los usuarios, mensajes, y mucho más.

Utilizamos las variables para almacenar esta información.

## Una variable

Una [variable](https://es.wikipedia.org/wiki/Variable_(programaci%C3%B3n))) es un "almacenaje nombrado" para datos. Podemos usar variables para almacenar golosinas, visitantes, y otros datos.


Para generar una variable en JavaScript, se usa la palabra clave `let`.

La siguiente declaración genera (en otras palabras: *declara* o *define*) una variable con el nombre "message":

```js
let message;
```

Ahora podemos introducir datos en ella al utilizar el operador de asignación `=`:

```js
let message;

*!*
message = 'Hola'; // almacena la cadena
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

Algunas personas también definen variables múltiples en es estilo multilínea (multiline):
```js no-beautify
let user = 'John',
  age = 25,
  message = 'Hola';
```

...Incluso en este estilo "comma-first":

```js no-beautify
let user = 'John'
  , age = 25
  , message = 'Hola';
```

Técnicamente, todas estas variantes hacen lo mismo. Así que, es cuestión de gusto personal y preferencia estética.


````smart header="`var` en vez de `let`"
En 'scripts' mas viejos, a veces se encuentra la palabra clave `let`:

```js
*!*var*/!* mensaje = 'Hola';
```

La palabra clave `var` es *casi* lo mismo que `let`. También hace la declaración de una variable, aunque de un modo ligeramente distinto, y más antiguo.

Existen sutiles diferencias entre `let` y `var`, pero no nos constan en este momento. Cubriremos el tema a detalle en el capítulo <info:var>.
````

## Una analogía de la vida real

Podemos comprender fácilmente el concepto de una "variable" si nos la imaginamos como una "caja" con una etiqueta de nombre único, pegada en ella.

Por ejemplo, podemos imaginar la variable `message` como una caja etiquetada `"message"` con el valor `"Hola!"` adentro:

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

```smart header="Lenguajes funcionales"
Es interesante notar el hecho que lenguajes de programación [funcional](https://es.wikipedia.org/wiki/Programaci%C3%B3n_funcional), como [Scala](http://www.scala-lang.org/) o [Erlang](http://www.erlang.org) prohíben cambiar el valor de variables.

En tales lenguajes, una vez la variable ha sido almacenada "en la caja", permanece allí por siempre. Si necesitamos almacenar algo más, el lenguaje nos obliga a crear una nueva caja (generar una nueva variable). No podemos reusar la antigua.

Aunque puede parecer un poco extraño a primera vista, estos lenguajes tienen seria capacidad de desarrollar. Más aún, existen áreas como computación en paralelo en las cuales esta limitación otorga ciertos beneficios. Estudiar tales lenguajes (incluso sin la intención de usarlo en el futuro cercano) es recomendable para ampliar la mente.
```

## Nombramiento de variables [#variable-naming]

Existen dos limitaciones de nombre de variables en JavaScript:

1. El nombre únicamente puede incluir letras, dígitos numerales, o los símbolos `$` y `_`.
2. El primer carácter no puede ser un dígito numeral.

Ejemplos de nombres válidos:

```js
let userName;
let test123;
```

Cuando el nombre contiene varias palabras, comúnmente se utiliza [camelCase](https://es.wikipedia.org/wiki/Camel_case). Es decir: palabras van una detrás de otra, con cada palabra iniciando con letra mayúscula: `miNombreMuyLargo`.

Es interesante notar -- el símbolo del dólar `'$'` y el guión bajo `'_'` también se utilizan en nombres. Son símbolos comunes, tal como las letras, sin ningún significado especial.

Los siguientes nombres son válidos:

```js run untrusted
let $ = 1; // Declara una variable con el nombre "$"
let _ = 2; // y ahora una variable con el nombre "_"

alert($ + _); // 3
```

Ejemplos de nombres incorrectos:

```js no-beautify
let 1a; // no puede iniciar con un dígito numeral

let my-name; // los guiones '-' no son permitidos en nombres
```

```smart header="La Capitalización es Importante"
Variables con el nombre `manzana` y `manzANA` son distintas.
```

````smart header="Letras que no són de el alfabeto inglés están permitidas, pero no se recomiendan"
Es posible utilizar letras de cualquier alfabeto, incluyendo el cirílico e incluso jeroglíficos, por ejemplo:

```js
let имя = '...';
let 我 = '...';
```

Técnicamente, no existe ningún error aquí, tales nombres están permitidos, pero existe una tradición internacional de utilizar inglés en el nombramiento de variables. Incluso si estamos escribiendo un script pequeño, este puede tener una larga vida por delante. Puede ser necesario que gente de otros países deba leerlo en algún momento.
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

Cuando un programador está seguro que una variable nunca cambiara, puede declarar la variable con `const` para garantizar y comunicar claramente este hecho a todos.


### Constantes mayúsculas

Existe una práctica utilizada ampliamente de utilizar constantes como aliases de valores difíciles-de-recordar y que se conocen previo a la ejecución.

Tales constantes se nombran utilizando letras mayúsculas y guiones bajos.

Por ejemplo:

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

¿Cuando se deben utilizar letras mayúsculas para una constante, y cuando se debe nombrarla de manera normal? Dejémoslo claro.

Ser una "constante" solo significa que el valor de la variable nunca cambia. Pero hay constantes que son conocidas previo a la ejecución (como el valor hexadecimal del color rojo) y hay constantes que son *calculadas* en el tiempo de ejecución, pero no cambian después de su asignación inicial.

Por ejemplo:
```js
const pageLoadTime = /* el tiempo que tardó la página web para cargar */;
```

El valor de `pageLoadTime` no se conoce antes de cargar la página, así que la nombramos normalmente. No obstante, es una constante porque no cambia después de su asignación inicial.

En otras palabras, las constantes nombradas con mayúscula son utilizadas como áliases para valores que son "hard-coded".

## Nombrar cosas correctamente

Estando en el tema de las variables, existe una cosa de mucha importancia.

Por favor se sensato al nombrar tus variables. Pensémolo por un momento.

Nombrar variables es una de las habilidades más importantes y complejas en la programación. Un vistazo rápido a el nombre de las variables nos revela cuál código fue escrito por un principiante o por un desarrollador experimentado.

En un proyecto real, la mayor parte de el tiempo se pasa modificando y extendiendo una base de código en vez de empezar a escribir algo desde cero. Cuando regresamos a algún código después de hacer algo distinto por un rato, es mucho más fácil encontrar información que está bien etiquetada. O, en otras palabras, cuando las variables tienen nombres adecuados.

Por favor pasa tiempo pensando en el nombre adecuado para una variable antes de declararla. Hacer esto te da un retorno muy sustancial.

Algunas reglas buenas para seguir:

- Use términos legibles para humanos como `userName` p `shoppingCart`.
- Evite abreviaciones o nombres cortos `a`, `b`, `c`, al menos que en serio sepa lo que está haciendo.
- Cree nombres que describen al máximo lo que son y sean concisos. Ejemplos que no son adecuados son `data` y `value`. Estos nombres no nos dicen nada. Estos solo está bien usarlos en el contexto de un código que deje excepcionalmente obvio cuál valor o cuales datos está referenciando la variable.
- Se debe estar de acuerdo cuáles términos utilizara un equipo y uno mismo. Si un visitante se le llamara "user", deberíamos llamar las variables relacionadas `currentUser` o `newUser` en vez de `currentVisitor` o `newManInTown`.

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

- `let` -- es una declaración de variable moderna. El código debe estar en 'strict mode' para utilizar `let` en Chrome (V8).
- `var` -- es una declaración de variable más vieja-escuela. Normalmente no lo utilizamos para nada, aunque cubriremos sus sutiles diferencias con `let` en el capítulo <info:var>, en caso de que sea necesario.
- `const` -- es como `let`, pero el valor de la variable no puede ser alterado.

Las variables deben ser nombradas de tal manera que entendamos fácilmente lo que está en su interior.
