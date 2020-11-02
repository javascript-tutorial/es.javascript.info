
# Llamado async desde un non-async

<<<<<<< HEAD
Tenemos una función "regular". ¿Cómo llamar `async` desde ella y usar el resultado?
=======
We have a "regular" function called `f`. How can you call the `async` function `wait()` and use its result inside of `f`?
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

```js
async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

function f() {
<<<<<<< HEAD
  // ¿...qué escribir aquí?
  // Necesitamos llamar async wait() y esperar a obtener 10
  // recuerda, no podemos usar "await"
=======
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d
}
```

P.D. La tarea es técnicamente muy simple, pero la pregunta es muy común en desarrolladores nuevos en async/await.
