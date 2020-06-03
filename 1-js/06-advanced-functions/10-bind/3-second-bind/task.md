importance: 5

---

# Segundo enlace

¿Podemos cambiar `this` por un enlace adicional?

¿Cuál será el resultado?

```js no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

f();
```

