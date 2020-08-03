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
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

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
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
