Recorramos los elementos dentro del array:
- Para cada elemento vamos a comprobar si el array resultante ya tiene ese elemento.
- Si ya lo tiene, ignora. Si no, agrega el resultado.

```js run demo
function unique(arr) {
  let result = [];

  for (let str of arr) {
    if (!result.includes(str)) {
      result.push(str);
    }
  }

  return result;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O
```

El código funciona pero tiene un problema potencial de desempeño.

El método `result.includes(str)` internamente recorre el array `result` y compara cada elemento con `str` para encontrar una coincidencia.

Por lo tanto, si hay `100` elementos en `result` y ninguno coincide con `str`, entonces habrá recorrido todo el array `result` y ejecutado `100` comparaciones. Y si `result` es tan grande como `10000`, entonces habrá `10000` comparaciones.

Esto no es un problema en sí mismo, porque los motores JavaScript son muy rápidos, por lo que recorrer `10000` elementos de un array solo le tomaría microsegundos.

Pero ejecutamos dicha comprobación para cada elemento de `arr` en el loop `for`.

Entonces si `arr.length` es `10000` vamos a tener algo como `10000*10000` = 100 millones de comparaciones. Esto es realmente mucho.

Por lo que la solución solo es buena para arrays pequeños.

Más adelante en el capítulo <info:map-set> vamos a ver como optimizarlo.
