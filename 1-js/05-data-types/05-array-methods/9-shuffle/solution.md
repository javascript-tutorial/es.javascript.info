Una solución simple podría ser:

```js run
*!*
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
*/!*

let arr = [1, 2, 3];
shuffle(arr);
alert(arr);
```

Eso funciona de alguna manera, porque `Math.random() - 0.5` es un número aleatorio que puede ser positivo o negativo, por lo tanto, la función de ordenamiento reordena los elementos de forma aleatoria.

Pero debido a que la función de ordenamiento no está hecha para ser usada de esta manera, no todas las permutaciones tienen la misma probabilidad.

Por ejemplo, consideremos el código siguiente. Ejecuta `shuffle` 1000000 veces y cuenta las apariciones de todos los resultados posibles:

```js run
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// cuenta las apariciones para todas las permutaciones posibles
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// muestra conteo de todas las permutaciones posibles
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

Un resultado de ejemplo (depende del motor JS):

```js
123: 250706
132: 124425
213: 249618
231: 124880
312: 125148
321: 125223
```

Podemos ver una clara tendencia: `123` y `213` aparecen mucho más seguido que otros.

El resultado del código puede variar entre distintos motores JavaScript pero ya podemos ver que esta forma de abordar el problema es poco confiable.

¿Por qué no funciona? Generalmente hablando, `sort` es una "caja negra": tiramos dentro un array y una función de ordenamiento y esperamos que el array se ordene. Pero debido a la total aleatoriedad de la comparación, la caja negra se vuelve loca y exactamente en que sentido se vuelve loca depende de la implementación específica, que difiere de un motor a otro.

Existen otra formas mejores de realizar la tarea. Por ejemplo, hay un excelente algorítmo llamado [Algoritmo de Fisher-Yates](https://es.wikipedia.org/wiki/Algoritmo_de_Fisher-Yates). La idea es recorrer el array en sentido inverso e intercambiar cada elemento con un elemento aleatorio anterior:

```js
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // índice aleatorio entre 0 e i

    // intercambia elementos array[i] y array[j]
    // usamos la sintáxis "asignación de desestructuración" para lograr eso
    // encontrarás más información acerca de esa sintaxis en los capítulos siguientes
    // lo mismo puede ser escrito como:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}
```

Probémoslo de la misma manera:

```js run
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// conteo de apariciones para todas las permutaciones posibles
let count = {
  '123': 0,
  '132': 0,
  '213': 0,
  '231': 0,
  '321': 0,
  '312': 0
};

for (let i = 0; i < 1000000; i++) {
  let array = [1, 2, 3];
  shuffle(array);
  count[array.join('')]++;
}

// muestra el conteo para todas las permutaciones posibles
for (let key in count) {
  alert(`${key}: ${count[key]}`);
}
```

La salida del ejemplo:

```js
123: 166693
132: 166647
213: 166628
231: 167517
312: 166199
321: 166316
```

Ahora sí se ve bien: todas las permutaciones aparecen con la misma probabilidad.

Además, en cuanto al rendimiento el algoritmo de Fisher-Yates es mucho mejor, no hay "ordenamiento" superpuesto.
