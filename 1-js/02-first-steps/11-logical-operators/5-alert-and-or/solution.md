La respuesta: `3`.

```js run
alert( null || 2 && 3 || 4 );
```

La precedencia de AND `&&` es mayor que la de `||`, asi que se ejecuta primero.

El resultado de `2 && 3 = 3`, por lo que la expresión se convierte en:

```
null || 3 || 4
```

Ahora el resultado será el primer valor verdadero: `3`.

