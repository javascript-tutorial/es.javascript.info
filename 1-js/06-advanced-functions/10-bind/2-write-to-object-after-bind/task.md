importance: 5

---

# Función enlazada como método

¿Cuál será el resultado?

```js
function f() {
  alert( this ); // ?
}

let user = {
  g: f.bind(null)
};

user.g();
```

