<<<<<<< HEAD
# Modo multilínea de anclas ^ $, bandera "m"

El modo multilínea está habilitado por el indicador `pattern:m`.

Solo afecta el comportamiento de `pattern:^` y `pattern:$`.

En el modo multilínea, coinciden no solo al principio y al final de la cadena, sino también al inicio/final de la línea.

## Buscando al inicio de línea ^

En el siguiente ejemplo, el texto tiene varias líneas. El patrón `pattern:/^\d/gm` toma un dígito desde el principio de cada línea:

```js run
let str = `1er lugar: Winnie
2do lugar: Piglet
3er lugar: Eeyore`;
=======
# Multiline mode of anchors ^ $, flag "m"

The multiline mode is enabled by the flag `pattern:m`.

It only affects the behavior of `pattern:^` and `pattern:$`.

In the multiline mode they match not only at the beginning and the end of the string, but also at start/end of line.

## Searching at line start ^

In the example below the text has multiple lines. The pattern `pattern:/^\d/gm` takes a digit from the beginning of each line:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

*!*
alert( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

<<<<<<< HEAD
Sin la bandera `pattern:m` solo coincide el primer dígito:

```js run
let str = `1er lugar: Winnie
2do lugar: Piglet
3er lugar: Eeyore`;
=======
Without the flag `pattern:m` only the first digit is matched:

```js run
let str = `1st place: Winnie
2nd place: Piglet
3rd place: Eeyore`;
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

*!*
alert( str.match(/^\d/g) ); // 1
*/!*
```

<<<<<<< HEAD
Esto se debe a que, de forma predeterminada, un caret `pattern:^` solo coincide al inicio del texto y en el modo multilínea, al inicio de cualquier línea.

```smart
"Inicio de una línea" significa formalmente "inmediatamente después de un salto de línea": la prueba `pattern:^` en modo multilínea coincide en todas las posiciones precedidas por un carácter de línea nueva `\n`.

Y al comienzo del texto.
```

## Buscando al final de la línea $

El signo de dólar `pattern:$` se comporta de manera similar.

La expresión regular `pattern:\d$` encuentra el último dígito en cada línea
=======
That's because by default a caret `pattern:^` only matches at the beginning of the text, and in the multiline mode -- at the start of any line.

```smart
"Start of a line" formally means "immediately after a line break": the test  `pattern:^` in multiline mode matches at all positions preceeded by a newline character `\n`.

And at the text start.
```

## Searching at line end $

The dollar sign `pattern:$` behaves similarly.

The regular expression `pattern:\d$` finds the last digit in every line
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d$/gm) ); // 1,2,3
```

<<<<<<< HEAD
Sin la bandera `pattern:m`, dólar `pattern:$` solo coincidiría con el final del texto completo, por lo que solo se encontraría el último dígito.

```smart
"Fin de una línea" significa formalmente "inmediatamente antes de un salto de línea": la prueba `pattern:$` en el modo multilínea coincide en todas las posiciones seguidas por un carácter de línea nueva `\n`.

Y al final del texto.
```

## Buscando \n en lugar de ^ $

Para encontrar una línea nueva, podemos usar no solo las anclas `pattern:^` y `pattern:$`, sino también el carácter de línea nueva `\n`.

¿Cual es la diferencia? Veamos un ejemplo.

Buscamos `pattern:\d\n` en lugar de `pattern:\d$`:
=======
Without the flag `pattern:m`, the dollar `pattern:$` would only match the end of the whole text, so only the very last digit would be found.

```smart
"End of a line" formally means "immediately before a line break": the test  `pattern:$` in multiline mode matches at all positions succeeded by a newline character `\n`.

And at the text end.
```

## Searching for \n instead of ^ $

To find a newline, we can use not only anchors `pattern:^` and `pattern:$`, but also the newline character `\n`.

What's the difference? Let's see an example.

Here we search for `pattern:\d\n` instead of `pattern:\d$`:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

alert( str.match(/\d\n/gm) ); // 1\n,2\n
```

<<<<<<< HEAD
Como podemos ver, hay 2 coincidencias en lugar de 3.

Esto se debe a que no hay una línea nueva después de `subject:3` (sin embargo, hay un final de texto, por lo que coincide con `pattern:$`).

Otra diferencia: ahora cada coincidencia incluye un carácter de línea nueva `match:\n`. A diferencia de las anclas `pattern:^` `pattern:$`, que solo prueban la condición (inicio/final de una línea), `\n` es un carácter, por lo que se hace parte del resultado.

Entonces, un `\n` en el patrón se usa cuando necesitamos encontrar caracteres de línea nueva, mientras que las anclas se usan para encontrar algo "al principio/al final" de una línea.
=======
As we can see, there are 2 matches instead of 3.

That's because there's no newline after `subject:3` (there's text end though, so it matches `pattern:$`).

Another difference: now every match includes a newline character `match:\n`. Unlike the anchors `pattern:^` `pattern:$`, that only test the condition (start/end of a line), `\n` is a character, so it becomes a part of the result.

So, a `\n` in the pattern is used when we need newline characters in the result, while anchors are used to find something at the beginning/end of a line.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
