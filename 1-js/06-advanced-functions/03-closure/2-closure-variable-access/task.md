importance: 5

---

# ¿Qué variables están disponibles?

La función `makeWorker` a continuación crea otra función y la devuelve. Esa nueva función se puede llamar desde otro lugar.

¿Tendrá acceso a las variables externas desde su lugar de creación, o desde el lugar de invocación, o ambos?

```js
function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// crea una funcion
let work = makeWorker();

// la llama
work(); // ¿qué mostrará?
```

¿Qué valor mostrará? "Pete" o "John"?
