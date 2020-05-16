importance: 5

---

# Agregue el método "f.defer(ms)" a las funciones

Agregue al prototipo de todas las funciones el método `defer(ms)`, que ejecuta la función después de `ms` milisegundos.

Después de hacerlo, dicho código debería funcionar:

```js
function f() {
  alert("Hola!");
}

f.defer(1000); // muestra "Hola!" despues de 1 segundo
```
