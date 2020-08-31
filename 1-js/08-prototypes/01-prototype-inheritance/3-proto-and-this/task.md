importance: 5

---

<<<<<<< HEAD
# ¿Donde escribe?
=======
# Where does it write?
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

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
