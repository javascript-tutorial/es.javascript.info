# Eventos: change, input, cut, copy, paste

Veamos varios eventos que acompañan la actualización de datos.

## Evento: change

El evento `change` se activa cuando el elemento finaliza un cambio.

Para ingreso de texto significa que el evento ocurre cuando se pierde foco en el elemento.

Por ejemplo, mientras estamos escribiendo en el siguiente cuadro de texto, no hay evento. Pero cuando movemos el focus (enfoque) a otro lado, por ejemplo hacemos click en un botón, entonces ocurre el evento `change`:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

Para otros elementos: `select`, `input type=checkbox/radio` se dispara inmediatamente después de cambiar la opción seleccionada:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```


## Evento: input

El evento `input` se dispara cada vez que un valor es modificado por el usuario.

A diferencia de los eventos de teclado, ocurre con el cambio a cualquier valor, incluso aquellos que no involucran acciones de teclado: copiar/pegar con el mouse o usar reconocimiento de voz para dictar texto.

Por ejemplo:

```html autorun height=40 run
<input type="text" id="input"> oninput: <span id="result"></span>
<script>
  input.oninput = function() {
    result.innerHTML = input.value;
  };
</script>
```

Si queremos manejar cualquier modificación en un `<input>` entonces este evento es la mejor opción.

Por otro lado, el evento `input` no se activa con entradas del teclado u otras acciones que no involucren modificar un valor, por ejemplo presionar las flechas de dirección `key:⇦` `key:⇨` mientras se está en el input.

```smart header="No podemos prevenir nada en oninput"
El evento `input` se dispara después de que el valor es modificado.

Por lo tanto no podemos usar `event.preventDefault()` aquí, es demasiado tarde y no tendría efecto.
```

## Eventos: cut, copy, paste

Estos eventos ocurren al cortar/copiar/pegar un valor.

Estos pertenecen a la clase [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) y dan acceso a los datos cortados/copiados/pegados.

También podemos usar `event.preventDefault()` para cancelar la acción y que nada sea cortado/copiado/pegado.

El siguiente código también evita todo evento `cut/copy/paste` y muestra qué es los que estamos intentando cortar/copiar/pegar:

```html autorun height=40 run
<input type="text" id="input">
<script>
  input.onpaste = function(event) {
    alert("paste: " + event.clipboardData.getData('text/plain'));
    event.preventDefault();
  };

  input.oncut = input.oncopy = function(event) {
    alert(event.type + '-' + document.getSelection());
    event.preventDefault();
  };
</script>
```

Nota que dentro de los manejadores `cut` y `copy`, llamar a `event.clipboardData.getData(...)` devuelve  un string vacío. Esto es porque el dato no está en el portapapeles aún. Y si usamos `event.preventDefault()` no será copiado en absoluto.

Por ello el ejemplo arriba usa `document.getSelection()` para obtener el texto seleccionado. Puedes encontrar más detalles acerca de selección en el artículo <info:selection-range>.

No solo es posible copiar/pegar texto, sino cualquier cosa. Por ejemplo, podemos copiar un archivo en el gestor de archivos del SO y pegarlo.

Esto es porque `clipboardData` implementa la interfaz `DataTransfer`, usada comúnmente para "arrastrar y soltar" y "copiar y pegar". Ahora esto está fuera de nuestro objetivo, pero puedes encontrar sus métodos [en la especificación DataTransfer](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Hay además una API asincrónica adicional para acceso al portapapeles: `navigator.clipboard`. Más en la especificación [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [no soportado en Firefox](https://caniuse.com/async-clipboard).

### Restricciones de seguridad

El portapapeles es algo a nivel "global" del SO. Un usuario puede alternar entre ventanas, copiar y pegar diferentes cosas, y el navegador no debería ver todo eso.

Por ello la mayoría de los navegadores dan acceso al portapapeles únicamente bajo determinadas acciones del usuario, como copiar y pegar.

Está prohibido generar eventos "personalizados" del portapapeles con `dispatchEvent` en todos los navegadores excepto Firefox. Incluso si logramos enviar tal evento, la especificación establece que tal evento "sintético" no debe brindar acceso al portapapeles.

Incluso si alguien decide guardar `event.clipboardData` en un manejador de evento para accederlo luego, esto no funcionará.

Para reiterar, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) funciona únicamente en el contexto de manejadores de eventos iniciados por el usuario.

Por otro lado, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) es una API más reciente, pensada para el uso en cualquier contexto. Esta pide autorización al usuario cuando la necesita. No soportada en Firefox.

## Resumen

Eventos de modificación de datos:

| Evento | Descripción | Especiales |
|---------|----------|-------------|
| `change`| Un valor fue cambiado. | En ingreso de texto, se dispara cuando el elemento pierde el foco |
| `input` | Cada cambio de entrada de texto | Se dispara de inmediato con cada cambio, a diferencia de `change`. |
| `cut/copy/paste` | Acciones cortar/copiar/pegar | La acción puede ser cancelada. La propiedad `event.clipboardData` brinda acceso al portapeles. Todos los navegadores excepto Firefox también soportan `navigator.clipboard`. |
