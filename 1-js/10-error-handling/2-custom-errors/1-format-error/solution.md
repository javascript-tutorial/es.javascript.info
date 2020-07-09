```js run untrusted
class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

let err = new FormatError("error de formato");

alert( err.message ); // error de formato
alert( err.name ); // FormatError
alert( err.stack ); // pila

alert( err instanceof SyntaxError ); // true
```
