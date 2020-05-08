
```js run
let room = {
  number: 23
};

let meetup = {
  title: "Conference",
  occupiedBy: [{name: "John"}, {name: "Alice"}],
  place: room
};

room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(propiedad, valor) {
  return (propiedad != "" && valor == meetup) ? undefined : valor;
}));

/* 
{
  "title":"Conference",
  "occupiedBy":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/
```

Aquí también necesitamos verificar `propiedad==""` para excluir el primer llamado donde es normal que `valor` sea `meetup`.

