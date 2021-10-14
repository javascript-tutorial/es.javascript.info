importance: 5

---

# Extendiendo atajos de teclado 

Crea una función `runOnKeys(func, code1, code2, ... code_n)` que ejecute `func` al presionar simultáneamente las teclas con códigos `code1`, `code2`, ..., `code_n`.

Por ejemplo, el siguiente código muestra un `alert` cuando `"Q"` y `"W"` se presionan juntas (en cualquier lenguaje, con o sin mayúscula)

```js no-beautify
runOnKeys(
  () => alert("¡Hola!"),
  "KeyQ",
  "KeyW"
);
```

[demo src="solution"]
