
El resultado es: **error**.

Intenta correr esto:

```js run
let x = 1;

function func() {
*!*
  console.log(x); // ReferenceError: No se puede acceder a 'x' antes de la inicialización
*/!*
  let x = 2;
}
func();
```

En este ejemplo podemos observar la diferencia peculiar entre una variable "no existente" y una variable "no inicializada".

Como habrás leído en el artículo [](info:closure), una variable comienza en el estado "no inicializado" desde el momento en que la ejecución entra en un bloque de código (o una función). Y permanece sin inicializar hasta la correspondiente declaración `let`.

En otras palabras, una variable técnicamente existe, pero no se puede usar antes de `let`.

El código anterior lo demuestra.

```js
function func() {
*!*
<<<<<<< HEAD

// la variable local x es conocida por el motor desde el comienzo de la función,
// pero "unitialized" (inutilizable) hasta let ("zona muerta")
// de ahí el error
=======
  // the local variable x is known to the engine from the beginning of the function,
  // but "uninitialized" (unusable) until let ("dead zone")
  // hence the error
>>>>>>> 6ab384f2512902d74e4b0ff5a6be60e48ab52e96
*/!*

  console.log(x); // ReferenceError: No se puede acceder a 'x' antes de la inicialización

  let x = 2;
}
```

Esta zona de inutilización temporal de una variable (desde el comienzo del bloque de código hasta `let`) a veces se denomina" zona muerta ".

