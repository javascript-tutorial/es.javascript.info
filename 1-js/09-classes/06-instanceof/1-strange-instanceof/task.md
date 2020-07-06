importance: 5

---

# Extraño instanceof

<<<<<<< HEAD
En el siguiente código, ¿por qué `instanceof` devuelve `true`? Podemos ver fácilmente que `a` no es creado por `B()`.
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // verdadero
*/!*
```
