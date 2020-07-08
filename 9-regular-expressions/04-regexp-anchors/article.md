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

```js run
let goodInput = "12:34";
let badInput = "12:345";

let regexp = /^\d\d:\d\d$/;
alert( regexp.test(goodInput) ); // true
alert( regexp.test(badInput) ); // false
```

La coincidencia para `pattern:\d\d:\d\d` debe comenzar exactamente después del inicio de texto`pattern:^`, y seguido inmediatamente, el final `pattern:$`.

Toda la cadena debe estar exactamente en este formato. Si hay alguna desviación o un carácter adicional, el resultado es `falso`.

Las anclas se comportan de manera diferente si la bandera `pattern:m` está presente. Lo veremos en el próximo artículo.

```smart header="Las anclas tienen \"ancho cero\""
Las anclas `pattern:^` y `pattern:$` son pruebas. Ellas tienen ancho cero.

En otras palabras, no coinciden con un carácter, sino que obligan al motor regexp a verificar la condición (inicio/fin de texto).
```
