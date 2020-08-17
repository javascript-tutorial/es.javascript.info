La diferencia se hace evidente cuando miramos el código dentro de una función.

El comportamiento es diferente si hay un "salto fuera" de `try..catch`.

Por ejemplo, cuando hay un `return` en el interior de `try..catch`. La cláusula `finally` funciona en el caso de *cualquier* salida de  `try..catch`, incluso a través de la declaración `return`: justo después de que `try..catch` haya terminado, pero antes de que el código de llamada obtenga el control.

```js run
function f() {
  try {
    alert('inicio');
*!*
    return "resultado";
*/!*
  } catch (e) {
    /// ...
  } finally {
    alert('limpieza!');
  }
}

f(); // limpieza!
```

... O cuando hay un `throw` (lanzamiento de excepción), como aquí:

```js run
function f() {
  try {
    alert('inicio');
    throw new Error("un error");
  } catch (e) {
    // ...
    if("no puede manejar el error") {
*!*
      throw e;
*/!*
    }

  } finally {
    alert('limpieza!')
  }
}

f(); // limpieza!
```

<<<<<<< HEAD
Es "finally" el que garantiza la limpieza aquí. Si acabamos de poner el código al final de `f`, no se ejecutará en estas situaciones.
=======
It's `finally` that guarantees the cleanup here. If we just put the code at the end of `f`, it wouldn't run in these situations.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
