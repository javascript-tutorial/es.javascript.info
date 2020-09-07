El manejador `onscroll` debería comprobar qué imágenes son visibles y mostrarlas.

<<<<<<< HEAD
También queremos que se ejecute cuando se cargue la página, para detectar las imágenes visibles inmediatamente y cargarlas.

El código debería ejecutarse cuando se cargue el documento, para que tenga acceso a su contenido.

O ponerlo en la parte inferior del `<body>`:
=======
We also want to run it when the page loads, to detect immediately visible images and load them.

The code should execute when the document is loaded, so that it has access to its content.

Or put it at the `<body>` bottom:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js
// ...el contenido de la página está arriba...

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

<<<<<<< HEAD
  // ¿El borde superior del elemento es visible?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // ¿El borde inferior del elemento es visible?
=======
  // top elem edge is visible?
  let topVisible = coords.top > 0 && coords.top < windowHeight;

  // bottom elem edge is visible?
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}
```

<<<<<<< HEAD
La función `showVisible()` utiliza el control de visibilidad, implementado por `isVisible()`, para cargar imágenes visibles:
=======
The `showVisible()` function uses the visibility check, implemented by `isVisible()`, to load visible images:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

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

<<<<<<< HEAD
P.D. La solución tiene una variante de `isVisible` que "precarga" imágenes que están dentro de 1 página por encima/debajo del desplazamiento del documento actual.
=======
P.S. The solution also has a variant of `isVisible` that "preloads" images that are within 1 page above/below the current document scroll.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
