
```js run demo
let num;

do {
  num = prompt("Ingresa un número mayor a 100", 0);
} while (num <= 100 && num);
```

El bucle `do..while` se repite mientras ambas condiciones sean verdaderas:

<<<<<<< HEAD
1. La condición `num <= 100` -- eso es, el valor ingresado aún no es mayor que `100`.
2. La condición `&& num` -- es falsa cuando `num` es `null` o una cadena de texto vaciá. Entonces el bucle `while` se detiene.
=======
1. The check for `num <= 100` -- that is, the entered value is still not greater than `100`.
2. The check `&& num` is false when `num` is `null` or an empty string. Then the `while` loop stops too.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

PD. Si `num` es `null` entonces `num <= 100` es `true`, así que sin la segunda condición el bucle no se detendría si el usuario hace click en CANCELAR. Ambas comprobaciones son requeridas.
