Cuando el navegador lee un atributo `on*` como `onclick`, crea el controlador a partir de su contenido.

Para `onclick="handler()"` la función será:

```js
function(event) {
  handler() // el contenido de onclick
}
```

Ahora podemos ver que el valor devuelto por `handler()` no se usa y no afecta el resultado.

La solución es simple:

```html run
<script>
  function handler() {
    alert("...");
    return false;
  }
</script>

<a href="https://w3.org" onclick="*!*return handler()*/!*">w3.org</a>
```

También podemos usar `event.preventDefault()`, así:

```html run
<script>
*!*
  function handler(event) {
    alert("...");
    event.preventDefault();
  }
*/!*
</script>

<a href="https://w3.org" onclick="*!*handler(event)*/!*">w3.org</a>
```
