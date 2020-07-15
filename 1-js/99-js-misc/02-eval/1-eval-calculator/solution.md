Usemos `eval` para calcular la expresión matemática:

```js demo run
let expr = prompt("Escribe una expresión matemática:", '2*3+2');

alert( eval(expr) );
```

Aunque el usuario puede ingresar cualquier texto o código.

Para hacer las cosas seguras, y limitarlo a aritmética solamente, podemos verificar `expr` usando una [expresión regular](info:regular-expressions) que solo pueda contener dígitos y operadores.
