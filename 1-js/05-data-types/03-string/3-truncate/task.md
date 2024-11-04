importance: 5

---

# Truncar el texto

Crea una función `truncate(str, maxlength)` que verifique la longitud de `str` y, si excede `maxlength` - reemplaza el final de `str` con el carácter de puntos suspensivos `"…"`, para hacer su longitud igual a `maxlength`.

El resultado de la función debe ser la cadena truncada (si es necesario).

Por ejemplo:

```js
<<<<<<< HEAD
truncate("Lo que me gustaría contar sobre este tema es:", 20) = "Lo que me gustaría c…"

truncate("Hola a todos!", 20) = "Hola a todos!"
=======
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) == "Hi everyone!"
>>>>>>> 34a80e70f8cce5794be259d25f815d7a7db7cbe3
```
