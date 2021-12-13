
# Tipo Symbol

Por especificación, las claves (Keys) de un objeto deben ser solamente del tipo String o Symbol.  Solamente esos dos: String o Symbol. 

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

Se garantiza que los símbolos son únicos. Aunque declaremos varios Symbols con la misma descripción, éstos tendrán valores distintos. La descripción es solamente una etiqueta que no afecta nada más.

Por ejemplo, aquí hay dos Symbols con la misma descripción -- pero no son iguales:

```js run
let id1 = Symbol("id");
let id2 = Symbol("id");

*!*
alert(id1 == id2); // false
*/!*
```

Si estás familiarizado con Ruby u otro lenguaje que también tiene symbols, por favor no te confundas. Los Symbols de Javascript son diferentes.

````warn header="Symbols no se autoconvierten a String"
La mayoría de los valores en JavaScript soportan la conversión implícita a string. Por ejemplo, podemos hacer un ´alert´ con casi cualquier valor y funcionará. Los Symbols son distintos, éstos no se auto-convierten.

Por ejemplo, este `alert` mostrará un error:

```js run
let id = Symbol("id");
*!*
alert(id); // TypeError: No puedes convertir un valor Symbol en string
*/!*
```

Esa es una "protección del lenguaje" para evitar errores ya que los String y los Symbol son diferentes y no deberían convertirse ocasionalmente uno en otro.

Si realmente queremos mostrar un Symbol, necesitamos llamar el método `.toString()` de la siguiente manera:
```js run
let id = Symbol("id");
*!*
alert(id.toString()); // Symbol(id), ahora sí funciona
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

## Claves "Ocultas"

Los Symbols nos permiten crear claves "ocultas" en un objeto, a las cuales ninguna otra parte del código puede accesar ni sobrescribir.

Por ejemplo, si queremos guardar un "identificador" para el objeto `user`, podemos asignar un symbol como clave del objeto:

```js run
let user = { // pertenece a otro código
  name: "John"
};

let id = Symbol("id");

user[id] = 1;

alert( user[id] ); // podemos accesar a la información utilizando  el symbol como nombre de clave 
```

¿Cuál es la ventaja de usar `Symbol("id")` y no un string `"id"`?

Vamos a profundizar en el ejemplo para que sea más claro.

Imagina que otro script quiere tener la clave "id" dentro de `user` para sus propios fines. Puede ser otra librería de JavaScript, por lo cual ninguno de los scripts saben de su coexistencia.

Y entonces ese script puede crear su propio `Symbol("id")`, como este:

```js
// ...
let id = Symbol("id");

user[id] = "Su id";
```

No habrá conflicto porque los Symbols siempre son diferentes, incluso si tienen el mismo nombre.

Ahora ten en cuenta que si utilizamos un string `"id"` en lugar de un Symbol para el mismo propósito, entonces SÍ *habría* un conflicto:

```js
let user = { name: "John" };

// Nuestro script usa la clave "id" 
user.id = "Nuestro valor id";

// ...Otro script también quiere usar "id"  ...

user.id = "Su valor de id"
// Boom! sobreescrito para otro script!
```

### Symbols en objetos literales

Si queremos usar un Symbol en un objeto literal, debemos usar llaves.

Como se muestra a continuación:

```js
let id = Symbol("id");

let user = {
  name: "John",
*!*
  [id]: 123 // no "id": 123
*/!*
};
```
Se hace así porque necesitamos que el valor de la variable `id` sea la clave, no el string "id".

### Los Symbols son omitidos en for..in

Las claves de Symbol no participan dentro de los ciclos `for..in`.

Por ejemplo:

```js run
let id = Symbol("id");
let user = {
  name: "John",
  age: 30,
  [id]: 123
};

*!*
for (let key in user) alert(key); // nombre, edad (no aparecen symbols)
*/!*

// el acceso directo a la clave de symbol funciona
alert( "Direct: " + user[id] );
```

<<<<<<< HEAD
Esto forma parte del concepto general de "ocultamiento". Si otro script o si otra librería itera el objeto este no accesará a la  clave de Symbol.
=======
[Object.keys(user)](mdn:js/Object/keys) also ignores them. That's a part of the general "hiding symbolic properties" principle. If another script or a library loops over our object, it won't unexpectedly access a symbolic property.
>>>>>>> c5358c59494b53efb832c81a5338e0a23b22c269

En contraste, [Object.assign](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/assign) copia tanto las claves string como symbol:

```js run
let id = Symbol("id");
let user = {
  [id]: 123
};

let clone = Object.assign({}, user);

alert( clone[id] ); // 123
```

No hay paradoja aquí, es así por diseño. La idea es que cuando clonamos un objeto o cuando fusionamos objetos, generalmente queremos que se copien *todas* las claves (incluidos los Symbol como `id`).

## Symbols Globales

Como hemos visto, normalmente todos los Symbols son diferentes aunque tengan el mismo nombre. Pero algunas veces necesitamos que los symbol con el mismo nombre sean las mismas entidades.

Por ejemplo, distintas partes de nuestra aplicación quieren accesar a symbol `"id"` queriendo obtener el mismo valor de la clave.

Para lograr esto, existe un *global symbol registry*. Ahí podemos crear symbols y acceder después a ellos, lo cual nos garantiza que cada vez que se acceda a la clave con el mismo nombre, esta te devuelva exactamente el mismo symbol.

Para crear u accesar a un symbol en el registro global, usa `Symbol.for(key)`.

Esta llamada revisa el registro global, y si existe un symbol descrito como `key`, lo retornará, de lo contrario creará un nuevo symbol `Symbol(key)` y lo almacenará en el registro por su `key`.

Por ejemplo:

```js run
// leer desde el registro global
let id = Symbol.for("id"); // si el símbolo no existe, se crea

// léelo nuevamente (tal vez de otra parte del código)
let idAgain = Symbol.for("id");

// el mismo symbol
alert( id === idAgain ); // true
```

Los Symbols dentro de este registro son llamados *global symbols* y están disponibles y al alcance de todo el código en la aplicación.

```smart header="Eso suena a Ruby"
En algunos lenguajes de programación como Ruby, hay un solo Symbol por cada nombre.

En Javascript, como podemos ver, eso es verdad para los global symbols.
```

### Symbol.keyFor

Para los global symbols, no solo `Symbol.for(key)` devuelve un symbol por su nombre, sino que existe una llamada inversa: `Symbol.keyFor(sym)` que hace lo contrario: devuelve el nombre de un global symbol.

Por ejemplo:

```js run
// tomar symbol por nombre
let sym = Symbol.for("nombre");
let sym2 = Symbol.for("id");

// tomar name por symbol
alert( Symbol.keyFor(sym) ); // nombre
alert( Symbol.keyFor(sym2) ); // id
```

El `Symbol.keyFor` utiliza internamente el registro "global symbol registry" para buscar la clave del symbol, por lo tanto, no funciona para los symbol que no están dentro del registro. Si el symbol no es global, no será capaz de encontrarlo y por lo tanto devolverá `undefined`.

Dicho esto, todo symbol tiene `description` de clave.

Por ejemplo:

```js run
let globalSymbol = Symbol.for("nombre");
let localSymbol = Symbol("nombre");

alert( Symbol.keyFor(globalSymbol) ); // nombre, global symbol
alert( Symbol.keyFor(localSymbol) ); // undefined, no global

alert( localSymbol.description ); // nombre
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

Symbols son siempre valores distintos aunque tengan el mismo nombre. Si queremos que symbols con el mismo nombre tengan el mismo valor, entonces debemos guardarlos en el registro global: `Symbol.for(key)` retornará un symbol (en caso de no existir, lo creará) con el `key` como su nombre. Todas las llamadas de `Symbol.for` con ese nombre retornarán siempre el mismo symbol.

Symbols se utilizan principalmente en dos casos:

1. Claves(keys) "Ocultas" dentro de un objeto.
	Si queremos agregar una clave a un objeto que "pertenezca" a otro script u otra librería, podemos crear un symbol y usarlo como clave. Una clave de symbol no aparecerá en los ciclos `for..in`, por lo que no aparecerá listada. Tampoco podrá ser accesada directamente por otro script porque este no tendrá nuestro symbol y no podrá intervenir en sus acciones.

	Podemos "ocultar" ciertos valores dentro de un objeto que solo estarán disponibles dentro de ese script usando las claves de symbol.

2. Existen diversos symbols del sistema que utiliza Javascript, a los cuales podemos accesar por medio de `Symbol.*`. Podemos usarlos para alterar algunos comportamientos. Por ejemplo, más adelante en el tutorial, usaremos `Symbol.iterator` para [iterables](info:iterable), `Symbol.toPrimitive` para configurar [object-to-primitive conversion](info:object-toprimitive).

Técnicamente, los symbols no están 100% ocultos. Existe un método incorporado [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/getOwnPropertySymbols) que nos permite obtener todos los symbols. También existe un método llamado [Reflect.ownKeys(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) que devuelve *todas* las claves de un objeto, incluyendo las que son de tipo symbol. Pero la mayoría de las librerías, los métodos incorporados y las construcciones de sintaxis no usan estos métodos.
