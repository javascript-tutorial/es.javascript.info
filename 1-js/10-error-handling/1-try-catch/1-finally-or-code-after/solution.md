La diferencia se hace evidente cuando miramos el código dentro de una función.

<<<<<<< HEAD
El comportamiento es diferente si hay un "salto fuera" de `try..catch`.

Por ejemplo, cuando hay un `return` en el interior de `try..catch`. La cláusula `finally` funciona en el caso de *cualquier* salida de  `try..catch`, incluso a través de la declaración `return`: justo después de que `try..catch` haya terminado, pero antes de que el código de llamada obtenga el control.
=======
The behavior is different if there's a "jump out" of `try...catch`.

For instance, when there's a `return` inside `try...catch`. The `finally` clause works in case of *any* exit from `try...catch`, even via the `return` statement: right after `try...catch` is done, but before the calling code gets the control.
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69

```js run
function f() {
  try {
    alert('inicio');
*!*
    return "resultado";
*/!*
  } catch (err) {
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
<<<<<<< HEAD
    alert('inicio');
    throw new Error("un error");
  } catch (e) {
=======
    alert('start');
    throw new Error("an error");
  } catch (err) {
>>>>>>> e01998baf8f85d9d6cef9f1add6c81b901f16d69
    // ...
    if("no puede manejar el error") {
*!*
      throw err;
*/!*
    }

  } finally {
    alert('limpieza!')
  }
}

f(); // limpieza!
```

Es "finally" el que garantiza la limpieza aquí. Si acabamos de poner el código al final de `f`, no se ejecutará en estas situaciones.
