importance: 5

---

# Usando el "this" en un objeto literal

Aquí la función `makeUser` devuelve un objeto.

¿Cuál es el resultado de acceder a su `ref`? ¿Por qué?

```js
function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // ¿Cuál es el resultado?
```
