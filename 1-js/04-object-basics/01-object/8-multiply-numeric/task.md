importance: 3

---

<<<<<<< HEAD
# Multiplicar propiedades numéricas por 2

Crea una función `multiplyNumeric(obj)` que multiplique todas las propiedades numéricas de `obj` por `2`.
=======
# Multiply numeric property values by 2

Create a function `multiplyNumeric(obj)` that multiplies all numeric property values of `obj` by `2`.
>>>>>>> d6e88647b42992f204f57401160ebae92b358c0d

Por ejemplo:

```js
// Antes de la llamada
let menu = {
  width: 200,
  height: 300,
  title: "Mi menú"
};

multiplyNumeric(menu);

// Después de la llamada
menu = {
  width: 400,
  height: 600,
  title: "Mi menú"
};
```

Nota que `multiplyNumeric` no necesita devolver nada. Debe modificar el objeto en su lugar.

P.D. Usa `typeof` para verificar si hay un número aquí.


