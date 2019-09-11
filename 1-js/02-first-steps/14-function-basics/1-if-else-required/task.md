importance: 4

---

# ¿Es "else" requerido?

La siguiente función devuelve `true` si el parámetro `age` es mayour a `18`.

De lo contrario, solicita una confirmación y devuelve su resultado:

```js
function checkAge(age) {
  if (age > 18) {
    return true;
*!*
  } else {
    // ...
    return confirm('¿Tus padres te dieron permiso?');
  }
*/!*
}
```

¿Funcionará la función de manera diferente si se borra `else`?

```js
function checkAge(age) {
  if (age > 18) {
    return true;
  }
*!*
  // ...
  return confirm('¿Tus padres te permitieron?');
*/!*
}
```

¿Hay alguna diferencia en el comportamiento de estas dos variantes?
