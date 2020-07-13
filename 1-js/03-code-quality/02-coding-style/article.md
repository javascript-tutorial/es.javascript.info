# Estilo de codificación

Nuestro código debe ser lo más limpio y fácil de leer como sea posible.

<<<<<<< HEAD
Ese es en realidad el arte de la programación: tomar una tarea compleja y codificarla de manera correcta y legible para los humanos. Un buen estilo de código ayuda mucho en eso.
=======
That is actually the art of programming -- to take a complex task and code it in a way that is both correct and human-readable. A good code style greatly assists in that.  
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## Sintaxis

<<<<<<< HEAD
Aqui hay un cheatsheet con algunas reglas sugeridas (ver abajo para más detalles):
=======
Here is a cheat sheet with some suggested rules (see below for more details):
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

![](code-style.svg)
<!--
```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n < 0) {
  alert(`Power ${n} is not supported,
    please enter a non-negative integer number`);
} else {
  alert( pow(x, n) );
}
```

-->

Ahora discutamos en detalle las reglas y las razones para ellas.

<<<<<<< HEAD
```warn header="No existen reglas \"usted debe\""
Nada está escrito en piedra aqui. Estos son preferencias de estilos, no dogmas religiosos.
=======
```warn header="There are no \"you must\" rules"
Nothing is set in stone here. These are style preferences, not religious dogmas.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
```

### Llaves

En la mayoria de proyectos de Javascript las llaves estan escritas en estilo "Egipcio" con la llave de apertura en la misma linea como la correspondiente palabra clave -- no en una nueva linea. Debe haber tambien un espacio despues de la llave de apertura, como esto: 

```js
if (condition) {
  // hacer esto
  // ...y eso
  // ...y eso
}
```

<<<<<<< HEAD
Una construcción de una sola línea, como `if (condition) doSomething()`, es un caso límite importante. ¿Deberíamos usar llaves?
=======
A single-line construct, such as `if (condition) doSomething()`, is an important edge case. Should we use braces at all?
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Aqui estan las variantes anotadas para que puedas juzgar la legibilidad por ti mismo. 

<<<<<<< HEAD
1. 😠 Los principiantes a veces hacen eso. ¡Malo! Las llaves no son necesarias:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 Dividir en una línea separada sin llaves. Nunca haga eso, es fácil cometer un error al agregar nuevas líneas:
=======
1. 😠 Beginners sometimes do that. Bad! Curly braces are not needed:
    ```js
    if (n < 0) *!*{*/!*alert(`Power ${n} is not supported`);*!*}*/!*
    ```
2. 😠 Split to a separate line without braces. Never do that, easy to make an error when adding new lines:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
    ```js
    if (n < 0)
      alert(`Power ${n} is not supported`);
    ```
<<<<<<< HEAD
3. 😏 Una línea sin llaves: aceptable, si es corta:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 La mejor variante:
=======
3. 😏 One line without braces - acceptable, if it's short:
    ```js
    if (n < 0) alert(`Power ${n} is not supported`);
    ```
4. 😃 The best variant:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
    ```js
    if (n < 0) {
      alert(`Power ${n} is not supported`);
    }
    ```

<<<<<<< HEAD
Para un código muy breve, se permite una línea, p. `if (cond) return null`. Pero un bloque de código (la última variante) suele ser más legible.

### Tamaño de línea

A nadie le gusta leer una larga línea horizontal de código. Es una buena práctica dividirlos.

Por ejemplo:
```js
// acento grave ` permite dividir la cadena de caracteres en múltiples líneas
=======
For a very brief code, one line is allowed, e.g. `if (cond) return null`. But a code block (the last variant) is usually more readable.

### Line Length

No one likes to read a long horizontal line of code. It's best practice to split them.

For example:
```js
// backtick quotes ` allow to split the string into multiple lines
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
let str = `
  ECMA International's TC39 is a group of JavaScript developers,
  implementers, academics, and more, collaborating with the community
  to maintain and evolve the definition of JavaScript.
`;
```

<<<<<<< HEAD
Y para sentencias `if`:
=======
And, for `if` statements:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js
if (
  id === 123 &&
  moonPhase === 'Waning Gibbous' &&
  zodiacSign === 'Libra'
) {
  letTheSorceryBegin();
}
```

La longitud máxima de la línea debe acordarse a nivel de equipo. Suele tener 80 o 120 caracteres.

### Identaciones

Hay dos tipo de identaciones:

- **Identacion horizontal: 2 o 4 espacios.**

<<<<<<< HEAD
    Se realiza una sangría horizontal utilizando 2 o 4 espacios o el símbolo de tabulación horizontal (key `key:Tabulador`). Cuál elegir es una vieja guerra santa. Los espacios son más comunes hoy en día.

    Una ventaja de los espacios sobre las tabulaciones es que los espacios permiten configuraciones de sangría más flexibles que el símbolo del tabulador.
=======
    A horizontal indentation is made using either 2 or 4 spaces or the horizontal tab symbol (key `key:Tab`). Which one to choose is an old holy war. Spaces are more common nowadays.

    One advantage of spaces over tabs is that spaces allow more flexible configurations of indents than the tab symbol.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

    Por ejemplo, podemos alinear los argumentos con el paréntesis de apertura, así:

    ```js no-beautify
    show(parameters,
         aligned, // 5 espacios de relleno a la izquierda 
         one,
         after,
         another
      ) {
      // ...
    }
    ```

- **Identación vertical: líneas vacias para dividir código en bloques lógicos.**

    Incluso una sola función a menudo se puede dividir en bloques lógicos. En el siguiente ejemplo, la inicialización de variables, el bucle principal y la devolución del resultado se dividen verticalmente:

    ```js
    function pow(x, n) {
      let result = 1;
      //              <--
      for (let i = 0; i < n; i++) {
        result *= x;
      }
      //              <--
      return result;
    }
    ```

    Insertar una nueva línea extra donde ayude a hacer el código mas legible. No debe de haber más de nueve líneas de código sin una identación vertical.

### Punto y coma

Debe haber un punto y coma después de cada declaración, incluso si se puede omitir.

<<<<<<< HEAD
Hay idiomas en los que un punto y coma es realmente opcional y rara vez se usa. Sin embargo, en JavaScript, hay casos en los que un salto de línea no se interpreta como un punto y coma, lo que deja el código vulnerable a errores. Vea más sobre eso en el capítulo <info:structure#semicolon>.

Si eres un programador de JavaScript experimentado, puedes elegir un estilo de código sin punto y coma como [StandardJS](https://standardjs.com/). De lo contrario, es mejor usar punto y coma para evitar posibles escollos. La mayoría de los desarrolladores ponen punto y coma.
=======
There are languages where a semicolon is truly optional and it is rarely used. In JavaScript, though, there are cases where a line break is not interpreted as a semicolon, leaving the code vulnerable to errors. See more about that in the chapter <info:structure#semicolon>.

If you're an experienced JavaScript programmer, you may choose a no-semicolon code style like [StandardJS](https://standardjs.com/). Otherwise, it's best to use semicolons to avoid possible pitfalls. The majority of developers put semicolons.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

### Niveles anidados

Intenta evitar anidar el código en demasiados niveles de profundidad.

<<<<<<< HEAD
Algunas veces es buena idea usar la directiva ["continue"](info:while-for#continue) en un bucle para evitar anidamiento extra.
=======
For example, in the loop, it's sometimes a good idea to use the [`continue`](info:while-for#continue) directive to avoid extra nesting.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Por ejemplo, en lugar de añadir un `if` anidado como este:

```js
for (let i = 0; i < 10; i++) {
  if (cond) {
    ... // <- un nivel más de anidamiento
  }
}
```

Podemos escribir:

```js
for (let i = 0; i < 10; i++) {
  if (!cond) continue;
  ...  // <- sin nivel extra de anidamiento
}
```

Algo similar se puede hacer con `if/else` y `return`.

Por ejemplo, las dos construcciones siguientes son idénticas.

Opción 1:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
  } else {
    let result = 1;

    for (let i = 0; i < n; i++) {
      result *= x;
    }

    return result;
  }  
}
```

Opción 2:

```js
function pow(x, n) {
  if (n < 0) {
    alert("Negative 'n' not supported");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

<<<<<<< HEAD
El segundo es más legible porque el "caso especial" de `n < 0` se maneja desde el principio. Una vez que se realiza la verificación, podemos pasar al flujo de código "principal" sin la necesidad de anidamiento adicional.
=======
The second one is more readable because the "special case" of `n < 0` is handled early on. Once the check is done we can move on to the "main" code flow without the need for additional nesting.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## Colocación de funciones

Si está escribiendo varias funciones "auxiliares" y el código que las usa, hay tres formas de organizar las funciones.

<<<<<<< HEAD
1. Declare las funciones *anteriores* al código que las usa:
=======
1. Declare the functions *above* the code that uses them:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

    ```js
    // *!*declaración de funciones*/!*
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }

    // *!*el código que las usan*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();
    ```
2. Código primero, después funciones

    ```js
    // *!*El código que usa a las funciones*/!*
    let elem = createElement();
    setHandler(elem);
    walkAround();

    // --- *!*Funciones auxiliares*/!* ---
    function createElement() {
      ...
    }

    function setHandler(elem) {
      ...
    }

    function walkAround() {
      ...
    }
    ```
3. Mixto: una función es declarada donde se usa por primera vez.

La mayoria del tiempo, la segunda variante es preferida.

<<<<<<< HEAD
Eso es porque al leer el código, primero queremos saber *qué hace*. Si el código va primero, entonces queda claro desde el principio. Entonces, tal vez no necesitemos leer las funciones, especialmente si sus nombres son descriptivos de lo que realmente hacen.
=======
That's because when reading code, we first want to know *what it does*. If the code goes first, then it becomes clear from the start. Then, maybe we won't need to read the functions at all, especially if their names are descriptive of what they actually do.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## Guías de estilo

<<<<<<< HEAD
Una guía de estilo contiene reglas generales sobre "cómo escribir" el código, cúales comillas usar, cuántos espacios para endentar, la longitud máxima de la línea, etc. Muchas cosas menores.
=======
A style guide contains general rules about "how to write" code, e.g. which quotes to use, how many spaces to indent, the maximal line length, etc. A lot of minor things.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Cuando todos los miembros de un equipo usan la misma guía de estilo, el código se ve uniforme, independientemente de qué miembro del equipo lo haya escrito.

<<<<<<< HEAD
Por supuesto, un equipo siempre puede escribir su propia guía de estilo, pero generalmente no es necesario. Hay muchas guías existentes para elegir.
=======
Of course, a team can always write their own style guide, but usually there's no need to. There are many existing guides to choose from.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Algunas opciones populares:

- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Idiomatic.JS](https://github.com/rwaldron/idiomatic.js)
- [StandardJS](https://standardjs.com/)
- (y mucho mas)

<<<<<<< HEAD
Si eres un desarrollador novato, puedes comenzar con la cheet sheet al comienzo de este capítulo. Luego, puedes buscar otras guías de estilo para recoger más ideas y decidir cuál te gusta más.
=======
If you're a novice developer, start with the cheat sheet at the beginning of this chapter. Then you can browse other style guides to pick up more ideas and decide which one you like best.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## Linters automatizados

<<<<<<< HEAD
Linters son herramientas que pueden verificar automáticamente el estilo de su código y hacer sugerencias de mejora.

Lo mejor de ellos es que la comprobación de estilo también puede encontrar algunos errores, como errores tipográficos en nombres de variables o funciones. Debido a esta característica, se recomienda usar un linter incluso si no desea apegarse a un "estilo de código" en particular.

Aquí hay algunas herramientas de linting conocidas:
=======
Linters are tools that can automatically check the style of your code and make improving suggestions.

The great thing about them is that style-checking can also find some bugs, like typos in variable or function names. Because of this feature, using a linter is recommended even if you don't want to stick to one particular "code style".

Here are some well-known linting tools:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

- [JSLint](http://www.jslint.com/) -- uno de los primeros linters.
- [JSHint](http://www.jshint.com/) -- mas ajustes que JSLint.
- [ESLint](http://eslint.org/) -- probablemente el mas reciente.

Todos ellos pueden hacer el trabajo. El autor usa [ESLint](http://eslint.org/).

La mayoría de las linters están integradas con muchos editores populares: solo habilite el complemento en el editor y configure el estilo.

Por ejemplo, para ESLint debe hacer lo siguiente:

<<<<<<< HEAD
1. Instala [Node.JS](https://nodejs.org/).
2. Instala ESLint con el comando `npm install -g eslint` (npm es un instalador de paquetes de Javascript).
3. Crea un archivo de configuracion llamado `.eslintrc` en la raiz de tu proyecto de javascript (en la carpeta que contiene todos tus archivos).
4. Instala/Habilita el plugin para que tu editor se integre con ESLint. La mayoria de editores tienen uno.
=======
1. Install [Node.js](https://nodejs.org/).
2. Install ESLint with the command `npm install -g eslint` (npm is a JavaScript package installer).
3. Create a config file named `.eslintrc` in the root of your JavaScript project (in the folder that contains all your files).
4. Install/enable the plugin for your editor that integrates with ESLint. The majority of editors have one.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Aquí un ejemplo de un archivo `.eslintrc`:

```js
{
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "indent": ["warning", 2]
  }
}
```

Aquí la directiva `"extends"` denota que la configuración se basa en el conjunto de configuraciones "eslint: recomendado". Después de eso, especificamos el nuestro.

También es posible descargar conjuntos de reglas de estilo de la web y extenderlos en su lugar. Consulte <http://eslint.org/docs/user-guide/getting-started> para obtener más detalles sobre la instalación.

También algunos IDE tienen linting incorporado, lo cual es conveniente pero no tan personalizable como ESLint.

## Resumen

<<<<<<< HEAD
Todas las reglas de sintaxis descritas en este capítulo (y en las guías de estilo mencionadas) tienen como objetivo aumentar la legibilidad de su código. Todos ellos son discutibles.

Cuando pensamos en escribir un código "mejor", las preguntas que debemos hacernos son: "¿Qué hace que el código sea más legible y fácil de entender?" y "¿Qué puede ayudarnos a evitar errores?" Estas son las principales cosas a tener en cuenta al elegir y debatir estilos de código.
=======
All syntax rules described in this chapter (and in the style guides referenced) aim to increase the readability of your code. All of them are debatable.

When we think about writing "better" code, the questions we should ask ourselves are: "What makes the code more readable and easier to understand?" and "What can help us avoid errors?" These are the main things to keep in mind when choosing and debating code styles.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

La lectura de guías de estilo populares le permitirá mantenerse al día con las últimas ideas sobre las tendencias de estilo de código y las mejores prácticas.
