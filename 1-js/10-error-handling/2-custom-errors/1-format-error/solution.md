```js run untrusted
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

let err = new FormatError("error de formateo");

alert( err.message ); // error de formateo
alert( err.name ); // FormatError
alert( err.stack ); // pila

alert( err instanceof SyntaxError ); // verdadero
```
