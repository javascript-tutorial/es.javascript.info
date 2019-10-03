Necesitamos hacer un "mapeo" de todos los valores del intervalo 0..1 a valores desde `min` a `max`.

Esto puede hacerse en dos pasos:

1. Si multiplicamos el número aleatorio 0..1 por `max-min`, el intervalo de valores posibles  `0..1` se convierte a `0..max-min`.
2. Luego sumamos `min`, entonces el intervalo posible se convierte a `min..max`.

La función:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

