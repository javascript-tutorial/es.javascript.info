# Solución lenta

Podemos calcular todas las subsumas.

La forma más simple es tomar cada elemento y calcular las sumas de todos los subarrays que comienzan con él.

Por ejemplo, para `[-1, 2, 3, -9, 11]`:

```js no-beautify
// Comenzando desde -1:
-1
-1 + 2
-1 + 2 + 3
-1 + 2 + 3 + (-9)
-1 + 2 + 3 + (-9) + 11

// Comenzando desde 2:
2
2 + 3
2 + 3 + (-9)
2 + 3 + (-9) + 11

// Comenzando desde 3:
3
3 + (-9)
3 + (-9) + 11

// Comenzando desde -9
-9
-9 + 11

// Comenzando desde 11
11
```

El código es un bucle anidado. El bucle externo itera sobre los elementos del array, y el interno cuenta subsumas comenzando con cada uno de ellos.

```js run
function getMaxSubSum(arr) {
  let maxSum = 0; // si no obtenemos elementos, devolverá cero

  for (let i = 0; i < arr.length; i++) {
    let sumFixedStart = 0;
    for (let j = i; j < arr.length; j++) {
      sumFixedStart += arr[j];
      maxSum = Math.max(maxSum, sumFixedStart);
    }
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
```

La solución tiene una complejidad 2 en notación Landau [O(n<sup>2</sup>)](https://es.wikipedia.org/wiki/Notaci%C3%B3n_de_Landau) (coste respecto al tiempo). Es decir, si multiplicamos el tamaño del array por 2, el tiempo del algoritmo se multiplicará por 4.

Para arrays muy grandes (1000, 10000 o más items) tales algoritmos llevarán a una severa lentitud.

# Solución rápida

Recorramos el array y registremos la suma parcial actual de los elementos en la variable `s`. Si `s` se vuelve cero en algún punto, le asignamos `s=0`. El máximo entre todas las sumas parciales `s` será la respuesta.

Si la descripción te resulta demasiado vaga, por favor mira el código. Es bastante corto:

```js run demo
function getMaxSubSum(arr) {
  let maxSum = 0;
  let partialSum = 0;

  for (let item of arr) { // por cada item de arr
    partialSum += item; // se lo suma a partialSum
    maxSum = Math.max(maxSum, partialSum); // registra el máximo
    if (partialSum < 0) partialSum = 0; // cero si se vuelve negativo
  }

  return maxSum;
}

alert( getMaxSubSum([-1, 2, 3, -9]) ); // 5
alert( getMaxSubSum([-1, 2, 3, -9, 11]) ); // 11
alert( getMaxSubSum([-2, -1, 1, 2]) ); // 3
alert( getMaxSubSum([100, -9, 2, -3, 5]) ); // 100
alert( getMaxSubSum([1, 2, 3]) ); // 6
alert( getMaxSubSum([-1, -2, -3]) ); // 0
```

El algoritmo requiere exactamente una pasada, entonces la complejidad es O(n).

Puedes encontrar información detallada acerca del algoritmo: [Subvector de suma máxima](https://es.wikibooks.org/wiki/Algoritmia/Divide_y_vencer%C3%A1s#Subvector_de_suma_m%C3%A1xima). Si aún no es obvio cómo funciona, traza el algoritmo en los ejemplos de arriba y observa cómo trabaja, es mejor que cualquier explicación.
