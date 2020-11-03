importance: 4

---

# Filtrar un rango

Escribe una función `filterRange(arr, a, b)` que obtenga un array `arr`, busque los elementos con valor mayor o igual a `a` y menor o igual a `b` y devuelva un array con los resultados. 

La función no debe modificar el array. Debe devolver un nuevo array.

Por ejemplo:

```js
let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4); 

alert( filtered ); // 3,1 (valores dentro del rango)

alert( arr ); // 5,3,8,1 (array original no modificado)
```

