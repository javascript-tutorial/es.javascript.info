La repuesta: primero `1`, después `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

Una llamada a `alert` no retorna un valor relevante. Siempre retorna `undefined`.

1. El primer OR `||` comienza evaluando el operando de la izquierda `alert(1)`. Este alert muestra el primer mensaje con `1`.
2. Ese mismo `alert` retorna `undefined`, por lo que OR se dirige al segundo operando buscando un valor truthy.
3. El segundo operando `2` es un valor truthy, por lo que el OR detiene su ejecución y retorna el 2. Este 2 es luego mostrado por el alert exterior.

No habrá `3` debido a que la evaluación nunca alcanza a `alert(3)`.
