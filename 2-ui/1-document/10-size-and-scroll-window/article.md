# Tamaño de ventana y desplazamiento

<<<<<<< HEAD
¿Cómo encontramos el ancho y el alto de la ventana del navegador? ¿Cómo obtenemos todo el ancho y la altura del documento, incluida la parte desplazada? ¿Cómo desplazamos la página usando JavaScript?

Para la mayoría de estas cuestiones, podemos usar el elemento de documento raíz `document.documentElement`, que corresponde a la etiqueta `<html>`. Pero hay métodos y peculiaridades adicionales lo suficientemente importantes para considerar.
=======
How do we find the width and height of the browser window? How do we get the full width and height of the document, including the scrolled out part? How do we scroll the page using JavaScript?

For most such requests, we can use the root document element `document.documentElement`, that corresponds to the `<html>` tag. But there are additional methods and peculiarities important enough to consider.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

## Ancho/alto de la ventana

<<<<<<< HEAD
Para obtener el ancho y alto de la ventana, podemos usar `clientWidth / clientHeight` de `document.documentElement`:
=======
To get window width and height we can use `clientWidth/clientHeight` of `document.documentElement`:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

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
````warn header="Not `window.innerWidth/Height`"
Browsers also support properties `window.innerWidth/innerHeight`. They look like what we want. So why not to use them instead?

If there exists a scrollbar, and it occupies some space, `clientWidth/clientHeight` provide the width/height without it (subtract it). In other words, they return width/height of the visible part of the document, available for the content.

...And `window.innerWidth/innerHeight` include the scrollbar.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

Si hay una barra de desplazamiento y ocupa algo de espacio, estas dos líneas muestran valores diferentes:
```js run
alert( window.innerWidth ); // ancho de la ventana completa
alert( document.documentElement.clientWidth ); // ancho de ventana menos el desplazamiento.
```

En la mayoría de los casos, necesitamos el ancho de ventana *disponible*, para dibujar o colocar algo. Es decir: el espacio del desplazamiento si hay alguno. Entonces deberíamos usar `documentElement.clientHeight/Width`.
````

```warn header="*DOCTYPE* es importante"
Tenga en cuenta que las propiedades de geometría de nivel superior pueden funcionar de manera un poco diferente cuando no hay `<!DOCTYPE HTML>` en HTML. Pueden suceder cosas extrañas.

<<<<<<< HEAD
En HTML moderno siempre debemos escribir `DOCTYPE`.
=======
In modern HTML we should always write `DOCTYPE`.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
```

## Ancho/Alto del documento

<<<<<<< HEAD
Teóricamente, como el elemento del documento raíz es `document.documentElement`, e incluye todo el contenido, podríamos medir el tamaño completo del documento con `document.documentElement.scrollWidth / scrollHeight`.

Pero en ese elemento, para toda la página, estas propiedades no funcionan según lo previsto. ¡En Chrome / Safari / Opera si no hay desplazamiento, entonces `documentElement.scrollHeight` puede ser incluso menor que `documentElement.clientHeight`! Suena como una tontería, raro, ¿verdad?

Para obtener de manera confiable la altura completa del documento, debemos tomar el máximo de estas propiedades:
=======
Theoretically, as the root document element is `document.documentElement`, and it encloses all the content, we could measure document full size as `document.documentElement.scrollWidth/scrollHeight`.

But on that element, for the whole page, these properties do not work as intended. In Chrome/Safari/Opera if there's no scroll, then `documentElement.scrollHeight` may be even less than  `documentElement.clientHeight`! Sounds like a nonsense, weird, right?

To reliably obtain the full document height, we should take the maximum of these properties:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

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
DOM elements have their current scroll state in `elem.scrollLeft/scrollTop`.

For document scroll `document.documentElement.scrollLeft/Top` works in most browsers, except older WebKit-based ones, like Safari (bug [5991](https://bugs.webkit.org/show_bug.cgi?id=5991)), where we should use `document.body` instead of `document.documentElement`.

Luckily, we don't have to remember these peculiarities at all, because the scroll is available in the special properties `window.pageXOffset/pageYOffset`:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js run
alert('Desplazamiento actual desde la parte superior: ' + window.pageYOffset);
alert('Desplazamiento actual desde la parte izquierda: ' + window.pageXOffset);
```

Estas propiedades son de solo lectura.

## Desplazamiento: scrollTo, scrollBy, scrollIntoView [#window-scroll]

```warn
para desplazar la página desde JavaScript, su DOM debe estar completamente construido.

Por ejemplo, si intentamos desplazar la página desde el script en `<head>`, no funcionará.
```

Los elementos regulares se pueden desplazar cambiando `scrollTop/scrollLeft`.

<<<<<<< HEAD
Nosotros podemos hacer lo mismo para la página usando `document.documentElement.scrollTop/Left` (excepto Safari, donde `document.body.scrollTop/Left` debería usarse en su lugar).

Alternativamente, hay una solución más simple y universal: métodos especiales [window.scrollBy(x,y)](mdn:api/Window/scrollBy) y [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).

- El método `scrollBy(x, y)` desplaza la página *en relación con su posición actual*. Por ejemplo, `scrollBy(0,10)` desplaza la página `10px` hacia abajo.
=======
We can do the same for the page using `document.documentElement.scrollTop/Left` (except Safari, where `document.body.scrollTop/Left` should be used instead).

Alternatively, there's a simpler, universal solution: special methods  [window.scrollBy(x,y)](mdn:api/Window/scrollBy) and [window.scrollTo(pageX,pageY)](mdn:api/Window/scrollTo).

- The method `scrollBy(x,y)` scrolls the page *relative to its current position*. For instance, `scrollBy(0,10)` scrolls the page `10px` down.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

    ```online
    El siguiente botón demuestra esto:

    <button onclick="window.scrollBy(0,10)">window.scrollBy(0,10)</button>
    ```
<<<<<<< HEAD
- El método `scrollTo(pageX, pageY)` desplaza la página *a coordenadas absolutas*, de modo que la esquina superior izquierda de la parte visible tiene coordenadas `(pageX, pageY)` en relación con la esquina superior izquierda del documento. Es como configurar `scrollLeft / scrollTop`.
=======
- The method `scrollTo(pageX,pageY)` scrolls the page *to absolute coordinates*, so that the top-left corner of the visible part has coordinates `(pageX, pageY)` relative to the document's top-left corner. It's like setting `scrollLeft/scrollTop`.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

    Para desplazarnos hasta el principio, podemos usar `scrollTo(0,0)`.

    ```online
    <button onclick="window.scrollTo(0,0)">window.scrollTo(0,0)</button>
    ```

Estos métodos funcionan para todos los navegadores de la misma manera.

## scrollIntoView

Para completar, cubramos un método más: [elem.scrollIntoView(top)](mdn:api/Element/scrollIntoView).

La llamada a `elem.scrollIntoView(top)` desplaza la página para hacer visible `elem`. Tiene un argumento:

- si `top=true` (ese es el valor predeterminado), la página se desplazará para que aparezca `element` en la parte superior de la ventana. El borde superior del elemento está alineado con la parte superior de la ventana.
- si `top=false`, la página se desplaza para hacer que `element` aparezca en la parte inferior. El borde inferior del elemento está alineado con la parte inferior de la ventana.

```online
El botón a continuación desplaza la página para mostrarse en la parte superior de la ventana:

<button onclick="this.scrollIntoView()">this.scrollIntoView()</button>

Y este botón desplaza la página para mostrarla en la parte inferior:

<button onclick="this.scrollIntoView(false)">this.scrollIntoView(false)</button>
```

## Prohibir el desplazamiento

A veces necesitamos hacer que el documento sea "inescrutable". Por ejemplo, cuando necesitamos cubrirlo con un mensaje grande que requiere atención inmediata, y queremos que el visitante interactúe con ese mensaje, no con el documento.

Para hacer que el documento sea inescrutable, es suficiente establecer `document.body.style.overflow="hidden"`. La página se congelará en su desplazamiento actual.

```online
Prueba esto:

<button onclick="document.body.style.overflow = 'hidden'">document.body.style.overflow = 'hidden'</button>

<button onclick="document.body.style.overflow = ''">document.body.style.overflow = ''</button>

El primer botón congela el desplazamiento, el segundo lo reanuda.
```

Podemos usar la misma técnica para "congelar" el desplazamiento para otros elementos, no solo para `document.body`.

El inconveniente del método es que la barra de desplazamiento desaparece. Si ocupaba algo de espacio, entonces ese espacio ahora es libre y el contenido "salta" para llenarlo.

Eso parece un poco extraño, pero puede solucionarse si comparamos `clientWidth` antes y después del congelamiento, y si aumentó (la barra de desplazamiento desapareció) luego agregue `padding` a `document.body` en lugar de la barra de desplazamiento, para que mantenga el ancho del contenido igual.

## Resumen

Geometría:

- Ancho/alto de la parte visible del documento (área de contenido ancho / alto): `document.documentElement.clientWidth/Height`
- Ancho/alto de todo el documento, con la parte desplazada:

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
