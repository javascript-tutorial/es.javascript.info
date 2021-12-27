# Backtracking catastrófico

Algunas expresiones regulares parecen simples pero pueden ejecutarse durante demasiado tiempo e incluso "colgar" el motor de JavaScript.

Tarde o temprano la mayoría de los desarrolladores se enfrentan ocasionalmente a este comportamiento. El síntoma típico: una expresión regular funciona bien a veces, pero para ciertas cadenas se "cuelga" consumiendo el 100% de la CPU.

En este caso el navegador sugiere matar el script y recargar la página. No es algo bueno, sin duda.

Para el lado del servidor de JavaScript tal regexp puede colgar el proceso del servidor, que es aún peor. Así que definitivamente deberíamos echarle un vistazo.

## Ejemplo

Supongamos que tenemos una cadena y queremos comprobar si está formada por palabras `pattern:\w+` con un espacio opcional `pattern:\s?` después de cada una.

Una forma obvia de construir una regexp sería tomar una palabra seguida de un espacio opcional `pattern:\w+\s?` y luego repetirla con `*`.

Esto nos lleva a la regexp `pattern:^(\w+\s?)*$` que especifica cero o más palabras de este tipo, que comienzan al principio `pattern:^` y terminan al final `pattern:$` de la línea.

En la práctica:

```js run
let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false
```

La regexp parece funcionar. El resultado es correcto. Aunque en ciertas cadenas tarda mucho tiempo. Tanto tiempo que el motor de JavaScript se "cuelga" con un consumo del 100% de la CPU.

Si ejecuta el ejemplo de abajo probablemente no se verá nada ya que JavaScript simplemente se "colgará". El navegador dejará de reaccionar a los eventos, la interfaz de usuario dejará de funcionar (la mayoría de los navegadores sólo permiten el desplazamiento). Después de algún tiempo se sugerirá recargar la página. Así que ten cuidado con esto:

```js run
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp hang!";

// tardará mucho tiempo
alert( regexp.test(str) );
```

Para ser justos observemos que algunos motores de expresión regular pueden manejar este tipo de búsqueda con eficacia, por ejemplo, la versión del motor V8 a partir de la 8.8 puede hacerlo (por lo que Google Chrome 88 no se cuelga aquí) mientras que el navegador Firefox sí se cuelga. 

## Ejemplo simplificado

¿Qué ocurre? ¿Por qué se cuelga la expresión regular?

Para entenderlo simplifiquemos el ejemplo: elimine los espacios `pattern:\s?`. Entonces se convierte en `pattern:^(\w+)*$`.

Y, para hacer las cosas más obvias sustituyamos `pattern:\w` por `pattern:\d`. La expresión regular resultante sigue colgando, por ejemplo:

```js run
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789z";

// tardará mucho tiempo (¡cuidado!)
alert( regexp.test(str) );
```

¿Qué ocurre con la regexp?

En primer lugar uno puede notar que la regexp `pattern:(\d+)*` es un poco extraña. El cuantificador `pattern:*` parece extraño. Si queremos un número podemos utilizar `pattern:\d+`.

Efectivamente la regexp es artificial; la hemos obtenido simplificando el ejemplo anterior. Pero la razón por la que es lenta es la misma. Así que vamos a entenderlo y entonces el ejemplo anterior se hará evidente.

¿Qué sucede durante la búsqueda de `pattern:^(\d+)*$` en la línea `subject:123456789z` (acortada un poco para mayor claridad, por favor tenga en cuenta un carácter no numérico `subject:z` al final, es importante) que tarda tanto?

Esto es lo que hace el motor regexp:

1. En primer lugar el motor regexp intenta encontrar el contenido de los paréntesis: el número `pattern:d+`. El `pattern:+` es codicioso por defecto, por lo que consume todos los dígitos:

    ```
    \d+.......
    (123456789)z
    ```

    Una vez consumidos todos los dígitos se considera que se ha encontrado el `pattern:d+` (como `match:123456789`).

    Entonces se aplica el cuantificador de asterisco `pattern:(\d+)*`. Pero no hay más dígitos en el texto, así que el asterisco no da nada.

    El siguiente carácter del patrón es el final de la cadena `pattern:$`. Pero en el texto tenemos `subject:z` en su lugar, por lo que no hay coincidencia:

    ```
               X
    \d+........$
    (123456789)z
    ```

2. Como no hay ninguna coincidencia, el cuantificador codicioso `pattern:+` disminuye el recuento de repeticiones, retrocede un carácter.

    Ahora `pattern:\d+` toma todos los dígitos excepto el último (`match:12345678`):
    ```
    \d+.......
    (12345678)9z
    ```
3. Entonces el motor intenta continuar la búsqueda desde la siguiente posición (justo después de `match:12345678`).

    Se puede aplicar el asterisco `patrón:(\d+)*` : da una coincidencia más de `patrón:\d+`, el número `match:9`:

    ```

    \d+.......\d+
    (12345678)(9)z
    ```

    El motor intenta coincidir con `pattern:$` de nuevo, pero falla, porque encuentra `subject:z` en su lugar:

    ```
                 X
    \d+.......\d+
    (12345678)(9)z
    ```


4. No hay coincidencia así que el motor continuará con el retroceso disminuyendo el número de repeticiones. El retroceso generalmente funciona así: el último cuantificador codicioso disminuye el número de repeticiones hasta llegar al mínimo. Entonces el cuantificador codicioso anterior disminuye, y así sucesivamente.

    Se intentan todas las combinaciones posibles. Estos son sus ejemplos.

    El primer número `pattern:\d+` tiene 7 dígitos y luego un número de 2 dígitos:

    ```
                 X
    \d+......\d+
    (1234567)(89)z
    ```

    El primer número tiene 7 dígitos y luego dos números de 1 dígito cada uno:

    ```
                   X
    \d+......\d+\d+
    (1234567)(8)(9)z
    ```

    El primer número tiene 6 dígitos y luego un número de 3 dígitos:

    ```
                 X
    \d+.......\d+
    (123456)(789)z
    ```

    El primer número tiene 6 dígitos, y luego 2 números:

    ```
                   X
    \d+.....\d+ \d+
    (123456)(78)(9)z
    ```

    ...Y así sucesivamente.


Hay muchas formas de dividir una secuencia de dígitos `123456789` en números. Para ser precisos, hay <code>2<sup>n</sup>-1</code>, donde `n` es la longitud de la secuencia.

- Para `123456789` tenemos `n=9`, lo que da 511 combinaciones.
- Para una secuencia más larga con "n=20" hay alrededor de un millón (1048575) de combinaciones.
- Para `n=30` - mil veces más (1073741823 combinaciones).

Probar cada una de ellas es precisamente la razón por la que la búsqueda lleva tanto tiempo.

## Volver a las palabras y cadenas

Lo mismo ocurre en nuestro primer ejemplo, cuando buscamos palabras por el patrón `pattern:^(\w+\s?)*$` en la cadena `subject:An input that hangs!`.

La razón es que una palabra puede representarse como un `pattern:\w+` o muchos:

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

Para un humano es obvio que puede no haber coincidencia porque la cadena termina con un signo de exclamación `!` pero la expresión regular espera un carácter denominativo `pattern:\w` o un espacio `pattern:\s` al final. Pero el motor no lo sabe.

El motor prueba todas las combinaciones de cómo la regexp `pattern:(\w+\s?)*` puede "consumir" la cadena, incluyendo las variantes con espacios `pattern:(\w+\s)*` y sin ellos `pattern:(\w+)*` (porque los espacios `pattern:\s?` son opcionales). Como hay muchas combinaciones de este tipo (lo hemos visto con dígitos), la búsqueda lleva muchísimo tiempo.

¿Qué hacer?

¿Debemos activar el lazy mode?

Desgraciadamente eso no ayudará: si sustituimos `pattern:\w+` por `pattern:\w+?` la regexp seguirá colgada. El orden de las combinaciones cambiará, pero no su número total.

Algunos motores de expresiones regulares hacen análisis complicados y automatizaciones finitas que permiten evitar pasar por todas las combinaciones o hacerlo mucho más rápido, pero la mayoría de los motores no lo hacen. Además, eso no siempre ayuda.

## ¿Cómo solucionarlo?

Hay dos enfoques principales para solucionar el problema.

El primero es reducir el número de combinaciones posibles.

Hagamos que el espacio no sea opcional reescribiendo la expresión regular como `pattern:^(\w+\s)*\w*$` buscaremos cualquier número de palabras seguidas de un espacio `pattern:(\w+\s)*`, y luego (opcionalmente) una palabra final `pattern:\w*`.

Esta regexp es equivalente a la anterior (coincide con lo mismo) y funciona bien:

```js run
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false
```

¿Por qué ha desaparecido el problema?

Porque ahora el espacio es obligatorio.

La regexp anterior, si omitimos el espacio, se convierte en `pattern:(\w+)*`, dando lugar a muchas combinaciones de `\w+` dentro de una misma palabra

Así, `subject:input` podría coincidir con dos repeticiones de `pattern:\w+` así:

```
\w+  \w+
(inp)(ut)
```

El nuevo patrón es diferente: `pattern:(\w+\s)*` especifica repeticiones de palabras seguidas de un espacio. La cadena `subject:input` no puede coincidir con dos repeticiones de `pattern:\w+\s`, porque el espacio es obligatorio.

Ahora se ahorra el tiempo necesario para probar un montón de combinaciones (en realidad la mayoría).

## Previniendo el backtracking

Sin embargo no siempre es conveniente reescribir una regexp. En el ejemplo anterior era fácil pero no siempre es obvio cómo hacerlo.

Además una regexp reescrita suele ser más compleja y eso no es bueno. Las regexps son suficientemente complejas sin necesidad de esfuerzos adicionales.

Por suerte hay un enfoque alternativo. Podemos prohibir el retroceso para el cuantificador.

La raíz del problema es que el motor de regexp intenta muchas combinaciones que son obviamente erróneas para un humano.

Por ejemplo, en la regexp `pattern:(\d+)*$` es obvio para un humano que `patrón:+` no debería retroceder. Si sustituimos un `patrón:\d+` por dos `pattern:\d+\d+` separados nada cambia:

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

Y en el ejemplo original `pattern:^(\w+\s?)*$` podemos querer prohibir el backtracking en `pattern:\w+`. Es decir: `pattern:\w+` debe coincidir con una palabra entera, con la máxima longitud posible. No es necesario reducir el número de repeticiones en `pattern:\w+` o dividirlo en dos palabras `pattern:\w+\w+` y así sucesivamente.

Los motores de expresiones regulares modernos admiten cuantificadores posesivos para ello. Los cuantificadores regulares se convierten en posesivos si añadimos `pattern:+` después de ellos. Es decir, usamos `pattern:\d++` en lugar de `pattern:\d+` para evitar que `pattern:+` retroceda.

Los cuantificadores posesivos son de hecho más simples que los "regulares". Simplemente coinciden con todos los que pueden sin ningún tipo de retroceso. El proceso de búsqueda sin retroceso es más sencillo.

También existen los llamados "grupos de captura atómicos", una forma de desactivar el retroceso dentro de los paréntesis.

...Pero la mala noticia es que, por desgracia, en JavaScript no están soportados.

Sin embargo, podemos emularlos utilizando "lookahead transform".

### Lookahead al rescate!

Así que hemos llegado a temas realmente avanzados. Nos gustaría que un cuantificador como `pattern:+` no retrocediera porque a veces retroceder no tiene sentido.

El patrón para tomar tantas repeticiones de `pattern:\w` como sea posible sin retroceder es: `pattern:(?=(\w+))\1`. Por supuesto, podríamos tomar otro patrón en lugar de `pattern:\w`.

Puede parecer extraño pero en realidad es una transformación muy sencilla.

Vamos a descifrarla:

- Lookahead `pattern:?=` busca la palabra más larga `pattern:\w+` a partir de la posición actual.
- El contenido de los paréntesis con `pattern:?=...` no es memorizado por el motor así que envuelva `pattern:\w+` en paréntesis. Entonces el motor memorizará su contenido
- ...y nos permitirá hacer referencia a él en el patrón como `pattern:\1`.

Es decir: miramos hacia adelante y si hay una palabra `pattern:\w+`, entonces la emparejamos como `pattern:\1`.

¿Por qué? Porque el lookahead encuentra una palabra `pattern:\w+` como un todo y la capturamos en el patrón con `pattern:\1`. Así que esencialmente implementamos un cuantificador posesivo más `pattern:+`. Captura sólo la palabra entera `patrón:\w+`, no una parte de ella.

Por ejemplo, en la palabra `subject:JavaScript` no sólo puede coincidir con `match:Java` sino que deja fuera `match:Script` para que coincida con el resto del patrón.

He aquí la comparación de dos patrones:

```js run
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. En la primera variante, `pattern:\w+` captura primero la palabra completa `subject:JavaScript`, pero luego `pattern:+` retrocede carácter por carácter, para intentar coincidir con el resto del patrón, hasta que finalmente tiene éxito (cuando `pattern:\w+` coincide con `match:Java`).
2. En la segunda variante `pattern:(?=(\w+))` mira hacia adelante y encuentra la palabra `subject:JavaScript`, que está incluida en el patrón como un todo por `pattern:\1`, por lo que no hay manera de encontrar `subject:Script` después de ella.

Podemos poner una expresión regular más compleja en `pattern:(?=(\w+))\1` en lugar de `pattern:\w`, cuando necesitemos prohibir el retroceso para `pattern:+` después de ella.

```smart
Hay más (en inglés) acerca de la relación entre los cuantificadores posesivos y lookahead en los artículos [Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](https://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) y [Mimicking Atomic Groups](https://blog.stevenlevithan.com/archives/mimic-atomic-groups).
```

Reescribamos el primer ejemplo utilizando lookahead para evitar el backtracking:

```js run
let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // true

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false, funciona, ¡y rápido!
```

Aquí se utiliza `pattern:\2` en lugar de `pattern:\1` porque hay paréntesis exteriores adicionales. Para evitar enredarnos con los números, podríamos dar a los paréntesis un nombre, por ejemplo `pattern:(?<word>\w+)`.

```js run
// nombramos a los parentesis ?<word>, y los referenciamos como \k<word>
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex hang!";

alert( regexp.test(str) ); // false

alert( regexp.test("A correct string") ); // true
```

El problema descrito en este artículo se llama "backtracking catastrófico".

Cubrimos dos formas de resolverlo:
- Reescribir la regexp para reducir el número de combinaciones posibles.
- Evitar el retroceso.
