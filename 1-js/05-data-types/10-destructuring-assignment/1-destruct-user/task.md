importance: 5

---

# Asignación desestructurante

Tenemos un objeto:

```js
let user = {
  name: "John",
  years: 30
};
```

Escriba la asignación desestructurante que asigne las propiedades:

- `name` en la variable `name`.
- `years` en la variable `age`.
- `isAdmin` en la variable `isAdmin` (false, si no existe tal propiedad)

Este es un ejemplo de los valores después de su asignación:

```js
let user = { name: "John", years: 30 };

// tu código al lado izquierdo:
// ... = user

alert( name ); // John
alert( age ); // 30
alert( isAdmin ); // false
```
