<<<<<<< HEAD
# Límite de palabra: \b

Un límite de palabra `pattern:\b` es una prueba, al igual que `pattern:^` y `pattter:$`.

Cuando el motor regex (módulo de programa que implementa la búsqueda de expresiones regulares) se encuentra con `pattern:\b`, comprueba que la posición en la cadena es un límite de palabra.

Hay tres posiciones diferentes que califican como límites de palabras:

- Al comienzo de la cadena, si el primer carácter de cadena es un carácter de palabra `pattern:\w`.
- Entre dos caracteres en la cadena, donde uno es un carácter de palabra `pattern:\w` y el otro no.
- Al final de la cadena, si el último carácter de la cadena es un carácter de palabra `pattern:\w`.

Por ejemplo, la expresión regular `pattern:\bJava\b` se encontrará en `subject:Hello, Java!`, donde `subject:Java` es una palabra independiente, pero no en `subject:Hello, JavaScript!`.
=======
# Word boundary: \b

A word boundary `pattern:\b` is a test, just like `pattern:^` and `pattern:$`.

When the regexp engine (program module that implements searching for regexps) comes across `pattern:\b`, it checks that the position in the string is a word boundary.

There are three different positions that qualify as word boundaries:

- At string start, if the first string character is a word character `pattern:\w`.
- Between two characters in the string, where one is a word character `pattern:\w` and the other is not.
- At string end, if the last string character is a word character `pattern:\w`.

For instance, regexp `pattern:\bJava\b` will be found in `subject:Hello, Java!`, where `subject:Java` is a standalone word, but not in `subject:Hello, JavaScript!`.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

<<<<<<< HEAD
En la cadena `subject:Hello, Java!` las flechas que se muestran corresponden a `pattern:\b`, ver imagen:

![](hello-java-boundaries.svg)

Entonces, coincide con el patrón `pattern:\bHello\b`, porque:

1. Al comienzo de la cadena coincide con la primera prueba: `pattern:\b`.
2. Luego coincide con la palabra `pattern:Hello`.
3. Luego, la prueba `pattern:\b` vuelve a coincidir, ya que estamos entre `subject:o` y una coma.

El patrón `pattern:\bHello\b` también coincidiría. Pero no `pattern:\bHel\b` (porque no hay límite de palabras después de `l`) y tampoco `Java!\b` (porque el signo de exclamación no es un carácter común `pattern:\w`, entonces no hay límite de palabras después de eso).
=======
In the string `subject:Hello, Java!` following positions correspond to `pattern:\b`:

![](hello-java-boundaries.svg)

So, it matches the pattern `pattern:\bHello\b`, because:

1. At the beginning of the string matches the first test `pattern:\b`.
2. Then matches the word `pattern:Hello`.
3. Then the test `pattern:\b` matches again, as we're between `subject:o` and a comma.

The pattern `pattern:\bHello\b` would also match. But not `pattern:\bHell\b` (because there's no word boundary after `l`) and not `Java!\b` (because the exclamation sign is not a wordly character `pattern:\w`, so there's no word boundary after it).
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
<<<<<<< HEAD
alert( "Hello, Java!".match(/\bHell\b/) );  // null (sin coincidencia)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (sin coincidencia)
```

Podemos usar `pattern:\b` no solo con palabras, sino también con dígitos.

Por ejemplo, el patrón `pattern:\b\d\d\b` busca números independientes de 2 dígitos. En otras palabras, busca números de 2 dígitos que están rodeados por caracteres diferentes de `pattern:\w`, como espacios o signos de puntuación (o texto de inicio/fin).
=======
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

We can use `pattern:\b` not only with words, but with digits as well.

For example, the pattern `pattern:\b\d\d\b` looks for standalone 2-digit numbers. In other words, it looks for 2-digit numbers that are surrounded by characters different from `pattern:\w`, such as spaces or punctuation (or text start/end).
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

<<<<<<< HEAD
```warn header="El límite de palabra `pattern:\b` no funciona para alfabetos no latinos"
La prueba de límite de palabra `pattern:\b` verifica que debe haber un `pattern:\w` en un lado de la posición y "no `pattern:\w`"- en el otro lado.

Pero `pattern:\w` significa una letra latina `a-z` (o un dígito o un guión bajo), por lo que la prueba no funciona para otros caracteres, p.ej.: letras cirílicas o jeroglíficos.
=======
```warn header="Word boundary `pattern:\b` doesn't work for non-latin alphabets"
The word boundary test `pattern:\b` checks that there should be `pattern:\w` on the one side from the position and "not `pattern:\w`" - on the other side.

But `pattern:\w` means a latin letter `a-z` (or a digit or an underscore), so the test doesn't work for other characters, e.g. cyrillic letters or hieroglyphs.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
```
