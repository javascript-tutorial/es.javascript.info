
# Elemento reloj dinámico

Ya tenemos un elemento `<time-formatted>` para mostrar la hora agradablemente formateada.

Crea el elemento `<live-timer>` para mostrar la hora actual:
1. Internamente debe usar `<time-formatted>`, no duplicar su funcionalidad.
2. Aactualiza (¡tic!) cada segundo.
3. Por cada tic, se debe generar un evento personalizado llamado `tick` con la fecha actual en `event.detail` (ver artículo <info:dispatch-events>).

Uso:

```html
<live-timer id="elem"></live-timer>

<script>
  elem.addEventListener('tick', event => console.log(event.detail));
</script>
```

Demo:

[iframe src="solution" height=40]
