El HTML de la tarea es incorrecto. Esa es la razón del comportamiento extraño.

El navegador tiene que corregirlo automáticamente. No debe haber texto dentro de `<table>`: de acuerdo con la especificación solo son permitidas las etiquetas específicas de tabla. Entonces el navegador ubica `"aaa"` *antes* de `<table>`.

Ahora resulta obvio que cuando quitamos la tabla, ese texto permanece.

La pregunta puede ser respondida fácilmente explorando el DOM usando la herramientas del navegador. Estas muestran `"aaa"` antes que `<table>`.

El estándar HTML especifica en detalle cómo procesar HTML incorrecto, y tal comportamiento del navegador es el correcto.
