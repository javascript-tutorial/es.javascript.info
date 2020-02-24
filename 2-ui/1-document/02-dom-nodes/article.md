libs:
  - d3
  - domtree

---

# EL árbol DOM

<<<<<<< HEAD
La columna vertebral de un documento HTML son las etiquetas.

De acuerdo con el Modelo de Objetos del Documento (DOM), cada etiqueta HTML es un objeto. Las etiquetas anidadas se llaman "hijos" del que los contiene.

El texto dentro de una etiqueta también es un objeto.

Todos estos objetos son accesibles utilizando JavaScript.

## Un ejemplo del DOM

Por ejemplo, exploremos el DOM para este documento:
=======
The backbone of an HTML document is tags.

According to the Document Object Model (DOM), every HTML tag is an object. Nested tags are  "children" of the enclosing one. The text inside a tag is an object as well.

All these objects are accessible using JavaScript, and we can use them to modify the page.

For example, `document.body` is the object representing the `<body>` tag.

Running this code will make the `<body>` red for 3 seconds:

```js run
document.body.style.background = 'red'; // make the background red

setTimeout(() => document.body.style.background = '', 3000); // return back
```

Here we used `style.background` to change the background color of `document.body`, but there are many other properties, such as:

- `innerHTML` -- HTML contents of the node.
- `offsetWidth` -- the node width (in pixels)
- ...and so on.

Soon we'll learn more ways to manipulate the DOM, but first we need to know about its structure.

## An example of the DOM

Let's start with the following simple document:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```html run no-beautify
<!DOCTYPE HTML>
<html>
<head>
<<<<<<< HEAD
  <title>Sobre los Alces</title>
</head>
<body>
  La verdad sobre los alces.
=======
  <title>About elk</title>
</head>
<body>
  The truth about elk.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
</body>
</html>
```
El DOM representa el HTML como una estructura de árbol de etiquetas. Así es como se ve:

<div class="domtree"></div>

<script>
<<<<<<< HEAD
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Sobre los alces"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n  "},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  La verdad sobre los alces."}]}]}
=======
let node1 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n    "},{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]},{"name":"#text","nodeType":3,"content":"\n  "}]},{"name":"#text","nodeType":3,"content":"\n  "},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk."}]}]}
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

drawHtmlTree(node1, 'div.domtree', 690, 320);
</script>

```online
En la imagen de arriba, puede hacer clic en los nodos de elementos y sus hijos se abrirán/contraerán.
```

<<<<<<< HEAD
Las etiquetas se denominan *nodos de elementos* (o simplemente elementos). Las etiquetas anidadas se convierten en hijos del que los contiene. Como resultado tenemos un árbol de elementos: `<html>` está en la raíz, entonces `<head>` y `<body>` son sus hijos, etc.
=======
Every tree node is an object.

Tags are *element nodes* (or just elements) and form the tree structure: `<html>` is at the root, then `<head>` and `<body>` are its children, etc.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

El texto dentro de los elementos forman *nodos de texto*, etiquetados como `#text`. Un nodo de texto contiene sólo una cadena. Puede que no tenga hijos y siempre es una hoja del árbol.

<<<<<<< HEAD
Por ejemplo, la etiqueta `<title>` tiene el texto `"Sobre los alces"`.
=======
For instance, the `<title>` tag has the text `"About elk"`.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

Ten en cuenta los caracteres especiales en los nodos de texto:

- Una nueva linea: `↵` (en JavaScript se conoce como `\n`)
- Un espacio: `␣`

<<<<<<< HEAD
Los espacios y las nuevas líneas son caracteres totalmente válidos, forman nodos de texto y se convierten en parte del DOM. Así, por ejemplo, en el ejemplo anterior, la etiqueta `<head>` contiene algunos espacios antes de `<title>`, y ese texto se convierte en un nodo `#text` (contiene una nueva línea y solo algunos espacios).

Solo hay dos exclusiones de nivel superior:
1. Los espacios y las nuevas líneas antes de `<head>` se ignoran por razones históricas,
2. Si colocamos algo después de `</body>`, entonces eso se mueve automáticamente dentro de `body`, al final, ya que la especificación HTML requiere que todo el contenido esté dentro de `<body>`. Así que puede que no haya espacios después de `</body>`.

En los demás casos, todo es más sencillo: si hay espacios (como cualquier carácter) en el documento, entonces se convierten en nodos de texto en el DOM, y si los eliminamos, entonces no habrá ninguno.
=======
Spaces and newlines are totally valid characters, like letters and digits. They form text nodes and become a part of the DOM. So, for instance, in the example above the `<head>` tag contains some spaces before `<title>`, and that text becomes a `#text` node (it contains a newline and some spaces only).

There are only two top-level exclusions:
1. Spaces and newlines before `<head>` are ignored for historical reasons.
2. If we put something after `</body>`, then that is automatically moved inside the `body`, at the end, as the HTML spec requires that all content must be inside `<body>`. So there can't be any spaces after `</body>`.

In other cases everything's straightforward -- if there are spaces (just like any character) in the document, then they become text nodes in the DOM, and if we remove them, then there won't be any.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

Aquí no hay nodos de texto de solo espacios:

```html no-beautify
<!DOCTYPE HTML>
<<<<<<< HEAD
<html><head><title>Sobre los alces</title></head><body>La verdad sobre los alces.</body></html>
=======
<html><head><title>About elk</title></head><body>The truth about elk.</body></html>
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
```

<div class="domtree"></div>

<script>
let node2 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[{"name":"TITLE","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"About elk"}]}]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"The truth about elk."}]}]}

drawHtmlTree(node2, 'div.domtree', 690, 210);
</script>

<<<<<<< HEAD
```smart header="Los espacios de borde y el texto vacío intermedio suelen estar ocultos en las herramientas"
Las herramientas del navegador (que se cubrirán pronto) que trabajan con el DOM generalmente no muestran espacios al inicio/final del texto y nodos de texto vacíos (saltos de línea) entre etiquetas.

Esto se debe a que se utilizan principalmente para decorar el HTML y no afectan la forma en que se muestra (en la mayoría de los casos).

En otras imágenes de DOM, a veces las omitimos donde son irrelevantes, para mantener las cosas cortas.
```


## Autocorrecctión

Si el navegador encuentra HTML con formato incorrecto, lo corrige automáticamente al crear el DOM.

Por ejemplo, la etiqueta superior siempre es `<html>`. Incluso si no existe en el documento, existirá en el DOM, el navegador lo creará. Lo mismo ocurre con `<body>`.

Como ejemplo, si el archivo HTML es una sola palabra "Hola", el navegador lo incluirá en `<html>` y `<body>`, agregará el `<head>` requerido, y el DOM será:
=======
```smart header="Spaces at string start/end and space-only text nodes are usually hidden in tools"
Browser tools (to be covered soon) that work with DOM usually do not show spaces at the start/end of the text and empty text nodes (line-breaks) between tags.

Developer tools save screen space this way.

On further DOM pictures we'll sometimes omit them when they are irrelevant. Such spaces usually do not affect how the document is displayed.
```

## Autocorrection

If the browser encounters malformed HTML, it automatically corrects it when making the DOM.

For instance, the top tag is always `<html>`. Even if it doesn't exist in the document, it will exist in the DOM, because the browser will create it. The same goes for `<body>`.

As an example, if the HTML file is the single word `"Hello"`, the browser will wrap it into `<html>` and `<body>`, and add the required `<head>`, and the DOM will be:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46


<div class="domtree"></div>

<script>
let node3 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]}]}

drawHtmlTree(node3, 'div.domtree', 690, 150);
</script>

Al generar el DOM, los navegadores procesan automáticamente los errores en el documento, cierran etiquetas, etc.

<<<<<<< HEAD
El siguiente documento "inválido":
=======
A document with unclosed tags:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```html no-beautify
<p>Hello
<li>Mom
<li>and
<li>Dad
```

<<<<<<< HEAD
...Se convertirá en un DOM normal, ya que el navegador lee las etiquetas y restaura las partes faltantes:
=======
...will become a normal DOM as the browser reads tags and restores the missing parts:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

<div class="domtree"></div>

<script>
let node4 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"P","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Hello"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Mom"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"and"}]},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Dad"}]}]}]}

drawHtmlTree(node4, 'div.domtree', 690, 360);
</script>

<<<<<<< HEAD
````warn header="Las tablas siempre tienen `<tbody>`"
Un interesante "caso especial" son las tablas. Según la especificación del DOM, deben tener `<tbody>`, pero el texto HTML puede omitirlo. Entonces el navegador crea `<tbody>` en el DOM automáticamente.
=======
````warn header="Tables always have `<tbody>`"
An interesting "special case" is tables. By the DOM specification they must have `<tbody>`, but HTML text may (officially) omit it. Then the browser creates `<tbody>` in the DOM automatically.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

Para el HTML:

```html no-beautify
<table id="table"><tr><td>1</td></tr></table>
```

La estructura DOM será:
<div class="domtree"></div>

<script>
let node5 = {"name":"TABLE","nodeType":1,"children":[{"name":"TBODY","nodeType":1,"children":[{"name":"TR","nodeType":1,"children":[{"name":"TD","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"1"}]}]}]}]};

drawHtmlTree(node5,  'div.domtree', 600, 200);
</script>

¿Lo ves? El `<tbody>` apareció de la nada. Debes tener esto en cuenta cuando trabajes con tablas para evitar sorpresas.
````

## Otros tipos de nodos

<<<<<<< HEAD
Agreguemos más etiquetas y un comentario a la página:
=======
There are some other node types besides elements and text nodes.

For example, comments:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

```html
<!DOCTYPE HTML>
<html>
<body>
<<<<<<< HEAD
  La verdad sobre los alces.
=======
  The truth about elk.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
  <ol>
    <li>Un alce es inteligente.</li>
*!*
    <!-- comentario -->
*/!*
    <li>...y un astuto animal!</li>
  </ol>
</body>
</html>
```

<div class="domtree"></div>

<script>
<<<<<<< HEAD
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  La verdad sobre los alces.\n    "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"Un alce es inteligente."}]},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"#comment","nodeType":8,"content":"comentario"},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...y un astuto animal!"}]},{"name":"#text","nodeType":3,"content":"\n    "}]},{"name":"#text","nodeType":3,"content":"\n  \n"}]}]};
=======
let node6 = {"name":"HTML","nodeType":1,"children":[{"name":"HEAD","nodeType":1,"children":[]},{"name":"BODY","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n  The truth about elk.\n    "},{"name":"OL","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"An elk is a smart"}]},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"#comment","nodeType":8,"content":"comment"},{"name":"#text","nodeType":3,"content":"\n      "},{"name":"LI","nodeType":1,"children":[{"name":"#text","nodeType":3,"content":"...and cunning animal!"}]},{"name":"#text","nodeType":3,"content":"\n    "}]},{"name":"#text","nodeType":3,"content":"\n  \n"}]}]};
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

drawHtmlTree(node6, 'div.domtree', 690, 500);
</script>

<<<<<<< HEAD
Aquí vemos un nuevo tipo de nodo de árbol: el *nodo comentario*, etiquetado como `#comment`.
=======
We can see here a new tree node type -- *comment node*, labeled as `#comment`, between two text nodes.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

Podemos pensar: ¿por qué se agrega un comentario al DOM? No afecta a la representación visual de ninguna manera. Pero hay una regla: si algo está en el HTML, entonces también debe estar en el árbol DOM.

**Todo en el HTML, incluso los comentarios, se convierten en parte del DOM.**

Incluso la directiva `<! DOCTYPE ...>` al principio de HTML también es un nodo DOM. Está en el árbol DOM justo antes de `<html>`. No vamos a tocar ese nodo, ni siquiera lo dibujamos en diagramas por esa razón, pero está ahí.

El objeto `document` que representa todo el documento es, formalmente, un nodo DOM también.

Hay [12 tipos](https://dom.spec.whatwg.org/#node) de nodos. En la práctica solemos trabajar solo con 4 de ellos:

<<<<<<< HEAD
1. document - el "punto de entrada" en el DOM.
2. Nodos de elementos: etiquetas HTML, los bloques de construcción del árbol.
3. Nodos de texto: contienen texto.
4. Comentarios: a veces podemos poner la información allí, no se mostrará, pero JS puede leerla desde el DOM.
=======
1. `document` -- the "entry point" into DOM.
2. element nodes -- HTML-tags, the tree building blocks.
3. text nodes -- contain text.
4. comments -- sometimes we can put information there, it won't be shown, but JS can read it from the DOM.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

## Velo por ti mismo

<<<<<<< HEAD
Para ver la estructura del DOM en tiempo real, prueba [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Simplemente escriba el documento y se mostrará el DOM en un instante.

## El inspector del navegador.
=======
To see the DOM structure in real-time, try [Live DOM Viewer](http://software.hixie.ch/utilities/js/live-dom-viewer/). Just type in the document, and it will show up as a DOM at an instant.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

Otra forma de explorar el DOM es usar las herramientas de desarrollo del navegador. En realidad, eso es lo que usamos al desarrollar.

<<<<<<< HEAD
Para hacerlo, abre la página web [elks.html](elks.html), activa las herramientas de desarrollo del navegador y cambia a la pestaña Elementos.
=======
To do so, open the web page [elk.html](elk.html), turn on the browser developer tools and switch to the Elements tab.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

Debe tener el siguiente aspecto:

![](elk.svg)

Puedes ver el DOM, hacer clic en los elementos, ver sus detalles y así sucesivamente.

Ten en cuenta que la estructura DOM en las herramientas de desarrollo está simplificada. Los nodos de texto se muestran solo como texto. Y no hay nodos de texto "en blanco" (solo espacio) en absoluto. Eso está bien, porque la mayoría de las veces estamos interesados ​​en los nodos de elementos.

<<<<<<< HEAD
Al hacer clic en el botón <span class="devtools" style="background-position:-328px -124px"></span> en la esquina superior izquierda, se puede elegir un nodo de la página web usando un mouse (u otros dispositivos de puntero) e "inspeccionarlo" (desplácese hasta él en la pestaña Elementos). Esto funciona muy bien cuando tenemos una gran página HTML (y el enorme DOM correspondiente) y nos gustaría ver el lugar de un elemento particular en ella.
=======
Clicking the <span class="devtools" style="background-position:-328px -124px"></span> button in the left-upper corner allows us to choose a node from the webpage using a mouse (or other pointer devices) and "inspect" it (scroll to it in the Elements tab). This works great when we have a huge HTML page (and corresponding huge DOM) and would like to see the place of a particular element in it.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

Otra forma de hacerlo sería simplemente haciendo clic derecho en una página web y seleccionando "Inspeccionar" en el menú contextual.

![](inspect.svg)

En la parte derecha de las herramientas puedes observar las siguientes subpestañas:
- **Styles**: podemos ver el CSS aplicado al elemento actual, incluidas las reglas utilizadas (gris). Casi todo se puede editar en el lugar, incluidas las dimensiones/márgenes/rellenos.
- **Computed**: para ver el CSS aplicado al elemento por propiedad, para cada propiedad podemos ver su origen (incluida la herencia de CSS y demás).
- **Event Listeners**: para ver detectores de eventos adjuntos a elementos DOM (los cubriremos en la siguiente parte del tutorial).
- ...y así.

La mejor manera de estudiarlos es hacer clic en ellos. La mayoría de los valores son editables en el lugar.

## Interacción con la consola.

<<<<<<< HEAD
A medida que exploramos el DOM, es posible que quieras aplicarle JavaScript. Como obtener un nodo y ejecutar algún código para modificarlo, para ver cómo se ve. Aquí hay algunos consejos para moverse entre la pestaña Elementos y la consola.

- Selecciona el primer `<li>` en la pestaña Elementos.
- Presiona `key:Esc`: se abrirá la consola justo debajo de la pestaña Elementos.
=======
As we work the DOM, we also may want to apply JavaScript to it. Like: get a node and run some code to modify it, to see the result. Here are few tips to travel between the Elements tab and the console.

For the start:

1. Select the first `<li>` in the Elements tab.
2. Press `key:Esc` -- it will open console right below the Elements tab.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

Ahora el último elemento seleccionado está disponible como `$0`, el seleccionado previamente es `$1`, etc.

Podemos ejecutar comandos sobre ellos. Por ejemplo, `$0.style.background = 'red'` hace que el elemento de la lista seleccionada se vuelva rojo, así:

![](domconsole0.svg)

That's how to get a node from Elements in Console.

<<<<<<< HEAD
Desde el otro lado, si estamos en la consola y tenemos una variable que hace referencia a un nodo DOM, entonces podemos usar el comando `inspect(node)` para verlo en el panel Elementos.

O simplemente podemos mostrarlo en la consola y explorar "en el lugar", como `document.body` en la siguiente imagen:
=======
There's also a road back. If there's a variable referencing a DOM node, then we can use the command `inspect(node)` in Console to see it in the Elements pane.

Or we can just output the DOM node in the console and explore "in-place", like `document.body` below:
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46

![](domconsole1.svg)

Eso es para propósitos de depuración, por supuesto. A partir del siguiente capítulo, accederemos y modificaremos el DOM usando JavaScript.

Las herramientas de desarrollo del navegador son de gran ayuda en el desarrollo: podemos explorar el DOM, probar cosas y ver qué falla.

## Resumen

Un documento HTML/XML se representa dentro del navegador como el árbol DOM.

- Las etiquetas se convierten en nodos de elementos y forman la estructura.
- El texto se convierte en nodos de texto.
- ...etc, todo en el HTML tiene su lugar en el DOM, incluso los comentarios.

Podemos usar las herramientas de desarrollo para inspeccionar el DOM y modificarlo manualmente.

Aquí cubrimos lo básico, las acciones más usadas e importantes para comenzar. Hay una extensa documentación sobre las Herramientas de desarrollo de Chrome en <https://developers.google.com/web/tools/chrome-devtools>. La mejor manera de aprender las herramientas es haciendo clic aquí y allá, leyendo los menús: la mayoría de las opciones son obvias. Más tarde, cuando los conozcas, lee la documentación y explora el resto.

<<<<<<< HEAD
Los nodos DOM tienen propiedades y métodos que permiten viajar entre ellos, modificarlos, moverse por la página y más. Nos pondremos en contacto con ellos en los próximos capítulos.
=======
DOM nodes have properties and methods that allow us to travel between them, modify them, move around the page, and more. We'll get down to them in the next chapters.
>>>>>>> 405150f1f286db19a3c1ed913fa3e905fcefbe46
