importance: 5

---

# Extraño instanceof

<<<<<<< HEAD
En el siguiente código, ¿por qué `instanceof` devuelve `true`? Podemos ver fácilmente que `a` no es creado por `B()`.
=======
In the code below, why does `instanceof` return `true`? We can easily see that `a` is not created by `B()`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

*!*
alert( a instanceof B ); // verdadero
*/!*
```
