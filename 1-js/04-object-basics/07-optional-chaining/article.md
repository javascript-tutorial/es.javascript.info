
# Encadenamiento opcional '?.'

[recent browser="new"]

El encadenamiento opcional `?.` es una forma a prueba de errores para acceder a las propiedades anidadas de los objetos, incluso si no existe una propiedad intermedia.

## El problema de la propiedad que no existe

Si acaba de comenzar a leer el tutorial y aprender JavaScript, quizás el problema aún no lo haya tocado, pero es bastante común.

<<<<<<< HEAD
Por ejemplo, algunos de nuestros usuarios tienen direcciones, pero pocos no las proporcionaron. Entonces no podemos leer con seguridad `user.address.street`:
=======
As an example, let's say we have `user` objects that hold the information about our users.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

En tal cao, cuando intentamos obtener `user.address.street`, obtendremos un error:

```js run
let user = {}; // usuario sin propiedad "address"

alert(user.address.street); // Error!
```

<<<<<<< HEAD
Este es el resultado esperado, JavaScript funciona así, pero en muchos casos prácticos preferiríamos obtener `undefined` en lugar del error (sin "street").
=======
That's the expected result. JavaScript works like this. As `user.address` is `undefined`, an attempt to get `user.address.street` fails with an error.

In many practical cases we'd prefer to get `undefined` instead of an error here (meaning "no street").
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

...Y otro ejemplo.  En el desarrollo web, necesitamos obtener información sobre un elemento en la página, pero a veces este no existe:

```js run
// Error si el resultado de querySelector (...) es null
let html = document.querySelector('.my-element').innerHTML;
```

Antes de que apareciera `?.` en el lenguaje, se usaba el operador `&&` para solucionarlo.

<<<<<<< HEAD
Por ejemplo:
=======
```js
let user = {}; // user has no address

alert(user.address ? user.address.street ? user.address.street.name : null : null);
```

That's just awful, one may even have problems understanding such code.

Don't even care to, as there's a better way to write it, using the `&&` operator:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js run
let user = {}; // El usuario no tiene dirección

alert( user.address && user.address.street && user.address.street.name ); // undefined (no error)
```

Poniendo AND en el camino completo a la propiedad asegura que todos los componentes existen (si no, la evaluación se detiene), pero es engorroso de escribir.

## Encadenamiento opcional

El encadenamiento opcional `?.` detiene la evaluación y devuelve` undefined` si la parte anterior a `?.` es` undefined` o `null`.

**De aquí en adelante en este artículo, por brevedad, diremos que algo "existe" si no es `null` o `undefined`.**

Aquí está la forma segura de acceder a `user.address.street`:

```js run
let user = {}; // El usuario no tiene dirección

alert( user?.address?.street ); // undefined (no hay error)
```

Leer la dirección con `user? .Address` funciona incluso si el objeto `user` no existe:

```js run
let user = null;

alert( user?.address ); // undefined
alert( user?.address.street ); // undefined
```

Tenga en cuenta: la sintaxis `?.` hace opcional el valor delante de él, pero no más allá.

En el ejemplo anterior, `user?.` permite que solo `user` sea `null/undefined`.

Por otro lado, si `user` existe, entonces debe tener la propiedad `user.address`, de lo contrario `user?.Address.street` da un error en el segundo punto.

```warn header="No abuses del encadenamiento opcional"
Deberíamos usar `?.` solo donde está bien que algo no exista.

Por ejemplo, si de acuerdo con nuestra lógica de codificación, el objeto `user` debe estar allí, pero `address` es opcional, entonces `user.address?.Street` sería mejor.

Entonces, si `user` no está definido debido a un error, lo sabremos y lo arreglaremos. De lo contrario, los errores de codificación pueden silenciarse donde no sea apropiado y volverse más difíciles de depurar.
```

````warn header="La variable antes de `?.` debe declararse"
Si no hay una variable `user` declarada, entonces `user?.anything` provocará un error:

```js run
// ReferenceError: user no está definido
user?.address;
```
Debe haber `let/const/var user`. El encadenamiento opcional solo funciona para variables declaradas.
````

## Short-circuiting (Cortocircuitos)

Como se dijo antes, el `?.` detiene inmediatamente ("cotocircuito") la evaluación si la parte izquierda no existe.

Entonces, si hay más llamadas a funciones o efectos secundarios, estos no suceden:

Por ejemplo:

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // no hay "sayHi", por lo que la ejecución no alcanza a x++

alert(x); // 0, el valor no se incrementa
```

## Otros casos: ?.(), ?.[]

El encadenamiento opcional `?.` no es un operador, sino una construcción de sintaxis especial, que también funciona con funciones y corchetes.

Por ejemplo, `?.()` Se usa para llamar a una función que puede no existir.

En el siguiente código, algunos de nuestros usuarios tienen el método `admin`, y otros no:

```js run
let userAdmin = {
  admin() {
    alert("I am admin");
  }
};

let userGuest = {};

*!*
userAdmin.admin?.(); // I am admin
*/!*

*!*
userGuest.admin?.(); // nothing (no such method)
*/!*
```

Aquí, en ambas líneas, primero usamos el punto `.` para obtener la propiedad `admin`, porque el objeto usuario debe existir, por lo que es seguro leerlo.

Entonces `?.()` Comprueba la parte izquierda: si la función admin existe, entonces se ejecuta (para `user1`). De lo contrario (para `user2`) la evaluación se detiene sin errores.

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

````warn header="Podemos usar `?.` para una lectura y eliminación segura, pero no para escribir"
El encadenamiento opcional `?.` no tiene uso en el lado izquierdo de una tarea:

Por ejemplo:
```js run
let user = null;

user?.name = "John"; // Error, no funciona
// porque se evalúa como undefined = "John"
```

Pues no es tan inteligente
````

## Resumen

La sintaxis de encadenamiento opcional `?.` tiene tres formas:

1. `obj?.prop` -- devuelve `obj.prop` si `obj` existe, si no, `undefined`.
2. `obj?.[prop]` -- devuelve `obj[prop]` si `obj` existe, si no, `undefined`.
3. `obj.method?.()` -- llama a `obj.method()` si `obj.method` existe, si no devuelve `undefined`.

Como podemos ver, todos ellos son sencillos y fáciles de usar. El `?.` comprueba si la parte izquierda es `null/undefined` y permite que la evaluación continúe si no es así.

Una cadena de `?.` permite acceder de forma segura a las propiedades anidadas.

Aún así, debemos aplicar `?.` con cuidado, solo donde está bien que la parte izquierda no exista. Para que no nos oculte errores de programación, si ocurren.
