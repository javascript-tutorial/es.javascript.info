# Error al leer una propiedad no existente

Usualmente, el intento de leer una propiedad que no existe devuelve `undefined`.

Crea en su lugar un proxy que arroje un error por intentar leer una propiedad no existente.

Esto puede ayudar a detectar equivocaciones en la programación en forma temprana.

Escribe una función `wrap(target)` que tome un objeto `target` y devuelva un proxy que agregue este aspecto de funcionalidad.

Así es como debe funcionar:

```js
let user = {
  name: "John"
};

function wrap(target) {
  return new Proxy(target, {
*!*
      /* tu código */
*/!*
  });
}

user = wrap(user);

alert(user.name); // John
*!*
alert(user.age); // ReferenceError: La propiedad no existe: "age"
*/!*
```
