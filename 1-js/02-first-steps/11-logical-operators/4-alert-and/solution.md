La respuesta: `1` y después `undefined`.

```js run
alert( alert(1) && alert(2) );
```

La llamada a `alert` retorna `undefined` (solo muestra un mensaje, así que no hay un valor que retornar relevante)

Debido a ello, `&&` evalúa el operando de la izquierda (imprime `1`) e inmediatamente se detiene porque `undefined` es un valor falso. Como `&&` busca un valor falso y lo retorna, terminamos.
