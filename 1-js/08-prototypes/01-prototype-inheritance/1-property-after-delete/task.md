importance: 5

---

# Trabajando con prototipo

Aquí está el código que crea un par de objetos, luego los modifica.

¿Qué valores se muestran en el proceso?

```js
let animal = {
  jumps: null
};
let rabbit = {
  __proto__: animal,
  jumps: true
};

alert( rabbit.jumps ); // ? (1)

delete rabbit.jumps;

alert( rabbit.jumps ); // ? (2)

delete animal.jumps;

alert( rabbit.jumps ); // ? (3)
```

Debería haber 3 respuestas.
