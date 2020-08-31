importance: 2

---

# Subarray máximo

La entrada es un array de números, por ejemplo `arr = [1, -2, 3, 4, -9, 6]`.

La tarea es: encuentra el subarray contiguo de items de `arr` con la suma máxima.

Escribe la función `getMaxSubSum(arr)` que devuelva tal sumo.

<<<<<<< HEAD
Por ejemplo:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (la suma de items resaltados)
=======
For instance:

```js
getMaxSubSum([-1, *!*2, 3*/!*, -9]) == 5 (the sum of highlighted items)
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
getMaxSubSum([*!*2, -1, 2, 3*/!*, -9]) == 6
getMaxSubSum([-1, 2, 3, -9, *!*11*/!*]) == 11
getMaxSubSum([-2, -1, *!*1, 2*/!*]) == 3
getMaxSubSum([*!*100*/!*, -9, 2, -3, 5]) == 100
<<<<<<< HEAD
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (toma todo)
=======
getMaxSubSum([*!*1, 2, 3*/!*]) == 6 (take all)
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
```

Si todos los elementos son negativos, significa que que no tomamos ninguno (el subarray está vacío), entonces la suma es cero:

```js
getMaxSubSum([-1, -2, -3]) = 0
```

Trata de pensar un solución rápida: [O(n<sup>2</sup>)](https://es.wikipedia.org/wiki/Notaci%C3%B3n_de_Landau) o incluso O(n) si puedes.
