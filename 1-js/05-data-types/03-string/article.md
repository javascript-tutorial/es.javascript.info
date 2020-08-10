# Strings

En JavaScript, los datos textuales son almacenados como strings (cadena de caracteres). No hay un tipo de datos separado para caracteres unitarios.

El formato interno para strings es siempre [UTF-16](https://es.wikipedia.org/wiki/UTF-16), no está vinculado a la codificación de la página.

## Comillas

Recordemos los tipos de comillas.

Los strings pueden estar entre comillas simples, comilllas dobles o backticks (acento grave):

```js
let single = 'comillas simples';
let double = "comillas dobles";

let backticks = `backticks`;
```

<<<<<<< HEAD
Comillas simples y dobles son escencialmente lo mismo. Sin embargo los "backticks" nos permiten ingresar expresiones dentro del string, incluso llamados a funciones:
=======
Single and double quotes are essentially the same. Backticks, however, allow us to embed any expression into the string, by wrapping it in `${…}`:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
function sum(a, b) {
  return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.
```

Otra ventaja de usar backticks es que nos permiten extender en múltiples líneas el string:

```js run
let guestList = `Invitados:
 * Juan
 * Pedro
 * Maria
`;

alert(guestList); // una lista de invitados, en múltiples líneas
```

<<<<<<< HEAD
Se ve natural, ¿no es cierto? Pero las comillas simples y dobles no funcionan de esa manera.

Si intentamos usar comillas simples o dobles de la misma forma, obtendremos un error:

```js run
let guestList = "Invitados:  // Error: Unexpected token ILLEGAL
  * Juan";
=======
Looks natural, right? But single or double quotes do not work this way.

If we use them and try to use multiple lines, there'll be an error:

```js run
let guestList = "Guests: // Error: Unexpected token ILLEGAL
  * John";
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

Las comillas simples y dobles provienen de la creación de lenguaje en tiempos ancestrales, cuando la necesidad de múltiples líneas no era tomada en cuenta. Los backticks aparecieron mucho después y por ende son más versátiles.

<<<<<<< HEAD
Los backticks además nos permiten especificar una "función de plantilla" antes del primer backtick. La sintaxis es: <code>func&#96;string&#96;</code>. La función `func` es llamada automáticamente, recibe el string y la expresión insertada y los puede procesar. Puedes leer más sobre esto en [docs](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals). Eso se llama "plantillas etiquetadas". Esta característica hace que sea más fácil rodear strings en plantillas personalizadas u otra funcionalidad, pero es raramente usada.

## Caracteres especiales

Es posible crear strings de múltiples líneas usando comillas simples, usando un llamado "carácter de nueva línea", escrito como `\n`, lo que denota un salto de línea:
=======
Backticks also allow us to specify a "template function" before the first backtick. The syntax is: <code>func&#96;string&#96;</code>. The function `func` is called automatically, receives the string and embedded expressions and can process them. This is called "tagged templates". This feature makes it easier to implement custom templating, but is rarely used in practice. You can read more about it in the [manual](mdn:/JavaScript/Reference/Template_literals#Tagged_templates). 

## Special characters

It is still possible to create multiline strings with single and double quotes by using a so-called "newline character", written as `\n`, which denotes a line break:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
let guestList = 'Invitados:\n * Juan\n * Pedro\n * Maria';

alert(guestList); // una lista de invitados en múltiples líneas
```

<<<<<<< HEAD
Por ejemplo, estas dos líneas son iguales, solo que escritas en forma diferente:

```js run
let str1 = "Hello\nWorld"; // dos líneas usando el "símbolo de nueva línea"

// dos líneas usando nueva línea normal y backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Existen otros tipos de caracteres especiales, menos comunes. 
=======
For example, these two lines are equal, just written differently:

```js run
let str1 = "Hello\nWorld"; // two lines using a "newline symbol"

// two lines using a normal newline and backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

There are other, less common "special" characters.

Here's the full list:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Esta es la lista completa:

| Carácter | Descripción |
|-----------|-------------|
<<<<<<< HEAD
|`\n`|Nueva línea|
|`\r`|Carriage return (retorno de carro): No se usa solo. Los archivos de texto de Windows usan una combinaión de dos caracteres `\r\n` para representar un corte de línea. |
|`\'`, `\"`|Comillas|
|`\\`|Barra invertida|
|`\t`|Tabulación|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- Se mantienen por compatibilidad. No son usados actualmente |
|`\xXX`|Carácter Unicode con el hexadecimal dado `XX`, por ej. `'\x7A'` es lo mismo que `'z'`.|
|`\uXXXX`|Un símbolo unicode con el hexadecimal dado `XXXX` en codificación UTF-16, p.ej. `\u00A9` -- es el unicode para el símbolo copyright `©`. Debe ser exactamente 4 dígitos  hex. |
|`\u{X…XXXXXX}` (1 a 6 caracteres hex)|Un símbolo unicode con el hexadecimal dado en codificación UTF-32. Algunos caracteres raros son codificados con  dos símbolos unicode, tomando 4 bytes. De esta manera podemos insertar códigos largos. |
=======
|`\n`|New line|
|`\r`|Carriage return: not used alone. Windows text files use a combination of two characters `\r\n` to represent a line break. |
|`\'`, `\"`|Quotes|
|`\\`|Backslash|
|`\t`|Tab|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- kept for compatibility, not used nowadays. |
|`\xXX`|Unicode character with the given hexadecimal unicode `XX`, e.g. `'\x7A'` is the same as `'z'`.|
|`\uXXXX`|A unicode symbol with the hex code `XXXX` in UTF-16 encoding, for instance `\u00A9` -- is a unicode for the copyright symbol `©`. It must be exactly 4 hex digits. |
|`\u{X…XXXXXX}` (1 to 6 hex characters)|A unicode symbol with the given UTF-32 encoding. Some rare characters are encoded with two unicode symbols, taking 4 bytes. This way we can insert long codes. |
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Ejemplos con unicode:

```js run
<<<<<<< HEAD
alert('\u00A9'); // ©
alert('\u{20331}'); // 佫, un raro jeroglífico chino (unicode largo)
alert('\u{1F60D}'); // 😍, un emoticón sonriendo (otro unicode largo)
=======
alert( "\u00A9" ); // ©
alert( "\u{20331}" ); // 佫, a rare Chinese hieroglyph (long unicode)
alert( "\u{1F60D}" ); // 😍, a smiling face symbol (another long unicode)
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

Todos los caracteres especiales comienzan con una barra invertida `\`. También conocida como "carácter de escape".

<<<<<<< HEAD
También la usamos si queremos insertar una comilla dentro de un string.
=======
We might also use it if we wanted to insert a quote into the string.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Por ejemplo:

```js run
alert('Yo soy \'Walrus\''); // Yo soy 'Walrus'
```

Como puedes ver, debimos anteponer un caracter de escape `\` antes de cada comilla ya que de otra manera hubiera indicado el final del string.

<<<<<<< HEAD
Obviamente, eso se refiere sólo a las comillas que son iguales a las que están rodeando al string. Por lo que, una solución más elegante sería cambiar a comillas dobles o backticks:
=======
Of course, only to the quotes that are the same as the enclosing ones need to be escaped. So, as a more elegant solution, we could switch to double quotes or backticks instead:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
alert(`Yo soy "Walrus"`); // Yo soy "Walrus"
```

Notar que el caracter de escape `\` sirve para la correcta lectura del string por JavaScript, luego desaparece. El string que quedó en la memoria no incluye `\`. Lo puedes ver claramente en el `alert` del ejemplo anterior.

¿Pero qué pasa si necesitamos incluir un carácter de escape `\` en el string?

Es posible, pero debemos duplicarlo como sigue `\\`:

```js run
alert(`El carácter de escape: \\`); // El carácter de escape: \
```

<<<<<<< HEAD
## Largo del string (String length)

La propiedad 'length' entrega el largo del string:
=======
## String length

The `length` property has the string length:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
alert(`Mi\n`.length); // 3
```

Notar que `\n` es un carácter "especial" único, por lo que el largo es `3`.

```warn header="`length` es una propiedad"
Gente con experiencia en otros lenguajes a veces comete el error de tipear `str.length()` en vez de `str.length`. Eso no funciona.

Por favor notar que `str.length` es una propiedad numérica, no una función. No hay necesidad de agregar un paréntesis después de ella.
```

## Accediendo caracteres

Para acceder a un carácter en la posición `pos`, se debe usar paréntesis cuadrados `[pos]` o llamar al método [str.charAt(pos)](mdn:js/String/charAt). El primer carácter comienza desde la posición cero:

```js run
let str = `Hola`;

// el primer carácter
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// el último carácter
alert( str[str.length - 1] ); // a
```

Los corchetes son una forma moderna de acceder a los caracteres, mientras que `charAt` existe principalmente por razones históricas.

La única diferencia entre ellos es que si no se encuentra un caracter, `[]` devuelve `undefined`, y `charAt` devuelve un string vacío.

```js run
let str = `Hola`;

alert(str[1000]); // undefined
alert(str.charAt(1000)); // '' (un string vacío)
```

Podemos además iterar sobre los caracteres usando `for..of`:

```js run
for (let char of 'Hola') {
  alert(char); // H,o,l,a (char se convierte en "H", luego "o", luego "l" etc)
}
```

## Strings son inmutables

Strings no pueden ser modificados en JavaScript. Es imposible modificar un carácter.

Intentémoslo para demostrar que no funciona:

```js run
let str = 'Hola';

str[0] = 'h'; // error
alert(str[0]); // no funciona
```

La solución alternativa es crear un nuevo string y asignarlo a `str` en vez de aisgnarlo al anterior.

Por ejemplo:

```js run
let str = 'Hola';

<<<<<<< HEAD
str = 'h' + str[1]; // reemplaza el string
=======
str = 'h' + str[1]; // replace the string
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

alert( str ); // hola
```

En la sección siguiente veremos más ejemplos de esto.

## Cambiando mayúsculas y minúsuculas

Los métodos [toLowerCase()](mdn:js/String/toLowerCase) y [toUpperCase()](mdn:js/String/toUpperCase) cambian los caracteres a minúscula y mayúscula respectivamente:

```js run
alert('Interfaz'.toUpperCase()); // INTERFAZ
alert('Interfaz'.toLowerCase()); // interfaz
```

Si queremos un solo caractér en minúscula:

```js
alert('Interfaz'[0].toLowerCase()); // 'i'
```

## Buscando una subcadena de caracteres

Existen muchas formas de buscar por subcadenas de caracteres dentro de una cadena completa.

### str.indexOf

El primer método es [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Este busca un `substr` en `str`, comenzando desde la posición entregada `pos`, y retorna la posición donde es encontrada la coincidencia o `-1` en caso de no encontrar nada.

Por ejemplo:

```js run
let str = 'Widget con id';

alert(str.indexOf('Widget')); // 0, ya que 'Widget' es encontrado al comienzo
alert(str.indexOf('widget')); // -1, no es encontrado, la búsqueda toma en cuenta minúsculas y mayúsculas.

alert(str.indexOf('id')); // 1, "id" es encontrado en la posición 1 (..idget con id)
```

El segundo parámetro es opcional y nos permite buscar desde la posición entregada.

Por ejemplo, la primera ocurrencia de `"id"` es en la posición `1`. Para buscar por la siguiente ocurrencia, comencemos a buscar desde la posoción `2`:

```js run
let str = 'Widget con id';

alert(str.indexOf('id', 2)); // 12
```

<<<<<<< HEAD
Si estamos interesados en todas las ocurrencias, podemos correr `indexOf` en un bucle. Cada nuevo llamado es hecho utilizando la posición posterior a la encontrada anteriormente:
=======
If we're interested in all occurrences, we can run `indexOf` in a loop. Every new call is made with the position after the previous match:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
let str = 'Astuto como un zorro, fuerte como un buey';

let target = 'como'; // busquemos por él

let pos = 0;
while (true) {
  let foundPos = str.indexOf(target, pos);
  if (foundPos == -1) break;

  alert(`Encontrado en ${foundPos}`);
  pos = foundPos + 1; // continuar la búsqueda desde la siguiente posición
}
```

Podemos escribir el mismo algoritmo pero más corto:

```js run
let str = 'Astuto como un zorro, fuerte como un buey';
let target = "como";

*!*
let pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
  alert( pos );
}
*/!*
```

```smart header="`str.lastIndexOf(substr, position)`"
Existe también un método similar [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) que busca desde el final del string hasta el comienzo.

Este imprimirá las ocurrencias en orden invertido.
```

Existe un leve inconveniente con `indexOf` en la prueba `if`. No podemos utilizarlo en el `if` como sigue:

```js run
let str = "Widget con id";

if (str.indexOf("Widget")) {
    alert("Lo encontramos"); // no funciona!
}
```

La `alerta` en el ejemplo anterior no se muestra ya que `str.indexOf("Widget")` retorna `0` (lo que significa que encontró el string en la posoción inicial). Correcto pero `if` considera `0` como `falso`.

Por lo que debemos buscar por `-1` como sigue:

```js run
let str = "Widget con id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Lo encontramos"); // ahora funciona!
}
```

<<<<<<< HEAD
#### El truco "bitwise NOT"

Uno de los antiguos trucos es el operador [bitwise NOT](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Bitwise_Operators#Bitwise_NOT)) `~`. Este convierte el número en un entero de 32-bits (elimina la parte decimal si es que existe) y luego invierte todos los bits en su representación binaria.

En la práctica, esto significa una simple cosa: Para enteros de 32 bits, `~n` es igual a `-(n+1)`.
=======
#### The bitwise NOT trick

One of the old tricks used here is the [bitwise NOT](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Bitwise_NOT) `~` operator. It converts the number to a 32-bit integer (removes the decimal part if exists) and then reverses all bits in its binary representation.

In practice, that means a simple thing: for 32-bit integers `~n` equals `-(n+1)`.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Por ejemplo:

```js run
alert( ~2 ); // -3, lo mismo que -(2+1)
alert( ~0 ); // -1, lo mismo que -(0+1)
alert( ~1 ); // -2, lo mismo que -(1+1)
*!*
alert( ~-1 ); // 0, lo mismo que -(-1+1)
*/!*
```

<<<<<<< HEAD
Como podemos ver, `~n` es cero sólo si `n == -1`.  (para cualquier entero de 32-bit con signo).

Por lo que, la prueba `if ( ~str.indexOf("...") )` es veraz y el resultado de ``indexOf no es `-1`. En otras palabras, cuando es encontrado.
=======
As we can see, `~n` is zero only if `n == -1` (that's for any 32-bit signed integer `n`).

So, the test `if ( ~str.indexOf("...") )` is truthy only if the result of `indexOf` is not `-1`. In other words, when there is a match.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

La gente lo usa para acortar verificaciones `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Lo encontramos!' ); // funciona
}
```

Usualmente no es recomendado utilizar características del lenguaje en formas no obvias, pero en particular, este truco es utilizado ampliamente en código antiguo, por lo que debemos entenderlo.

Recuerda: `if (~str.indexOf(...))` es leído como "si es encontrado".

<<<<<<< HEAD
Para ser preciso, como los números grandes son truncados a 32 bits por el operador `~`,  existen otros números que dan `0`, el menor es `~4294967295=0`.  Esto hace que tal chequeo sea correcto solo si el string no es así de largo.

Ahora podemos ver este truco solo en código viejo, porque JavaScript moderno provee el método `.includes` (ver a continuación).
=======
Just remember: `if (~str.indexOf(...))` reads as "if found".

To be precise though, as big numbers are truncated to 32 bits by `~` operator, there exist other numbers that give `0`, the smallest is `~4294967295=0`. That makes such check is correct only if a string is not that long.

Right now we can see this trick only in the old code, as modern JavaScript provides `.includes` method (see below).
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

### includes, startsWith, endsWith

El método más moderno [str.includes(substr, pos)](mdn:js/String/includes) retorna `true/false` dependiendo si `str` contiene `substr` dentro.

Es la opción correcta si lo que necesitamos es encontrar el `substr` pero no necesitamos la posición.

```js run
alert('Widget con id'.includes('Widget')); // true

alert('Hola'.includes('Adios')); // false
```

El segundo argumento opcional de `str.includes` es la posición desde donde comienza a buscar:

```js run
<<<<<<< HEAD
alert('Midget'.includes('id')); // true
alert('Midget'.includes('id', 3)); // false, desde la posición 3 no hay "id"
=======
alert( "Widget".includes("id") ); // true
alert( "Widget".includes("id", 3) ); // false, from position 3 there is no "id"
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

Los métodos [str.startsWith](mdn:js/String/startsWith) (comienza con) y [str.endsWith](mdn:js/String/endsWith) (termina con) hacen exactamente lo que dicen:

```js run
<<<<<<< HEAD
alert('Widget'.startsWith('Wid')); // true, "Widget" comienza con "Wid"
alert('Widget'.endsWith('get')); // true, "Widget" termina con "get"
=======
alert( "Widget".startsWith("Wid") ); // true, "Widget" starts with "Wid"
alert( "Widget".endsWith("get") ); // true, "Widget" ends with "get"
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

## Obteniendo un substring

Existen 3 métodos en JavaScript para obtener un substring: `substring`, `substr` y `slice`.

`str.slice(comienzo [, final])`
: Retorna la parte del string desde `comienzo` hasta (pero sin incluir) `final`.

    Por ejemplo:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', el substring desde 0 hasta 5 (sin incluir 5)
    alert( str.slice(0, 1) ); // 's', desde 0 hasta 1, pero sin incluir 1, por lo que sólo el caracter en 0
    ```

    Si no existe segundo argumento, entonces `slice` va hasta el final del string:

    ```js run
    let str = "st*!*ringify*/!*";
<<<<<<< HEAD
    alert( str.slice(2) ); // ringify, desde la 2nda posición hasta el final
=======
    alert( str.slice(2) ); // 'ringify', from the 2nd position till the end
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
    ```

    También son posibles valores negativos para `comienzo/final`. Ellos indican que la posición es contada desde el final del string.
    

    ```js run
    let str = "strin*!*gif*/!*y";
<<<<<<< HEAD
    // comienza en la 4ta posición desde la derecha, finaliza en la 1era posición desde la derecha
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(comienzo [, final])`
: Devuelve la parte del string _entre_ `comienzo` y `final`.

    Esto es casi lo mismo que `slice`, pero permite que `comienzo` sea mayor que `final`. 
    
    Por ejemplo:
=======

    // start at the 4th position from the right, end at the 1st from the right
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(start [, end])`
: Returns the part of the string *between* `start` and `end`.

    This is almost the same as `slice`, but it allows `start` to be greater than `end`.

    For instance:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

    ```js run
    let str = "st*!*ring*/!*ify";

    // esto es lo mismo para substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...pero no para slice:
    alert( str.slice(2, 6) ); // "ring" (lo mismo)
    alert( str.slice(6, 2) ); // "" (un string vacío)

    ```

<<<<<<< HEAD
    Los argumentos negativos (al contrario de slice) no son soportados, son tratados como `0`.

`str.substr(comienzo [, largo])`
: Retorna la parte del string desde `comienzo`, con el `largo` dado.
=======
    Negative arguments are (unlike slice) not supported, they are treated as `0`.

`str.substr(start [, length])`
: Returns the part of the string from `start`, with the given `length`.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

    A diferencia de los métodos anteriores, este nos permite especificar el `largo` en lugar de la posición final:

    ```js run
    let str = "st*!*ring*/!*ify";
<<<<<<< HEAD
    alert( str.substr(2, 4) ); // ring, desde la 2nda posición toma 4 caracteres
=======
    alert( str.substr(2, 4) ); // 'ring', from the 2nd position get 4 characters
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
    ```

    El primer argumento puede ser negativo, para contar desde el final:

    ```js run
    let str = "strin*!*gi*/!*fy";
<<<<<<< HEAD
    alert( str.substr(-4, 2) ); // gi, desde la 4ta posición toma 2 caracteres
=======
    alert( str.substr(-4, 2) ); // 'gi', from the 4th position get 2 characters
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
    ```

Recapitulemos los métodos para evitar confusiones:

| método                  | selecciona...                                  | negativos                |
| ----------------------- | ------------------------------------------- | ------------------------ |
| `slice(comienzo, final)`     | desde `comienzo` hasta `final` (sin incluir `final`) | permite negativos         |
| `substring(comienzo, final)` | entre `comienzo` y `final`                   | valores negativos significan `0` |
| `substr(comienzo, largo)` | desde `comienzo` toma `largo` caracteres        | permite negativos `comienzo`  |

<<<<<<< HEAD
```smart header="¿Cuál elegir?"
Todos son capaces de hacer el trabajo. Formalmente, `substr` tiene una pequeña desventaja: no es descrito en la especificación central de JavaScript, sino en el anexo B, el cual cubre características sólo de navegadores, que existen principalmente por razones históricas. Por lo que entornos sin navegador pueden fallar en compatibilidad. Pero en la práctica funciona en todos lados.

De las otras dos variantes, `slice` es algo más flexible, permite argumentos negativos y es más corta. Entones, es sufuciente con, de estos tres métodos, recordar únicamente `slice`.
=======
```smart header="Which one to choose?"
All of them can do the job. Formally, `substr` has a minor drawback: it is described not in the core JavaScript specification, but in Annex B, which covers browser-only features that exist mainly for historical reasons. So, non-browser environments may fail to support it. But in practice it works everywhere.

Of the other two variants, `slice` is a little bit more flexible, it allows negative arguments and shorter to write. So, it's enough to remember solely `slice` of these three methods.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

## Comparando strings

Como sabemos desde el capítulo <info:comparison>, strings son comparados carácter por carácter en orden alfabético.

Aunque existen algunas singularidades.

1. Una letra minúscula es siempre mayor que una mayúscula:

   ```js run
   alert('a' > 'Z'); // true
   ```

2. Letras con marcas diacríticas están "fuera de orden":

   ```js run
   alert('Österreich' > 'Zealand'); // true
   ```

   Esto puede conducir a resultados extraños si clasificamos los nombres de estos países. Usualmente, la gente esperaría que `Zealand` apareciera después de `Österreich` en la lista.

Para entender qué pasa, revisemos la representaciín interna de strings en JavaScript.

Todos los strings son codificados usando [UTF-16](https://es.wikipedia.org/wiki/UTF-16). Esto significa: cada carácter tiene un código numérico correspondiente. Existen métodos especiales que permiten obtener el carácter para el código y viceversa.

`str.codePointAt(pos)`
: Retorna el código para el caracter en la posición `pos`:

    ```js run
    // mayúsculas y minúsculas tienen códigos diferentes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Crea un caracter por su `código` numérico:

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    ```
    
    También podemos agregar caracteres unicode por sus códigos usando `\u` seguido de un código hex:

    ```js run
    // 90 es 5a en el sistema hexadecimal
    alert( '\u005a' ); // Z
    ```

Ahora veamos los caracteres con códigos `65..220` (el alfabeto latín y unos extras) haciendo de ellos un string:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert(str);
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

<<<<<<< HEAD
¿Lo ves? Caracteres capitalizados (mayúsculas) van primero, luego unos cuantos caracteres especiales, luego las minúsculas.
=======
See? Capital characters go first, then a few special ones, then lowercase characters, and `Ö` near the end of the output.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Ahora se vuelve obvio por qué `a > Z`.

Los caracteres son comparados por su código numérico. Código mayor significa que el caracter es mayor. El código para `a` (97) es mayor que el código para `Z` (90).

- Todas las letras minúsculas van después de las mayúsculas ya que sus códigos son mayores.
- Algunas letras como `Ö` se mantienen apartadas del alfabeto principal. Aquí el codigo es mayor que cualquiera desde `a` hasta `z`.

<<<<<<< HEAD
### Comparaciones correctas

El algoritmo "correcto" para realizar comparaciónes de strings es más complejo de lo que parece, debido a que los alfabetos son diferentes para diferentes lenguajes. Una letra que se ve igual en dos alfabetos distintos, pueden tener distintas posiciones.

Por lo que el navegador necesita saber el lenguaje para comparar.
=======
### Correct comparisons

The "right" algorithm to do string comparisons is more complex than it may seem, because alphabets are different for different languages.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Por suerte, todos los navegadores modernos (IE10- requiere adicionalmente la biblioteca [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) mantienen la internalización del estandar [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

<<<<<<< HEAD
Este provee un método especial para comparar strings en distintos lenguajes, siguiendo sus reglas.
=======
Luckily, all modern browsers (IE10- requires the additional library [Intl.js](https://github.com/andyearnshaw/Intl.js/)) support the internationalization standard [ECMA-402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

El llamado [str.localeCompare(str2)](mdn:js/String/localeCompare):

<<<<<<< HEAD
- Retorna `1` si `str` es mayor que `str2` de acuerdo a las reglas del lenguaje.
- Retorna `-1` si `str` es menor que `str2`.
- Retorna `0` si son iguales.

Por ejemplo:
=======
The call [str.localeCompare(str2)](mdn:js/String/localeCompare) returns an integer indicating whether `str` is less, equal or greater than `str2` according to the language rules:

- Returns a negative number if `str` is less than `str2`.
- Returns a positive number if `str` is greater than `str2`.
- Returns `0` if they are equivalent.

For instance:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
alert('Österreich'.localeCompare('Zealand')); // -1
```

<<<<<<< HEAD
Este método tiene dos argumentos adicionales especificados en [la documentación](mdn:js/String/localeCompare), la cual le permite especificar el languaje (por defeto lo toma del entorno) y configura reglas adicionales como sensibilidad a las mayúsculas y minúsculas o si debe `"a"` y `"á"` ser tratadas como iguales, etc.
=======
This method actually has two additional arguments specified in [the documentation](mdn:js/String/localeCompare), which allows it to specify the language (by default taken from the environment, letter order depends on the language) and setup additional rules like case sensitivity or should `"a"` and `"á"` be treated as the same etc.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

## Internals, Unicode

```warn header="Conocimiento avanzado"
Esta sección ahonda en string internals. Este conocimiento será útil para ti si pleaneas lidiar con emoticones, raros caracteres matemáticos, jeroglíficos u otros símbolos extraños.

Puedes saltar esta sección si no planeas mantenerlos.
```

### Pares sustitutos

<<<<<<< HEAD
La mayoría de los símbolos tienen código de 2 bytes. Las letras de la mayoría de los lenguajes europeos, números e incluso los jeroglíficos más importantes, tienen una representación de 2 bytes.
=======
All frequently used characters have 2-byte codes. Letters in most european languages, numbers, and even most hieroglyphs, have a 2-byte representation.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Pero 2 bytes sólo permiten 65536 combinaciones y eso no es suficiente para todos los símbolos posibles. Símbolos muy raros son codificados con un par de caracteres de 2 bytes llamados "pares sustitutos".

El largo de dichos símbolos es `2`:

```js run
<<<<<<< HEAD
alert('𝒳'.length); // 2, LETRA CURSIVA MATEMÁTICA X CAPITALIZADA
alert('😂'.length); // 2, EMOTICÓN CON LÁGRIMAS DE ALEGRÍA
alert('𩷶'.length); // 2, un raro jeroglífico chino
=======
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare Chinese hieroglyph
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

Notar que los pares sustitutos no existían en el tiempo que JavaScript fue creado, y por ello no son procesados correctamente por el lenguaje!

De hecho, tenemos un solo símbolo en cada string más arriba, pero el `length` (largo) muestra `2`.

`String.fromCodePoint` y `str.codePointAt` son algunos métodos extraños que tratan con pares sustitutos. Aparecieron recientemente en el lenguaje. Antes de ellos, existían sólo [String.fromCharCode](mdn:js/String/fromCharCode) y [str.charCodeAt](mdn:js/String/charCodeAt). Estos métodos son actualmente lo mismo que `fromCodePoint/codePointAt`, pero no funcionan con pares sustitutos.

<<<<<<< HEAD
Obtener un símbolo puede ser dificil, ya que los pares substitutos son tratados como dos caracteres:
=======
Getting a symbol can be tricky, because surrogate pairs are treated as two characters:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
alert('𝒳'[0]); // símbolo extraño...
alert('𝒳'[1]); // ...piezas del par sustituto
```

Notar que piezas del par sustituto no tienen significado sin las otras. Por lo que la alerta en el ejemplo anterior despliega garabatos.

Técnicamente, pares sustitutos son también detectables por su propio código: si un caracter tiene código en el intervalo de `0xd800..0xdbff`, entonces es la primera parte de un par sustituto. El siguiente caracter (segunda parte) debe tener el código en el intervalo `0xdc00..0xdfff`. Estos intervalos son reservados exclusivamente para pares sustitutos por el estándar.

En el caso de arriba:

```js run
// charCodeAt no es consciente de pares sustitutos, por lo que entrega código por partes

alert('𝒳'.charCodeAt(0).toString(16)); // d835, entre 0xd800 y 0xdbff
alert('𝒳'.charCodeAt(1).toString(16)); // dcb3, entre 0xdc00 y 0xdfff
```

Encontrarás más formas de trabajar con pares sustitutos más adelante en el capítulo <info:iterable>. Probablemente hay bibliotecas especiales para eso también, pero nada lo suficientemente famoso como para sugerirlo aquí.

### Marcas diacríticas y normalización

En muchos idiomas hay símbolos que se componen del carácter base con una marca arriba / debajo.

Por ejemplo, la letra `a` puede ser el carácter base para:` àáâäãåā`. Los caracteres "compuestos" más comunes tienen su propio código en la tabla UTF-16. Pero no todos ellos, porque hay demasiadas combinaciones posibles.

<<<<<<< HEAD
Para mantener composiciones arbitrarias, UTF-16 nos permite usar varios caracteres unicode. El carácter base y uno o varios caracteres de "marca" que lo "decoran".
=======
To support arbitrary compositions, UTF-16 allows us to use several unicode characters: the base character followed by one or many "mark" characters that "decorate" it.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Por ejemplo, si tenemos `S` seguido del carácter especial" punto arriba "(código` \ u0307`), se muestra como Ṡ.

```js run
alert('S\u0307'); // Ṡ
```

Si necesitamos una marca adicional sobre la letra (o debajo de ella), no hay problema, simplemente agrega el carácter de marca necesario.

Por ejemplo, si agregamos un carácter "punto debajo" (código `\u0323`), entonces tendremos" S con puntos arriba y abajo ": `Ṩ`.

Por ejemplo:

```js run
alert('S\u0307\u0323'); // Ṩ
```

Esto proporciona una gran flexibilidad, pero también un problema interesante: dos caracteres pueden verse visualmente iguales, pero estar representados con diferentes composiciones unicode.

Por ejemplo:

```js run
<<<<<<< HEAD
let s1 = 'S\u0307\u0323'; // Ṩ, S + punto arriba + punto debajo
let s2 = 'S\u0323\u0307'; // Ṩ, S + punto debajo + punto arriba

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false aunque los caracteres se ven idénticos (?!)
=======
let s1 = 'S\u0307\u0323'; // Ṩ, S + dot above + dot below
let s2 = 'S\u0323\u0307'; // Ṩ, S + dot below + dot above

alert( `s1: ${s1}, s2: ${s2}` );

alert( s1 == s2 ); // false though the characters look identical (?!)
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

Para resolver esto, existe un algoritmo de "normalización unicode" que lleva cada cadena a la forma "normal".

Este es implementado por [str.normalize()](mdn:js/String/normalize).

```js run
alert('S\u0307\u0323'.normalize() == 'S\u0323\u0307'.normalize()); // true
```

Es curioso que en esta situación `normalize ()` realmente reúna una secuencia de 3 caracteres en uno: `\u1e68` (S con dos puntos).

```js run
alert('S\u0307\u0323'.normalize().length); // 1

alert('S\u0307\u0323'.normalize() == '\u1e68'); // true
```

<<<<<<< HEAD
En realidad, este no es siempre el caso. La razón es que el símbolo `Ṩ` es "bastante común", por lo que los creadores de UTF-16 lo incluyeron en la tabla principal y le dieron el código.

Si desea obtener más información sobre las reglas y variantes de normalización, se describen en el apéndice del estándar Unicode: [Formas de normalización Unicode](http://www.unicode.org/reports/tr15/), pero para la mayoría de los propósitos prácticos, la información de esta sección es suficiente.

## Resumen

- Existen 3 tipos de comillas. Los backticks permiten que una cadena abarque varias líneas e incorpore expresiones.
- Strings en JavaScript son codificados usando UTF-16.
- Podemos usar caracteres especiales como `\n` e insertar letras por su código unico usando `\u ... `.
- Para obtener un caracter, usa: `[]`.
- Para obtener un substring, usa: `slice` o `substring`.
- Para convertir un string en minúsculas/mayúsculas, usa: `toLowerCase/toUpperCase`.
- Para buscar por un substring, usa: `indexOf`, o `includes/startsWith/endsWith` para checkeos simples.
- Para comparar strings de acuerdo al languagje, usa: `localeCompare`, de otra manera seran comparados como códigos de caracter.
=======
In reality, this is not always the case. The reason being that the symbol `Ṩ` is "common enough", so UTF-16 creators included it in the main table and gave it the code.

If you want to learn more about normalization rules and variants -- they are described in the appendix of the Unicode standard: [Unicode Normalization Forms](http://www.unicode.org/reports/tr15/), but for most practical purposes the information from this section is enough.

## Summary

- There are 3 types of quotes. Backticks allow a string to span multiple lines and embed expressions `${…}`.
- Strings in JavaScript are encoded using UTF-16.
- We can use special characters like `\n` and insert letters by their unicode using `\u...`.
- To get a character, use: `[]`.
- To get a substring, use: `slice` or `substring`.
- To lowercase/uppercase a string, use: `toLowerCase/toUpperCase`.
- To look for a substring, use: `indexOf`, or `includes/startsWith/endsWith` for simple checks.
- To compare strings according to the language, use: `localeCompare`, otherwise they are compared by character codes.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

Existen varios otros métodos útiles en cadenas:

<<<<<<< HEAD
- `str.trim()` -- remueve ("recorta") espacios desde el comienzo y final de un string.
- `str.repeat(n)` -- repite el string `n` veces.
- ...y más. Mira el [manual](mdn:js/String) para más detalles.

Strings también tienen métodos con expresiones regulares para buscar/reemplazar. Es un tema importante, así que es explicado en su propia sección <info:regular-expressions> .
=======
- `str.trim()` -- removes ("trims") spaces from the beginning and end of the string.
- `str.repeat(n)` -- repeats the string `n` times.
- ...and more to be found in the [manual](mdn:js/String).

Strings also have methods for doing search/replace with regular expressions. But that's big topic, so it's explained in a separate tutorial section <info:regular-expressions>.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
