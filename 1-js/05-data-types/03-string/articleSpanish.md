# Strings

En JavaScript, los datos textuales son almacenados como strings (cadena de caracteres). No hay un tipo de datos separado para caracteres únicos.

El formato interno para strings es siempre [UTF-16](https://es.wikipedia.org/wiki/UTF-16), no está vinculado a la codificación de la página.

## Comillas

Recordemos los tipos de comillas.

Los strings pueden estar entre comillas simples, comilllas dobles o backticks (acento grave):

```js
let single = 'comillas simples';
let double = 'comillas dobles';

let backticks = `backticks`;
```

Comillas simples y dobles son escencialmente lo mismo. Sin embargo, los backticks, nos permiten ingresar expresiones dentro del string, incluso llamados a funciones:

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Otra ventaja de usar backticks es que nos permiten extender en múltiples líneas el string:

```js run
let guestList = `Invitados:
 * Juan
 * Pedro
 * Maria
`;

alert(guestList); // una lista de invitados, en múltiples líneas
```

Si intentamos usar comillas simples o dobles de la misma forma, obtendremos un error:

```js run
let guestList = "Invitados:  // Error: Unexpected token ILLEGAL
  * Juan";
```

Las comillas simples y dobles provienen de la creación de lenguaje en tiempos ancestrales, cuando la necesidad de múltiples líneas no era tomada en cuenta. Los backticks aparecieron mucho después y por ende son más versátiles.

Los backticks además nos permiten especificar una "función de plantilla" antes del primer backtick. La sintaxis es: <code>func&#96;string&#96;</code>. La función `func` es llamada automáticamente, recibe el string y la expresión insertada y los puede procesar. Puedes leer más sobre esto en [docs](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals). Eso se llama "plantillas etiquetadas". Esta característica hace que sea más fácil rodear strings en plantillas personalizadas u otra funcionalidad, pero es raramente usada.

## Caracteres especiales

Es posible crear strings de múltiples líneas usando comillas simples, usando un llamado "caracter de nueva línea", escrito como `\n`, lo que denota un salto de línea:

```js run
let guestList = 'Invitados:\n * Juan\n * Pedro\n * Maria';

alert(guestList); // una lista de invitados en múltiples líneas
```

Por ejemplo, estas dos líneas describen lo mismo:

```js run
alert('Hola\nMundo'); // dos líneas usando el "símbolo de nueva línea"

// dos líneas usando una nueva línea normal y los backticks
alert(`Hola
Mundo`);
```

Existen otros tipos de caracteres especiales, menos comunes. Aquí está la lista:

| Caracter       | Descripción                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `\b`           | Retroceso                                                                                                                                                        |
| `\f`           | Salto de página                                                                                                                                                  |
| `\n`           | Nueva línea                                                                                                                                                      |
| `\r`           | Retorno                                                                                                                                                          |
| `\t`           | Tab                                                                                                                                                              |
| `\uNNNN`       | Un símbolo unicode con el código hex `NNNN`, por ejemplo `\u00A9` -- es un unicode para el símbolo de derechos de autor `©`. Debe ser exactamente 4 dígitos hex. |
| `\u{NNNNNNNN}` | Algunos caracteres extraños son codificados con dos símbolos unicode, utilizando hasta 4 bytes. Este unicode largo requiere llaves a su alrededor.               |

Ejemplos con unicode:

```js run
alert('\u00A9'); // ©
alert('\u{20331}'); // 佫, un raro jeroglífico chino (unicode largo)
alert('\u{1F60D}'); // 😍, un emoticón sonriendo (otro unicode largo)
```

Todos los caracteres especiales comienzan con una barra invertida `\`. También conocida como "caracter de escape".

También la usamos si queremos insertar una comilla dentro de un string.

Por ejemplo:

```js run
alert('Yo soy \'Walrus\''); // Yo soy 'Walrus'
```

Como puedes ver, debimos anteponer un caracter de escape `\` antes de cada comilla ya que de otra manera hubiera indicado el final del string.

Obviamente, eso se refiere sólo a las comillas que son iguales a las que están rodeando al string. Por lo que, una solución más elegante sería cambiar a comillas dobles o backticks:

```js run
alert(`Yo soy "Walrus"`); // Yo soy "Walrus"
```

Notar que el caracter de escape `\` sirve para la correcta lectura del string por JavaScript, luego desaparece. El string que quedó en la memoria no incluye `\`. Lo puedes ver claramente en el `alert` del ejemplo anterior.

¿Pero qué pasa si necesitamos incluir un caracter de escape `\` en el string?

Es posible, pero debemos duplicarlo como sigue `\\`:

```js run
alert(`El caracter de escape: \\`); // El caracter de escape: \
```

## Largo del string (String length)

La propiedad 'length' entrega el largo del string:

```js run
alert(`Mi\n`.length); // 3
```
Notar que `\n` es un caracter "especial" único, por lo que el largo es `3`.

```warn header="`length` es una característica"
Gente con experiencia en otros lenguajes a veces comete errores de tipeo al llamar `str.length()` en vez de `str.length`. Esto no funciona.

Por favor notar que `str.length` es una propiedad numérica, no una función. No hay necedidad de agregar un paréntesis después de ella.


````

## Accediendo caracteres

Para acceder a un caracter en la posición `pos`, se debe usar paréntesis cuadrados `[pos]` o llamar al método [str.charAt(pos)](mdn:js/String/charAt). El primer caracter comienza desde la posición cero:

```js run
let str = `Hola`;

// el primer caracter
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// el último caracter
alert( str[str.length - 1] ); // a
````

Los paréntesis cuadrados son una forma moderna de acceder a los caracteres, mientras que `charAt` existe principalmente por razones históricas.

La única diferencia entre ellos es que si no se encuentra un caracter, `[]` retorna `undefined` (indefinido), y `charAt` retorna un string vacío.

```js run
let str = `Hola`;

alert(str[1000]); // undefined
alert(str.charAt(1000)); // '' (un string vacío)
```

Podemos además iterar sobre los caracteres usando `for..of`:

```js run
for (let char of 'Hola') {
  alert(char); // H,o,l,a (char se convierte en "H", luego "o", luego "l" etc)
}
```

## Strings son inmutables

Strings no pueden ser modificados en JavaScript. Es imposible modificar un caracter.

Intentemoslo para demostrar que no funciona:

```js run
let str = 'Hola';

str[0] = 'h'; // error
alert(str[0]); // no funciona
```

La solución alternativa es crear un nuevo string y asignarlo a `str` en vez de aisgnarlo al anterior.

Por ejemplo:

```js run
let str = 'Hola';

str = 'h' + str[1]; // reemplaza el string

alert(str); // hola
```

En la sección siguiente veremos más ejemplos de esto.

## Cambiando mayúsculas y minúsuculas

Los métodos [toLowerCase()](mdn:js/String/toLowerCase) y [toUpperCase()](mdn:js/String/toUpperCase) cambian los caracteres a minúscula y mayúscula respectivamente:

```js run
alert('Interfaz'.toUpperCase()); // INTERFAZ
alert('Interfaz'.toLowerCase()); // interfaz
```

Si queremos un sólo caractér en minúscula:

```js
alert('Interfaz'[0].toLowerCase()); // 'i'
```

## Buscando una subcadena de caracteres

Existen muchas formas de buscar por subcadenas de caracteres dentro de una cadena completa.


### str.indexOf


El primer método es [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Este busca un `substr` en `str`, comenzando desde la posición entregada `pos`, y retorna la posición donde es encontrado el subcaracter o `-1` en caso de no encontrar nada.

Por ejemplo:

```js run
let str = 'Widget con id';

alert(str.indexOf('Widget')); // 0, ya que 'Widget' es encontrado al comienzo
alert(str.indexOf('widget')); // -1, no es encontrado, la búsqueda toma en cuenta minúsculas y mayúsculas.

alert(str.indexOf('id')); // 1, "id" es encontrado en la posición 1 (..idget con id)
```

El segundo parámetro es opcional y nos permite buscar desde la posición entregada.

Por ejemplo, la primera ocurrencia de `"id"` es en la posición `1`. Para buscar por la siguiente ocurrencia, comencemos a buscar desde la posoción `2`:

```js run
let str = 'Widget con id';

alert(str.indexOf('id', 2)); // 12
```

Si estamos interesados en todas las ocurrencias, podemos correr `indexOf` en un bucle. Cada nuevo llamado es hecho utilizando la posición posterior a la encontrada anteriormente:

```js run
let str = 'Astuto como un zorro, fuerte como un buey';

let target = 'como'; // busquemos por él

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert(`Encontrado en ${foundPos}`);
  pos = foundPos + 1; // continuar la búsqueda desde la siguiente posición
}
```

Podemos escribir el mismo algoritmo pero más corto:

```js run
let str = 'Astuto como un zorro, fuerte como un buey';
let target = "como";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Existe también un método similar [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) que busca desde el final del string hasta el comienzo.

Este imprimirá las ocurrencias en orden reverso.

````

Existe un leve inconveniente con `indexOf` en el test `if`. No podemos utilizarlo en el `if` como sigue:

```js run
let str = "Widget con id";

if (str.indexOf("Widget")) {
    alert("Lo encontramos"); // no funciona!
}
````

La `alerta` en el ejemplo anterior no se muestra ya que `str.indexOf("Widget")` retorna `0` (lo que significa que encontró el string en la posoción inicial). Correcto pero `if` considera `0` como `falso`.

Por lo que debemos buscar por `-1` como sigue:

```js run
let str = "Widget con id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Lo encontramos"); // ahora funciona!
}
```

````smart header="El truco bitwise NOT"
Uno de los trucos antiguos es el operador [bitwise NOT](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Bitwise_Operators#Bitwise_NOT)) `~`. Este convierte el número en un entero de 32-bits (elimina la parte decimal si es que existe) y luego reversa todos los bits en su representación binaria.

Para enteros de 32 bits, el llamado `~n` significa exactamente lo mismo que `-(n+1)` (debido al formato IEEE-754).

Por ejemplo:

```js run
alert( ~2 ); // -3, lo mismo que -(2+1)
alert( ~0 ); // -1, lo mismo que -(0+1)
alert( ~1 ); // -2, lo mismo que -(1+1)
*!*
alert( ~-1 ); // 0, lo mismo que -(-1+1)
*/!*
```

Como podemos ver, `~n` es cero sólo si `n == -1`.

Por lo que, la prueba `if ( ~str.indexOf("...") )` es veraz y el resultado de ``indexOf no es `-1`. En otras palabras, cuando es encontrado.

La gente lo usa para acrotar verificaciones `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Lo encontramos!' ); // funciona
}
```

Usualmente no es recomendado utilizar características linguisticas en formas no obvias, pero en particular, este truco es utilizado ampliamente en código antiguo, por lo que debemos entenderlo.

Recuerda: `if (~str.indexOf(...))` es leído como "si es encontrado".
````

### includes, startsWith, endsWith

The more modern method [str.includes(substr, pos)](mdn:js/String/includes) returns `true/false` depending on whether `str` contains `substr` within.

It's the right choice if we need to test for the match, but don't need its position:

```js run
alert('Widget with id'.includes('Widget')); // true

alert('Hello'.includes('Bye')); // false
```

The optional second argument of `str.includes` is the position to start searching from:

```js run
alert('Midget'.includes('id')); // true
alert('Midget'.includes('id', 3)); // false, from position 3 there is no "id"
```

The methods [str.startsWith](mdn:js/String/startsWith) and [str.endsWith](mdn:js/String/endsWith) do exactly what they say:

```js run
alert('Widget'.startsWith('Wid')); // true, "Widget" starts with "Wid"
alert('Widget'.endsWith('get')); // true, "Widget" ends with "get"
```

## Getting a substring

There are 3 methods in JavaScript to get a substring: `substring`, `substr` and `slice`.

`str.slice(start [, end])`
: Returns the part of the string from `start` to (but not including) `end`.

    For instance:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', the substring from 0 to 5 (not including 5)
    alert( str.slice(0, 1) ); // 's', from 0 to 1, but not including 1, so only character at 0
    ```

    If there is no second argument, then `slice` goes till the end of the string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, from the 2nd position till the end
    ```

    Negative values for `start/end` are also possible. They mean the position is counted from the string end:

    ```js run
    let str = "strin*!*gif*/!*y";

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(start [, end])`
: Returns the part of the string _between_ `start` and `end`.

    This is almost the same as `slice`, but it allows `start` to be greater than `end`.

    For instance:


    ```js run
    let str = "st*!*ring*/!*ify";

    // these are same for substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...but not for slice:
    alert( str.slice(2, 6) ); // "ring" (the same)
    alert( str.slice(6, 2) ); // "" (an empty string)

    ```

    Negative arguments are (unlike slice) not supported, they are treated as `0`.

`str.substr(start [, length])`
: Returns the part of the string from `start`, with the given `length`.

    In contrast with the previous methods, this one allows us to specify the `length` instead of the ending position:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, from the 2nd position get 4 characters
    ```

    The first argument may be negative, to count from the end:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, from the 4th position get 2 characters
    ```

Let's recap these methods to avoid any confusion:

| method                  | selects...                                  | negatives                |
| ----------------------- | ------------------------------------------- | ------------------------ |
| `slice(start, end)`     | from `start` to `end` (not including `end`) | allows negatives         |
| `substring(start, end)` | between `start` and `end`                   | negative values mean `0` |
| `substr(start, length)` | from `start` get `length` characters        | allows negative `start`  |

```smart header="Which one to choose?"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

The author finds themself using `slice` almost all the time.
```

## Comparing strings

As we know from the chapter <info:comparison>, strings are compared character-by-character in alphabetical order.

Although, there are some oddities.

1. A lowercase letter is always greater than the uppercase:

   ```js run
   alert('a' > 'Z'); // true
   ```

2. Letters with diacritical marks are "out of order":

   ```js run
   alert('Österreich' > 'Zealand'); // true
   ```

   This may lead to strange results if we sort these country names. Usually people would expect `Zealand` to come after `Österreich` in the list.

To understand what happens, let's review the internal representation of strings in JavaScript.

All strings are encoded using [UTF-16](https://en.wikipedia.org/wiki/UTF-16). That is: each character has a corresponding numeric code. There are special methods that allow to get the character for the code and back.

`str.codePointAt(pos)`
: Returns the code for the character at position `pos`:

    ```js run
    // different case letters have different codes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Creates a character by its numeric `code`

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```

    We can also add unicode characters by their codes using `\u` followed by the hex code:

    ```js run
    // 90 is 5a in hexadecimal system
    alert( '\u005a' ); // Z
    ```

Now let's see the characters with codes `65..220` (the latin alphabet and a little bit extra) by making a string of them:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert(str);
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

See? Capital characters go first, then a few special ones, then lowercase characters.

Now it becomes obvious why `a > Z`.

The characters are compared by their numeric code. The greater code means that the character is greater. The code for `a` (97) is greater than the code for `Z` (90).

- All lowercase letters go after uppercase letters because their codes are greater.
- Some letters like `Ö` stand apart from the main alphabet. Here, it's code is greater than anything from `a` to `z`.

### Correct comparisons

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages. The same-looking letter may be located differently in different alphabets.

So, the browser needs to know the language to compare.

Luckily, all modern browsers (IE10- requires the additional library [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

It provides a special method to compare strings in different languages, following their rules.

The call [str.localeCompare(str2)](mdn:js/String/localeCompare):

- Returns `1` if `str` is greater than `str2` according to the language rules.
- Returns `-1` if `str` is less than `str2`.
- Returns `0` if they are equal.

For instance:

```js run
alert('Österreich'.localeCompare('Zealand')); // -1
```

This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.

## Internals, Unicode

```warn header="Advanced knowledge"
The section goes deeper into string internals. This knowledge will be useful for you if you plan to deal with emoji, rare mathematical or hieroglyphic characters or other rare symbols.

You can skip the section if you don't plan to support them.
```

### Surrogate pairs

Most symbols have a 2-byte code. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.

But 2 bytes only allow 65536 combinations and that's not enough for every possible symbol. So rare symbols are encoded with a pair of 2-byte characters called "a surrogate pair".

The length of such symbols is `2`:

```js run
alert('𝒳'.length); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert('😂'.length); // 2, FACE WITH TEARS OF JOY
alert('𩷶'.length); // 2, a rare chinese hieroglyph
```

Note that surrogate pairs did not exist at the time when JavaScript was created, and thus are not correctly processed by the language!

We actually have a single symbol in each of the strings above, but the `length` shows a length of `2`.

`String.fromCodePoint` and `str.codePointAt` are few rare methods that deal with surrogate pairs right. They recently appeared in the language. Before them, there were only [String.fromCharCode](mdn:js/String/fromCharCode) and [str.charCodeAt](mdn:js/String/charCodeAt). These methods are actually the same as `fromCodePoint/codePointAt`, but don't work with surrogate pairs.

But, for instance, getting a symbol can be tricky, because surrogate pairs are treated as two characters:

```js run
alert('𝒳'[0]); // strange symbols...
alert('𝒳'[1]); // ...pieces of the surrogate pair
```

Note that pieces of the surrogate pair have no meaning without each other. So the alerts in the example above actually display garbage.

Technically, surrogate pairs are also detectable by their codes: if a character has the code in the interval of `0xd800..0xdbff`, then it is the first part of the surrogate pair. The next character (second part) must have the code in interval `0xdc00..0xdfff`. These intervals are reserved exclusively for surrogate pairs by the standard.

In the case above:

```js run
// charCodeAt is not surrogate-pair aware, so it gives codes for parts

alert('𝒳'.charCodeAt(0).toString(16)); // d835, between 0xd800 and 0xdbff
alert('𝒳'.charCodeAt(1).toString(16)); // dcb3, between 0xdc00 and 0xdfff
```

You will find more ways to deal with surrogate pairs later in the chapter <info:iterable>. There are probably special libraries for that too, but nothing famous enough to suggest here.

### Diacritical marks and normalization

In many languages there are symbols that are composed of the base character with a mark above/under it.

For instance, the letter `a` can be the base character for: `àáâäãåā`. Most common "composite" character have their own code in the UTF-16 table. But not all of them, because there are too many possible combinations.

To support arbitrary compositions, UTF-16 allows us to use several unicode characters. The base character and one or many "mark" characters that "decorate" it.

For instance, if we have `S` followed by the special "dot above" character (code `\u0307`), it is shown as Ṡ.

```js run
alert('S\u0307'); // Ṡ
```

If we need an additional mark above the letter (or below it) -- no problem, just add the necessary mark character.

For instance, if we append a character "dot below" (code `\u0323`), then we'll have "S with dots above and below": `Ṩ`.

For example:

```js run
alert('S\u0307\u0323'); // Ṩ
```

This provides great flexibility, but also an interesting problem: two characters may visually look the same, but be represented with different unicode compositions.

For instance:

```js run
alert('S\u0307\u0323'); // Ṩ, S + dot above + dot below
alert('S\u0323\u0307'); // Ṩ, S + dot below + dot above

alert('S\u0307\u0323' == 'S\u0323\u0307'); // false
```

To solve this, there exists a "unicode normalization" algorithm that brings each string to the single "normal" form.

It is implemented by [str.normalize()](mdn:js/String/normalize).

```js run
alert('S\u0307\u0323'.normalize() == 'S\u0323\u0307'.normalize()); // true
```

It's funny that in our situation `normalize()` actually brings together a sequence of 3 characters to one: `\u1e68` (S with two dots).

```js run
alert('S\u0307\u0323'.normalize().length); // 1

alert('S\u0307\u0323'.normalize() == '\u1e68'); // true
```

In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.

## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.

There are several other helpful methods in strings:

- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more. See the [manual](mdn:js/String) for details.

Strings also have methods for doing search/replace with regular expressions. But that topic deserves a separate chapter, so we'll return to that later.
