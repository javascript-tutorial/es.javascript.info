importance: 4

---

# Filtrar rango "en el lugar"

Escribe una función `filterRangeInPlace(arr, a, b)` que obtenga un array `arr` y remueva del mismo todos los valores excepto aquellos que se encuentran entre `a` y `b`. El test es: `a ≤ arr[i] ≤ b`.

La función solo debe modificar el array. No debe devolver nada.

Por ejemplo:
```js
let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // remueve los números excepto aquellos entre 1 y 4

alert( arr ); // [3, 1]
```
