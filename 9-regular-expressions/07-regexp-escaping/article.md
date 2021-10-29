
# Escapando, caracteres especiales

Como hemos visto, una barra invertida `pattern:\` se usa para denotar clases de caracteres, p.ej. `pattern:\d`. Por lo tanto, es un carácter especial en expresiones regulares (al igual que en las cadenas regulares).

También hay otros caracteres especiales que tienen un significado especial en una expresión regular, tales como `pattern:[ ] { } ( ) \ ^ $ . | ? * +`. Se utilizan para hacer búsquedas más potentes.

No intentes recordar la lista: pronto nos ocuparemos de cada uno de ellos por separado y los recordarás fácilmente.

## Escapando

Digamos que queremos encontrar literalmente un punto. No "cualquier carácter", sino solo un punto.

Para usar un carácter especial como uno normal, agrégalo con una barra invertida: `pattern:\.`.

A esto se le llama "escape de carácter".

Por ejemplo:
```js run
alert( "Capítulo 5.1".match(/\d\.\d/) ); // 5.1 (¡Coincide!)
alert( "Capítulo 511".match(/\d\.\d/) ); // null (buscando un punto real \.)
```

Los paréntesis también son caracteres especiales, por lo que si los buscamos, deberíamos usar `pattern:\(`. El siguiente ejemplo busca una cadena `"g()"`:

```js run
alert( "función g()".match(/g\(\)/) ); // "g()"
```

Si estamos buscando una barra invertida `\`, como es un carácter especial tanto en cadenas regulares como en expresiones regulares, debemos duplicarlo.

```js run
alert( "1\\2".match(/\\/) ); // '\'
```

## Una barra

Un símbolo de barra `'/'` no es un carácter especial, pero en JavaScript se usa para abrir y cerrar expresiones regulares: `pattern:/...pattern.../`, por lo que también debemos escaparlo.

Así es como se ve la búsqueda de una barra `'/'`:

```js run
alert( "/".match(/\//) ); // '/'
```

Por otro lado, si no estamos usando `pattern:/.../`, pero creamos una expresión regular usando `new RegExp`, entonces no necesitamos escaparla:

```js run
alert( "/".match(new RegExp("/")) ); // encuentra /
```

## new RegExp

Si estamos creando una expresión regular con `new RegExp`, entonces no tenemos que escapar la barra `/`, pero sí otros caracteres especiales.

Por ejemplo, considere esto:

```js run
let regexp = new RegExp("\d\.\d");

alert( "Capítulo 5.1".match(regexp) ); // null
```

En uno de los ejemplos anteriores funcionó la búsqueda con `pattern:/\d\.\d/`, pero `new RegExp ("\d\.\d")` no funciona, ¿por qué?

La razón es que las barras invertidas son "consumidas" por una cadena. Como podemos recordar, las cadenas regulares tienen sus propios caracteres especiales, como `\n`, y se usa una barra invertida para escapar esos caracteres especiales de cadena.

Así es como se percibe "\d\.\d\":

```js run
alert("\d\.\d"); // d.d
```

Las comillas de cadenas "consumen" barras invertidas y las interpretan como propias, por ejemplo:

- `\n` -- se convierte en un carácter de línea nueva,
- `\u1234` -- se convierte en el carácter Unicode con dicho código,
- ...Y cuando no hay un significado especial: como `pattern:\d` o `\z`, entonces la barra invertida simplemente se elimina.

Así que `new RegExp` toma una cadena sin barras invertidas. ¡Por eso la búsqueda no funciona!

Para solucionarlo, debemos duplicar las barras invertidas, porque las comillas de cadena convierten `\\` en `\`:

```js run
*!*
let regStr = "\\d\\.\\d";
*/!*
alert(regStr); // \d\.\d (ahora está correcto)

let regexp = new RegExp(regStr);

alert( "Capítulo 5.1".match(regexp) ); // 5.1
```

## Resumen

- Para buscar literalmente caracteres especiales `pattern:[ \ ^ $ . | ? * + ( )`, se les antepone una barra invertida `\` ("escaparlos").
- Se debe escapar `/` si estamos dentro de `pattern:/.../` (pero no dentro de `new RegExp`).
- Al pasar una cadena a `new RegExp`, se deben duplicar las barras invertidas `\\`, porque las comillas de cadena consumen una.
