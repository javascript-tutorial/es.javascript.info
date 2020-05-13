La respuesta corta es: **no, no son iguales**:

La diferencia es que si ocurre un error en `f1`, entonces es manejado por `.catch` aquí:

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
