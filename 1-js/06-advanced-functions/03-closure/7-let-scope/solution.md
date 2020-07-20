<<<<<<< HEAD

El resultado es: **error**.

Intenta correr esto:
=======
The result is: **error**.

Try running it:
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
let x = 1;

function func() {
*!*
<<<<<<< HEAD
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
=======
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
*/!*
  let x = 2;
}

func();
```

In this example we can observe the peculiar difference between a "non-existing" and "uninitialized" variable.

As you may have read in the article [](info:closure), a variable starts in the "uninitialized" state from the moment when the execution enters a code block (or a function). And it stays uninitalized until the corresponding `let` statement.

In other words, a variable technically exists, but can't be used before `let`.

The code above demonstrates it.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js
function func() {
*!*
<<<<<<< HEAD

// la variable local x es conocida por el motor desde el comienzo de la función,
// pero "unitialized" (inutilizable) hasta let ("zona muerta")
// de ahí el error
*/!*

  console.log(x); // ReferenceError: No se puede acceder a 'x' antes de la inicialización
=======
  // the local variable x is known to the engine from the beginning of the function,
  // but "unitialized" (unusable) until let ("dead zone")
  // hence the error
*/!*

  console.log(x); // ReferenceError: Cannot access 'x' before initialization
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

  let x = 2;
}
```

<<<<<<< HEAD
Esta zona de inutilización temporal de una variable (desde el comienzo del bloque de código hasta `let`) a veces se denomina" zona muerta ".

=======
This zone of temporary unusability of a variable (from the beginning of the code block till `let`) is sometimes called the "dead zone".
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
