# Eventos: change, input, cut, copy, paste

<<<<<<< HEAD
Veamos varios eventos que acompañan la actualización de datos.
=======
Let's cover various events that accompany data updates.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

## Evento: change

<<<<<<< HEAD
El evento `change` se activa cuando el elemento finaliza un cambio.
=======
The `change` event triggers when the element has finished changing.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

Para ingreso de texto significa que el evento ocurre cuando se pierde foco en el elemento.

Por ejemplo, mientras estamos escribiendo en el siguiente cuadro de texto -- no hay evento. Pero cuando movemos el focus (enfoque) a otro lado, por ejemplo hacemos click en un botón, entonces ocurre el evento `change`:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

<<<<<<< HEAD
Para otros elementos: `select`, `input type=checkbox/radio` ocurre justo después de cambiar la opción seleccionada:
=======
For other elements: `select`, `input type=checkbox/radio` it triggers right after the selection changes:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```
<<<<<<< HEAD
=======

>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1


<<<<<<< HEAD
## Evento: input
=======
The `input` event triggers every time after a value is modified by the user.

Unlike keyboard events, it triggers on any value change, even those that does not involve keyboard actions: pasting with a mouse or using speech recognition to dictate the text.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

El evento `input` ocurre cada vez que un valor es modificado por el ususario.

A diferencia de los eventos de teclado, ocurre con el cambio a cualquier valor, incluso aquellos no que involucran acciones de teclado: copiar/pegar con el mouse o usar reconocimiento de voz para dictar texto.

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

<<<<<<< HEAD
Por otro lado, el evento `input` no se activa con entradas del teclado u otras acciones que no involucren modificar un valor, e.g presionar las flechas de dirección `key:⇦` `key:⇨` mientras se está en el input.
=======
On the other hand, `input` event doesn't trigger on keyboard input and other actions that do not involve value change, e.g. pressing arrow keys `key:⇦` `key:⇨` while in the input.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```smart header="No se puede evitar nada en `oninput`"
El evento `input` ocurre después de que el valor es modificado.

Por lo tanto no podemos usar `event.preventDefault()` para evitar modificaciones, en este caso ya es demasiado tarde por lo que no habría efecto.
```

## Eventos: cut, copy, paste

Estos eventos ocurren al cortar/copiar/pegar un valor.

Estos pertenecen a la clase [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) y dan acceso a los datos copiados/pegados.

<<<<<<< HEAD
También podemos usar `event.preventDefault()` para cancelar la acción y que nada sea copiado/pegado.
Por ejemplo, el siguiente código evita tales eventos y muestra qué es los que estamos intentando cortar/copiar/pegar:
=======
We also can use `event.preventDefault()` to abort the action, then nothing gets copied/pasted.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1


```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

<<<<<<< HEAD
Por favor ten en cuenta que no solo es posible copiar/pegar texto, sino cualquier cosa. Por ejemplo, podemos copiar un archivo en el gestor de archivos del SO y pegarlo.

Hay una lista de métodos [en la especificación](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) que puede funcionar con diferentes tipos de datos incluyendo archivos, leer/escribir del portapapeles.

Pero ten en cuenta que el portapapeles es algo a nivel "global" del SO. La mayoría de los navegadores dan acceso a leer/escribir del portapapeles dentro del alcance del usuario por cuestiones de seguridad, e.g. al manejar eventos `onclick`.

Además está prohibido generar eventos "personalizados" del portapapeles con `dispatchEvent` en todos los navegadores excepto Firefox.
=======
Please note, that it's possible to copy/paste not just text, but everything. For instance, we can copy a file in the OS file manager, and paste it.

There's a list of methods [in the specification](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) that can work with different data types including files, read/write to the clipboard.

But please note that clipboard is a "global" OS-level thing. Most browsers allow read/write access to the clipboard only in the scope of certain user actions for the safety, e.g. in `onclick` event handlers.

Also it's forbidden to generate "custom" clipboard events with `dispatchEvent` in all browsers except Firefox.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

## Resumen

Eventos de modificación de datos:

| Evento | Descripción | Especiales |
|---------|----------|-------------|
| `change`| Un valor fue cambiado. | Para ingreso de texto, ocurre al perderse el enfoque |
| `input` | Para entrada de texto en cada cambio | Ocurre inmediatamente a diferencia de `change`. |
| `cut/copy/paste` | Acciones cortar/copiar/pegar | La acción puede ser cancelada. La propiedad `event.clipboardData` brinda acceso a leer/escribir del portapeles. |
