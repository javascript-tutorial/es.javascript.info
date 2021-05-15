importance: 5

---

# Lista seleccionable

Cree una lista donde los elementos son seleccionables, como en los administradores de archivos.

- Un clic en un elemento de la lista selecciona solo ese elemento (agrega la clase `.selected`), deselecciona todos los demás.
- Si se hace un clic con `key:Ctrl` (`key:Cmd` para Mac), el estado seleccionado/deseleccionado cambia para ese solo elemento, los otros elementos no se modifican.

Demo:

[iframe border="1" src="solution" height=180]

PD: Para esta tarea, podemos suponer que los elementos de la lista son solo de texto. No hay etiquetas anidadas.

PPD: Evita la selección nativa del navegador del texto en los clics.
