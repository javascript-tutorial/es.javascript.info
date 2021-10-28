# Shadow DOM slots, composición

Muchos tipos de componentes; como pestañas, menús, galerías de imágenes, etc., necesitan renderizar contenido.

Al igual que el `<select>` nativo del navegador espera elementos de `<option>`, nuestros `<custom-tabs>` pueden esperar que se pase el contenido real de la pestaña. Y un `<custom-menu>` puede esperar elementos de menú.

El código que hace uso de `<custom-menu>` puede verse así:

```html
<custom-menu>
  <title>Menú de dulces</title>
  <item>Paletas</item>
  <item>Tostada de frutas</item>
  <item>Magdalenas</item>
</custom-menu>
```

...Entonces nuestro componente debería renderizar correctamente, como un agradable menú con un título y elementos dados, manejar eventos de menú, etc.

¿Cómo implementarlo?

Podríamos intentar analizar el contenido del elemento y copiar y reorganizar dinámicamente los nodos del DOM. Esto es posible, pero si estamos moviendo elementos al shadow DOM, entonces los estilos CSS del documento no se aplican allí, por lo que se puede perder el estilo visual. También eso requiere algo de programación.

Afortunadamente, no tenemos que hacerlo. Shadow DOM soporta elementos `<slot>`, que se llenan automáticamente con el contenido del light DOM.

## Slots con nombres

Veamos cómo funcionan los slots en un ejemplo simple.

Aquí, el shadow DOM `<user-card>` proporciona dos slots, que se llenan desde el light DOM:

```html run autorun="no-epub" untrusted height=80
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Nombre:
*!*
        <slot name="username"></slot>
*/!*
      </div>
      <div>Cumpleaños:
*!*
        <slot name="birthday"></slot>
*/!*
      </div>
    `;
  }
});
</script>

<user-card>
  <span *!*slot="username"*/!*>John Smith</span>
  <span *!*slot="birthday"*/!*>01.01.2001</span>
</user-card>
```

En el shadow DOM, `<slot name="X">` define un "punto de inserción", un lugar donde se renderizan los elementos con `slot="X"`.

Luego, el navegador realiza la "composición": toma elementos del light DOM y los renderiza en los slots correspondientes del shadow DOM. Al final, tenemos exactamente lo que queremos: un componente que se puede llenar con datos.

Aquí está la estructura del DOM después del script, sin tener en cuenta la composición:

```html
<user-card>
  #shadow-root
    <div>Nombre:
      <slot name="username"></slot>
    </div>
    <div>Cumpleaños:
      <slot name="birthday"></slot>
    </div>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```

Creamos el shadow DOM, así que aquí está, en `#shadow-root`. Ahora el elemento tiene ambos, light DOM y shadow DOM.

Para fines de renderizado, para cada `<slot name="...">` en el shadow DOM, el navegador busca `slot="..."` con el mismo nombre en el light DOM.  Estos elementos se renderizan dentro de los slots:

![](shadow-dom-user-card.svg)

El resultado se llama "flattened DOM" (DOM aplanado):

```html
<user-card>
  #shadow-root
    <div>Nombre:
      <slot name="username">
        <!-- el elemento esloteado se inserta en el slot -->
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Cumpleaños:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
</user-card>
```

...Pero el flattened DOM existe solo para fines de procesamiento y manejo de eventos. Es una especie de "virtual DOM". Así se muestran las cosas. Pero los nodos del documento en realidad no se mueven!

Eso se puede comprobar fácilmente si ejecutamos `querySelectorAll`: los nodos todavía están en sus lugares.

```js
// light DOM <span> los nodos siguen en el mismo lugar, en `<user-card>`
alert( document.querySelectorAll('user-card span').length ); // 2
```

Entonces, el flattened DOM se deriva del shadow DOM insertando slots. El navegador lo renderiza y lo usa para la herencia de estilo, la propagación de eventos (más sobre esto más adelante). Pero JavaScript todavía ve el documento "tal cual", antes de acoplarlo.

````warn header="Solo los nodos hijos de alto nivel pueden tener el atributo slot=\"...\" "
El atributo `slot =" ... "` solo es válido para los hijos directos del shadow host (en nuestro ejemplo, el elemento `<user-card>`). Para los elementos anidados, se ignora.

Por ejemplo, el segundo `<span>` aquí se ignora (ya que no es un elemento hijo de nivel superior de `<user-card>`):
```html
<user-card>
  <span slot="username">John Smith</span>
  <div>
    <!-- slot no válido, debe ser hijo directo de user-card -->
    <span slot="birthday">01.01.2001</span>
  </div>
</user-card>
```
````

Si hay varios elementos en el light DOM con el mismo nombre de slot, se añaden al slot, uno tras otro.

Por ejemplo, este:
```html
<user-card>
  <span slot="username">John</span>
  <span slot="username">Smith</span>
</user-card>
```

Este flattened DOM con dos elementos en `<slot name="username">`:

```html
<user-card>
  #shadow-root
    <div>Nombre:
      <slot name="username">
        <span slot="username">John</span>
        <span slot="username">Smith</span>
      </slot>
    </div>
    <div>Cumpleaños:
      <slot name="birthday"></slot>
    </div>
</user-card>
```

## Slot con contenido alternativo

Si ponemos algo dentro de un `<slot>`, se convierte en el contenido alternativo, "predeterminado". El navegador lo muestra si no tiene un equivalente en el Light DOM desde donde llenarlo.

Por ejemplo, en esta parte del shadow DOM, se representa `Anónimo` si no hay `slot="username"` en el light DOM.

```html
<div>Name:
  <slot name="username">anónimo</slot>
</div>
```

## Slot predeterminado: el primero sin nombre

El primer `<slot>` en el shadow DOM que no tiene un nombre es un slot "predeterminado". Obtiene todos los nodos del light DOM que no están ubicados en otro lugar.

Por ejemplo, agreguemos el slot predeterminado a nuestro `<user-card>` que muestra toda la información sin slotear sobre el usuario:

```html run autorun="no-epub" untrusted height=140
<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
    <div>Nombre:
      <slot name="username"></slot>
    </div>
    <div>Cumpleaños:
      <slot name="birthday"></slot>
    </div>
    <fieldset>
      <legend>Otra informacion</legend>
*!*
      <slot></slot>
*/!*
    </fieldset>
    `;
  }
});
</script>

<user-card>
*!*
  <div>Me gusta nadar.</div>
*/!*
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
*!*
  <div>...Y jugar volleyball también!</div>
*/!*
</user-card>
```

Todo el contenido del light DOM sin slotear entra en el conjunto de campos "Otra información".

Los elementos se agregan a un slot uno tras otro, por lo que ambas piezas de información sin slotear se encuentran juntas en el slot predeterminado.

El flattened DOM se ve así:

```html
<user-card>
  #shadow-root
    <div>Nombre:
      <slot name="username">
        <span slot="username">John Smith</span>
      </slot>
    </div>
    <div>Cumpleaños:
      <slot name="birthday">
        <span slot="birthday">01.01.2001</span>
      </slot>
    </div>
    <fieldset>
      <legend>Otra información</legend>
*!*
      <slot>
        <div>Me gusta nadar.</div>
        <div>...Y jugar volleyball también!</div>
      </slot>
*/!*
    </fieldset>
</user-card>
```

## Ejemplo de menú

Ahora volvamos al `<custom-menu>`, mencionado al principio del capítulo.

Podemos usar slots para distribuir elementos.

Aquí está el marcado para `<custom-menu>`:

```html
<custom-menu>
  <span slot="title">Menú de dulces</span>
  <li slot="item">Paletas</li>
  <li slot="item">Tostada de frutas</li>
  <li slot="item">Magdalenas</li>
</custom-menu>
```

La plantilla del shadow DOM con los slots adecuados:

```html
<template id="tmpl">
  <style> /* estilos del menu */ </style>
  <div class="menu">
    <slot name="title"></slot>
    <ul><slot name="item"></slot></ul>
  </div>
</template>
```

1. `<span slot="title">` entra en `<slot name="title">`.
2. Hay muchos `<li slot="item">` en la plantilla, pero solo un `<slot name="item">` en la plantilla. Así que todos esos `<li slot="item">` se añaden a  `<slot name="item">` uno tras otro, formando así la lista.

El flattened DOM se convierte en:

```html
<custom-menu>
  #shadow-root
    <style> /* estilos del menu */ </style>
    <div class="menu">
      <slot name="title">
        <span slot="title">Menú de dulces</span>
      </slot>
      <ul>
        <slot name="item">
          <li slot="item">Paletas</li>
          <li slot="item">Tostada de frutas</li>
          <li slot="item">Magdalenas</li>
        </slot>
      </ul>
    </div>
</custom-menu>
```

Uno podría notar que, en un DOM válido, `<li>` debe ser un hijo directo de `<ul>`. Pero esto es flattened DOM, describe cómo se representa el componente, tal cosa sucede naturalmente aquí.

Solo necesitamos agregar un manejador de `click` para abrir/cerrar la lista, y el `<custom-menu>` está listo:

```js
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});

    // tmpl es la plantilla del shadow DOM (arriba)
    this.shadowRoot.append( tmpl.content.cloneNode(true) );

    // no podemos seleccionar nodos del light DOM, así que manejemos los clics en el slot
    this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
      // abrir/cerrar el menú
      this.shadowRoot.querySelector('.menu').classList.toggle('closed');
    };
  }
});
```

Aquí está la demostración completa:

[iframe src="menu" height=140 edit]

Por supuesto, podemos agregarle más funcionalidad: eventos, métodos, etc.

## Actualizar slots

¿Qué pasa si el código externo quiere agregar/eliminar elementos de menú dinámicamente?

**El navegador monitorea los slots y actualiza la representación si se agregan/eliminan elementos sloteados.**

Además, como los nodos del light DOM no se copian, sino que simplemente se renderizan en los slots, los cambios dentro de ellos se hacen visibles de inmediato.

Así que no tenemos que hacer nada para actualizar el renderizado. Pero si el código del componente quiere saber acerca de los cambios del slot, entonces el evento `slotchange` está disponible.

Por ejemplo, aquí el elemento del menú se inserta dinámicamente después de 1 segundo y el título cambia después de 2 segundos.:

```html run untrusted height=80
<custom-menu id="menu">
  <span slot="title">Menú de dulces</span>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // shadowRoot no puede tener controladores de eventos, por lo que se usa el primer hijo
    this.shadowRoot.firstElementChild.addEventListener('slotchange',
      e => alert("slotchange: " + e.target.name)
    );
  }
});

setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Paletas</li>')
}, 1000);

setTimeout(() => {
  menu.querySelector('[slot="title"]').innerHTML = "Nuevo menú";
}, 2000);
</script>
```

La representación del menú se actualiza cada vez sin nuestra intervención..

Hay dos eventos `slotchange` aquí:

1. En la inicialización:

    `slotchange: title` se dispara inmediatamente, cuando el `slot="title"` desde el light DOM entra en el slot correspondiente.
2. Después de 1 segundo:

    `slotchange: item` se activa, cuando se agrega un nuevo `<li slot="item">`.

Observa que no hay ningún evento `slotchange` después de 2 segundos, cuando se modifica el contenido de `slot = "title"`. Eso es porque no hay cambio en el slot. Modificamos el contenido dentro del elemento esloteado, eso es otra cosa.

Si quisiéramos rastrear las modificaciones internas del Light DOM desde JavaScript, eso también es posible usando un mecanismo más genérico: [MutationObserver](info:mutation-observer).

## Slot API

Finalmente, mencionemos los métodos JavaScript relacionados con los slots.

Como hemos visto antes, JavaScript busca en el DOM "real", sin aplanar. Pero, si el shadow tree tiene `{mode: 'open'}`, averiguar qué elementos hay asignados a un slot y, viceversa, averiguar el slot por el elemento dentro de el:

- `node.assignedSlot` -- retorna el elemento `<slot>` al que está asignado el `nodo`.
- `slot.assignedNodes({flatten: true/false})` -- Nodos DOM, asignados al slot. La opción `flatten` es `false` por defecto. Si se establece explícitamente a `true`, entonces mira más profundamente en el flattened DOM, retornando slots anidadas en caso de componentes anidados y el contenido de respaldo si ningún node está asignado.
- `slot.assignedElements({flatten: true/false})` -- Elementos DOM, asignados al slot (igual que arriba, pero solo nodos de elementos).

Estos métodos son útiles cuando no solo necesitamos mostrar el contenido esloteado, sino también rastrearlo en JavaScript.

Por ejemplo, si el componente `<custom-menu>` quiere saber qué muestra, entonces podría rastrear `slotchange` y obtener los elementos de `slot.assignedElements`:

```html run untrusted height=120
<custom-menu id="menu">
  <span slot="title">Menú de dulces</span>
  <li slot="item">Paletas</li>
  <li slot="item">Tostada de frutas</li>
</custom-menu>

<script>
customElements.define('custom-menu', class extends HTMLElement {
  items = []

  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;

    // se activa cuando cambia el contenido del slot
*!*
    this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
      let slot = e.target;
      if (slot.name == 'item') {
        this.items = slot.assignedElements().map(elem => elem.textContent);
        alert("Items: " + this.items);
      }
    });
*/!*
  }
});

// se actualizan después de 1 segundo
setTimeout(() => {
  menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Magdalenas</li>')
}, 1000);
</script>
```


## Resumen

Por lo general, si un elemento tiene shadow DOM, no se muestra su light DOM. Los slots permiten mostrar elementos del light DOM en lugares específicos del shadow DOM.

Hay dos tipos de slots:

- Named slots: `<slot name="X">...</slot>` -- consigue los light children con `slot="X"`.
- Default slot: el primer `<slot>` sin un nombre (los slots subsiguientes sin nombre se ignoran) -- obtiene light children sin slotear.
- Si hay muchos elementos para el mismo slot, se añaden uno tras otro.
- El contenido del elemento `<slot>` se utiliza como respaldo. Se muestra si no hay light children para el slot.

El proceso de renderizar elementos sloteados dentro de sus slots se llama "composición". El resultado se denomina "flattened DOM".

La composición no mueve realmente los nodos, desde el punto de vista de JavaScript, el DOM sigue siendo el mismo.

JavaScript puede acceder a los slots mediante estos métodos:
- `slot.assignedNodes/Elements()` -- retorna nodos/elementos dentro del `slot`.
- `node.assignedSlot` -- la propiedad inversa, retorna el slot por un nodo.

Si queremos saber, podemos rastrear el contenido de los slots usando:
- `slotchange` event -- se activa la primera vez que se llena un slot, y en cualquier operación de agregar/quitar/reemplazar del elemento esloteado, pero no sus hijos. El slot es `event.target`.
- [MutationObserver](info:mutation-observer) para profundizar en el contenido del slot, observar los cambios en su interior.

Ahora que, como sabemos cómo mostrar elementos del light DOM en el shadow DOM, veamos cómo diseñarlos correctamente. La regla básica es que los elementos shadow se diseñan en el interior y los elementos light se diseñan afuera, pero hay notables excepciones.

Veremos los detalles en el próximo capítulo.
