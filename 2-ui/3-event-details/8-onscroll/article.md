# Desplazamiento

<<<<<<< HEAD
El evento `scroll` permite reaccionar al desplazamiento de una página o elemento. Hay bastantes cosas buenas que podemos hacer aquí.
=======
The `scroll` event allows to react on a page or element scrolling. There are quite a few good things we can do here.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

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

<<<<<<< HEAD
¿Qué hacemos para que algo no se pueda desplazar?

No podemos evitar el desplazamiento utilizando `event.preventDefault()` oyendo al evento `onscroll`, porque este se activa *después* de que el desplazamiento haya ocurrido.

Pero podemos prevenir el desplazamiento con `event.preventDefault()` en un evento que cause el desplazamiento, por ejemplo en el evento `keydown` para `key:pageUp` y `key:pageDown`.

Si añadimos un manejador de eventos a estos eventos y un `event.preventDefault()` en el manejador, entonces el desplazamiento no se iniciará.
=======
How do we make something unscrollable?

We can't prevent scrolling by using `event.preventDefault()` in `onscroll` listener, because it triggers *after* the scroll has already happened.

But we can prevent scrolling by `event.preventDefault()` on an event that causes the scroll, for instance `keydown` event for `key:pageUp` and `key:pageDown`.

If we add an event handler to these events and `event.preventDefault()` in it, then the scroll won't start.

There are many ways to initiate a scroll, so it's more reliable to use CSS, `overflow` property.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

Hay muchas maneras de iniciar un desplazamiento, la más fiable es usar CSS, la propiedad `overflow`.

Aquí hay algunas tareas que puedes resolver o mirar para ver las aplicaciones de `onscroll`.
