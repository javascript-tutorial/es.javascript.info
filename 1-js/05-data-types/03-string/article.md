# Strings

En JavaScript, los datos textuales son almacenados como strings (cadena de caracteres). No hay un tipo de datos separado para caracteres unitarios.

El formato interno para strings es siempre [UTF-16](https://es.wikipedia.org/wiki/UTF-16), no está vinculado a la codificación de la página.

## Comillas

Recordemos los tipos de comillas.

Los strings pueden estar entre comillas simples, comillas dobles o backticks (acento grave):

```js
let single = 'comillas simples';
let double = "comillas dobles";

let backticks = `backticks`;
```

Comillas simples y dobles son esencialmente lo mismo. En cambio, los "backticks" nos permiten ingresar expresiones dentro del string envolviéndolos en `${…}`:

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

Se ve natural, ¿no es cierto? Pero las comillas simples y dobles no funcionan de esa manera.

Si intentamos usar comillas simples o dobles de la misma forma, obtendremos un error:

```js run
let guestList = "Invitados:  // Error: Unexpected token ILLEGAL
  * Juan";
```

Las comillas simples y dobles provienen de la creación de lenguajes en tiempos ancestrales, cuando la necesidad de múltiples líneas no era tomada en cuenta. Los backticks aparecieron mucho después y por ende son más versátiles.

Los backticks además nos permiten especificar una "función de plantilla" antes del primer backtick. La sintaxis es: <code>func&#96;string&#96;</code>. La función `func` es llamada automáticamente, recibe el string y la expresión insertada, y los puede procesar. Eso se llama "plantillas etiquetadas". Esta característica hace que sea más fácil implementar plantillas personalizadas, pero es raramente usada en la práctica. Puedes leer más sobre esto en el [manual](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). 

## Caracteres especiales

Es posible crear strings de múltiples líneas usando comillas simples, usando un llamado "carácter de nueva línea", escrito como `\n`, lo que denota un salto de línea:

```js run
let guestList = 'Invitados:\n * Juan\n * Pedro\n * Maria';

alert(guestList); // lista de invitados en múltiples líneas, igual a la de más arriba
```

Como ejemplo más simple, estas dos líneas son iguales, pero escritas en forma diferente:

```js run
let str1 = "Hello\nWorld"; // dos líneas usando el "símbolo de nueva línea"

// dos líneas usando nueva línea normal y backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Existen otros tipos de caracteres especiales, menos comunes. 

| Carácter | Descripción |
|-----------|-------------|
|`\n`|Nueva línea|
|`\r`|En Windows, los archivos de texto usan una combinación de dos caracteres `\r\n` para representar un corte de línea, mientras que en otros SO es simplemente '\n'. Esto es por razones históricas, la mayoría del software para Windows también reconoce '\n'. |
|`\'`,&nbsp;`\"`,&nbsp;<code>\\`</code>|Comillas|
|`\\`|Barra invertida|
|`\t`|Tabulación|
|`\b`, `\f`, `\v`| Retroceso, avance de formulario, tabulación vertical -- Se mencionan para ser exhaustivos. Vienen de muy viejos tiempos y no se usan actualmente (puedes olvidarlos ya). |

Como puedes ver, todos los caracteres especiales empiezan con la barra invertida `\`. Se lo llama "carácter de escape".

Y como es tan especial, si necesitamos mostrar el verdadero carácter `\` dentro de un string, necesitamos duplicarlo:

```js run
alert( `La barra invertida: \\` ); // La barra invertida: \
```

Las llamadas comillas "escapadas" `\'`, `\"`, <code>\\`</code> se usan para insertar una comilla en un string entrecomillado con el mismo tipo de comilla.

Por ejemplo:

```js run
alert('¡Yo soy la \'morsa\'!'); // ¡Yo soy la 'morsa'!
```

Como puedes ver, debimos anteponer un carácter de escape `\` antes de cada comilla ya que de otra manera hubiera indicado el final del string.

Obviamente, solo necesitan ser escapadas las comillas que son iguales a las que están rodeando al string. Una solución más elegante es cambiar a comillas dobles o backticks:

```js run
alert("¡Yo soy la 'morsa'!"); // ¡Yo soy la 'morsa'!
```

Además de estos caracteres especiales, también hay una notación especial para códigos Unicode `\u…`. Los cubriremos más adelante en este capítulo.

## Largo del string

La propiedad 'length' contiene el largo del string:

```js run
alert(`Mi\n`.length); // 3
```

Nota que `\n` es un solo carácter, por lo que el largo total es `3`.

```warn header="`length` es una propiedad"
Quienes tienen experiencia en otros lenguajes pueden cometer el error de escribir `str.length()` en vez de `str.length`. Eso no funciona.

Nota que `str.length` es una propiedad numérica, no una función. No hay que agregar paréntesis después de ella.
```

## Accediendo caracteres

Para acceder a un carácter en la posición `pos`, se debe usar corchetes, `[pos]`, o llamar al método [str.charAt(pos)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/charAt). El primer carácter comienza desde la posición cero:

```js run
let str = `Hola`;

// el primer carácter
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// el último carácter
alert( str[str.length - 1] ); // a
```

Los corchetes son la forma moderna de acceder a los caracteres, mientras que `charAt` existe principalmente por razones históricas.

La única diferencia entre ellos es que si no se encuentra un carácter, `[]` devuelve `undefined`, y `charAt` devuelve un string vacío:

```js run
let str = `Hola`;

alert(str[1000]); // undefined
alert(str.charAt(1000)); // '' (un string vacío)
```

Podemos además iterar sobre los caracteres usando `for..of`:

```js run
for (let char of 'Hola') {
  alert(char); // H,o,l,a (char se convierte en "H", luego "o", luego "l", etc.)
}
```

## Los strings son inmutables

Los strings no pueden ser modificados en JavaScript. Es imposible modificar un carácter.

Intentémoslo para demostrar que no funciona:

```js run
let str = 'Hola';

str[0] = 'h'; // error
alert(str[0]); // no funciona
```

Lo usual para resolverlo es crear un nuevo string y asignarlo a `str` reemplazando el string completo.

Por ejemplo:

```js run
let str = 'Hola';

str = 'h' + str[1] + str[2] + str[3]; // reemplaza el string

alert( str ); // hola
```

En las secciones siguientes veremos más ejemplos de esto.

## Cambiando capitalización

Los métodos [toLowerCase()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/toLowerCase) y [toUpperCase()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/toUpperCase) cambian los caracteres a minúscula y mayúscula respectivamente:

```js run
alert('Interfaz'.toUpperCase()); // INTERFAZ
alert('Interfaz'.toLowerCase()); // interfaz
```

Si queremos un solo carácter en minúscula:

```js run
alert('Interfaz'[0].toLowerCase()); // 'i'
```

## Buscando una subcadena de caracteres

Existen muchas formas de buscar por subcadenas de caracteres dentro de una cadena completa.

### str.indexOf

El primer método es [str.indexOf(substr, pos)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/indexOf).

Este busca un `substr` en `str`, comenzando desde la posición entregada `pos`, y retorna la posición donde es encontrada la coincidencia o `-1` en caso de no encontrar nada.

Por ejemplo:

```js run
let str = 'Widget con id';

alert(str.indexOf('Widget')); // 0, ya que 'Widget' es encontrado al comienzo
alert(str.indexOf('widget')); // -1, no es encontrado, la búsqueda toma en cuenta minúsculas y mayúsculas.

alert(str.indexOf('id')); // 1, "id" es encontrado en la posición 1 (..idget con id)
```

El segundo parámetro es opcional y nos permite buscar desde la posición entregada.

Por ejemplo, la primera ocurrencia de `"id"` es en la posición `1`. Para buscar por la siguiente ocurrencia, comencemos a buscar desde la posición `2`:

```js run
let str = 'Widget con id';

alert(str.indexOf('id', 2)); // 11
```

Si estamos interesados en todas las ocurrencias, podemos correr `indexOf` en un bucle. Cada nuevo llamado es hecho utilizando la posición posterior a la encontrada anteriormente:

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

Podemos escribir el mismo algoritmo, pero más corto:

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
También hay un método similar [str.lastIndexOf(substr, position)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/lastIndexOf) que busca desde el final del string hasta el comienzo.

Este imprimirá las ocurrencias en orden invertido.
```

Existe un leve inconveniente con `indexOf` en la prueba `if`. No podemos utilizarlo en el `if` como sigue:

```js run
let str = "Widget con id";

if (str.indexOf("Widget")) {
    alert("Lo encontramos"); // no funciona!
}
```

La `alerta` en el ejemplo anterior no se muestra ya que `str.indexOf("Widget")` retorna `0` (lo que significa que encontró el string en la posición inicial). Eos correcto, pero `if` considera `0` como `falso`.

Por ello debemos preguntar por `-1`:

```js run
let str = "Widget con id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Lo encontramos"); // ahora funciona!
}
```

### includes, startsWith, endsWith

El método más moderno [str.includes(substr, pos)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/includes) devuelve `true` o `false` si `str` contiene `substr` o no.

Es la opción adecuada si lo que necesitamos es verificar que exista, pero no su posición.

```js run
alert('Widget con id'.includes('Widget')); // true

alert('Hola'.includes('Adiós')); // false
```

El segundo argumento opcional de `str.includes` es la posición desde donde comienza a buscar:

```js run
alert('Midget'.includes('id')); // true
alert('Midget'.includes('id', 3)); // false, desde la posición 3 no hay "id"
```

Los métodos [str.startsWith](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/startsWith) (comienza con) y [str.endsWith](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/endsWith) (termina con) hacen exactamente lo que dicen:

```js run
alert( "*!*Wid*/!*get".startsWith("Wid") ); // true, "Widget" comienza con "Wid"
alert( "Wid*!*get*/!*".endsWith("get") ); // true, "Widget" termina con "get"
```

## Obteniendo un substring

Existen 3 métodos en JavaScript para obtener un substring: `substring`, `substr` y `slice`.

`str.slice(comienzo [, final])`
: Retorna la parte del string desde `comienzo` hasta (pero sin incluir) `final`.

    Por ejemplo:

    ```js run
    let str = "stringify";
    alert( str.slice(0, 5) ); // 'strin', el substring desde 0 hasta 5 (sin incluir 5)
    alert( str.slice(0, 1) ); // 's', desde 0 hasta 1, pero sin incluir 1, por lo que sólo el carácter en 0
    ```

    Si no existe el segundo argumento, entonces `slice` va hasta el final del string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, desde la 2nda posición hasta el final
    ```

    También son posibles valores negativos para `comienzo/final`. Estos indican que la posición es contada desde el final del string.
    

    ```js run
    let str = "strin*!*gif*/!*y";
    // comienza en la 4ta posición desde la derecha, finaliza en la 1era posición desde la derecha
    alert( str.slice(-4, -1) ); // 'gif'
    ```

`str.substring(comienzo [, final])`
: Devuelve la parte del string *entre* `comienzo` y `final` (no incluyendo `final`).

    Esto es casi lo mismo que `slice`, pero permite que `comienzo` sea mayor que `final` (en este caso solo intercambia los valores de `comienzo` y `final`). 

    Por ejemplo:

    ```js run
    let str = "st*!*ring*/!*ify";

    // esto es lo mismo para substring
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // ...pero no para slice:
    alert( str.slice(2, 6) ); // "ring" (lo mismo)
    alert( str.slice(6, 2) ); // "" (un string vacío)

    ```

    Los argumentos negativos (al contrario de slice) no son soportados, son tratados como `0`.

`str.substr(comienzo [, largo])`
: Retorna la parte del string desde `comienzo`, con el `largo` dado.

    A diferencia de los métodos anteriores, este nos permite especificar el `largo` en lugar de la posición final:

    ```js run
    let str = "st*!*ring*/!*ify";
    alert( str.substr(2, 4) ); // ring, desde la 2nda posición toma 4 caracteres
    ```

    El primer argumento puede ser negativo, para contar desde el final:

    ```js run
    let str = "strin*!*gi*/!*fy";
    alert( str.substr(-4, 2) ); // gi, desde la 4ta posición toma 2 caracteres
    ```

    Este método reside en el [Anexo B](https://tc39.es/ecma262/#sec-string.prototype.substr) de la especificación del lenguaje. Esto significa que solo necesitan darle soporte los motores Javascript de los navegadores, y no es recomendable su uso. Pero en la práctica, es soportado en todos lados.

Recapitulemos los métodos para evitar confusiones:

| método | selecciona... | negativos |
|--------|---------------|-----------|
| `slice(comienzo, final)` | desde `comienzo` hasta `final` (sin incluir `final`) | permite negativos |
| `substring(comienzo, final)` | entre `comienzo` y `final` (no incluye `final`)| valores negativos significan `0` |
| `substr(comienzo, largo)` | desde `comienzo` toma `largo` caracteres | permite negativos `comienzo` |

```smart header="¿Cuál elegir?"
Todos son capaces de hacer el trabajo. Formalmente, `substr` tiene una pequeña desventaja: no es descrito en la especificación central de JavaScript, sino en el anexo B, el cual cubre características sólo de navegadores, que existen principalmente por razones históricas. Por lo que entornos sin navegador pueden fallar en compatibilidad. Pero en la práctica, funciona en todos lados.

De las otras dos variantes, `slice` es algo más flexible, permite argumentos negativos y es más corta. 

Entones, es suficiente recordar únicamente `slice`.
```

## Comparando strings

Como aprendimos en el capítulo <info:comparison>, los strings son comparados carácter por carácter en orden alfabético.

Aunque existen algunas singularidades.

1. Una letra minúscula es siempre mayor que una mayúscula:

   ```js run
   alert('a' > 'Z'); // true
   ```

2. Las letras con marcas diacríticas están "fuera de orden":

   ```js run
   alert('Österreich' > 'Zealand'); // true
   ```

   Esto puede conducir a resultados extraños si ordenamos los nombres de estos países. Usualmente, se esperaría que `Zealand` apareciera después de `Österreich` en la lista.

Para entender qué pasa, revisemos la representación interna de strings en JavaScript.

Todos los strings son codificados usando [UTF-16](https://es.wikipedia.org/wiki/UTF-16). Esto significa: cada carácter tiene un código numérico correspondiente. Existen métodos especiales que permiten obtener el carácter para el código y viceversa.

`str.codePointAt(pos)`
: Devuelve un número decimal que representa el código de carácter en la posición `pos`:

    ```js run
    // mayúsculas y minúsculas tienen códigos diferentes
    alert( "Z".codePointAt(0) ); // 90
    alert( "z".codePointAt(0) ); // 122
    alert( "z".codePointAt(0).toString(16) ); // 7a (si necesitamos un más comúnmente usado valor de código hexa)
    ```

`String.fromCodePoint(code)`
: Crea un carácter por su `código` numérico:

    ```js run
    alert( String.fromCodePoint(90) ); // Z
    alert( String.fromCodePoint(0x5a) ); // Z (también podemos usar un valor hexa como argumento)
    ```
    
    También podemos agregar caracteres unicode por sus códigos usando `\u` seguido de un código hexadecimal:

    ```js run
    // 90 es 5a en el sistema hexadecimal
    alert( '\u005a' ); // Z
    ```

Ahora veamos los caracteres con códigos `65..220` (el alfabeto latino y algo más) transformándolos a string:

```js run
let str = '';

for (let i = 65; i <= 220; i++) {
  str += String.fromCodePoint(i);
}
alert(str);
// ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
// ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
```

¿Lo ves? Caracteres en mayúsculas van primero, luego unos cuantos caracteres especiales, luego las minúsculas.

Ahora se vuelve obvio por qué `a > Z`.

Los caracteres son comparados por su código numérico. Código mayor significa que el carácter es mayor. El código para `a` (97) es mayor que el código para `Z` (90).

- Todas las letras minúsculas van después de las mayúsculas ya que sus códigos son mayores.
- Algunas letras como `Ö` se mantienen apartadas del alfabeto principal. Aquí el código es mayor que cualquiera desde `a` hasta `z`.

### Comparaciones correctas [#correct-comparisons]

El algoritmo "correcto" para realizar comparaciones de strings es más complejo de lo que parece, debido a que los alfabetos son diferentes para diferentes lenguajes. Una letra que se ve igual en dos alfabetos distintos, pueden tener distintas posiciones.

Por lo que el navegador necesita saber el lenguaje para comparar.

Por suerte, todos los navegadores modernos (IE10- requiere adicionalmente la biblioteca [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) mantienen la internacionalización del estándar [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Este provee un método especial para comparar strings en distintos lenguajes, siguiendo sus reglas.

El llamado a [str.localeCompare(str2)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/localeCompare) devuelve un entero indicando si `str` es menor, igual o mayor que `str2` de acuerdo a las reglas del lenguaje:

- Retorna `1` si `str` es mayor que `str2`.
- Retorna `-1` si `str` es menor que `str2`.
- Retorna `0` si son equivalentes.

Por ejemplo:

```js run
alert('Österreich'.localeCompare('Zealand')); // -1
```

Este método tiene dos argumentos adicionales especificados en [la documentación](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/localeCompare), la cual le permite especificar el lenguaje (por defecto lo toma del entorno) y configura reglas adicionales como sensibilidad a las mayúsculas y minúsculas, o si deben `"a"` y `"á"` ser tratadas como iguales, etc.

## Internals, Unicode

```warn header="Conocimiento avanzado"
Esta sección ahonda en los interiores de los string. Este conocimiento será útil para ti si planeas lidiar con emoticones, raros caracteres matemáticos, glifos u otros símbolos extraños.
```

### Caracteres Unicode

Como ya mencionamos, los strings de JavaScript están basados en [Unicode](https://es.wikipedia.org/wiki/Unicode).

Cada carácter está representado por una secuencia de entre 1 y 4 bytes.

JavaScript permite especificar un carácter no solo incluyéndolo directamente en el string, sino también por medio de su código hexadecimal Unicode usando estas tres notaciones:

- `\xXX` -- un carácter cuyo "punto de código" es `U+00XX`.

    `XX` son dos dígitos hexadecimales con valor entre `00` y `FF`, así la notación `\xXX` puede usarse solamente para los primeros 256 caracteres Unicode (esto incluye todos los caracteres ASCII, que son 128).

    Estos primeros 256 caracteres incluyen el alfabeto latino, la mayoría de caracteres de sintaxis básicos y algunos otros. Por ejemplo, `"\x7A"` es lo mismo que `"z"` (Unicode `U+007A`).
- `\uXXXX` -- un carácter cuyo "punto de código Unicode" es `U+XXXX` (un carácter con el código hex `XXXX` en UTF-16 encoding).

    `XXXX` siempre deben ser exactamente 4 dígitos hexa, con valor entre `0000` y `FFFF`. Entonces la notación `\uXXXX` puede usarse  para los primeros 65536 caracteres Unicode. Caracteres con valor Unicode mayor que `U+FFFF` también pueden ser representados con esta notación, pero en ese caso necesitamos usar los llamados "pares sustitutos" (hablaremos de pares sustitutos más adelante en este capítulo).
- `\u{X…XXXXXX}` -- un carácter con cualquier "punto de código Unicode" (un carácter con el código hexa en codificación UTF-32).

    `X…XXXXXX` debe ser un valor hexadecimal de 1 a 6 bytes entre `0` y `10FFFF` (el mayor punto de código definido por Unicode). Esta notación nos permite fácilmente representar todos los caracteres Unicode existentes.

Ejemplos con Unicode:

```js run
alert( "\uA9" ); // ©, el símbolo de copyright

alert( "\u00A9" ); // ©, lo mismo que arriba, usando la notación de 4 dígitos hexa
alert( "\u044F" ); // я, letra del alfabeto cirílico
alert( "\u2191" ); // ↑, el símbolo flecha apuntando arriba

alert( "\u{20331}" ); // 佫, un raro glifo Chino (long Unicode)
alert( "\u{1F60D}" ); // 😍, un símbolo de cara sonriente (another long Unicode)
```

### Pares sustitutos

Inicialmente, JavaScript estaba basado en la codificación UTF-16 que solo permite 2 bytes por carácter. Pero 2 bytes solo permiten 65536 combinaciones y eso no es suficiente para cada símbolo Unicode posible.

Entonces, los símbolos raros que requieren más de 2 bytes son codificados con un par de caracteres de 2 bytes llamado "par sustituto".

Como efecto secundario, el largo de tales símbolos es `2`:

```js run
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, cara con lágrimas de risa
alert( '𩷶'.length ); // 2, un raro glifo chino
```

Esto es porque los pares sustitutos no existían cuando JavaScript fue creado, por ello ¡no es procesado correctamente por el lenguaje!

En realidad tenemos un solo símbolo en cada línea de los string de arriba, pero la propiedad `length` los muestra con un largo de `2`.

Obtener un símbolo puede ser intrincado, porque la mayoría de las características del lenguaje trata a los pares sustitutos como de 2 caracteres.

Por ejemplo, aquí vemos dos caracteres extraños en la salida:

```js run
alert( '𝒳'[0] ); // muestra símbolos extraños...
alert( '𝒳'[1] ); // ...partes del par sustituto
```

Las 2 partes del par sustituto no tienen significado el uno sin el otro. Entonces los alerts del ejemplo en realidad muestran basura.

Técnicamente, los pares sustitutos son también detectables por su propio código: si un carácter tiene código en el intervalo de `0xd800..0xdbff`, entonces es la primera parte de un par sustituto. El siguiente carácter (segunda parte) debe tener el código en el intervalo `0xdc00..0xdfff`. Estos intervalos son reservados exclusivamente para pares sustitutos por el estándar.

Los métodos `String.fromCodePoint` y `str.codePointAt` fueron añadidos en JavaScript para manejar los pares sustitutos.

Esencialmente, son lo mismo que [String.fromCharCode](mdn:js/String/fromCharCode) y [str.charCodeAt](mdn:js/String/charCodeAt), pero tratan a los pares sustitutos correctamente.

Se puede ver la diferencia aquí:

```js run
// charCodeAt no percibe los pares sustitutos, entonces da el el código de la primera parte de 𝒳:

alert( '𝒳'.charCodeAt(0).toString(16) ); // d835

// codePointAt reconoce los pares sustitutos
alert( '𝒳'.codePointAt(0).toString(16) ); // 1d4b3, lee ambas partes de los pares sustitutos
```

Dicho esto, si tomamos desde la posición 1 (y es incorrecto aquí), ambas funciones devolverán solo la segunda parte del par:

```js run
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3
alert( '𝒳'.codePointAt(1).toString(16) ); // dcb3
// segunda parte del par, sin sentido
```

Encontrarás más formas de trabajar con pares sustitutos más adelante en el capítulo <info:iterable>. Probablemente hay bibliotecas especiales para eso también, pero nada lo suficientemente famoso como para sugerirlo aquí.

````warn header="En conclusión: partir strings en un punto arbitrario es peligroso"
No podemos simplemente separar un string en una posición arbitraria, ej. tomar `str.slice(0, 4)`, y confiar en que sea un string válido, por ejemplo:

```js run
alert( 'hi 😂'.slice(0, 4) ); //  hi [?]
```

Aquí podemos ver basura (la primera mitad del par sustituto de la sonrisa) en la salida.

Simplemente sé consciente de esto si intentas trabajar con confianza con los pares sustitutos. Puede que no sea un gran problema, pero al menos deberías entender lo que pasa.
````

### Marcas diacríticas y normalización

En muchos idiomas hay símbolos compuestos, con un carácter de base y una marca arriba o debajo.

Por ejemplo, la letra `a` puede ser el carácter base para estos caracteres:` àáâäãåā`.
 
Los caracteres "compuestos" más comunes tienen su propio código en la tabla UTF-16. Pero no todos ellos, porque hay demasiadas combinaciones posibles.

Para mantener composiciones arbitrarias, UTF-16 nos permite usar varios caracteres Unicode. El carácter base y uno o varios caracteres de "marca" que lo "decoran".

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
alert('S\u0307\u0323'.normalize() == 'S\u0323\u0307'.normalize()); // true
```

Es curioso que en esta situación `normalize ()` realmente reúna una secuencia de 3 caracteres en uno: `\u1e68` (S con dos puntos).

```js run
alert('S\u0307\u0323'.normalize().length); // 1

alert('S\u0307\u0323'.normalize() == '\u1e68'); // true
```

En realidad, este no es siempre el caso. La razón es que el símbolo `Ṩ` es "bastante común", por lo que los creadores de Unicode lo incluyeron en la tabla principal y le dieron el código.

Si desea obtener más información sobre las reglas y variantes de normalización, se describen en el apéndice del estándar Unicode: [Formas de normalización Unicode](http://www.unicode.org/reports/tr15/), pero para la mayoría de los propósitos prácticos, la información de esta sección es suficiente.

## Resumen

- Existen 3 tipos de entrecomillado. Los backticks permiten que una cadena abarque varias líneas e incorporar expresiones `${…}`.
- Los strings en JavaScript son codificados usando UTF-16, y "pares sustitutos" para caracteres raros (y estos pueden causar fallos).
- Podemos usar caracteres especiales como `\n` e insertar letras por medio de su Unicode usando `\u ... `.
- Para obtener un carácter, usa: `[]`.
- Para obtener un substring, usa: `slice` o `substring`.
- Para convertir un string en minúsculas/mayúsculas, usa: `toLowerCase/toUpperCase`.
- Para buscar por un substring, usa: `indexOf`, o `includes/startsWith/endsWith` para chequeos simples.
- Para comparar strings de acuerdo al idioma, usa: `localeCompare`, de otra manera serán comparados por sus códigos de carácter.

Existen varios otros métodos útiles en cadenas:

- `str.trim()` -- remueve ("recorta") espacios desde el comienzo y final de un string.
- `str.repeat(n)` -- repite el string `n` veces.
- ...y más. Mira el [manual](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String) para más detalles.

Los strings también tienen métodos con expresiones regulares para buscar/reemplazar. Este es un tema importante, por ello es explicado en su propia sección <info:regular-expressions>.
