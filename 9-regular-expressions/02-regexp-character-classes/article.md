# Clases de caracteres

Considera una tarea práctica: tenemos un número de teléfono como `"+7(903)-123-45-67"`, y debemos convertirlo en número puro: `79031234567`.

Para hacerlo, podemos encontrar y eliminar cualquier cosa que no sea un número. La clase de caracteres pueden ayudar con eso.

Una *clase de caracteres* es una notación especial que coincide con cualquier símbolo de un determinado conjunto.

Para empezar, exploremos la clase "dígito". Está escrito como `pattern:\d` y corresponde a "cualquier dígito".

Por ejemplo, busquemos el primer dígito en el número de teléfono:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/;

alert( str.match(regexp) ); // 7
```

Sin la bandera (flag) `pattern:g`, la expresión regular solo busca la primera coincidencia, es decir, el primer dígito `pattern:\d`.

Agreguemos la bandera `pattern:g` para encontrar todos los dígitos:

```js run
let str = "+7(903)-123-45-67";

let regexp = /\d/g;

alert( str.match(regexp) ); // array de coincidencias: 7,9,0,3,1,2,3,4,5,6,7

// hagamos el número de teléfono de solo dígitos:
alert( str.match(regexp).join('') ); // 79031234567
```

Esa fue una clase de caracteres para los dígitos. También hay otras.

Las más usadas son:

`pattern:\d` ("d" es de dígito")
: Un dígito: es un caracter de `0` a `9`.

`pattern:\s` ("s" es un espacio)
: Un símbolo de espacio: incluye espacios, tabulaciones `\t`, líneas nuevas `\n` y algunos otros caracteres raros, como `\v`, `\f` y `\r`.

`pattern:\w` ("w" es carácter de palabra)
: Un carácter de palabra es: una letra del alfabeto latino o un dígito o un guión bajo `_`. Las letras no latinas (como el cirílico o el hindi) no pertenecen al `pattern:\w`.

Por ejemplo, `pattern:\d\s\w` significa un "dígito" seguido de un "carácter de espacio" seguido de un "carácter de palabra", como `match:1 a`.

**Una expresión regular puede contener símbolos regulares y clases de caracteres.**

Por ejemplo, `pattern:CSS\d` coincide con una cadena `match:CSS` con un dígito después:

```js run
let str = "¿Hay CSS4?";
let regexp = /CSS\d/

alert( str.match(regexp) ); // CSS4
```

También podemos usar varias clases de caracteres:

```js run
alert( "Me gusta HTML5!".match(/\s\w\w\w\w\d/) ); // ' HTML5'
```

La coincidencia (cada clase de carácter de la expresión regular tiene el carácter resultante correspondiente):

![](love-html5-classes.svg)

## Clases inversas

Para cada clase de caracteres existe una "clase inversa", denotada con la misma letra, pero en mayúscula.

El "inverso" significa que coincide con todos los demás caracteres, por ejemplo:

`pattern:\D`
: Sin dígitos: cualquier carácter excepto `pattern:\d`, por ejemplo, una letra.

`pattern:\S`
: Sin espacio: cualquier carácter excepto `pattern:\s`, por ejemplo, una letra.

`pattern:\W`
: Sin carácter de palabra: cualquier cosa menos `pattern:\w`, por ejemplo, una letra no latina o un espacio.

Al comienzo del capítulo vimos cómo hacer un número de teléfono solo de números a partir de una cadena como `subject:+7(903)-123-45-67`: encontrar todos los dígitos y unirlos.

```js run
let str = "+7(903)-123-45-67";

alert( str.match(/\d/g).join('') ); // 79031234567
```

Una forma alternativa y más corta es usar el patrón sin dígito `pattern:\D` para encontrarlos y eliminarlos de la cadena:

```js run
let str = "+7(903)-123-45-67";

alert( str.replace(/\D/g, "") ); // 79031234567
```

## Un punto es "cualquier carácter"

El patrón punto (`pattern:.`) es una clase de caracteres especial que coincide con "cualquier carácter excepto una nueva línea".

Por ejemplo:

```js run
alert( "Z".match(/./) ); // Z
```

O en medio de una expresión regular:

```js run
let regexp = /CS.4/;

alert( "CSS4".match(regexp) ); // CSS4
alert( "CS-4".match(regexp) ); // CS-4
alert( "CS 4".match(regexp) ); // CS 4 (el espacio también es un carácter)
```

Tenga en cuenta que un punto significa "cualquier carácter", pero no la "ausencia de un carácter". Debe haber un carácter para que coincida:

```js run
alert( "CS4".match(/CS.4/) ); // null, no coincide porque no hay caracteres entre S y 4
```

### Punto es igual a la bandera "s" que literalmente retorna cualquier carácter

Por defecto, *punto* no coincide con el carácter de  línea nueva `\n`.

Por ejemplo, la expresión regular `pattern:A.B` coincide con `match:A`, y luego `match:B` con cualquier carácter entre ellos, excepto una línea nueva `\n`:

```js run
alert( "A\nB".match(/A.B/) ); // null (sin coincidencia)
```

Hay muchas situaciones en las que nos gustaría que *punto* signifique literalmente "cualquier carácter", incluida la línea nueva.

Eso es lo que hace la bandera `pattern:s`. Si una expresión regular la tiene, entonces `pattern:.` coincide literalmente con cualquier carácter:

```js run
alert( "A\nB".match(/A.B/s) ); // A\nB (coincide!)
```

````warn header="No soportado en IE"
La bandera `pattern:s` no está soportada en IE.

Afortunadamente, hay una alternativa, que funciona en todas partes. Podemos usar una expresión regular como `pattern:[\s\S]` para que coincida con "cualquier carácter". (Este patrón será cubierto en el artículo <info:regexp-character-sets-and-ranges>).

```js run
alert( "A\nB".match(/A[\s\S]B/) ); // A\nB (coincide!)
```

El patrón `pattern:[\s\S]` literalmente dice: "con carácter de espacio O sin carácter de espacio". En otras palabras, "cualquier cosa". Podríamos usar otro par de clases complementarias, como `pattern:[\d\D]`, eso no importa. O incluso `pattern:[^]`, que significa que coincide con cualquier carácter excepto nada.

También podemos usar este truco si queremos ambos tipos de "puntos" en el mismo patrón: el patrón actual `pattern:.` comportándose de la manera regular ("sin incluir una línea nueva"), y la forma de hacer coincidir "cualquier carácter" con el patrón `pattern:[\s\S]` o similar.
````

````warn header="Presta atención a los espacios"
Por lo general, prestamos poca atención a los espacios. Para nosotros, las cadenas `subject:1-5` y `subject:1 - 5` son casi idénticas.

Pero si una expresión regular no tiene en cuenta los espacios, puede que no funcione.

Intentemos encontrar dígitos separados por un guión:

```js run
alert( "1 - 5".match(/\d-\d/) ); // null, sin coincidencia!
```

Vamos a arreglarlo agregando espacios en la expresión regular `pattern:\d - \d`:

```js run
alert( "1 - 5".match(/\d - \d/) ); // 1 - 5, funciona ahora
// o podemos usar la clase \s:
alert( "1 - 5".match(/\d\s-\s\d/) ); // 1 - 5, tambien funciona
```

**Un espacio es un carácter. Igual de importante que cualquier otro carácter.**

No podemos agregar o eliminar espacios de una expresión regular y esperar que funcione igual.

En otras palabras, en una expresión regular todos los caracteres importan, los espacios también.
````

## Resumen

Existen las siguientes clases de caracteres:

- `pattern:\d` -- dígitos.
- `pattern:\D` -- sin dígitos.
- `pattern:\s` -- símbolos de espacio, tabulaciones, líneas nuevas.
- `pattern:\S` -- todo menos `pattern:\s`.
- `pattern:\w` -- letras latinas, dígitos, guión bajo `'_'`.
- `pattern:\W` -- todo menos `pattern:\w`.
- `pattern:.` -- cualquier carácter, si la expresión regular usa la bandera `'s'`, de otra forma cualquiera excepto **línea nueva** `\n`.

...¡Pero eso no es todo!

La codificación Unicode, utilizada por JavaScript para las cadenas, proporciona muchas propiedades para los caracteres, como: a qué idioma pertenece la letra (si es una letra), es un signo de puntuación, etc.

Se pueden hacer búsquedas usando esas propiedades. Y se requiere la bandera `pattern:u`, analizada en el siguiente artículo.
