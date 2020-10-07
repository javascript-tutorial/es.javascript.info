La respuesta: `1` y `2`.

El primer handler se activa porque no es removido por `removeEventListener`. Para remover el handler necesitamos pasar exactamente la función que fue asignada. Y en el código se pasa una función que luce igual pero es otra función.

Para remover un objeto de función necesitamos almacenar una referencia a él, así:

```js
function handler() {
  alert(1);
}

button.addEventListener("click", handler);
button.removeEventListener("click", handler);
```

El handler `button.onclick` funciona independientemente y en adición a `addEventListener`.
