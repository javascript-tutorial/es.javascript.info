La solución usando un bucle:

```js run
function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

alert( sumTo(100) );
```

La solución usando recursividad:

```js run
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

alert( sumTo(100) );
```

La solución usando la fórmula: `sumTo(n) = n*(n+1)/2`:

```js run
function sumTo(n) {
  return n * (n + 1) / 2;
}

alert( sumTo(100) );
```

P.D. Naturalmente, la fórmula es la solución más rápida. Utiliza solo 3 operaciones para cualquier número `n` ¡Las matemáticas ayudan!

La variación con el bucle es la segunda en términos de velocidad. Tanto en la variante recursiva como en el bucle sumamos los mismos números. Pero la recursión implica llamadas anidadas y gestión de la pila de ejecución. Eso también requiere recursos, por lo que es más lento.

P.P.D. Algunos motores admiten la optimización de "tail call": si una llamada recursiva es la última en la función, sin cálculo extra, entonces la función externa no necesitará reanudar la ejecución, por lo que el motor no necesita recordar su contexto de ejecución. Eso elimina la carga en la memoria. Pero si el motor de JavaScript no soporta la optimización "tail call" (la mayoría no lo hace), entonces habrá  un error: tamaño máximo de la pila excedido, porque generalmente hay una limitación en el tamaño total de la pila.
