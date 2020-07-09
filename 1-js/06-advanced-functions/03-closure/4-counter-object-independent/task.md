importance: 5

---

# Objeto contador

Aquí se crea un objeto contador con la ayuda de la función constructora.

¿Funcionará? ¿Qué mostrará?


```js
function Counter() {
  let count = 0;

  this.up = function() {
    return ++count;
  };
  this.down = function() {
    return --count;
  };
}

let counter = new Counter();

alert( counter.up() ); // ?
alert( counter.up() ); // ?
alert( counter.down() ); // ?
```
