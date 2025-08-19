# Conversiones de Tipos

La mayoría de las veces, los operadores y las funciones convierten automáticamente los valores que reciben al tipo de dato que necesitan.

Por ejemplo, `alert` convierte automáticamente cualquier valor a string para mostrarlo, y las operaciones matemáticas convierten los valores a números.

También hay casos donde necesitamos convertir de manera explícita un valor al tipo esperado.

```smart header="Por ahora, no hablaremos de los objetos"
En este capítulo no cubrimos objetos. Por ahora, solamente veremos valores primitivos.

Más adelante, después de aprender objetos, veremos en el capítulo <info:object-toprimitive> cómo funciona la conversión.
```

## Conversión a String

La conversión a string ocurre cuando necesitamos la representación textual de un valor.

Por ejemplo, `alert(value)` lo hace para mostrar `value` como texto.

También podemos llamar a la función `String(value)` para convertir `value` a string:

```js run
let value = true;
alert(typeof value); // boolean

*!*
value = String(value); // ahora value es el string "true"
alert(typeof value); // string
*/!*
```

La conversión a string es bastante evidente. El boolean `false` se convierte en `"false"`, `null` en `"null"`, etc.

## Conversión numérica

La conversión numérica ocurre automáticamente en funciones matemáticas y expresiones.

Por ejemplo, cuando se aplica la división `/` a valores no numéricos:

```js run
alert( "6" / "2" ); // 3, los strings son convertidos a números
```

Podemos usar la función `Number(value)` para convertir de forma explícita `value` a un número:

```js run
let str = "123";
alert(typeof str); // string

let num = Number(str); // se convierte en 123

alert(typeof num); // number
```

Usualmente, se requiere conversión explícita cuando leemos un valor desde una fuente basada en texto, como un formulario, pero esperamos que sea un número.

Si el string no es un número válido, el resultado de la conversión será `NaN`. Por ejemplo:

```js run
let age = Number("un texto arbitrario en vez de un número");

alert(age); // NaN, conversión fallida
```

Reglas de conversión numérica:

| Valor |  Se convierte en... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;and&nbsp;false</code> | `1` y `0` |
| `string` | Se eliminan los espacios en blanco (incluyendo espacios, tabs `\t`, saltos de línea `\n`, etc.) del inicio y final del texto. Si el string resultante es vacío, el resultado es `0`, en caso contrario el número es "leído" del string. Un error devuelve `NaN`. |

Ejemplos:

```js run
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error al leer el número cuando encuentra "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

Es importante notar que `null` y `undefined` se comportan de distinta manera aquí: `null` se convierte en `0` mientras que `undefined` se convierte en `NaN`.

La mayoría de los operadores matemáticos también ejecutan dicha conversión, lo veremos en el siguiente capítulo.

## Conversión booleana

La conversión a boolean es la más simple.

Ocurre en operaciones lógicas (más adelante veremos test condicionales y otras cosas similares), pero también puede realizarse de forma explícita llamando a la función `Boolean(value)`.

Las reglas de conversión:

- Los valores que son intuitivamente "vacíos", como `0`, `""`, `null`, `undefined`, y `NaN`, se convierten en `false`.
- Otros valores se convierten en `true`.

Por ejemplo:

```js run
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hola") ); // true
alert( Boolean("") ); // false
```

````warn header="Ten en cuenta: el string con un cero `\"0\"` es `true`"
Algunos lenguajes (como PHP) tratan `"0"` como `false`. Pero en JavaScript, un string no vacío es siempre `true`.

```js run
alert( Boolean("0") ); // true
alert( Boolean(" ") ); // sólo espacios, también true (cualquier string no vacío es true)
```
````

## Resumen

Las tres conversiones de tipo más usadas son a string, a número y a boolean.

**`Conversión a String`** -- Ocurre cuando mostramos un valor. Se puede realizar con `String(value)`. La conversión a string es usualmente evidente para los valores primitivos.

**`Conversión numérica`** -- Ocurre en operaciones matemáticas. Se puede realizar con `Number(value)`.

La conversión sigue las reglas:

| Valor |  Se convierte en... |
|-------|-------------|
|`undefined`|`NaN`|
|`null`|`0`|
|<code>true&nbsp;/&nbsp;false</code> | `1 / 0` |
| `string` | El string es leído "como es", los espacios en blanco (incluye espacios, tabs `\t`, saltos de línea `\n`, etc.) tanto al inicio como al final son ignorados. Un string vacío se convierte en `0`. Un error entrega `NaN`. |

**`Conversión booleana`** -- Ocurren en operaciones lógicas. Se puede realizar con `Boolean(value)`.

Sigue las reglas:

| Valor |  Se convierte en... |
|-------|-------------|
|`0`, `null`, `undefined`, `NaN`, `""` |`false`|
|cualquier otro valor| `true` |


La mayoría de estas reglas son fáciles de entender y recordar. Las excepciones más notables donde se suele cometer errores son:

- `undefined` es `NaN` como número, no `0`.
- `"0"` y textos que solo contienen espacios como `"   "` son `true` como boolean.

Los objetos no son cubiertos aquí. Volveremos a ellos más tarde en el capítulo <info:object-toprimitive> que está dedicado exclusivamente a objetos después de que aprendamos más cosas básicas sobre JavaScript.
