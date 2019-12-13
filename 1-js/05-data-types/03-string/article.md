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

Comillas simples y dobles son escencialmente lo mismo. Sin embargo, los backticks, nos permiten ingresar expresiones dentro del string, incluso llamados a funciones:

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

Si intentamos usar comillas simples o dobles de la misma forma, obtendremos un error:

```js run
let guestList = "Invitados:  // Error: Unexpected token ILLEGAL
  * Juan";
```

Las comillas simples y dobles provienen de la creación de lenguaje en tiempos ancestrales, cuando la necesidad de múltiples líneas no era tomada en cuenta. Los backticks aparecieron mucho después y por ende son más versátiles.

Los backticks además nos permiten especificar una "función de plantilla" antes del primer backtick. La sintaxis es: <code>func&#96;string&#96;</code>. La función `func` es llamada automáticamente, recibe el string y la expresión insertada y los puede procesar. Puedes leer más sobre esto en [docs](mdn:/JavaScript/Reference/Template_literals#Tagged_template_literals). Eso se llama "plantillas etiquetadas". Esta característica hace que sea más fácil rodear strings en plantillas personalizadas u otra funcionalidad, pero es raramente usada.

## Caracteres especiales

Es posible crear strings de múltiples líneas usando comillas simples, usando un llamado "caracter de nueva línea", escrito como `\n`, lo que denota un salto de línea:

```js run
let guestList = 'Invitados:\n * Juan\n * Pedro\n * Maria';

alert(guestList); // una lista de invitados en múltiples líneas
```

Por ejemplo, estas dos líneas describen lo mismo:

```js run
alert('Hola\nMundo'); // dos líneas usando el "símbolo de nueva línea"

// dos líneas usando una nueva línea normal y los backticks
alert(`Hola
Mundo`);
```

Existen otros tipos de caracteres especiales, menos comunes. Aquí está la lista:

| Caracter       | Descripción                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `\b`           | Retroceso                                                                                                                                                        |
| `\f`           | Salto de página                                                                                                                                                  |
| `\n`           | Nueva línea                                                                                                                                                      |
| `\r`           | Retorno                                                                                                                                                          |
| `\t`           | Tab                                                                                                                                                              |
| `\uNNNN`       | Un símbolo unicode con el código hex `NNNN`, por ejemplo `\u00A9` -- es un unicode para el símbolo de derechos de autor `©`. Deben ser exactamente 4 dígitos hex. |
| `\u{NNNNNNNN}` | Algunos caracteres extraños son codificados con dos símbolos unicode, utilizando hasta 4 bytes. Este unicode largo requiere llaves a su alrededor.               |

Ejemplos con unicode:

```js run
alert('\u00A9'); // ©
alert('\u{20331}'); // 佫, un raro jeroglífico chino (unicode largo)
alert('\u{1F60D}'); // 😍, un emoticón sonriendo (otro unicode largo)
```

Todos los caracteres especiales comienzan con una barra invertida `\`. También conocida como "caracter de escape".

También la usamos si queremos insertar una comilla dentro de un string.

Por ejemplo:

```js run
alert('Yo soy \'Walrus\''); // Yo soy 'Walrus'
```

Como puedes ver, debimos anteponer un caracter de escape `\` antes de cada comilla ya que de otra manera hubiera indicado el final del string.

Obviamente, eso se refiere sólo a las comillas que son iguales a las que están rodeando al string. Por lo que, una solución más elegante sería cambiar a comillas dobles o backticks:

```js run
alert(`Yo soy "Walrus"`); // Yo soy "Walrus"
```

Notar que el caracter de escape `\` sirve para la correcta lectura del string por JavaScript, luego desaparece. El string que quedó en la memoria no incluye `\`. Lo puedes ver claramente en el `alert` del ejemplo anterior.

¿Pero qué pasa si necesitamos incluir un caracter de escape `\` en el string?

Es posible, pero debemos duplicarlo como sigue `\\`:

```js run
alert(`El caracter de escape: \\`); // El caracter de escape: \
```

## Largo del string (String length)

La propiedad 'length' entrega el largo del string:

```js run
alert(`Mi\n`.length); // 3
```
Notar que `\n` es un caracter "especial" único, por lo que el largo es `3`.

```warn header="`length` es una característica"
Gente con experiencia en otros lenguajes a veces comete errores de tipeo al llamar `str.length()` en vez de `str.length`. Esto no funciona.

Por favor notar que `str.length` es una propiedad numérica, no una función. No hay necedidad de agregar un paréntesis después de ella.


````

## Accediendo caracteres

Para acceder a un caracter en la posición `pos`, se debe usar paréntesis cuadrados `[pos]` o llamar al método [str.charAt(pos)](mdn:js/String/charAt). El primer caracter comienza desde la posición cero:

```js run
let str = `Hola`;

// el primer caracter
alert( str[0] ); // H
alert( str.charAt(0) ); // H

// el último caracter
alert( str[str.length - 1] ); // a
````

Los paréntesis cuadrados son una forma moderna de acceder a los caracteres, mientras que `charAt` existe principalmente por razones históricas.

La única diferencia entre ellos es que si no se encuentra un caracter, `[]` retorna `undefined` (indefinido), y `charAt` retorna un string vacío.

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

Strings no pueden ser modificados en JavaScript. Es imposible modificar un caracter.

Intentemoslo para demostrar que no funciona:

```js run
let str = 'Hola';

str[0] = 'h'; // error
alert(str[0]); // no funciona
```

La solución alternativa es crear un nuevo string y asignarlo a `str` en vez de aisgnarlo al anterior.

Por ejemplo:

```js run
let str = 'Hola';

str = 'h' + str[1]; // reemplaza el string

alert(str); // hola
```

En la sección siguiente veremos más ejemplos de esto.

## Cambiando mayúsculas y minúsuculas

Los métodos [toLowerCase()](mdn:js/String/toLowerCase) y [toUpperCase()](mdn:js/String/toUpperCase) cambian los caracteres a minúscula y mayúscula respectivamente:

```js run
alert('Interfaz'.toUpperCase()); // INTERFAZ
alert('Interfaz'.toLowerCase()); // interfaz
```

Si queremos un sólo caractér en minúscula:

```js
alert('Interfaz'[0].toLowerCase()); // 'i'
```

## Buscando una subcadena de caracteres

Existen muchas formas de buscar por subcadenas de caracteres dentro de una cadena completa.


### str.indexOf


El primer método es [str.indexOf(substr, pos)](mdn:js/String/indexOf).

Este busca un `substr` en `str`, comenzando desde la posición entregada `pos`, y retorna la posición donde es encontrado el subcaracter o `-1` en caso de no encontrar nada.

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
Existe también un método similar [str.lastIndexOf(substr, position)](mdn:js/String/lastIndexOf) que busca desde el final del string hasta el comienzo.

Este imprimirá las ocurrencias en orden reverso.

````

Existe un leve inconveniente con `indexOf` en la prueba `if`. No podemos utilizarlo en el `if` como sigue:

```js run
let str = "Widget con id";

if (str.indexOf("Widget")) {
    alert("Lo encontramos"); // no funciona!
}
````

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

````smart header="El truco bitwise NOT"
Uno de los trucos antiguos es el operador [bitwise NOT](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Bitwise_Operators#Bitwise_NOT)) `~`. Este convierte el número en un entero de 32-bits (elimina la parte decimal si es que existe) y luego reversa todos los bits en su representación binaria.

Para enteros de 32 bits, el llamado `~n` significa exactamente lo mismo que `-(n+1)` (debido al formato IEEE-754).

Por ejemplo:

```js run
alert( ~2 ); // -3, lo mismo que -(2+1)
alert( ~0 ); // -1, lo mismo que -(0+1)
alert( ~1 ); // -2, lo mismo que -(1+1)
*!*
alert( ~-1 ); // 0, lo mismo que -(-1+1)
*/!*
```

Como podemos ver, `~n` es cero sólo si `n == -1`.

Por lo que, la prueba `if ( ~str.indexOf("...") )` es veraz y el resultado de ``indexOf no es `-1`. En otras palabras, cuando es encontrado.

La gente lo usa para acrotar verificaciones `indexOf`:

```js run
let str = "Widget";

if (~str.indexOf("Widget")) {
  alert( 'Lo encontramos!' ); // funciona
}
```

Usualmente no es recomendado utilizar características linguisticas en formas no obvias, pero en particular, este truco es utilizado ampliamente en código antiguo, por lo que debemos entenderlo.

Recuerda: `if (~str.indexOf(...))` es leído como "si es encontrado".
````

### includes, startsWith, endsWith

El método más moderno [str.includes(substr, pos)](mdn:js/String/includes) retorna `true/false` dependiendo si `str` contiene `substr` dentro.

Es la opción correcta si lo que necesitamos es encontrar el `substr` pero no necesitamos la posición.

```js run
alert('Widget con id'.includes('Widget')); // true

alert('Hola'.includes('Adios')); // false
```

El segundo argumento opcional de `str.includes` es la posición desde dónde comienza a buscar:

```js run
alert('Midget'.includes('id')); // true
alert('Midget'.includes('id', 3)); // false, desde la posición 3 no hay "id"
```

Los métodos [str.startsWith](mdn:js/String/startsWith) (comienza con) y [str.endsWith](mdn:js/String/endsWith) (termina con) hacen exactamente lo que dicen:

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
    alert( str.slice(0, 1) ); // 's', desde 0 hasta 1, pero sin incluir 1, por lo que sólo el caracter en 0
    ```

    Si no existe segundo argumento, entonces `slice` va hasta el final del string:

    ```js run
    let str = "st*!*ringify*/!*";
    alert( str.slice(2) ); // ringify, desde la 2nda posición hasta el final
    ```

    Valores negativos para `comienzo/final` también son posibles. Ellos indican que la posición es contada desde el final del string.
    

    ```js run
    let str = "strin*!*gif*/!*y";

    // comienza en la 4ta posición desde la derecha, finaliza en la 1era posición desde la derecha
    alert( str.slice(-4, -1) ); // gif
    ```

`str.substring(comienzo [, final])`
: Retorna la parte del string _entre_ `comienzo` y `final`.

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

    Argumentos negativos son (al contrario de slice) compatibles, son tratados como `0`.


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
Todos son capaces de hacer el trabajo. Formalmente, `substr` tiene una pequeña desventaja: no es descrito en la especificación central de JavaScript, pero en Annex B, la cual cubre características sólo de navegadores, que existen principalmente por razones históricas. Por lo que entornos sin navegador pueden fallar en compatibilidad. Pero en la práctica funciona en todos lados.

Los autores generalmente usan `slice` casi todo el tiempo
```

## Comparando strings

Como sabemos desde el capítulo <info:comparison>, strings son comparados caracter por caracter, en orden alfabético.

Aunque, existen algunas singularidades.

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

Todos los strings son codificados usando [UTF-16](https://es.wikipedia.org/wiki/UTF-16). Esto significa: cada caracter tiene un código numérico correspondiente. Existen métodos especiales que permiten obtener el carácter para el código y viceversa.

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

Ves? Caracteres capitalizados (mayúsculas) van primero, luego unos cuantos caracteres especiales, luego las minúsculas.

Ahora se vuelve obvio por qué `a > Z`.

Los caracteres son comparados por su código numérico. Código mayor significa que el caracter es mayor. El código para `a` (97) es mayor que el código para `Z` (90).


- Todas las letras minúsculas van después de las mayúsculas ya que sus códigos son mayores.
- Algunas letras como `Ö` se mantienen apartadas del alfabeto principal. Aquó, el codigo es mayor que cualquiera desde `a` hasta `z`.

### Comparaciones correctas

El algoritmo "correcto" para realizar comparaciónes de strings es más complejo de lo que parece, debido a que los alfabetos son diferentes para diferentes lenguajes. Una letra que se ve igual en dos alfabetos distintos, pueden tener distintas posiciones.

Por lo que el navegador necesita saber el lenguaje para comparar.

Por suerte, todos los navegadores modernos (IE10- requiere adicionalmente la biblioteca [Intl.JS](https://github.com/andyearnshaw/Intl.js/)) mantienen la internalización del estandar [ECMA 402](http://www.ecma-international.org/ecma-402/1.0/ECMA-402.pdf).

Este provee un método especial para comparar strings en distintos lenguajes, siguiendo sus reglas.

El llamado [str.localeCompare(str2)](mdn:js/String/localeCompare):

- Retorna `1` si `str` es mayor que `str2` de acuerdo a las reglas del lenguaje.
- Retorna `-1` si `str` es menor que `str2`.
- Retorna `0` si son iguales.

Por ejemplo:

```js run
alert('Österreich'.localeCompare('Zealand')); // -1
```

Este método tiene dos argumentos adicionales especificados en [la documentación](mdn:js/String/localeCompare), la cual le permite especificar el languaje (por defeto lo toma del entorno) y configura reglas adicionales como sensibilidad a las mayúsculas y minúsculas o si debe `"a"` y `"á"` ser tratadas como iguales, etc.

## Internals, Unicode

```warn header="Conocimiento avanzado"
Esta sección ahonda en string internals. Este conocimiento será útil para ti si pleaneas lidiar con emoticones, raros caracteres matemáticos, jeroglíficos o otros símbolos extraños.

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

De hecho, tenemos un sólo símbolo en cada string más arriba, pero el `length` (largo) muestra `2`.

`String.fromCodePoint` y `str.codePointAt` son algunos métodos extraños que tratan con pares sustitutos. Aparecieron recientemente en el lenguaje. Antes de ellos, existían sólo [String.fromCharCode](mdn:js/String/fromCharCode) y [str.charCodeAt](mdn:js/String/charCodeAt). Estos métodos son actualmente lo mismo que `fromCodePoint/codePointAt`, pero no funcionan con pares sustitutos.

Pero por ejemplo, obtener un símbolo puede ser dificil, ya que los pares substitutos son tratados como dos caracteres:

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

Encontrarás más formas de trabajar con pares sustitutos más adelante en el capítulo <info:iterable>. Probablemente hay bibliotecas especiales para eso también, pero nada lo suficientemente famoso como para sugerir aquí.

### Marcas diacríticas y normalización

En muchos idiomas hay símbolos que se componen del carácter base con una marca arriba / debajo.

Por ejemplo, la letra `a` puede ser el carácter base para:` àáâäãåā`. Los caracteres "compuestos" más comunes tienen su propio código en la tabla UTF-16. Pero no todos ellos, porque hay demasiadas combinaciones posibles.

Para mantener composiciones arbitrarias, UTF-16 nos permite usar varios caracteres unicode. El carácter base y uno o varios caracteres de "marca" que lo "decoran".

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
alert('S\u0307\u0323'); // Ṩ, S + punti arriba + punto debajo
alert('S\u0323\u0307'); // Ṩ, S + punto debajo + punto arriba

alert('S\u0307\u0323' == 'S\u0323\u0307'); // false
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

Existen varios otros métodos útiles en cadenas:

- `str.trim()` -- remueve ("recorta") espacios desde el comienzo y final de un string.
- `str.repeat(n)` -- repite el string `n` veces.
- ...y más. Mira el [manual](mdn:js/String) para más detalles.

Strings también tienen métodos para buscar / reemplazar con expresiones regulares. Pero ese tema merece un capítulo separado, así que volveremos a eso más adelante.

