importance: 5

---

# ¿Por qué están llenos los dos hámsters?

Tenemos dos hámsters: `speedy` y `lazy` heredando del objeto `hamster` general.

Cuando alimentamos a uno de ellos, el otro también está lleno. ¿Por qué? ¿Cómo podemos arreglarlo?

```js run
let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

let speedy = {
  __proto__: hamster
};

let lazy = {
  __proto__: hamster
};

// Este encontró la comida
speedy.eat("manzana");
alert( speedy.stomach ); // manzana

// Este también lo tiene, ¿por qué? arreglar por favor.
alert( lazy.stomach ); // manzana
```

