
# Unicode, String internals

```warn header="Conocimiento avanzado"
Esta sección ahonda en los interioridades de los string. Este conocimiento será útil para ti si planeas lidiar con emojis, raros caracteres matemáticos, jeroglíficos, u otros símbolos extraños.
```

Como ya mencionamos, los strings de JavaScript están basados en [Unicode](https://es.wikipedia.org/wiki/Unicode): cada carácter está representado por una secuencia de entre 1 y 4 bytes.

JavaScript nos permite insertar un carácter en un string por medio de su código hexadecimal Unicode, usando estas tres notaciones:

- `\xXX`

    `XX` deben ser dos dígitos hexadecimales con un valor entre `00` y `FF`. Entonces, `\xXX` es el carácter cuyo código Unicode es `XX`.

    Como la notación `\xXX` admite solo dos dígitos hexadecimales, puede representar solamente los primeros 256 caracteres Unicode.

    Estos primeros 256 caracteres incluyen el alfabeto latino, la mayoría de caracteres de sintaxis básicos, y algunos otros. Por ejemplo, `"\x7A"` es lo mismo que `"z"` (Unicode `U+007A`).

    ```js run
    alert( "\x7A" ); // z
    alert( "\xA9" ); // ©, el símbolo de copyright
    ```

- `\uXXXX`
    `XXXX` deben ser exactamente 4 dígitos hexadecimales con un valor entre `0000` y `FFFF`. Entonces, `\uXXXX` es el carácter cuyo código Unicode es `XXXX`.

    Caracteres con un valor Unicode mayor que `U+FFFF` también pueden ser representados con esta notación, pero en ese caso necesitamos usar los llamados "pares sustitutos", descritos más adelante.

    ```js run
    alert( "\u00A9" ); // ©, lo mismo que \xA9, usando la notación de 4 dígitos hexa
    alert( "\u044F" ); // я, letra del alfabeto cirílico
    alert( "\u2191" ); // ↑, símbolo flecha
    ```

- `\u{X…XXXXXX}`

    `X…XXXXXX` debe ser un valor hexadecimal de 1 a 6 bytes entre `0` y `10FFFF` (el mayor punto de código definido por Unicode). Esta notación nos permite fácilmente representar todos los caracteres Unicode existentes.

    ```js run
    alert( "\u{20331}" ); // 佫, un raro carácter chino
    alert( "\u{1F60D}" ); // 😍, un símbolo de cara sonriente
    ```

## Pares sustitutos [#surrogate-pairs]

Todos los caracteres frecuentes tienen códigos de 2 bytes (4 dígitos hexa). Las letras de la mayoría de los lenguajes europeos, números, los conjuntos básicos de caracteres ideográficos CJK unificados (CJK: de los sistemas chino, japonés y coreano), tienen un representación de 2 bytes.

Inicialmente, JavaScript estaba basado en la codificación UTF-16 que solo permite 2 bytes por carácter. Pero 2 bytes solo permiten 65536 combinaciones y eso no es suficiente para cada símbolo Unicode posible.

Entonces, los símbolos raros que requieren más de 2 bytes son codificados con un par de caracteres de 2 bytes llamado "par sustituto".

Como efecto secundario, el largo de tales símbolos es `2`:

```js run
alert( '𝒳'.length ); // 2, carácter matemático X capitalizado
alert( '😂'.length ); // 2, cara con lágrimas de risa
alert( '𩷶'.length ); // 2, un raro carácter chino
```

Esto es porque los pares sustitutos no existían cuando JavaScript fue creado, por ello no es procesado correctamente por el lenguaje.

En realidad tenemos un solo símbolo en cada línea de los string de arriba, pero la propiedad `length` los muestra con un largo de `2`.

Obtener un símbolo puede ser intrincado, porque la mayoría de las características del lenguaje trata a los pares sustitutos como de 2 caracteres.

Por ejemplo, aquí vemos dos caracteres extraños en la salida:

```js run
alert( '𝒳'[0] ); // muestra símbolos extraños...
alert( '𝒳'[1] ); // ...partes del par sustituto
```

Las 2 partes del par sustituto no tienen significado el uno sin el otro. Entonces las alertas del ejemplo en realidad muestran basura.

Técnicamente, los pares sustitutos son también detectables por su propio código: si un carácter tiene código en el intervalo de `0xd800..0xdbff`, entonces es la primera parte de un par sustituto. El siguiente carácter (segunda parte) debe tener el código en el intervalo `0xdc00..0xdfff`. Estos intervalos son reservados exclusivamente para pares sustitutos por el estándar.

Los métodos `String.fromCodePoint` y `str.codePointAt` fueron añadidos en JavaScript para manejar los pares sustitutos.

Esencialmente, son lo mismo que [String.fromCharCode](mdn:js/String/fromCharCode) y [str.charCodeAt](mdn:js/String/charCodeAt), pero tratan a los pares sustitutos correctamente.

Se puede ver la diferencia aquí:

```js run
// charCodeAt no percibe los pares sustitutos, entonces da el código de la primera parte de 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt reconoce los pares sustitutos
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, lee ambas partes del par sustituto
```

Dicho esto, si tomamos desde la posición 1 (y hacerlo es incorrecto aquí), ambas funciones devolverán solo la segunda parte del par:

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// segunda parte del par, sin sentido
```

Encontrarás más formas de trabajar con pares sustitutos más adelante en el capítulo <info:iterable>. Probablemente hay bibliotecas especiales para eso también, pero nada lo suficientemente famoso como para sugerirlo aquí.

````warn header="En conclusión: partir strings en un punto arbitrario es peligroso"
No podemos simplemente separar un string en una posición arbitraria, por ejemplo tomar `str.slice(0, 4)`, y confiar en que sea un string válido:

```js run
alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
```

Aquí podemos ver basura (la primera mitad del par sustituto de la sonrisa) en la salida.

Simplemente sé consciente de esto si quieres trabajar con confianza con los pares sustitutos. Puede que no sea un gran problema, pero al menos deberías entender lo que pasa.
````

### Marcas diacríticas y normalización

En muchos idiomas hay símbolos compuestos, con un carácter de base y una marca arriba o debajo.

Por ejemplo, la letra `a` puede ser el carácter base para estos caracteres: `àáâäãåā`.

Los caracteres "compuestos" más comunes tienen su propio código en la tabla UTF-16. Pero no todos ellos, porque hay demasiadas combinaciones posibles.

Para soportar composiciones arbitrarias, el estándar Unicode permite usar varios caracteres Unicode: el carácter base y uno o varios caracteres de "marca" que lo "decoran".

Por ejemplo, si tenemos `S` seguido del carácter especial "punto arriba" (código `\u0307`), se muestra como Ṡ.

```js run
alert('S\u0307'); // Ṡ
```

Si necesitamos una marca adicional sobre la letra (o debajo de ella), no hay problema, simplemente se agrega el carácter de marca necesario.

Por ejemplo, si agregamos un carácter "punto debajo" (código `\u0323`), entonces tendremos" S con puntos arriba y abajo ": `Ṩ`.

Ejemplo:

```js run
alert( 'S\u0307\u0323' ); // Ṩ
```

Esto proporciona una gran flexibilidad, pero también un problema interesante: dos caracteres pueden ser visualmente iguales, pero estar representados con diferentes composiciones Unicode.

Por ejemplo:

```js run
let s1 = 'S\u0307\u0323'; // Ṩ, S + punto arriba + punto debajo
let s2 = 'S\u0323\u0307'; // Ṩ, S + punto debajo + punto arriba

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false aunque los caracteres se ven idénticos (?!)
```

Para resolver esto, existe un algoritmo de "normalización Unicode" que lleva cada cadena a la forma "normal".

Este es implementado por [str.normalize()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/normalize).

```js run
alert( "S\u0307\u0323".normalize() == "S\u0323\u0307".normalize() ); // true
```

Lo curioso de esta situación particular es que `normalize ()` reúne una secuencia de 3 caracteres en uno: `\u1e68` (S con dos puntos).

```js run
alert( "S\u0307\u0323".normalize().length ); // 1

alert( "S\u0307\u0323".normalize() == "\u1e68" ); // true
```

En realidad, este no es siempre el caso. La razón es que el símbolo `Ṩ` es "bastante común", por lo que los creadores de Unicode lo incluyeron en la tabla principal y le dieron el código.

Si desea obtener más información sobre las reglas y variantes de normalización, se describen en el apéndice del estándar: [Unicode](https://www.unicode.org/reports/tr15/), pero para la mayoría de los propósitos prácticos, la información de esta sección es suficiente.
