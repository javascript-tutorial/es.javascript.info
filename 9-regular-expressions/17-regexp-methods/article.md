# Métodos de RegExp y String

En este artículo vamos a abordar varios métodos que funcionan con expresiones regulares a fondo.

## str.match(regexp)

El método `str.match(regexp)` encuentra coincidencias para las expresiones regulares (`regexp`) en la cadena (`str`).

Tiene 3 modos:

1. Si la expresión regular (`regexp`) no tiene la bandera `pattern:g`, retorna un array con los grupos capturados y las propiedades `index` (posición de la coincidencia), `input` (cadena de entrada, igual a `str`):

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/);

    alert( result[0] );     // JavaScript (toda la coincidencia)
    alert( result[1] );     // Script (primer grupo capturado)
    alert( result.length ); // 2

    // Additional information:
    alert( result.index );  // 7 (match position)
    alert( result.input );  // I love JavaScript (cadena de entrada)
    ```

2. Si la expresión regular (`regexp`) tiene la bandera `pattern:g`, retorna un array de todas las coincidencias como cadenas, sin capturar grupos y otros detalles.
    ```js run
    let str = "I love JavaScript";

    let result = str.match(/Java(Script)/g);

    alert( result[0] ); // JavaScript
    alert( result.length ); // 1
    ```

3. Si no hay coincidencias, no importa si tiene la bandera `pattern:g` o no,  retorna `null` .

    Esto es algo muy importante. Si no hay coincidencias, no vamos a obtener un array vacío, pero sí un `null`. Es fácil cometer un error olvidándolo, ej.:

    ```js run
    let str = "I love JavaScript";

    let result = str.match(/HTML/);

    alert(result); // null
    alert(result.length); // Error: Cannot read property 'length' of null
    ```

    Si queremos que el resultado sea un array, podemos escribirlo así:

    ```js
    let result = str.match(regexp) || [];
    ```

## str.matchAll(regexp)

[recent browser="new"]

El método `str.matchAll(regexp)` es una variante ("nueva y mejorada") de `str.match`.

Es usado principalmente para buscar por todas las coincidencias con todos los grupos.

Hay 3 diferencias con `match`:

1. Retorna un objeto iterable con las coincidencias en lugar de un array. Podemos convertirlo en un array usando el método `Array.from`.
2. Cada coincidencia es retornada como un array con los grupos capturados (el mismo formato de `str.match` sin la bandera `pattern:g`).
3. Si no hay resultados devuelve un objeto iterable vacío en lugar de `null`.

Ejemplo de uso:

```js run
let str = '<h1>Hello, world!</h1>';
let regexp = /<(.*?)>/g;

let matchAll = str.matchAll(regexp);

alert(matchAll); // [object RegExp String Iterator], no es un array, pero sí un objeto iterable

matchAll = Array.from(matchAll); // ahora es un array

let firstMatch = matchAll[0];
alert( firstMatch[0] );  // <h1>
alert( firstMatch[1] );  // h1
alert( firstMatch.index );  // 0
alert( firstMatch.input );  // <h1>Hello, world!</h1>
```

Si usamos `for..of` para iterar todas las coincidencias de `matchAll`, no necesitamos `Array.from`.

## str.split(regexp|substr, limit)

Divide la cadena usando la expresión regular (o una sub-cadena) como delimitador.

Podemos usar `split` con cadenas, así:

```js run
alert('12-34-56'.split('-')) // array de ['12', '34', '56']
```

O también dividir una cadena usando una expresión regular de la misma forma:

```js run
alert('12, 34, 56'.split(/,\s*/)) // array de ['12', '34', '56']
```

## str.search(regexp)

El método `str.search(regexp)` retorna la posición de la primera coincidencia o `-1` si no encuentra nada:

```js run
let str = "A drop of ink may make a million think";

alert( str.search( /ink/i ) ); // 10 (posición de la primera coincidencia)
```

**Limitación importante: `search` solamente encuentra la primera coincidencia.**

Si necesitamos las posiciones de las demás coincidencias, deberíamos usar otros medios, como encontrar todos con `str.matchAll(regexp)`.

## str.replace(str|regexp, str|func)

Este es un método genérico para buscar y reemplazar, uno de los más útiles. La navaja suiza para buscar y reemplazar.  

Podemos usarlo sin expresiones regulares, para buscar y reemplazar una sub-cadena:

```js run
// reemplazar guion por dos puntos
alert('12-34-56'.replace("-", ":")) // 12:34-56
```

Sin embargo hay una trampa:

**Cuando el primer argumento de `replace` es una cadena, solo reemplaza la primera coincidencia.**

Puedes ver eso en el ejemplo anterior: solo el primer `"-"` es reemplazado por `":"`.

Para encontrar todos los guiones, no necesitamos usar un cadena `"-"` sino una expresión regular `pattern:/-/g` con la bandera `pattern:g` obligatoria:

```js run
// reemplazar todos los guiones por dos puntos
alert( '12-34-56'.replace( *!*/-/g*/!*, ":" ) )  // 12:34:56
```

El segundo argumento es la cadena de reemplazo. Podemos usar caracteres especiales:

| Símbolos | Acción en la cadena de reemplazo |
|--------|--------|
|`$&`|inserta toda la coincidencia|
|<code>$&#096;</code>|inserta una parte de la cadena antes de la coincidencia|
|`$'`|inserta una parte de la cadena después de la coincidencia|
|`$n`|si `n` es un número, inserta el contenido del enésimo grupo capturado, para más detalles ver [](info:regexp-groups)|
|`$<nombre>`|inserta el contenido de los paréntesis con el `nombre` dado, para más detalles ver [](info:regexp-groups)|
|`$$`|inserta el carácter `$` |

Por ejemplo:

```js run
let str = "John Smith";

// intercambiar el nombre con el apellido
alert(str.replace(/(john) (smith)/i, '$2, $1')) // Smith, John
```

**Para situaciones que requieran reemplazos "inteligentes", el segundo argumento puede ser una función.**

Puede ser llamado por cada coincidencia y el valor retornado puede ser insertado como un reemplazo.

La función es llamada con los siguientes argumentos `func(match, p1, p2, ..., pn, offset, input, groups)`:

1. `match` -- la coincidencia,
2. `p1, p2, ..., pn` -- contenido de los grupos capturados (si hay alguno),
3. `offset` -- posición de la coincidencia,
4. `input` -- la cadena de entrada,
5. `groups` -- un objeto con los grupos nombrados.

Si hay paréntesis en la expresión regular, entonces solo son 3 argumentos: `func(str, offset, input)`.

Por ejemplo, hacer mayúsculas todas las coincidencias:

```js run
let str = "html and css";

let result = str.replace(/html|css/gi, str => str.toUpperCase());

alert(result); // HTML and CSS
```

Reemplazar cada coincidencia por su posición en la cadena:

```js run
alert("Ho-Ho-ho".replace(/ho/gi, (match, offset) => offset)); // 0-3-6
```

En el ejemplo anterior hay dos paréntesis, entonces la función de reemplazo es llamada con 5 argumentos: el primero es toda la coincidencia, luego dos paréntesis, y después (no usado en el ejemplo) la posición de la coincidencia y la cadena de entrada:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (match, name, surname) => `${surname}, ${name}`);

alert(result); // Smith, John
```

Si hay muchos grupos, es conveniente usar parámetros rest para acceder a ellos:

```js run
let str = "John Smith";

let result = str.replace(/(\w+) (\w+)/, (...match) => `${match[2]}, ${match[1]}`);

alert(result); // Smith, John
```

O, si estamos usando grupos nombrados, entonces el objeto `groups` con ellos es siempre el último, por lo que podemos obtenerlos así:

```js run
let str = "John Smith";

let result = str.replace(/(?<name>\w+) (?<surname>\w+)/, (...match) => {
  let groups = match.pop();

  return `${groups.surname}, ${groups.name}`;
});

alert(result); // Smith, John
```

Usando una función nos da todo el poder del reemplazo, porque obtiene toda la información de la coincidencia, ya que tiene acceso a las variables externas y se puede hacer de todo.

## str.replaceAll(str|regexp, str|func)

Este método es esencialmente el mismo que `str.replace`, con dos diferencias principales:

1. Si el primer argumento es un string, reemplaza *todas las ocurrencias* del string, mientras qye `replace` solamente reemplaza la *primera ocurrencia*.
2. Si el primer argumento es una expresión regular sin la bandera `g`, funciona igual que `replace`.

El caso de uso principal para `replaceAll` es el reemplazo de todas las ocurrencias de un string.

Como esto:

```js run
// reemplaza todos los guiones por dos puntos
alert('12-34-56'.replaceAll("-", ":")) // 12:34:56
```


## regexp.exec(str)

El método `regexp.exec(str)` retorna una coincidencia por expresión regular `regexp` en la cadena `str`. A diferencia de los métodos anteriores, se llama en una expresión regular en lugar de en una cadena.

Se comporta de manera diferente dependiendo de si la expresión regular tiene la bandera `pattern:g` o no.

Si no está la bandera `pattern:g`, entonces `regexp.exec(str)` retorna la primera coincidencia igual que `str.match(regexp)`. Este comportamiento no trae nada nuevo.

Pero si está la bandera `pattern:g`, entonces:
- Una llamada a `regexp.exec(str)` retorna la primera coincidencia y guarda la posición inmediatamente después en `regexp.lastIndex`.
- La siguiente llamada de la búsqueda comienza desde la posición de `regexp.lastIndex`, retorna la siguiente coincidencia y guarda la posición inmediatamente después en `regexp.lastIndex`.
- ...y así sucesivamente.
- Si no hay coincidencias, `regexp.exec` retorna `null` y resetea `regexp.lastIndex` a `0`.

Entonces, repetidas llamadas retornan todas las coincidencias una tras otra, usando la propiedad `regexp.lastIndex` para realizar el rastreo de la posición actual de la búsqueda.

En el pasado, antes de que el método `str.matchAll` fuera agregado a JavaScript, se utilizaban llamadas de `regexp.exec` en el ciclo para obtener todas las coincidencias con sus grupos:

```js run
let str = 'More about JavaScript at https://javascript.info';
let regexp = /javascript/ig;

let result;

while (result = regexp.exec(str)) {
  alert( `Se encontró ${result[0]} en la posición ${result.index}` );
  // Se encontró JavaScript en la posición 11, luego
  // Se encontró javascript en la posición 33
}
```

Esto también funciona, aunque para navegadores modernos `str.matchAll` usualmente es lo más conveniente.

**Podemos usar `regexp.exec` para buscar desde una posición dada configurando manualmente el `lastIndex`.**

Por ejemplo:

```js run
let str = 'Hello, world!';

let regexp = /\w+/g; // sin la bandera "g", la propiedad `lastIndex` es ignorada
regexp.lastIndex = 5; // buscar desde la 5ta posición (desde la coma)

alert( regexp.exec(str) ); // world
```

Si la expresión regular tiene la bandera `pattern:y`, entonces la búsqueda se realizará exactamente en la posición del `regexp.lastIndex`, no más adelante.

Vamos a reemplazar la bandera `pattern:g` con `pattern:y` en el ejemplo anterior. No habrá coincidencias, ya que no hay palabra en la posición `5`:

```js run
let str = 'Hello, world!';

let regexp = /\w+/y;
regexp.lastIndex = 5; // buscar exactamente en la posición 5

alert( regexp.exec(str) ); // null
```

Esto es conveniente cuando con una expresión regular necesitamos "leer" algo de la cadena en una posición exacta, no en otro lugar.

## regexp.test(str)

El método `regexp.test(str)` busca por una coincidencia y retorna `true/false` si existe.

Por ejemplo:

```js run
let str = "I love JavaScript";

// estas dos pruebas hacen lo mismo
alert( *!*/love/i*/!*.test(str) ); // true
alert( str.search(*!*/love/i*/!*) != -1 ); // true
```

Un ejemplo con respuesta negativa:

```js run
let str = "Bla-bla-bla";

alert( *!*/love/i*/!*.test(str) ); // false
alert( str.search(*!*/love/i*/!*) != -1 ); // false
```

Si la expresión regular tiene la bandera `pattern:g`, el método `regexp.test` busca la propiedad `regexp.lastIndex` y la actualiza, igual que `regexp.exec`.

Entonces podemos usarlo para buscar desde un posición dada:

```js run
let regexp = /love/gi;

let str = "I love JavaScript";

// comienza la búsqueda desde la posición 10:
regexp.lastIndex = 10;
alert( regexp.test(str) ); // false (sin coincidencia)
```

````warn header="La misma expresión regular probada (de manera global) repetidamente en diferentes lugares puede fallar"
Si nosotros aplicamos la misma expresión regular (de manera global) a diferentes entradas, puede causar resultados incorrectos, porque `regexp.test` anticipa las llamadas usando la propiedad `regexp.lastIndex`, por lo que la búsqueda en otra cadena puede comenzar desde una posición distinta a cero.

Por ejemplo, aquí llamamos `regexp.test` dos veces en el mismo texto y en la segunda vez falla:

```js run
let regexp = /javascript/g;  // (expresión regular creada: regexp.lastIndex=0)

alert( regexp.test("javascript") ); // true (ahora regexp.lastIndex es 10)
alert( regexp.test("javascript") ); // false
```

Eso es porque `regexp.lastIndex` no es cero en la segunda prueba.

Para solucionarlo, podemos establecer `regexp.lastIndex = 0` antes de cada búsqueda. O en lugar de llamar a los métodos en la expresión regular usar los métodos de cadena `str.match/search/...`, ellos no usan el `lastIndex`.
````
