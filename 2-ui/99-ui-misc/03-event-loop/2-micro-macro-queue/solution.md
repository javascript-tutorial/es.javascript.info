La salida en la consola es: 1 7 3 5 2 6 4.

La tarea es bastante simple, solamente necesitamos saber cómo funcionan las colas de micro y macrotareas.

Veámoslo paso a paso.

```js
console.log(1);
// La primera línea se ejecuta inmediatamente, e imprime`1`.
// Por ahora, las colas de micro y macrotareas están vacías.

setTimeout(() => console.log(2));
// `setTimeout` agrega la callback a la cola de macrotareas.
// - contenido de la cola de macrotareas:
//   `console.log(2)`

Promise.resolve().then(() => console.log(3));
// La callback es agregada a la cola de microtareas.
// - contenido de la cola de microtareas:
//   `console.log(3)`

Promise.resolve().then(() => setTimeout(() => console.log(4)));
// La callback con `setTimeout(...4)` es agregada a las microtareas.
// - contenido de la cola de microtareas:
//   `console.log(3); setTimeout(...4)`

Promise.resolve().then(() => console.log(5));
// La callback es agregada a la cola de microtareas
// - contenido de la cola de microtareas:
//   `console.log(3); setTimeout(...4); console.log(5)`

setTimeout(() => console.log(6));
// `setTimeout` agrega la callback a las macrotareas
// - contenido de la cola de macrotareas:
//   `console.log(2); console.log(6)`

console.log(7);
// Imprime 7 inmediatamente.
```

Concluyendo:

1. Los números `1` y `7` se muestran inmediatamente, porque simples llamados a `console.log` no usan ninguna cola.
2. Solo entonces, después de que el flujo del código principal finaliza, se ejecuta la cola de microtareas.
    - esta tiene los comandos: `console.log(3); setTimeout(...4); console.log(5)`.
    - se muestran los números `3` y `5`, mientras que`setTimeout(() => console.log(4))` agrega el llamado a `console.log(4)` al final de la cola de macrotareas.
    - La cola de macrotareas ahora es: `console.log(2); console.log(6); console.log(4)`.
3. Una vez que la cola de microtareas se vacía, se ejecuta la de macrotareas. Esta imprime `2`, `6`, `4`.

Finalmente, tenemos que la salida es: `1 7 3 5 2 6 4`.
