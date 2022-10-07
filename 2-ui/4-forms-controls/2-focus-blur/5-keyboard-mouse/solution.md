
Podemos usar `mouse.onclick` para manejar el clic y hacer el ratón "movible" con `position:fixed`, y luego `mouse.onkeydown` para manejar las flechas del teclado.

La única trampa es que `keydown` solo se dispara en elementos con foco. Así que necesitamos agregar `tabindex` al elemento. Como un requisito es no cambiar el HTML, podemos usar la propiedad `mouse.tabIndex` para eso.

P.S. También podemos reemplazar `mouse.onclick` con `mouse.onfocus`.
