
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

<<<<<<< HEAD
Tenga en cuenta una cosa muy interesante. Métodos incorporados como `filter`, `map` y otros: devuelven nuevos objetos exactamente del tipo heredado `PowerArray`. Su implementación interna utiliza la propiedad `constructor` del objeto para eso.
=======
Please note a very interesting thing. Built-in methods like `filter`, `map` and others -- return new objects of exactly the inherited type `PowerArray`. Their internal implementation uses the object's `constructor` property for that.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

En el ejemplo anterior,
```js
arr.constructor === PowerArray
```

<<<<<<< HEAD
Cuando se llama a `arr.filter()`, crea internamente la nueva matriz de resultados usando exactamente `arr.constructor`, no el básico `Array`. En realidad, eso es muy bueno, porque podemos seguir usando métodos `PowerArray` más adelante en el resultado.
=======
When `arr.filter()` is called, it internally creates the new array of results using exactly `arr.constructor`, not basic `Array`. That's actually very cool, because we can keep using `PowerArray` methods further on the result.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

Aún más, podemos personalizar ese comportamiento.

<<<<<<< HEAD
Podemos agregar un `getter` estático especial `Symbol.species` a la clase. Si existe, debería devolver el constructor que JavaScript usará internamente para crear nuevas entidades en `map`, `filter` y así sucesivamente.

Si queremos que los métodos incorporados como `map` o `filter` devuelvan matrices regulares, podemos devolver `Array` en `Symbol.species`, como aquí:
=======
We can add a special static getter `Symbol.species` to the class. If it exists, it should return the constructor that JavaScript will use internally to create new entities in `map`, `filter` and so on.

If we'd like built-in methods like `map` or `filter` to return regular arrays, we can return `Array` in `Symbol.species`, like here:
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

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
alert(filteredArr.isEmpty()); // Error: filteredArr.isEmpty no es una función
```

Como puede ver, ahora `.filter` devuelve `Array`. Por lo tanto, la funcionalidad extendida ya no se pasa.

<<<<<<< HEAD
```smart header="Other collections trabaja similarmente"
Otras colecciones, como `Map` y `Set`, funcionan igual. También usan `Symbol.species`.
```

## Sin herencia estática en incorporados

Los objetos incorporados tienen sus propios métodos estáticos, por ejemplo, `Object.keys`, `Array.isArray`, etc.

Como ya sabemos, las clases nativas se extienden entre sí. Por ejemplo, `Array` extiende `Object`.
=======
```smart header="Other collections work similarly"
Other collections, such as `Map` and `Set`, work alike. They also use `Symbol.species`.
```

## No static inheritance in built-ins
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

Normalmente, cuando una clase extiende a otra, se heredan los métodos estáticos y no estáticos. Eso se explicó a fondo en el artículo [](info:static-properties-methods#statics-and-inheritance).

<<<<<<< HEAD
Pero las clases integradas son una excepción. No heredan estáticos el uno del otro.

Por ejemplo, tanto `Array` como `Date` heredan de `Object`, por lo que sus instancias tienen métodos de `Object.prototype`. Pero `Array.[[Prototype]]` no hace referencia a `Object`, por lo que no existe, por ejemplo, el método estático `Array.keys()` (o `Date.keys()`).

Aquí está la imagen, estructura para `Date` y `Object`:
=======
As we already know, native classes extend each other. For instance, `Array` extends `Object`.

Normally, when one class extends another, both static and non-static methods are inherited. That was thoroughly explained in the article [](info:static-properties-methods#statics-and-inheritance).

But built-in classes are an exception. They don't inherit statics from each other.

For example, both `Array` and `Date` inherit from `Object`, so their instances have methods from `Object.prototype`. But `Array.[[Prototype]]` does not reference `Object`, so there's no, for instance, `Array.keys()` (or `Date.keys()`) static method.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8

![](object-date-inheritance.svg)

<<<<<<< HEAD
Como puede ver, no hay un vínculo entre `Date` y `Object`. Son independientes, solo `Date.prototype` hereda de `Object.prototype`.

Esa es una diferencia importante de herencia entre los objetos integrados en comparación con lo que obtenemos con 'extends`.
=======
![](object-date-inheritance.svg)

As you can see, there's no link between `Date` and `Object`. They are independent, only `Date.prototype` inherits from `Object.prototype`.

That's an important difference of inheritance between built-in objects compared to what we get with `extends`.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
