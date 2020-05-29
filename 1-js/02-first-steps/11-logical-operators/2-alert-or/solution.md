La repuesta: primero `1`, después `2`.

```js run
alert( alert(1) || 2 || alert(3) );
```

La llamada a `alert` no retorna un valor. O, en otras palabras, retorna `undefined`.

<<<<<<< HEAD
1. El primer OR `||` evalua el operando de la izquierda `alert(1)`. Eso muestra el primer mensaje con `1`.
2. El `alert` retorna `undefined`, por lo que OR se dirige al segundo operando buscando un valor verdadero.
3. El segundo operando `2` es un valor verdadero, por lo que se detiene la ejecución, se retorna `2` y es mostrado por el alert exterior.
=======
1. The first OR `||` evaluates its left operand `alert(1)`. That shows the first message with `1`.
2. The `alert` returns `undefined`, so OR goes on to the second operand searching for a truthy value.
3. The second operand `2` is truthy, so the execution is halted, `2` is returned and then shown by the outer alert.
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31

No habrá `3` debido a que la evaluación no alcanza a `alert(3)`.
