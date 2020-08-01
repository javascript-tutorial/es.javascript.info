importance: 5

---

# Página sin fin

Crear una página interminable. Cuando un visitante la desplace hasta el final, se auto-añadirá la fecha y hora actual al texto (así el visitante podrá seguir desplazándose)

Así:

[iframe src="solution" height=200]

Por favor tenga en cuenta dos características importantes del desplazamiento:

1. **El scroll es "elástico".** En algunos navegadores/dispositivos podemos desplazarnos un poco más allá del inicio o final del documento (se muestra un espacio vacío abajo, y luego el documento "rebota" automáticamente a la normalidad).
2. **El scroll es impreciso.** Cuando nos desplazamos hasta el final de la página, podemos estar de hecho como a 0-50px del fondo del documento real.

Así que, "desplazarse hasta el final" debería significar que el visitante no está a más de 100px del final del documento.

P.D. En la vida real podemos querer mostrar "más mensajes" o "más bienes".
