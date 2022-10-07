Importance: 5

---

# Tooltip "inteligente"

Escribe una función que muestre un tooltip sobre un elemento solamente si el visitante mueve el mouse *hacia él*, pero no *a través de él*.

En otras palabras, si el visitante mueve el mouse hacia el elemento y para ahí, muestra el tooltip. Y si solamente mueve el mouse a través, entonces no lo necesitamos. ¿Quién quiere parpadeos extra?

Técnicamente, podemos medir la velocidad del mouse sobre el elemento, y si es lenta podemos asumir que el mouse viene "sobre el elemento" y mostramos el tooltip, si es rápida -- entonces lo ignoramos.

Hay que crear un objeto universal `new HoverIntent(options)` para ello.

Sus `options`:
- `elem` -- elemento a seguir.
- `over` -- una función a llamar si el el mouse viene hacia el elemento: o sea, si viene lentamente o para sobre él.
- `out` -- una función a llamar cuando el mouse abandona el elemento (si `over` fue llamado).

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

Toma en cuenta que el tooltip no "parpadea" cuando el cursor se mueve entre subelementos del reloj.
