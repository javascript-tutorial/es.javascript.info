La respuesta: **`BODY`**.

```html run
<script>
  let body = document.body;

  body.innerHTML = "<!--" + body.tagName + "-->";

  alert( body.firstChild.data ); // BODY
</script>
```

¿Qué está pasando paso a paso?

1. El contenido de `<body>` se reemplaza con el comentario. El comentario es `<!--BODY-->`, porque `body.tagName == "BODY"`. Como recordamos, `tagName` siempre está en mayúsculas en HTML.
2. El comentario es ahora el único nodo hijo, así que lo obtenemos en `body.firstChild`.
3. La propiedad `data` del comentario es su contenido (dentro de `<!--...-->`): `"BODY"`.
