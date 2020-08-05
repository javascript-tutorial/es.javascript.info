# Eventos: change, input, cut, copy, paste

Veamos varios eventos que acompañan la actualización de datos.

## Evento: change

El evento `change` se activa cuando el elemento finaliza un cambio.

Para ingreso de texto significa que el evento ocurre cuando se pierde foco en el elemento.

Por ejemplo, mientras estamos escribiendo en el siguiente cuadro de texto -- no hay evento. Pero cuando movemos el focus (enfoque) a otro lado, por ejemplo hacemos click en un botón, entonces ocurre el evento `change`:

```html autorun height=40 run
<input type="text" onchange="alert(this.value)">
<input type="button" value="Button">
```

Para otros elementos: `select`, `input type=checkbox/radio` ocurre justo después de cambiar la opción seleccionada:

```html autorun height=40 run
<select onchange="alert(this.value)">
  <option value="">Select something</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```


## Evento: input

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

Por otro lado, el evento `input` no se activa con entradas del teclado u otras acciones que no involucren modificar un valor, e.g presionar las flechas de dirección `key:⇦` `key:⇨` mientras se está en el input.

```smart header="No se puede evitar nada en `oninput`"
El evento `input` ocurre después de que el valor es modificado.

Por lo tanto no podemos usar `event.preventDefault()` para evitar modificaciones, en este caso ya es demasiado tarde por lo que no habría efecto.
```

## Eventos: cut, copy, paste

Estos eventos ocurren al cortar/copiar/pegar un valor.

Estos pertenecen a la clase [ClipboardEvent](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces) y dan acceso a los datos copiados/pegados.

También podemos usar `event.preventDefault()` para cancelar la acción y que nada sea copiado/pegado.
Por ejemplo, el siguiente código evita tales eventos y muestra qué es los que estamos intentando cortar/copiar/pegar:


```html autorun height=40 run
<input type="text" id="input">
<script>
  input.oncut = input.oncopy = input.onpaste = function(event) {
    alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
    return false;
  };
</script>
```

Por favor ten en cuenta que no solo es posible copiar/pegar texto, sino cualquier cosa. Por ejemplo, podemos copiar un archivo en el gestor de archivos del SO y pegarlo.

Hay una lista de métodos [en la especificación](https://www.w3.org/TR/clipboard-apis/#dfn-datatransfer) que puede trabajar con diferentes tipos de datos incluyendo archivos, leer/escribir del portapapeles.

Pero ten en cuenta que el portapapeles es algo a nivel "global" del SO. La mayoría de los navegadores dan acceso a leer/escribir del portapapeles dentro del alcance del usuario por cuestiones de seguridad, e.g. al manejar eventos `onclick`.

Además está prohibido generar eventos "personalizados" del portapapeles con `dispatchEvent` en todos los navegadores excepto Firefox.

## Resumen

Eventos de modificación de datos:

| Evento | Descripción | Especiales |
|---------|----------|-------------|
| `change`| Un valor fue cambiado. | Para ingreso de texto, ocurre al perderse el focus |
| `input` | Para ingresos de texto en cada cambio | Ocurre inmediatamente a diferencia de `change`. |
| `cut/copy/paste` | Acciones cortar/copiar/pegar | La acción puede ser cancelada. La propiedad `event.clipboardData` brinda acceso a leer/escribir del portapeles. |
