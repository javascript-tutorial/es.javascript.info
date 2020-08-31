importance: 5

---

# Comportamiento mejorado de un tooltip

<<<<<<< HEAD
Escribe JavaScript que muestre un tooltip sobre un elemento con el atributo `data-tooltip`. El valor de este atributo debe convertirse en el texto del tooltip.
=======
Write JavaScript that shows a tooltip over an element with the attribute `data-tooltip`. The value of this attribute should become the tooltip text.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

Es como la tarea <info:task/behavior-tooltip>, pero aquí los elementos anotados se pueden anidar. Los tooltips más internos se muestran.

<<<<<<< HEAD
Solamente un tooltip puede aparecer a la vez.

Por ejemplo:
=======
Only one tooltip may show up at the same time.

For instance:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```html
<div data-tooltip="Aquí – está el interior de la casa" id="house">
  <div data-tooltip="Aquí – está el techo" id="roof"></div>
  ...
  <a href="https://en.wikipedia.org/wiki/The_Three_Little_Pigs" data-tooltip="Continúa leyendo…">Colócate sobre mi</a>
</div>
```

El resultado en el iframe:

[iframe src="solution" height=300 border=1]
