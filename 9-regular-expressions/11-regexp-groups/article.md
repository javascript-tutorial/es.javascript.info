<<<<<<< HEAD
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
=======
# Capturing groups

A part of a pattern can be enclosed in parentheses `pattern:(...)`. This is called a "capturing group".

That has two effects:

1. It allows to get a part of the match as a separate item in the result array.
2. If we put a quantifier after the parentheses, it applies to the parentheses as a whole.

## Examples

Let's see how parentheses work in examples.

### Example: gogogo

Without parentheses, the pattern `pattern:go+` means `subject:g` character, followed by `subject:o` repeated one or more times. For instance, `match:goooo` or `match:gooooooooo`.

Parentheses group characters together, so `pattern:(go)+` means `match:go`, `match:gogo`, `match:gogogo` and so on.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
alert( 'Gogogo now!'.match(/(go)+/ig) ); // "Gogogo"
```

<<<<<<< HEAD
### Ejemplo: dominio

Hagamos algo más complejo: una expresión regular para buscar un dominio de sitio web.

Por ejemplo:
=======
### Example: domain

Let's make something more complex -- a regular expression to search for a website domain.

For example:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```
mail.com
users.mail.com
smith.users.mail.com
```

<<<<<<< HEAD
Como podemos ver, un dominio consta de palabras repetidas, un punto después de cada una excepto la última.

En expresiones regulares eso es `pattern:(\w+\.)+\w+`:
=======
As we can see, a domain consists of repeated words, a dot after each one except the last one.

In regular expressions that's `pattern:(\w+\.)+\w+`:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let regexp = /(\w+\.)+\w+/g;

alert( "site.com my.site.com".match(regexp) ); // site.com,my.site.com
```

<<<<<<< HEAD
La búsqueda funciona, pero el patrón no puede coincidir con un dominio con un guión, por ejemplo, `my-site.com`, porque el guión no pertenece a la clase `pattern:\w`.

Podemos arreglarlo al reemplazar `pattern:\w` con `pattern:[\w-]` en cada palabra excepto el último: `pattern:([\w-]+\.)+\w+`.

### Ejemplo: email

El ejemplo anterior puede ser extendido. Podemos crear una expresión regular para emails en base a esto.

El formato de email es: `name@domain`. Cualquier palabra puede ser el nombre, no se permite guiones y puntos. En expresiones regulares esto es `pattern:[-.\w]+`.

El patrón:
=======
The search works, but the pattern can't match a domain with a hyphen, e.g. `my-site.com`, because the hyphen does not belong to class `pattern:\w`.

We can fix it by replacing `pattern:\w` with `pattern:[\w-]` in every word except the last one: `pattern:([\w-]+\.)+\w+`.

### Example: email

The previous example can be extended. We can create a regular expression for emails based on it.

The email format is: `name@domain`. Any word can be the name, hyphens and dots are allowed. In regular expressions that's `pattern:[-.\w]+`.

The pattern:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

alert("my@mail.com @ his@site.com.uk".match(regexp)); // my@mail.com, his@site.com.uk
```

<<<<<<< HEAD
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
=======
That regexp is not perfect, but mostly works and helps to fix accidental mistypes. The only truly reliable check for an email can only be done by sending a letter.

## Parentheses contents in the match

Parentheses are numbered from left to right. The search engine memorizes the content matched by each of them and allows to get it in the result.

The method `str.match(regexp)`, if `regexp` has no flag `g`, looks for the first match and returns it as an array:

1. At index `0`: the full match.
2. At index `1`: the contents of the first parentheses.
3. At index `2`: the contents of the second parentheses.
4. ...and so on...

For instance, we'd like to find HTML tags `pattern:<.*?>`, and process them. It would be convenient to have tag content (what's inside the angles), in a separate variable.

Let's wrap the inner content into parentheses, like this: `pattern:<(.*?)>`.

Now we'll get both the tag as a whole `match:<h1>` and its contents `match:h1` in the resulting array:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let str = '<h1>Hello, world!</h1>';

let tag = str.match(/<(.*?)>/);

alert( tag[0] ); // <h1>
alert( tag[1] ); // h1
```

<<<<<<< HEAD
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
=======
### Nested groups

Parentheses can be nested. In this case the numbering also goes from left to right.

For instance, when searching a tag in `subject:<span class="my">` we may be interested in:

1. The tag content as a whole: `match:span class="my"`.
2. The tag name: `match:span`.
3. The tag attributes: `match:class="my"`.

Let's add parentheses for them: `pattern:<(([a-z]+)\s*([^>]*))>`.

Here's how they are numbered (left to right, by the opening paren):

![](regexp-nested-groups-pattern.svg)

In action:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let str = '<span class="my">';

let regexp = /<(([a-z]+)\s*([^>]*))>/;

let result = str.match(regexp);
alert(result[0]); // <span class="my">
alert(result[1]); // span class="my"
alert(result[2]); // span
alert(result[3]); // class="my"
```

<<<<<<< HEAD
El índice cero de `result` siempre contiene la coincidencia completa.

Luego los grupos, numerados de izquierda a derecha por un paréntesis de apertura. El primer grupo se devuelve como `result[1]`. Aquí se encierra todo el contenido de la etiqueta.

Luego en `result[2]` va el grupo desde el segundo paréntesis de apertura `pattern:([a-z]+)` - nombre de etiqueta, luego en `result[3]` la etiqueta: `pattern:([^>]*)`.

El contenido de cada grupo en el string:

![](regexp-nested-groups-matches.svg)

### Grupos opcionales

Incluso si un grupo es opcional y no existe en la coincidencia (p.ej. tiene el cuantificador `pattern:(...)?`), el elemento array `result` correspondiente está presente y es igual a `undefined`.

Por ejemplo, consideremos la expresión regular `pattern:a(z)?(c)?`. Busca `"a"` seguida por opcionalmente `"z"`, seguido por `"c"` opcionalmente.

Si lo ejecutamos en el string con una sola letra `subject:a`, entonces el resultado es:
=======
The zero index of `result` always holds the full match.

Then groups, numbered from left to right by an opening paren. The first group is returned as `result[1]`. Here it encloses the whole tag content.

Then in `result[2]` goes the group from the second opening paren `pattern:([a-z]+)` - tag name, then in `result[3]` the tag: `pattern:([^>]*)`.

The contents of every group in the string:

![](regexp-nested-groups-matches.svg)

### Optional groups

Even if a group is optional and doesn't exist in the match (e.g. has the quantifier `pattern:(...)?`), the corresponding `result` array item is present and equals `undefined`.

For instance, let's consider the regexp `pattern:a(z)?(c)?`. It looks for `"a"` optionally followed by `"z"` optionally followed by `"c"`.

If we run it on the string with a single letter `subject:a`, then the result is:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let match = 'a'.match(/a(z)?(c)?/);

alert( match.length ); // 3
<<<<<<< HEAD
alert( match[0] ); // a (coincidencia completa)
=======
alert( match[0] ); // a (whole match)
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
alert( match[1] ); // undefined
alert( match[2] ); // undefined
```

<<<<<<< HEAD
El array tiene longitud de `3`, pero todos los grupos están vacíos.

Y aquí hay una coincidencia más compleja para el string `subject:ac`:
=======
The array has the length of `3`, but all groups are empty.

And here's a more complex match for the string `subject:ac`:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let match = 'ac'.match(/a(z)?(c)?/)

alert( match.length ); // 3
<<<<<<< HEAD
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
=======
alert( match[0] ); // ac (whole match)
alert( match[1] ); // undefined, because there's nothing for (z)?
alert( match[2] ); // c
```

The array length is permanent: `3`. But there's nothing for the group `pattern:(z)?`, so the result is `["ac", undefined, "c"]`.

## Searching for all matches with groups: matchAll

```warn header="`matchAll` is a new method, polyfill may be needed"
The method `matchAll` is not supported in old browsers.

A polyfill may be required, such as <https://github.com/ljharb/String.prototype.matchAll>.
```

When we search for all matches (flag `pattern:g`), the `match` method does not return contents for groups.

For example, let's find all tags in a string:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let str = '<h1> <h2>';

let tags = str.match(/<(.*?)>/g);

alert( tags ); // <h1>,<h2>
```

<<<<<<< HEAD
El resultado es un array de coincidencias, pero sin detalles sobre cada uno de ellos. Pero en la práctica normalmente necesitamos contenidos de los grupos de captura en el resultado.

Para obtenerlos tenemos que buscar utilizando el método `str.matchAll(regexp)`.

Fue incluido a JavaScript mucho después de `match`, como su versión "nueva y mejorada".

Al igual que `match`, busca coincidencias, pero hay 3 diferencias:

1. No devuelve un array sino un objeto iterable.
2. Cuando está presente el indicador `pattern:g`, devuelve todas las coincidencias como un array con grupos.
3. Si no hay coincidencias, no devuelve `null` sino un objeto iterable vacío.

Por ejemplo:
=======
The result is an array of matches, but without details about each of them. But in practice we usually need contents of capturing groups in the result.

To get them, we should search using the method `str.matchAll(regexp)`.

It was added to JavaScript language long after `match`, as its "new and improved version".

Just like `match`, it looks for matches, but there are 3 differences:

1. It returns not an array, but an iterable object.
2. When the flag `pattern:g` is present, it returns every match as an array with groups.
3. If there are no matches, it returns not `null`, but an empty iterable object.

For instance:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

<<<<<<< HEAD
// results - no es un array, sino un objeto iterable
=======
// results - is not an array, but an iterable object
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
alert(results); // [object RegExp String Iterator]

alert(results[0]); // undefined (*)

<<<<<<< HEAD
results = Array.from(results); // lo convirtamos en array

alert(results[0]); // <h1>,h1 (1er etiqueta)
alert(results[1]); // <h2>,h2 (2da etiqueta)
```

Como podemos ver, la primera diferencia es muy importante, como se demuestra en la línea `(*)`. No podemos obtener la coincidencia como `results[0]`, porque ese objeto no es pseudo array. Lo podemos convertir en un `Array` real utilizando `Array.from`. Hay más detalles sobre pseudo arrays e iterables en el artículo. <info:iterable>.

No se necesita `Array.from` si estamos iterando sobre los resultados:
=======
results = Array.from(results); // let's turn it into array

alert(results[0]); // <h1>,h1 (1st tag)
alert(results[1]); // <h2>,h2 (2nd tag)
```

As we can see, the first difference is very important, as demonstrated in the line `(*)`. We can't get the match as `results[0]`, because that object isn't pseudoarray. We can turn it into a real `Array` using `Array.from`. There are more details about pseudoarrays and iterables in the article <info:iterable>.

There's no need in `Array.from` if we're looping over results:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

for(let result of results) {
  alert(result);
<<<<<<< HEAD
  // primer alert: <h1>,h1
  // segundo: <h2>,h2
}
```

...O utilizando desestructurización:
=======
  // first alert: <h1>,h1
  // second: <h2>,h2
}
```

...Or using destructuring:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js
let [tag1, tag2] = '<h1> <h2>'.matchAll(/<(.*?)>/gi);
```

<<<<<<< HEAD
Cada coincidencia devuelta por `matchAll` tiene el mismo formato que el devuelto por `match` sin el flag `pattern:g`: es un array con propiedades adicionales `index` (coincide índice en el string) e `input` (fuente string):
=======
Every match, returned by `matchAll`, has the same format as returned by `match` without flag `pattern:g`: it's an array with additional properties `index` (match index in the string) and `input` (source string):
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let results = '<h1> <h2>'.matchAll(/<(.*?)>/gi);

let [tag1, tag2] = results;

alert( tag1[0] ); // <h1>
alert( tag1[1] ); // h1
alert( tag1.index ); // 0
alert( tag1.input ); // <h1> <h2>
```

<<<<<<< HEAD
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
=======
```smart header="Why is a result of `matchAll` an iterable object, not an array?"
Why is the method designed like that? The reason is simple - for the optimization.

The call to `matchAll` does not perform the search. Instead, it returns an iterable object, without the results initially. The search is performed each time we iterate over it, e.g. in the loop.

So, there will be found as many results as needed, not more.

E.g. there are potentially 100 matches in the text, but in a `for..of` loop we found 5 of them, then decided it's enough and make a `break`. Then the engine won't spend time finding other 95 matches.
```

## Named groups

Remembering groups by their numbers is hard. For simple patterns it's doable, but for more complex ones counting parentheses is inconvenient. We have a much better option: give names to parentheses.

That's done by putting `pattern:?<name>` immediately after the opening paren.

For example, let's look for a date in the format "year-month-day":
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

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

<<<<<<< HEAD
Como puedes ver, los grupos residen en la propiedad `.groups` de la coincidencia.

Para buscar todas las fechas, podemos agregar el flag `pattern:g`.

También vamos a necesitar `matchAll` para obtener coincidencias completas, junto con los grupos:
=======
As you can see, the groups reside in the `.groups` property of the match.

To look for all dates, we can add flag `pattern:g`.

We'll also need `matchAll` to obtain full matches, together with groups:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let dateRegexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30 2020-01-01";

let results = str.matchAll(dateRegexp);

for(let result of results) {
  let {year, month, day} = result.groups;

  alert(`${day}.${month}.${year}`);
<<<<<<< HEAD
  // primer alert: 30.10.2019
  // segundo: 01.01.2020
}
```

## Grupos de captura en reemplazo

El método `str.replace(regexp, replacement)` que reemplaza todas las coincidencias con `regexp` en `str` nos permite utilizar el contenido de los paréntesis en el string `replacement`. Esto se hace utilizando `pattern:$n`, donde `pattern:n` es el número de grupo.

Por ejemplo,
=======
  // first alert: 30.10.2019
  // second: 01.01.2020
}
```

## Capturing groups in replacement

Method `str.replace(regexp, replacement)` that replaces all matches with `regexp` in `str` allows to use parentheses contents in the `replacement` string. That's done using `pattern:$n`, where `pattern:n` is the group number.

For example,
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let str = "John Bull";
let regexp = /(\w+) (\w+)/;

alert( str.replace(regexp, '$2, $1') ); // Bull, John
```

<<<<<<< HEAD
Para los paréntesis con nombre la referencia será `pattern:$<name>`.

Por ejemplo, volvamos a darle formato a las fechas desde "year-month-day" a "day.month.year":
=======
For named parentheses the reference will be `pattern:$<name>`.

For example, let's reformat dates from "year-month-day" to "day.month.year":
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;

let str = "2019-10-30, 2020-01-01";

alert( str.replace(regexp, '$<day>.$<month>.$<year>') );
// 30.10.2019, 01.01.2020
```

<<<<<<< HEAD
## Grupos que no capturan con ?:

A veces necesitamos paréntesis para aplicar correctamente un cuantificador, pero no queremos su contenido en los resultados.

Se puede excluir un grupo agregando `pattern:?:` al inicio.

Por ejemplo, si queremos encontrar `pattern:(go)+`, pero no queremos el contenido del paréntesis (`go`) como un ítem separado del array, podemos escribir: `pattern:(?:go)+`.

En el ejemplo de arriba solamente obtenemos el nombre `match:John` como un miembro separado de la coincidencia:
=======
## Non-capturing groups with ?:

Sometimes we need parentheses to correctly apply a quantifier, but we don't want their contents in results.

A group may be excluded by adding `pattern:?:` in the beginning.

For instance, if we want to find `pattern:(go)+`, but don't want the parentheses contents (`go`) as a separate array item, we can write: `pattern:(?:go)+`.

In the example below we only get the name `match:John` as a separate member of the match:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
let str = "Gogogo John!";

*!*
<<<<<<< HEAD
// ?: excluye 'go' de la captura
=======
// ?: exludes 'go' from capturing
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
let regexp = /(?:go)+ (\w+)/i;
*/!*

let result = str.match(regexp);

<<<<<<< HEAD
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
=======
alert( result[0] ); // Gogogo John (full match)
alert( result[1] ); // John
alert( result.length ); // 2 (no more items in the array)
```

## Summary

Parentheses group together a part of the regular expression, so that the quantifier applies to it as a whole.

Parentheses groups are numbered left-to-right, and can optionally be named with  `(?<name>...)`.

The content, matched by a group, can be obtained in the results:

- The method `str.match` returns capturing groups only without flag `pattern:g`.
- The method `str.matchAll` always returns capturing groups.

If the parentheses have no name, then their contents is available in the match array by its number. Named parentheses are also available in the property `groups`.

We can also use parentheses contents in the replacement string in `str.replace`: by the number `$n` or the name `$<name>`.

A group may be excluded from numbering by adding `pattern:?:` in its start. That's used when we need to apply a quantifier to the whole group, but don't want it as a separate item in the results array. We also can't reference such parentheses in the replacement string.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
