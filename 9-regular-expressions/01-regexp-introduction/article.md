# Patrones y banderas (flags)

<<<<<<< HEAD
Las expresiones regulares son patrones que proporcionan una forma poderosa de buscar y reemplazar texto.

En JavaScript, están disponibles a través del objeto [RegExp](mdn:js/RegExp), además de integrarse en métodos de cadenas.

## Expresiones Regulares

Una expresión regular (también "regexp", o simplemente "reg") consiste en un *patrón* y *banderas* opcionales.
=======
Regular expressions are patterns that provide a powerful way to search and replace in text.

In JavaScript, they are available via the [RegExp](mdn:js/RegExp) object, as well as being integrated in methods of strings.

## Regular Expressions
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6


<<<<<<< HEAD
Hay dos sintaxis que se pueden usar para crear un objeto de expresión regular.

La sintaxis "larga":
=======
There are two syntaxes that can be used to create a regular expression object.

The "long" syntax:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js
regexp = new RegExp("patrón", "banderas");
```

<<<<<<< HEAD
Y el "corto", usando barras `"/"`:
=======
And the "short" one, using slashes `"/"`:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js
regexp = /pattern/; // sin banderas
regexp = /pattern/gmi; // con banderas g,m e i (para ser cubierto pronto)
```

<<<<<<< HEAD
Las barras `pattern:/.../` le dicen a JavaScript que estamos creando una expresión regular. Juegan el mismo papel que las comillas para las cadenas.

En ambos casos, `regexp` se convierte en una instancia de la clase incorporada `RegExp`.

La principal diferencia entre estas dos sintaxis es que el patrón que utiliza barras `/.../` no permite que se inserten expresiones (como los literales de plantilla de cadena con `${...}`). Son completamente estáticos.

Las barras se utilizan cuando conocemos la expresión regular en el momento de escribir el código, y esa es la situación más común. Mientras que  `new RegExp`, se usa con mayor frecuencia cuando necesitamos crear una expresión regular "sobre la marcha" a partir de una cadena generada dinámicamente. Por ejemplo:

```js
let tag = prompt("¿Qué etiqueta quieres encontrar?", "h2");

igual que /<h2>/ si respondió "h2" en el mensaje anterior
```

## Banderas

Las expresiones regulares pueden usar banderas que afectan la búsqueda.

Solo hay 6 de ellas en JavaScript:

`pattern:i`
: Con esta bandera, la búsqueda no distingue entre mayúsculas y minúsculas: no hay diferencia entre `A` y `a` (consulte el ejemplo a continuación).

`pattern:g`
: Con esta bandera, la búsqueda encuentra todas las coincidencias, sin ella, solo se devuelve la primera coincidencia.

`pattern:m`
: Modo multilínea (cubierto en el capítulo <info:regexp-multiline-mode>).

`pattern:s`
: Habilita el modo "dotall", que permite que un punto `pattern:.` coincida con el carácter de línea nueva `\n` (cubierto en el capítulo <info:regexp-character-classes>).

=======
Slashes `pattern:/.../` tell JavaScript that we are creating a regular expression. They play the same role as quotes for strings.

In both cases `regexp` becomes an instance of the built-in `RegExp` class.

The main difference between these two syntaxes is that pattern using slashes `/.../` does not allow for expressions to be inserted (like string template literals with `${...}`). They are fully static.

Slashes are used when we know the regular expression at the code writing time -- and that's the most common situation. While `new RegExp`, is more often used when we need to create a regexp "on the fly" from a dynamically generated string. For instance:

```js
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // same as /<h2>/ if answered "h2" in the prompt above
```

## Flags

Regular expressions may have flags that affect the search.

There are only 6 of them in JavaScript:

`pattern:i`
: With this flag the search is case-insensitive: no difference between `A` and `a` (see the example below).

`pattern:g`
: With this flag the search looks for all matches, without it -- only the first match is returned.

`pattern:m`
: Multiline mode (covered in the chapter <info:regexp-multiline-mode>).

`pattern:s`
: Enables "dotall" mode, that allows a dot `pattern:.` to match newline character `\n` (covered in the chapter <info:regexp-character-classes>).

`pattern:u`
: Enables full unicode support. The flag enables correct processing of surrogate pairs. More about that in the chapter <info:regexp-unicode>.

`pattern:y`
: "Sticky" mode: searching at the exact position in the text  (covered in the chapter <info:regexp-sticky>)
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

`pattern:u`
: Permite el soporte completo de Unicode. La bandera permite el procesamiento correcto de pares sustitutos. Más del tema en el capítulo <info:regexp-unicode>.

`pattern:y`
: Modo "adhesivo": búsqueda en la posición exacta del texto (cubierto en el capítulo <info:regexp-sticky>)

```smart header="Colores"
A partir de aquí, el esquema de color es:

- regexp -- `pattern:red`
- cadena (donde buscamos) -- `subject:blue`
- resulta -- `match:green`
```

<<<<<<< HEAD
## Buscando: str.match

Como se mencionó anteriormente, las expresiones regulares se integran con los métodos de cadena.

El método `str.match(regex)` busca todas las coincidencias de `regex` en la cadena `str`.

Tiene 3 modos de trabajo:

1. Si la expresión regular tiene la bandera `pattern:g`, devuelve un arreglo de todas las coincidencias:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (un arreglo de 2 subcadenas que coinciden)
    ```
    Tenga en cuenta que tanto `match:We` como `match: we` se encuentran, porque la bandera `pattern:i` hace que la expresión regular no distinga entre mayúsculas y minúsculas.

2. Si no existe dicha bandera, solo devuelve la primera coincidencia en forma de arreglo, con la coincidencia completa en el índice `0` y algunos detalles adicionales en las propiedades:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // sin la bandera g

    alert( result[0] );     // We (1ra coincidencia)
    alert( result.length ); // 1

    // Detalles:
    alert( result.index );  // 0 (posición de la coincidencia)
    alert( result.input );  // We will, we will rock you (cadena fuente)
    ```
    El arreglo puede tener otros índices, además de `0` si una parte de la expresión regular está encerrada entre paréntesis. Cubriremos eso en el capítulo <info:regexp-groups>.

3. Y, finalmente, si no hay coincidencias, se devuelve `null` (no importa si hay una bandera `pattern:g` o no).

    Este es un matiz muy importante. Si no hay coincidencias, no recibimos un arreglo vacío, sino que recibimos `null`. Olvidar eso puede conducir a errores, por ejemplo:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: No se puede leer la propiedad 'length' de null
      alert("Error en la línea anterior");
    }
    ```

    Si queremos que el resultado sea siempre un arreglo, podemos escribirlo de esta manera:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("Sin coincidencias"); // ahora si trabaja
    }
    ```

## Reemplazando: str.replace

El método `str.replace(regexp, replacement)` reemplaza las coincidencias encontradas usando `regexp` en la cadena `str` con `replacement` (todas las coincidencias si está la bandera `pattern:g`, de lo contrario, solo la primera).

Por ejemplo:

```js run
// sin la bandera g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// con la bandera g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

El segundo argumento es la cadena de `replacement`. Podemos usar combinaciones de caracteres especiales para insertar fragmentos de la coincidencia:

| Símbolos | Acción en la cadena de reemplazo |
|--------|--------|
|`$&`|inserta toda la coincidencia|
|<code>$&#096;</code>|inserta una parte de la cadena antes de la coincidencia|
|`$'`|inserta una parte de la cadena después de la coincidencia|
|`$n`|si `n` es un número de 1-2 dígitos, entonces inserta el contenido de los paréntesis n-ésimo, más del tema en el capítulo <info:regexp-groups>|
|`$<name>`|inserta el contenido de los paréntesis con el `nombre` dado, más del tema en el capítulo <info:regexp-groups>|
|`$$`|inserta el carácter `$` |

Un ejemplo con `pattern:$&`:

```js run
alert( "Me gusta HTML".replace(/HTML/, "$& y JavaScript") ); // Me gusta HTML y JavaScript
```

## Pruebas: regexp.test

El método `regexp.test(str)` busca al menos una coincidencia, si se encuentra, devuelve `true`, de lo contrario `false`.

```js run
let str = "Me gusta JavaScript";
let regexp = /GUSTA/i;

=======
## Searching: str.match

As mentioned previously, regular expressions are integrated with string methods.

The method `str.match(regexp)` finds all matches of `regexp` in the string `str`.

It has 3 working modes:

1. If the regular expression has flag `pattern:g`, it returns an array of all matches:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (an array of 2 substrings that match)
    ```
    Please note that both `match:We` and `match:we` are found, because flag `pattern:i` makes the regular expression case-insensitive.

2. If there's no such flag it returns only the first match in the form of an array, with the full match at index `0` and some additional details in properties:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // without flag g

    alert( result[0] );     // We (1st match)
    alert( result.length ); // 1

    // Details:
    alert( result.index );  // 0 (position of the match)
    alert( result.input );  // We will, we will rock you (source string)
    ```
    The array may have other indexes, besides `0` if a part of the regular expression is enclosed in parentheses. We'll cover that in the chapter  <info:regexp-groups>.

3. And, finally, if there are no matches, `null` is returned (doesn't matter if there's flag `pattern:g` or not).

    This a very important nuance. If there are no matches, we don't receive an empty array, but instead receive `null`. Forgetting about that may lead to errors, e.g.:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: Cannot read property 'length' of null
      alert("Error in the line above");
    }
    ```

    If we'd like the result to always be an array, we can write it this way:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("No matches"); // now it works
    }
    ```

## Replacing: str.replace

The method `str.replace(regexp, replacement)` replaces matches found using `regexp` in string `str` with `replacement` (all matches if there's flag `pattern:g`, otherwise, only the first one).

For instance:

```js run
// no flag g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// with flag g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

The second argument is the `replacement` string. We can use special character combinations in it to insert fragments of the match:

| Symbols | Action in the replacement string |
|--------|--------|
|`$&`|inserts the whole match|
|<code>$&#096;</code>|inserts a part of the string before the match|
|`$'`|inserts a part of the string after the match|
|`$n`|if `n` is a 1-2 digit number, then it inserts the contents of n-th parentheses, more about it in the chapter <info:regexp-groups>|
|`$<name>`|inserts the contents of the parentheses with the given `name`, more about it in the chapter <info:regexp-groups>|
|`$$`|inserts character `$` |

An example with `pattern:$&`:

```js run
alert( "I love HTML".replace(/HTML/, "$& and JavaScript") ); // I love HTML and JavaScript
```

## Testing: regexp.test

The method `regexp.test(str)` looks for at least one match, if found, returns `true`, otherwise `false`.

```js run
let str = "I love JavaScript";
let regexp = /LOVE/i;
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

alert( regexp.test(str) ); // true
```

<<<<<<< HEAD
Más adelante en este capítulo estudiaremos más expresiones regulares, exploraremos más ejemplos y también conoceremos otros métodos.

La información completa sobre métodos se proporciona en el artículo <info:regexp-method>.
=======
Later in this chapter we'll study more regular expressions, walk through more examples, and also meet other methods.

Full information about the methods is given in the article <info:regexp-methods>.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

## Resumen

<<<<<<< HEAD
- Una expresión regular consiste en un patrón y banderas opcionales: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Sin banderas y símbolos especiales (que estudiaremos más adelante), la búsqueda por expresión regular es lo mismo que una búsqueda de subcadena.
- El método `str.match(regexp)` busca coincidencias: devuelve todas si hay una bandera `pattern:g`, de lo contrario, solo la primera.
- El método `str.replace(regexp, replacement)` reemplaza las coincidencias encontradas usando `regexp` con `replacement`: devuelve todas si hay una bandera `pattern:g`, de lo contrario solo la primera.
- El método `regexp.test(str)` devuelve `true` si hay al menos una coincidencia, de lo contrario, devuelve `false`.
=======
- A regular expression consists of a pattern and optional flags: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Without flags and special symbols  (that we'll study later), the search by a regexp is the same as a substring search.
- The method `str.match(regexp)` looks for matches: all of them if there's `pattern:g` flag, otherwise, only the first one.
- The method `str.replace(regexp, replacement)` replaces matches found using `regexp` with `replacement`: all of them if there's `pattern:g` flag, otherwise only the first one.
- The method `regexp.test(str)` returns `true` if there's at least one match, otherwise, it returns `false`.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
