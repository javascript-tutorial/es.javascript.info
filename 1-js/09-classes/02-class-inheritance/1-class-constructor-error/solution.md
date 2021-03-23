Eso es porque el constructor hijo debe llamar a `super()`.

Aquí el código corregido:

```js run
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {  
    *!*
    super(name);
    */!*
    this.created = Date.now();
  }
}

*!*
let rabbit = new Rabbit("Conejo Blanco"); // ahora funciona
*/!*
alert(rabbit.name); // Conejo Blanco
```
