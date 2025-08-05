La respuesta: `1` y después `undefined`.

```js run
alert( alert(1) && alert(2) );
```

Una llamada a `alert` siempre retorna `undefined` (solo muestra un mensaje, no tiene un valor relevante que retornar)

Debido a ello, `&&` evalúa el operando de la izquierda (el cual imprime `1`) e inmediatamente se detiene porque `undefined` es falsy. Como `&&` busca un valor falsy, lo retorna y termina.
