importance: 2

---

# Dos funciones – un objeto

Es posible crear las funciones `A` y `B` como `new A()==new B()`?

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Si es posible, entonces proporcione un ejemplo de su código.
