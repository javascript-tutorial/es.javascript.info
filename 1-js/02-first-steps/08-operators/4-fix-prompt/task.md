importance: 5

---

<<<<<<< HEAD
# Corregir la adición

Aquí hay un código que le pide al usuario dos números y muestra su suma.

Funciona incorrectamente. El resultado en el ejemplo a continuación es `12` (para valores de captura predeterminados).

¿Por qué? Arreglalo. El resultado debería ser `3`.

```js run
let a = prompt("Primer número?", 1);
let b = prompt("Segundo número?", 2);
=======
# Fix the addition

Here's a code that asks the user for two numbers and shows their sum.

It works incorrectly. The output in the example below is `12` (for default prompt values).

Why? Fix it. The result should be `3`.

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

alert(a + b); // 12
```
