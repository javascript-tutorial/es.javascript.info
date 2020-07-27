Importance: 5

---

# Tooltip "inteligente"

<<<<<<< HEAD
Escribe una función que muestre un tooltip sobre un elemento solamente si el visitante mueve el mouse *hacia él*, pero no *a través de él*.

En otras palabras, si el visitante mueve el mouse hacia el elemento y para ahí -- muestra el tooltip. Y si solamente mueve el mouse a través, entonces no lo necesitamos. ¿Quién quiere parpadeos extra?
=======
Write a function that shows a tooltip over an element only if the visitor moves the mouse *to it*, but not *through it*.

In other words, if the visitor moves the mouse to the element and stops there -- show the tooltip. And if they just moved the mouse through, then no need, who wants extra blinking?
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Tecnicamente, podemos medir la velocidad del mouse sobre el elemento, y si es lenta podemos asumir que el mouse viene "sobre el elemento" y mostramos el tooltip, si es rápida -- entonces lo ignoramos.

<<<<<<< HEAD
Hay que crear un objeto universal `new HoverIntent(options)` para ello.

Sus `options`:
- `elem` -- elemento a seguir.
- `over` -- una función a llamar si el el mouse viene hacia el elemento: o sea, si viene lentamente o para sobre él.
- `out` -- una función a llmar cuando el mouse abandona el lemento (si `over` fue llamado).
=======
Make a universal object `new HoverIntent(options)` for it.

Its `options`:
- `elem` -- element to track.
- `over` -- a function to call if the mouse came to the element: that is, it moves slowly or stopped over it.
- `out` -- a function to call when the mouse leaves the element (if `over` was called).
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Un ejemplo de dicho objeto siendo usado para el tooltip:

```js
//  Un tooltip de muestra
let tooltip = document.createElement('div');
tooltip.className = "tooltip";
tooltip.innerHTML = "Tooltip";

// El objeto va a rastrear al mouse y llamar a over/out
new HoverIntent({
  elem,
  over() {
    tooltip.style.left = elem.getBoundingClientRect().left + 'px';
    tooltip.style.top = elem.getBoundingClientRect().bottom + 5 + 'px';
    document.body.append(tooltip);
  },
  out() {
    tooltip.remove();
  }
});
```

El demo:

[iframe src="solution" height=140]

Si mueves el mouse sobre el "reloj" rápido no pasará nada, y si lo haces lento o paras sobre él entonces habrá un tooltip.

Toma en cuenta que el tooltip no "parpadea" cuando el cusor se mueve entre subelementos del reloj.
