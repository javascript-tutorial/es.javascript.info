Hay muchos algoritmos para esta tarea.

Usemos un bucle anidado.

```js
Por cada i en el intervalo {
  comprobar si i tiene un divisor en 1..i
  si tiene => el valor no es un primo
  si no => el valor es un primo, mostrarlo
}
```
El código usando una etiqueta:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // por cada i...

  for (let j = 2; j < i; j++) { // buscar un divisor..
    if (i % j == 0) continue nextPrime; // no es primo, ir al próximo i
  }

  alert( i ); // primo
}
```

<<<<<<< HEAD
Hay mucho lugar para la mejora. Por ejemplo, podríamos buscar por divisores desde `2` hasta la raíz cuadrada de `i`. Pero de todas formas, si queremos ser realmente eficientes para intervalos grandes, necesitamos cambiar el enfoque y confiar en matemáticas avanzadas y algoritmos complejos como [Criba cuadrática](https://es.wikipedia.org/wiki/Criba_cuadr%C3%A1tica), [Criba general del cuerpo de números](https://es.wikipedia.org/wiki/Criba_general_del_cuerpo_de_n%C3%BAmeros) etc.
=======
There's a lot of space to optimize it. For instance, we could look for the divisors from `2` to square root of `i`. But anyway, if we want to be really efficient for large intervals, we need to change the approach and rely on advanced maths and complex algorithms like [Quadratic sieve](https://en.wikipedia.org/wiki/Quadratic_sieve), [General number field sieve](https://en.wikipedia.org/wiki/General_number_field_sieve) etc.
>>>>>>> e92bb83e995dfea982dcdc5065036646bfca13f0
