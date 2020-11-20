importance: 3

---

# ¿La clase extiende el objeto?

Como sabemos, todos los objetos normalmente heredan de `Object.prototype` y obtienen acceso a métodos de objeto "genéricos" como `hasOwnProperty` etc.

Por ejemplo:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// el método hasOwnProperty proviene de Object.prototype
alert( rabbit.hasOwnProperty('name') ); // verdadero
*/!*
```

Pero si lo escribimos explícitamente como `"class Rabbit extends Object"`, entonces ¿el resultado sería diferente de una simple `"class Rabbit"`?

¿Cuál es la diferencia?

Aquí un ejemplo de dicho código (no funciona -- ¿por qué? ¿Arréglalo?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
