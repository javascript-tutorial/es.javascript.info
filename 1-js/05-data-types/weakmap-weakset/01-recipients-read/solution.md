Guardemos los mensajes leídos en `WeakSet`:

```js run
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];

let readMessages = new WeakSet();

// se han leído dos mensajes
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages tiene 2 elementos

// ...¡leamos nuevamente el primer mensaje!
readMessages.add(messages[0]);
// readMessages todavía tiene dos únicos elementos

// respuesta: ¿se leyó el mensaje [0]?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// ahora readMessages tiene 1 elemento (técnicamente la memoria puede limpiarse más tarde)
```

El `WeakEst` permite almacenar un conjunto de mensajes y verificar fácilmente la existencia de un mensaje en él.

Se limpia automáticamente. La compensación es que no podemos iterar sobre él, no podemos obtener "todos los mensajes leídos" directamente. Pero podemos hacerlo iterando sobre todos los mensajes y filtrando los que están en el conjunto.

Otra solución diferente podría ser agregar una propiedad como `message.isRead = true` a un mensaje después de leerlo. Como los objetos de mensajes son administrados por otro código, generalmente se desaconseja, pero podemos usar una propiedad simbólica para evitar conflictos.

Like this:
```js
// la propiedad simbólica solo es conocida por nuestro código
let isRead = Symbol("isRead");
messages[0][isRead] = true;
```

Ahora el código de terceros probablemente no verá nuestra propiedad adicional.

Aunque los símbolos permiten reducir la probabilidad de problemas, usar `WeakSet` es mejor desde el punto de vista arquitectónico.
