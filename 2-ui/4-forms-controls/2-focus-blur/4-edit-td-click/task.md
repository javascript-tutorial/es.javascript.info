importance: 5

---

# Editar TD al clicar

Haz las celdas de la tabla editables al clicarlas.

- Al clicar, la celda se vuelve "editable" (aparece un textarea dentro), y podemos cambiar el HTML. No debe haber cambios de tamaño, la geometría debe conservarse.
- Bajo la celda aparecen los botones OK y CANCEL para terminar/cancelar la edición.
- Solo una celda a la vez puede ser editable. Mientras un `<td>` esté en "modo de edición", los clics en otras celdas son ignorados.
- La tabla puede tener varias celdas. Usa delegación de eventos.

El demo:

[iframe src="solution" height=400]
