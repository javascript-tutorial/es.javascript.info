importance: 5

---

# Generar una lista de un solo enlace

Digamos que tenemos una lista de un solo enlace (como se describe en el capítulo <info:recursion>):

```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

Escribe una función `printList(list)` que genere los elementos de la lista uno por uno.

Haz dos variantes de la solución: utilizando un bucle y utilizando recursividad.

¿Qué es mejor: con recursividad o sin ella?
