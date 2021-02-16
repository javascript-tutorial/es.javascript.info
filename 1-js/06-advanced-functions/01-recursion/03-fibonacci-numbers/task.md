importance: 5

---

# Sucesión de Fibonacci

La secuencia de [sucesión de Fibonacci](https://es.wikipedia.org/wiki/Sucesi%C3%B3n_de_Fibonacci) tiene la fórmula <code>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></code>. En otras palabras, el siguiente número es una suma de los dos anteriores.

Los dos primeros números son `1`, luego `2(1+1)`, luego `3(1+2)`, `5(2+3)` y así sucesivamente: `1, 1, 2, 3, 5, 8, 13, 21...`.

La sucesión de Fibonacci está relacionada la [proporción áurea](https://es.wikipedia.org/wiki/N%C3%BAmero_%C3%A1ureo) y muchos fenómenos naturales alrededor nuestro.

Escribe una función `fib(n)` que devuelve la secuencia `n-th` de Fibonacci.

Un ejemplo de trabajo:

```js
function fib(n) { /* your code */ }

alert(fib(3)); // 2
alert(fib(7)); // 13
alert(fib(77)); // 5527939700884757
```

P.D. La función debería ser rápida. La llamada a `fib(77)` no debería tardar más de una fracción de segundo.
