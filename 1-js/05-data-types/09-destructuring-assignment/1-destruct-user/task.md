importance: 5

---

# Asignación de desestructuración

Tenemos un objeto:

```js
let usuario = {
  nombre: "John",
  años: 30
};
```

Escriba la asignación desestructurante que lea:

- la propiedad `nombre` en la variable `nombre`.
- la propiedad `años` en la variable `edad`.
- la propiedad `esAdmin` en la variable `esAdmin` (falso, si no existe tal propiedad)

Aquí un ejemplo de los valores después de tu asignación:

```js
let usuario = { nombre: "John", años: 30 };

// tu código al lado izquierdo:
// ... = usuario

alert( nombre ); // John
alert( edad ); // 30
alert( esAdmin ); // false
```
