La primera solución que podemos probar aquí es la recursiva.

La secuencia de Fibonacci es recursiva por definición:

```js run
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
// fib(77); // ¡Será extremadamente lento!
```

...Pero para valores grandes de `n` es muy lenta. Por ejemplo, `fib(77)` puede colgar el motor durante un tiempo consumiendo todos los recursos de la CPU.

Eso es porque la función realiza demasiadas sub llamadas. Los mismos valores son evaluados una y otra vez.

Por ejemplo, veamos algunos cálculos para `fib(5)`:

```js no-beautify
...
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
...
```

Aquí podemos ver que el valor de `fib(3)` es necesario tanto para `fib(5)` y `fib(4)`. Entonces `fib(3)` será calculado y evaluado dos veces de forma completamente independiente.

Aquí está el árbol de recursividad completo:

![fibonacci recursion tree](fibonacci-recursion-tree.svg)

Podemos ver claramente que `fib(3)` es evaluado dos veces y `fib(2)` es evaluado tres veces. La cantidad total de cálculos crece mucho más rápido que `n`, lo que lo hace enorme incluso para `n=77`.

Podemos optimizarlo recordando los valores ya evaluados: si un valor de por ejemplo `fib(3)` es calculado una vez, entonces podemos reutilizarlo en cálculos futuros.

Otra variante sería renunciar a la recursión y utilizar un algoritmo basado en bucles totalmente diferente.

En lugar de ir de `n` a valores más bajos, podemos hacer un bucle que empiece desde `1` y `2`, que obtenga `fib(3)` como su suma, luego `fib(4)` como la suma de los dos valores anteriores, luego `fib(5)` y va subiendo hasta llegar al valor necesario. En cada paso solo necesitamos recordar los dos valores anteriores.

Estos son los pasos del nuevo algoritmo en detalle.

El inicio:

```js
// a = fib(1), b = fib(2), estos valores son por definición 1
let a = 1, b = 1;

// obtener c = fib(3) como su suma
let c = a + b;

/* ahora tenemos fib(1), fib(2), fib(3)
a  b  c
1, 1, 2
*/
```

Ahora queremos obtener `fib(4) = fib(2) + fib(3)`.

Cambiemos las variables: `a, b` obtendrán `fib(2),fib(3)`, y `c` obtendrá su suma:

```js no-beautify
a = b; // now a = fib(2)
b = c; // now b = fib(3)
c = a + b; // c = fib(4)

/* ahora tenemos la secuencia:
   a  b  c
1, 1, 2, 3
*/
```

El siguiente paso obtiene otro número de la secuencia:

```js no-beautify
a = b; // now a = fib(3)
b = c; // now b = fib(4)
c = a + b; // c = fib(5)

/* ahora la secuencia es (otro número más):
      a  b  c
1, 1, 2, 3, 5
*/
```

...Y así sucesivamente hasta obtener el valor necesario. Eso es mucho más rápido que la recursión y no implica cálculos duplicados.

El código completo:

```js run
function fib(n) {
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
}

alert( fib(3) ); // 2
alert( fib(7) ); // 13
alert( fib(77) ); // 5527939700884757
```

El bucle comienza con `i=3`, porque el primer y segundo valor de la secuencia están codificados en las variables `a=1` y `b=1`.

Este enfoque se llama [programación dinámica](https://es.wikipedia.org/wiki/Programaci%C3%B3n_din%C3%A1mica).
