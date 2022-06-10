Solución:

```js run demo
function delay(f, ms) {

  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };

}

let f1000 = delay(alert, 1000);

f1000("test"); // mostrar "test" después de 1000ms
```

Tenga en cuenta cómo se utiliza una función de flecha aquí. Sabemos que las funciones de flecha no tienen contextos propios `this` ni `arguments`, por lo que `f.apply(this, arguments)` toma `this` y `arguments` del contenedor.

Si pasamos una función regular, `setTimeout` la llamará sin argumentos y, suponiendo que estemos en el navegador, con `this = window`.

Todavía podemos pasar el `this` correcto usando una variable intermedia, pero eso es algo más engorroso:

```js
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // almacenar esto en una variable intermedia
    setTimeout(function() {
      f.apply(savedThis, args); // úsalo aquí
    }, ms);
  };

}
```
