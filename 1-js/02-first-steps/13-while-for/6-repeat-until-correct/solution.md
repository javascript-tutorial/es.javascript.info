
```js run demo
let num;

do {
  num = prompt("Ingresa un número mayor a 100", 0);
} while (num <= 100 && num);
```

El bucle `do..while` se repite mientras ambas condiciones sean verdaderas:

1. La condición `num <= 100` -- eso es, el valor ingresado aún no es mayor que `100`.
2. La condición `&& num` -- es falsa cuando `num` es `null` o una cadena de texto vaciá. Entonces el bucle `while` se detiene.

PD. Si `num` es `null` entonces `num <= 100` es `true`, así que sin la segunda condición el bucle no se detendría si el usuario hace click en CANCELAR. Ambas comprobaciones son requeridas.
