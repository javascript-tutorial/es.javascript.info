importance: 4

---

# Cargar imágenes visibles

Digamos que tenemos un cliente con baja velocidad de conexión y queremos cuidar su tarifa de datos.

Para ello decidimos no mostrar las imágenes inmediatamente, sino sustituirlas por marcadores de posición, como este:

```html
<img *!*src="placeholder.svg"*/!* width="128" height="128" *!*data-src="real.jpg"*/!*>
```

Así que, inicialmente todas las imágenes son `placeholder.svg`. Cuando la página se desplaza a la posición donde el usuario puede ver la imagen -- cambiamos `src` a `data-src`, y así la imagen se carga.

Aquí hay un ejemplo en `iframe`:

[iframe src="solution"]

Desplázate para ver las imágenes cargadas "bajo demanda".

Requerimientos:
- Cuando la página se carga, las imágenes que están en pantalla deben cargarse inmediatamente, antes de cualquier desplazamiento.
- Algunas imágenes pueden ser regulares, sin `data-src`. El código no debe tocarlas.
- Una vez que una imagen se carga, no debe recargarse más cuando haya desplazamiento arriba/abajo.

P.D. Si puedes, haz una solución más avanzada para "precargar" las imágenes que están más abajo/después de la posición actual.

Post P.D. Sólo se debe manejar el desplazamiento vertical, no el horizontal.
