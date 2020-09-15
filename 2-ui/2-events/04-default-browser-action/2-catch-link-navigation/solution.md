Ese es un gran uso para el patrón de delegación de eventos.

En la vida real, en lugar de preguntar, podemos enviar una solicitud de "logging" al servidor que guarda la información sobre dónde se fue el visitante. O podemos cargar el contenido y mostrarlo directamente en la página (si está permitido).

Todo lo que necesitamos es capturar el `contents.onclick` y usar `confirm` para preguntar al usuario. Una buena idea sería usar `link.getAttribute('href')` en lugar de `link.href` para la URL. Consulte la solución para obtener más detalles.
