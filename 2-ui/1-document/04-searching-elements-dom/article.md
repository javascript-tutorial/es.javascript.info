# Buscar: getElement*, querySelector*

Las propiedades de navegación del DOM son ideales cuando los elementos están cerca unos de otros. ¿Pero y si no lo están? ¿Cómo obtener un elemento arbitrario de la página?

Para estos casos existen métodos de búsqueda adicionales. 

## document.getElementById o sólo id

Si un elemento tiene el atributo `id`, podemos obtener el elemento usando el método `document.getElementById(id)`, sin importar dónde se encuentre.

Por ejemplo:

```html run
<div id="elem">
  <div id="elem-content">Elemento</div>
</div>

<script>
  // obtener el elemento
*!*
  let elem = document.getElementById('elem');
*/!*

  // hacer que su fondo sea rojo
  elem.style.background = 'red';
</script>
```

Existe además una variable global llamada por el `id` que hace referencia al elemento:

```html run
<div id="*!*elem*/!*">
  <div id="*!*elem-content*/!*">Elemento</div>
</div>

<script>
  // elem es una referencia al elemento del DOM con id="elem"
  elem.style.background = 'red';

  // id="elem-content" tiene un guión en su interior, por lo que no puede ser un nombre de variable
  // ...pero podemos acceder a él usando corchetes: window['elem-content']
</script>
```

...Esto es a menos que declaremos una variable de JavaScript con el mismo nombre, entonces ésta tiene prioridad:

```html run untrusted height=0
<div id="elem"></div>

<script>
  let elem = 5; // ahora elem es 5, no una referencia a <div id="elem">

  alert(elem); // 5
</script>
```

```warn header="Por favor, no utilice variables globales con nombradas por id para acceder a los elementos"
Este comportamiento se encuentra descrito [en la especificación](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), por lo que es una especie de estándar. Pero está soportado principalmente por la compatibilidad.

El navegador intenta ayudarnos mezclando espacios de nombres de JS y DOM. Esto está bien para los scripts simples, inlined into HTML, pero generalmente no es una buena práctica. Puede haber conflictos de nombres. Además, cuando uno lee el código de JS y no tiene el HTML a la vista, no es obvio de dónde viene la variable. 

Aquí en el tutorial usamos `id` para referirnos directamente a un elemento por brevedad, cuando es obvio de dónde viene el elemento.

En la vida real `document.getElementById` es el método preferente.
```

```smart header="El `id` debe ser único"
El `id` debe ser único. Sólo puede haber en todo el documento un elemento con un `id` determinado.

Si hay múltiples elementos con el mismo id, entonces el comportamiento de los métodos que lo usan es impredecible, por ejemplo `document.getElementById` puede devolver cualquier de esos elementos al azar. Así que, por favor, sigan la regla y mantengan el `id` único. 
```

```warn header="Sólo `document.getElementById`, no `anyElem.getElementById`"
El método `getElementById` sólo puede ser llamado en el objeto `document`. Busca el `id` dado en todo el documento.
```

## querySelectorAll [#querySelectorAll]

Sin duda el método más versátil, `elem.querySelectorAll(css)` devuelve todos los elementos dentro de `elem` que coinciden con el selector CSS dado.

Aquí buscamos todos los elementos `<li>` que son los últimos hijos:

```html run
<ul>
  <li>La</li>
  <li>prueba</li>
</ul>
<ul>
  <li>ha</li>
  <li>pasado/li>
</ul>
<script>
*!*
  let elements = document.querySelectorAll('ul > li:last-child');
*/!*

  for (let elem of elements) {
    alert(elem.innerHTML); // "prueba", "pasado"
  }
</script>
```

Este método es muy poderoso, porque se puede utilizar cualquier selector de CSS.

```smart header="También se pueden usar pseudo-classes"
Las pseudo-classes como `:hover` y `:active` también son soportadas. Por ejemplo, `document.querySelectorAll(':hover')` devolverá una colección de elementos sobre los que el puntero hace hover en ese momento (en orden de anidación: desde el más exterior `<html>` hasta el más anidado).
```

## querySelector [#querySelector]

La llamada a `elem.querySelector(css)` devuelve el primer elemento para el selector CSS dado. 

En otras palabras, el resultados es el mismo que `elem.querySelectorAll(css)[0]`, pero este último busca *todos* los elementos y elige uno, mientras que  `elem.querySelector` sólo busca uno. Así que es más rápido y también más corto de escribir. 

## matches

Los métodos anteriores eran la búsqueda en el DOM.

El [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) no busca nada, sólo comprueba si el `elem` coincide con el selector CSS dado. Devuelve `true` o `false`.

Este método es útil cuando estamos iterando sobre los elementos  (como en un array) y tratando de filtrar los que nos interesan.

Por ejemplo:

```html run
<a href="http://example.com/file.zip">...</a>
<a href="http://ya.ru">...</a>

<script>
  // puede ser cualquier colección en lugar de document.body.children
  for (let elem of document.body.children) {
*!*
    if (elem.matches('a[href$="zip"]')) {
*/!*
      alert("La referencia del archivo: " + elem.href );
    }
  }
</script>
```

## closest

Los *ancestros* de un elmento son: el padre, el padre del padre, su padre y así sucesivamente. Todos los ancestros juntos forman la cadena de padres desde el elemento hasta la cima.

El método `elem.closest(css)` busca el ancestro más cercano que coincide con el selector CSS. El propio `elem` también se incluye en la búsqueda.

En otras palabras, el método `closest` subde del elemento y comprueba cada uno de los padres. Si coincide con el selector, entonces la búsqueda se detiene y devuelve dicho ancestro.

Por ejemplo:

```html run
<h1>Contenido</h1>

<div class="contents">
  <ul class="book">
    <li class="chapter">Capítulo 1</li>
    <li class="chapter">Capítulo 1</li>
  </ul>
</div>

<script>
  let chapter = document.querySelector('.chapter'); // LI

  alert(chapter.closest('.book')); // UL
  alert(chapter.closest('.contents')); // DIV

  alert(chapter.closest('h1')); // null (porque h1 no es un ancestro)
</script>
```

## getElementsBy*

There are also other methods to look for nodes by a tag, class, etc.

Today, they are mostly history, as `querySelector` is more powerful and shorter to write.

So here we cover them mainly for completeness, while you can still find them in the old scripts.

- `elem.getElementsByTagName(tag)` looks for elements with the given tag and returns the collection of them. The `tag` parameter can also be a star `"*"` for "any tags".
- `elem.getElementsByClassName(className)` returns elements that have the given CSS class.
- `document.getElementsByName(name)` returns elements with the given `name` attribute, document-wide. Very rarely used.

For instance:
```js
// get all divs in the document
let divs = document.getElementsByTagName('div');
```

Let's find all `input` tags inside the table:

```html run height=50
<table id="table">
  <tr>
    <td>Your age:</td>

    <td>
      <label>
        <input type="radio" name="age" value="young" checked> less than 18
      </label>
      <label>
        <input type="radio" name="age" value="mature"> from 18 to 50
      </label>
      <label>
        <input type="radio" name="age" value="senior"> more than 60
      </label>
    </td>
  </tr>
</table>

<script>
*!*
  let inputs = table.getElementsByTagName('input');
*/!*

  for (let input of inputs) {
    alert( input.value + ': ' + input.checked );
  }
</script>
```

```warn header="Don't forget the `\"s\"` letter!"
Novice developers sometimes forget the letter `"s"`. That is, they try to call `getElementByTagName` instead of <code>getElement<b>s</b>ByTagName</code>.

The `"s"` letter is absent in `getElementById`, because it returns a single element. But `getElementsByTagName` returns a collection of elements, so there's `"s"` inside.
```

````warn header="It returns a collection, not an element!"
Another widespread novice mistake is to write:

```js
// doesn't work
document.getElementsByTagName('input').value = 5;
```

That won't work, because it takes a *collection* of inputs and assigns the value to it rather than to elements inside it.

We should either iterate over the collection or get an element by its index, and then assign, like this:

```js
// should work (if there's an input)
document.getElementsByTagName('input')[0].value = 5;
```
````

Looking for `.article` elements:

```html run height=50
<form name="my-form">
  <div class="article">Article</div>
  <div class="long article">Long article</div>
</form>

<script>
  // find by name attribute
  let form = document.getElementsByName('my-form')[0];

  // find by class inside the form
  let articles = form.getElementsByClassName('article');
  alert(articles.length); // 2, found two elements with class "article"
</script>
```

## Live collections

All methods `"getElementsBy*"` return a *live* collection. Such collections always reflect the current state of the document and "auto-update" when it changes.

In the example below, there are two scripts.

1. The first one creates a reference to the collection of `<div>`. As of now, its length is `1`.
2. The second scripts runs after the browser meets one more `<div>`, so its length is `2`.

```html run
<div>First div</div>

<script>
  let divs = document.getElementsByTagName('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 2
*/!*
</script>
```

In contrast, `querySelectorAll` returns a *static* collection. It's like a fixed array of elements.

If we use it instead, then both scripts output `1`:


```html run
<div>First div</div>

<script>
  let divs = document.querySelectorAll('div');
  alert(divs.length); // 1
</script>

<div>Second div</div>

<script>
*!*
  alert(divs.length); // 1
*/!*
</script>
```

Now we can easily see the difference. The static collection did not increase after the appearance of a new `div` in the document.

## Summary

There are 6 main methods to search for nodes in DOM:

<table>
<thead>
<tr>
<td>Method</td>
<td>Searches by...</td>
<td>Can call on an element?</td>
<td>Live?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

By far the most used are `querySelector` and `querySelectorAll`, but `getElementBy*` can be sporadically helpful or found in the old scripts.

Besides that:

- There is `elem.matches(css)` to check if `elem` matches the given CSS selector.
- There is `elem.closest(css)` to look for the nearest ancestor that matches the given CSS-selector. The `elem` itself is also checked.

And let's mention one more method here to check for the child-parent relationship, as it's sometimes useful:
-  `elemA.contains(elemB)` returns true if `elemB` is inside `elemA` (a descendant of `elemA`) or when `elemA==elemB`.
