importance: 5

---

# Decorador espía

Cree un decorador `spy(func)` que debería devolver un contenedor que guarde todas las llamadas para que funcionen en su propiedad `calls`

Cada llamada se guarda como un array de argumentos.

Por ejemplo

```js
function work(a, b) {
  alert( a + b ); // work es una función o método arbitrario
}

*!*
work = spy(work);
*/!*

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
  alert( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}
```

P.D Ese decorador a veces es útil para pruebas unitarias. Su forma avanzada es `sinon.spy` en la librería [Sinon.JS](http://sinonjs.org/).
