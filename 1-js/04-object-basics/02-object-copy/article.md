<<<<<<< HEAD
# Copia de objetos, referencias

Una de las diferencias fundamentales de los objetos respecto a los primitivos es que son almacenados y copiados "por referencia".

Los valores primitivos: strings, numbers, booleans -- son asignados y copiados "como un valor completo".

Por ejemplo:
=======
# Object copying, references

One of the fundamental differences of objects vs primitives is that they are stored and copied "by reference".

Primitive values: strings, numbers, booleans -- are assigned/copied "as a whole value".

For instance:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
let message = "Hello!";
let phrase = message;
```

<<<<<<< HEAD
Como resultado tenemos dos variables independientes, cada una almacenando la cadena `"Hello!"`.

![](variable-copy-value.svg)

Los objetos no son así.

**Una variable no almacena el objeto mismo sino su "dirección en memoria", en otras palabras "una referencia" a él.**

Aquí tenemos una imagen del objeto:
=======
As a result we have two independent variables, each one is storing the string `"Hello!"`.

![](variable-copy-value.svg)

Objects are not like that.

**A variable stores not the object itself, but its "address in memory", in other words "a reference" to it.**

Here's the picture for the object:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
let user = {
  name: "John"
};
```

![](variable-contains-reference.svg)

<<<<<<< HEAD
Aquí, el objeto es almacenado en algún lugar de la memoria. Y la variable `user` tiene una "referencia" a él.

**Cuando una variable de objeto es copiada -- la referencia es copiada, el objeto no es duplicado.**

Por ejemplo:
=======
Here, the object is stored somewhere in memory. And the variable `user` has a "reference" to it.

**When an object variable is copied -- the reference is copied, the object is not duplicated.**

For instance:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js no-beautify
let user = { name: "John" };

<<<<<<< HEAD
let admin = user; // copia la referencia
```

Ahora tenemos dos variables, cada una con una referencia al mismo objeto:

![](variable-copy-reference.svg)

Podemos usar cualquiera de las variables para acceder al objeto y modificar su contenido:
=======
let admin = user; // copy the reference
```

Now we have two variables, each one with the reference to the same object:

![](variable-copy-reference.svg)

We can use any variable to access the object and modify its contents:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let user = { name: 'John' };

let admin = user;

*!*
<<<<<<< HEAD
admin.name = 'Pete'; // cambiado por la referencia "admin"
*/!*

alert(*!*user.name*/!*); // 'Pete', los cambios se ven desde la referencia "user"
```

El ejemplo anterior demuestra que solamente hay un único objeto. Como si tuviéramos un gabinete con dos llaves y usáramos una de ellas (`admin`) para accederlo. Si más tarde usamos la llave (`user`), podemos ver los cambios.

## Comparación por referencia

En los objetos, los operadores de igualdad `==` e igualdad estricta `===` funcionan exactamente igual.

**Dos objetos son iguales solamente si ellos son el mismo objeto.**

Aquí dos variables referencian el mismo objeto, así que ellos son iguales:

```js run
let a = {};
let b = a; // copia la referencia

alert( a == b ); // true, verdadero. Ambas variables hacen referencia al mismo objeto
alert( a === b ); // true
```

Y aquí dos objetos independientes no son iguales, incluso estando ambos vacíos:

```js run
let a = {};
let b = {}; // dos objetos independientes
=======
admin.name = 'Pete'; // changed by the "admin" reference
*/!*

alert(*!*user.name*/!*); // 'Pete', changes are seen from the "user" reference
```

The example above demonstrates that there is only one object. As if we had a cabinet with two keys and used one of them (`admin`) to get into it. Then, if we later use another key (`user`) we can see changes.

## Comparison by reference

The equality `==` and strict equality `===` operators for objects work exactly the same.

**Two objects are equal only if they are the same object.**

Here two variables reference the same object, thus they are equal:

```js run
let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true
```

And here two independent objects are not equal, even though both are empty:

```js run
let a = {};
let b = {}; // two independent objects
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

alert( a == b ); // false
```

<<<<<<< HEAD
Para comparaciones como `obj1 > obj2`, o comparaciones contra un primitivo `obj == 5`, los objetos son convertidos a primitivos. Estudiaremos cómo funciona la conversión de objetos pronto, pero a decir verdad tales comparaciones ocurren raramente y suelen ser errores de código.

## Clonación y mezcla, Object.assign

Entonces copiar una variable de objeto crea una referencia adicional al mismo objeto.

Pero ¿si necesitamos duplicar un objeto? ¿Crear una copia independiente, un clon?

Eso también es factible, pero un poco más difícil porque no hay un método incorporado para eso en JavaScript. En realidad, eso es raramente necesario. Copiar por referencia está bien la mayoría de las veces.

Pero si realmente queremos eso, necesitamos crear un nuevo objeto y replicar la estructura del existente iterando a través de sus propiedades y copiándolas en el nivel primitivo.

Como esto:
=======
For comparisons like `obj1 > obj2` or for a comparison against a primitive `obj == 5`, objects are converted to primitives. We'll study how object conversions work very soon, but to tell the truth, such comparisons occur very rarely, usually as a result of a coding mistake.

## Cloning and merging, Object.assign

So, copying an object variable creates one more reference to the same object.

But what if we need to duplicate an object? Create an independent copy, a clone?

That's also doable, but a little bit more difficult, because there's no built-in method for that in JavaScript. Actually, that's rarely needed. Copying by reference is good most of the time.

But if we really want that, then we need to create a new object and replicate the structure of the existing one by iterating over its properties and copying them on the primitive level.

Like this:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let user = {
  name: "John",
  age: 30
};

*!*
<<<<<<< HEAD
let clone = {}; // el nuevo objeto vacío

// copiemos todas las propiedades de user en él
=======
let clone = {}; // the new empty object

// let's copy all user properties into it
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
for (let key in user) {
  clone[key] = user[key];
}
*/!*

<<<<<<< HEAD
// ahora clone es un objeto totalmente independiente con el mismo contenido
clone.name = "Pete"; // cambiamos datos en él

alert( user.name ); // John aún está en el objeto original
```

También podemos usar el método [Object.assign](mdn:js/Object/assign) para ello.

La sintaxis es:
=======
// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert( user.name ); // still John in the original object
```

Also we can use the method [Object.assign](mdn:js/Object/assign) for that.

The syntax is:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
Object.assign(dest, [src1, src2, src3...])
```

<<<<<<< HEAD
- El primer argumento `dest` es el objeto destinatario.
- Los siguientes argumentos `src1, ..., srcN` (tantos como sea necesario) son objetos fuentes.
- Esto copia todas las propiedades de todos los objetos fuentes `src1, ..., srcN` dentro del destino `dest`. En otras palabras, las propiedades de todos los argumentos, comenzando desde el segundo, son copiadas en el primer objeto.
- El llamado devuelve `dest`.

Por ejemplo, podemos usarlo para combinar distintos objetos en uno:
=======
- The first argument `dest` is a target object.
- Further arguments `src1, ..., srcN` (can be as many as needed) are source objects.
- It copies the properties of all source objects `src1, ..., srcN` into the target `dest`. In other words, properties of all arguments starting from the second are copied into the first object.
- The call returns `dest`.

For instance, we can use it to merge several objects into one:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
```js
let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

*!*
<<<<<<< HEAD
// copia todas las propiedades desde permissions1 y permissions2 en user
Object.assign(user, permissions1, permissions2);
*/!*

// ahora user = { name: "John", canView: true, canEdit: true }
```

Si la propiedad por copiar ya existe, se sobrescribe:
=======
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
*/!*

// now user = { name: "John", canView: true, canEdit: true }
```

If the copied property name already exists, it gets overwritten:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

<<<<<<< HEAD
alert(user.name); // ahora user = { name: "Pete" }
```

También podemos usar `Object.assign` reemplazando el bucle `for..in` para hacer una clonación simple:
=======
alert(user.name); // now user = { name: "Pete" }
```

We also can use `Object.assign` to replace `for..in` loop for simple cloning:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
let user = {
  name: "John",
  age: 30
};

*!*
let clone = Object.assign({}, user);
*/!*
```

<<<<<<< HEAD
Copia todas las propiedades de `user` en un objeto vacío y lo devuelve.

## Clonación anidada

Hasta ahora asumimos que todas las propiedades de `user` son primitivas. Pero las propiedades pueden ser referencias a otros objetos. ¿Qué hacer con ellas?

Como esto:
=======
It copies all properties of `user` into the empty object and returns it.

## Nested cloning

Until now we assumed that all properties of `user` are primitive. But properties can be references to other objects. What to do with them?

Like this:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

alert( user.sizes.height ); // 182
```

<<<<<<< HEAD
Ahora no es suficiente copiar `clone.sizes = user.sizes`, porque `user.sizes` es un objeto y será copiado por referencia. Entonces `clone` y `user` compartirán las mismas tallas (.sizes):

Como esto:
=======
Now it's not enough to copy `clone.sizes = user.sizes`, because the `user.sizes` is an object, it will be copied by reference. So `clone` and `user` will share the same sizes:

Like this:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};

let clone = Object.assign({}, user);

<<<<<<< HEAD
alert( user.sizes === clone.sizes ); // true, el mimo objeto

// user y clone comparten sizes
user.sizes.width++;       // cambia la propiedad en un lugar
alert(clone.sizes.width); // 51, ve el resultado desde el otro
```

Para corregir esto, debemos usar un bucle de clonación que examine cada valor de `user[key]` y, si es un objeto, replicar su estructura también. Esto es llamado "clonación profunda".

Hay un algoritmo estándar para clonación profunda que maneja este caso y otros más complicados llamado [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data).

Podemos usar recursividad para implementarlo. O, para no inventar la rueda, tomar una implementación existente, por ejemplo [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) de la librería JavaScript [lodash](https://lodash.com).

## Resumen

Los objetos son asignados y copiados por referencia. En otras palabras, una variable almacena no el valor del objeto sino una referencia (dirección de memoria) del valor. Entoncess copiar tal variable o pasarla como argumento de función copia la referencia, no el objeto.

Todas la operaciones a través de referencias copiadas (como agregar y borrar propiedades) son efectuadas en el mismo y único objeto .

Si queremos conseguir una "copia real" (un clon), podemos usar: Una "clonación superficial" por medio de la función `Object.assign` (con los objetos anidados copiados por referencia), o una "clonación profunda" con una función como [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
=======
alert( user.sizes === clone.sizes ); // true, same object

// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one
```

To fix that, we should use the cloning loop that examines each value of `user[key]` and, if it's an object, then replicate its structure as well. That is called a "deep cloning".

There's a standard algorithm for deep cloning that handles the case above and more complex cases, called the [Structured cloning algorithm](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data).

We can use recursion to implement it. Or, not to reinvent the wheel, take an existing implementation, for instance [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep) from the JavaScript library [lodash](https://lodash.com).

## Summary

Objects are assigned and copied by reference. In other words, a variable stores not the "object value", but a "reference" (address in memory) for the value. So copying such a variable or passing it as a function argument copies that reference, not the object.

All operations via copied references (like adding/removing properties) are performed on the same single object.

To make a "real copy" (a clone) we can use `Object.assign` for the so-called "shallow copy" (nested objects are copied by reference) or a "deep cloning" function, such as [_.cloneDeep(obj)](https://lodash.com/docs#cloneDeep).
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
