Hay muchos algoritmos para esta tarea.

Vamos a usar un bucle anidado.

```js
Por cada i en el intervalo {
  comprobar si i tiene un divisor en 1..i
  si sí => el valor no es un primo
  si no => el valor es un primo, enséñalo
}
```
El codigo usando una etiqueta:

```js run
let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // por cada i...

  for (let j = 2; j < i; j++) { // buscar por un divisor..
    if (i % j == 0) continue nextPrime; // no es un primo, ir al proximo i
  }

  alert( i ); // un primo
}
```

Hay un monton de espacio para optimizarlo. Por ejemplo, podriamos buscar por divisores desde `2` hasta la raíz cuadrada de `i`. Pero de todas formas, si queremos ser realmente eficientes para intervalos grandes, tenemos que cambiar el enfoque y confiar en matemáticas avanzadas y algoritmos complejos como [Criba cuadrática](https://es.wikipedia.org/wiki/Criba_cuadr%C3%A1tica), [Criba general del cuerpo de números](https://es.wikipedia.org/wiki/Criba_general_del_cuerpo_de_n%C3%BAmeros) etc.
