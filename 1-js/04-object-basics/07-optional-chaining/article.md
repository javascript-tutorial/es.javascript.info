
# Encadenamiento opcional '?.'

[recent browser="new"]

El encadenamiento opcional `?.` es una forma a prueba de errores para acceder a las propiedades de los objetos anidados, incluso si no existe una propiedad intermedia.

## El problema

Si acaba de comenzar a leer el tutorial y aprender JavaScript, quizás el problema aún no lo haya tocado, pero es bastante común.

Por ejemplo, algunos de nuestros usuarios tienen direcciones, pero pocos no las proporcionaron. Entonces no podemos leer con seguridad `user.address.street`:

```js run
let user = {}; // el usuario pasa a estar sin dirección

alert(user.address.street); // Error!
```

O, en el desarrollo web, nos gustaría obtener información sobre un elemento en la página, pero puede no existir:

```js run
// Error si el resultado de querySelector (...) es nulo
let html = document.querySelector('.my-element').innerHTML;
```

Antes de que apareciera `?.` en el lenguaje, el operador `&&` se usaba para solucionarlo.

Por ejemplo:

```js run
let user = {}; // El usuario no tiene dirección

alert( user && user.address && user.address.street ); // undefined (no error)
```

Y el camino completo a la propiedad asegura que todos los componentes existen, pero es engorroso de escribir.

## Encadenamiento opcional

El encadenamiento opcional `?.` detiene la evaluación y devuelve` undefined` si la parte anterior a `?.` es` undefined` o `null`.

Más adelante en este artículo, por brevedad, diremos que algo "existe" si no es `null` ni `undefined`.


Aquí está la forma segura de acceder a `user.address.street`:

```js run
let user = {}; // El usuario no tiene dirección

alert( user?.address?.street ); // undefined (no error)
```

Leer la dirección con `user? .Address` funciona incluso si el objeto `user` no existe:

```js run
let user = null;

alert( user?.address ); // undefined

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

````warn header="La variable antes de `?.` debe existir"
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

```js run
let user = null;
let x = 0;

user?.sayHi(x++); // no pasa nada

alert(x); // 0, el valor no se incrementa
```

## Otros casos: ?.(), ?.[ ]

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

La sintaxis `?.[]` también funciona, si nos gustaría usar corchetes `[]` para acceder a las propiedades en lugar de punto `.`. Al igual que en casos anteriores, permite leer de forma segura una propiedad de un objeto que puede no existir.

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

```js run
// la idea del siguiente código es escribir user.name, si el usuario existe

user?.name = "John"; // Error, no funciona
// porque se evalúa como undefined = "John"
```

## Resumen

La sintaxis `?.` tiene tres formas:

1. `obj?.prop` -- devuelve `obj.prop` si `obj` existe, sino `undefined`.
2. `obj?.[prop]` -- devuelve `obj[prop]` si `obj` existe, sino `undefined`.
3. `obj?.method()` -- llama a `obj.method()` si `obj` existe, sino devuelve `undefined`.

Como podemos ver, todos ellos son sencillos y fáciles de usar. El `?.` comprueba la parte izquierda para `null/undefined` y permite que la evaluación continúe si no es así.

Una cadena de `?.` permite acceder de forma segura a las propiedades anidadas.

Aún así, debemos aplicar `?.` con cuidado, solo donde está bien que la parte izquierda no exista.

Para que no nos oculte errores de programación, si ocurren.
