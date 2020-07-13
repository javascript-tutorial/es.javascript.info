importance: 5

---

<<<<<<< HEAD
# ¿Donde escribe?
=======
# Where does it write?
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

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
