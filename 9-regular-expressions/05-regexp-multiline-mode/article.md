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

*!*
console.log( str.match(/^\d/gm) ); // 1, 2, 3
*/!*
```

Sin la bandera `pattern:m` solo coincide el primer dígito:

```js run
let str = `1er lugar: Winnie
2do lugar: Piglet
3er lugar: Eeyore`;

*!*
console.log( str.match(/^\d/g) ); // 1
*/!*
```

Esto se debe a que, de forma predeterminada, un caret `pattern:^` solo coincide al inicio del texto y en el modo multilínea, al inicio de cualquier línea.

```smart
"Inicio de una línea" significa formalmente "inmediatamente después de un salto de línea": la prueba `pattern:^` en modo multilínea coincide en todas las posiciones precedidas por un carácter de línea nueva `\n`.

Y al comienzo del texto.
```

## Buscando al final de la línea $

El signo de dólar `pattern:$` se comporta de manera similar.

La expresión regular `pattern:\d$` encuentra el último dígito en cada línea

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d$/gm) ); // 1,2,3
```

Sin la bandera `pattern:m`, dólar `pattern:$` solo coincidiría con el final del texto completo, por lo que solo se encontraría el último dígito.

```smart
"Fin de una línea" significa formalmente "inmediatamente antes de un salto de línea": la prueba `pattern:$` en el modo multilínea coincide en todas las posiciones seguidas por un carácter de línea nueva `\n`.

Y al final del texto.
```

## Buscando \n en lugar de ^ $

Para encontrar una línea nueva, podemos usar no solo las anclas `pattern:^` y `pattern:$`, sino también el carácter de línea nueva `\n`.

¿Cual es la diferencia? Veamos un ejemplo.

Buscamos `pattern:\d\n` en lugar de `pattern:\d$`:

```js run
let str = `Winnie: 1
Piglet: 2
Eeyore: 3`;

console.log( str.match(/\d\n/g) ); // 1\n,2\n
```

Como podemos ver, hay 2 coincidencias en lugar de 3.

Esto se debe a que no hay una línea nueva después de `subject:3` (sin embargo, hay un final de texto, por lo que coincide con `pattern:$`).

Otra diferencia: ahora cada coincidencia incluye un carácter de línea nueva `match:\n`. A diferencia de las anclas `pattern:^` `pattern:$`, que solo prueban la condición (inicio/final de una línea), `\n` es un carácter, por lo que se hace parte del resultado.

Entonces, un `\n` en el patrón se usa cuando necesitamos encontrar caracteres de línea nueva, mientras que las anclas se usan para encontrar algo "al principio/al final" de una línea.
