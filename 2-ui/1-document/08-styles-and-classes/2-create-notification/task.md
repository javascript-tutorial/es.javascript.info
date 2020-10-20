importance: 5

---

# Crear una notificación

Escribir una función `showNotification(options)` que cree una notificación: `<div class="notification">` con el contenido dado. La notificación debería desaparecer automáticamente despues de 1.5 segundos.

Las opciones son:

```js
// muestra un elemento con el texto "Hello" cerca de la parte superior de la ventana
showNotification({
  top: 10, // 10px desde la parte superior de la ventana (por defecto es 0px)
  right: 10, // 10px desde el borde derecho de la ventana (por defecto es 0px)
  html: "Hello!", // el HTML de la notificación
  className: "welcome" // una clase adicional para el "div" (opcional)
});
```

[demo src="solution"]


Usar posicionamiento CSS para mostrar el elemento en las coordenadas (top/right) dadas. El documento tiene los estilos necesarios.
