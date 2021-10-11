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

<<<<<<< HEAD
Estos pertenecen a la clase [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) y dan acceso a los datos copiados/pegados.
=======
They belong to [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) class and provide access to the data that is cut/copied/pasted.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

Podemos usar `event.preventDefault()` para cancelar la acción y que nada sea copiado/pegado.

<<<<<<< HEAD
El siguiente código también evita tales eventos y muestra qué es los que estamos intentando cortar/copiar/pegar:
=======
For instance, the code below prevents all `cut/copy/paste` events and shows the text we're trying to cut/copy/paste:
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

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

<<<<<<< HEAD
Ten en cuenta que no solo es posible copiar/pegar texto, sino cualquier cosa. Por ejemplo, podemos copiar un archivo en el gestor de archivos del SO y pegarlo.

Esto es porque `clipboardData` implementa la interfaz `DataTransfer`, usada comúnmente para "arrastrar y soltar" y "copiar y pegar". Ahora esto está fuera de nuestro objetivo, pero puedes encontrar sus métodos [en la especificación](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

```warn header="ClipboardAPI: restricciones para seguridad del usuario"
El portapapeles es algo a nivel "global" del SO.  Por cuestiones de seguridad, la mayoría de los navegadores dan acceso al portapapeles solamente bajo determinadas acciones del usuario, por ejemplo al manejar eventos `onclick`.

Además está prohibido generar eventos "personalizados" del portapapeles con `dispatchEvent` en todos los navegadores excepto Firefox.
```
=======
Please note: inside `cut` and `copy` event handlers a call to  `event.clipboardData.getData(...)` returns an empty string. That's because technically the data isn't in the clipboard yet. If we use `event.preventDefault()` it won't be copied at all.

So the example above uses `document.getSelection()` to get the selected text. You can find more details about document selection in the article <info:selection-range>.

It's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

That's because `clipboardData` implements `DataTransfer` interface, commonly used for drag'n'drop and copy/pasting. It's bit beyond our scope now, but you can find its methods in the [DataTransfer specification](https://html.spec.whatwg.org/multipage/dnd.html#the-datatransfer-interface).

Also, there's an additional asynchronous API of accessing the clipboard: `navigator.clipboard`. More about it in the specification [Clipboard API and events](https://www.w3.org/TR/clipboard-apis/), [not supported by Firefox](https://caniuse.com/async-clipboard).

### Safety restrictions

The clipboard is a "global" OS-level thing. A user may switch between various applications, copy/paste different things, and a browser page shouldn't see all that.

So most browsers allow seamless read/write access to the clipboard only in the scope of certain user actions, such as copying/pasting etc.

It's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox. And even if we manage to dispatch such event, the specification clearly states that such "syntetic" events must not provide access to the clipboard.

Even if someone decides to save `event.clipboardData` in an event handler, and then access it later -- it won't work.

To reiterate, [event.clipboardData](https://www.w3.org/TR/clipboard-apis/#clipboardevent-clipboarddata) works solely in the context of user-initiated event handlers.

On the other hand, [navigator.clipboard](https://www.w3.org/TR/clipboard-apis/#h-navigator-clipboard) is the more recent API, meant for use in any context. It asks for user permission, if needed. Not supported in Firefox.
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2

## Resumen

Eventos de modificación de datos:

| Evento | Descripción | Especiales |
|---------|----------|-------------|
<<<<<<< HEAD
| `change`| Un valor fue cambiado. | Para ingreso de texto, ocurre al perderse el enfoque |
| `input` | Para entrada de texto en cada cambio | Ocurre inmediatamente a diferencia de `change`. |
| `cut/copy/paste` | Acciones cortar/copiar/pegar | La acción puede ser cancelada. La propiedad `event.clipboardData` brinda acceso a leer/escribir del portapeles. |
=======
| `change`| A value was changed. | For text inputs triggers on focus loss. |
| `input` | For text inputs on every change. | Triggers immediately unlike `change`. |
| `cut/copy/paste` | Cut/copy/paste actions. | The action can be prevented. The `event.clipboardData` property gives access to the clipboard. All browsers except Firefox also support `navigator.clipboard`. |
>>>>>>> 193319c963b9ba86ac7d9590f7261a36ecdcc4d2
