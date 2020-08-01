El manejador `onscroll` debería comprobar qué imágenes son visibles y mostrarlas.

También queremos que se ejecute cuando se cargue la página, para detectar las imágenes visibles inmediatamente y cargarlas.

El código debería ejecutarse cuando se cargue el documento, para que tenga acceso a su contenido.

O ponerlo en la parte inferior del `<body>`:

```js
// ...el contenido de la página está arriba...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  // ¿El borde superior del elemento es visible?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // ¿El borde inferior del elemento es visible?
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

La función `showVisible()` utiliza el control de visibilidad, implementado por `isVisible()`, para cargar imágenes visibles:

```js
function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}

*!*
showVisible();
window.onscroll = showVisible;
*/!*
```

P.D. La solución tiene una variante de `isVisible` que "precarga" imágenes que están dentro de 1 página por encima/debajo del desplazamiento del documento actual.
