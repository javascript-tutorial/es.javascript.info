importance: 5

---

# Algoritmo de búsqueda

La tarea tiene dos partes.

Dados los siguientes objetos:

```js
let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
```

1. Use `__proto__` para asignar prototipos de manera que cualquier búsqueda de propiedades siga la ruta: `pockets` -> `bed` -> `table` ->  `head`. Por ejemplo, `pockets.pen` debería ser` 3` (que se encuentra en `table`), y `bed.glasses` debería ser `1` (que se encuentra en `head`).
2. Responda la pregunta: ¿es más rápido obtener `glasses` como `pockets.glasses` o `head.glasses`? Referencie si es necesario.
