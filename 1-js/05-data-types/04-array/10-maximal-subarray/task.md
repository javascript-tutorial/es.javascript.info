importance: 2

---

# Subarray máximo

La entrada es un array de números, por ejemplo `arr = [1, -2, 3, 4, -9, 6]`.

Encuentra el subarray de ítems contiguos en `arr` que tenga la suma máxima.

Escribe la función `getMaxSubSum(arr)` que devuelva el resultado de tal suma.

Por ejemplo:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (la suma de items resaltados)
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (toma todo)
```

Si todos los elementos son negativos, no toma ninguno (el subarray queda vacío) y la suma es cero:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Trata de pensar en una solución rápida: [O(n<sup>2</sup>)](https://es.wikipedia.org/wiki/Notaci%C3%B3n_de_Landau) o incluso O(n) si puedes.
