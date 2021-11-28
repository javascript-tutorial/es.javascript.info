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

Comillas simples y dobles son esencialmente lo mismo. Sin embargo los "backticks" nos permiten ingresar expresiones dentro del string, envolviéndolos en `${…}`:

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

Las comillas simples y dobles provienen de la creación de lenguaje en tiempos ancestrales, cuando la necesidad de múltiples líneas no era tomada en cuenta. Los backticks aparecieron mucho después y por ende son más versátiles.

Los backticks además nos permiten especificar una "función de plantilla" antes del primer backtick. La sintaxis es: <code>func&#96;string&#96;</code>. La función `func` es llamada automáticamente, recibe el string y la expresión insertada y los puede procesar. Eso se llama "plantillas etiquetadas". Esta característica hace que sea más fácil implementar plantillas personalizadas, pero es raramente usada en la práctica. Puedes leer más sobre esto en [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). 

## Caracteres especiales

Es posible crear strings de múltiples líneas usando comillas simples, usando un llamado "carácter de nueva línea", escrito como `\n`, lo que denota un salto de línea:

```js run
let guestList = 'Invitados:\n * Juan\n * Pedro\n * Maria';

alert(guestList); // una lista de invitados en múltiples líneas
```

Por ejemplo, estas dos líneas son iguales, pero escritas en forma diferente:

```js run
let str1 = "Hello\nWorld"; // dos líneas usando el "símbolo de nueva línea"

// dos líneas usando nueva línea normal y backticks
let str2 = `Hello
World`;

alert(str1 == str2); // true
```

Existen otros tipos de caracteres especiales, menos comunes. 

Esta es la lista completa:

| Carácter | Descripción |
|-----------|-------------|
|`\n`|Nueva línea|
|`\r`|Retorno de carro: En Windows, los archivos de texto usan una combinación de dos caracteres `\r\n` para representar un corte de línea mientras que en otros SO es simplemente '\n'. Esto es por razones históricas, la mayoría del software para Windows también entienden '\n'. |
|`\'`, `\"`|Comillas|
|`\\`|Barra invertida|
|`\t`|Tabulación|
|`\b`, `\f`, `\v`| Backspace, Form Feed, Vertical Tab -- Se mantienen por compatibilidad. No son usados actualmente |
|`\xXX`|Carácter Unicode con el hexadecimal dado `XX`, por ej. `'\x7A'` es lo mismo que `'z'`.|
|`\uXXXX`|Un símbolo unicode con el hexadecimal dado `XXXX` en codificación UTF-16, p.ej. `\u00A9` -- es el unicode para el símbolo copyright `©`. Debe ser exactamente 4 dígitos  hex. |
|`\u{X…XXXXXX}` (1 a 6 caracteres hex)|Un símbolo unicode con el hexadecimal dado en codificación UTF-32. Algunos caracteres raros son codificados con  dos símbolos unicode, tomando 4 bytes. De esta manera podemos insertar códigos largos. |

Ejemplos con unicode:

```js run
alert('\u00A9'); // ©
alert('\u{20331}'); // 佫, un raro jeroglífico chino (unicode largo)
alert('\u{1F60D}'); // 😍, un emoticón sonriendo (otro unicode largo)
```

Todos los caracteres especiales comienzan con una barra invertida `\`. También conocida como "carácter de escape".

También la usamos si queremos insertar una comilla dentro de un string.

Por ejemplo:

```js run
alert('Yo soy \'Walrus\''); // Yo soy 'Walrus'
```

Como puedes ver, debimos anteponer un carácter de escape `\` antes de cada comilla ya que de otra manera hubiera indicado el final del string.

Obviamente, eso se refiere sólo a las comillas que son iguales a las que están rodeando al string. Una solución más elegante sería cambiar a comillas dobles o backticks:

```js run
alert(`Yo soy "Walrus"`); // Yo soy "Walrus"
```

Notar que el carácter de escape `\` sirve para la correcta lectura del string por JavaScript, luego desaparece. El string que quedó en la memoria no incluye `\`. Lo puedes ver claramente en el `alert` del ejemplo anterior.

¿Pero qué pasa si necesitamos incluir un carácter de escape `\` en el string?

Es posible, pero debemos duplicarlo como sigue `\\`:

```js run
alert(`El carácter de escape: \\`); // El carácter de escape: \
```

## Largo del string

La propiedad 'length' entrega el largo del string:

```js run
alert(`Mi\n`.length); // 3
```

Notar que `\n` es un carácter "especial" único, por lo que el largo es `3`.

```warn header="`length` es una propiedad"
Gente con experiencia en otros lenguajes a veces comete el error de tipear `str.length()` en vez de `str.length`. Eso no funciona.

Por favor notar que `str.length` es una propiedad numérica, no una función. No hay necesidad de agregar un paréntesis después de ella.
```

## Accediendo caracteres

Para acceder a un carácter en la posición `pos`, se debe usar paréntesis cuadrados `[pos]` o llamar al método [str.charAt(pos)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/charAt). El primer carácter comienza desde la posición cero:

```js run
let str = `Hola`;

// el primer carácter
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// el último carácter
alert( str[str.length - 1] ); // a
```

Los corchetes son una forma moderna de acceder a los caracteres, mientras que `charAt` existe principalmente por razones históricas.

La única diferencia entre ellos es que si no se encuentra un carácter, `[]` devuelve `undefined`, y `charAt` devuelve un string vacío.

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

La solución alternativa es crear un nuevo string y asignarlo a `str` en vez de asignarlo al anterior.

Por ejemplo:

```js run
let str = 'Hola';

str = 'h' + str[1] + str[2] + str[3]; // reemplaza el string

alert( str ); // hola
```

En la sección siguiente veremos más ejemplos de esto.

## Cambiando mayúsculas y minúsculas

Los métodos [toLowerCase()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/toLowerCase) y [toUpperCase()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/toUpperCase) cambian los caracteres a minúscula y mayúscula respectivamente:

```js run
alert('Interfaz'.toUpperCase()); // INTERFAZ
alert('Interfaz'.toLowerCase()); // interfaz
```

Si queremos un solo carácter en minúscula:

```js
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
Existe también un método similar [str.lastIndexOf(substr, position)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/lastIndexOf) que busca desde el final del string hasta el comienzo.

Este imprimirá las ocurrencias en orden invertido.
```

Existe un leve inconveniente con `indexOf` en la prueba `if`. No podemos utilizarlo en el `if` como sigue:

```js run
let str = "Widget con id";

if (str.indexOf("Widget")) {
    alert("Lo encontramos"); // no funciona!
}
```

La `alerta` en el ejemplo anterior no se muestra ya que `str.indexOf("Widget")` retorna `0` (lo que significa que encontró el string en la posición inicial). Correcto pero `if` considera `0` como `falso`.

Por lo que debemos buscar por `-1` como sigue:

```js run
let str = "Widget con id";

*!*
if (str.indexOf("Widget") != -1) {
*/!*
    alert("Lo encontramos"); // ahora funciona!
}
```

#### El truco "bitwise NOT"

Uno de los antiguos trucos es el operador [bitwise NOT](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Bitwise_Operators#Bitwise_NOT)) `~`. Este convierte el número en un entero de 32-bits (elimina la parte decimal si es que existe) y luego invierte todos los bits en su representación binaria.

En la práctica, esto significa una simple cosa: Para enteros de 32 bits, `~n` es igual a `-(n+1)`.

Por ejemplo:

```js run
alert( ~2 ); // -3, lo mismo que -(2+1)
alert( ~0 ); // -1, lo mismo que -(0+1)
alert( ~1 ); // -2, lo mismo que -(1+1)
*!*
alert( ~-1 ); // 0, lo mismo que -(-1+1)
*/!*
```

Como podemos ver, `~n` es cero sólo si `n == -1`.  (para cualquier entero de 32-bit con signo).

Por lo que, la prueba `if ( ~str.indexOf("...") )` es veraz y el resultado de ``indexOf no es `-1`. En otras palabras, cuando es encontrado.

La gente lo usa para acortar verificaciones `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Lo encontramos!' ); // funciona
}
```

Usualmente no es recomendado utilizar características del lenguaje en formas no obvias, pero en particular, este truco es utilizado ampliamente en código antiguo, por lo que debemos entenderlo.

Recuerda: `if (~str.indexOf(...))` es leído como "si es encontrado".

Para ser preciso, como los números grandes son truncados a 32 bits por el operador `~`,  existen otros números que dan `0`, el menor es `~4294967295=0`.  Esto hace que tal chequeo sea correcto solo si el string no es así de largo.

Ahora podemos ver este truco solo en código viejo, porque JavaScript moderno provee el método `.includes` (ver a continuación).

### includes, startsWith, endsWith

El método más moderno [str.includes(substr, pos)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/includes) retorna `true/false` dependiendo si `str` contiene `substr` dentro.

Es la opción correcta si lo que necesitamos es encontrar el `substr` pero no necesitamos la posición.

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
alert('Widget'.startsWith('Wid')); // true, "Widget" comienza con "Wid"
alert('Widget'.endsWith('get')); // true, "Widget" termina con "get"
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

    Si no existe segundo argumento, entonces `slice` va hasta el final del string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, desde la 2nda posición hasta el final
    ```

    También son posibles valores negativos para `comienzo/final`. Ellos indican que la posición es contada desde el final del string.
    

    ```js run
    let str = "strin*!*gif*/!*y";
    // comienza en la 4ta posición desde la derecha, finaliza en la 1era posición desde la derecha
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(comienzo [, final])`
: Devuelve la parte del string _entre_ `comienzo` y `final`.

    Esto es casi lo mismo que `slice`, pero permite que `comienzo` sea mayor que `final`. 
    
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

Recapitulemos los métodos para evitar confusiones:

| método                  | selecciona...                                  | negativos                |
| ----------------------- | ------------------------------------------- | ------------------------ |
| `slice(comienzo, final)`     | desde `comienzo` hasta `final` (sin incluir `final`) | permite negativos         |
| `substring(comienzo, final)` | entre `comienzo` y `final`                   | valores negativos significan `0` |
| `substr(comienzo, largo)` | desde `comienzo` toma `largo` caracteres        | permite negativos `comienzo`  |

```smart header="¿Cuál elegir?"
Todos son capaces de hacer el trabajo. Formalmente, `substr` tiene una pequeña desventaja: no es descrito en la especificación central de JavaScript, sino en el anexo B, el cual cubre características sólo de navegadores, que existen principalmente por razones históricas. Por lo que entornos sin navegador pueden fallar en compatibilidad. Pero en la práctica funciona en todos lados.

De las otras dos variantes, `slice` es algo más flexible, permite argumentos negativos y es más corta. Entones, es suficiente con, de estos tres métodos, recordar únicamente `slice`.
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

Para entender qué pasa, revisemos la representación interna de strings en JavaScript.

Todos los strings son codificados usando [UTF-16](https://es.wikipedia.org/wiki/UTF-16). Esto significa: cada carácter tiene un código numérico correspondiente. Existen métodos especiales que permiten obtener el carácter para el código y viceversa.

`str.codePointAt(pos)`
: Retorna el código para el carácter en la posición `pos`:

    ```js run
    // mayúsculas y minúsculas tienen códigos diferentes
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    ```

`String.fromCodePoint(code)`
: Crea un carácter por su `código` numérico:

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

¿Lo ves? Caracteres capitalizados (mayúsculas) van primero, luego unos cuantos caracteres especiales, luego las minúsculas.

Ahora se vuelve obvio por qué `a > Z`.

Los caracteres son comparados por su código numérico. Código mayor significa que el carácter es mayor. El código para `a` (97) es mayor que el código para `Z` (90).

- Todas las letras minúsculas van después de las mayúsculas ya que sus códigos son mayores.
- Algunas letras como `Ö` se mantienen apartadas del alfabeto principal. Aquí el código es mayor que cualquiera desde `a` hasta `z`.

### Comparaciones correctas [#correct-comparisons]

El algoritmo "correcto" para realizar comparaciones de strings es más complejo de lo que parece, debido a que los alfabetos son diferentes para diferentes lenguajes. Una letra que se ve igual en dos alfabetos distintos, pueden tener distintas posiciones.

Por lo que el navegador necesita saber el lenguaje para comparar.

Por suerte, todos los navegadores modernos (IE10- requiere adicionalmente la biblioteca [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) mantienen la internacionalización del estándar [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Este provee un método especial para comparar strings en distintos lenguajes, siguiendo sus reglas.

El llamado [str.localeCompare(str2)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/localeCompare):

- Retorna `1` si `str` es mayor que `str2` de acuerdo a las reglas del lenguaje.
- Retorna `-1` si `str` es menor que `str2`.
- Retorna `0` si son iguales.

Por ejemplo:

```js run
alert('Österreich'.localeCompare('Zealand')); // -1
```

Este método tiene dos argumentos adicionales especificados en [la documentación](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/localeCompare), la cual le permite especificar el lenguaje (por defecto lo toma del entorno) y configura reglas adicionales como sensibilidad a las mayúsculas y minúsculas o si debe `"a"` y `"á"` ser tratadas como iguales, etc.

## Internals, Unicode

```warn header="Conocimiento avanzado"
Esta sección ahonda en string internals. Este conocimiento será útil para ti si planeas lidiar con emoticones, raros caracteres matemáticos, jeroglíficos u otros símbolos extraños.

Puedes saltar esta sección si no planeas mantenerlos.
```

### Pares sustitutos

La mayoría de los símbolos tienen código de 2 bytes. Las letras de la mayoría de los lenguajes europeos, números e incluso los jeroglíficos más importantes, tienen una representación de 2 bytes.

Pero 2 bytes sólo permiten 65536 combinaciones y eso no es suficiente para todos los símbolos posibles. Símbolos muy raros son codificados con un par de caracteres de 2 bytes llamados "pares sustitutos".

El largo de dichos símbolos es `2`:

```js run
alert('𝒳'.length); // 2, LETRA CURSIVA MATEMÁTICA X CAPITALIZADA
alert('😂'.length); // 2, EMOTICÓN CON LÁGRIMAS DE ALEGRÍA
alert('𩷶'.length); // 2, un raro jeroglífico chino
```

Notar que los pares sustitutos no existían en el tiempo que JavaScript fue creado, y por ello no son procesados correctamente por el lenguaje!

De hecho, tenemos un solo símbolo en cada string más arriba, pero el `length` (largo) muestra `2`.

`String.fromCodePoint` y `str.codePointAt` son algunos métodos extraños que tratan con pares sustitutos. Aparecieron recientemente en el lenguaje. Antes de ellos, existían sólo [String.fromCharCode](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/fromCharCode) y [str.charCodeAt](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/charCodeAt). Estos métodos son actualmente lo mismo que `fromCodePoint/codePointAt`, pero no funcionan con pares sustitutos.

Obtener un símbolo puede ser difícil, ya que los pares substitutos son tratados como dos caracteres:

```js run
alert('𝒳'[0]); // símbolo extraño...
alert('𝒳'[1]); // ...piezas del par sustituto
```

Notar que piezas del par sustituto no tienen significado sin las otras. Por lo que la alerta en el ejemplo anterior despliega garabatos.

Técnicamente, pares sustitutos son también detectables por su propio código: si un carácter tiene código en el intervalo de `0xd800..0xdbff`, entonces es la primera parte de un par sustituto. El siguiente carácter (segunda parte) debe tener el código en el intervalo `0xdc00..0xdfff`. Estos intervalos son reservados exclusivamente para pares sustitutos por el estándar.

En el caso de arriba:

```js run
// charCodeAt no es consciente de pares sustitutos, por lo que entrega código por partes

alert('𝒳'.charCodeAt(0).toString(16)); // d835, entre 0xd800 y 0xdbff
alert('𝒳'.charCodeAt(1).toString(16)); // dcb3, entre 0xdc00 y 0xdfff
```

Encontrarás más formas de trabajar con pares sustitutos más adelante en el capítulo <info:iterable>. Probablemente hay bibliotecas especiales para eso también, pero nada lo suficientemente famoso como para sugerirlo aquí.

### Marcas diacríticas y normalización

En muchos idiomas hay símbolos que se componen del carácter base con una marca arriba o debajo.

Por ejemplo, la letra `a` puede ser el carácter base para:` àáâäãåā`. Los caracteres "compuestos" más comunes tienen su propio código en la tabla UTF-16. Pero no todos ellos, porque hay demasiadas combinaciones posibles.

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

En realidad, este no es siempre el caso. La razón es que el símbolo `Ṩ` es "bastante común", por lo que los creadores de UTF-16 lo incluyeron en la tabla principal y le dieron el código.

Si desea obtener más información sobre las reglas y variantes de normalización, se describen en el apéndice del estándar Unicode: [Formas de normalización Unicode](http://www.unicode.org/reports/tr15/), pero para la mayoría de los propósitos prácticos, la información de esta sección es suficiente.

## Resumen

- Existen 3 tipos de entrecomillado. Los backticks permiten que una cadena abarque varias líneas e incorporar expresiones `${…}`.
- Strings en JavaScript son codificados usando UTF-16.
- Podemos usar caracteres especiales como `\n` e insertar letras por su código único usando `\u ... `.
- Para obtener un carácter, usa: `[]`.
- Para obtener un substring, usa: `slice` o `substring`.
- Para convertir un string en minúsculas/mayúsculas, usa: `toLowerCase/toUpperCase`.
- Para buscar por un substring, usa: `indexOf`, o `includes/startsWith/endsWith` para checkeos simples.
- Para comparar strings de acuerdo al lenguaje, usa: `localeCompare`, de otra manera serán comparados como códigos de carácter.

Existen varios otros métodos útiles en cadenas:

- `str.trim()` -- remueve ("recorta") espacios desde el comienzo y final de un string.
- `str.repeat(n)` -- repite el string `n` veces.
- ...y más. Mira el [manual](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String) para más detalles.

Strings también tienen métodos con expresiones regulares para buscar/reemplazar. Es un tema importante, así que es explicado en su propia sección <info:regular-expressions> .
