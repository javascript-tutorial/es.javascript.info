importance: 5

---

# Un pregunta acerca de "if"

¿Cualés de estos `alert`s va a ejecutarse?

¿Cualés van a ser los resultados de las expresiones dentro de `if(...)`?

```js
if (-1 || 0) alert("first");
if (-1 && 0) alert("second");
if (null || (-1 && 1)) alert("third");
```
