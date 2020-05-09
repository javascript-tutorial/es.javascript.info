
# Ampliación de clases integradas

Las clases integradas como Array, Map y otras también son extensibles.

Por ejemplo, aquí `PowerArray` hereda del nativo `Array`:

```js run
// se agrega un método más (puedes hacer más)
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // falso

let filteredArr = arr.filter(item => item >= 10);
alert(filteredArr); // 10, 50
alert(filteredArr.isEmpty()); // falso
```

Tenga en cuenta una cosa muy interesante. Métodos incorporados como `filter`, `map` y otros: devuelven nuevos objetos exactamente del tipo heredado `PowerArray`. Su implementación interna utiliza la propiedad `constructor` del objeto para eso.

En el ejemplo anterior,
```js
arr.constructor === PowerArray
```

Cuando se llama a `arr.filter()`, crea internamente la nueva matriz de resultados usando exactamente `arr.constructor`, no el básico `Array`. En realidad, eso es muy bueno, porque podemos seguir usando métodos `PowerArray` más adelante en el resultado.

Aún más, podemos personalizar ese comportamiento.

Podemos agregar un `getter` estático especial `Symbol.species` a la clase. Si existe, debería devolver el constructor que JavaScript usará internamente para crear nuevas entidades en `map`, `filter` y así sucesivamente.

Si queremos que los métodos incorporados como `map` o `filter` devuelvan matrices regulares, podemos devolver `Array` en `Symbol.species`, como aquí:

```js run
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

*!*
  // los métodos incorporados usarán esto como el constructor
  static get [Symbol.species]() {
    return Array;
  }
*/!*
}

let arr = new PowerArray(1, 2, 5, 10, 50);
alert(arr.isEmpty()); // falso

// filter crea una nueva matriz usando arr.constructor[Symbol.species] como constructor
let filteredArr = arr.filter(item => item >= 10);

*!*
// filterArr no es PowerArray, sino Array
*/!*
alert(filteredArr.isEmpty()); // Error: filterArr.isEmpty no es una función
```

Como puede ver, ahora `.filter` devuelve `Array`. Por lo tanto, la funcionalidad extendida ya no se pasa.

```smart header="Other collections trabaja similarmente"
Otras colecciones, como `Map` y `Set`, funcionan igual. También usan `Symbol.species`.
```

## Sin herencia estática en incorporados

Los objetos incorporados tienen sus propios métodos estáticos, por ejemplo, `Object.keys`, `Array.isArray`, etc.

Como ya sabemos, las clases nativas se extienden entre sí. Por ejemplo, `Array` extiende `Object`.

Normalmente, cuando una clase extiende a otra, se heredan los métodos estáticos y no estáticos. Eso se explicó a fondo en el artículo [](info:static-properties-methods#statics-and-inheritance).

Pero las clases integradas son una excepción. No heredan estáticos el uno del otro.

Por ejemplo, tanto `Array` como `Date` heredan de `Object`, por lo que sus instancias tienen métodos de `Object.prototype`. Pero `Array.[[Prototype]]` no hace referencia a `Object`, por lo que no existe, por ejemplo, el método estático `Array.keys()` (o `Date.keys()`).

Aquí está la imagen, estructura para `Date` y `Object`:

![](object-date-inheritance.svg)

Como puede ver, no hay un vínculo entre `Date` y `Object`. Son independientes, solo `Date.prototype` hereda de `Object.prototype`.

Esa es una diferencia importante de herencia entre los objetos integrados en comparación con lo que obtenemos con 'extends`.
