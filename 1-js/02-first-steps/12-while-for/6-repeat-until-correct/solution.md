
```js run demo
let num;

do {
  num = prompt("Ingresa un número mayor a 100", 0);
} while (num <= 100 && num);
```

El bucle `do..while` se repite mientras ambas comprobaciones sean valores verdaderos:

1. La comprobación para `num <= 100` -- eso es, el valor ingresado aún no es mayor que `100`.
2. La comprobación `&& num` es falsa cuando `num` es `null` o una cadena de texto vacia. Entonces el bucle `while` se detiene tambien.

PD. Si `num` es `null` entonces `num <= 100` es `true`, asi que sin la segunda comprabación el bucle no se detendria si el usuario hace click en CANCELAR. Ambas comprobaciones son requreridas.
