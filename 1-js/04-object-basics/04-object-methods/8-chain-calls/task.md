importance: 2

---

# Encadenamiento

<<<<<<< HEAD
Hay un objeto `ladder` que permite subir y bajar:
=======
There's a `ladder` object that allows you to go up and down:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
let ladder = {
  step: 0,
  up() { 
    this.step++;
  },
  down() { 
    this.step--;
  },
  showStep: function() { // muestra el peldaño actual
    alert( this.step );
  }
};
```

<<<<<<< HEAD
Ahora, si necesitamos hacer varios llamados en secuencia podemos hacer algo como esto:
=======
Now, if we need to make several calls in sequence, we can do it like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

<<<<<<< HEAD
Modifica el código de "arriba" `up`, "abajo" `down` y "mostrar peldaño" `showStep` para hacer los llamados encadenables como esto:
=======
Modify the code of `up`, `down`, and `showStep` to make the calls chainable, like this:
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3

```js
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
```

<<<<<<< HEAD
Tal enfoque es ampliamente usado entre las librerías JavaScript.
=======
Such an approach is widely used across JavaScript libraries.
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
