<<<<<<< HEAD
Usemos `eval` para calcular la expresión matemática:

```js demo run
let expr = prompt("Escribe una expresión matemática:", '2*3+2');
=======
Let's use `eval` to calculate the maths expression:

```js demo run
let expr = prompt("Type an arithmetic expression?", '2*3+2');
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

alert( eval(expr) );
```

<<<<<<< HEAD
Aunque el usuario puede ingresar cualquier texto o código.

Para hacer las cosas seguras, y limitarlo a aritmética solamente, podemos verificar `expr` usando una [expresión regular](info:regular-expressions) que solo pueda contener dígitos y operadores.
=======
The user can input any text or code though.

To make things safe, and limit it to arithmetics only, we can check the `expr` using a [regular expression](info:regular-expressions), so that it only may contain digits and operators.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
