
<<<<<<< HEAD
# Encadenamiento opcional '?.'

[recent browser="new"]

El encadenamiento opcional `?.` es una forma a prueba de errores para acceder a las propiedades de los objetos anidados, incluso si no existe una propiedad intermedia.

## El problema

Si acaba de comenzar a leer el tutorial y aprender JavaScript, quizás el problema aún no lo haya tocado, pero es bastante común.

Por ejemplo, algunos de nuestros usuarios tienen direcciones, pero pocos no las proporcionaron. Entonces no podemos leer con seguridad `user.address.street`:

```js run
let user = {}; // usuario sin dirección
=======
# Optional chaining '?.'

[recent browser="new"]

The optional chaining `?.` is an error-proof way to access nested object properties, even if an intermediate property doesn't exist.

## The problem

If you've just started to read the tutorial and learn JavaScript, maybe the problem hasn't touched you yet, but it's quite common.

For example, some of our users have addresses, but few did not provide them. Then we can't safely read `user.address.street`:

```js run
let user = {}; // the user happens to be without address
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

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

```js run
let user = {}; // El usuario no tiene dirección
=======
Or, in the web development, we'd like to get an information about an element on the page, but it may not exist:

```js run
// Error if the result of querySelector(...) is null
let html = document.querySelector('.my-element').innerHTML;
```

Before `?.` appeared in the language, the `&&` operator was used to work around that.

For example:

```js run
let user = {}; // user has no address
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

alert( user && user.address && user.address.street ); // undefined (no error)
```

<<<<<<< HEAD
Y el camino completo a la propiedad asegura que todos los componentes existen, pero es engorroso de escribir.

## Encadenamiento opcional

El encadenamiento opcional `?.` detiene la evaluación y devuelve` undefined` si la parte anterior a `?.` es` undefined` o `null`.

Más adelante en este artículo, por brevedad, diremos que algo "existe" si no es `null` ni `undefined`.


Aquí está la forma segura de acceder a `user.address.street`:

```js run
let user = {}; // El usuario no tiene dirección
=======
AND'ing the whole path to the property ensures that all components exist, but is cumbersome to write.

## Optional chaining

The optional chaining `?.` stops the evaluation and returns `undefined` if the part before `?.` is `undefined` or `null`.

**Further in this article, for brevity, we'll be saying that something "exists" if it's not `null` and not `undefined`.**

Here's the safe way to access `user.address.street`:

```js run
let user = {}; // user has no address
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

alert( user?.address?.street ); // undefined (no error)
```

<<<<<<< HEAD
Leer la dirección con `user? .Address` funciona incluso si el objeto `user` no existe:
=======
Reading the address with `user?.address` works even if `user` object doesn't exist:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let user = null;

alert( user?.address ); // undefined
<<<<<<< HEAD

alert( user?.address.street ); // undefined
alert( user?.address.street.anything ); // undefined
```

Tenga en cuenta: la sintaxis `?.` funciona exactamente donde está colocada, nada más.

En las últimas dos líneas, la evaluación se detiene inmediatamente después de `user?.`, sin acceder nunca a otras propiedades. Pero si `user` realmente existe, entonces las propiedades intermedias adicionales, como `user.address`deben existir.

```warn header="No abuses del encadenamiento opcional"
Deberíamos usar `?.` solo donde está bien que algo no exista.

Por ejemplo, si de acuerdo con nuestra lógica de codificación, el objeto `user` debe estar allí, pero `address` es opcional, entonces `user.address?.Street` sería mejor.

Entonces, si `user` no está definido debido a un error, lo sabremos y lo arreglaremos. De lo contrario, los errores de codificación pueden silenciarse donde no sea apropiado y volverse más difíciles de depurar.
```

````warn header="La variable antes de ?. debe existir"
Si no hay una variable `user`, entonces `user? .Anything` provocará un error:

```js run
// ReferenceError: El usuario no está definido
user?.address;
```
El encadenamiento opcional solo prueba para `null/undefined`, no interfiere con ninguna otra mecánica del lenguaje.
````

## Short-circuiting (Cortocircuitos)

Como se dijo antes, el `?.` detiene inmediatamente ("cotocircuito") la evaluación si la parte izquierda no existe.

Entonces, si hay más llamadas a funciones o efectos secundarios, estos no suceden:
=======
alert( user?.address.street ); // undefined
```

Please note: the `?.` syntax makes optional the value before it, but not any further.

In the example above, `user?.` allows only `user` to be `null/undefined`.

On the other hand, if `user` does exist, then it must have `user.address` property, otherwise `user?.address.street` gives an error at the second dot.

```warn header="Don't overuse the optional chaining"
We should use `?.` only where it's ok that something doesn't exist.

For example, if according to our coding logic `user` object must be there, but `address` is optional, then `user.address?.street` would be better.

So, if `user` happens to be undefined due to a mistake, we'll know about it and fix it. Otherwise, coding errors can be silenced where not appropriate, and become more difficult to debug.
```

````warn header="The variable before `?.` must be declared"
If there's no variable `user` at all, then `user?.anything` triggers an error:

```js run
// ReferenceError: user is not defined
user?.address;
```
There must be `let/const/var user`. The optional chaining works only for declared variables. 
````

## Short-circuiting

As it was said before, the `?.` immediately stops ("short-circuits") the evaluation if the left part doesn't exist.

So, if there are any further function calls or side effects, they don't occur:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let user = null;
let x = 0;

<<<<<<< HEAD
user?.sayHi(x++); // no pasa nada

alert(x); // 0, el valor no se incrementa
```

## Otros casos: ?.(), ?.[]

El encadenamiento opcional `?.` no es un operador, sino una construcción de sintaxis especial, que también funciona con funciones y corchetes.

Por ejemplo, `?.()` Se usa para llamar a una función que puede no existir.

En el siguiente código, algunos de nuestros usuarios tienen el método `admin`, y otros no:
=======
user?.sayHi(x++); // nothing happens

alert(x); // 0, value not incremented
```

## Other cases: ?.(), ?.[]

The optional chaining `?.` is not an operator, but a special syntax construct, that also works with functions and square brackets.

For example, `?.()` is used to call a function that may not exist.

In the code below, some of our users have `admin` method, and some don't:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

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

<<<<<<< HEAD
Aquí, en ambas líneas, primero usamos el punto `.` para obtener la propiedad `admin`, porque el objeto usuario debe existir, por lo que es seguro leerlo.

Entonces `?.()` Comprueba la parte izquierda: si el usuario existe, entonces se ejecuta (para `user1`). De lo contrario (para `user2`) la evaluación se detiene sin errores.

La sintaxis `?.[]` también funciona si quisiéramos usar corchetes `[]` para acceder a las propiedades en lugar de punto `.`. Al igual que en casos anteriores, permite leer de forma segura una propiedad de un objeto que puede no existir.
=======
Here, in both lines we first use the dot `.` to get `admin` property, because the user object must exist, so it's safe read from it.

Then `?.()` checks the left part: if the admin function exists, then it runs (for `user1`). Otherwise (for `user2`) the evaluation stops without errors.

The `?.[]` syntax also works, if we'd like to use brackets `[]` to access properties instead of dot `.`. Similar to previous cases, it allows to safely read a property from an object that may not exist.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let user1 = {
  firstName: "John"
};

<<<<<<< HEAD
let user2 = null; // Imagine, no podríamos autorizar al usuario
=======
let user2 = null; // Imagine, we couldn't authorize the user
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

let key = "firstName";

alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined

alert( user1?.[key]?.something?.not?.existing); // undefined
```

<<<<<<< HEAD
También podemos usar `?.` con `delete`:

```js run
delete user?.name; // Eliminar user.name si el usuario existe
```

```warn header="Podemos usar `?.` para una lectura y eliminación segura, pero no para escribir"
El encadenamiento opcional `?.` no tiene uso en el lado izquierdo de una tarea:

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
=======
Also we can use `?.` with `delete`:

```js run
delete user?.name; // delete user.name if user exists
```

```warn header="We can use `?.` for safe reading and deleting, but not writing"
The optional chaining `?.` has no use at the left side of an assignment:

```js run
// the idea of the code below is to write user.name, if user exists

user?.name = "John"; // Error, doesn't work
// because it evaluates to undefined = "John"
```

## Summary

The `?.` syntax has three forms:

1. `obj?.prop` -- returns `obj.prop` if `obj` exists, otherwise `undefined`.
2. `obj?.[prop]` -- returns `obj[prop]` if `obj` exists, otherwise `undefined`.
3. `obj?.method()` -- calls `obj.method()` if `obj` exists, otherwise returns `undefined`.

As we can see, all of them are straightforward and simple to use. The `?.` checks the left part for `null/undefined` and allows the evaluation to proceed if it's not so.

A chain of `?.` allows to safely access nested properties.

Still, we should apply `?.` carefully, only where it's ok that the left part doesn't to exist.

So that it won't hide programming errors from us, if they occur.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
