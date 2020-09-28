
# Mutation observer

<<<<<<< HEAD
`MutationObserver` es un objeto incorporado que observa un elemento DOM y dispara un callback cuando hay cambios en él.
=======
`MutationObserver` is a built-in object that observes a DOM element and fires a callback when it detects a change.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Primero veremos su sintaxis, luego exploraremos un caso de la vida real para ver dónde puede ser útil.

## Sintaxis

`MutationObserver` es fácil de usar.

Primero creamos un observador con una función callback:

```js
let observer = new MutationObserver(callback);
```

Y luego lo vinculamos a un nodo DOM:

```js
observer.observe(node, config);
```

`config` es un objeto con opciones booleanas "a qué clase de cambios reaccionar":
- `childList` -- cambios en los hijos directos de `node`,
- `subtree` -- en todos los descendientes de `node`,
- `attributes` -- atributos de `node`,
- `attributeFilter` -- un array de nombres de atributos, para observar solamente a los seleccionados,
- `characterData` -- establece si debe observar cambios de texto en `node.data` o no,

Algunas otras opciones:
- `attributeOldValue` -- si es `true`, tanto el valor viejo como el nuevo del atributo son pasados al callback (ver abajo), de otro modo pasa solamente el nuevo (necesita la opción `attributes`),
- `characterDataOldValue` -- si es `true`, tanto el valor viejo como el nuevo de `node.data` son pasados al callback (ver abajo), de otro modo pasa solamente el nuevo (necesita la opción `characterData`).

Entonces, después de cualquier cambio, el `callback` es ejecutado: los cambios son pasados en el primer argumento como una lista objetos [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord), y el observador en sí mismo como segundo argumento.

Los objetos [MutationRecord](https://dom.spec.whatwg.org/#mutationrecord) tienen como propiedades:

- `type` -- tipo de mutación, uno de:
    - `"attributes"`: atributo modificado,
    - `"characterData"`: dato modificado, usado para nodos de texto,
    - `"childList"`: elementos hijos agregados o quitados,
- `target` -- dónde ocurrió el cambio: un elemento para `"attributes"`, o un nodo de texto para `"characterData"`, o un elemento para una mutación de `"childList"`,
- `addedNodes/removedNodes` -- nodos que fueron agregados o quitados,
- `previousSibling/nextSibling` -- los nodos "hermanos", previos y siguientes a los nodos agregados y quitados,
- `attributeName/attributeNamespace` -- el nombre o namespace (para XML) del atributo cambiado,
- `oldValue` -- el valor previo, solamente cambios de atributo o cambios de texto si se establece la opción correspondiente `attributeOldValue`/`characterDataOldValue`.

Por ejemplo, aquí hay un `<div>` con un atributo `contentEditable`. Ese atributo nos permite poner el foco en él y editarlo.

```html run
<div contentEditable id="elem">Click and <b>edit</b>, please</div>

<script>
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords); // console.log(los cambios)
});

// observa todo exceptuando atributos
observer.observe(elem, {
  childList: true, // observa hijos directos
  subtree: true, // y descendientes inferiores también
  characterDataOldValue: true // pasa el dato viejo al callback 
});
</script>
```

Si ejecutamos este código en el navegador, el foco en el `<div>` dado y el cambio en texto dentro de `<b>edit</b>`, `console.log` mostrará una mutación:

```js
mutationRecords = [{
  type: "characterData",
  oldValue: "edit",
  target: <text node>,
  // otras propiedades vacías
}];
```

Si hacemos operaciones de edición más complejas, como eliminar el `<b>edit</b>`, el evento de mutación puede contener múltiples registros de mutación:

```js
mutationRecords = [{
  type: "childList",
  target: <div#elem>,
  removedNodes: [<b>],
  nextSibling: <text node>,
  previousSibling: <text node>
  // otras propiedades vacías
}, {
  type: "characterData"
  target: <text node>
  // ...detalles de mutación dependen de cómo el navegador maneja tal eliminación
  // puede unir dos nodos de texto adyacentes "edit " y ", please" en un nodo
  // o puede dejarlos como nodos de texto separados
}];
```

Así, `MutationObserver` permite reaccionar a cualquier cambio dentro del subárbol DOM.

## Uso para integración

¿Cuándo puede ser práctico esto?

Imagina la situación cuando necesitas añadir un script de terceros que contiene funcionalidad útil pero que también hace algo no deseado, por ejemplo añadir publicidad `<div class="ads">Unwanted ads</div>`.

Naturalmente el script de terceras partes no proporciona mecanismos para removerlo.

Usando `MutationObserver` podemos detectar cuándo aparece el elemento no deseado en nuestro DOM y removerlo.

Hay otras situaciones, como cuando un script de terceras partes agrega algo en nuestro documento y quisiéramos detectarlo para adaptar nuestra página y cambiar el tamaño de algo dinámicamente, etc.

`MutationObserver` permite implementarlo.

## Uso para arquitectura

Hay también situaciones donde `MutationObserver` es bueno desde el punto de vista de la arquitectura.

Digamos que estamos haciendo un sitio web acerca de programación. Naturalmente, los artículos y otros materiales pueden contener fragmentos de código.

Tal fragmento en un markup HTML se ve como esto:

```html
...
<pre class="language-javascript"><code>
  // aquí el código
  let hello = "world";
</code></pre>
...
```

<<<<<<< HEAD
También usaremos una librería JavaScript de "highlighting" para resaltar elementos en nuestro sitio, por ejemplo [Prism.js](https://prismjs.com/). Una llamada a `Prism.highlightElem(pre)` examina el contenido de tales elementos `pre` y les agrega tags y styles especiales para obtener sintaxis resaltada con color, similares a los que ves en esta página.

¿Exactamente cuándo ejecutar tal método de highlighting? Podemos hacerlo en el evento `DOMContentLoaded`, o al final de la página. En el momento en que tenemos nuestro DOM listo buscamos los elementos `pre[class*="language"]` y llamamos `Prism.highlightElem` en ellos:
=======
For better readability and at the same time, to beautify it, we'll be using a JavaScript syntax highlighting library on our site, like [Prism.js](https://prismjs.com/). To get syntax highlighting for above snippet in Prism, `Prism.highlightElem(pre)` is called, which examines the contents of such `pre` elements and adds special tags and styles for colored syntax highlighting into those elements, similar to what you see in examples here, on this page.

When exactly should we run that highlighting method? Well, we can do it on `DOMContentLoaded` event, or put the script at the bottom of the page. The moment our DOM is ready, we can search for elements `pre[class*="language"]` and call `Prism.highlightElem` on them:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js
// resaltar todos los fragmentos de código en la página
document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
```

<<<<<<< HEAD
Todo es simple hasta ahora, ¿verdad? Hay fragmentos de código `<pre>` en HTML y los resaltamos.
=======
Everything's simple so far, right? We find code snippets in HTML and highlight them.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Continuemos. Digamos que vamos a buscar dinámicamente material desde un servidor. Estudiaremos métodos para ello [más adelante](info:fetch) en el tutorial. Por ahora solamente importa que buscamos un artículo HTML desde un servidor web y lo mostramos bajo demanda:

```js
let article = /* busca contenido nuevo desde un servidor */
articleElem.innerHTML = article;
```

El nuevo elemento HTML `article` puede contener fragmentos de código. Necesitamos llamar `Prism.highlightElem` en ellos, de otro modo no se resaltarían.

**¿Dónde y cuándo llamar `Prism.highlightElem` en un artículo cargado dinámicamente?**

Podríamos agregar el llamado al código que carga un "article", como esto:

```js
let article = /* busca contenido nuevo desde un servidor */
articleElem.innerHTML = article;

*!*
let snippets = articleElem.querySelectorAll('pre[class*="language-"]');
snippets.forEach(Prism.highlightElem);
*/!*
```

<<<<<<< HEAD
...Pero imagina que tenemos muchos lugares en el código donde cargamos contenido: artículos, cuestionarios, entradas de foros. ¿Necesitamos poner el llamado al "highlighting" en todos lugares? No es muy conveniente, y es fácil de olvidar además.

¿Y si el contenido es cargado por un módulo de terceras partes? Por ejemplo tenemos un foro, escrito por algún otro, que carga contenido dinámicamente y quisiéramos añadirle sintaxis de highlighting. A nadie le gusta emparchar scripts de terceras partes.
=======
...But, imagine if we have many places in the code where we load our content - articles, quizzes, forum posts, etc. Do we need to put the highlighting call everywhere, to highlight the code in content after loading? That's not very convenient.

And what if the content is loaded by a third-party module? For example, we have a forum written by someone else, that loads content dynamically, and we'd like to add syntax highlighting to it. No one likes patching third-party scripts.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Afortunadamente hay otra opción.

<<<<<<< HEAD
Podemos usar `MutationObserver` para detectar automáticamente cuándo los fragmentos de código son insertados en la página y resaltarlos.
=======
We can use `MutationObserver` to automatically detect when code snippets are inserted into the page and highlight them.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Entonces manejaremos la funcionalidad de "highlighting" en un único lugar, liberándonos de la necesidad de integrarlo.

### Demo de highlight dinámico

Aquí el ejemplo funcionando.

Si ejecutas el código, este comienza a observar el elemento debajo y resalta cualquier fragmento de código que aparezca allí:

```js run
let observer = new MutationObserver(mutations => {

  for(let mutation of mutations) {
    // examine nodos nuevos, ¿hay algo para resaltar?

    for(let node of mutation.addedNodes) {
      // seguimos elementos solamente, saltamos los otros nodos (es decir nodos de texto)
      if (!(node instanceof HTMLElement)) continue;

      // verificamos que el elemento insertado sea un fragmento de código
      if (node.matches('pre[class*="language-"]')) {
        Prism.highlightElement(node);
      }

      // ¿o tal vez haya un fragmento de código en su sub-árbol?
      for(let elem of node.querySelectorAll('pre[class*="language-"]')) {
        Prism.highlightElement(elem);
      }
    }
  }

});

let demoElem = document.getElementById('highlight-demo');

observer.observe(demoElem, {childList: true, subtree: true});
```

Aquí, abajo, hay un elemento HTML y JavaScript que lo llena dinámicamente usando `innerHTML`.

Por favor ejecuta el código anterior (arriba, que observa aquel elemento) y luego el código de abajo. Verás cómo `MutationObserver` detecta y resalta el fragmento.

<p id="highlight-demo" style="border: 1px solid #ddd">A demo-element with <code>id="highlight-demo"</code>, run the code above to observe it.</p>

El siguiente código llena su `innerHTML`, lo que causa que `MutationObserver` reaccione y resalte su contenido:

```js run
let demoElem = document.getElementById('highlight-demo');

// inserta contenido con fragmentos de código
demoElem.innerHTML = `A code snippet is below:
  <pre class="language-javascript"><code> let hello = "world!"; </code></pre>
  <div>Another one:</div>
  <div>
    <pre class="language-css"><code>.class { margin: 5px; } </code></pre>
  </div>
`;
```

Ahora tenemos un `MutationObserver` que puede rastrear todo el "highlighting" en los elementos observados del `document` entero. Podemos agregar o quitar fragmentos de código en el HTML sin siquiera pensar en ello.

## Métodos adicionales

Hay un método para detener la observación del nodo:

- `observer.disconnect()` -- detiene la observación.

<<<<<<< HEAD
Cuando detenemos la observación, algunos cambios todavía podrían quedar sin ser procesados por el observador.

- `observer.takeRecords()` -- obtiene una lista de registros de mutaciones sin procesar, aquellos que ocurrieron pero el callback no manejó.
=======
When we stop the observing, it might be possible that some changes were not yet processed by the observer. In such cases, we use

- `observer.takeRecords()` -- gets a list of unprocessed mutation records - those that happened, but the callback has not handled them.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Estos métodos pueden ser usados juntos, como esto:

```js
<<<<<<< HEAD
// quisiéramos detener el rastreo de cambios
observer.disconnect();

// manejar algunas mutaciones que no fueron procesadas
=======
// get a list of unprocessed mutations
// should be called before disconnecting,
// if you care about possibly unhandled recent mutations
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
let mutationRecords = observer.takeRecords();

// stop tracking changes
observer.disconnect();
...
```

<<<<<<< HEAD
```smart header="Interacción con la recolección de basura"
Los observadores usan internamente referencias débiles. Esto es: si un nodo es quitado del DOM y se hace inalcanzable, se vuelve basura a ser recolectada.
=======

```smart header="Records returned by `observer.takeRecords()` are removed from the processing queue"
The callback won't be called for records, returned by `observer.takeRecords()`.
```

```smart header="Garbage collection interaction"
Observers use weak references to nodes internally. That is, if a node is removed from the DOM, and becomes unreachable, then it can be garbage collected.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

El mero hecho de que un nodo DOM sea observado no evita la recolección de basura.
```

## Resumen  

<<<<<<< HEAD
`MutationObserver` puede reaccionar a cambios en el DOM: atributos, elementos añadidos y quitados, contenido de texto.
=======
`MutationObserver` can react to changes in DOM - attributes, text content and adding/removing elements.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Podemos usarlo para rastrear cambios introducidos por otras partes de nuestro código o bien para integrarlo con scripts de terceras partes.

`MutationObserver` puede rastrear cualquier cambio. Las opciones de `config` permiten establecer qué se va a observar, se usa para optimización y no desperdiciar recursos en llamados al callback innecesarios.
