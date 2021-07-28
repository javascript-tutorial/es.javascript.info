importance: 2

---

# Dos funciones – un objeto

<<<<<<< HEAD
Es posible crear las funciones `A` y `B` como `new A()==new B()`?
=======
Is it possible to create functions `A` and `B` so that `new A() == new B()`?
>>>>>>> ef8d576821ff28c69bfb7410dc79fd216b0a315b

```js no-beautify
function A() { ... }
function B() { ... }

let a = new A;
let b = new B;

alert( a == b ); // true
```

Si es posible, entonces proporcione un ejemplo de su código.
