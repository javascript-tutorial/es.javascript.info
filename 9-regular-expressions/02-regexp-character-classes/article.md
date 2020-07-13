<<<<<<< HEAD
# Clases de caracteres

Considera una tarea práctica: tenemos un número de teléfono como `"+7(903)-123-45-67"`, y debemos convertirlo en número puro: `79031234567`.

Para hacerlo, podemos encontrar y eliminar cualquier cosa que no sea un número. La clase de caracteres pueden ayudar con eso.

Una *clase de caracteres* es una notación especial que coincide con cualquier símbolo de un determinado conjunto.

Para empezar, exploremos la clase "dígito". Está escrito como `pattern:\d` y corresponde a "cualquier dígito".

Por ejemplo, busquemos el primer dígito en el número de teléfono:
=======
# Character classes

Consider a practical task -- we have a phone number like `"+7(903)-123-45-67"`, and we need to turn it into pure numbers: `79031234567`.

To do so, we can find and remove anything that's not a number. Character classes can help with that.

A *character class* is a special notation that matches any symbol from a certain set.

For the start, let's explore the "digit" class. It's written as `pattern:\d` and corresponds to "any single digit".

For instance, the let's find the first digit in the phone number:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

<<<<<<< HEAD
Sin la bandera (flag) `pattern:g`, la expresión regular solo busca la primera coincidencia, es decir, el primer dígito `pattern:\d`.

Agreguemos la bandera `pattern:g` para encontrar todos los dígitos:
=======
Without the flag `pattern:g`, the regular expression only looks for the first match, that is the first digit `pattern:\d`.

Let's add the `pattern:g` flag to find all digits:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

<<<<<<< HEAD
alert( str.match(regexp) ); // array de coincidencias: 7,9,0,3,1,2,3,4,5,6,7

// hagamos el número de teléfono de solo dígitos:
alert( str.match(regexp).join('') ); // 79031234567
```

Esa fue una clase de caracteres para los dígitos. También hay otras.

Las más usadas son:

`pattern:\d` ("d" es de dígito")
: Un dígito: es un caracter de `0` a `9`.

`pattern:\s` ("s" es un espacio)
: Un símbolo de espacio: incluye espacios, tabulaciones `\t`, líneas nuevas `\n` y algunos otros caracteres raros, como `\v`, `\f` y `\r`.

`pattern:\w` ("w" es carácter de palabra)
: Un carácter de palabra es: una letra del alfabeto latino o un dígito o un guión bajo `_`. Las letras no latinas (como el cirílico o el hindi) no pertenecen al `pattern:\w`.

Por ejemplo, `pattern:\d\s\w` significa un "dígito" seguido de un "carácter de espacio" seguido de un "carácter de palabra", como `match:1 a`.

**Una expresión regular puede contener símbolos regulares y clases de caracteres.**

Por ejemplo, `pattern:CSS\d` coincide con una cadena `match:CSS` con un dígito después:

```js run
let str = "¿Hay CSS4?";
=======
alert( str.match(regexp) ); // array of matches: 7,9,0,3,1,2,3,4,5,6,7

// let's make the digits-only phone number of them:
alert( str.match(regexp).join('') ); // 79031234567
```

That was a character class for digits. There are other character classes as well.

Most used are:

`pattern:\d` ("d" is from "digit")
: A digit: a character from `0` to `9`.

`pattern:\s` ("s" is from "space")
: A space symbol: includes spaces, tabs `\t`, newlines `\n` and few other rare characters, such as `\v`, `\f` and `\r`.

`pattern:\w` ("w" is from "word")
: A "wordly" character: either a letter of Latin alphabet or a digit or an underscore `_`. Non-Latin letters (like cyrillic or hindi) do not belong to `pattern:\w`.

For instance, `pattern:\d\s\w` means a "digit" followed by a "space character" followed by a "wordly character", such as `match:1 a`.

**A regexp may contain both regular symbols and character classes.**

For instance, `pattern:CSS\d` matches a string `match:CSS` with a digit after it:

```js run
let str = "Is there CSS4?";
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

<<<<<<< HEAD
También podemos usar varias clases de caracteres:

```js run
alert( "Me gusta HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

La coincidencia (cada clase de carácter de la expresión regular tiene el carácter resultante correspondiente):

![](love-html5-classes.svg)

## Clases inversas

Para cada clase de caracteres existe una "clase inversa", denotada con la misma letra, pero en mayúscula.

El "inverso" significa que coincide con todos los demás caracteres, por ejemplo:

`pattern:\D`
: Sin dígitos: cualquier carácter excepto `pattern:\d`, por ejemplo, una letra.

`pattern:\S`
: Sin espacio: cualquier carácter excepto `pattern:\s`, por ejemplo, una letra.

`pattern:\W`
: Sin carácter de palabra: cualquier cosa menos `pattern:\w`, por ejemplo, una letra no latina o un espacio.

Al comienzo del capítulo vimos cómo hacer un número de teléfono solo de números a partir de una cadena como `subject:+7(903)-123-45-67`: encontrar todos los dígitos y unirlos.
=======
Also we can use many character classes:

```js run
alert( "I love HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

The match (each regexp character class has the corresponding result character):

![](love-html5-classes.svg)

## Inverse classes

For every character class there exists an "inverse class", denoted with the same letter, but uppercased.

The "inverse" means that it matches all other characters, for instance:

`pattern:\D`
: Non-digit: any character except `pattern:\d`, for instance a letter.

`pattern:\S`
: Non-space: any character except `pattern:\s`, for instance a letter.

`pattern:\W`
: Non-wordly character: anything but `pattern:\w`, e.g a non-latin letter or a space.

In the beginning of the chapter we saw how to make a number-only phone number from a string like `subject:+7(903)-123-45-67`: find all digits and join them.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

<<<<<<< HEAD
Una forma alternativa y más corta es usar el patrón sin dígito `pattern:\D` para encontrarlos y eliminarlos de la cadena:
=======
An alternative, shorter way is to find non-digits `pattern:\D` and remove them from the string:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

<<<<<<< HEAD
## Un punto es "cualquier carácter"

El patrón punto (`pattern:.`) es una clase de caracteres especial que coincide con "cualquier carácter excepto una nueva línea".

Por ejemplo:
=======
## A dot is "any character"

A dot `pattern:.` is a special character class that matches "any character except a newline".

For instance:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
alert( "Z".match(/./) ); // Z
```

<<<<<<< HEAD
O en medio de una expresión regular:
=======
Or in the middle of a regexp:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
<<<<<<< HEAD
alert( "CS 4".match(regexp) ); // CS 4 (el espacio también es un carácter)
```

Tenga en cuenta que un punto significa "cualquier carácter", pero no la "ausencia de un carácter". Debe haber un carácter para que coincida:

```js run
alert( "CS4".match(/CS.4/) ); // null, no coincide porque no hay caracteres entre S y 4
```

### Punto es igual a la bandera "s" que literalmente retorna cualquier carácter

Por defecto, *punto* no coincide con el carácter de  línea nueva `\n`.

Por ejemplo, la expresión regular `pattern:A.B` coincide con `match:A`, y luego `match:B` con cualquier carácter entre ellos, excepto una línea nueva `\n`:

```js run
alert( "A\nB".match(/A.B/) ); // null (sin coincidencia)
```

Hay muchas situaciones en las que nos gustaría que *punto* signifique literalmente "cualquier carácter", incluida la línea nueva.

Eso es lo que hace la bandera `pattern:s`. Si una expresión regular la tiene, entonces `pattern:.` coincide literalmente con cualquier carácter:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (coincide!)
```

````warn header="El patrón (`pattern:.`) no es compatible con Firefox (< 78), IE, Edge (< 79)"
Consulte <https://caniuse.com/#search=dotall> para conocer el soporte actualizado. Al momento de escribirse este manual, no estaban soportados.

Afortunadamente, hay una alternativa, que funciona en todas partes. Podemos usar una expresión regular como `pattern:[\s\S]` para que coincida con "cualquier carácter".

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (coincide!)
```

El patrón `pattern:[\s\S]` literalmente dice: "con carácter de espacio O sin carácter de espacio". En otras palabras, "cualquier cosa". Podríamos usar otro par de clases complementarias, como `pattern:[\d\D]`, eso no importa. O incluso `pattern:[^]`, que significa que coincide con cualquier carácter excepto nada.

También podemos usar este truco si queremos ambos tipos de "puntos" en el mismo patrón: el patrón actual `pattern:.` comportándose de la manera regular ("sin incluir una línea nueva"), y la forma de hacer coincidir "cualquier carácter" con el patrón `pattern:[\s\S]` o similar.
````

````warn header="Presta atención a los espacios"
Por lo general, prestamos poca atención a los espacios. Para nosotros, las cadenas `subject:1-5` y `subject:1 - 5` son casi idénticas.

Pero si una expresión regular no tiene en cuenta los espacios, puede que no funcione.

Intentemos encontrar dígitos separados por un guión:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, sin coincidencia!
```

Vamos a arreglarlo agregando espacios en la expresión regular `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, funciona ahora
// o podemos usar la clase \s:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, tambien funciona
```

**Un espacio es un carácter. Igual de importante que cualquier otro carácter.**

No podemos agregar o eliminar espacios de una expresión regular y esperar que funcione igual.

En otras palabras, en una expresión regular todos los caracteres importan, los espacios también.
````

## Resumen

Existen las siguientes clases de caracteres:

- `pattern:\d` -- dígitos.
- `pattern:\D` -- sin dígitos.
- `pattern:\s` -- símbolos de espacio, tabulaciones, líneas nuevas.
- `pattern:\S` -- todo menos `pattern:\s`.
- `pattern:\w` -- letras latinas, dígitos, guión bajo `'_'`.
- `pattern:\W` -- todo menos `pattern:\w`.
- `pattern:.` -- cualquier caracter, si la expresión regular usa la bandera `'s'`, de otra forma cualquiera excepto **línea nueva** `\n`.

...¡Pero eso no es todo!

La codificación Unicode, utilizada por JavaScript para las cadenas, proporciona muchas propiedades para los caracteres, como: a qué idioma pertenece la letra (si es una letra), es un signo de puntuación, etc.

Se pueden hacer búsquedas usando esas propiedades. Y se requiere la bandera `pattern:u`, analizada en el siguiente artículo.
=======
alert( "CS 4".match(regexp) ); // CS 4 (space is also a character)
```

Please note that a dot means "any character", but not the "absense of a character". There must be a character to match it:

```js run
alert( "CS4".match(/CS.4/) ); // null, no match because there's no character for the dot
```

### Dot as literally any character with "s" flag

By default, a dot doesn't match the newline character `\n`.

For instance, the regexp `pattern:A.B` matches `match:A`, and then `match:B` with any character between them, except a newline `\n`:

```js run
alert( "A\nB".match(/A.B/) ); // null (no match)
```

There are many situations when we'd like a dot to mean literally "any character", newline included.

That's what flag `pattern:s` does. If a regexp has it, then a dot `pattern:.` matches literally any character:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (match!)
```

````warn header="Not supported in Firefox, IE, Edge"
Check <https://caniuse.com/#search=dotall> for the most recent state of support. At the time of writing it doesn't include Firefox, IE, Edge.

Luckily, there's an alternative, that works everywhere. We can use a regexp like `pattern:[\s\S]` to match "any character".

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (match!)
```

The pattern `pattern:[\s\S]` literally says: "a space character OR not a space character". In other words, "anything". We could use another pair of complementary classes, such as `pattern:[\d\D]`, that doesn't matter. Or even the `pattern:[^]` -- as it means match any character except nothing.

Also we can use this trick if we want both kind of "dots" in the same pattern: the actual dot `pattern:.` behaving the regular way ("not including a newline"), and also a way to match "any character" with `pattern:[\s\S]` or alike.
````

````warn header="Pay attention to spaces"
Usually we pay little attention to spaces. For us strings `subject:1-5` and `subject:1 - 5` are nearly identical.

But if a regexp doesn't take spaces into account, it may fail to work.

Let's try to find digits separated by a hyphen:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, no match!
```

Let's fix it adding spaces into the regexp `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, now it works
// or we can use \s class:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, also works
```

**A space is a character. Equal in importance with any other character.**

We can't add or remove spaces from a regular expression and expect to work the same.

In other words, in a regular expression all characters matter, spaces too.
````

## Summary

There exist following character classes:

- `pattern:\d` -- digits.
- `pattern:\D` -- non-digits.
- `pattern:\s` -- space symbols, tabs, newlines.
- `pattern:\S` -- all but `pattern:\s`.
- `pattern:\w` -- Latin letters, digits, underscore `'_'`.
- `pattern:\W` -- all but `pattern:\w`.
- `pattern:.` -- any character if with the regexp `'s'` flag, otherwise any except a newline `\n`.

...But that's not all!

Unicode encoding, used by JavaScript for strings, provides many properties for characters, like: which language the letter belongs to (if it's a letter) it is it a punctuation sign, etc.

We can search by these properties as well. That requires flag `pattern:u`, covered in the next article.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
