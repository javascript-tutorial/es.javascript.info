Echemos un vistazo a lo que sucede en la llamada `speedy.eat("manzana")`.

1. El método `speedy.eat` se encuentra en el prototipo (`=hamster`), luego se ejecuta con `this=speedy` (el objeto antes del punto).

2. Entonces `this.stomach.push()` necesita encontrar la propiedad `stomach` y llamar a `push` sobre ella. Busca `stomach` en `this` (`=speedy`), pero no se encuentra nada.

3. Luego sigue la cadena del prototipo y encuentra `stomach` en `hamster`.

4. Luego se llama 'push' en él, agregando la comida en *el stomach del prototipo*.

¡Así que todos los hámsters comparten un solo estómago!

Tanto para `lazy.stomach.push(...)` como para `speedy.stomach.push ()`, la propiedad `stomach` se encuentra en el prototipo (ya que no está en el objeto mismo), entonces los nuevos datos son empujado hacia dentro.

Tenga en cuenta que tal cosa no sucede en caso de una asignación simple `this.stomach=`:

```js run
let hamster = {
  stomach: [],

  eat(food) {
*!*
    // asigna a this.stomach en lugar de this.stomach.push
    this.stomach = [food];
*/!*
  }
};

let speedy = {
   __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Speedy encontró la comida
speedy.eat("manzana");
alert( speedy.stomach ); // manzana

// El estomago de Lazy está vacio
alert( lazy.stomach ); // <nada>
```

Ahora todo funciona bien, porque `this.stomach =` no realiza una búsqueda de `stomach`. El valor se escribe directamente en el objeto `this`.

También podemos evitar totalmente el problema asegurándonos de que cada hámster tenga su propio estómago:

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

let lazy = {
  __proto__: hamster,
*!*
  stomach: []
*/!*
};

// Speedy encontró la comida
speedy.eat("manzana");
alert( speedy.stomach ); // manzana

// El estómago de Lazy está vacio
alert( lazy.stomach ); // <nada>
```

Como solución común, todas las propiedades que describen el estado de un objeto en particular, como el "stomach" anterior, deben escribirse en ese objeto. Eso evita tales problemas.
