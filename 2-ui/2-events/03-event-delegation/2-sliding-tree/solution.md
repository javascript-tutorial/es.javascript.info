La solución tiene dos partes.

1. Envuelve cada nodo de título del árbol dentro de `<span>`. Luego podemos aplicarles CSS-style en `:hover` y manejar los clics exactamente sobre el texto, porque el ancho de `<span>` es exactamente el ancho del texto (no lo será si no lo tiene).
2. Establece el manejador al nodo raíz del `tree` y maneja los clics en aquellos títulos `<span>`.
