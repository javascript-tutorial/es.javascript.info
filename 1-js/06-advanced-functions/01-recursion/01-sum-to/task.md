importance: 5

---

# Suma todos los números hasta el elegido

Escribe una función `sumTo(n)` que calcule la suma de los números `1 + 2 + ... + n`.

Por ejemplo:

```js no-beautify
sumTo(1) = 1
sumTo(2) = 2 + 1 = 3
sumTo(3) = 3 + 2 + 1 = 6
sumTo(4) = 4 + 3 + 2 + 1 = 10
...
sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
```

Escribe 3 soluciones diferentes:

1. Utilizando un bucle `for`.
2. Usando la recursividad, pues `sumTo(n) = n + sumTo(n-1)` para `n > 1`.
3. Utilizando la fórmula de [progresión aritmética](https://es.wikipedia.org/wiki/Progresi%C3%B3n_aritm%C3%A9tica).

Un ejemplo del resultado:

```js
function sumTo(n) { /*... tu código ... */ }

alert( sumTo(100) ); // 5050
```

P.D. ¿Qué variante de la solución es la más rápida? ¿Y la más lenta? ¿Por qué?

P.P.D. ¿Podemos usar la recursión para contar `sumTo(100000)`?
