<<<<<<< HEAD
# Anclas: inicio ^ y final $ de cadena

Los patrones caret (del latín carece) `pattern:^` y dólar `pattern:$` tienen un significado especial en una expresión regular. Se llaman "anclas".

El patrón caret `pattern:^` coincide con el principio del texto y dólar `pattern:$` con el final.

Por ejemplo, probemos si el texto comienza con `Mary`:

```js run
let str1 = "Mary tenía un corderito";
alert( /^Mary/.test(str1) ); // true
```

El patrón `pattern:^Mary` significa: "inicio de cadena y luego Mary".

Similar a esto, podemos probar si la cadena termina con `nieve` usando `pattern:nieve$`:

```js run
let str1 = "su vellón era blanco como la nieve";
alert( /nieve$/.test(str1) ); // true
```

En estos casos particulares, en su lugar podríamos usar métodos de cadena `beginWith/endsWith`. Las expresiones regulares deben usarse para pruebas más complejas.

## Prueba para una coincidencia completa

Ambos anclajes `pattern:^...$` se usan juntos a menudo para probar si una cadena coincide completamente con el patrón. Por ejemplo, para verificar si la entrada del usuario está en el formato correcto.

Verifiquemos si una cadena esta o no en formato de hora `12:34`. Es decir: dos dígitos, luego dos puntos y luego otros dos dígitos.

En el idioma de las expresiones regulares eso es `pattern:\d\d:\d\d`:
=======
# Anchors: string start ^ and end $

The caret `pattern:^` and dollar `pattern:$` characters have special meaning in a regexp. They are called "anchors".

The caret `pattern:^` matches at the beginning of the text, and the dollar `pattern:$` -- at the end.

For instance, let's test if the text starts with `Mary`:

```js run
let str1 = "Mary had a little lamb";
alert( /^Mary/.test(str1) ); // true
```

The pattern `pattern:^Mary` means: "string start and then Mary".

Similar to this, we can test if the string ends with `snow` using `pattern:snow$`:

```js run
let str1 = "it's fleece was white as snow";
alert( /snow$/.test(str1) ); // true
```

In these particular cases we could use string methods `startsWith/endsWith` instead. Regular expressions should be used for more complex tests.

## Testing for a full match

Both anchors together `pattern:^...$` are often used to test whether or not a string fully matches the pattern. For instance, to check if the user input is in the right format.

Let's check whether or not a string is a time in `12:34` format. That is: two digits, then a colon, and then another two digits.

In regular expressions language that's `pattern:\d\d:\d\d`:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

<<<<<<< HEAD
La coincidencia para `pattern:\d\d:\d\d` debe comenzar exactamente después del inicio de texto`pattern:^`, y seguido inmediatamente, el final `pattern:$`.

Toda la cadena debe estar exactamente en este formato. Si hay alguna desviación o un carácter adicional, el resultado es `falso`.

Las anclas se comportan de manera diferente si la bandera `pattern:m` está presente. Lo veremos en el próximo artículo.

```smart header="Las anclas tienen \"ancho cero\""
Las anclas `pattern:^` y `pattern:$` son pruebas. Ellas tienen ancho cero.

En otras palabras, no coinciden con un carácter, sino que obligan al motor regexp a verificar la condición (inicio/fin de texto).
=======
Here the match for `pattern:\d\d:\d\d` must start exactly after the beginning of the text `pattern:^`, and the end `pattern:$` must immediately follow.

The whole string must be exactly in this format. If there's any deviation or an extra character, the result is `false`.

Anchors behave differently if flag `pattern:m` is present. We'll see that in the next article.

```smart header="Anchors have \"zero width\""
Anchors `pattern:^` and `pattern:$` are tests. They have zero width.

In other words, they do not match a character, but rather force the regexp engine to check the condition (text start/end).
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
```
