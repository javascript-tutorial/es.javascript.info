importance: 5

---

<<<<<<< HEAD
# ¿Donde escribe?
=======
# Where does it write?
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Tenemos `rabbit` heredando de `animal`.

Si llamamos a `rabbit.eat()`, ¿qué objeto recibe la propiedad `full`: `animal` o `rabbit`?

```js
let animal = {
  eat() {
    this.full = true;
  }
};

let rabbit = {
  __proto__: animal
};

rabbit.eat();
```
