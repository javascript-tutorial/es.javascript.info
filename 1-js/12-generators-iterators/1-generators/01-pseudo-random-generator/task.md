
# Generador pseudoaleatorio

Hay muchas áreas en las que necesitamos datos aleatorios.

Uno de ellos es para testeo. Es posible que necesitemos datos aleatorios: texto, números, etc. para probar bien las cosas.

En JavaScript, podríamos usar `Math.random()`. Pero si algo sale mal, nos gustaría poder repetir la prueba utilizando exactamente los mismos datos.

Para eso, se utilizan los denominados "generadores pseudoaleatorios con semilla". Toman una "semilla" como primer valor, y luego generan los siguientes utilizando una fórmula; a partir de la misma semilla se produce la misma secuencia y así todo el flujo es fácilmente reproducible. Solo necesitamos recordar la semilla para repetirla.

Un ejemplo de dicha fórmula, que genera valores distribuidos de manera algo uniforme:

```
next = previous * 16807 % 2147483647
```

Si nosotros usamos `1` como semilla, los valores serán:
1. `16807`
2. `282475249`
3. `1622650073`
4. ...y así...

La tarea es crear una función generadora `pseudoRandom (seed)` que toma `seed` y crea el generador con esta fórmula.

Ejemplo de uso

```js
let generator = pseudoRandom(1);

alert(generator.next().value); // 16807
alert(generator.next().value); // 282475249
alert(generator.next().value); // 1622650073
```
