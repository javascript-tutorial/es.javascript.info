libs:
  - d3
  - domtree

---

# Selection y Range

En este capítulo cubriremos la selección en el documento, así como la selección en campos de formulario, como `<input>`.

JavaScript puede acceder una selección existente, seleccionar/deseleccionar nodos DOM tanto en su totalidad como parcialmente, eliminar la parte seleccionada del documento, envolverla en una etiqueta, etc.

Puedes encontrar algunas recetas para tareas comunes al final del artículo, en la sección "Resumen". Pero será mucho más beneficiosa la lectura de todo el capítulo.

Los objetos subyacentes `Range` y `Selection` son fáciles de captar y no necesitarás recetas para que hagan lo que deseas.

## Range

El concepto básico de selección [Range](https://dom.spec.whatwg.org/#ranges), es básicamente un par de "puntos límite": inicio y fin del rango.

Un objeto rango se crea sin parámetros:

```js
let range = new Range();
```

Entonces podemos establecer los límites de selección usando `range.setStart(node, offset)` y `range.setEnd(node, offset)`.

En adelante usaremos objetos `Range` para selección, pero primero creemos algunos de ellos.

### Seleccionando el texto parcialmente

Lo interesante es que el primer argumento `node` en ambos métodos puede ser tanto un nodo de texto o un nodo de elemento, y el significado del segundo argumento depende de ello.

**Si `node` es un nodo de texto, `offset` debe ser la posición en su texto.**

Por ejemplo, dado el elemento `<p>Hello</p>`, podemos crear el rango conteniendo las letras "ll":

```html run
<p id="p">Hello</p>
<script>
  let range = new Range();
  range.setStart(p.firstChild, 2);
  range.setEnd(p.firstChild, 4);
  
  // toString de un rango devuelve su contenido como un texto
  console.log(range); // ll
</script>
```

Aquí tomamos el primer hijo de `<p>` (que es el nodo de texto) y especificamos la posición del texto dentro de él:

![](range-hello-1.svg)

### Seleccionando nodos de elemento

**Alternativamente, si `node` es un nodo de elemento, `offset` debe ser el número de hijo.** 

Esto es práctico para hacer rangos que contienen nodos como un todo, no detenerse en algún lugar dentro de su texto.

Por ejemplo, tenemos un fragmento de documento más complejo:

```html autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>
```

Aquí está su estructura DOM usando ambos, nodos de texto y nodos de elemento:

<div class="select-p-domtree"></div>

<script>
let selectPDomtree = {
  "name": "P",
  "nodeType": 1,
  "children": [{
    "name": "#text",
    "nodeType": 3,
    "content": "Example: "
  }, {
    "name": "I",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "italic"
    }]
  }, {
    "name": "#text",
    "nodeType": 3,
    "content": " and "
  }, {
    "name": "B",
    "nodeType": 1,
    "children": [{
      "name": "#text",
      "nodeType": 3,
      "content": "bold"
    }]
  }]
}

drawHtmlTree(selectPDomtree, 'div.select-p-domtree', 690, 320);
</script>

Hagamos un rango para `"Example: <i>italic</i>"`.

 Como podemos ver, esta frase consiste de exactamente dos hijos de `<p>` con índices `0` y `1`:

![](range-example-p-0-1.svg)

- El punto de inicio tiene `<p>` como nodo padre `node`, y `0` como offset.

Así que podemos establecerlo como `range.setStart(p, 0)`.
- El punto final también tiene `<p>` como nodo padre, but `2` como offset (especifica el rango "hasta", pero no incluyendo, `offset`).

    Entonces podemos establecerlo como `range.setEnd(p, 2)`.

Aquí la demo. Si la ejeutas, puedes ver el texto siendo seleccionado::

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
*!*
  let range = new Range();

  range.setStart(p, 0);
  range.setEnd(p, 2);
*/!*

 // toString de un rango devuelve su contenido como texto (sin etiquetas)
  alert(range); // Ejemplo: italic

  // aplicar este rango para la selección de documentos (explicado más adelante)
  document.getSelection().addRange(range);
</script>
```

Aquí hay un banco de pruebas más flexible donde puedes establecer números de principio y fin y explorar otras variantes:

```html run autorun
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

From <input id="start" type="number" value=1> – To <input id="end" type="number" value=4>
<button id="button">Click to select</button>
<script>
  button.onclick = () => {
  *!*
    let range = new Range();

    range.setStart(p, start.value);
    range.setEnd(p, end.value);
  */!*

    // aplicar la selección, explicado más adelante
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  };
</script>
```

Ej. seleccionando de `1` a `4` da como rango `<i>italic</i> and <b>bold</b>`.

![](range-example-p-1-3.svg)

```smart header="Los nodos de inicio y final pueden ser diferentes" 
No tenemos que usar el mismo nodo en `setStart` y `setEnd`. Un rango puede abarcar muchos nodos no relacionados. Solo es importante que el final sea posterior al comienzo.
```

### Seleccionar partes de nodos de texto

Seleccionemos el texto parcialmente, así:

![](range-example-p-2-b-3.svg)

Eso también es posible, solo necesitamos establecer el inicio y el final como un desplazamiento relativo en los nodos de texto.

Necesitamos crear un rango, que:
- comienza desde la posición 2 en `<p>` primer hijo (tomando todas menos dos primeras letras de "Ex<b>ample:</b>")
- termina en la posición 3 de `<b>` primer hijo (tomando las primeras tres letras de "<b>bol</b>d", pero no más):

```html run
<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();

  range.setStart(p.firstChild, 2);
  range.setEnd(p.querySelector('b').firstChild, 3);

  alert(range); // amplio: italic and bol

  // use este rango para la selección (explicado más adelante)
  window.getSelection().addRange(range);
</script>
```

Como puedes ver, es fácil hacer un rango con lo que quieras.

Si queremos tomar los nodos como un todo, podemos pasar los elementos en `setStart/setEnd`. Si no, podemos trabajar en el nivel de texto. 

## Propiedades de Range

El objeto rango que creamos arriba tiene las siguientes propiedades:

![](range-example-p-2-b-3-range.svg)

- `startContainer`, `startOffset` -- nodo y desplazamiento del inicio,
  - en el ejemplo anterior: primer nodo de texto dentro de `<p>` y `2`.
- `endContainer`, `endOffset` -- nodo y desplazamiento del final,
  - en el ejemplo anterior: primer nodo de texto dentro de `<b>` y `3`.
- `collapsed` -- booleano, `true` si el rango comienza y termina en el mismo punto (por lo que no hay contenido dentro del rango),
  - en el ejemplo anterior: `false`
- `commonAncestorContainer` -- el ancestro común más cercano de todos los nodos dentro del rango,
  - en el ejemplo anterior: `<p>`


## Métodos de selección de rango

Hay muchos métodos convenientes para manipular rangos.

Ya hemos visto `setStart` y `setEnd`, aquí hay otros métodos similares.

Establecer inicio de rango:

- `setStart(node, offset)` establecer inicio en: posición `offset` en `node`
- `setStartBefore(node)` establecer inicio en: justo antes `node`
- `setStartAfter(node)` establecer inicio en: justo después `node`

Establecer fin de rango (métodos similares):

- `setEnd(node, offset)` establecer final en: posición `offset` en `node`
- `setEndBefore(node)` establecer final en: justo antes `node`
- `setEndAfter(node)` establecer final en: justo después `node`

Técnicamente, `setStart/setEnd` puede hacer cualquier cosa, pero más métodos brindan más conveniencia.

En todos estos métodos `node` puede ser un nodo de texto o de elemento: para nodos de texto `offset` salta esa cantidad de caracteres, mientras que para los nodos de elementos es la cantidad de nodos secundarios.**

Más métodos aún para crear rangos:
- `selectNode(node)` establecer rango para seleccionar el `node`
- `selectNodeContents(node)` establecer rango para seleccionar todo el contenido de `node` 
- `collapse(toStart)` si `toStart=true` establece final=comienzo, de otra manera comienzo=final, colapsando así el rango
- `cloneRange()` crea un nuevo rango con el mismo inicio/final

## Métodos para edición en el rango:

Una vez creado el rango, podemos manipular su contenido usando estos métodos: 

- `deleteContents()` -- eliminar el contenido de rango del documento
- `extractContents()` -- eliminar el contenido de rango del documento y lo retorna como [DocumentFragment](info:modifying-document#document-fragment)
- `cloneContents()` -- clonar el contenido del rango y lo retorna como [DocumentFragment](info:modifying-document#document-fragment)
- `insertNode(node)` -- inserta `node` en el documento al comienzo del rango
- `surroundContents(node)` -- envuelve `node` alrededor del contenido del rango. Para que esto funcione, el rango debe contener etiquetas de apertura y cierre para todos los elementos dentro de él, sin rangos parciales como `<i>abc`.

Con estos métodos podemos hacer básicamente cualquier cosa con los nodos seleccionados.

Aquí está el banco de pruebas para verlos en acción:

```html run refresh autorun height=260
Haga clic en los botones para ejecutar métodos en la selección, "resetExample" para restablecerla.

<p id="p">Example: <i>italic</i> and <b>bold</b></p>

<p id="result"></p>
<script>
  let range = new Range();

  // Cada método demostrado se representa aquí:
  let methods = {
    deleteContents() {
      range.deleteContents()
    },
    extractContents() {
      let content = range.extractContents();
      result.innerHTML = "";
      result.append("extracted: ", content);
    },
    cloneContents() {
      let content = range.cloneContents();
      result.innerHTML = "";
      result.append("cloned: ", content);
    },
    insertNode() {
      let newNode = document.createElement('u');
      newNode.innerHTML = "NEW NODE";
      range.insertNode(newNode);
    },
    surroundContents() {
      let newNode = document.createElement('u');
      try {
        range.surroundContents(newNode);
      } catch(e) { console.log(e) }
    },
    resetExample() {
      p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
      result.innerHTML = "";

      range.setStart(p.firstChild, 2);
      range.setEnd(p.querySelector('b').firstChild, 3);

      window.getSelection().removeAllRanges();  
      window.getSelection().addRange(range);  
    }
  };

  for(let method in methods) {
    document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
  }

  methods.resetExample();
</script>
```

También existen métodos para comparar rangos, pero rara vez se utilizan. Cuando los necesite, consulte el [spec](https://dom.spec.whatwg.org/#interface-range) o [manual MDN](https://developer.mozilla.org/es/docs/Web/API/Range).


## Selection

`Range` es un objeto genérico para gestionar rangos de selección. Pero crearlos no significa que podamos ver la selección en la pantalla.

Podemos crear objetos `Range`, pasarlos; no seleccionan nada visualmente por sí mismos.  

La selección de documento está representada por el objeto `Selection`, que se puede obtener como `window.getSelection()` o `document.getSelection()` Una selección puede incluir cero o más rangos. Al menos, la [especificación Selection API](https://www.w3.org/TR/selection-api/) lo dice. Sin embargo, en la práctica, solo Firefox permite seleccionar múltiples rangos en el documento usando `key:Ctrl+click` (`key:Cmd+click` para Mac).

Aquí hay una captura de pantalla de una selección con 3 rangos en Firefox:

![](selection-firefox.svg)

Otros navegadores admiten un rango máximo de 1. Como veremos, algunos de los métodos de `Selection` implica que puede haber muchos rangos, pero nuevamente, en todos los navegadores excepto Firefox, hay un máximo de 1.

Aquí hay una pequeña demo que muestra la selección actual (selecciona algo y haz clic) como texto:

<button onclick="alert(document.getSelection())">alert(document.getSelection())</button>

## Propiedades de Selection 

Como dijimos antes, una selección en teoría tiene múltiples rangos. Podemos obtener estos objetos rango usando el método:

- `getRangeAt(i)` -- obtiene el rango "i" comenzando desde `0`. En todos los navegadores excepto Firefox, solo `0` es usado.

También existen propiedades que a menudo brindan conveniencia.

Similar a Range, una selección tiene un inicio, llamado "ancla(anchor)", y un final, llamado "foco(focus)".

Las principales propiedades de selection son:

- `anchorNode` -- el nodo donde comienza la selección,
- `anchorOffset` -- el desplazamiento en `anchorNode` donde comienza la selección,
- `focusNode` -- el nodo donde termina la selección,
- `focusOffset` -- el desplazamiento en `focusNode` donde termina la selección,
- `isCollapsed` -- `true` si la selección no selecciona nada (rango vacío), o no existe.
- `rangeCount` -- recuento de rangos en la selección, máximo "1" en todos los navegadores excepto Firefox.

```smart header="Inicio/final, Selection vs. Range"

Hay una diferencia importante entre anchor/focus (ancla/foco) de una selección comparado al inicio/fin de un rango.

Sabemos que los objetos `Range` siempre tienen el inicio antes que el final.

En las selecciones, no siempre es así.

Seleccionar algo con el ratón puede hacerse en ambas direcciones: tanto de izquierda a derecha como de derecha a izquierda.

Cuando el botón es presionado, cuando se mueve hacia adelante en el documento, entonces su final (foco) estará después del inicio (ancla).

Ej. si el usuario comienza a seleccionar con el mouse y pasa de "Example" a "italic":

![](selection-direction-forward.svg)

...Pero la selección puede hacerse hacia atrás: comenzando por "italic" terminando en "Example", su foco estará antes del ancla:

![](selection-direction-backward.svg)
```

## Eventos Selection

Hay eventos para realizar un seguimiento de la selección:

- `elem.onselectstart` -- cuando una selección comienza en `elem`, ej. el usuario comienza a mover el mouse con el botón presionado.
    - Evitar la acción predeterminada hace que la selección no se inicie.
- `document.onselectionchange` -- siempre que cambie una selección.
    - Tenga en cuenta: este controlador solo se puede configurar en `document`.

### Demostración de seguimiento de selección

Aquí hay una pequeña demostración que muestra los límites de selección de forma dinámica a medida que cambia:

```html run height=80
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

From <input id="from" disabled> – To <input id="to" disabled>
<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;

    // anchorNode y focusNode usualmente son nodos de texto
    from.value = `${anchorNode?.data}, offset ${anchorOffset}`;
    to.value = `${focusNode?.data}, offset ${focusOffset}`;
  };
</script>
```

### Demostración de copia de selección

Hay dos enfoques para la copia de contenido seleccionado:

1. Podemos usar `document.getSelection().toString()` para obtenerlo como texto.
2. O copiar el DOM entero, por ejemplo si necesitamos mantener el formato, podemos obtener los rangos correspondientes con `getRangesAt(...)`. Un objeto `Range`, a su vez, tiene el método `cloneContents()` que clona su contenido y devuelve un objeto `DocumentFragment`, que podemos insertar en algún otro lugar.

Aquí está la demostración de cómo obtener la selección como texto y como nodos DOM:

```html run height=100
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

Cloned: <span id="cloned"></span>
<br>
As text: <span id="astext"></span>

<script>
  document.onselectionchange = function() {
    let selection = document.getSelection();

    cloned.innerHTML = astext.innerHTML = "";

    // Clonar nodos DOM de rangos (admitimos selección múltiple aquí)
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }

    // Obtener como texto
    astext.innerHTML += selection;
  };
</script>
```

## Métodos Selection 

Métodos de selección para agregar/eliminar rangos:

- `getRangeAt(i)` -- obtener el rango i-ésimo, comenzando desde "0". En todos los navegadores, excepto Firefox, solo se utiliza `0`.
- `addRange(rango)` -- agrega un `rango` a la selección. Todos los navegadores excepto Firefox ignoran la llamada, si la selección ya tiene un rango asociado.
- `removeRange(rango)` --elimina `rango` de la selección.
- `removeAllRanges()` --elimina todos los rangos.
- `empty()` -- alias para `removeAllRanges`.

Además, existen métodos convenientes para manipular el rango de selección directamente, sin llamadas intermedias a `Range`:

- `collapse(node, offset)` -- Reemplazar el rango seleccionado con uno nuevo que comienza y termina en el `node` dado, en posición `offset`.
- `setPosition(node, offset)` -- alias para `collapse`.
- `collapseToStart()` - colapsar (reemplazar con un rango vacío) al inicio de la selección,
- `collapseToEnd()` - colapso hasta el final de la selección,
- `extend(node, offset)` - mover el foco de la selección al `node` dado, posición `offset`,
- `setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset)` - reemplazar el rango de selección con el inicio dado `anchorNode/anchorOffset` y final `focusNode/focusOffset`. Se selecciona todo el contenido entre ellos.
- `selectAllChildren(node)` -- seleccionar todos los hijos del `node`.
- `deleteFromDocument()` -- eliminar el contenido seleccionado del documento.
- `containsNode(node, allowPartialContainment = false)` -- comprueba si la selección contiene `node` (parcialmente si el segundo argumento es `true`)

Entonces, para muchas tareas podemos llamar a los métodos de `Selection`, y no es necesario acceder al objeto `Range` subyacente.

Por ejemplo, seleccionando todo el contenido del párrafo `<p>`:

```html run
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  // seleccione desde el 0 hijo de <p> hasta el último hijo
  document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
</script>
```

Lo mismo usando rangos:

```html run
<p id="p">Select me: <i>italic</i> and <b>bold</b></p>

<script>
  let range = new Range();
  range.selectNodeContents(p); // o selectNode(p) para seleccionar el tag <p> también

  document.getSelection().removeAllRanges(); // borrar la selección existente si la hubiera
  document.getSelection().addRange(range);
</script>
```

```smart header="Para seleccionar, primero elimine la selección existente"
Si la selección ya existe, vacíelo primero con `removeAllRanges()`. Y luego agregue rangos. De lo contrario, todos los navegadores excepto Firefox ignoran los nuevos rangos.

La excepción son algunos métodos de selección, que reemplazan la selección existente, como `setBaseAndExtent`.
```

## Selección en controles de formulario

Elementos de formulario, como `input` y `textarea` proporciona [API especial para la selección](https://html.spec.whatwg.org/#textFieldSelection), sin objetos `Selection` o `Range`. Como un valor de entrada es un texto puro, no HTML, no hay necesidad de tales objetos, todo es mucho más simple.

Propiedades:
- `input.selectionStart` -- posición de inicio de selección (escribible),
- `input.selectionEnd` -- posición del final de la selección (escribible),
- `input.selectionDirection` -- dirección de selección, una de: "adelante" "hacia atrás" o "ninguno" (si, por ejemplo, se selecciona con un doble clic del mouse),

Eventos:
- `input.onselect` -- se activa cuando se selecciona algo.

Métodos:

- `input.select()` -- selecciona todo en el control de texto (puede ser `textarea` en vez de `input`),
- `input.setSelectionRange(start, end, [direction])` -- cambiar la selección para abarcar desde la posición `start` hasta `end`, en la dirección indicada (opcional).
- `input.setRangeText(replacement, [start], [end], [selectionMode])` -- reemplace un rango de texto con el nuevo texto.

    Los argumentos opcionales `start` y `end`, si se proporcionan, establecen el inicio y el final del rango; de lo contrario, se utiliza la selección del usuario.

    El último argumento, `selectionMode`, determina cómo se establecerá la selección después de que se haya reemplazado el texto. Los posibles valores son:

    - `"select"` -- se seleccionará el texto recién insertado.
    - `"start"` -- el rango de selección se colapsa justo antes del texto insertado (el cursor estará inmediatamente antes).
    - `"end"` -- el rango de selección se colapsa justo después del texto insertado (el cursor estará justo después).
    - `"preserve"` -- intenta preservar la selección. Este es el predeterminado.

Ahora veamos estos métodos en acción.

### Ejemplo: Seguimiento de selección

Por ejemplo, este código usa el evento `onselect` para rastrear la selección:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Selecting in this text updates values below.
</textarea>
<br>
From <input id="from" disabled> – To <input id="to" disabled>

<script>
  area.onselect = function() {
    from.value = area.selectionStart;
    to.value = area.selectionEnd;
  };
</script>
```

Tenga en cuenta:
- `onselect` se activa cuando se selecciona algo, pero no cuando se elimina la selección.
- El evento `document.onselectionchange` no debería activarse para las selecciones dentro de un control de formulario, según el [spec](https://w3c.github.io/selection-api/#dfn-selectionchange), ya que no está relacionado con la selección y los rangos del "documento". Algunos navegadores lo generan, pero no debemos confiar en él.


### Ejemplo: cursor en movimiento

Podemos cambiar `selectionStart` y `selectionEnd`, que establece la selección.

Un caso límite importante es cuando `selectionStart` y `selectionEnd` son iguales entre sí. Entonces es exactamente la posición del cursor. O, para reformular, cuando no se selecciona nada, la selección se contrae en la posición del cursor.

Entonces, al establecer `selectionStart` y `selectionEnd` en el mismo valor, movemos el cursor.

Por ejemplo:

```html run autorun
<textarea id="area" style="width:80%;height:60px">
Focus on me, the cursor will be at position 10.
</textarea>

<script>
  area.onfocus = () => {
    // zero delay setTimeout to run after browser "focus" action finishes
    setTimeout(() => {
      // we can set any selection
      // if start=end, the cursor is exactly at that place
      area.selectionStart = area.selectionEnd = 10;
    });
  };
</script>
```

### Ejemplo: modificar la selección

Para modificar el contenido de la selección, podemos utilizar el método `input.setRangeText()` Por supuesto, podemos leer `selectionStart/End` y, con el conocimiento de la selección, cambiar la subcadena correspondiente de `value`, pero `setRangeText` es más poderoso y a menudo más conveniente.

Ese es un método algo complejo. En su forma más simple de un argumento, reemplaza el rango seleccionado por el usuario y elimina la selección.

Por ejemplo, aquí la selección de usuario estará envuelta por `*...*`:

```html run autorun
<input id="input" style="width:200px" value="Select here and click the button">
<button id="button">Wrap selection in stars *...*</button>

<script>
button.onclick = () => {
  if (input.selectionStart == input.selectionEnd) {
    return; // nada fue seleccionado
  }

  let selected = input.value.slice(input.selectionStart, input.selectionEnd);
  input.setRangeText(`*${selected}*`);
};
</script>
```

Con más argumentos, podemos establecer un rango `start` y `end`.

En este ejemplo, encontramos `THIS` en el texto de entrada, lo reemplazamos y mantenemos el reemplazo seleccionado:

```html run autorun
<input id="input" style="width:200px" value="Replace THIS in text">
<button id="button">Replace THIS</button>

<script>
button.onclick = () => {
  let pos = input.value.indexOf("THIS");
  if (pos >= 0) {
    input.setRangeText("*THIS*", pos, pos + 4, "select");
    input.focus(); // focus to make selection visible
  }
};
</script>
```

### Ejemplo: insertar en el cursor

Si no se selecciona nada, o usamos el mismo `comienzo` y `final` en `setRangeText`, entonces el nuevo texto se acaba de insertar, no se elimina nada.

También podemos insertar algo "en el cursor" usando `setRangeText`.

Aquí hay un botón que se inserta `"HELLO"` en la posición del cursor y lo coloca inmediatamente después. Si la selección no está vacía, entonces se reemplaza (podemos detectarla comparando `selectionStart!=selectionEnd` y hacer otra cosa en su lugar):

```html run autorun
<input id="input" style="width:200px" value="Text Text Text Text Text">
<button id="button">Insert "HELLO" at cursor</button>

<script>
  button.onclick = () => {
    input.setRangeText("HELLO", input.selectionStart, input.selectionEnd, "end");
    input.focus();
  };    
</script>
```


## Haciendo no seleccionable

Para hacer algo no seleccionable, hay tres formas:

1. Usar propiedad CSS `user-select: none`.

    ```html run
    <style>
    #elem {
      user-select: none;
    }
    </style>
    <div>Selectable <div id="elem">Unselectable</div> Selectable</div>
    ```

    Esto no permite que la selección comience en `elem`. Pero el usuario puede iniciar la selección en otro lugar e incluir `elem` en ella.

   Entonces, `elem` se convertirá en parte de `document.getSelection )`, por lo que la selección realmente ocurre, pero su contenido generalmente se ignora al copiar y pegar.


2. Evita la acción predeterminada en los eventos `onselectstart` o `mousedown`.

    ```html run
    <div>Selectable <div id="elem">Unselectable</div> Selectable</div>

    <script>
      elem.onselectstart = () => false;
    </script>
    ```

   Esto evita que la selección se inicie en `elem`, pero el visitante puede iniciarla en otro elemento y luego extenderla a `elem`.

Eso es conveniente cuando hay otro controlador de eventos en la misma acción que activa la selección (por ejemplo, `mousedown`). Así que deshabilitamos la selección para evitar conflictos, permitiendo que se copien los contenidos de `elem`.

3. También podemos borrar la selección post-factum después de que suceda con `document.getSelection().Empty ()`. Eso se usa con poca frecuencia, ya que provoca un parpadeo no deseado cuando la selección aparece o desaparece.

## Referencias

- [DOM spec: Range](https://dom.spec.whatwg.org/#ranges)
- [Selection API](https://www.w3.org/TR/selection-api/#dom-globaleventhandlers-onselectstart)
- [HTML spec: APIs for the text control selections](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#textFieldSelection)


## Resumen

Cubrimos dos API diferentes para las selecciones:

1. Para el documento: objetos `Selection` y `Range`.
2. Para `input`, `textarea`: métodos y propiedades adicionales.

La segunda API es muy simple, ya que funciona con texto.

Las recetas más utilizadas probablemente sean:

1. Obteniendo la selección:
    ```js 
    let selection = document.getSelection();

    let cloned = /* elemento para clonar los nodos seleccionados para */;

    // luego aplica los métodos Range a selection.getRangeAt (0)
    // o, como aquí, a todos los rangos para admitir selección múltiple
    for (let i = 0; i < selection.rangeCount; i++) {
      cloned.append(selection.getRangeAt(i).cloneContents());
    }
    ```
2. Configuración de la selección:
    ```js 
    let selection = document.getSelection();

    // directamente:
    selection.setBaseAndExtent(...from...to...);

    // o podemos crear un rango y:
    selection.removeAllRanges();
    selection.addRange(range);
    ```

Y finalmente, sobre el cursor. La posición del cursor en elementos editables, como `<textarea>` está siempre al principio o al final de la selección. Podemos usarlo para obtener la posición del cursor o para mover el cursor configurando `elem.selectionStart` y `elem.selectionEnd`.
