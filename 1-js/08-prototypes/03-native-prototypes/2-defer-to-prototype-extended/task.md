importance: 4

---

# Agregue el decorado "defer()" a las funciones

Agregue el método `defer(ms)` al prototipo de todas las funciones, que devuelve un contenedor, retrasando la llamada en `ms` milisegundos.

Aquí hay un ejemplo de cómo debería funcionar:

```js
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // muestra 3 despues de 1 segundo
```

Tenga en cuenta que los argumentos deben pasarse a la función original.
