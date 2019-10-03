

```js run demo
let a = +prompt("¿Primer número?", "");
let b = +prompt("¿Segundo número?", "");

alert( a + b );
```

Observa el más unario `+` antes del `prompt`. Este de inmediato convierte el valor a número.

De otra manera, `a` and `b` serían string y la suma su concatenación: `"1" + "2" = "12"`.