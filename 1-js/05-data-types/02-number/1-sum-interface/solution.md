

```js run demo
let a = +prompt("¿El primer número?", "");
let b = +prompt("¿El segundo número?", "");

alert( a + b );
```

Toma nota de el más unario `+` antes del `prompt`. Este convierte inmediatamente el valor a `number`.

De otra manera `a` and `b` serían `string`, y la suma, su concatenación: `"1" + "2" = "12"`.