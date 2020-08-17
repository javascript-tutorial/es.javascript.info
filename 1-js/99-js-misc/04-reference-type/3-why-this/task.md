importance: 3

---

# Explica el valor de "this"

<<<<<<< HEAD:1-js/99-js-misc/04-reference-type/3-why-this/task.md
En el código siguiente intentamos llamar al método `obj.go()` 4 veces seguidas.
=======
In the code below we intend to call `obj.go()` method 4 times in a row.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05:1-js/99-js-misc/04-reference-type/3-why-this/task.md

Pero las llamadas `(1)` y `(2)` funcionan diferente a `(3)` y `(4)`. ¿Por qué?

```js run no-beautify
let obj, method;

obj = {
  go: function() { alert(this); }
};

obj.go();               // (1) [object Object]

(obj.go)();             // (2) [object Object]

(method = obj.go)();    // (3) undefined

(obj.go || obj.stop)(); // (4) undefined
```

