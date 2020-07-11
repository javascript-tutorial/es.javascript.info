importance: 5

---

# Heredar de SyntaxError

Cree una clase `FormatError` que herede de la clase incorporada `SyntaxError`.

Debería admitir las propiedades `message`, `name` y `stack`.

Ejemplo de uso:

```js
let err = new FormatError("error de formato");

alert( err.message ); // error de formato
alert( err.name ); // FormatError
alert( err.stack ); // pila

alert( err instanceof FormatError ); // true
alert( err instanceof SyntaxError ); // true (porque hereda de SyntaxError)
```
