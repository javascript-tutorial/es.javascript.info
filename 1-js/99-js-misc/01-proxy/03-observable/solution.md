La solución consiste de dos partes:

1. Cuando `.observe(handler)` es llamado, necesitamos recordar el manejador 'handler' en algún lugar para poder llamarlo después. Podemos almacenar los manejadores directamente en el objeto, usando nuestro symbol como clave de la propiedad.
2. Necesitamos un proxy con la trampa `set` que llame a los manejadores en caso de cualquier cambio.

```js run
let handlers = Symbol('handlers');

function makeObservable(target) {
  // 1. Inicializa el almacén de manejadores
  target[handlers] = [];

  // Almacena la función manejadora en el array para llamadas futuras
  target.observe = function(handler) {
    this[handlers].push(handler);
  };

  // 2. Crea un proxy para manejar cambios
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments); // reenvía la operación al objeto
      if (success) { // si no hay errores al establecer la propiedad
        // llama a todos los manejadores
        target[handlers].forEach(handler => handler(property, value));
      }
      return success;
    }
  });
}

let user = {};

user = makeObservable(user);

user.observe((key, value) => {
  alert(`SET ${key}=${value}`);
});

user.name = "John";
```
