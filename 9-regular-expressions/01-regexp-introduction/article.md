# Patrones y banderas (flags)

Las expresiones regulares son patrones que proporcionan una forma poderosa de buscar y reemplazar texto.

En JavaScript, están disponibles a través del objeto [RegExp](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/RegExp), además de integrarse en métodos de cadenas.

## Expresiones Regulares

Una expresión regular (también "regexp", o simplemente "reg") consiste en un *patrón* y *banderas* opcionales.


Hay dos sintaxis que se pueden usar para crear un objeto de expresión regular.

La sintaxis "larga":

```js
regexp = new RegExp("patrón", "banderas");
```

Y el "corto", usando barras `"/"`:

```js
regexp = /pattern/; // sin banderas
regexp = /pattern/gmi; // con banderas g,m e i (para ser cubierto pronto)
```

Las barras `pattern:/.../` le dicen a JavaScript que estamos creando una expresión regular. Juegan el mismo papel que las comillas para las cadenas.

En ambos casos, `regexp` se convierte en una instancia de la clase incorporada `RegExp`.

La principal diferencia entre estas dos sintaxis es que el patrón que utiliza barras `/.../` no permite que se inserten expresiones (como los literales de plantilla de cadena con `${...}`). Son completamente estáticos.

Las barras se utilizan cuando conocemos la expresión regular en el momento de escribir el código, y esa es la situación más común. Mientras que  `new RegExp`, se usa con mayor frecuencia cuando necesitamos crear una expresión regular "sobre la marcha" a partir de una cadena generada dinámicamente. Por ejemplo:

```js
let tag = prompt("¿Qué etiqueta quieres encontrar?", "h2");

igual que /<h2>/ si respondió "h2" en el mensaje anterior
```

## Banderas

Las expresiones regulares pueden usar banderas que afectan la búsqueda.

Solo hay 6 de ellas en JavaScript:

`pattern:i`
: Con esta bandera, la búsqueda no distingue entre mayúsculas y minúsculas: no hay diferencia entre `A` y `a` (consulte el ejemplo a continuación).

`pattern:g`
: Con esta bandera, la búsqueda encuentra todas las coincidencias, sin ella, solo se devuelve la primera coincidencia.

`pattern:m`
: Modo multilínea (cubierto en el capítulo <info:regexp-multiline-mode>).

`pattern:s`
: Habilita el modo "dotall", que permite que un punto `pattern:.` coincida con el carácter de línea nueva `\n` (cubierto en el capítulo <info:regexp-character-classes>).


`pattern:u`
: Permite el soporte completo de Unicode. La bandera permite el procesamiento correcto de pares sustitutos. Más del tema en el capítulo <info:regexp-unicode>.

`pattern:y`
: Modo "adhesivo": búsqueda en la posición exacta del texto (cubierto en el capítulo <info:regexp-sticky>)

```smart header="Colores"
A partir de aquí, el esquema de color es:

- regexp -- `pattern:red`
- cadena (donde buscamos) -- `subject:blue`
- resulta -- `match:green`
```

## Buscando: str.match

Como se mencionó anteriormente, las expresiones regulares se integran con los métodos de cadena.

El método `str.match(regex)` busca todas las coincidencias de `regex` en la cadena `str`.

Tiene 3 modos de trabajo:

1. Si la expresión regular tiene la bandera `pattern:g`, devuelve un arreglo de todas las coincidencias:
    ```js run
    let str = "We will, we will rock you";

    alert( str.match(/we/gi) ); // We,we (un arreglo de 2 subcadenas que coinciden)
    ```
    Tenga en cuenta que tanto `match:We` como `match: we` se encuentran, porque la bandera `pattern:i` hace que la expresión regular no distinga entre mayúsculas y minúsculas.

2. Si no existe dicha bandera, solo devuelve la primera coincidencia en forma de arreglo, con la coincidencia completa en el índice `0` y algunos detalles adicionales en las propiedades:
    ```js run
    let str = "We will, we will rock you";

    let result = str.match(/we/i); // sin la bandera g

    alert( result[0] );     // We (1ra coincidencia)
    alert( result.length ); // 1

    // Detalles:
    alert( result.index );  // 0 (posición de la coincidencia)
    alert( result.input );  // We will, we will rock you (cadena fuente)
    ```
    El arreglo puede tener otros índices, además de `0` si una parte de la expresión regular está encerrada entre paréntesis. Cubriremos eso en el capítulo <info:regexp-groups>.

3. Y, finalmente, si no hay coincidencias, se devuelve `null` (no importa si hay una bandera `pattern:g` o no).

    Este es un matiz muy importante. Si no hay coincidencias, no recibimos un arreglo vacío, sino que recibimos `null`. Olvidar eso puede conducir a errores, por ejemplo:

    ```js run
    let matches = "JavaScript".match(/HTML/); // = null

    if (!matches.length) { // Error: No se puede leer la propiedad 'length' de null
      alert("Error en la línea anterior");
    }
    ```

    Si queremos que el resultado sea siempre un arreglo, podemos escribirlo de esta manera:

    ```js run
    let matches = "JavaScript".match(/HTML/)*!* || []*/!*;

    if (!matches.length) {
      alert("Sin coincidencias"); // ahora si trabaja
    }
    ```

## Reemplazando: str.replace

El método `str.replace(regexp, replacement)` reemplaza las coincidencias encontradas usando `regexp` en la cadena `str` con `replacement` (todas las coincidencias si está la bandera `pattern:g`, de lo contrario, solo la primera).

Por ejemplo:

```js run
// sin la bandera g
alert( "We will, we will".replace(/we/i, "I") ); // I will, we will

// con la bandera g
alert( "We will, we will".replace(/we/ig, "I") ); // I will, I will
```

El segundo argumento es la cadena de `replacement`. Podemos usar combinaciones de caracteres especiales para insertar fragmentos de la coincidencia:

| Símbolos | Acción en la cadena de reemplazo |
|--------|--------|
|`$&`|inserta toda la coincidencia|
|<code>$&#096;</code>|inserta una parte de la cadena antes de la coincidencia|
|`$'`|inserta una parte de la cadena después de la coincidencia|
|`$n`|si `n` es un número de 1-2 dígitos, entonces inserta el contenido de los paréntesis n-ésimo, más del tema en el capítulo <info:regexp-groups>|
|`$<name>`|inserta el contenido de los paréntesis con el `nombre` dado, más del tema en el capítulo <info:regexp-groups>|
|`$$`|inserta el carácter `$` |

Un ejemplo con `pattern:$&`:

```js run
alert( "Me gusta HTML".replace(/HTML/, "$& y JavaScript") ); // Me gusta HTML y JavaScript
```

## Pruebas: regexp.test

El método `regexp.test(str)` busca al menos una coincidencia, si se encuentra, devuelve `true`, de lo contrario `false`.

```js run
let str = "Me gusta JavaScript";
let regexp = /GUSTA/i;


alert( regexp.test(str) ); // true
```

Más adelante en este capítulo estudiaremos más expresiones regulares, exploraremos más ejemplos y también conoceremos otros métodos.

La información completa sobre métodos se proporciona en el artículo <info:regexp-method>.

## Resumen

- Una expresión regular consiste en un patrón y banderas opcionales: `pattern:g`, `pattern:i`, `pattern:m`, `pattern:u`, `pattern:s`, `pattern:y`.
- Sin banderas y símbolos especiales (que estudiaremos más adelante), la búsqueda por expresión regular es lo mismo que una búsqueda de subcadena.
- El método `str.match(regexp)` busca coincidencias: devuelve todas si hay una bandera `pattern:g`, de lo contrario, solo la primera.
- El método `str.replace(regexp, replacement)` reemplaza las coincidencias encontradas usando `regexp` con `replacement`: devuelve todas si hay una bandera `pattern:g`, de lo contrario solo la primera.
- El método `regexp.test(str)` devuelve `true` si hay al menos una coincidencia, de lo contrario, devuelve `false`.
