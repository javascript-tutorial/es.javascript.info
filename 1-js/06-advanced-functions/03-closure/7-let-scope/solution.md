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
// la variable local x es conocida por el motor desde el comienzo de la función,
// pero "unitialized" (inutilizable) hasta let ("zona muerta")
// de ahí el error
*/!*

  console.log(x); // ReferenceError: No se puede acceder a 'x' antes de la inicialización

  let x = 2;
}
```

Esta zona de inutilización temporal de una variable (desde el comienzo del bloque de código hasta `let`) a veces se denomina" zona muerta ".
