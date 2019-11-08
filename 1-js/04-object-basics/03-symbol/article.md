
# Tipo Symbol

Por especificación, las propiedades de un objeto deben ser solamente del tipo String o Symbol, NO pueden ser Numbers o Booleans.

Hasta ahora sólo hemos aprendido acerca de los Strings, por lo que es momento de conocer las ventajas que Symbol nos puede dar.

## Symbols

El valor de "Symbol" representa un identificador único.

Un valor de este tipo puede ser creado usando `Symbol()`:

```js
// id es un nuevo symbol
let id = Symbol();
```

También le podemos agregar una descripción (también llamada symbol name), que será útil en la depuración de código:

```js run
// id es un symbol con la descripción "id"
let id = Symbol("id");
```

Los Symbols están garantizados a ser únicos. Aunque declaremos varios Symbols con la misma descripción éstos tendrán valores distintos. La descripción es solamente una etiqueta que no afecta nada más.

Por ejemplo, aquí hay dos Symbols con la misma descripción -- pero no son iguales:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Si estás familiarizado con Ruby u otro lenguaje que también tiene symbols -- por favor no te confundas. Los Symbols de Javascript son diferentes.

````warn header="Symbols no se auto convierten a String"
La mayoría de los valores en JavaScript soportan la conversión implícita a string. Por ejemplo, podemos hacer un ´alert´ con casi cualquier valor y funcionará. Los Symbols son distintos, éstos no se auto-convierten.

Por ejemplo, este `alert` mostrará un error:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: Cannot convert a Symbol value to a string
*/!*
```

Esa es una "protección del lenguaje" para evitar errores ya que los String y los Symbol son diferentes y no deberían convertirse ocasionalmente uno en otro.

Si realmente queremos mostrar un Symbol, necesitamos llamar el método `.toString()` de la siguiente manera:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), ahora si funciona
*/!*
```

O se puede utilizar `symbol.description` para obtener la descripción solamente:
```js run
let id = Symbol("id");
*!*
alert(id.description); // id
*/!*
```

````

## Propiedades "Ocultas"

Los Symbols nos permiten crear propiedades "ocultas" en un objeto, las cuales ninguna otra parte del código puede accesar ni sobre-escribir.

Por ejemplo, si queremos guardar un "identificador" para el objeto `usuario`, podemos asignar un symbol como propiedad del objeto:

```js run
let usuario = { nombre:  "Juan" };
let id = Symbol("id");

usuario[id] = "ID Value";
alert( usuario[id] ); // podemos accesar a la información utilizando symbol como propiedad
```

¿Cuál es la ventaja de usar `Symbol("id")` y no un string `"id"`?

Vamos a profundizar en el ejemplo para que sea más claro.

Imagina que otro script quiere tener la propiedad "id" dentro de `usuario` para sus propios fines. Puede ser otra librería de JavaScript, por lo cual ninguno de los scripts saben de su coexistencia.

Y entonces ese script puede crear su propio `Symbol("id")`, como este:

```js
// ...
let id = Symbol("id");

usuario[id] = "Valor de id";
```

No habrá conflicto porque los Symbols siempre son diferentes, incluso si tienen el mismo nombre.

Ahora ten en cuenta que si utilizamos un string `"id"` en lugar de un Symbol, para el mismo propósito, entonces SI *habría* un conflicto:

```js run
let usuario = { nombre:  "Juan" };

// nuestro script usa la propiedad "id"
usuario.id = "ID Value";

// ...si luego otro script usa "id" para sus propósitos...

usuario.id = "Valor de id"
// ¡Boom, queda sobreescrito!
```

### Symbols en objetos literales

Si queremos usar un Symbol en un objeto literal, debemos usar llaves.

Como se muestra a continuación:

```js
let id = Symbol("id");

let user = {
	nombre:  "Juan",
*!*
[id]: 123 // no solo "id: 123"
*/!*
};
```
Se hace así porque necesitamos que el valor de la variable `id` sea la propiedad, no el string "id".

### Los Symbols son omitidos en for..in

Las propiedades de Symbol no participan dentro de los ciclos `for..in`.

Por ejemplo:

```js run
let id = Symbol("id");
let usuario = {
	nombre:  "Juan",
	edad:  30,
	[id]:  123
};

*!*
for (let  key  in  usuario) alert(key); // nombre, edad (no symbols)
*/!*

// el acceso directo a la propiedad de symbol funciona
alert( "Direct: " + user[id] );
```

Esto forma parte del concepto general de "ocultamiento". Si otro script o si otra librería itera el objeto este no accesará a la propiedad de Symbol.

En contraste, [Object.assign](mdn:js/Object/assign) copia las propiedades tanto del string como las del symbol:

```js run
let id = Symbol("id");
let usuario = {
[id]: 123
};

let clone = Object.assign({}, usuario);

alert( clone[id] ); // 123
```

No hay paradoja aquí, es así por diseño. La idea es que cuando clonamos un objeto o cuando fusionamos objetos, generalmente queremos que se copien *todas* las propiedades (incluidos los Symbol como `id`).

````smart header="Property keys of other types are coerced to strings"
Podemos usar solamente strings o symbols como propiedades de los objetos. Otros tipos de datos son convertidos a string.

Por ejemplo, el número `0` se convierte al string `'0'` cuando es usado como propiedad de un objeto:

```js run
let obj = {
	0: "test" // igual que "0": "test"
};

// los dos alerts pueden accesar a la misma propiedad (el número 0 es convertido a string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (misma propiedad)
```
````

## Symbols Globales

Como hemos visto, normalmente todos los Symbols son diferentes aunque tengan el mismo nombre. Pero algunas veces necesitamos que los symbol con el mismo nombre sean las mismas entidades.

Por ejemplo, distintas partes de nuestra aplicación quieren accesar a symbol `"id"` queriendo obtener el mismo valor de la propiedad.

Para lograr esto, existe un *global symbol registry*. Ahí podemos crear symbols y acceder después a ellos, lo cual nos garantiza que cada vez que se acceda a la propiedad con el mismo nombre, esta te devuelva exactamente el mismo symbol.

Para crear u accesar a un symbol en el registro global, usa `Symbol.for(key)`.

Esta llamada revisa el registro global, y si existe un symbol descrito como `key`, lo retornará, de lo contrario creará un nuevo symbol `Symbol(key)` y lo almacenará en el registro por su `key`.

Por ejemplo:

```js run
// accesar al registro global
let id = Symbol.for("id"); // si symbol no existe, será creado

// accesar una vez más
let idOtraVez = Symbol.for("id");

// el mismo symbol
alert(id === idOtraVez); // true
```

Los Symbols dentro de este registro son llamados *global symbols* y están disponibles y al alcance de todo el código en la aplicación.

```smart header="Eso suena a Ruby"
En algunos lenguajes de programación como Ruby, hay un solo Symbol por cada nombre.

En Javascript, como podemos ver, existen los global symbols.
```

### Symbol.keyFor

Para los global symbols, no solo `Symbol.for(key)` retorna un symbol por su nombre, si no que existe una llamada inversa: `Symbol.keyFor(sym)`, que hace lo contrario: retorna el nombre de un global symbol.

Por ejemplo:

```js run
let sym = Symbol.for("nombre");
let sym2 = Symbol.for("id");

// obtener nombre de un symbol
alert( Symbol.keyFor(sym) ); // nombre
alert( Symbol.keyFor(sym2) ); // id
```

El `Symbol.keyFor` utiliza internamente el global symbol registry para buscar la propiedad del symbol, por lo tanto, no funciona para los symbol que no están dentro del registro. Si el symbol no es global, no será capaz de encontrarlo y por lo tanto retornará `undefined`.

Por ejemplo:

```js run
alert( Symbol.keyFor(Symbol.for("nombre")) ); // nombre, global symbol

alert( Symbol.keyFor(Symbol("nombre2")) ); // undefined, el argumento no es un global symbol
```

## System symbols

Existen varios symbols del sistema que JavaScript utiliza internamente, y que podemos usar para ajustar varios aspectos de nuestros objetos.

Se encuentran listados en [Well-known symbols](https://tc39.github.io/ecma262/#sec-well-known-symbols) :

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.iterator`
- `Symbol.toPrimitive`
- ...y así.

Por ejemplo, `Symbol.toPrimitive` nos permite describir el objeto para su conversión primitiva. Más adelante veremos su uso.

Otros symbols también te serán más familiares cuando estudiemos las características correspondientes.

## Resumen

`Symbol` es un tipo de dato primitivo para identificadores únicos.

Symbols son creados al llamar `Symbol()` con una descripción opcional.

Symbols son siempre valores distintos, aunque tengan el mismo nombre. Si queremos que symbols con el mismo nombre, tengan el mismo valor,entonces debemos guardarlos en el registro global: `Symbol.for(key)` retornará un symbol (en caso de no existir, lo creará) con el `key` como su nombre. Múltiples llamadas de `Symbol.for` retornarán siempre el mismo symbol.

Symbols se utilizan principalmente en dos casos:

1. Propiedades "Ocultas" dentro de un objeto.
	Si queremos agregar una propiedad a un objeto que "pertenezca" a otro script u otra librería,podemos crear un symbol y usarlo como propiedad. Una propiedad de symbol no aparecerá en los ciclos `for..in`,por lo que no aparecerá listada. Tampoco podrá ser accedada directamente por otro script porque este no tendrá nuestro symbol y no podrá intervenir en sus acciones.

	Podemos "ocultar" ciertos valores dentro de un objeto que solo estarán disponibles dentro de ese script usando las propiedades de symbol.

2. Existen diversos symbols del sistema que utiliza Javascript,a los cuales podemos accesar por medio de `Symbol.*`. Podemos usarlos para alterar algunos comportamientos. Por ejemplo, mas adelante en el tutorial, usaremos `Symbol.iterator` para [iterables](info:iterable), `Symbol.toPrimitive` para configurar [object-to-primitive conversion](info:object-toprimitive).

Técnicamente, los symbols no están 100% ocultos. Existe un método incorporado [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols) que nos permite obtener todos los symbols. También existe un método llamado [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys) que retorna *todas* las propiedades de un objeto, incluyendo las que son de tipo symbol. Por lo tanto, no están realmente ocultos, aunque la mayoría de las librerías, los métodos incorporados y las construcciones de sintáxis se adhieren a un acuerdo común de lo que si lo están. Y el que explícitamente llama a los métodos antes mencionados probablemente entiende bien lo que está haciendo.