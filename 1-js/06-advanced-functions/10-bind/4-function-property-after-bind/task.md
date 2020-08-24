importance: 5

---

# Propiedad de función después del enlace

<<<<<<< HEAD

Hay un valor en la propiedad de una función. ¿Cambiará después de `bind`? ¿Por qué sí o por qué no?
=======
There's a value in the property of a function. Will it change after `bind`? Why, or why not?
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

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

