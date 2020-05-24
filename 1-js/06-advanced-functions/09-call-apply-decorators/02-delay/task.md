importance: 5

---

# Decorador de retraso

Cree un decorador `delay(f, ms)` que retrase cada llamada de `f` en `ms` milisegundos.

Por ejemplo

```js
function f(x) {
  alert(x);
}

// crear contenedores
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test"); // mostrar "test" después de 1000ms
f1500("test"); // mostrar "test" después de 1500ms
```

En otras palabras, `delay (f, ms)` devuelve una variante "Retrasada por `ms`" de`f`.

En el código anterior, `f` es una función de un solo argumento, pero en ésta solución debe pasar todos los argumentos y el contexto `this`.
