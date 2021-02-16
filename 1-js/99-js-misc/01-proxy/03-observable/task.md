
# Observable

Crea una función `makeObservable(target)` que "haga el objeto observable" devolviendo un proxy.

Así es como debe funcionar:

```js run
function makeObservable(target) {
  /* tu código */
}

let user = {};
user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John"; // alerta: SET name=John
```

En otras palabras, un objeto devuelto por `makeObservable` es como el original pero que también tiene el método `observe(handler)` que establece una función  `handler` que será llamada en cualquier cambio de propiedad.

cada vez que una propiedad cambie, `handler(key, value)` es llamado con el nombre y el valor de la propiedad.

P.D. En esta tarea, solo toma en cuenta la escritura de una propiedad. Otras operaciones pueden ser implementadas de manera similar.
