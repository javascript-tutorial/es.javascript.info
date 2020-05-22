# La solución simple pero equivocada

La solución más simple, pero equivocada, sería generar un valor entre `min` y `max` y redondearlo:

```js run
function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min); 
  return Math.round(rand);
}

alert( randomInteger(1, 3) );
```

La función trabaja, pero es incorrecta. La probabilidad de obtener los valores extremos `min` y `max` es la mitad de la de los demás.

Si ejecutas el ejemplo que sigue muchas veces, fácilmente verás que `2` aparece más a menudo.

Esto ocurre porque `Math.round()` obtiene los números del intervalo `1..3` y los redondea como sigue:

```js no-beautify
valores desde 1    ... hasta 1.4999999999  se vuelven 1
valores desde 1.5  ... hasta 2.4999999999  se vuelven 2
valores desde 2.5  ... hasta 2.9999999999  se vuelven 3
```

Ahora podemos ver claramente que `1` obtiene la mitad de valores que `2`. Y lo mismo con `3`.

# La solución correcta

Hay muchas soluciones correctas para la tarea. una es ajustar los bordes del intervalo. Para asegurarse los mismos intervalos, podemos generar valores entre `0.5 a 3.5`, así sumando las probabilidades requeridas a los extremos:

```js run
*!*
function randomInteger(min, max) {
  // now rand is from  (min-0.5) to (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Una alternativa es el uso de `Math.floor` para un número aleatorio entre `min` y `max+1`:

```js run
*!*
function randomInteger(min, max) {
  // here rand is from min to (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
*/!*

alert( randomInteger(1, 3) );
```

Ahora todos los intervalos son mapeados de esta forma:

```js no-beautify
valores desde 1  ... hasta 1.9999999999  se vuelven 1
valores desde 2  ... hasta 2.9999999999  se vuelven 2
valores desde 3  ... hasta 3.9999999999  se vuelven 3
```

Todos los intervalos tienen el mismo largo, haciendo la distribución final uniforme.
