
# Métodos prototipo, objetos sin __proto__

En el primer capítulo de esta sección mencionamos que existen métodos modernos para configurar un prototipo.

Leer y escribir en `__proto__` se considera desactualizado y algo obsoleto (fue movido al llamado "Anexo B" del estándar JavaScript, dedicado únicamente a navegadores).

Los métodos modernos para obtener y establecer (get/set) un prototipo son:

- [Object.getPrototypeOf(obj)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/getPrototypeOf) -- devuelve el `[[Prototype]]` de `obj`.
- [Object.setPrototypeOf(obj, proto)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/setPrototypeOf) -- establece el `[[Prototype]]` de `obj` a `proto`.

El único uso de `__proto__` que no está mal visto, es como una propiedad cuando se crea un nuevo objeto: `{ __proto__: ... }`.

Aunque hay un método especial para esto también:

- [Object.create(proto, [descriptors])](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/create) -- crea un objeto vacío con el "proto" dado como `[[Prototype]]` y descriptores de propiedad opcionales.

Por ejemplo:

```js run
let animal = {
  eats: true
};

// crear un nuevo objeto con animal como prototipo
*!*
let rabbit = Object.create(animal); // lo mismo que {__proto__: animal}
*/!*

alert(rabbit.eats); // true

*!*
alert(Object.getPrototypeOf(rabbit) === animal); // true
*/!*

*!*
Object.setPrototypeOf(rabbit, {}); // cambia el prototipo de rabbit a {}
*/!*
```

El método `Object.create` es más potente, tiene un segundo argumento opcional: descriptores de propiedad.

Podemos proporcionar propiedades adicionales al nuevo objeto allí, así:

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
let clone = Object.create(
  Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj)
);
```

Esta llamada hace una copia verdaderamente exacta de `obj`, que incluye todas las propiedades: enumerables y no enumerables, propiedades de datos y setters/getters, todo, y con el `[[Prototype]]` correcto.


## Breve historia

Hay muchas formas de administrar `[[Prototype]]`. ¿Cómo pasó esto? ¿Por qué?

Las razones son históricas.

La herencia prototípica estuvo en el lenguaje desde sus albores, pero la manera de manejarla evolucionó con el tiempo.

- La propiedad "prototipo" de una función de constructor ha funcionado desde tiempos muy antiguos.
- Más tarde, en el año 2012, apareció `Object.create` en el estándar. Este le dio la capacidad de crear objetos con un prototipo dado, pero no proporcionaba la capacidad de obtenerlo ni establecerlo. Algunos navegadores implementaron el accessor `__proto__` fuera del estándar, lo que permitía obtener/establecer un prototipo en cualquier momento, dando más flexibilidad al desarrollador.
- Más tarde, en el año 2015, `Object.setPrototypeOf` y `Object.getPrototypeOf` se agregaron al estándar para realizar la misma funcionalidad que `__proto__` daba. Como `__proto__` se implementó de facto en todas partes, fue considerado obsoleto pero logró hacerse camino al Anexo B de la norma, es decir: opcional para entornos que no son del navegador.
- Más tarde, en el año 2022, fue oficialmente permitido el uso de `__proto__` en objetos literales `{...}` (y movido fuera del Anexo B), pero no como getter/setter `obj.__proto__` (sigue en el Anexo B).

¿Por qué se reemplazó `__proto__` por las funciones `getPrototypeOf/setPrototypeOf`? 

¿Por qué `__proto__` fue parcialmente rehabilitado y su uso permitido en `{...}`, pero no como getter/setter?

Esa es una pregunta interesante, que requiere que comprendamos por qué `__proto__` es malo.

Y pronto llegaremos a la respuesta.

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

Aquí, si el usuario escribe en `__proto__`, ¡la asignación en la línea 4 es ignorada!

Eso no debería sorprendernos. La propiedad `__proto__` es especial: debe ser un objeto o `null`. Una cadena no puede convertirse en un prototipo. Es por ello que la asignación de un string a `__proto__` es ignorada.

Pero no *intentamos* implementar tal comportamiento, ¿verdad? Queremos almacenar pares clave/valor, y la clave llamada `"__proto__"` no se guardó correctamente. Entonces, ¡eso es un error!

Aquí las consecuencias no son terribles. Pero en otros casos podemos estar asignando objetos en lugar de strings, y el prototipo efectivamente ser cambiado. Como resultado, la ejecución irá mal de maneras totalmente inesperadas.

Lo que es peor: generalmente los desarrolladores no piensan en tal posibilidad en absoluto. Eso hace que tales errores sean difíciles de notar e incluso los convierta en vulnerabilidades, especialmente cuando se usa JavaScript en el lado del servidor.

También pueden ocurrir cosas inesperadas al asignar a `obj.toString`, por ser un método integrado.

¿Cómo podemos evitar este problema?

Primero, podemos elegir usar `Map` para almacenamiento en lugar de objetos simples, entonces todo quedará bien.

```js run
let map = new Map();

let key = prompt("¿Cuál es la clave?", "__proto__");
map.set(key, "algún valor");

alert(map.get(key)); // "algún valor" (tal como se pretende)
```

... pero la sintaxis con 'Objeto' es a menudo más atractiva, por ser más consisa.

Afortunadamente *podemos* usar objetos, porque los creadores del lenguaje pensaron en ese problema hace mucho tiempo.

Como sabemos, `__proto__` no es una propiedad de un objeto, sino una propiedad de acceso de `Object.prototype`:

![](object-prototype-2.svg)

Entonces, si se lee o establece `obj.__ proto__`, el getter/setter correspondiente se llama desde su prototipo y obtiene/establece `[[Prototype]]`.

Como se dijo al comienzo de esta sección del tutorial: `__proto__` es una forma de acceder a `[[Prototype]]`, no es `[[Prototype]]` en sí.

Ahora, si pretendemos usar un objeto como una arreglo asociativa y no tener tales problemas, podemos hacerlo con un pequeño truco:

```js run
*!*
let obj = Object.create(null);
// o: obj = { __proto__: null }
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

alert(Object.keys(chineseDictionary)); // hola, adiós
```

## Resumen

- Para crear un objeto con un prototipo dado, use:

    - sintaxis literal: `{ __proto__: ... }`, permite especificar multiples propiedades
    - o [Object.create(proto, [descriptors])](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/create), permite especificar descriptores de propiedad.

    El `Object.create` brinda una forma fácil de hacer la copia superficial de un objeto con todos sus descriptores:

    ```js
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    ```

- Los métodos modernos para obtener y establecer el prototipo son:

    - [Object.getPrototypeOf(obj)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) -- devuelve el `[[Prototype]]` de `obj` (igual que el getter de `__proto__`).
    - [Object.setPrototypeOf(obj, proto)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) -- establece el `[[Prototype]]` de `obj` en `proto` (igual que el setter de `__proto__`).

- No está recomendado obtener y establecer el prototipo usando los getter/setter nativos de `__proto__`. Ahora están en el Anexo B de la especificación.

- También hemos cubierto objetos sin prototipo, creados con `Object.create(null)` o `{__proto__: null}`.

    Estos objetos son usados como diccionarios, para almacenar cualquier (posiblemente generadas por el usuario) clave.

    Normalmente, los objetos heredan métodos nativos y getter/setter de `__proto__` desde `Object.prototype`, haciendo sus claves correspondientes "ocupadas" y potencialmente causar efectos secundarios. Con el prototipo `null`, los objetos están verdaderamente vacíos.
