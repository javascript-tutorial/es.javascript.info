importance: 4

---

<<<<<<< HEAD
# Crea un objeto a partir de un array

Supongamos que recibimos un array de usuarios con la forma `{id:..., name:..., age... }`.

Crea una función `groupById(arr)` que cree un objeto, con `id` como clave (key) y los elementos del array como valores.

Por ejemplo:
=======
# Create keyed object from array

Let's say we received an array of users in the form `{id:..., name:..., age... }`.

Create a function `groupById(arr)` that creates an object from it, with `id` as the key, and array items as values.

For example:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
<<<<<<< HEAD
// después de llamar a la función deberíamos tener:
=======
// after the call we should have:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

<<<<<<< HEAD
Dicha función es realmente útil cuando trabajamos con información del servidor.

Para esta actividad asumimos que cada `id` es único. No existen dos elementos del array con el mismo `id`.

Usa el método `array.reduce` en la solución.
=======
Such function is really handy when working with server data.

In this task we assume that `id` is unique. There may be no two array items with the same `id`.

Please use array `.reduce` method in the solution.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
