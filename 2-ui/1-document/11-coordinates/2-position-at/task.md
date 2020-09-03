importance: 5

---

# Muestra una nota cercana al elemento

Crea una función `positionAt(anchor, position, elem)` que posicione `elem`, dependiendo de la proximidad de `position` al elemento `anchor`.

`position` debe ser un string con alguno de estos 3 valores:
- `"top"` - posiciona `elem` encima de `anchor`
- `"right"` - posiciona `elem` inmediatamente a la derecha de `anchor`
- `"bottom"` - posiciona `elem` debajo de `anchor`

Esto será usado dentro de la función `showNote(anchor, position, html)`, proveída en el código fuente de la tarea, que crea un elemento "note" con el `html` y lo muestra en el lugar proporcionado por `position` cercano a `anchor`.

Aquí está el demo de las notas:

[iframe src="solution" height="350" border="1" link]
