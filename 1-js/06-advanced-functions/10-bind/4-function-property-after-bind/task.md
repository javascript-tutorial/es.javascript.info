importance: 5

---

# Propiedad de función después del enlace

<<<<<<< HEAD

Hay un valor en la propiedad de una función. ¿Cambiará después de `bind`? ¿Por qué sí o por qué no?
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
function sayHi() {
  alert( this.name );
}
sayHi.test = 5;

*!*
let bound = sayHi.bind({
  name: "John"
});

alert( bound.test ); // ¿Cuál será la salida? ¿por qué?
*/!*
```

