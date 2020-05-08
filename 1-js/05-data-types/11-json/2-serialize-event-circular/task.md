importance: 5

---

# Excluir referencias posteriores

En casos simples de referencias circulares, podemos excluir una propiedad infractora de la serialización por su nombre.

Pero a veces no podemos usar el nombre, ya que puede usarse tanto en referencias circulares como en propiedades normales. Entonces podemos verificar la propiedad por su valor.

Escriba la función `sustituto` para convertir a string todo, pero elimine las propiedades que hacen referencia a `meetup`:

```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

*!*
// referencias circulares
room.occupiedBy = meetup;
meetup.self = meetup;
*/!*

alert( JSON.stringify(meetup, function replacer(propiedad, valor) {
  /* tu código */
}));

/* el resultado debería ser:
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```
