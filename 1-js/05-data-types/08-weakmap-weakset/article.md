# WeakMap y WeakSet

Como vimos en el artículo  <info:garbage-collection>, el motor de JavaScript mantiene un valor en la memoria mientras sea "accesible" y pueda ser potencialmente usado.

Por ejemplo:
```js
let john = { name: "John" };

// se puede acceder al objeto, john hace referencia a él

// sobrescribe la referencia
john = null;

*!*
// el objeto ya no es accesible y será eliminado de la memoria
*/!*
```

Por lo general, las propiedades de un objeto, elementos de un array u otra estructura de datos se consideran accesibles y se mantienen en la memoria mientras esa estructura permanezca en la memoria.

Por ejemplo, si colocamos un objeto en un array, mientras el array esté vivo el objeto también lo estará, incluso si no hay otras referencias a él.

Como aquí:

```js
let john = { name: "John" };

let array = [ john ];

john = null; // sobrescribe la referencia

*!*
// El objeto referenciado por John se almacena dentro del array, 
// por lo que no será borrado por el recolector de basura
// Lo podemos obtener como array[0]
*/!*
```

Del mismo modo, si usamos un objeto como la clave en un `Map` regular, entonces mientras exista el` Map`, ese objeto también existe. Este objeto ocupa memoria y no puede ser reclamado por el recolector de basura.

Por ejemplo:

```js
let john = { name: "John" };

let map = new Map();
map.set(john, "...");

john = null; // sobreescribe la referencia

*!*
// john se almacena dentro de map,
// podemos obtenerlo usando map.keys ()
*/!*
```

`WeakMap` es fundamentalmente diferente en este aspecto. No impide la recolección de basura de objetos usados como claves.

Veamos qué significa esto en los ejemplos.

## WeakMap

La primera diferencia con `Map` es que las claves `WeakMap` deben ser objetos, no valores primitivos:

```js run
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // funciona bien (la clave es un objeto)

*!*
// no puede usar un string como clave
weakMap.set("test", "Whoops"); // Error, porque "test" no es un objeto
*/!*
```

Ahora, si usamos un objeto como clave y no hay otras referencias a ese objeto, se eliminará de la memoria (y del map) automáticamente.

```js
let john = { name: "John" };

let weakMap = new WeakMap();
weakMap.set(john, "...");

john = null; // sobreescribe la referencia

// ¡John se eliminó de la memoria!
```

Compárelo con el ejemplo del `Map` regular anterior. Ahora, si `john` solo existe como la clave de` WeakMap`, se eliminará automáticamente del map (y de la memoria).

`WeakMap` no admite la iteración ni los métodos `keys()`, `values()`, `entries()`, así que no hay forma de obtener todas las claves o valores de él.

`WeakMap` tiene solo los siguientes métodos:

- `weakMap.get(clave)`
- `weakMap.set(clave, valor)`
- `weakMap.delete(clave)`
- `weakMap.has(clave)`

¿Por qué tanta limitación? Eso es por razones técnicas. Si un objeto ha perdido todas las demás referencias (como `john` en el código anterior), entonces se debe recolectar automáticamente como basura. Pero técnicamente no se especifica exactamente *cuándo se realiza la limpieza*.

El motor de JavaScript decide eso. Puede optar por realizar la limpieza de la memoria inmediatamente o esperar y realizar la limpieza más tarde cuando ocurran más eliminaciones. Por lo tanto, técnicamente no se conoce el recuento actual de elementos de un `WeakMap`. El motor puede haberlo limpiado o no, o lo hizo parcialmente. Por esa razón, los métodos que acceden a todas las claves/valores no son soportados.

Ahora, ¿dónde necesitamos esta estructura de datos?

## Caso de uso: datos adicionales

El área principal de aplicación de `WeakMap` es como *almacenamiento de datos adicional*.

Si estamos trabajando con un objeto que "pertenece" a otro código (tal vez incluso una biblioteca de terceros), y queremos almacenar algunos datos asociados a él que solo deberían existir mientras el objeto esté vivo, entonces `WeakMap` es exactamente lo que se necesita.

Ponemos los datos en un `WeakMap` utilizando el objeto como clave, y cuando el objeto sea recolectado por el recolector de basura, esos datos también desaparecerán automáticamente.

```js
weakMap.set(john, "secret documents");
// si John muere, secret documents será destruido automáticamente
```

Veamos un ejemplo.

Por ejemplo, tenemos un código que mantiene un recuento de visitas para los usuarios. La información se almacena en un map: un objeto de usuario es la clave y el recuento de visitas es el valor. Cuando un usuario se va (su objeto será recolectado por el recolector de basura), ya no queremos almacenar su recuento de visitas.

Aquí hay un ejemplo de una función de conteo con `Map`:

```js
// 📁 visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// incrementar el recuento de visitas
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Y aquí hay otra parte del código, tal vez otro archivo usándolo:

```js
// 📁 main.js
let john = { name: "John" };

countUser(john); // cuenta sus visitas

// luego John nos deja
john = null;
```

Ahora el objeto `john` debería ser recolectado como basura, pero permanece en la memoria, ya que es una propiedad en` visitCountMap`.

Necesitamos limpiar `visitCountMap` cuando eliminamos usuarios, de lo contrario, crecerá en la memoria indefinidamente. Tal limpieza puede convertirse en una tarea tediosa en arquitecturas complejas.

Lo podemos evitar cambiando a `WeakMap` en su lugar:

```js
// 📁 visitsCount.js
let visitsCountMap = new WeakMap(); // weakmap: user => visits count

// incrementar el recuento de visitas
function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}
```

Ahora no tenemos que limpiar `visitasCountMap`. Después de que el objeto `john` se vuelve inalcanzable por todos los medios excepto como una propiedad de` WeakMap`, se elimina de la memoria junto con la información asociada a esa clave de `WeakMap`.

## Caso de uso: almacenamiento en caché

Otro ejemplo común es el almacenamiento en caché: cuando se debe recordar el resultado de una función ("en caché"), para que las llamadas futuras en el mismo objeto lo reutilicen.

Podemos usar `Map` para almacenar resultados:

```js run
// 📁 cache.js
let cache = new Map();

// calcular y recordar el resultado
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* cálculo de resultado para */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

*!*
// Ahora usamos process() en otro archivo:
*/!*

// 📁 main.js
let obj = {/* digamos que tenemos un objeto */};

let result1 = process(obj); // calculado

// ...después, en otro lugar del código...
let result2 = process(obj); // resultado recordado tomado de la memoria caché

// ...después, cuando el objeto no se necesita más:
obj = null;

alert(cache.size); // 1 (¡Ouch! ¡El objeto todavía está en caché, tomando memoria!)
```

Para múltiples llamadas de `proceso (obj)` con el mismo objeto, solo calcula el resultado la primera vez, y luego lo toma de `caché`. La desventaja es que necesitamos limpiar el 'caché' cuando el objeto ya no es necesario.

Si reemplazamos `Map` por `WeakMap`, este problema desaparece: el resultado en caché se eliminará de la memoria automáticamente después de que el objeto se recolecte.

```js run
// 📁 cache.js
*!*
let cache = new WeakMap();
*/!*

// calcular y recordad el resultado
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calcular el resultado para */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {/* algún objeto */};

let result1 = process(obj);
let result2 = process(obj);

// ...después, cuando el objeto no se necesitará más:
obj = null;

// No se puede obtener cache.size, ya que es un WeakMap,
// pero es 0 o pronto será 0
// Cuando obj se recolecte como basura, los datos en caché también se eliminarán
```

## WeakSet

`WeakSet` se comporta de manera similar:

- Es análogo a `Set`, pero solo podemos agregar objetos a `WeakSet` (no primitivos).
- Existe un objeto en el conjunto mientras es accesible desde otro lugar.
- Al igual que `Set`, admite` add`, `has` y` delete`, pero no `size`,` keys()` ni iteraciones.

Al ser "débil", también sirve como almacenamiento adicional. Pero no para datos arbitrarios, sino para hechos "sí/no". Una membresía en `WeakSet` puede significar algo sobre el objeto.

Por ejemplo, podemos agregar usuarios a `WeakSet` para realizar un seguimiento de los que visitaron nuestro sitio:

```js run
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John nos visita
visitedSet.add(pete); // luego Pete
visitedSet.add(john); // John otra vez

// visitedSet tiene 2 usuarios ahora

// comprobar si John nos visitó?
alert(visitedSet.has(john)); // true

// comprobar si Mary nos visitó?
alert(visitedSet.has(mary)); // false

john = null;

// visitedSet se limpiará automáticamente
```

 La limitación más notable de `WeakMap` y` WeakSet` es la ausencia de iteraciones y la imposibilidad de obtener todo el contenido actual. Esto puede parecer inconveniente, pero no impide que `WeakMap / WeakSet` haga su trabajo principal: ser un almacenamiento "adicional" de datos para objetos que se almacenan/administran en otro lugar.

## Resumen

`WeakMap` es una colección similar a `Map` que permite solo objetos como propiedades y los elimina junto con el valor asociado una vez que se vuelven inaccesibles por otros medios.

`WeakSet` es una colección tipo `Set` que almacena solo objetos y los elimina una vez que se vuelven inaccesibles por otros medios.

Sus principales ventajas son que tienen referencias débiles a los objetos, así pueden ser fácilmente eliminados por el recolector de basura.

Esto viene al costo de no tener soporte para `clear`, `size`, `keys`, `values`...

`WeakMap` y` WeakSet` se utilizan como estructuras de dato "secundarias" además del almacenamiento de objetos "principal". Una vez que el objeto se elimina del almacenamiento principal, si solo se encuentra como la clave de `WeakMap` o en un` WeakSet`, se limpiará automáticamente.
