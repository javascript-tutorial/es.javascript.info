# Tamaño de ventana y desplazamiento

¿Cómo encontramos el ancho y el alto de la ventana del navegador? ¿Cómo obtenemos todo el ancho y la altura del documento, incluida la parte desplazada? ¿Cómo desplazamos la página usando JavaScript?

<<<<<<< HEAD
Para la mayoría de estas cuestiones, podemos usar el elemento de documento raíz `document.documentElement`, que corresponde a la etiqueta `<html>`. Pero hay métodos y peculiaridades adicionales lo suficientemente importantes para considerar.
=======
For this type of information, we can use the root document element `document.documentElement`, that corresponds to the `<html>` tag. But there are additional methods and peculiarities to consider.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

## Ancho/alto de la ventana

<<<<<<< HEAD
Para obtener el ancho y alto de la ventana, podemos usar `clientWidth / clientHeight` de `document.documentElement`:
=======
To get window width and height, we can use the `clientWidth/clientHeight` of `document.documentElement`:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

![](document-client-width-height.svg)

```online
Por ejemplo, este botón muestra la altura de su ventana:

<button onclick="alert(document.documentElement.clientHeight)">alert(document.documentElement.clientHeight)</button>
```

<<<<<<< HEAD
````warn header="No *window.innerWidth/Height*"
Los navegadores también admiten propiedades `window.innerWidth / innerHeight`. Se parecen a lo que queremos. Entonces, ¿por qué no usarlos?

Si existe una barra de desplazamiento, y ocupa algo de espacio, `clientWidth / clientHeight` proporciona el ancho / alto sin ella (resta el espacio desplazado). En otras palabras, devuelven ancho / alto de la parte visible del documento, disponible para el contenido.

... Y `window.innerWidth / innerHeight` incluye la barra de desplazamiento.
=======
````warn header="Not `window.innerWidth/innerHeight`"
Browsers also support properties like `window.innerWidth/innerHeight`. They look like what we want, so why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return the width/height of the visible part of the document, available for the content.

`window.innerWidth/innerHeight` includes the scrollbar.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Si hay una barra de desplazamiento y ocupa algo de espacio, estas dos líneas muestran valores diferentes:
```js run
alert( window.innerWidth ); // ancho de la ventana completa
alert( document.documentElement.clientWidth ); // ancho de ventana menos el desplazamiento.
```

<<<<<<< HEAD
En la mayoría de los casos, necesitamos el ancho de ventana *disponible*, para dibujar o colocar algo. Es decir: el espacio del desplazamiento si hay alguno. Entonces deberíamos usar `documentElement.clientHeight/Width`.
=======
In most cases, we need the *available* window width in order to draw or position something within scrollbars (if there are any), so we should use `documentElement.clientHeight/clientWidth`.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
````

```warn header="*DOCTYPE* es importante"
Tenga en cuenta que las propiedades de geometría de nivel superior pueden funcionar de manera un poco diferente cuando no hay `<!DOCTYPE HTML>` en HTML. Pueden suceder cosas extrañas.

En HTML moderno siempre debemos escribir `DOCTYPE`.
```

## Ancho/Alto del documento

<<<<<<< HEAD
Teóricamente, como el elemento del documento raíz es `document.documentElement`, e incluye todo el contenido, podríamos medir el tamaño completo del documento con `document.documentElement.scrollWidth / scrollHeight`.

Pero en ese elemento, para toda la página, estas propiedades no funcionan según lo previsto. ¡En Chrome / Safari / Opera si no hay desplazamiento, entonces `documentElement.scrollHeight` puede ser incluso menor que `documentElement.clientHeight`! Suena como una tontería, raro, ¿verdad?
=======
Theoretically, as the root document element is `document.documentElement`, and it encloses all the content, we could measure the document's full size as `document.documentElement.scrollWidth/scrollHeight`.

But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera, if there's no scroll, then `documentElement.scrollHeight` may be even less than `documentElement.clientHeight`! Weird, right?
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Para obtener de manera confiable la altura completa del documento, debemos tomar el máximo de estas propiedades:

```js run
let scrollHeight = Math.max(
  document.body.scrollHeight, document.documentElement.scrollHeight,
  document.body.offsetHeight, document.documentElement.offsetHeight,
  document.body.clientHeight, document.documentElement.clientHeight
);

alert('Altura completa del documento, con parte desplazada: ' + scrollHeight);
```

¿Por qué? Mejor no preguntes. Estas inconsistencias provienen de tiempos antiguos, no una lógica "inteligente".

## Obtener el desplazamiento actual [#page-scroll]

<<<<<<< HEAD
Los elementos DOM tienen su estado de desplazamiento actual en `elem.scrollLeft/scrollTop`.

El desplazamiento de documentos, `document.documentElement.scrollLeft / Top` funciona en la mayoría de los navegadores, excepto los más antiguos basados en WebKit, como Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), donde deberíamos usar `document.body` en lugar de `document.documentElement`.

Afortunadamente, no tenemos que recordar estas peculiaridades en absoluto, porque el desplazamiento está disponible en las propiedades especiales `window.pageXOffset/pageYOffset`:
=======
DOM elements have their current scroll state in their `scrollLeft/scrollTop` properties.

For document scroll, `document.documentElement.scrollLeft/scrollTop` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties, `window.pageXOffset/pageYOffset`:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
alert('Desplazamiento actual desde la parte superior: ' + window.pageYOffset);
alert('Desplazamiento actual desde la parte izquierda: ' + window.pageXOffset);
```

Estas propiedades son de solo lectura.

## Desplazamiento: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
<<<<<<< HEAD
para desplazar la página desde JavaScript, su DOM debe estar completamente construido.

Por ejemplo, si intentamos desplazar la página desde el script en `<head>`, no funcionará.
=======
To scroll the page with JavaScript, its DOM must be fully built.

For instance, if we try to scroll the page with a script in `<head>`, it won't work.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
```

Los elementos regulares se pueden desplazar cambiando `scrollTop/scrollLeft`.

<<<<<<< HEAD
Nosotros podemos hacer lo mismo para la página usando `document.documentElement.scrollTop/Left` (excepto Safari, donde `document.body.scrollTop/Left` debería usarse en su lugar).

Alternativamente, hay una solución más simple y universal: métodos especiales [window.scrollBy(x,y)](mdn:api/Window/scrollBy) y [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).
=======
We can do the same for the page using `document.documentElement.scrollTop/scrollLeft` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there's a simpler, universal solution: special methods [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

- El método `scrollBy(x, y)` desplaza la página *en relación con su posición actual*. Por ejemplo, `scrollBy(0,10)` desplaza la página `10px` hacia abajo.

    ```online
    El siguiente botón demuestra esto:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
- El método `scrollTo(pageX, pageY)` desplaza la página *a coordenadas absolutas*, de modo que la esquina superior izquierda de la parte visible tiene coordenadas `(pageX, pageY)` en relación con la esquina superior izquierda del documento. Es como configurar `scrollLeft / scrollTop`.

    Para desplazarnos hasta el principio, podemos usar `scrollTo(0,0)`.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

Estos métodos funcionan para todos los navegadores de la misma manera.

## scrollIntoView

<<<<<<< HEAD
Para completar, cubramos un método más: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
=======
For completeness, let's cover one more method: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

La llamada a `elem.scrollIntoView(top)` desplaza la página para hacer visible `elem`. Tiene un argumento:

<<<<<<< HEAD
- si `top=true` (ese es el valor predeterminado), la página se desplazará para que aparezca `element` en la parte superior de la ventana. El borde superior del elemento está alineado con la parte superior de la ventana.
- si `top=false`, la página se desplaza para hacer que `element` aparezca en la parte inferior. El borde inferior del elemento está alineado con la parte inferior de la ventana.

```online
El botón a continuación desplaza la página para mostrarse en la parte superior de la ventana:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

Y este botón desplaza la página para mostrarla en la parte inferior:
=======
- If `top=true` (that's the default), then the page will be scrolled to make `elem` appear on the top of the window. The upper edge of the element will be aligned with the window top.
- If `top=false`, then the page scrolls to make `elem` appear at the bottom. The bottom edge of the element will be aligned with the window bottom.

```online
The button below scrolls the page to position itself at the window top:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

And this button scrolls the page to position itself at the bottom:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## Prohibir el desplazamiento

<<<<<<< HEAD
A veces necesitamos hacer que el documento sea "inescrutable". Por ejemplo, cuando necesitamos cubrirlo con un mensaje grande que requiere atención inmediata, y queremos que el visitante interactúe con ese mensaje, no con el documento.

Para hacer que el documento sea inescrutable, es suficiente establecer `document.body.style.overflow="hidden"`. La página se congelará en su desplazamiento actual.
=======
Sometimes we need to make the document "unscrollable". For instance, when we need to cover the page with a large message requiring immediate attention, and we want the visitor to interact with that message, not with the document.

To make the document unscrollable, it's enough to set `document.body.style.overflow = "hidden"`. The page will "freeze" at its current scroll position.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```online
Prueba esto:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

<<<<<<< HEAD
El primer botón congela el desplazamiento, el segundo lo reanuda.
```

Podemos usar la misma técnica para "congelar" el desplazamiento para otros elementos, no solo para `document.body`.

El inconveniente del método es que la barra de desplazamiento desaparece. Si ocupaba algo de espacio, entonces ese espacio ahora es libre y el contenido "salta" para llenarlo.

Eso parece un poco extraño, pero puede solucionarse si comparamos `clientWidth` antes y después del congelamiento, y si aumentó (la barra de desplazamiento desapareció) luego agregue `padding` a `document.body` en lugar de la barra de desplazamiento, para que mantenga el ancho del contenido igual.
=======
The first button freezes the scroll, while the second one releases it.
```

We can use the same technique to freeze the scroll for other elements, not just for `document.body`.

The drawback of the method is that the scrollbar disappears. If it occupied some space, then that space is now free and the content "jumps" to fill it.

That looks a bit odd, but can be worked around if we compare `clientWidth` before and after the freeze. If it increased (the scrollbar disappeared), then add `padding` to `document.body` in place of the scrollbar to keep the content width the same.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

## Resumen

Geometría:

<<<<<<< HEAD
- Ancho/alto de la parte visible del documento (área de contenido ancho / alto): `document.documentElement.clientWidth/Height`
- Ancho/alto de todo el documento, con la parte desplazada:
=======
- Width/height of the visible part of the document (content area width/height): `document.documentElement.clientWidth/clientHeight`
- Width/height of the whole document, with the scrolled out part:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

    ```js
    let scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );
    ```

Desplazamiento:

- Lee el desplazamiento actual: `window.pageYOffset/pageXOffset`.
- Cambia el desplazamiento actual:

    - `window.scrollTo(pageX,pageY)` -- coordenadas absolutas
    - `window.scrollBy(x,y)` -- desplazamiento relativo al lugar actual,
    - `elem.scrollIntoView(top)` -- desplácese para hacer visible el `elem` (alineación con la parte superior / inferior de la ventana).
