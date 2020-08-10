<<<<<<< HEAD
Usemos `eval` para calcular la expresión matemática:

```js demo run
let expr = prompt("Escribe una expresión matemática:", '2*3+2');
=======
Let's use `eval` to calculate the maths expression:

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

alert( eval(expr) );
```

<<<<<<< HEAD
Aunque el usuario puede ingresar cualquier texto o código.

Para hacer las cosas seguras, y limitarlo a aritmética solamente, podemos verificar `expr` usando una [expresión regular](info:regular-expressions) que solo pueda contener dígitos y operadores.
=======
The user can input any text or code though.

To make things safe, and limit it to arithmetics only, we can check the `expr` using a [regular expression](info:regular-expressions), so that it only may contain digits and operators.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
