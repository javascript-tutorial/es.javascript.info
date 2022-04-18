importance: 5

---

# LLamados en un contexto de array

¿Cuál es el resultado y por qué?

```js
let arr = ["a", "b"];

arr.push(function() {
  alert( this );
});

arr[2](); // ?
```
