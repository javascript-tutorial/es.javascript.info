
# Indicadores y descriptores de propiedad

Como sabemos, los objetos pueden almacenar propiedades.

<<<<<<< HEAD
Hasta ahora, una propiedad era un simple par "clave-valor" para nosotros. Pero una propiedad de un objeto es algo más flexible y poderoso.
=======
Until now, a property was a simple "key-value" pair to us. But an object property is actually a more flexible and powerful thing.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

En éste capítulo vamos a estudiar opciones adicionales de configuración, y en el siguiente veremos como convertirlas invisiblemente en funciones 'getter/setter', de obtención y establecimiento.

## Indicadores de propiedad

Las propiedades de objeto, a parte de un **`value`**, tienen tres atributos especiales (también llamados "indicadores"):

<<<<<<< HEAD
- **`writable`** -- si es `true`, puede ser editado, de otra manera es de solo lectura.
- **`enumerable`** -- si es `true`, puede ser listado en bucles, de otro modo no puede serlo.
- **`configurable`** -- si es `true`, la propiedad puede ser borrada y estos atributos pueden ser modificados, de otra forma no.
=======
- **`writable`** -- if `true`, the value can be changed, otherwise it's read-only.
- **`enumerable`** -- if `true`, then listed in loops, otherwise not listed.
- **`configurable`** -- if `true`, the property can be deleted and these attributes can be modified, otherwise not.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Aun no los vemos, porque generalmente no se muestran. Cuando creamos una propiedad "de la forma usual", todos ellos son `true`. Pero podemos cambiarlos en cualquier momento.

Primero, veamos como conseguir estos indicadores.

El método [Object.getOwnPropertyDescriptor](mdn:js/Object/getOwnPropertyDescriptor) permite consultar *toda* la información sobre una propiedad.

La sintaxis es ésta:
```js
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
```

`obj`
: El objeto del que se quiere obtener la información.

`propertyName`
: El nombre de la propiedad.

El valor de retorno también es llamado objeto "descriptor de propiedad": éste contiene el valor de todos los indicadores.

Por ejemplo:

```js run
let user = {
  name: "Juan"
};

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/* descriptor de propiedad:
{
  "value": "Juan",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/
```

Para cambiar los indicadores, podemos usar [Object.defineProperty](mdn:js/Object/defineProperty).

La sintaxis es ésta:

```js
Object.defineProperty(obj, propertyName, descriptor)
```

`obj`, `propertyName`
<<<<<<< HEAD
: el objeto y la propiedad con los que se va a trabajar.

`descriptor`
: descriptor de propiedad a aplicar.
=======
: The object and its property to apply the descriptor.

`descriptor`
: Property descriptor object to apply.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Si la propiedad existe, `defineProperty` actualiza sus indicadores. De otra forma, creará la propiedad con el valor y el indicador dado; en ese caso, si el indicador no es proporcionado, es asumido como `false`.

Por ejemplo, aqui se crea una propiedad `name` con todos los indicadores en `false`:

```js run
let user = {};

*!*
Object.defineProperty(user, "name", {
  value: "Juan"
});
*/!*

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": "Juan",
*!*
  "writable": false,
  "enumerable": false,
  "configurable": false
*/!*
}
 */
```

Comparado con la creada "de la forma usual" `user.name`: ahora todos los indicadores son `false`. Si eso no es lo que queremos, entonces mejor los establecemos en `true` en el `descriptor`.

Ahora veamos los efectos de los indicadores con ejemplo.

## Non-writable

<<<<<<< HEAD
Vamos a hacer `user.name` de solo lectura cambiando el indicador `writable`:
=======
Let's make `user.name` non-writable (can't be reassigned) by changing `writable` flag:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {
  name: "Juan"
};

Object.defineProperty(user, "name", {
*!*
  writable: false
*/!*
});

*!*
<<<<<<< HEAD
user.name = "Pedro"; // Error: No se puede asignar a la propiedad de solo lectura 'name'...
=======
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
*/!*
```

Ahora nadie puede cambiar el nombre de nuestro usuario, a menos que le apliquen su propio `defineProperty` para sobrescribir el nuestro.

<<<<<<< HEAD
```smart header="Los errores aparecen solo en modo estricto"
En el modo no estricto, no se producen errores al escribir en propiedades no grabables y demás. Pero la operación aún no tendrá éxito. Las acciones que infringen el indicador se ignoran silenciosamente de forma no estricta.
```
=======
```smart header="Errors appear only in strict mode"
In the non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won't succeed. Flag-violating actions are just silently ignored in non-strict.
```

Here's the same example, but the property is created from scratch:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Aquí está el mismo ejemplo, pero la propiedad se crea desde cero:
```js run
let user = { };

Object.defineProperty(user, "name", {
*!*
<<<<<<< HEAD

  value: "Pedro",
  // para las nuevas propiedades se necesita listarlas explicitamente como true
=======
  value: "John",
  // for new properties we need to explicitly list what's true
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
  enumerable: true,
  configurable: true
*/!*
});

<<<<<<< HEAD
alert(user.name); // Pedro
user.name = "Alicia"; // Error
=======
alert(user.name); // John
user.name = "Pete"; // Error
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```

## Non-enumerable

Ahora vamos a añadir un `toString` personalizado a `user`.

<<<<<<< HEAD
Normalmente, un `toString` incorporado en objetos es no enumerable, no se muestra en un bucle `for..in`. Pero si añadimos nuestro propio `toString`, entonces por defecto, este se muestra en los bucles `for..in`, como sigue:
=======
Normally, a built-in `toString` for objects is non-enumerable, it does not show up in `for..in`. But if we add a `toString` of our own, then by default it shows up in `for..in`, like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {
  name: "Juan",
  toString() {
    return this.name;
  }
};

// Por defecto, nuestras propiedades se listan:
for (let key in user) alert(key); // name, toString
```

<<<<<<< HEAD
Si no nos gusta, podemos establecer `enumerable:false`. Entonces, no aparecerá en bucles `for..in`, exactamente como el incorporado:
=======
If we don't like it, then we can set `enumerable:false`. Then it won't appear in a `for..in` loop, just like the built-in one:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let user = {
  name: "Juan",
  toString() {
    return this.name;
  }
};

Object.defineProperty(user, "toString", {
*!*
  enumerable: false
*/!*
});

*!*
// Ahora nuestro toString desaparece:
*/!*
for (let key in user) alert(key); // nombre
```

Las propiedades no enumerables también se excluyen de `Object.keys`:

```js
alert(Object.keys(user)); // name
```

## Non-configurable

Los indicadores no configurables (`configurable:false`) a veces es un preajuste para los objetos propiedades incorporadas.

<<<<<<< HEAD
Una propiedad no configurable no puede ser eliminada ni cambiada por `defineProperty`.

Por ejemplo, `Math.PI` es de solo lectura, no enumerable y no configurable:
=======
A non-configurable property can not be deleted.

For instance, `Math.PI` is non-writable, non-enumerable and non-configurable:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

alert( JSON.stringify(descriptor, null, 2 ) );
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/
```
Así que, un programador es incapaz de cambiar el valor de `Math.PI` o sobrescribirlo.

```js run
Math.PI = 3; // Error

// delete Math.PI tampoco funcionará
```

<<<<<<< HEAD
Convertir una propiedad en no configurable es hacer una calle de una vía. No podremos cambiarla de vuelta, porque `defineProperty` no funciona en propiedades no configurables.
=======
Making a property non-configurable is a one-way road. We cannot change it back with `defineProperty`.

To be precise, non-configurability imposes several restrictions on `defineProperty`:
1. Can't change `configurable` flag.
2. Can't change `enumerable` flag.
3. Can't change `writable: false` to `true` (the other way round works).
4. Can't change `get/set` for an accessor property (but can assign them if absent).
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Para ser precisos, la no configurabilidad impone varias restricciones a `defineProperty`:
- 1. No se puede cambiar el indicador `configurable`.
- 2. No se puede cambiar el indicador `enumerable`.
- 3. No se puede cambiar `writable: false` a `true` (al revés funciona).
- 4. No se puede cambiar `get/set` por una propiedad accesoria (pero puede asignarlos si está ausente).

Aquí estamos haciendo `user.name` una constante "sellada por siempre":

```js run
let user = { };

Object.defineProperty(user, "name", {
  value: "Juan",
  writable: false,
  configurable: false
});

*!*
// No seremos capaces de cambiar usuario.nombre o su identificador
// Nada de esto funcionará:
//   user.name = "Pedro"
//   delete user.name
//   defineProperty(user, "name", { value: "Pete" })
Object.defineProperty(user, "name", {writable: true}); // Error
*/!*
```

<<<<<<< HEAD
```smart header="\"Non-configurable\" no significa \"non-writable\""
Excepción notable: un valor de propiedad no-configurable pero writable puede ser cambiado.

La idea de `configurable: false` is para evitar cambios a los indicadores de propiedad y su borrado, no cambios a su valor.
=======
```smart header="\"Non-configurable\" doesn't mean \"non-writable\""
Notable exception: a value of non-configurable, but writable property can be changed.

The idea of `configurable: false` is to prevent changes to property flags and its deletion, not changes to its value.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```

## Object.defineProperties

Hay un método [Object.defineProperties(obj, descriptors)](mdn:js/Object/defineProperties) que permite definir varias propiedades de una sola vez.

La sintaxis es esta:

```js
Object.defineProperties(obj, {
  prop1: descriptor1,
  prop2: descriptor2
  // ...
});
```

Por ejemplo:

```js
Object.defineProperties(user, {
  name: { value: "Juan", writable: false },
  surname: { value: "Perez", writable: false },
  // ...
});
```

Entonces, podemos asignar varias propiedades al mismo tiempo.

## Object.getOwnPropertyDescriptors

Para obtener todos los descriptores al mismo tiempo, podemos usar el método [Object.getOwnPropertyDescriptors(obj)](mdn:js/Object/getOwnPropertyDescriptors).

Junto con `Object.defineProperties` puede ser usado como una forma de "indicadores-conscientes" al clonar un objeto:

```js
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
```

Normalmente cuando clonamos un objeto, usamos una sentencia para copiar las propiedades, como esta:

```js
for (let key in user) {
  clone[key] = user[key]
}
```

...Pero eso no copia los identificadores. Así que si queremos un "mejor" clon entonces se prefiere `Object.defineProperties`.

Otra diferencia es que `for..in` ignora propiedades simbólicas, pero `Object.getOwnPropertyDescriptors` retorna *todos* los descriptores de propiedades incluyendo los simbolicos.

## Sellando un objeto globalmente

Los descriptores de propiedad trabajan al nivel de propiedades individuales.

También hay métodos que limitan el acceso al objeto *completo*:

[Object.preventExtensions(obj)](mdn:js/Object/preventExtensions)
<<<<<<< HEAD

: Prohíbe añadir propiedades al objeto.

[Object.seal(obj)](mdn:js/Object/seal)
: Prohíbe añadir/eliminar propiedades, establece todas las propiedades existentes como `configurable: false`.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Prohíbe añadir/eliminar/cambiar propiedades, establece todas las propiedades existentes como `configurable: false, writable: false`.
=======
: Forbids the addition of new properties to the object.

[Object.seal(obj)](mdn:js/Object/seal)
: Forbids adding/removing of properties. Sets `configurable: false` for all existing properties.

[Object.freeze(obj)](mdn:js/Object/freeze)
: Forbids adding/removing/changing of properties. Sets `configurable: false, writable: false` for all existing properties.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Y también hay pruebas para ellos:

[Object.isExtensible(obj)](mdn:js/Object/isExtensible)
: Devuelve `false` si esta prohibido añadir propiedades, si no `true`.

[Object.isSealed(obj)](mdn:js/Object/isSealed)
: Devuelve `true` si añadir/eliminar propiedades está prohibido, y todas las propiedades existentes tienen `configurable: false`.

[Object.isFrozen(obj)](mdn:js/Object/isFrozen)
: Devuelve `true` si añadir/eliminar/cambiar propiedades está prohibido, y todas las propiedades son `configurable: false, writable: false`.

Estos métodos son usados rara vez en la práctica.
