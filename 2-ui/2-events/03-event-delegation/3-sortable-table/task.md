importance: 4

---

# Tabla ordenable

Haz que la tabla se pueda ordenar: los clics en elementos `<th>` deberían ordenarla por la columna correspondiente.

Cada `<th>` tiene su tipo de datos en el atributo, como esto:

```html
<table id="grid">
  <thead>
    <tr>
*!*
      <th data-type="number">Age</th>
      <th data-type="string">Name</th>
*/!*
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>5</td>
      <td>John</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Ann</td>
    </tr>
    ...
  </tbody>
</table>
```

En el ejemplo anterior la primera columna tiene números y la segunda cadenas. La función de ordenamiento debe manejar el orden de acuerdo al tipo de dato.

Solamente los tipos `"string"` y `"number"` deben ser soportados.

Ejemplo en funcionamiento:

[iframe border=1 src="solution" height=190]

P.D. La tabla puede ser grande, con cualquier cantidad de filas y columnas.
