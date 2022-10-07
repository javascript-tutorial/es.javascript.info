
# Elemento template

El elemento incorporado `<template>` sirve como almacenamiento para plantillas de markup de HTML. El navegador ignora su contenido, solo verifica la validez de la sintaxis, pero podemos acceder a él y usarlo en JavaScript para crear otros elementos.

En teoría, podríamos crear cualquier elemento invisible en algún lugar de HTML par fines de almacenamiento de HTML markup. ¿Qué hay de especial en `<template>`?

En primer lugar, su contenido puede ser cualquier HTML válido, incluso si normalmente requiere una etiqueta adjunta adecuada.

Por ejemplo, podemos poner una fila de tabla `<tr>`:
```html
<template>
  <tr>
     <td>Contenidos</td>
  </tr>
</template>
```

Normalmente, si intentamos poner `<tr>` dentro, digamos, de un `<div>`, el navegador detecta la estructura DOM como inválida y la “arregla”, y añade un `<table>` alrededor. Eso no es lo que queremos. Sin embargo, `<template>` mantiene exactamente lo que ponemos allí.

También podemos poner estilos y scripts dentro de `<template>`:

```html
<template>
  <style>
    p { font-weight: bold; }
  </style>
  <script>
    alert("Hola");
  </script>
</template>
```

El navegador considera al contenido `<template>` “fuera del documento”: Los estilos no son aplicados, los scripts no son ejecutados, `<video autoplay>` no es ejecutado, etc.

El contenido cobra vida (estilos aplicados, scripts, etc) cuando los insertamos dentro del documento.

## Insertando template

El contenido template está disponible en su propiedad `content` como un [DocumentFragment](info:modifying-document#document-fragment): un tipo especial de nodo DOM.

Podemos tratarlo como a cualquier otro nodo DOM, excepto por una propiedad especial: cuando lo insertamos en algún lugar, sus hijos son insertados en su lugar.

Por ejemplo:

```html run
<template id="tmpl">
  <script>
    alert("Hola");
  </script>
  <div class="message">¡Hola mundo!</div>
</template>

<script>
  let elem = document.createElement('div');

*!*
  // Clona el contenido de la plantilla para reutilizarlo múltiples veces
  elem.append(tmpl.content.cloneNode(true));
*/!*

  document.body.append(elem);
  // Ahora el script de <template> se ejecuta
</script>
```

Reescribamos un ejemplo de Shadow DOM del capítulo anterior usando `<template>`:

```html run untrusted autorun="no-epub" height=60
<template id="tmpl">
  <style> p { font-weight: bold; } </style>
  <p id="message"></p>
</template>

<div id="elem">Haz clic sobre mi</div>

<script>
  elem.onclick = function() {
    elem.attachShadow({mode: 'open'});

*!*
    elem.shadowRoot.append(tmpl.content.cloneNode(true)); // (*)
*/!*

    elem.shadowRoot.getElementById('message').innerHTML = "¡Saludos desde las sombras!";
  };
</script>
```

En la línea `(*)`, cuando clonamos e insertamos `tmpl.content` como su `DocumentFragment`, sus hijos (`<style>`, `<p>`) se insertan en su lugar.

Ellos forman el shadow DOM:

```html
<div id="elem">
  #shadow-root
    <style> p { font-weight: bold; } </style>
    <p id="message"></p>
</div>
```

## Resumen

Para resumir:

- El contenido `<template>` puede ser cualquier HTML sintácticamente correcto.
- El contenido `<template>` es considerado “fuera del documento”, para que no afecte a nada.
- Podemos acceder a `template.content` desde JavaScript, y clonarlo para reusarlo en un nuevo componente.

La etiqueta `<template>` es bastante única, ya que: 

- El navegador comprueba la sintaxis HTML dentro de él (lo opuesto a usar una plantilla string dentro de un script).
- ...Pero aún permite el uso de cualquier etiqueta HTML de alto nivel, incluso aquellas que no tienen sentido sin un envoltorio adecuado (por ej.`<tr>`).
- El contenido se vuelve interactivo cuando es insertado en el documento: los scripts se ejecutan, `<video autoplay>` se reproduce, etc. 

El elemento `<template>` no ofrece ningún mecanismo de iteración, enlazamiento de datos o sustitución de variables, pero podemos implementar los que están por encima.
