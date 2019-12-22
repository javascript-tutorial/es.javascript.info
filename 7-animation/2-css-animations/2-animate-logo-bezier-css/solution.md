Necesitamos elegir la curva de Bézier correcta para esa animación. Debe tener `y>1` en algún punto para que el avión "salte".

Por ejemplo, podemos tomar ambos puntos de control con `y>1`, como: `cubic-bezier(0.25, 1.5, 0.75, 1.5)`.

La gráfica:

![](bezier-up.svg)
