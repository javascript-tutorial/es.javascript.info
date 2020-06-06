Necesitamos hacer un "mapeo" de todos los valores del intervalo 0..1 a valores desde `min` a `max`.

Esto puede hacerse en dos pasos:

1. Si multiplicamos el número aleatorio 0..1 por `max-min`, entonces el intervalo de valores posibles va de `0..1` a `0..max-min`.
2. Ahora si sumamos `min`, el intervalo posible se vuelve desde `min` a `max`.

La función:

```js run
function random(min, max) {
  return min + Math.random() * (max - min);
}

alert( random(1, 5) ); 
alert( random(1, 5) ); 
alert( random(1, 5) ); 
```

