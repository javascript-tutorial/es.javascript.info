importance: 5

---

<<<<<<< HEAD
# ¿Por qué están llenos los dos hámsters?
=======
# Why are both hamsters full?
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

Tenemos dos hámsters: `speedy` y `lazy` heredando del objeto `hamster` general.

<<<<<<< HEAD
Cuando alimentamos a uno de ellos, el otro también está lleno. ¿Por qué? ¿Cómo podemos arreglarlo?
=======
When we feed one of them, the other one is also full. Why? How can we fix it?
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

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

