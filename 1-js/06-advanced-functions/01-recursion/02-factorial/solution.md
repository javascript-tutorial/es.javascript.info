Por definición, un factorial de `n!` puede ser escrito como `n * (n-1)!`.

En otras palabras, el resultado de `factorial(n)` se puede calcular como `n` multiplicado por el resultado de `factorial(n-1)`. Y la llamada de `n-1` puede descender recursivamente más y más hasta `1`.

```js run
function factorial(n) {
  return (n != 1) ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```

La base de la recursividad es el valor `1`. También podemos hacer `0` la base aquí, no tiene mucha importancia, pero da un paso recursivo más:

```js run
function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

alert( factorial(5) ); // 120
```
