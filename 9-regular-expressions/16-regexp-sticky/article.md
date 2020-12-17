
# Indicador adhesivo “y”, buscando en una posición.

EL indicador `pattern:y` permite realizar la búsqueda en una posición dada en el string de origen.

Para entender el caso de uso del indicador `pattern:y`, y ver lo notable que es, exploremos un ejemplo práctico.

Una tarea común para regexps es "Analisis lexico": tenemos un texto, por ej. en un lenguaje de programación,  y analiza sus elementos estructurales.

Por ejemplo, HTML tiene etiquetas y atributos, el código JavaScript tiene funciones, variables, etc.

Escribir analizadores léxicos es un área especial, con sus propias herramientas y algoritmos, así que no profundizaremos en ello, pero existe una tarea común: leer algo en una posición dada.

Por ej. tenemos una cadena de código `subject:let varName = "value"`, y necesitamos leer el nombre de su variable, que comienza en la posición `4`.

Buscaremos el nombre de la variable usando regexp `pattern:\w+`. En realidad, el nombre de la variable de JavaScript necesita un regexp un poco más complejo para un emparejamiento más preciso, pero aquí eso no importa.

Una llamada a `str.match(/\w+/)` solo encontrará la primera palabra de la línea, o todas las palabras con el indicador `pattern:g`. Pero solo necesitamos una palabra en la posición `4`.

Para buscar desde la posición dada, usamos el método `regexp.exec(str)`.

Sí `regexp` no tiene indicadores `pattern:g` o `pattern:y`, entonces este método busca la primer coincidencia en el string `str`, exactamente como `str.match(regexp)`. Un caso tan simple sin indicadores no nos interesa aquí.

Sí hay indicador `pattern:g`, realiza la búsqueda en el string `str`, empezando desde la posición almacenada en su propiedad `regexp.lastIndex`. Y, si encuentra una coincidencia, entonces establece `regexp.lastIndex` en el index inmediatamente después del emparejamiento.

Cuando un regex es creado, su `lastIndex` es `0`.

Entonces, llamadas sucesivas a `regexp.exec(str)` devuelve coincidencias una después de la otra.

Un ejemplo (con el indicador `pattern:g`):

```js run
let str = 'let varName';

let regexp = /\w+/g;
alert(regexp.lastIndex); // 0 (inicialmente lastIndex=0) 

let word1 = regexp.exec(str);
alert(word1[0]); // let (1er palabra)
alert(regexp.lastIndex); // 3 (Posición posterior al emparejamiento)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2da palabra)
alert(regexp.lastIndex); // 11 (Posición posterior al emparejamiento)

let word3 = regexp.exec(str);
alert(word3); // null (no más emparejamientos)
alert(regexp.lastIndex); // 0 (reinicia en el final de la búsqueda)
```

Cada coincidencia es devuelta como un array con grupos y propiedades adicionales.

Podemos conseguir todas las coincidencias en el loop:

```js run
let str = 'let varName';
let regexp = /\w+/g;

let result;

while (result = regexp.exec(str)) {
  alert( `Found ${result[0]} at position ${result.index}` );
  // Found let at position 0, then
  // Found varName at position 4
}
```

Tal uso de `regexp.exec` es una alternativa para el método `str.match bAll`.

A diferencia de otros métodos, podemos establecer nuestro propio `lastIndex`, para comenzar la búsqueda desde la posición dada.

Por ejemplo, encontremos una palabra, comenzando desde la posición `4`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // Sin el indicador “g”, la propiedad lastindex es ignorada.

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

Realizamos una búsqueda de `pattern:\w+`, comenzando desde la posición `regexp.lastIndex = 4`.

Por favor nota que la búsqueda comienza en la posición `lastIndex` y luego profundiza. Sí no hay ninguna palabra en la posición `lastIndex`, pero está en algún lugar posterior, entonces será encontrada:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str);
alert(word[0]); // varName
alert(word.index); // 4
```

...Así que, con la propiedad `lastIndex` del indicador `pattern:g` se establece la posición inicial de la búsqueda.

**El indicador `pattern:y` hace que `regexp.exec` busque exactamente en la posición `lastIndex`, ni antes ni después.**

Aquí está la misma búsqueda con el indicador `pattern:y`:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert( regexp.exec(str) ); // null (Hay un espacio en la posición 3, no una palabra) 

regexp.lastIndex = 4;
alert( regexp.exec(str) ); // varName (Una palabra en la posición 4)
```

Como podemos ver, el `pattern:/\w+/y` de regexp no coincide en la posición `3` (a diferencia del indicador `pattern:g`), pero coincide en la posición `4`.

Imagina que tenemos un texto largo, y no hay coincidencias en él. Entonces la búsqueda con el indicador `pattern:g` irá hasta el final del texto, y esto tomará significativamente más tiempo que la búsqueda con el indicador `pattern:y`.

En tales tareas como el análisis léxico, normalmente hay muchas búsquedas en una posición exacta. Usar el indicador `pattern:y` es la clave para un buen desempeño.
