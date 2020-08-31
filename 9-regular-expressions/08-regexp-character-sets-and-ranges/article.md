<<<<<<< HEAD
# Conjuntos y rangos [...]

Varios caracteres o clases de caracteres entre corchetes `[…]` significa "buscar cualquier carácter entre los dados".

## Conjuntos

Por ejemplo, `pattern:[eao]` significa cualquiera de los 3 caracteres: `'a'`, `'e'`, o `'o'`.

A esto se le llama *conjunto*. Los conjuntos se pueden usar en una expresión regular junto con los caracteres normales:

```js run
// encontrar [t ó m], y luego "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Tenga en cuenta que aunque hay varios caracteres en el conjunto, corresponden exactamente a un carácter en la coincidencia.

Entonces, en el siguiente ejemplo no hay coincidencias:

```js run
// encuentra "V", luego [o ó i], luego "la"
alert( "Voila".match(/V[oi]la/) ); // null, sin coincidencias
```

El patrón busca:

- `pattern:V`,
- después *una* de las letras `pattern:[oi]`,
- después `pattern:la`.

Entonces habría una coincidencia para `match:Vola` o `match:Vila`.

## Rangos

Los corchetes también pueden contener *rangos de caracteres*.

Por ejemplo, `pattern:[a-z]` es un carácter en el rango de `a` a `z`, y `pattern:[0-5]` es un dígito de `0` a `5`.

En el ejemplo a continuación, estamos buscando `"x"` seguido de dos dígitos o letras de `A` a `F`:

```js run
alert( "Excepción 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Aquí `pattern:[0-9A-F]` tiene dos rangos: busca un carácter que sea un dígito de `0` a `9` o una letra de `A` a `F`.

Si también queremos buscar letras minúsculas, podemos agregar el rango `a-f`: `pattern:[0-9A-Fa-f]`. O se puede agregar la bandera `pattern:i`.

También podemos usar clases de caracteres dentro de los `[…]`.

Por ejemplo, si quisiéramos buscar un carácter de palabra `pattern:\w` o un guión `pattern:-`, entonces el conjunto es `pattern:[\w-]`.

También es posible combinar varias clases, p.ej.: `pattern:[\s\d]` significa "un carácter de espacio o un dígito".

```smart header="Las clases de caracteres son abreviaturas (o atajos) para ciertos conjuntos de caracteres."
Por ejemplo:

- **\d** -- es lo mismo que `pattern:[0-9]`,
- **\w** -- es lo mismo que `pattern:[a-zA-Z0-9_]`,
- **\s** -- es lo mismo que `pattern:[\t\n\v\f\r ]`, además de otros caracteres de espacio raros de unicode.
```

### Ejemplo: multi-idioma \w

Como la clase de caracteres `pattern:\w` es una abreviatura de `pattern:[a-zA-Z0-9_]`, no puede coincidir con sinogramas chinos, letras cirílicas, etc.

Podemos escribir un patrón más universal, que busque caracteres de palabra en cualquier idioma. Eso es fácil con las propiedades unicode: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Descifrémoslo. Similar a `pattern:\w`, estamos creando un conjunto propio que incluye caracteres con las siguientes propiedades unicode:

- `Alfabético` (`Alpha`) - para letras,
- `Marca` (`M`) - para acentos,
- `Numero_Decimal` (`Nd`) - para dígitos,
- `Conector_Puntuación` (`Pc`) - para guión bajo `'_'` y caracteres similares,
- `Control_Unión` (`Join_C`) - dos códigos especiales `200c` and `200d`, utilizado en ligaduras, p.ej. en árabe.

Un ejemplo de uso:
=======
# Sets and ranges [...]

Several characters or character classes inside square brackets `[…]` mean to "search for any character among given".

## Sets

For instance, `pattern:[eao]` means any of the 3 characters: `'a'`, `'e'`, or `'o'`.

That's called a *set*. Sets can be used in a regexp along with regular characters:

```js run
// find [t or m], and then "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Please note that although there are multiple characters in the set, they correspond to exactly one character in the match.

So the example below gives no matches:

```js run
// find "V", then [o or i], then "la"
alert( "Voila".match(/V[oi]la/) ); // null, no matches
```

The pattern searches for:

- `pattern:V`,
- then *one* of the letters `pattern:[oi]`,
- then `pattern:la`.

So there would be a match for `match:Vola` or `match:Vila`.

## Ranges

Square brackets may also contain *character ranges*.

For instance, `pattern:[a-z]` is a character in range from `a` to `z`, and `pattern:[0-5]` is a digit from `0` to `5`.

In the example below we're searching for `"x"` followed by two digits or letters from `A` to `F`:

```js run
alert( "Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Here `pattern:[0-9A-F]` has two ranges: it searches for a character that is either a digit from `0` to `9` or a letter from `A` to `F`.

If we'd like to look for lowercase letters as well, we can add the range `a-f`: `pattern:[0-9A-Fa-f]`. Or add the flag `pattern:i`.

We can also use character classes inside `[…]`.

For instance, if we'd like to look for a wordly character `pattern:\w` or a hyphen `pattern:-`, then the set is `pattern:[\w-]`.

Combining multiple classes is also possible, e.g. `pattern:[\s\d]` means "a space character or a digit".

```smart header="Character classes are shorthands for certain character sets"
For instance:

- **\d** -- is the same as `pattern:[0-9]`,
- **\w** -- is the same as `pattern:[a-zA-Z0-9_]`,
- **\s** -- is the same as `pattern:[\t\n\v\f\r ]`, plus few other rare unicode space characters.
```

### Example: multi-language \w

As the character class `pattern:\w` is a shorthand for `pattern:[a-zA-Z0-9_]`, it can't find Chinese hieroglyphs, Cyrillic letters, etc.

We can write a more universal pattern, that looks for wordly characters in any language. That's easy with unicode properties: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Let's decipher it. Similar to `pattern:\w`, we're making a set of our own that includes characters with following unicode properties:

- `Alphabetic` (`Alpha`) - for letters,
- `Mark` (`M`) - for accents,
- `Decimal_Number` (`Nd`) - for digits,
- `Connector_Punctuation` (`Pc`) - for the underscore `'_'` and similar characters,
- `Join_Control` (`Join_C`) - two special codes `200c` and `200d`, used in ligatures, e.g. in Arabic.

An example of use:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

<<<<<<< HEAD
let str = `Hola 你好 12`;

// encuentra todas las letras y dígitos:
alert( str.match(regexp) ); // H,o,l,a,你,好,1,2
```

Por supuesto, podemos editar este patrón: agregar propiedades unicode o eliminarlas. Las propiedades Unicode se cubren con más detalle en el artículo <info:regexp-unicode>.

```warn header="Las propiedades Unicode no son compatibles con Edge y Firefox"
Las propiedades Unicode `pattern:p{…}` aún no se implementan en Edge y Firefox. Si realmente los necesitamos, podemos usar la biblioteca [XRegExp](http://xregexp.com/).

O simplemente usa rangos de caracteres en el idioma de tu interés, p.ej. `pattern:[а-я]` para letras cirílicas.
```

## Excluyendo rangos

Además de los rangos normales, hay rangos "excluyentes" que se parecen a `pattern:[^…]`.

Están denotados por un carácter caret `^` al inicio y coinciden con cualquier carácter *excepto los dados*.

Por ejemplo:

- `pattern:[^aeyo]` -- cualquier carácter excepto  `'a'`, `'e'`, `'y'` u `'o'`.
- `pattern:[^0-9]` -- cualquier carácter excepto un dígito, igual que `pattern:\D`.
- `pattern:[^\s]` -- cualquiere carácter sin espacio, igual que `\S`.

El siguiente ejemplo busca cualquier carácter, excepto letras, dígitos y espacios:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ y .
```

## Escapando dentro de corchetes […]

Por lo general, cuando queremos encontrar exactamente un carácter especial, necesitamos escaparlo con `pattern:\.`. Y si necesitamos una barra invertida, entonces usamos `pattern:\\`, y así sucesivamente.

Entre corchetes podemos usar la gran mayoría de caracteres especiales sin escaparlos:

- Los símbolos `pattern:. + ( )` nunca necesitan escape.
- Un guión `pattern:-` no se escapa al principio ni al final (donde no define un rango).
- Un carácter caret `pattern:^` solo se escapa al principio (donde significa exclusión).
- El corchete de cierre `pattern:]` siempre se escapa (si se necesita buscarlo).

En otras palabras, todos los caracteres especiales están permitidos sin escapar, excepto cuando significan algo entre corchetes.

Un punto `.` dentro de corchetes significa solo un punto. El patrón `pattern:[.,]` Buscaría uno de los caracteres: un punto o una coma.

En el siguiente ejemplo, la expresión regular `pattern: [-().^+]` busca uno de los caracteres `-().^+`:

```js run
// no es necesario escaparlos
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Coincide +, -
```

...Pero si decides escaparlos "por si acaso", no habría daño:

```js run
// Todo escapado
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // funciona también: +, -
```

## Rangos y la bandera (flag) "u"

Si hay pares sustitutos en el conjunto, se requiere la flag `pattern:u` para que funcionen correctamente.

Por ejemplo, busquemos `pattern:[𝒳𝒴]` en la cadena `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // muestra un carácter extraño, como [?]
// (la búsqueda se realizó incorrectamente, se devolvió medio carácter)
```

El resultado es incorrecto porque, por defecto, las expresiones regulares "no saben" sobre pares sustitutos.

El motor de expresión regular piensa que la cadena `[𝒳𝒴]` no son dos, sino cuatro carácteres:
1. mitad izquierda de `𝒳` `(1)`,
2. mitad derecha de `𝒳` `(2)`,
3. mitad izquierda de `𝒴` `(3)`,
4. mitad derecha de `𝒴` `(4)`.

Sus códigos se pueden mostrar ejecutando:

```js run
for(let i = 0; i < '𝒳𝒴'.length; i++) {
=======
let str = `Hi 你好 12`;

// finds all letters and digits:
alert( str.match(regexp) ); // H,i,你,好,1,2
```

Of course, we can edit this pattern: add unicode properties or remove them. Unicode properties are covered in more details in the article <info:regexp-unicode>.

```warn header="Unicode properties aren't supported in Edge and Firefox"
Unicode properties `pattern:p{…}` are not yet implemented in Edge and Firefox. If we really need them, we can use library [XRegExp](http://xregexp.com/).

Or just use ranges of characters in a language that interests us, e.g.  `pattern:[а-я]` for Cyrillic letters.
```

## Excluding ranges

Besides normal ranges, there are "excluding" ranges that look like `pattern:[^…]`.

They are denoted by a caret character `^` at the start and match any character *except the given ones*.

For instance:

- `pattern:[^aeyo]` -- any character except  `'a'`, `'e'`, `'y'` or `'o'`.
- `pattern:[^0-9]` -- any character except a digit, the same as `pattern:\D`.
- `pattern:[^\s]` -- any non-space character, same as `\S`.

The example below looks for any characters except letters, digits and spaces:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ and .
```

## Escaping in […]

Usually when we want to find exactly a special character, we need to escape it like `pattern:\.`. And if we need a backslash, then we use `pattern:\\`, and so on.

In square brackets we can use the vast majority of special characters without escaping:

- Symbols `pattern:. + ( )` never need escaping.
- A hyphen `pattern:-` is not escaped in the beginning or the end (where it does not define a range).
- A caret `pattern:^` is only escaped in the beginning (where it means exclusion).
- The closing square bracket `pattern:]` is always escaped (if we need to look for that symbol).

In other words, all special characters are allowed without escaping, except when they mean something for square brackets.

A dot `.` inside square brackets means just a dot. The pattern `pattern:[.,]` would look for one of characters: either a dot or a comma.

In the example below the regexp `pattern:[-().^+]` looks for one of the characters `-().^+`:

```js run
// No need to escape
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Matches +, -
```

...But if you decide to escape them "just in case", then there would be no harm:

```js run
// Escaped everything
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // also works: +, -
```

## Ranges and flag "u"

If there are surrogate pairs in the set, flag `pattern:u` is required for them to work correctly.

For instance, let's look for `pattern:[𝒳𝒴]` in the string `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // shows a strange character, like [?]
// (the search was performed incorrectly, half-character returned)
```

The result is incorrect, because by default regular expressions "don't know" about surrogate pairs.

The regular expression engine thinks that `[𝒳𝒴]` -- are not two, but four characters:
1. left half of `𝒳` `(1)`,
2. right half of `𝒳` `(2)`,
3. left half of `𝒴` `(3)`,
4. right half of `𝒴` `(4)`.

We can see their codes like this:

```js run
for(let i=0; i<'𝒳𝒴'.length; i++) {
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

<<<<<<< HEAD
Entonces, el ejemplo anterior encuentra y muestra la mitad izquierda de `𝒳`.

Si agregamos la flag `pattern:u`, entonces el comportamiento será correcto:
=======
So, the example above finds and shows the left half of `𝒳`.

If we add flag `pattern:u`, then the behavior will be correct:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

<<<<<<< HEAD
Ocurre una situación similar cuando se busca un rango, como`[𝒳-𝒴]`.

Si olvidamos agregar la flag `pattern:u`, habrá un error:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Expresión regular inválida
```

La razón es que sin la bandera `pattern:u` los pares sustitutos se perciben como dos caracteres, por lo que `[𝒳-𝒴]` se interpreta como `[<55349><56499>-<55349><56500>]` (cada par sustituto se reemplaza con sus códigos). Ahora es fácil ver que el rango `56499-55349` es inválido: su código de inicio `56499` es mayor que el último `55349`. Esa es la razón formal del error.

Con la bandera `pattern:u` el patrón funciona correctamente:

```js run
// buscar caracteres desde  𝒳  a 𝒵
=======
The similar situation occurs when looking for a range, such as `[𝒳-𝒴]`.

If we forget to add flag `pattern:u`, there will be an error:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Invalid regular expression
```

The reason is that without flag `pattern:u` surrogate pairs are perceived as two characters, so `[𝒳-𝒴]` is interpreted as `[<55349><56499>-<55349><56500>]` (every surrogate pair is replaced with its codes). Now it's easy to see that the range `56499-55349` is invalid: its starting code `56499` is greater than the end `55349`. That's the formal reason for the error.

With the flag `pattern:u` the pattern works correctly:

```js run
// look for characters from 𝒳 to 𝒵
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
