importance: 5

---

# Captura enlaces en el elemento

Haz que todos los enlaces dentro del elemento con `id="contents"` pregunten al usuario si realmente quiere irse. Y si no quiere, no sigas.

Así:

[iframe height=100 border=1 src="solution"]

Detalles:

- El HTML dentro del elemento puede cargarse o regenerarse dinámicamente en cualquier momento, por lo que no podemos encontrar todos los enlaces y ponerles controladores. Utilice la delegación de eventos.
- El contenido puede tener etiquetas anidadas. Dentro de los enlaces también, como `<a href=".."><i>...</i></a>`.
