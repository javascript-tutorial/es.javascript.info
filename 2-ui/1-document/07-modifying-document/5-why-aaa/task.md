importance: 1

---

# Por qué "aaa" permanece?

En el ejemplo de abajo, la llamada `table.remove()` quita la tabla del documento.

Pero si la ejecutas, puedes ver que el texto "aaa"` es aún visible.

¿Por qué ocurre esto?

```html height=100 run
<table id="table">
  aaa
  <tr>
    <td>Test</td>
  </tr>
</table>

<script>
  alert(table); // la tabla, tal como debería ser

  table.remove();
  // ¿Por qué aún está aaa en el documento?
</script>
```
