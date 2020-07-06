importance: 5

---

<<<<<<< HEAD
# ¿Donde escribe?
=======
# Where does it write?
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

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
