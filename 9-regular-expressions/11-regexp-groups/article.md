# Grupos de captura

Una parte de un patrón se puede incluir entre paréntesis `pattern:(...)`. Esto se llama "grupo de captura".

Esto tiene dos resultados:

1. Permite obtener una parte de la coincidencia como un elemento separado en la matriz de resultados.
2. Si colocamos un cuantificador después del paréntesis, se aplica a los paréntesis en su conjunto.

## Ejemplos

Veamos cómo funcionan los paréntesis en los ejemplos.

### Ejemplo: gogogo

Sin paréntesis, el patrón `pattern:go+` significa el carácter `subject:g`, seguido por `subject:o` repetido una o más veces. Por ejemplo, `match:goooo` o `match:gooooooooo`.

Los paréntesis agrupan los carácteres juntos, por lo tanto `pattern:(go)+` significa `match:go`, `match:gogo`, `match:gogogo` etcétera.

```js run
alert( 'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"
```

### Ejemplo: dominio

Hagamos algo más complejo: una expresión regular para buscar un dominio de sitio web.

Por ejemplo:

```
mail.com
users.mail.com
smith.users.mail.com
```

Como podemos ver, un dominio consta de palabras repetidas, un punto después de cada una excepto la última.

En expresiones regulares eso es `pattern:(\w+\.)+\w+`:

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

La búsqueda funciona, pero el patrón no puede coincidir con un dominio con un guión, por ejemplo, `my-site.com`, porque el guión no pertenece a la clase `pattern:\w`.

Podemos arreglarlo al reemplazar `pattern:\w` con `pattern:[\w-]` en cada palabra excepto el último: `pattern:([\w-]+\.)+\w+`.

### Ejemplo: email

El ejemplo anterior puede ser extendido. Podemos crear una expresión regular para emails en base a esto.

El formato de email es: `name@domain`. Cualquier palabra puede ser el nombre, guiones y puntos están permitidos. En expresiones regulares esto es `pattern:[-.\w]+`.

El patrón:

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

Esa expresión regular no es perfecta, pero sobre todo funciona y ayuda a corregir errores de escritura accidentales. La única verificación verdaderamente confiable para un correo electrónico solo se puede realizar enviando una carta.

## Contenido del paréntesis en la coincidencia (match)

Los paréntesis están numerados de izquierda a derecha. El buscador memoriza el contenido que coincide con cada uno de ellos y permite obtenerlo en el resultado.

El método `str.match(regexp)`, si `regexp` no tiene indicador (flag) `g`, busca la primera coincidencia y lo devuelve como un array:

1. En el índice `0`: la coincidencia completa.
2. En el índice `1`: el contenido del primer paréntesis.
3. En el índice `2`: el contenido del segundo paréntesis.
4. ...etcétera...

Por ejemplo, nos gustaría encontrar etiquetas HTML `pattern:<.*?>`, y procesarlas. Sería conveniente tener el contenido de la etiqueta (lo que está dentro de los ángulos), en una variable por separado.

Envolvamos el contenido interior en paréntesis, de esta forma: `pattern:<(.*?)>`.

Ahora obtendremos ambos, la etiqueta entera `match:<h1>`  y su contenido `match:h1` en el array resultante:

```js run
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
```

### Grupos anidados

Los paréntesis pueden ser anidados. En este caso la numeración también va de izquierda a derecha.

Por ejemplo, al buscar una etiqueta en `subject:<span class="my">` tal vez nos pueda interesar:

1. El contenido de la etiqueta como un todo: `match:span class="my"`.
2. El nombre de la etiqueta: `match:span`.
3. Los atributos de la etiqueta: `match:class="my"`.

Agreguemos paréntesis: `pattern:<(([a-z]+)\s*([^>]*))>`.

Así es cómo se enumeran (izquierda a derecha, por el paréntesis de apertura):

![](regexp-nested-groups-pattern.svg)

En acción:

```js run
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

El índice cero de `result` siempre contiene la coincidencia completa.

Luego los grupos, numerados de izquierda a derecha por un paréntesis de apertura. El primer grupo se devuelve como `result[1]`. Aquí se encierra todo el contenido de la etiqueta.

Luego en `result[2]` va el grupo desde el segundo paréntesis de apertura `pattern:([a-z]+)` - nombre de etiqueta, luego en `result[3]` la etiqueta: `pattern:([^>]*)`.

El contenido de cada grupo en el string:

![](regexp-nested-groups-matches.svg)

### Grupos opcionales

Incluso si un grupo es opcional y no existe en la coincidencia (p.ej. tiene el cuantificador `pattern:(...)?`), el elemento array `result` correspondiente está presente y es igual a `undefined`.

Por ejemplo, consideremos la expresión regular `pattern:a(z)?(c)?`. Busca `"a"` seguida por opcionalmente `"z"`, seguido por `"c"` opcionalmente.

Si lo ejecutamos en el string con una sola letra `subject:a`, entonces el resultado es:

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
alert( match[0] ); // a (coincidencia completa)
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

El array tiene longitud de `3`, pero todos los grupos están vacíos.

Y aquí hay una coincidencia más compleja para el string `subject:ac`:

```js run
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
alert( match[0] ); // ac (coincidencia completa)
alert( match[1] ); // undefined, ¿porque no hay nada para (z)?
alert( match[2] ); // c
```

La longitud del array es permanente: `3`. Pero no hay nada para el grupo `pattern:(z)?`, por lo tanto el resultado es `["ac", undefined, "c"]`.

## Buscar todas las coincidencias con grupos: matchAll

```warn header="`matchAll` es un nuevo método, polyfill puede ser necesario"
El método `matchAll` no es compatible con antiguos navegadores.

Un polyfill puede ser requerido, tal como <https://github.com/ljharb/String.prototype.matchAll>.
```

Cuando buscamos todas las coincidencias (flag `pattern:g`), el método `match` no devuelve contenido para los grupos.

Por ejemplo, encontremos todas las etiquetas en un string:

```js run
let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
```

El resultado es un array de coincidencias, pero sin detalles sobre cada uno de ellos. Pero en la práctica normalmente necesitamos contenidos de los grupos de captura en el resultado.

Para obtenerlos tenemos que buscar utilizando el método `str.matchAll(regexp)`.

Fue incluido a JavaScript mucho después de `match`, como su versión "nueva y mejorada".

Al igual que `match`, busca coincidencias, pero hay 3 diferencias:

1. No devuelve un array sino un objeto iterable.
2. Cuando está presente el indicador `pattern:g`, devuelve todas las coincidencias como un array con grupos.
3. Si no hay coincidencias, no devuelve `null` sino un objeto iterable vacío.

Por ejemplo:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

// results - no es un array, sino un objeto iterable
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

results = Array.from(results); // lo convirtamos en array

alert(results[0]); // <h1>,h1 (1er etiqueta)
alert(results[1]); // <h2>,h2 (2da etiqueta)
```

Como podemos ver, la primera diferencia es muy importante, como se demuestra en la línea `(*)`. No podemos obtener la coincidencia como `results[0]`, porque ese objeto no es pseudo array. Lo podemos convertir en un `Array` real utilizando `Array.from`. Hay más detalles sobre pseudo arrays e iterables en el artículo. <info:iterable>.

No se necesita `Array.from` si estamos iterando sobre los resultados:

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
  // primer alert: <h1>,h1
  // segundo: <h2>,h2
}
```

...O utilizando desestructurización:

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

Cada coincidencia devuelta por `matchAll` tiene el mismo formato que el devuelto por `match` sin el flag `pattern:g`: es un array con propiedades adicionales `index` (coincide índice en el string) e `input` (fuente string):

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

```smart header="¿Por qué el resultado de `matchAll` es un objeto iterable y no un array?"
¿Por qué el método está diseñado de esa manera? La razón es simple - por la optimización.

El llamado a `matchAll` no realiza la búsqueda. En cambio devuelve un objeto iterable, en un principio sin los resultados. La búsqueda es realizada cada vez que iteramos sobre ella, es decir, en el bucle.

Por lo tanto, se encontrará tantos resultados como sea necesario, no más.

Por ejemplo, posiblemente hay 100 coincidencias en el texto, pero en un bucle `for..of` encontramos 5 de ellas: entonces decidimos que es suficiente y realizamos un `break`.  Así el buscador no gastará tiempo buscando otras 95 coincidencias.
```

## Grupos con nombre

Es difícil recordar a los grupos por su número. Para patrones simples, es factible, pero para los más complejos, contar los paréntesis es inconveniente. Tenemos una opción mucho mejor: poner nombres entre paréntesis.

Eso se hace poniendo `pattern:?<name>` inmediatamente después del paréntesis de apertura.

Por ejemplo, busquemos una fecha en el formato "año-mes-día":

```js run
*!*
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/;
*/!*
let str = "2019-04-30";

let groups = str.match(dateRegexp).groups;

alert(groups.year); // 2019
alert(groups.month); // 04
alert(groups.day); // 30
```

Como puedes ver, los grupos residen en la propiedad `.groups` de la coincidencia.

Para buscar todas las fechas, podemos agregar el flag `pattern:g`.

También vamos a necesitar `matchAll` para obtener coincidencias completas, junto con los grupos:

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
  // primer alert: 30.10.2019
  // segundo: 01.01.2020
}
```

## Grupos de captura en reemplazo

El método `str.replace(regexp, replacement)` que reemplaza todas las coincidencias con `regexp` en `str` nos permite utilizar el contenido de los paréntesis en el string `replacement`. Esto se hace utilizando `pattern:$n`, donde `pattern:n` es el número de grupo.

Por ejemplo,

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

Para los paréntesis con nombre la referencia será `pattern:$<name>`.

Por ejemplo, volvamos a darle formato a las fechas desde "year-month-day" a "day.month.year":

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

## Grupos que no capturan con ?:

A veces necesitamos paréntesis para aplicar correctamente un cuantificador, pero no queremos su contenido en los resultados.

Se puede excluir un grupo agregando `pattern:?:` al inicio.

Por ejemplo, si queremos encontrar `pattern:(go)+`, pero no queremos el contenido del paréntesis (`go`) como un ítem separado del array, podemos escribir: `pattern:(?:go)+`.

En el ejemplo de arriba solamente obtenemos el nombre `match:John` como un miembro separado de la coincidencia:

```js run
let str = "Gogogo John!";

*!*
// ?: excluye 'go' de la captura
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

alert( result[0] ); // Gogogo John (coincidencia completa)
alert( result[1] ); // John
alert( result.length ); // 2 (no hay más ítems en el array)
```

## Resumen

Los paréntesis agrupan una parte de la expresión regular, de modo que el cuantificador se aplique a ella como un todo.

Los grupos de paréntesis se numeran de izquierda a derecha y, opcionalmente, se pueden nombrar con `(?<name>...)`.

El contenido, emparejado por un grupo, se puede obtener en los resultados:

- El método `str.match` devuelve grupos de captura únicamente sin el indicador (flag) `pattern:g`.
- El método `str.matchAll` siempre devuelve grupos de captura.

Si el paréntesis no tiene nombre, entonces su contenido está disponible en el array de coincidencias por su número. Los paréntesis con nombre también están disponible en la propiedad `groups`.

También podemos utilizar el contenido del paréntesis en el string de reemplazo de `str.replace`: por el número `$n` o el nombre `$<name>`.

Un grupo puede ser excluido de la enumeración al agregar `pattern:?:` en el inicio. Eso se usa cuando necesitamos aplicar un cuantificador a todo el grupo, pero no lo queremos como un elemento separado en el array de resultados. Tampoco podemos hacer referencia a tales paréntesis en el string de reemplazo.
