La repuesta: primero `1`, y entonces `2`.

```js run
alert(alert(1) || 2 || alert(3));
```

La llamada a `alert` no retorna un valor. O, en otras palabras, retorna `undefined`.

1. El primer OR `||` evaluá su operando a la izquierda `alert(1)`. Eso muestra el primer mensaje con `1`.
2. El `alert` retorna `undefined`, asi que OR va hacia el segundo operando buscando un valor verdadero.
3. El segundo operando `2` es un valor verdadero, asi que la ejecución es detenida, `2` es retornado y mostrado por la alerta exterior.

No va a haber `3`, porque la evaluación no alcanza a `alert(3)`.
