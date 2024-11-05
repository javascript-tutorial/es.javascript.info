importance: 2

---

# Encadenamiento

Hay un objeto `ladder` que permite subir y bajar:

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

Si ahora necesitamos hacer varios llamados en secuencia, podemos hacer algo como esto:

```js
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0
```

Modifica el código de "arriba" `up`, "abajo" `down` y "mostrar peldaño" `showStep` para hacer los llamados encadenables. Así:

```js
ladder.up().up().down().showStep().down().showStep(); // muestra 1 luego 0
```

Tal enfoque es ampliamente usado en librerías JavaScript.
