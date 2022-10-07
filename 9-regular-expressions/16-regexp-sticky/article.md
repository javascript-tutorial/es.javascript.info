
# Indicador adhesivo “y”, buscando en una posición.

EL indicador `pattern:y` permite realizar la búsqueda en una posición dada en el string de origen.

Para entender el caso de uso del indicador `pattern:y` exploremos un ejemplo práctico.

Una tarea común para regexps es el "Análisis léxico": tomar un texto (como el de un lenguaje de programación), y analizar sus elementos estructurales. Por ejemplo, HTML tiene etiquetas y atributos, el código JavaScript tiene funciones, variables, etc.

Escribir analizadores léxicos es un área especial, con sus propias herramientas y algoritmos, así que no profundizaremos en ello; pero existe una tarea común: leer algo en una posición dada.

Por ej. tenemos una cadena de código `subject:let varName = "value"`, y necesitamos leer el nombre de su variable, que comienza en la posición `4`.

Buscaremos el nombre de la variable usando regexp `pattern:\w+`. En realidad, el nombre de la variable de JavaScript necesita un regexp un poco más complejo para un emparejamiento más preciso, pero aquí eso no importa.

Una llamada a `str.match(/\w+/)` solo encontrará la primera palabra de la línea (`let`). No es la que queremos.
Podríamos añadir el indicador `pattern:g`, pero al llamar a `str.match(/\w+/g)` buscará todas las palabras del texto y solo necesitamos una y en la posición `4`. De nuevo, no es lo que necesitamos.

**Entonces, ¿cómo buscamos exactamente en un posición determinada?** 

Usemos el método `regexp.exec(str)`.

Para un `regexp` sin los indicadores `pattern:g` y `pattern:y`, este método busca la primera coincidencia y funciona exactamente igual a `str.match(regexp)`.

...Pero si existe el indicador `pattern:g`, realiza la búsqueda en `str` empezando desde la posición almacenada en su propiedad `regexp.lastIndex`. Y si encuentra una coincidencia, establece `regexp.lastIndex` en el index inmediatamente posterior a la coincidencia.

En otras palabras, `regexp.lastIndex` funciona como punto de partida para la búsqueda, cada llamada lo reestablece a un nuevo valor: el posterior a la última coincidencia. 

Entonces, llamadas sucesivas a `regexp.exec(str)` devuelve coincidencias una después de la otra.

Un ejemplo (con el indicador `pattern:g`):

```js run
let str = 'let varName'; // encontremos todas las palabras del string
let regexp = /\w+/g;

alert(regexp.lastIndex); // 0 (inicialmente lastIndex=0) 

let word1 = regexp.exec(str);
alert(word1[0]); // let (primera palabra)
alert(regexp.lastIndex); // 3 (Posición posterior a la coincidencia)

let word2 = regexp.exec(str);
alert(word2[0]); // varName (2da palabra)
alert(regexp.lastIndex); // 11 (Posición posterior a la coincidencia)

let word3 = regexp.exec(str);
alert(word3); // null (no más coincidencias)
alert(regexp.lastIndex); // 0 (se reinicia al final de la búsqueda)
```

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

Tal uso de `regexp.exec` es una alternativa al método `str.match bAll`, con más control sobre el proceso.

Volvamos a nuestra tarea.

Podemos establecer manualmente `lastIndex` a `4`, para comenzar la búsqueda desde la posición dada.

Como aquí:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g; // Sin el indicador “g”, la propiedad lastindex es ignorada.

*!*
regexp.lastIndex = 4;
*/!*

let word = regexp.exec(str);
alert(word); // varName
```

¡Problema resuelto!

Realizamos una búsqueda de `pattern:\w+`, comenzando desde la posición `regexp.lastIndex = 4`.

El resultado es correcto.

...Pero espera, no tan rápido.

Nota que la búsqueda comienza en la posición `lastIndex` y luego sigue adelante. Si no hay ninguna palabra en la posición `lastIndex` pero la hay en algún lugar posterior, entonces será encontrada:

```js run
let str = 'let varName = "value"';

let regexp = /\w+/g;

*!*
// comenzando desde la posición 3
regexp.lastIndex = 3;
*/!*

let word = regexp.exec(str);
// encuentra coincidencia en la posición 4
alert(word[0]); // varName
alert(word.index); // 4
```

Para algunas tareas, incluido el análisis léxico, esto está mal. Necesitamos la coincidencia en la posición exacta, y para ello es el flag `y`.

**El indicador `pattern:y` hace que `regexp.exec` busque "exactamente en" la posición `lastIndex`, no "comenzando en" ella.**

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

No solamente es lo que necesitamos, el uso del indicador `pattern:y` mejora el rendimiento.

Imagina que tenemos un texto largo, y no hay coincidencias en él. Entonces la búsqueda con el indicador `pattern:g` irá hasta el final del texto, y esto tomará significativamente más tiempo que la búsqueda con el indicador `pattern:y`.

En tareas tales como el análisis léxico, normalmente hay muchas búsquedas en una posición exacta. Usar el indicador `pattern:y` es la clave para un buen desempeño.
