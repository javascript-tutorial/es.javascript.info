importance: 5

---

<<<<<<< HEAD
# ¿Qué variables están disponibles?

La función `makeWorker` a continuación crea otra función y la devuelve. Esa nueva función se puede llamar desde otro lugar.

¿Tendrá acceso a las variables externas desde su lugar de creación, o desde el lugar de invocación, o ambos?
=======
# Which variables are available?

The function `makeWorker` below makes another function and returns it. That new function can be called from somewhere else.

Will it have access to the outer variables from its creation place, or the invocation place, or both?
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

<<<<<<< HEAD
// crea una función
let work = makeWorker();

// la llama
work(); // ¿qué mostrará?
```

¿Qué valor mostrará? "Pete" o "John"?
=======
// create a function
let work = makeWorker();

// call it
work(); // what will it show?
```

Which value it will show? "Pete" or "John"?
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
