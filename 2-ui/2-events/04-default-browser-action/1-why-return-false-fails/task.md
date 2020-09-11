importance: 3

---

# ¿Por qué "return false" no funciona?

¿Por qué en el código de abajo `return false` no funciona en absoluto?

```html autorun run
<script>
  function handler() {
    alert( "..." );
    return false;
  }
</script>

<a href="https://w3.org" onclick="handler()">el navegador irá a w3.org</a>
```

El navegador sigue la URL al hacer clic, pero no la queremos.

¿Como se arregla?
