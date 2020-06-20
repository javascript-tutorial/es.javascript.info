<<<<<<< 5fb2e03296425d61e846bf671f3483ad4ef98447
# Unicode: flag "u" and class \p{...}

JavaScript uses [Unicode encoding](https://en.wikipedia.org/wiki/Unicode) for strings. Most characters are encoded with 2 bytes, but that allows to represent at most 65536 characters.

That range is not big enough to encode all possible characters, that's why some rare characters are encoded with 4 bytes, for instance like `𝒳` (mathematical X) or `😄` (a smile), some hieroglyphs and so on.

Here are the unicode values of some characters:

| Character  | Unicode | Bytes count in unicode  |
=======
# Unicode: bandera "u" y clase \p{...}

JavaScript utiliza [codificación Unicode](https://en.wikipedia.org/wiki/Unicode) para las cadenas. La mayoría de los caracteres están codificados con 2 bytes, esto permite representar un máximo de 65536 caracteres.

Ese rango no es lo suficientemente grande como para codificar todos los caracteres posibles, es por eso que algunos caracteres raros se codifican con 4 bytes, por ejemplo como `𝒳` (X matemática) o `😄` (una sonrisa), algunos jeroglíficos, etc.

Aquí los valores unicode de algunos caracteres:

| Carácter  | Unicode | conteo de Bytes en unicode  |
>>>>>>> 9-03-u Traducido 22
|------------|---------|--------|
| a | `0x0061` |  2 |
| ≈ | `0x2248` |  2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

<<<<<<< 5fb2e03296425d61e846bf671f3483ad4ef98447
So characters like `a` and `≈` occupy 2 bytes, while codes for `𝒳`, `𝒴` and `😄` are longer, they have 4 bytes.

Long time ago, when JavaScript language was created, Unicode encoding was simpler: there were no 4-byte characters. So, some language features still handle them incorrectly.

For instance, `length` thinks that here are two characters:
=======
Entonces los caracteres como `a` e `≈` ocupan 2 bytes, mientras que los códigos para `𝒳`, `𝒴` y `😄` son más largos, tienen 4 bytes.

Hace mucho tiempo, cuando se creó el lenguaje JavaScript, la codificación Unicode era más simple: no había caracteres de 4 bytes. Por lo tanto, algunas características del lenguaje aún los manejan incorrectamente.

Por ejemplo, aqui `length` interpreta que hay dos caracteres:
>>>>>>> 9-03-u Traducido 22

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

<<<<<<< 5fb2e03296425d61e846bf671f3483ad4ef98447
...But we can see that there's only one, right? The point is that `length` treats 4 bytes as two 2-byte characters. That's incorrect, because they must be considered only together (so-called "surrogate pair", you can read about them in the article <info:string>).

By default, regular expressions also treat 4-byte "long characters" as a pair of 2-byte ones. And, as it happens with strings, that may lead to odd results. We'll see that a bit later, in the article <info:regexp-character-sets-and-ranges>.

Unlike strings, regular expressions have flag `pattern:u` that fixes such problems. With such flag, a regexp handles 4-byte characters correctly. And also Unicode property search becomes available, we'll get to it next.

## Unicode properties \p{...}

```warn header="Not supported in Firefox and Edge"
Despite being a part of the standard since 2018, unicode properties are not supported in Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1361876)) and Edge ([bug](https://github.com/Microsoft/ChakraCore/issues/2969)).

There's [XRegExp](http://xregexp.com) library that provides "extended" regular expressions with cross-browser support for unicode properties.
```

Every character in Unicode has a lot of properties. They describe what "category" the character belongs to, contain miscellaneous information about it.

For instance, if a character has `Letter` property, it means that the character belongs to an alphabet (of any language). And `Number` property means that it's a digit: maybe Arabic or Chinese, and so on.

We can search for characters with a property, written as `pattern:\p{…}`. To use `pattern:\p{…}`, a regular expression must have flag `pattern:u`.

For instance, `\p{Letter}` denotes a letter in any of language. We can also use `\p{L}`, as `L` is an alias of `Letter`. There are shorter aliases for almost every property.

In the example below three kinds of letters will be found: English, Georgean and Korean.
=======
...Pero podemos ver que solo hay uno, ¿verdad? El punto es que `length` maneja 4 bytes como dos caracteres de 2 bytes. Eso es incorrecto, porque debe considerarse como uno solo (el llamado "par sustituto", puede leer sobre ellos en el artículo <info:string>).

Por defecto, las expresiones regulares manejan los "caracteres largos" de 4 bytes como un par de caracteres de 2 bytes cada uno. Y, como sucede con las cadenas, eso puede conducir a resultados extraños. Lo veremos un poco más tarde, en el artículo <info:regexp-character-sets-and-range>.

A diferencia de las cadenas, las expresiones regulares tienen la bandera `pattern:u` que soluciona tales problemas. Con dicha bandera, una expresión regular maneja correctamente los caracteres de 4 bytes. Y podemos usar la búsqueda de propiedades Unicode, que veremos a continuación.

## Propiedades Unicode \p{...}

```warn header="No es compatible con Firefox y Edge"
A pesar de ser parte del estándar desde 2018, las propiedades unicode no son compatibles con Firefox ([bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1361876)) y Edge ([bug](https://github.com/Microsoft/ChakraCore/issues/2969)).

La libreria [XRegExp](http://xregexp.com) proporciona expresiones regulares "extendidas" con soporte de propiedades unicode en diferentes navegadores.
```

Cada carácter en Unicode tiene varias propiedades. Describen a qué "categoría" pertenece el carácter, contienen información diversa al respecto.

Por ejemplo, si un carácter tiene la propiedad `Letter`, significa que pertenece a un alfabeto (de cualquier idioma). Y la propiedad `Number` significa que es un dígito: tal vez árabe o chino, y así sucesivamente.

Podemos buscar caracteres por su propiedad, usando `pattern:\p{...}`. Para usar `pattern:\p{...}`, una expresión regular debe usar también `pattern:u`.

Por ejemplo, `\p{Letter}` denota una letra en cualquiera de los idiomas. También podemos usar `\p{L}`, ya que `L` es un alias de `Letter`. Casi todas las propiedades tienen alias cortos.

En el ejemplo a continuación se encontrarán tres tipos de letras: inglés, georgiano y coreano.
>>>>>>> 9-03-u Traducido 22

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
<<<<<<< 5fb2e03296425d61e846bf671f3483ad4ef98447
alert( str.match(/\p{L}/g) ); // null (no matches, as there's no flag "u")
```

Here's the main character categories and their subcategories:

- Letter `L`:
  - lowercase `Ll`
  - modifier `Lm`,
  - titlecase `Lt`,
  - uppercase `Lu`,
  - other `Lo`.
- Number `N`:
  - decimal digit `Nd`,
  - letter number `Nl`,
  - other `No`.
- Punctuation `P`:
  - connector `Pc`,
  - dash `Pd`,
  - initial quote `Pi`,
  - final quote `Pf`,
  - open `Ps`,
  - close `Pe`,
  - other `Po`.
- Mark `M` (accents etc):
  - spacing combining `Mc`,
  - enclosing `Me`,
  - non-spacing `Mn`.
- Symbol `S`:
  - currency `Sc`,
  - modifier `Sk`,
  - math `Sm`,
  - other `So`.
- Separator `Z`:
  - line `Zl`,
  - paragraph `Zp`,
  - space `Zs`.
- Other `C`:
  - control `Cc`,
  - format `Cf`,
  - not assigned `Cn`,
  -- private use `Co`,
  - surrogate `Cs`.


So, e.g. if we need letters in lower case, we can write `pattern:\p{Ll}`, punctuation signs: `pattern:\p{P}` and so on.

There are also other derived categories, like:
- `Alphabetic` (`Alpha`), includes Letters `L`, plus letter numbers `Nl` (e.g. Ⅻ - a character for the roman number 12), plus some other symbols `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` includes hexadecimal digits: `0-9`, `a-f`.
- ...And so on.

Unicode supports many different properties, their full list would require a lot of space, so here are the references:

- List all properties by a character: <https://unicode.org/cldr/utility/character.jsp>.
- List all characters by a property: <https://unicode.org/cldr/utility/list-unicodeset.jsp>.
- Short aliases for properties: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- A full base of Unicode characters in text format, with all properties, is here: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Example: hexadecimal numbers

For instance, let's look for hexadecimal numbers, written as `xFF`, where `F` is a hex digit (0..1 or A..F).

A hex digit can be denoted as `pattern:\p{Hex_Digit}`:
=======
alert( str.match(/\p{L}/g) ); // null (sin coincidencia, como no hay bandera "u")
```

Estas son las principales categorías y subcategorías de caracteres:

- Letter (Letra) `L`:
  - lowercase (minúscula) `Ll`
  - modifier (modificador) `Lm`,
  - titlecase (capitales) `Lt`,
  - uppercase (mayúscula) `Lu`,
  - other (otro) `Lo`.
- Number (número) `N`:
  - decimal digit (dígito decimal) `Nd`,
  - letter number (número de letras) `Nl`,
  - other (otro) `No`.
- Punctuation (puntuación) `P`:
  - connector (conector) `Pc`,
  - dash (guión) `Pd`,
  - initial quote (comilla inicial) `Pi`,
  - final quote (comilla final) `Pf`,
  - open (abre) `Ps`,
  - close (cierra) `Pe`,
  - other (otro) `Po`.
- Mark (marca) `M` (acentos etc):
  - spacing combining (combinación de espacios) `Mc`,
  - enclosing (encerrado) `Me`,
  - non-spacing (sin espaciado) `Mn`.
- Symbol (símbolo) `S`:
  - currency (moneda) `Sc`,
  - modifier (modificador) `Sk`,
  - math (matemática) `Sm`,
  - other (otro) `So`.
- Separator (separador) `Z`:
  - line (línea) `Zl`,
  - paragraph (párrafo)`Zp`,
  - space (espacio) `Zs`.
- Other (otros) `C`:
  - control `Cc`,
  - format (formato) `Cf`,
  - not assigned (sin asignación) `Cn`,
  -- private use (uso privado) `Co`,
  - surrogate (sustitudo) `Cs`.


Entonces, por ejemplo si necesitamos letras en minúsculas, podemos escribir `pattern:\p{Ll}`, signos de puntuación: `pattern:\p{P}` y así sucesivamente.

También hay otras categorías derivadas, como:
- `Alphabetic` (alfabético) (`Alfa`), incluye letras `L`, más números de letras `Nl` (por ejemplo, Ⅻ - un carácter para el número romano 12), y otros símbolos `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` incluye dígitos hexadecimales: `0-9`, `a-f`.
- ...Y así.

Unicode admite muchas propiedades diferentes, la lista completa es muy grande, estas son las referencias:

- Lista de todas las propiedades por carácter: https://unicode.org/cldr/utility/character.jsp (enlace no disponible).
- Lista de caracteres por propiedad: <https://unicode.org/cldr/utility/list-unicodeset.jsp>. (enlace no disponible)
- Alias cortos para propiedades: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- Aquí una base completa de caracteres Unicode en formato de texto, con todas las propiedades: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Ejemplo: números hexadecimales

Por ejemplo, busquemos números hexadecimales, como `xFF`, donde` F` es un dígito hexadecimal (0..1 o A..F).

Un dígito hexadecimal se denota como `pattern:\p{Hex_Digit}`:
>>>>>>> 9-03-u Traducido 22

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

<<<<<<< 5fb2e03296425d61e846bf671f3483ad4ef98447
alert("number: xAF".match(regexp)); // xAF
```

### Example: Chinese hieroglyphs

Let's look for Chinese hieroglyphs.

There's a unicode property `Script` (a writing system), that may have a value: `Cyrillic`, `Greek`, `Arabic`, `Han` (Chinese) and so on, [here's the full list]("https://en.wikipedia.org/wiki/Script_(Unicode)").

To look for characters in a given writing system we should use `pattern:Script=<value>`, e.g. for Cyrillic letters: `pattern:\p{sc=Cyrillic}`, for Chinese hieroglyphs: `pattern:\p{sc=Han}`, and so on:

```js run
let regexp = /\p{sc=Han}/gu; // returns Chinese hieroglyphs
=======
alert("número: xAF".match(regexp)); // xAF
```

### Ejemplo: jeroglíficos chinos

Busquemos jeroglíficos chinos.

Hay una propiedad Unicode `Script` (un sistema de escritura), que puede tener un valor: `Cyrillic`, `Greek`, `Arabic`, `Han` (chino), etc. [lista completa]("https://en.wikipedia.org/wiki/Script_(Unicode)").

Para buscar caracteres de un sistema de escritura dado, debemos usar `pattern:Script=<value>`, por ejemplo para letras cirílicas: `pattern:\p{sc=Cyrillic}`, para jeroglíficos chinos: `pattern:\p{sc=Han}`, y así sucesivamente:

```js run
let regexp = /\p{sc=Han}/gu; // devuelve jeroglíficos chinos
>>>>>>> 9-03-u Traducido 22

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

<<<<<<< 5fb2e03296425d61e846bf671f3483ad4ef98447
### Example: currency

Characters that denote a currency, such as `$`, `€`, `¥`, have unicode property  `pattern:\p{Currency_Symbol}`, the short alias: `pattern:\p{Sc}`.

Let's use it to look for prices in the format "currency, followed by a digit":
=======
### Ejemplo: moneda

Los caracteres que denotan una moneda, como `$`, `€`, `¥`, tienen la propiedad unicode `pattern:\p{Currency_Symbol}`, el alias corto: `pattern:\p{Sc}`.

Usémoslo para buscar precios en el formato "moneda, seguido de un dígito":
>>>>>>> 9-03-u Traducido 22

```js run
let regexp = /\p{Sc}\d/gu;

<<<<<<< 5fb2e03296425d61e846bf671f3483ad4ef98447
let  str = `Prices: $2, €1, ¥9`;
=======
let  str = `Precios: $2, €1, ¥9`;
>>>>>>> 9-03-u Traducido 22

alert( str.match(regexp) ); // $2,€1,¥9
```

<<<<<<< 5fb2e03296425d61e846bf671f3483ad4ef98447
Later, in the article <info:regexp-quantifiers> we'll see how to look for numbers that contain many digits.

## Summary

Flag `pattern:u` enables the support of Unicode in regular expressions.

That means two things:

1. Characters of 4 bytes are handled correctly: as a single character, not two 2-byte characters.
2. Unicode properties can be used in the search: `\p{…}`.

With Unicode properties we can look for words in given languages, special characters (quotes, currencies) and so on.
=======
Más adelante, en el artículo <info:regexp-quantifiers> veremos cómo buscar números que contengan muchos dígitos.

## Resumen

La bandera `pattern:u` habilita el soporte de Unicode en expresiones regulares.

Eso significa dos cosas:

1. Los caracteres de 4 bytes se manejan correctamente: como un solo carácter, no dos caracteres de 2 bytes.
2. Las propiedades Unicode se pueden usar en las búsquedas: `\p{…}`.

Con las propiedades Unicode podemos buscar palabras en determinados idiomas, caracteres especiales (comillas, monedas), etc.
>>>>>>> 9-03-u Traducido 22
