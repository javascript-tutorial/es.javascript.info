# Estilo Shadow DOM

Shadow DOM puede incluir las etiquetas `<style>` y `<link rel="stylesheet" href="…">`. En este último caso, las hojas de estilo se almacenan en la caché HTTP, por lo que no se vuelven a descargar para varios de los componentes que usan la misma plantilla.

Como regla general, los estilos locales solo funcionan dentro del shadow tree, y los estilos de documentos funcionan fuera de él. Pero hay pocas excepciones.

## :host

El selector `:host` permite seleccionar el shadow host (el elemento que contiene el shadow tree).

Por ejemplo, estamos creando un elemento `<custom-dialog>` que debería estar centrado. Para eso necesitamos diseñar el elemento `<custom-dialog>`.

Eso es exactamente lo que `:host` hace:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
    /* el estilo se aplicará desde el interior al elemento de diálogo personalizado */
    :host {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>

<custom-dialog>
  Hello!
</custom-dialog>
```

## Cascada

El shadow host (`<custom-dialog>` en sí) reside en el light DOM, por lo que se ve afectado por las reglas de CSS del documento.

Si hay una propiedad con estilo tanto en el `:host` localmente, y en el documento, entonces el estilo del documento tiene prioridad.

Por ejemplo, si en el documento tenemos:
```html
<style>
custom-dialog {
  padding: 0;
}
</style>
```
...Entonces el `<custom-dialog>` estaría sin padding.

Es muy conveniente, ya que podemos configurar estilos de componentes "predeterminados" en su regla `:host`, y luego sobreescribirlos fácilmente en el documento.

La excepción es cuando una propiedad local está etiquetada como `!important`. Para tales propiedades, los estilos locales tienen prioridad.


## :host(selector)

Igual que `:host`, pero se aplica solo si el shadow host coincide con el `selector`.

Por ejemplo, nos gustaría centrar el `<custom-dialog>` solo si tiene el atributo `centered`:

```html run autorun="no-epub" untrusted height=80
<template id="tmpl">
  <style>
*!*
    :host([centered]) {
*/!*
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-color: blue;
    }

    :host {
      display: inline-block;
      border: 1px solid red;
      padding: 10px;
    }
  </style>
  <slot></slot>
</template>

<script>
customElements.define('custom-dialog', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'}).append(tmpl.content.cloneNode(true));
  }
});
</script>


<custom-dialog centered>
  ¡Centrado!
</custom-dialog>

<custom-dialog>
  No centrado.
</custom-dialog>
```

Ahora los estilos de centrado adicionales solo se aplican al primer diálogo: `<custom-dialog centered>`.

Para resumir, podemos usar la familia de selectores `:host` para aplicar estilos al elemento principal del componente. Estos estilos (a menos que sea `!important`) pueden ser sobreescritos por el documento.

## Estilo de contenido eslotado(cuando un elemento ha sido insertado en un slot, se dice que fue eslotado por su término en inglés slotted)

Ahora consideremos la situación con los slots.

Los elementos eslotados vienen del light DOM, por lo que usan estilos del documento. Los estilos locales no afectan al contenido de los elementos eslotados.

En el siguiente ejemplo, el elemento eslotado `<span>` está en bold, según el estilo del documento, pero no toma el `background` del estilo local:
```html run autorun="no-epub" untrusted height=80
<style>
*!*
  span { font-weight: bold }
*/!*
</style>

<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      span { background: red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

El resultado es bold, pero no red.

Si queremos aplicar estilos a elementos eslotados en nuestro componente, hay dos opciones.

Primero, podemos aplicarle el estilo al elemento `<slot>` en sí mismo y confiar en la herencia CSS:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">*!*<span>John Smith</span>*/!*</div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      slot[name="username"] { font-weight: bold; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Aquí `<p>John Smith</p>` se vuelve bold, porque la herencia CSS está en efecto entre el `<slot>` y su contenido. Pero en el propio CSS no todas las propiedades se heredan.

Otra opción es usar la pseudoclase `::slotted(selector)`. Coincide con elementos en función de 2 condiciones.

1. Eso es un elemento eslotado, que viene del light DOM. El nombre del slot no importa. Cualquier elemento eslotado, pero solo el elemento en si, no sus hijos.
2. El elemento coincide con el `selector`.

En nuestro ejemplo, `::slotted(div)` selecciona exactamente `<div slot="username">`, pero no sus hijos:

```html run autorun="no-epub" untrusted height=80
<user-card>
  <div slot="username">
    <div>John Smith</div>
  </div>
</user-card>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
*!*
      ::slotted(div) { border: 1px solid red; }
*/!*
      </style>
      Name: <slot name="username"></slot>
    `;
  }
});
</script>
```

Tenga en cuenta, que el selector `::slotted` no puede descender más en el slot. Estos selectores no son válidos:

```css
::slotted(div span) {
  /* nuestro slotted <div> no coincide con esto */
}

::slotted(div) p {
  /* No puede entrar en light DOM */
}
```

También, `::slotted` solo se puede utilizar en CSS. No podemos usarlo en `querySelector`.

## CSS hooks con propiedades personalizadas

¿Cómo diseñamos los elementos internos de un componente del documento principal?

Selectores como `:host` aplican reglas al elemento `<custom-dialog>` o `<user-card>`, ¿pero cómo aplicar estilos a elementos del shadow DOM dentro de ellos?

No hay ningún selector que pueda afectar directamente a los estilos del shadow DOM del documento. Pero así como exponemos métodos para interactuar con nuestro componente, podemos exponer variables CSS (propiedades CSS personalizadas) para darle estilo.

**Existen propiedades CSS personalizadas en todos los niveles, tanto en light como shadow.**

Por ejemplo, en el shadow DOM podemos usar la variable CSS `--user-card-field-color` para dar estilo a los campos, y en el documento exterior establecer su valor:

```html
<style>
  .field {
    color: var(--user-card-field-color, black);
    /* si --user-card-field-color no esta definido, usar color negro */
  }
</style>
<div class="field">Name: <slot name="username"></slot></div>
<div class="field">Birthday: <slot name="birthday"></slot></div>
```

Entonces, podemos declarar esta propiedad en el documento exterior para `<user-card>`:

```css
user-card {
  --user-card-field-color: green;
}
```

Las propiedades personalizadas CSS atraviesan el shadow DOM, son visibles en todas partes, por lo que la regla interna `.field` hará uso de ella.

Aquí está el ejemplo completo:

```html run autorun="no-epub" untrusted height=80
<style>
*!*
  user-card {
    --user-card-field-color: green;
  }
*/!*
</style>

<template id="tmpl">
  <style>
*!*
    .field {
      color: var(--user-card-field-color, black);
    }
*/!*
  </style>
  <div class="field">Name: <slot name="username"></slot></div>
  <div class="field">Birthday: <slot name="birthday"></slot></div>
</template>

<script>
customElements.define('user-card', class extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode: 'open'});
    this.shadowRoot.append(document.getElementById('tmpl').content.cloneNode(true));
  }
});
</script>

<user-card>
  <span slot="username">John Smith</span>
  <span slot="birthday">01.01.2001</span>
</user-card>
```



## Resumen

Shadow DOM puede incluir estilos, como `<style>` o `<link rel="stylesheet">`.

Los estilos locales pueden afectar:
- shadow tree,
- shadow host con pseudoclases `:host` y `:host()`,
- elementos eslotados (provenientes de light DOM), `::slotted(selector)` permite seleccionar elementos eslotados, pero no a sus hijos.

Los estilos de documentos pueden afectar:
- shadow host (ya que vive en el documento exterior)
- elementos eslotados y su contenido (ya que eso también está en el documento exterior)

Cuando las propiedades CSS entran en conflicto, normalmente los estilos del documento tienen prioridad, a menos que la propiedad esté etiquetada como `!important`. Entonces, los estilos locales tienen prioridad.

Las propiedades CSS personalizadas atraviesan el shadow DOM. Se utilizan como "hooks" para aplicar estilos al componente:

1. El componente utiliza una propiedad CSS personalizada para aplicar estilos a elementos clave, como `var(--component-name-title, <default value>)`.
2. El autor del componente publica estas propiedades para los desarrolladores, son tan importantes como otros métodos de componentes públicos.
3. Cuando un desarrollador desea aplicar un estilo a un título, asigna la propiedad CSS `--component-name-title` para el shadow host o superior.
4. ¡Beneficio!
