importance: 5

---

<<<<<<< HEAD
# ¿Donde escribe?
=======
# Where does it write?
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

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
