importance: 5

---

<<<<<<< HEAD
# Almacenar banderas "no leídas"

Hay un array de mensajes:
=======
# Store "unread" flags

There's an array of messages:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

<<<<<<< HEAD
Su código puede acceder a él, pero los mensajes son administrados por el código de otra persona. Se agregan mensajes nuevos, los códigos viejos se eliminan regularmente con ese código, y usted no sabe los momentos exactos en que sucede.

Ahora, ¿qué estructura de datos podría usar para almacenar información sobre si el mensaje "ha sido leído"? La estructura debe ser adecuada para dar la respuesta "¿se leyó?" para el objeto del mensaje dado.

P.D Cuando un mensaje se elimina de `messages`, también debería desaparecer de su estructura.

P.P.D. No debemos modificar los objetos del mensaje, o agregarles nuestras propiedades. Como son administrados por el código de otra persona, eso puede generarnos resultados no deseados.
=======
Your code can access it, but the messages are managed by someone else's code. New messages are added, old ones are removed regularly by that code, and you don't know the exact moments when it happens.

Now, which data structure could you use to store information about whether the message "has been read"? The structure must be well-suited to give the answer "was it read?" for the given message object.

P.S. When a message is removed from `messages`, it should disappear from your structure as well.

P.P.S. We shouldn't modify message objects, add our properties to them. As they are managed by someone else's code, that may lead to bad consequences.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
