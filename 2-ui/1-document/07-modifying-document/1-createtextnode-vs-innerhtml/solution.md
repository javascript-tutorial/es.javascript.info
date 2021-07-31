Respuesta: **1 y 3**.

Ambos comandos agregan `text` "como texto" dentro de `elem`.

Aquí el ejemplo:

```html run height=80
<div id="elem1"></div>
<div id="elem2"></div>
<div id="elem3"></div>
<script>
  let text = '<b>text</b>';

  elem1.append(document.createTextNode(text));
  elem2.innerHTML = text;
  elem3.textContent = text;
</script>
```
