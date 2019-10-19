importance: 5

---

# Filtrar mediante una función

Tenemos un método interno `arr.filter(f)` para los array. Este filtra todos los elementos a través de la función `f`. Si devuelve `true`, entonces ese elemento es devuelto en el array resultante.

Crea un conjunto de filtros "listos para usar":

- `inBetween(a, b)` -- entre `a` y `b` o igual a ellos (inclusivamente).
- `inArray([...])` -- en el array dado.

El uso debe ser así:

- `arr.filter(inBetween(3,6))` -- selecciona solo los valores entre 3 y 6.
- `arr.filter(inArray([1,2,3]))` -- selecciona solo los elementos que coincidan con uno de los miembros de `[1,2,3]`.

Por ejemplo:

```js
/* .. tu código para inBetween y inArray */
let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
```
