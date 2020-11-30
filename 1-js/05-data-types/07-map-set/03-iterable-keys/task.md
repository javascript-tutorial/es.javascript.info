importance: 5

---

# Claves iterables

<<<<<<< HEAD
Nos gustaría obtener un array de `map.keys()` en una variable y luego aplicarle métodos específicos de array, ej. `.push`.
=======
We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

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
