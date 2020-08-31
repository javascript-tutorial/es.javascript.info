<<<<<<< HEAD
=======
The short answer is: **no, they are not equal**:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

La respuesta corta es: **no, no son iguales**:

La diferencia es que si ocurre un error en `f1`, entonces aqui es manejado por `.catch`:

```js run
promise
  .then(f1)
  .catch(f2);
```

...Pero no aquí:

```js run
promise
  .then(f1, f2);
```

Esto se debe a que se pasa un error por la cadena y en la segunda pieza del código no hay una cadena debajo de `f1`.

En otras palabras, `.then` pasa los resultados/errores al siguiente `.then/catch`. Entonces, en el primer ejemplo, hay un `catch` debajo, y en el segundo no lo hay, por lo que el error no se maneja.

<<<<<<< HEAD
=======
In other words, `.then` passes results/errors to the next `.then/catch`. So in the first example, there's a `catch` below, and in the second one there isn't, so the error is unhandled.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
