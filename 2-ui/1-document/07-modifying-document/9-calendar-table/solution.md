Crearemos la tabla como un string: `"<table>...</table>"`, y entonces lo asignamos a `innerHTML`.

El algoritmo:

1. Crea el encabezado de la tabla con `<th>` y los nombres de los días de la semana.
2. Crea el objeto date `d = new Date(year, month-1)`. Este es el primer día del mes `month` (tomando en cuenta que los meses en JavaScript comienzan en `0`, no `1`).
3. Las primeras celdas hasta el primer día del mes `d.getDay()` podrían estar vacías. Las completamos con `<td></td>`.
4. Incrementa el día en `d`: `d.setDate(d.getDate()+1)`. Si `d.getMonth()` no es aún del mes siguiente, agregamos una nueva celda `<td>` al calendario. Si es domingo, agregamos un nueva línea<code>"&lt;/tr&gt;&lt;tr&gt;"</code>.
5. Si el mes terminó pero la fila no está completa, le agregamos `<td>` vacíos para hacerlo rectangular.
