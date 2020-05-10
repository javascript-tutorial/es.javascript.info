importance: 5

---

# Almacenar fechas de lectura

Hay un array semejante al de la actividad anterior [previous task](info:task/recipients-read). La sitación es similar:

```js
let messages = [
  {text: "Hello", from: "John"},
  {text: "How goes?", from: "John"},
  {text: "See you soon", from: "Alice"}
];
```

La pregunta ahora es: ¿qué estructura de datos es la adecuada para almacenar la información: "cuando se leyó el mensaje?".

En la tarea anterior solo necesitábamos almacenar el hecho de "sí / no". Ahora necesitamos almacenar la fecha, y solo debe permanecer en la memoria hasta que el mensaje sea recolectado como basura.

P.D Las fechas se pueden almacenar como objetos de la clase incorporada `Fecha`, que cubriremos más adelante.
