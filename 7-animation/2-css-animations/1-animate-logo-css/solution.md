
CSS para animar tanto `width` como `height`:
```css
/* clase original */

#flyjet {
  transition: all 3s;
}

/* JS añade .growing */
#flyjet.growing {
  width: 400px;
  height: 240px;
}
```

Ten en cuenta que `transitionend` se dispara dos veces, una para cada propiedad. Entonces, si no realizamos una verificación adicional, el mensaje aparecería 2 veces.
