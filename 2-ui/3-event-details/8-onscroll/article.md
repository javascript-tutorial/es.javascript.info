# Desplazamiento

El evento `scroll` permite reaccionar al desplazamiento de una página o elemento. Hay bastantes cosas buenas que podemos hacer aquí.

Por ejemplo:
- Mostrar/ocultar controles o información adicional según el lugar del documento en el que se encuentre el/la usuario/a.
- Cargar más datos cuando el/la usuario/a se desplaza hacia abajo hasta el final del documento. 

Aquí hay una pequeña función para mostrar el desplazamiento actual:

```js autorun
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});
```

```online
In action:

Desplazamiento actual = <b id="showScroll">Desplazamiento de la ventana</b>
```

El evento `scroll` funciona tanto en `window` como en los elementos desplazables.

## Evitar el desplazamiento

¿Qué hacemos para que algo no se pueda desplazar?

No podemos evitar el desplazamiento utilizando `event.preventDefault()` oyendo al evento `onscroll`, porque este se activa *después* de que el desplazamiento haya ocurrido.

Pero podemos prevenir el desplazamiento con `event.preventDefault()` en un evento que cause el desplazamiento, por ejemplo en el evento `keydown` para `key:pageUp` y `key:pageDown`.

Si añadimos un manejador de eventos a estos eventos y un `event.preventDefault()` en el manejador, entonces el desplazamiento no se iniciará.

Hay muchas maneras de iniciar un desplazamiento, la más fiable es usar CSS, la propiedad `overflow`.

Aquí hay algunas tareas que puede resolver o revisar para ver aplicaciones de `onscroll`.
