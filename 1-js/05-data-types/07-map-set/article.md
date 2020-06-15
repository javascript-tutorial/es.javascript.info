<<<<<<< HEAD
# Map y Set

Hasta este momento, hemos aprendido sobre las siguientes estructuras de datos:

- Objetos para almacenar colecciones de propiedades.
- Arrays para almacenar colecciones ordenadas.

Pero eso no es suficiente para la vida real. Por eso también existen Map y Set.

## Map

[Map](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Map) es una colección de elementos de datos con propiedad, al igual que un objeto, y valor. Pero la principal diferencia es que Map permite propiedades de cualquier tipo.

Los métodos y propiedades son:

- `new Map()` -- crea el mapa.
- `map.set(propiedad, valor)` -- almacena el valor para la propiedad.
- `map.get(propiedad)` -- devuelve el valor de la propiedad: será `undefined` si la `propiedad` no exite en Map.
- `map.has(propiedad)` -- devuelve`true` si la `propiedad` exite, y `false` si no existe.
- `map.delete(propiedad)` -- elimina los valores de la propiedad.
- `map.clear()` -- limpia el Map.
- `map.size` -- retorna el número del elemento actual en el recuento de elementos en el Map.

Por ejemplo:

```js run
let map = new Map();
map.set('1', 'str1');   // un string como propiedad
map.set(1, 'num1');     // un número como propiedad
map.set(true, 'bool1'); // un booleano como propiedad
// recuerda el objeto regular? convertiría las propiedades en un string
// Map mantiene el tipo de dato en las propiedades, por lo que estas dos son diferentes:
=======

# Map and Set

Now we've learned about the following complex data structures:

- Objects for storing keyed collections.
- Arrays for storing ordered collections.

But that's not enough for real life. That's why `Map` and `Set` also exist.

## Map

[Map](mdn:js/Map) is a collection of keyed data items, just like an `Object`. But the main difference is that `Map` allows keys of any type.

Methods and properties are:

- `new Map()` -- creates the map.
- `map.set(key, value)` -- stores the value by the key.
- `map.get(key)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` -- removes the value by the key.
- `map.clear()` -- removes everything from the map.
- `map.size` -- returns the current element count.

For instance:

```js run
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
alert( map.get(1)   ); // 'num1'
alert( map.get('1') ); // 'str1'

alert( map.size ); // 3
```

<<<<<<< HEAD
Como podemos ver, a diferencia de los objetos, las propiedades no se convierten en strings. Cualquier tipo de propiedad es posible en un Map.

```smart header="map[propiedad] no es la forma correcta para usar Map"
Aunque el map[propiedad] también funciona, por ejemplo, podemos establecer map[propiedad] = 2, esto es tratar a map como un objeto JavaScript simple, por lo que implica todas las limitaciones correspondientes (sin objetos como propiedad, etc.).

Por lo tanto, deberíamos usar los métodos de `Map`: set, get, etc.
```

**El mapa también puede usar objetos como propiedades.**

Por ejemplo:

```js run
//John es un objeto
let john = { name: "John" };

// para cada usuario, almacenemos el recuento de visitas
let visitsCountMap = new Map();

// John es la propiedad para el Map
=======
As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

```smart header="`map[key]` isn't the right way to use a `Map`"
Although `map[key]` also works, e.g. we can set `map[key] = 2`, this is treating `map` as a plain JavaScript object, so it implies all corresponding limitations (no object keys and so on).

So we should use `map` methods: `set`, `get` and so on.
```

**Map can also use objects as keys.**

For instance:

```js run
let john = { name: "John" };

// for every user, let's store their visits count
let visitsCountMap = new Map();

// john is the key for the map
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
visitsCountMap.set(john, 123);

alert( visitsCountMap.get(john) ); // 123
```
<<<<<<< HEAD
El uso de objetos como propiedades es una de las características de `Map` más notables e importantes. Para las propiedades de tipo string, `Object` puede estar bien, pero no para las propiedades de tipo objeto.

Intentémoslo:
=======

Using objects as keys is one of most notable and important `Map` features. For string keys, `Object` can be fine, but not for object keys.

Let's try:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let john = { name: "John" };

<<<<<<< HEAD
let visitsCountObj = {}; // intenta usar un objeto

visitsCountObj[john] = 123; // intenta usar el objeto john como propiedad

// Esto es lo que se escribió!
alert( visitsCountObj["[object Object]"] ); // 123
```

Como `visitsCountObj` es un objeto, convierte todas las propiedades, como John en string, por lo que tenemos la propiedad de tipo string `"[objeto Objeto]"`. Definitivamente no es lo que queremos.

```smart header="Cómo `Map` compara las propiedades"
`Map` utiliza el algoritmo [SameValueZero](https://tc39.es/ecma262/#sec-samevaluezero). Es aproximadamente lo mismo que la igualdad estricta `===`, pero la diferencia es que `NaN` se considera igual a `NaN`. Por lo tanto, `NaN` también se puede usar como propiedad.

Este algoritmo no se puede cambiar ni personalizar.
```

````smart header="Encadenamiento"
Cada llamada a `map.set` devuelve Map en sí, para que podamos "encadenar" las llamadas:

```js
map.set('1', 'str1')
   .set(1, 'num1')
   .set(true, 'bool1');
```
````

## Iteración sobre Map
Para recorrer un `Map`, hay 3 métodos:

- `map.keys()` – devuelve un iterable para las propiedades.
- `map.values()` – devuelve un iterable para los valores.
- `map.entries()` – devuelve un iterable para las entradas `[propiedad, valor]`, se usa por defecto en `for..of`.

Por ejemplo:

```js run
let recipeMap = new Map([
  ['pepino', 500],
  ['tomates', 350],
  ['cebollas',    50]
]);

// iterando sobre las propiedades (verduras)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // pepino, tomates, cebollas
}

// iterando sobre los valores (precios)

=======
let visitsCountObj = {}; // try to use an object

visitsCountObj[john] = 123; // try to use john object as the key

*!*
// That's what got written!
alert( visitsCountObj["[object Object]"] ); // 123
*/!*
```

As `visitsCountObj` is an object, it converts all keys, such as `john` to strings, so we've got the string key `"[object Object]"`. Definitely not what we want.

```smart header="How `Map` compares keys"
To test keys for equivalence, `Map` uses the algorithm [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero). It is roughly the same as strict equality `===`, but the difference is that `NaN` is considered equal to `NaN`. So `NaN` can be used as the key as well.

This algorithm can't be changed or customized.
```

````smart header="Chaining"
Every `map.set` call returns the map itself, so we can "chain" the calls:

```js
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```
````


## Iteration over Map

For looping over a `map`, there are 3 methods:

- `map.keys()` -- returns an iterable for keys,
- `map.values()` -- returns an iterable for values,
- `map.entries()` -- returns an iterable for entries `[key, value]`, it's used by default in `for..of`.

For instance:

```js run
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  alert(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
for (let amount of recipeMap.values()) {
  alert(amount); // 500, 350, 50
}

<<<<<<< HEAD
// iterando sobre las entradas [propiedad, valor]
for (let entry of recipeMap) { // lo mismo que recipeMap.entries()
  alert(entry); // pepino,500 (etc)
}
```
```smart header="Se utiliza el orden de inserción."
La iteración va en el mismo orden en que se insertaron los valores. `Map` conserva este orden, a diferencia de un `Objeto` normal.
```

Además de eso, `Map` tiene un método `forEach` incorporado, similar a `Array`:

```js
// recorre la función para cada par (propiedad, valor)
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // pepino: 500 etc
});
```

## Object.entries: Map desde Objeto

Cuando se crea un `Map`, podemos pasar un array (u otro iterable) con pares propiedad / valor para la inicialización, de esta manera:

```js run
// array de [propiedad, valor]
=======
// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  alert(entry); // cucumber,500 (and so on)
}
```

```smart header="The insertion order is used"
The iteration goes in the same order as the values were inserted. `Map` preserves this order, unlike a regular `Object`.
```

Besides that, `Map` has a built-in `forEach` method, similar to `Array`:

```js
// runs the function for each (key, value) pair
recipeMap.forEach( (value, key, map) => {
  alert(`${key}: ${value}`); // cucumber: 500 etc
});
```

## Object.entries: Map from Object

When a `Map` is created, we can pass an array (or another iterable) with key/value pairs for initialization, like this:

```js run
// array of [key, value] pairs
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
let map = new Map([
  ['1',  'str1'],
  [1,    'num1'],
  [true, 'bool1']
]);

alert( map.get('1') ); // str1
```
<<<<<<< HEAD
Aquí hay un método incorporado [Object.entries(obj)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/entries) que devuelve un array de pares propiedad / valor para un objeto exactamente en ese formato.

Entonces podemos inicializar un mapa desde un objeto como este:
=======

If we have a plain object, and we'd like to create a `Map` from it, then we can use built-in method [Object.entries(obj)](mdn:js/Object/entries) that returns an array of key/value pairs for an object exactly in that format.

So we can create a map from an object like this:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let obj = {
  name: "John",
  age: 30
};

<<<<<<< HEAD
let map = new Map(Object.entries(obj));
=======
*!*
let map = new Map(Object.entries(obj));
*/!*
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

alert( map.get('name') ); // John
```

<<<<<<< HEAD
Aquí, `Object.entries` devuelve el array de pares propiedad / valor: [["" name "," John "], [" age ", 30]]. Eso es lo que necesita `Map`.

## Object.fromEntries: Objeto desde Map
Acabamos de ver cómo crear un `Map` a partir de un objeto simple con `Object.entries (obj).`

Existe el método `Object.fromEntries` que hace lo contrario: dado un array de pares [propiedad, valor], crea un objeto a partir de ellos:
=======
Here, `Object.entries` returns the array of key/value pairs: `[ ["name","John"], ["age", 30] ]`. That's what `Map` needs.


## Object.fromEntries: Object from Map

We've just seen how to create `Map` from a plain object with `Object.entries(obj)`.

There's `Object.fromEntries` method that does the reverse: given an array of `[key, value]` pairs, it creates an object from them:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);

<<<<<<< HEAD
// ahora prices es un objeto = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```
Podemos usar `Object.fromEntries` para obtener un objeto plano de `Map`.

Ej. almacenamos los datos en un `Map`, pero necesitamos pasarlos a un código de terceros que espera un objeto simple.

Aquí vamos:
=======
// now prices = { banana: 1, orange: 2, meat: 4 }

alert(prices.orange); // 2
```

We can use `Object.fromEntries` to get a plain object from `Map`.

E.g. we store the data in a `Map`, but we need to pass it to a 3rd-party code that expects a plain object.

Here we go:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

<<<<<<< HEAD
let obj = Object.fromEntries(map.entries()); // hace un objeto simple

// Hecho!
=======
*!*
let obj = Object.fromEntries(map.entries()); // make a plain object (*)
*/!*

// done!
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
// obj = { banana: 1, orange: 2, meat: 4 }

alert(obj.orange); // 2
```

<<<<<<< HEAD
Una llamada a `map.entries()` devuelve un array de pares propiedad / valor, exactamente en el formato correcto para `Object.fromEntries.`

También podríamos acortar la línea 6 del ejemplo anterior:

```js
let obj = Object.fromEntries(map); // omitimos .entries()
```
Es lo mismo, porque `Object.fromEntries` espera un objeto iterable como argumento. No necesariamente un array. Y la iteración estándar para el `Map` devuelve los mismos pares propiedad / valor que `map.entries()`. Entonces obtenemos un objeto simple con las mismas propiedades / valores que `Map`.

## Set
`Set` es una colección de tipo especial: "conjunto de valores" (sin propiedades), donde cada valor puede aparecer solo una vez.

Sus principales métodos son:

- `new Set(iterable)` -- crea el set y, si se proporciona un objeto iterable (generalmente un array), copia los valores del mismo en el set.
- `set.add(valor)` -- agrega un valor, devuelve el set en sí.
- `set.delete(valor)` -- elimina el valor, devuelve `true` si `valor` existe al momento de la llamada, si no, devuelve `false`.
- `set.has(valor)` -- devuelve `true` si el valor existe en el set, si no, devuelve `false`.
- `set.clear()` -- elimina todo del set.
- `set.size` -- es el contador de los elementos.

La característica principal es que las llamadas repetidas de `set.add (valor)` con el mismo valor no hacen nada. Esa es la razón por la cual cada valor aparece en `Set` solo una vez.

Por ejemplo, tenemos visitantes que vienen y nos gustaría recordar a todos. Pero las visitas repetidas no deberían conducir a duplicados. Un visitante debe ser "contado" solo una vez.

`Set` es lo correcto para eso:
=======
A call to `map.entries()` returns an iterable of key/value pairs, exactly in the right format for `Object.fromEntries`.

We could also make line `(*)` shorter:
```js
let obj = Object.fromEntries(map); // omit .entries()
```

That's the same, because `Object.fromEntries` expects an iterable object as the argument. Not necessarily an array. And the standard iteration for `map` returns same key/value pairs as `map.entries()`. So we get a plain object with same key/values as the `map`.

## Set

A `Set` is a special type collection - "set of values" (without keys), where each value may occur only once.

Its main methods are:

- `new Set(iterable)` -- creates the set, and if an `iterable` object is provided (usually an array), copies values from it into the set.
- `set.add(value)` -- adds a value, returns the set itself.
- `set.delete(value)` -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` -- returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` -- removes everything from the set.
- `set.size` -- is the elements count.

The main feature is that repeated calls of `set.add(value)` with the same value don't do anything. That's the reason why each value appears in a `Set` only once.

For example, we have visitors coming, and we'd like to remember everyone. But repeated visits should not lead to duplicates. A visitor must be "counted" only once.

`Set` is just the right thing for that:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

<<<<<<< HEAD
// visitas, algunos usuarios lo hacen varias veces

=======
// visits, some users come multiple times
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

<<<<<<< HEAD
// set solo guarda valores únicos
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (luego Pete y Mary)
}
```
La alternativa a `Set` podría ser un array de usuarios y el código para verificar si hay duplicados en cada inserción usando [arr.find](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find). Pero el rendimiento sería mucho peor, porque este método recorre el array completo comprobando cada elemento. `Set` está mucho mejor optimizado internamente para verificaciones de unicidad.

## Iteración sobre Set
Podemos recorrer `Set` con `for..of` o usando `forEach`:
=======
// set keeps only unique values
alert( set.size ); // 3

for (let user of set) {
  alert(user.name); // John (then Pete and Mary)
}
```

The alternative to `Set` could be an array of users, and the code to check for duplicates on every insertion using [arr.find](mdn:js/Array/find). But the performance would be much worse, because this method walks through the whole array checking every element. `Set` is much better optimized internally for uniqueness checks.

## Iteration over Set

We can loop over a set either with `for..of` or using `forEach`:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6

```js run
let set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

<<<<<<< HEAD
// lo mismo que forEach:

=======
// the same with forEach:
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
set.forEach((value, valueAgain, set) => {
  alert(value);
});
```

<<<<<<< HEAD
Tenga en cuenta algo gracioso: la función callback pasada en forEach tiene 3 argumentos:  un valor, luego el mismo valor "valueAgain" y luego el objeto de destino que es set. El mismo valor aparece en los argumentos dos veces.

Eso es por compatibilidad con `Map` donde la función callback tiene tres argumentos. Parece un poco extraño, seguro. Pero puede ayudar a reemplazar `Map` con `Set` en ciertos casos con facilidad, y viceversa.

También soporta los mismos métodos que `Map` tiene para los iteradores:

- `set.keys()` – devuelve un iterable para las propiedades.
- `set.values()` – lo mismo que `set.keys()`, por su compatibilidad con `Map`.
- `set.entries()` – devuelve un iterable para las entradas `[propiedad, valor]`, por su compatibilidad con `Map`.

## Resumen
`Map`: es una colección de valores con propiedad.

Métodos y propiedades:
- `new Map()` -- crea el mapa.
- `map.set(propiedad, valor)` -- almacena el valor para la propiedad.
- `map.get(propiedad)` -- devuelve el valor de la propiedad: será `undefined` si la `propiedad` no exite en Map.
- `map.has(propiedad)` -- devuelve`true` si la `propiedad` exite, y `false` si no existe.
- `map.delete(propiedad)` -- elimina los valores de la propiedad.
- `map.clear()` -- limpia el Map.
- `map.size` -- retorna el número del elemento actual en el recuento de elementos en el Map.

La diferencia con `Objeto` regular:
- Cualquier propiedad, los objetos tambien pueden ser propiedads.
- Adicionalmente tiene métodos que nos convienen, como la propiedad `size`.

`Set`: es una colección de valores únicos.

Métodos y propiedades:
- `new Set(iterable)` -- crea el set y, si se proporciona un objeto iterable (generalmente un array), copia los valores del mismo en el set.
- `set.add(valor)` -- agrega un valor, devuelve el set en sí.
- `set.delete(valor)` -- elimina el valor, devuelve `true` si `valor` existe al momento de la llamada, si no, devuelve `false`.
- `set.has(valor)` -- devuelve `true` si el valor existe en el set, si no, devuelve `false`.
- `set.clear()` -- elimina todo del set.
- `set.size` -- es el contador de los elementos.

La iteración sobre `Map` y `Set` siempre está en el orden de inserción, por lo que no podemos decir que estas colecciones están desordenadas, pero no podemos reordenar elementos u obtener un elemento directamente por su número.

=======
Note the funny thing. The callback function passed in `forEach` has 3 arguments: a `value`, then *the same value* `valueAgain`, and then the target object. Indeed, the same value appears in the arguments twice.

That's for compatibility with `Map` where the callback passed `forEach` has three arguments. Looks a bit strange, for sure. But may help to replace `Map` with `Set` in certain cases with ease, and vice versa.

The same methods `Map` has for iterators are also supported:

- `set.keys()` -- returns an iterable object for values,
- `set.values()` -- same as `set.keys()`, for compatibility with `Map`,
- `set.entries()` -- returns an iterable object for entries `[value, value]`, exists for compatibility with `Map`.

## Summary

`Map` -- is a collection of keyed values.

Methods and properties:

- `new Map([iterable])` -- creates the map, with optional `iterable` (e.g. array) of `[key,value]` pairs for initialization.
- `map.set(key, value)` -- stores the value by the key.
- `map.get(key)` -- returns the value by the key, `undefined` if `key` doesn't exist in map.
- `map.has(key)` -- returns `true` if the `key` exists, `false` otherwise.
- `map.delete(key)` -- removes the value by the key.
- `map.clear()` -- removes everything from the map.
- `map.size` -- returns the current element count.

The differences from a regular `Object`:

- Any keys, objects can be keys.
- Additional convenient methods, the `size` property.

`Set` -- is a collection of unique values.

Methods and properties:

- `new Set([iterable])` -- creates the set, with optional `iterable` (e.g. array) of values for initialization.
- `set.add(value)` -- adds a value (does nothing if `value` exists), returns the set itself.
- `set.delete(value)` -- removes the value, returns `true` if `value` existed at the moment of the call, otherwise `false`.
- `set.has(value)` -- returns `true` if the value exists in the set, otherwise `false`.
- `set.clear()` -- removes everything from the set.
- `set.size` -- is the elements count.

Iteration over `Map` and `Set` is always in the insertion order, so we can't say that these collections are unordered, but we can't reorder elements or directly get an element by its number.
>>>>>>> b52aa942a8e9b75ba8a65124c22593171e273bb6
