
Para encontrar todos los anagramas, dividamos cada palabra en letras y las ordenamos. Cuando se clasifican las letras, todos los anagramas son iguales.

Por ejemplo:


```
nap, pan -> anp
ear, era, are -> aer
cheaters, hectares, teachers -> aceehrst
...
```


Utilizaremos las variantes ordenadas por letras como propiedades de Map para almacenar solo un valor por cada propiedad:


```js run
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {

    // dividir la palabra por letras, ordenarlas y volver a unir

*!*
    let sorted = word.toLowerCase().split('').sort().join(''); // (*)
*/!*
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```


La clasificación de letras se realiza mediante la cadena de llamadas en la línea `(*)`.

Por conveniencia la dividimos en múltiples líneas:

```js
let sorted = arr[i] // PAN

  .toLowerCase() // pan
  .split('') // ['p','a','n']
  .sort() // ['a','n','p']
  .join(''); // anp
```


Dos palabras diferentes`'PAN'` y `'nap'` reciben la misma forma ordenada por letras `'anp'`.

La siguiente línea pone la palabra en el Map:


```js
map.set(sorted, word);
```


Si alguna vez volvemos a encontrar una palabra con la misma forma ordenada por letras, sobrescribiría el valor anterior con la misma propiedad en Map. Por lo tanto, siempre tendremos como máximo una palabra ordenada por letras.

Al final, `Array.from (map.values())` toma un valor iterativo sobre los valores de Map (no necesitamos propiedades en el resultado) y devuelve un array de ellos.

Aquí también podríamos usar un objeto plano en lugar del `Map`, porque las propiedades son strings.

Así es como puede verse la solución:


```js run demo
function aclean(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    let sorted = arr[i].toLowerCase().split("").sort().join("");
    obj[sorted] = arr[i];
  }

  return Object.values(obj);
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );
```
