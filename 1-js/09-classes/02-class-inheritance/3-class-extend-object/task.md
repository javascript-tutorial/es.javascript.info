importance: 3

---

# Clase extiende objeto?

Como sabemos, todos los objetos normalmente heredan de `Object.prototype` y obtienen acceso a métodos de objetos "genéricos" como `hasOwnProperty`, etc..

Por ejemplo:

```js run
class Rabbit {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

*!*
// el método hasOwnProperty es de Object.prototype
alert( rabbit.hasOwnProperty('name') ); // verdadero
*/!*
```

Pero si lo deletreamos explícitamente como `"clase Rabbit extends Objetc"`, entonces ¿el resultado sería diferente de un simple `"class Rabbit"`?

¿Cual es la diferencia?

Aquí hay un ejemplo de dicho código (no funciona, ¿por qué? ¿Solucionarlo?):

```js
class Rabbit extends Object {
  constructor(name) {
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert( rabbit.hasOwnProperty('name') ); // Error
```
