importance: 5

---

# Claves iterables

<<<<<<< HEAD
Nos gustaría obtener un array de `map.keys()` en una variable y luego aplicarle métodos específicos de array, ej. `.push`.
=======
We'd like to get an array of `map.keys()` in a variable and then apply array-specific methods to it, e.g. `.push`.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

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
