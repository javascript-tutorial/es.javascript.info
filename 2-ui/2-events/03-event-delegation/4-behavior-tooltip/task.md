importance: 5

---

# Comportamiento: Tooltip

Crea código JS para el comportamiento "tooltip".

Cuando un mouse pasa sobre un elemento con `data-tooltip`, el tooltip debe aparecer sobre él, y ocultarse cuando se va.

Un ejemplo en HTML comentado:
```html
<button data-tooltip="the tooltip is longer than the element">Short button</button>
<button data-tooltip="HTML<br>tooltip">One more button</button>
```

Debe funcionar así:

[iframe src="solution" height=200 border=1]

En esta tarea suponemos que todos los elementos con `data-tooltip` solo tienen texto dentro. Sin tags anidados (todavía).

Detalles:

- La distancia entre el elemento y el tooltip debe ser `5px`.
- El tooltip debe ser centrado relativo al elemento si es posible.
- El tooltip no debe cruzar los bordes de la ventana. Normalmente debería estar sobre el elemento, pero si el elemento está en la parte superior de la página y no hay espacio para el tooltip, entonces debajo de él.
- El contenido del tooltip está dado en el atributo `data-tooltip`. Este puede ser HTML arbitrario.

Necesitarás dos eventos aquí:
- `mouseover` se dispara cuando el puntero pasa sobre el elemento.
- `mouseout` se dispara cuando el puntero deja el elemento.

Usa delegación de eventos:  prepare dos manejadores en el `document` para rastrear todos los "overs" y "outs" de los elementos con `data-tooltip` y administra los tooltips desde allí.

Después de implementar el comportamiento, incluso gente no familiarizada con JavaScript puede agregar elementos anotados.

P.D. Solamente un tooltip puede mostrarse a la vez.
