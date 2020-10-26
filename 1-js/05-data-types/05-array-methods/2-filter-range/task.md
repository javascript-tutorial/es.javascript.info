importance: 4

---

# Filtrar un rango

<<<<<<< HEAD
Escribe una función `filterRange(arr, a, b)` que obtenga un array `arr`, busque los elementos entre `a` y `b` y devuelva un array con los resultados. 
=======
Write a function `filterRange(arr, a, b)` that gets an array `arr`, looks for elements with values higher or equal to `a` and lower or equal to `b` and return a result as an array.
>>>>>>> 2d5be7b7307b0a4a85e872d229e0cebd2d8563b5

La función no debe modificar el array. Debe devolver un nuevo array.

Por ejemplo:

```js
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4); 

alert( filtered ); // 3,1 (valores dentro del rango)

alert( arr ); // 5,3,8,1 (array original no modificado)
```

