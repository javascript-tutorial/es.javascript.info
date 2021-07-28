importance: 4

---

# Crea un objeto a partir de un array

Supongamos que recibimos un array de usuarios con la forma `{id:..., name:..., age:... }`.

Crea una función `groupById(arr)` que cree un objeto, con `id` como clave (key) y los elementos del array como valores.

Por ejemplo:

```js
let users = [
  {id: 'john', name: "John Smith", age: 20},
  {id: 'ann', name: "Ann Smith", age: 24},
  {id: 'pete', name: "Pete Peterson", age: 31},
];

let usersById = groupById(users);

/*
// después de llamar a la función deberíamos tener:

usersById = {
  john: {id: 'john', name: "John Smith", age: 20},
  ann: {id: 'ann', name: "Ann Smith", age: 24},
  pete: {id: 'pete', name: "Pete Peterson", age: 31},
}
*/
```

Dicha función es realmente útil cuando trabajamos con información del servidor.

Para esta actividad asumimos que cada `id` es único. No existen dos elementos del array con el mismo `id`.

Usa el método de array `.reduce` en la solución.
