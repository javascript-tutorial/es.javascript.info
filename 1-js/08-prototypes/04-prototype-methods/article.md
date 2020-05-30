
# Métodos prototipo, objetos sin __proto__

En el primer capítulo de esta sección, mencionamos que existen métodos modernos para configurar un prototipo.

`__proto__` se considera desactualizado y algo obsoleto (en la parte propia del navegador dentro del estándar JavaScript).

Los métodos modernos son:

- [Object.create(proto[, descriptors])] (mdn:js/Object/create): crea un objeto vacío con el "proto" dado como `[[Prototype]]` y descriptores de propiedad opcionales.
- [Object.getPrototypeOf(obj)](mdn:js/Object/getPrototypeOf) - devuelve el `[[Prototype]]` de `obj`.
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object/setPrototypeOf) - establece el `[[Prototype]]` de `obj` en `proto`.

Estos deben usarse en lugar de `__proto__`.

Por ejemplo:

```js run
let animal = {
  eats: true
};

// crear un nuevo objeto con animal como prototipo
*!*
let rabbit = Object.create(animal);
*/!*

alert(rabbit.eats); // true

*!*
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // cambia el prototipo de rabbit a {}
*/!*
```

`Object.create` tiene un segundo argumento opcional: descriptores de propiedad. Podemos proporcionar propiedades adicionales al nuevo objeto allí, así:

```js run
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

alert(rabbit.jumps); // true
```

Los descriptores están en el mismo formato que se describe en el capítulo <info:property-descriptors>.

Podemos usar `Object.create` para realizar una clonación de objetos más poderosa que copiar propiedades en el ciclo `for..in`:

```js
// // clon superficial de obj totalmente idéntico
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

Esta llamada hace una copia verdaderamente exacta de `obj`, que incluye todas las propiedades: enumerables y no enumerables, propiedades de datos y setters/getters, todo, y con el `[[Prototype]]` correcto.

## Breve historia

Si contamos todas las formas de administrar `[[Prototype]]`, ¡hay muchas! ¡Muchas maneras de hacer lo mismo!

¿Por qué?

Eso es por razones históricas.

- La propiedad "prototipo" de una función de constructor ha funcionado desde tiempos muy antiguos.
- Más tarde, en el año 2012, apareció `Object.create` en el estándar. Le dio la capacidad de crear objetos con un prototipo dado, pero no proporcionó la capacidad de obtenerlo/configurarlo. Entonces, los navegadores implementaron el acceso no estándar `__proto__` que permitió al usuario obtener/configurar un prototipo en cualquier momento.
- Más tarde, en el año 2015, `Object.setPrototypeOf` y `Object.getPrototypeOf` se agregaron al estándar, para realizar la misma funcionalidad que `__proto__`. Como `__proto__` se implementó de facto en todas partes, fue desaprobado y llegó al Anexo B de la norma, es decir: opcional para entornos que no son del navegador.

A partir de ahora tenemos todas estas formas a nuestra disposición.

¿Por qué se reemplazó `__proto__` por las funciones `getPrototypeOf/setPrototypeOf`? Esa es una pregunta interesante, que requiere que comprendamos por qué `__proto__` es malo. Sigue leyendo para obtener la respuesta.

```warn header="No cambie `[[Prototype]]` en objetos existentes si la velocidad es importante"
Técnicamente, podemos obtener/configurar `[[Prototype]]` en cualquier momento. Pero generalmente solo lo configuramos una vez en el momento de creación del objeto y ya no lo modificamos: `rabbit` hereda de `animal`, y eso no va a cambiar.

Y los motores de JavaScript están altamente optimizados para esto. Cambiar un prototipo "sobre la marcha" con `Object.setPrototypeOf` u `obj.__ proto __=` es una operación muy lenta ya que rompe las optimizaciones internas para las operaciones de acceso a la propiedad del objeto. Por lo tanto, evítelo a menos que sepa lo que está haciendo, o no le importe la velocidad de JavaScript .
```

## Objetos "muy simples" [#very-plain]

Como sabemos, los objetos se pueden usar como arreglos asociativas para almacenar pares clave/valor.

...Pero si tratamos de almacenar claves *proporcionadas por el usuario* en él (por ejemplo, un diccionario ingresado por el usuario), podemos ver una falla interesante: todas las claves funcionan bien excepto `"__proto __ "`.

Mira el ejemplo:

```js run
let obj = {};

let key = prompt("Cual es la clave?", "__proto__");
obj[key] = "algún valor";

alert(obj[key]); // [object Object], no es "algún valor"!
```

Aquí, si el usuario escribe en `__proto__`, ¡la asignación se ignora!

Eso no debería sorprendernos. La propiedad `__proto__` es especial: debe ser un objeto o `null`. Una cadena no puede convertirse en un prototipo.

Pero no *intentamos* implementar tal comportamiento, ¿verdad? Queremos almacenar pares clave/valor, y la clave llamada `"__proto__"` no se guardó correctamente. ¡Entonces eso es un error!

Aquí las consecuencias no son terribles. Pero en otros casos podemos estar asignando valores de objeto, y luego el prototipo puede ser cambiado. Como resultado, la ejecución irá mal de maneras totalmente inesperadas.

Lo que es peor: generalmente los desarrolladores no piensan en tal posibilidad en absoluto. Eso hace que tales errores sean difíciles de notar e incluso los convierta en vulnerabilidades, especialmente cuando se usa JavaScript en el lado del servidor.

También pueden ocurrir cosas inesperadas al asignar a `toString`, que es una función por defecto, y a otros métodos integrados.

¿Cómo podemos evitar este problema?

Primero, podemos elegir usar `Map` para almacenamiento en lugar de objetos simples, luego todo queda bien.

Pero 'Objeto' también puede servirnos bien aquí, porque los creadores del lenguaje pensaron en ese problema hace mucho tiempo.

`__proto__` no es una propiedad de un objeto, sino una propiedad de acceso de `Object.prototype`:

![](object-prototype-2.svg)

Entonces, si se lee o establece `obj.__ proto__`, el getter/setter correspondiente se llama desde su prototipo y obtiene/establece `[[Prototype]]`.

Como se dijo al comienzo de esta sección del tutorial: `__proto__` es una forma de acceder a `[[Prototype]]`, no es `[[Prototype]]` en sí.

Ahora, si pretendemos usar un objeto como una arreglo asociativa y no tener tales problemas, podemos hacerlo con un pequeño truco:

```js run
*!*
let obj = Object.create(null);
*/!*

let key = prompt("Cual es la clave", "__proto__");
obj[key] = "algún valor";

alert(obj[key]); // "algún valor"
```

`Object.create(null)` crea un objeto vacío sin un prototipo (`[[Prototype]]` es `null`):

![](object-prototype-null.svg)

Entonces, no hay getter/setter heredado para `__proto__`. Ahora se procesa como una propiedad de datos normal, por lo que el ejemplo anterior funciona correctamente.

Podemos llamar a estos objetos: objetos "muy simples" o "de diccionario puro", porque son aún más simples que el objeto simple normal `{...}`.

Una desventaja es que dichos objetos carecen de métodos de objetos integrados, p.ej. `toString`:

```js run
*!*
let obj = Object.create(null);
*/!*

alert(obj); // Error (no hay toString)
```

...Pero eso generalmente está bien para arreglos asociativas.

Tenga en cuenta que la mayoría de los métodos relacionados con objetos son `Object.algo(...)`, como `Object.keys(obj)`  y no están en el prototipo, por lo que seguirán trabajando en dichos objetos:


```js run
let chineseDictionary = Object.create(null);
chineseDictionary.hello = "你好";
chineseDictionary.bye = "再见";

alert(Object.keys(chineseDictionary)); // hola,adios
```

## Resumen

Los métodos modernos para configurar y acceder directamente al prototipo son:

- [Object.create(proto[, descriptores])](mdn:js/Object/create) - crea un objeto vacío con un `proto` dado como `[[Prototype]]` (puede ser `nulo`) y descriptores de propiedad opcionales.
- [Object.getPrototypeOf(obj)](mdn:js/Object.getPrototypeOf) - devuelve el `[[Prototype]]` de `obj` (igual que el getter de `__proto__`).
- [Object.setPrototypeOf(obj, proto)](mdn:js/Object.setPrototypeOf) - establece el `[[Prototype]]` de `obj` en `proto` (igual que el setter de `__proto__`).

El getter/setter incorporado de `__proto__` no es seguro si queremos poner claves generadas por el usuario en un objeto. Aunque un usuario puede ingresar `"__proto __"` como clave, y habrá un error, con consecuencias levemente dañinas, pero generalmente impredecibles.

Entonces podemos usar `Object.create(null)` para crear un objeto "muy simple" sin `__proto__`, o apegarnos a los objetos `Map` para eso.

Además, `Object.create` proporciona una manera fácil de copiar llanamente un objeto con todos los descriptores:

```js
let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
```

También dejamos en claro que `__proto__` es un getter/setter para `[[Prototype]]`  y reside en `Object.prototype`, al igual que otros métodos.

Podemos crear un objeto sin prototipo mediante `Object.create(null)`. Dichos objetos se utilizan como "diccionarios puros", no tienen problemas con `"__proto __"` como clave.

Otros métodos:

- [Object.keys(obj)](mdn:js/Object/keys) / [Object.values(obj)](mdn:js/Object/values) / [Object.entries(obj)](mdn:js/Object/entries): devuelve una arreglo de pares clave-valor: nombres/valores, de propiedades de cadena propios enumerables.
- [Object.getOwnPropertySymbols(obj)](mdn:js/Object/getOwnPropertySymbols): devuelve un arreglo de todas las claves simbólicas propias.
- [Object.getOwnPropertyNames(obj)](mdn:js/Object/getOwnPropertyNames): devuelve un arreglo de todas las claves de cadena propias.
- [Reflect.ownKeys(obj)](mdn:js/Reflect/ownKeys): devuelve un arreglo de todas las claves propias.
- [obj.hasOwnProperty(key)](mdn:js/Object/hasOwnProperty): devuelve `true` si `obj` tiene su propia clave (no heredada) llamada `key`.

Todos los métodos que devuelven propiedades de objeto (como `Object.keys` y otros) - devuelven propiedades "propias". Si queremos heredados, podemos usar `for..in`.
