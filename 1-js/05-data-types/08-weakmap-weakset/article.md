<<<<<<< HEAD
# WeakMap y WeakSet

Como sabemos por el capítulo  <info:garbage-collection>, el motor de JavaScript almacena un valor en la memoria mientras es accesible(y puede ser potencialmente usado).

Por ejemplo:
```js
let john = { name: "John" };

// se puede acceder al objeto, john es su referencia

// sobrescribe la referencia
john = null;

*!*
// el objeto será eliminado de la memoria
*/!*
```

Por lo general, las propiedades de un objeto o elementos de un array u otra estructura de datos se consideran accesibles y se mantienen en la memoria mientras esa estructura de datos permanezca en la memoria.

Por ejemplo, si colocamos un objeto en un array, mientras el array esté vivo, el objeto también estará vivo, incluso si no hay otras referencias a él.

Como esto:
=======
# WeakMap and WeakSet

As we know from the chapter <info:garbage-collection>, JavaScript engine stores a value in memory while it is reachable (and can potentially be used).

For instance:
```js
let john = { name: "John" };

// the object can be accessed, john is the reference to it

// overwrite the reference
john = null;

*!*
// the object will be removed from memory
*/!*
```

Usually, properties of an object or elements of an array or another data structure are considered reachable and kept in memory while that data structure is in memory.

For instance, if we put an object into an array, then while the array is alive, the object will be alive as well, even if there are no other references to it.

Like this:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
let john = { name: "John" };

let array = [ john ];

<<<<<<< HEAD
john = null; // sobrescribe la referencia

*!*
// John se almacena dentro del array, por lo que no será recolectado por el recolector de basura
// Lo podemos obtener como array[0]
*/!*
```

Similar a eso, si usamos un objeto como la propiedad en un `Map` regular, entonces mientras exista el` Map`, ese objeto también existe. Este objeto ocupa memoria y no puede ser reclamado por el recolector de basura.

Por ejemplo
=======
john = null; // overwrite the reference

*!*
// john is stored inside the array, so it won't be garbage-collected
// we can get it as array[0]
*/!*
```

Similar to that, if we use an object as the key in a regular `Map`, then while the `Map` exists, that object exists as well. It occupies memory and may not be garbage collected.

For instance:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

<<<<<<< HEAD
john = null; // sobreescribe la referencia

*!*
// john se almacena dentro de map,
// podemos obtenerlo usando map.keys ()
*/!*
```

`WeakMap` es fundamentalmente diferente en este aspecto. No impide la recolección de basura de propiedades de objetos.

Veamos qué significa esto en los ejemplos.

## WeakMap

La primera diferencia con `Map` es que las propiedades `WeakMap` deben ser objetos, no valores primitivos:
=======
john = null; // overwrite the reference

*!*
// john is stored inside the map,
// we can get it by using map.keys()
*/!*
```

`WeakMap` is fundamentally different in this aspect. It doesn't prevent garbage-collection of key objects.

Let's see what it means on examples.

## WeakMap

The first difference from `Map` is that `WeakMap` keys must be objects, not primitive values:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
let weakMap = new WeakMap();

let obj = {};

<<<<<<< HEAD
weakMap.set(obj, "ok"); // funciona bien (propiedad de objeto)

*!*
// no puede usar un string como propiedad
weakMap.set("test", "Whoops"); // Error, porque "test" no es un objeto
*/!*
```

Ahora, si usamos un objeto como propiedad y no hay otras referencias a ese objeto, se eliminará de la memoria (y del map) automáticamente.
=======
weakMap.set(obj, "ok"); // works fine (object key)

*!*
// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
*/!*
```

Now, if we use an object as the key in it, and there are no other references to that object -- it will be removed from memory (and from the map) automatically.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

<<<<<<< HEAD
john = null; // sobreescribe la referencia

// ¡John se eliminó de la memoria!
```

Compárelo con el ejemplo del `Map` regular anterior. Ahora, si `john` solo existe como la propiedad de` WeakMap`, se eliminará automáticamente del map (y de la memoria).

`WeakMap` no admite la iteración ni los métodos `keys()`, `values()`, `entries()`, así que no hay forma de obtener todas las propiedades o valores de él.

`WeakMap` tiene solo los siguientes métodos:

- `weakMap.get(propiedad)`
- `weakMap.set(propiedad, valor)`
- `weakMap.delete(propiedad)`
- `weakMap.has(propiedad)`

¿Por qué tanta limitación? Eso es por razones técnicas. Si un objeto ha perdido todas las demás referencias (como `john` en el código anterior), entonces se debe recolectar automáticamente como basura. Pero técnicamente no se especifica exactamente *cuándo se realiza la limpieza*.

El motor de JavaScript decide eso. Puede optar por realizar la limpieza de la memoria inmediatamente o esperar y realizar la limpieza más tarde cuando ocurran más eliminaciones. Por lo tanto, técnicamente no se conoce el recuento actual de elementos de un `WeakMap`. El motor puede haberlo limpiado o no, o lo hizo parcialmente. Por esa razón, los métodos que acceden a todas las propiedades / valores no son compatibles.

Ahora, ¿dónde necesitamos esta estructura de datos?

## Caso de uso: datos adicionales

El área principal de aplicación de `WeakMap` es en un *almacenamiento de datos adicional*.

Si estamos trabajando con un objeto que "pertenece" a otro código, tal vez incluso una biblioteca de terceros, y quisiera almacenar algunos datos asociados con él, eso solo debería existir mientras el objeto esté vivo, entonces `WeakMap` es exactamente lo que se necesita.

Ponemos los datos en un `WeakMap`, utilizando el objeto como propiedad, y cuando el objeto sea recolectado por el recolector de basura, esos datos también desaparecerán automáticamente.

```js
weakMap.set(john, "secret documents");
// si John muere, secret documents será destruido automáticamente
```

Veamos un ejemplo.

Por ejemplo, tenemos un código que mantiene un recuento de visitas para los usuarios. La información se almacena en un mapa: un objeto de usuario es la propiedad y el recuento de visitas es el valor. Cuando un usuario se va (su objeto será recolectado por el recolector de basura), ya no queremos almacenar su recuento de visitas.

Aquí hay un ejemplo de una función de conteo con `Map`:
=======
john = null; // overwrite the reference

// john is removed from memory!
```

Compare it with the regular `Map` example above. Now if `john` only exists as the key of `WeakMap` -- it will be automatically deleted from the map (and memory).

`WeakMap` does not support iteration and methods `keys()`, `values()`, `entries()`, so there's no way to get all keys or values from it.

`WeakMap` has only the following methods:

- `weakMap.get(key)`
- `weakMap.set(key, value)`
- `weakMap.delete(key)`
- `weakMap.has(key)`

Why such a limitation? That's for technical reasons. If an object has lost all other references (like `john` in the code above), then it is to be garbage-collected automatically. But technically it's not exactly specified *when the cleanup happens*.

The JavaScript engine decides that. It may choose to perform the memory cleanup immediately or to wait and do the cleaning later when more deletions happen. So, technically the current element count of a `WeakMap` is not known. The engine may have cleaned it up or not, or did it partially. For that reason, methods that access all keys/values are not supported.

Now where do we need such data structure?

## Use case: additional data

The main area of application for `WeakMap` is an *additional data storage*.

If we're working with an object that "belongs" to another code, maybe even a third-party library, and would like to store some data associated with it, that should only exist while the object is alive - then `WeakMap` is exactly what's needed.

We put the data to a `WeakMap`, using the object as the key, and when the object is garbage collected, that data will automatically disappear as well.

```js
weakMap.set(john, "secret documents");
// if john dies, secret documents will be destroyed automatically
```

Let's look at an example.

For instance, we have code that keeps a visit count for users. The information is stored in a map: a user object is the key and the visit count is the value. When a user leaves (its object gets garbage collected), we don't want to store their visit count anymore.

Here's an example of a counting function with `Map`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

<<<<<<< HEAD
// incrementar el recuento de visitas
=======
// increase the visits count
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

<<<<<<< HEAD
Y aquí hay otra parte del código, tal vez otro archivo usándolo:
=======
And here's another part of the code, maybe another file using it:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
// 📁 main.js
let john = { name: "John" };

<<<<<<< HEAD
countUser(john); // cuenta sus visitas

// luego John nos deja
john = null;
```

Ahora el objeto `john` debería ser recolectado como basura, pero permanece en la memoria, ya que es una propiedad en` visitCountMap`.

Necesitamos limpiar `visitCountMap` cuando eliminamos usuarios, de lo contrario, crecerá en la memoria indefinidamente. Tal limpieza puede convertirse en una tarea tediosa en arquitecturas complejas.

Lo podemos evitar cambiando a `WeakMap` en su lugar:
=======
countUser(john); // count his visits

// later john leaves us
john = null;
```

Now `john` object should be garbage collected, but remains in memory, as it's a key in `visitsCountMap`.

We need to clean `visitsCountMap` when we remove users, otherwise it will grow in memory indefinitely. Such cleaning can become a tedious task in complex architectures.

We can avoid it by switching to `WeakMap` instead:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

<<<<<<< HEAD
// incrementar el recuento de visitas
=======
// increase the visits count
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

<<<<<<< HEAD
Ahora no tenemos que limpiar `visitasCountMap`. Después de que el objeto `john` se vuelve inalcanzable por todos los medios excepto como una propiedad de` WeakMap`, se elimina de la memoria, junto con la información de esa propiedad de `WeakMap`.

## Caso de uso: almacenamiento en caché

Otro ejemplo común es el almacenamiento en caché: cuando se debe recordar el resultado de una función ("en caché"), para que las llamadas futuras en el mismo objeto lo reutilicen.

Podemos usar `Map` para almacenar resultados, así:
=======
Now we don't have to clean `visitsCountMap`. After `john` object becomes unreachable by all means except as a key of `WeakMap`, it gets removed from memory, along with the information by that key from `WeakMap`.

## Use case: caching

Another common example is caching: when a function result should be remembered ("cached"), so that future calls on the same object reuse it.

We can use `Map` to store results, like this:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
// 📁 cache.js
let cache = new Map();

<<<<<<< HEAD
// calcular y recordar el resultado
=======
// calculate and remember the result
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculations of the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
<<<<<<< HEAD
// Ahora nosotros usamos process() en otro archivo:
=======
// Now we use process() in another file:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
*/!*

// 📁 main.js
let obj = {/* let's say we have an object */};

let result1 = process(obj); // calculated

<<<<<<< HEAD
// ...después, en otro lugar del código...
let result2 = process(obj); // resultado recordado tomado de la memoria caché

// ...después, cuando el objeto no se necesitará nada más:
obj = null;

alert(cache.size); // 1 (Ouch! ¡El objeto todavía está en caché, tomando memoria!)
```

Para múltiples llamadas de `proceso (obj)` con el mismo objeto, solo calcula el resultado la primera vez, y luego lo toma de `caché`. La desventaja es que necesitamos limpiar el 'caché' cuando el objeto ya no es necesario.

Si reemplazamos `Map` por `WeakMap`, este problema desaparece: el resultado en caché se eliminará de la memoria automáticamente después de que el objeto se recolecte.
=======
// ...later, from another place of the code...
let result2 = process(obj); // remembered result taken from cache

// ...later, when the object is not needed any more:
obj = null;

alert(cache.size); // 1 (Ouch! The object is still in cache, taking memory!)
```

For multiple calls of `process(obj)` with the same object, it only calculates the result the first time, and then just takes it from `cache`. The downside is that we need to clean `cache` when the object is not needed any more.

If we replace `Map` with `WeakMap`, then this problem disappears: the cached result will be removed from memory automatically after the object gets garbage collected.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

<<<<<<< HEAD
// calcular y recordad el resultado
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calcular el resultado para */ obj;
=======
// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

<<<<<<< HEAD
// ...después, cuando el objeto no se necesitará más:
obj = null;

// No se puede obtener cache.size, ya que es un WeakMap,
// pero es 0 o pronto será 0
// Cuando obj obtiene basura recolectada, los datos en caché también se eliminarán
=======
// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```

## WeakSet

<<<<<<< HEAD
`WeakSet` se comporta de manera similar:

- Es análogo a `Set`, pero solo podemos agregar objetos a `WeakSet` (no primitivos).
- Existe un objeto en el conjunto mientras es accesible desde otro lugar.
- Al igual que `Set`, admite` add`, `has` y` delete`, pero no `size`,` keys()` ni iteraciones.

Al ser "débil", también sirve como almacenamiento adicional. Pero no para datos arbitrarios, sino para hechos "sí / no". Una membresía en `WeakSet` puede significar algo sobre el objeto.

Por ejemplo, podemos agregar usuarios a `WeakSet` para realizar un seguimiento de los que visitaron nuestro sitio:
=======
`WeakSet` behaves similarly:

- It is analogous to `Set`, but we may only add objects to `WeakSet` (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like `Set`, it supports `add`, `has` and `delete`, but not `size`, `keys()` and no iterations.

Being "weak", it also serves as an additional storage. But not for an arbitrary data, but rather for "yes/no" facts. A membership in `WeakSet` may mean something about the object.

For instance, we can add users to `WeakSet` to keep track of those who visited our site:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

<<<<<<< HEAD
visitedSet.add(john); // John nos visita
visitedSet.add(pete); // luego Pete
visitedSet.add(john); // John otra vez

// visitedSet tiene 2 usuarios ahora

// comprobar si John nos visitó?
alert(visitedSet.has(john)); // true

// comprobar si Mary nos visitó?
=======
visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again

// visitedSet has 2 users now

// check if John visited?
alert(visitedSet.has(john)); // true

// check if Mary visited?
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
alert(visitedSet.has(mary)); // false

john = null;

<<<<<<< HEAD
// visitedSet se limpiará automáticamente
```

 La limitación más notable de `WeakMap` y` WeakSet` es la ausencia de iteraciones y la imposibilidad de obtener todo el contenido actual. Esto puede parecer inconveniente, pero no impide que `WeakMap / WeakSet` haga su trabajo principal: ser un almacenamiento "adicional" de datos para objetos que se almacenan / administran en otro lugar.

## Resumen

`WeakMap` es una colección similar a `Map` que permite solo objetos como propiedades y los elimina junto con el valor asociado una vez que se vuelven inaccesibles por otros medios.

`WeakSet` es una colección tipo `Set` que almacena solo objetos y los elimina una vez que se vuelven inaccesibles por otros medios.

Ambos no admiten métodos y propiedades que se refieren a todas las propiedades o su recuento. Solo se permiten operaciones individuales.

`WeakMap` y` WeakSet` se utilizan como estructuras de dato "secundarias" además del almacenamiento de objetos "principal". Una vez que el objeto se elimina del almacenamiento principal, si solo se encuentra como la propiedad de `WeakMap` o en un` WeakSet`, se limpiará automáticamente.
=======
// visitedSet will be cleaned automatically
```

The most notable limitation of `WeakMap` and `WeakSet` is the absence of iterations, and inability to get all current content. That may appear inconvenient, but does not prevent `WeakMap/WeakSet` from doing their main job -- be an "additional" storage of data for objects which are stored/managed at another place.

## Summary

`WeakMap` is `Map`-like collection that allows only objects as keys and removes them together with associated value once they become inaccessible by other means.

`WeakSet` is `Set`-like collection that stores only objects and removes them once they become inaccessible by other means.

Both of them do not support methods and properties that refer to all keys or their count. Only individual operations are allowed.

`WeakMap` and `WeakSet` are used as "secondary" data structures in addition to the "main" object storage. Once the object is removed from the main storage, if it is only found as the key of `WeakMap` or in a `WeakSet`, it will be cleaned up automatically.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
