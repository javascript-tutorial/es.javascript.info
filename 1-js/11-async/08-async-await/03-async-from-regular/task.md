
# Llamado async desde un non-async

Tenemoss una función "regular". ¿Cómo llamar `async` desde ella y usar su resultado?

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ¿...qué escribir aquí?
  // Necesitamos llamar async wait() y esperar a obtener 10
  // recuerda, no podemos usar "await"
}
```

P.D. La tarea es técnicamente muy simple, pero la pregunta es muy común en desarrolladores nuevos en async/await.
