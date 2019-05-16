La respuesta: `1` y entonces `undefined`.

```js run
alert(alert(1) && alert(2));
```

La llamada a `alert`retorna `undefined` (solo muestra un mensaje, asi que no hay un valor que retornar significante)

Debido a ello, `&&` evaluá el operando a la izquierda (imprime `1`), e inmediatamente se detiene, porque `undefined` es un valor falso. Y `&&` busca un valor falso y lo retorna, asi que ya está hecho.
