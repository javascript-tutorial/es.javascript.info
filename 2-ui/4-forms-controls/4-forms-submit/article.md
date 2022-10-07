# Formularios: evento y método submit

El evento `submit` se activa cuando el formulario es enviado, normalmente se utiliza para validar el formulario antes de ser enviado al servidor o bien para abortar el envío y procesarlo con JavaScript.

El método `form.submit()` permite iniciar el envío del formulario mediante JavaScript. Podemos utilizarlo para crear y enviar nuestros propios formularios al servidor.

Veamos más detalles sobre ellos.

## Evento: submit

Mayormente un formulario puede enviarse de dos maneras:

1. La primera -- Haciendo click en `<input type="submit">` o en `<input type="image">`.
2. La segunda -- Pulsando la tecla `key:Enter` en un campo del formulario.

Ambas acciones causan que el evento `submit` sea activado en el formulario. El handler puede comprobar los datos, y si hay errores, mostrarlos e invocar `event.preventDefault()`, entonces el formulario no será enviado al servidor.

En el formulario de abajo:
1. Ve al campo tipo texto y pulsa la tecla `key:Enter`.
2. Haz click en `<input type="submit">`.

Ambas acciones muestran `alert` y el formulario no es enviado debido a la presencia de `return false`:

```html autorun height=60 no-beautify
<form onsubmit="alert('submit!');return false">
  Primero: Enter en el campo de texto <input type="text" value="texto"><br>
  Segundo: Click en "submit": <input type="submit" value="Submit">
</form>
```

````smart header="Relación entre `submit` y `click`"
Cuando un formulario es enviado utilizando `key:Enter` en un campo tipo texto, un evento `click` se genera en el `<input type="submit">`

Muy curioso, dado que no hubo ningún click en absoluto.

Aquí esta la demo:
```html autorun height=60
<form onsubmit="return false">
 <input type="text" size="30" value="Sitúa el cursor aquí y pulsa Enter">
 <input type="submit" value="Submit" *!*onclick="alert('click')"*/!*>
</form>
```

````

## Método: submit

Para enviar un formulario al servidor manualmente, podemos usar `form.submit()`.

Entonces el evento `submit` no será generado. Se asume que si el programador llama `form.submit()`, entonces el script ya realizó todo el procesamiento relacionado.

A veces es usado para crear y enviar un formulario manualmente, como en este ejemplo:

```js run
let form = document.createElement('form');
form.action = 'https://google.com/search';
form.method = 'GET';

form.innerHTML = '<input name="q" value="test">';

// el formulario debe estar en el document para poder enviarlo
document.body.append(form);

form.submit();
```
