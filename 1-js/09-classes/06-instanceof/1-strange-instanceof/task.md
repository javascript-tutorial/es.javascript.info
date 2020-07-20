importance: 5

---

# Extraño instanceof

<<<<<<< HEAD
En el siguiente código, ¿por qué `instanceof` devuelve `true`? Podemos ver fácilmente que `a` no es creado por `B()`.
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // verdadero
*/!*
```
