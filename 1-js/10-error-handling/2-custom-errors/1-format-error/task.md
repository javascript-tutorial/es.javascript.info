importance: 5

---

# Heredar de SyntaxError

Cree una clase `FormatError` que herede de la clase incorporada `SyntaxError`.

Debería admitir las propiedades `message`, `name` y `stack`.

Ejemplo de uso:

```js
let err = new FormatError("error de formateo");

alert( err.message ); // error de formateo
alert( err.name ); // FormatError
alert( err.stack ); // pila

alert( err instanceof FormatError ); // verdadero
alert( err instanceof SyntaxError ); // verdadero (porque hereda de SyntaxError)
```
