importance: 5

---

# Propiedades iterables

Nos gustaría obtener un array de `map.keys()` en una variable y luego aplicarle métodos específicos de array, ej. .push.

Pero eso no funciona:


```js run
let map = new Map();

map.set("name", "John");

let keys = map.keys();

*!*

// Error: keys.push no es una función

keys.push("more");
*/!*
```


¿Por qué? ¿Cómo podemos arreglar el código para que funcione `keys.push`?

