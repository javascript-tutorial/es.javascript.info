libs:
  - d3
  - domtree

---


# Recorriendo el DOM

El DOM nos permite hacer cualquier cosa con sus elementos y contenidos, pero lo primero que tenemos que hacer es llegar al objeto correspondiente del DOM.

Todas las operaciones en el DOM comienzan con el objeto `document`. Este es el principal "punto de entrada" al DOM. Desde ahí podremos acceder a cualquier nodo.

Esta imagen representa los enlaces que nos permiten viajar a través de los nodos del DOM:

![](dom-links.svg)

Vamos a analizarlos con más detalle.

## En la parte superior: documentElement y body

Los tres nodos superiores están disponibles como propiedades de `document`:

`<html>` = `document.documentElement`
: El nodo superior del documento es `document.documentElement`. Este es el nodo del DOM para la etiqueta `<html>`.

`<body>` = `document.body`
: Otro nodo muy utilizado es el elemento `<body>` -- `document.body`.

`<head>` = `document.head`
: La etiqueta `<head>` está disponible como `document.head`.

````warn header="Hay una trampa: `document.body` puede ser `null`"
Un script no puede acceder a un elemento que no existe en el momento de su ejecución.

Por ejemplo, si un script está dentro de `<head>`, entonces `document.body` no está disponible, porque el navegador no lo ha leído aún.

Entonces, en el siguiente ejemplo `alert` muestra `null`:

```html run
<html>

<head>
  <script>
*!*
    alert( "From HEAD: " + document.body ); // null, no hay  <body> aún
*/!*
  </script>
</head>

<body>

  <script>
    alert( "From BODY: " + document.body ); // HTMLBodyElement, ahora existe
  </script>

</body>
</html>
```
````

```smart header="En el mundo del DOM `null` significa \"no existe\""
En el DOM, el valor `null` significa que "no existe" o "no hay tal nodo".
```

## Hijos: childNodes, firstChild, lastChild

Existen dos términos que vamos a utilizar de ahora en adelante:

- **Nodos hijos (childNodes)** -- elementos que son hijos directos, es decir sus descendientes inmediatos. Por ejemplo, `<head>` y `<body>` son hijos del elemento `<html>`.
- **Descendientes** -- todos los elementos anidados de un elemento dado, incluyendo los hijos, sus hijos y así sucesivamente. 

Por ejemplo, aquí `<body>` tiene de hijos `<div>` y `<ul>` (y unos pocos nodos de texto en blanco):

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>
      <b>Information</b>
    </li>
  </ul>
</body>
</html>
```

...Y los descendientes de `<body>` no son solo los hijos `<div>`, `<ul>` sino también elementos anidados más profundamente, como `<li>` (un hijo de `<ul>`) o `<b>` (un hijo de `<li>`) -- el subárbol entero.

**La colección `childNodes` enumera todos los nodos hijos, incluidos los nodos de texto.**

El ejemplo inferior muestra todos los hijos de `document.body`:

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
*!*
    for (let i = 0; i < document.body.childNodes.length; i++) {
      alert( document.body.childNodes[i] ); // Texto, DIV, Texto, UL, ..., SCRIPT
    }
*/!*
  </script>
  ...más cosas...
</body>
</html>
```

Por favor observa un interesante detalle aquí. Si ejecutamos el ejemplo anterior, el último elemento que se muestra es `<script>`. De hecho, el documento tiene más cosas debajo, pero en el momento de ejecución del script el navegador todavía no lo ha leído, por lo que el script no lo ve.

**Las propiedades `firstChild` y `lastChild` dan acceso rápido al primer y al último hijo.**

Son solo atajos. Si existieran nodos hijos, la respuesta siguiente sería siempre verdadera:
```js
elem.childNodes[0] === elem.firstChild
elem.childNodes[elem.childNodes.length - 1] === elem.lastChild
```

También hay una función especial `elem.hasChildNodes()` para comprobar si hay algunos nodos hijos.

### Colecciones del DOM

Como podemos ver, `childNodes` parece un array. Pero realmente no es un array, sino más bien una *colección* -- un objeto especial iterable, simil-array.

Hay dos importantes consecuencias de esto:

1. Podemos usar `for..of` para iterar sobre él:
  ```js
  for (let node of document.body.childNodes) {
    alert(node); // enseña todos los nodos de la colección
  }
  ```
    Eso es porque es iterable (proporciona la propiedad `Symbol.iterator`, como se requiere).

2. Los métodos de Array no funcionan, porque no es un array:
  ```js run
  alert(document.body.childNodes.filter); // undefined (¡No hay método filter!)
  ```

La primera consecuencia es agradable. La segunda es tolerable, porque podemos usar `Array.from` para crear un array "real" desde la colección si es que queremos usar métodos del array:

  ```js run
  alert( Array.from(document.body.childNodes).filter ); // función
  ```

```warn header="Las colecciones DOM son solo de lectura"
Las colecciones DOM, incluso más-- *todas* las propiedades de navegación enumeradas en este capítulo son sólo de lectura.

No podemos reemplazar a un hijo por otro elemento asignándolo así `childNodes[i] = ...`.

Cambiar el DOM necesita otros métodos. Los veremos en el siguiente capítulo.
```

```warn header="Las colecciones del DOM están vivas"
Casi todas las colecciones del DOM, salvo algunas excepciones, están *vivas*. En otras palabras, reflejan el estado actual del DOM.

Si mantenemos una referencia a `elem.childNodes`, y añadimos o quitamos nodos del DOM, entonces estos nodos aparecen en la colección automáticamente.
```

````warn header="No uses `for..in` para recorrer colecciones"
Las colecciones son iterables usando `for..of`. Algunas veces las personas tratan de utilizar `for..in` para eso.

Por favor, no lo hagas. El bucle `for..in` itera sobre todas las propiedades enumerables. Y las colecciones tienen unas propiedades "extra" raramente usadas que normalmente no queremos obtener: 

```html run
<body>
<script>
  // enseña 0, 1, longitud, item, valores y más cosas.
  for (let prop in document.body.childNodes) alert(prop);
</script>
</body>
````

## Hermanos y el padre

*Los hermanos* son nodos que son hijos del mismo padre.

Por ejemplo, aquí `<head>` y `<body>` son hermanos:

```html
<html>
  <head>...</head><body>...</body>
</html>
```

- `<body>` se dice que es el hermano "siguiente" o a la "derecha" de `<head>`,
- `<head>` se dice que es el hermano "anterior" o a la "izquierda" de `<body>`.

El hermano siguiente está en la propiedad `nextSibling` y el anterior - en `previousSibling`.

El padre está disponible en `parentNode`.

Por ejemplo:

```js run
// el padre de <body> es <html>
alert( document.body.parentNode === document.documentElement ); // verdadero

// después de <head> va <body>
alert( document.head.nextSibling ); // HTMLBodyElement

// antes de <body> va <head>
alert( document.body.previousSibling ); // HTMLHeadElement
```

## Navegación solo por elementos

Las propiedades de navegación enumeradas abajo se refieren a *todos* los nodos. Por ejemplo, en `childNodes` podemos ver nodos de texto, nodos elementos; y si existen, incluso los nodos de comentarios.

Pero para muchas tareas no queremos los nodos de texto o comentarios. Queremos manipular el nodo que representa las etiquetas y formularios de la estructura de la página. 

Así que vamos a ver más enlaces de navegación que solo tienen en cuenta los *elementos nodos*:

![](dom-links-elements.svg)

Los enlaces son similares a los de arriba, solo que tienen dentro la palabra `Element`:

- `children` -- solo esos hijos que tienen el elemento nodo.
- `firstElementChild`, `lastElementChild` -- el primer y el último elemento hijo.
- `previousElementSibling`, `nextElementSibling` -- elementos vecinos.
- `parentElement` -- elemento padre.

````smart header="¿Por qué `parentElement`? ¿Puede el padre *no* ser un elemento?"
La propiedad `parentElement` devuelve el "elemento" padre, mientras `parentNode` devuelve "cualquier nodo" padre. Estas propiedades son normalmente las mismas: ambas seleccionan el padre.

Con la excepción de `document.documentElement`:

```js run
alert( document.documentElement.parentNode ); // documento
alert( document.documentElement.parentElement ); // null
```

La razón es que el nodo raíz `document.documentElement` (`<html>`) tiene a `document` como su padre. Pero `document` no es un elemento nodo, por lo que `parentNode` lo devuelve y `parentElement` no lo hace.

Este detalle puede ser útil cuando queramos navegar hacia arriba desde cualquier elemento `elem` al `<html>`, pero no hacia el `document`:
```js
while(elem = elem.parentElement) { // sube hasta <html>
  alert( elem );
}
```
````

Vamos a modificar uno de los ejemplos de arriba: reemplaza `childNodes` por `children`. Ahora enseña solo elementos:

```html run
<html>
<body>
  <div>Begin</div>

  <ul>
    <li>Information</li>
  </ul>

  <div>End</div>

  <script>
*!*
    for (let elem of document.body.children) {
      alert(elem); // DIV, UL, DIV, SCRIPT
    }
*/!*
  </script>
  ...
</body>
</html>
```

## Más enlaces: tablas [#dom-navigation-tables]

Hasta ahora hemos descrito las propiedades de navegación básicas.

Ciertos tipos de elementos del DOM pueden tener propiedades adicionales, específicas de su tipo, por conveniencia.

Las tablas son un gran ejemplo de ello, y representan un particular caso importante:

**El elemento `<table>`**  soporta estas propiedades (añadidas a las que hemos dado anteriormente):
- `table.rows` -- la colección de elementos`<tr>` de la tabla.
- `table.caption/tHead/tFoot` -- referencias a los elementos `<caption>`, `<thead>`, `<tfoot>`.
- `table.tBodies` -- la colección de elementos `<tbody>` (pueden ser muchos según el estándar pero siempre habrá al menos uno -- aunque no esté en el HTML el navegador lo pondrá en el DOM).

**`<thead>`, `<tfoot>`, `<tbody>`** estos elementos proporcionan las propiedades de las `filas`.
- `tbody.rows` -- la colección dentro de `<tr>`.

**`<tr>`:**
- `tr.cells` -- la colección de celdas `<td>` y `<th>` dentro del `<tr>` dado.
- `tr.sectionRowIndex` -- la posición (índice) del  `<tr>` dado dentro del `<thead>/<tbody>/<tfoot>` adjunto.
- `tr.rowIndex` -- el número de `<tr>` en la tabla en su conjunto (incluyendo todas las filas de una tabla).

**`<td>` and `<th>`:**
- `td.cellIndex` -- el número de celdas dentro del adjunto `<tr>`.

Un ejemplo de uso:

```html run height=100
<table id="table">
  <tr>
    <td>one</td><td>two</td>
  </tr>
  <tr>
    <td>three</td><td>four</td>
  </tr>
</table>

<script>
  // seleccionar td con "dos" (primera fila, segunda columna)
  let td = table.*!*rows[0].cells[1]*/!*;
  td.style.backgroundColor = "red"; // destacarlo
</script>
```

La especificación: [tabular data](https://html.spec.whatwg.org/multipage/tables.html).

También hay propiedades de navegación adicionales para los formularios HTML. Las veremos más adelante cuando empecemos a trabajar con los formularios.

## Resumen

Dado un nodo del DOM, podemos ir a sus inmediatos vecinos utilizando las propiedades de navegación.

Hay dos conjuntos principales de ellas:

- Para todos los nodos: `parentNode`, `childNodes`, `firstChild`, `lastChild`, `previousSibling`, `nextSibling`.
- Para los nodos elementos: `parentElement`, `children`, `firstElementChild`, `lastElementChild`, `previousElementSibling`, `nextElementSibling`.

Algunos tipos de elementos del DOM, por ejemplo las tablas, proveen propiedades adicionales y colecciones para acceder a su contenido.
