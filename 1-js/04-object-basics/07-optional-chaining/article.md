
# Encadenamiento opcional '?.'

[recent browser="new"]

El encadenamiento opcional `?.` es una forma a prueba de errores para acceder a las propiedades de los objetos anidados, incluso si no existe una propiedad intermedia.

## El problema

Si acaba de comenzar a leer el tutorial y aprender JavaScript, quizás el problema aún no lo haya tocado, pero es bastante común.

<<<<<<< HEAD
Por ejemplo, algunos de nuestros usuarios tienen direcciones, pero pocos no las proporcionaron. Entonces no podemos leer con seguridad `user.address.street`:

```js run
let user = {}; // usuario sin dirección
=======
As an example, consider objects for user data. Most of our users have addresses in `user.address` property, with the street `user.address.street`, but some did not provide them.

In such case, when we attempt to get `user.address.street`, we may get an error:

```js run
let user = {}; // a user without "address" property
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

alert(user.address.street); // Error!
```

<<<<<<< HEAD
O, en el desarrollo web, nos gustaría obtener información sobre un elemento en la página, pero puede no existir:

```js run
// Error si el resultado de querySelector (...) es nulo
let html = document.querySelector('.my-element').innerHTML;
```

Antes de que apareciera `?.` en el lenguaje, el operador `&&` se usaba para solucionarlo.

Por ejemplo:
=======
That's the expected result, JavaScript works like this. As `user.address` is `undefined`, the attempt to get `user.address.street` fails with an error. Although, in many practical cases we'd prefer to get `undefined` instead of an error here (meaning "no street").

...And another example. In the web development, we may need the information about an element on the page. The element is returned by `document.querySelector('.elem')`, and the catch is again - that it sometimes doesn't exist:

```js run
// the result of the call document.querySelector('.elem') may be an object or null
let html = document.querySelector('.elem').innerHTML; // error if it's null
```

Once again, we may want to avoid the error in such case.

How can we do this?

The obvious solution would be to check the value using `if` or the conditional operator `?`, before accessing it, like this:

```js
let user = {};

alert(user.address ? user.address.street : undefined);
```

...But that's quite inelegant. As you can see, the `user.address` is duplicated in the code. For more deeply nested properties, that becomes a problem.

E.g. let's try getting `user.address.street.name`.

We need to check both `user.address` and `user.address.street`:

```js
let user = {}; // user has no address

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

That looks awful.

Before the optional chaining `?.` was added to the language, people used the `&&` operator for such cases:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = {}; // El usuario no tiene dirección

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

<<<<<<< HEAD
Y el camino completo a la propiedad asegura que todos los componentes existen, pero es engorroso de escribir.
=======
AND'ing the whole path to the property ensures that all components exist (if not, the evaluation stops), but also isn't ideal.

As you can see, the property names are still duplicated in the code. E.g. in the code above, `user.address` appears three times.

And now, finally, the optional chaining comes to the rescue!
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

## Encadenamiento opcional

El encadenamiento opcional `?.` detiene la evaluación y devuelve` undefined` si la parte anterior a `?.` es` undefined` o `null`.

**Además en este artículo, por brevedad, diremos que algo "existe" si no es `null` o `undefined`.**

<<<<<<< HEAD

Aquí está la forma segura de acceder a `user.address.street`:
=======
Here's the safe way to access `user.address.street` using `?.`:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = {}; // El usuario no tiene dirección

alert( user?.address?.street ); // undefined (no error)
```

<<<<<<< HEAD
Leer la dirección con `user? .Address` funciona incluso si el objeto `user` no existe:
=======
The code is short and clean, there's no duplication at all.

Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

```js run
let user = null;

alert( user?.address ); // undefined

alert( user?.address.street ); // undefined
alert( user?.address.street.anything ); // undefined
```

Tenga en cuenta: la sintaxis `?.` funciona exactamente donde está colocada, nada más.

<<<<<<< HEAD
En el ejemplo anterior, `user?.` permite que solo `user` sea `null / undefined`.
=======
In the example above, `user?.address.street` allows only `user` to be `null/undefined`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Por otro lado, si `user` existe, entonces debe tener la propiedad `user.address`, de lo contrario `user?.Address.street` da un error en el segundo punto.


<<<<<<< HEAD
```warn header="No abuses del encadenamiento opcional"
Deberíamos usar `?.` solo donde está bien que algo no exista.
=======
For example, if according to our coding logic `user` object must exist, but `address` is optional, then we should write `user.address?.street`, but not `user?.address?.street`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Por ejemplo, si de acuerdo con nuestra lógica de codificación, el objeto `user` debe estar allí, pero `address` es opcional, entonces `user.address?.Street` sería mejor.

Entonces, si `user` no está definido debido a un error, lo sabremos y lo arreglaremos. De lo contrario, los errores de codificación pueden silenciarse donde no sea apropiado y volverse más difíciles de depurar.
```

````warn header="La variable antes de ?. debe declararse"
Si no hay una variable `user` declarada, entonces `user?.Anything` provocará un error:

```js run
// ReferenceError: El usuario no está definido
user?.address;
```
<<<<<<< HEAD
Debe haber `let / const / var user`. El encadenamiento opcional solo funciona para variables declaradas.
=======
The variable must be declared (e.g. `let/const/var user` or as a function parameter). The optional chaining works only for declared variables.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d
````

## Short-circuiting (Cortocircuitos)

Como se dijo antes, el `?.` detiene inmediatamente ("cotocircuito") la evaluación si la parte izquierda no existe.

Entonces, si hay más llamadas a funciones o efectos secundarios, estos no suceden:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // no pasa nada

alert(x); // 0, el valor no se incrementa
```

## Otros casos: ?.(), ?.[]

El encadenamiento opcional `?.` no es un operador, sino una construcción de sintaxis especial, que también funciona con funciones y corchetes.

Por ejemplo, `?.()` Se usa para llamar a una función que puede no existir.

En el siguiente código, algunos de nuestros usuarios tienen el método `admin`, y otros no:

```js run
let user1 = {
  admin() {
    alert("I am admin");
  }
}

let user2 = {};

*!*
user1.admin?.(); // I am admin
user2.admin?.();
*/!*
```

Aquí, en ambas líneas, primero usamos el punto `.` para obtener la propiedad `admin`, porque el objeto usuario debe existir, por lo que es seguro leerlo.

Entonces `?.()` Comprueba la parte izquierda: si el usuario existe, entonces se ejecuta (para `user1`). De lo contrario (para `user2`) la evaluación se detiene sin errores.

La sintaxis `?.[]` también funciona si quisiéramos usar corchetes `[]` para acceder a las propiedades en lugar de punto `.`. Al igual que en casos anteriores, permite leer de forma segura una propiedad de un objeto que puede no existir.

```js run
let user1 = {
  firstName: "John"
};

let user2 = null; // Imagine, no podríamos autorizar al usuario

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

También podemos usar `?.` con `delete`:

```js run
delete user?.name; // Eliminar user.name si el usuario existe
```

```warn header="Podemos usar `?.` para una lectura y eliminación segura, pero no para escribir"
El encadenamiento opcional `?.` no tiene uso en el lado izquierdo de una tarea:

Por ejemplo:
```js run
// la idea del siguiente código es escribir user.name, si el usuario existe

user?.name = "John"; // Error, no funciona
// porque se evalúa como undefined = "John"
```

## Resumen

La sintaxis `?.` tiene tres formas:

1. `obj?.prop` -- devuelve `obj.prop` si `obj` existe, si no, `undefined`.
2. `obj?.[prop]` -- devuelve `obj[prop]` si `obj` existe, si no, `undefined`.
3. `obj?.method()` -- llama a `obj.method()` si `obj` existe, si no devuelve `undefined`.

Como podemos ver, todos ellos son sencillos y fáciles de usar. El `?.` comprueba la parte izquierda para `null/undefined` y permite que la evaluación continúe si no es así.

Una cadena de `?.` permite acceder de forma segura a las propiedades anidadas.

Aún así, debemos aplicar `?.` con cuidado, solo donde está bien que la parte izquierda no exista.

Para que no nos oculte errores de programación, si ocurren.
