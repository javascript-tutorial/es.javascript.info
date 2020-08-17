
# FormData

<<<<<<< HEAD
Éste capítulo trata sobre el envío de formularios HTML: con o sin archivos, con campos adicionales y cosas similares.

Los objetos [FormData](https://xhr.spec.whatwg.org/#interface-formdata) pueden ser de ayuda en esta tarea. Tal como habrás supuesto, éste es el objeto encargado de representar los datos de los formularios HTML.

El constructor es:
=======
This chapter is about sending HTML forms: with or without files, with additional fields and so on.

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) objects can help with that. As you might have guessed, it's the object to represent HTML form data.

The constructor is:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
```js
let formData = new FormData([form]);
```

<<<<<<< HEAD
Si se le brinda un elemento HTML `form`, el objeto automáticamente capturará sus campos.

Lo que hace especial al objeto `FormData` es que los métodos de red, tales como `fetch`, pueden aceptar un objeto `FormData` como el cuerpo. Es codificado y enviado como `Content-Type: multipart/form-data`.

Desde el punto de vista del servidor, se ve como una entrega normal.

## Enviando un formulario simple

Enviemos un formulario simple.

Tal como se puede ver, es prácticamente una línea:
=======
If HTML `form` element is provided, it automatically captures its fields.

The special thing about `FormData` is that network methods, such as `fetch`, can accept a `FormData` object as a body. It's encoded and sent out with `Content-Type: multipart/form-data`.

From the server point of view, that looks like a usual form submission.

## Sending a simple form

Let's send a simple form first.

As you can see, that's almost one-liner:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```html run autorun
<form id="formElem">
  <input type="text" name="name" value="John">
  <input type="text" name="surname" value="Smith">
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

<<<<<<< HEAD
En este ejemplo, el código del servidor no es representado ya que está fuera de nuestro alcance. El servidor acepta le solicitud POST y responde "Usuario registrado".

## Métodos de FormData

Contamos con métodos para poder modificar los campos del `FormData`:

- `formData.append(name, value)` - agrega un campo al formulario con el nombre `name` y el valor `value`,
- `formData.append(name, blob, fileName)` - agrega un campo tal como si se tratara de un `<input type="file">`, el tercer argumento `fileName` establece el nombre del archivo (no el nombre del campo), tal como si se tratara del nombre del archivo en el sistema de archivos del usuario,
- `formData.delete(name)` - elimina el campo de nombre `name`,
- `formData.get(name)` - obtiene el valor del campo con el nombre `name`,
- `formData.has(name)` - en caso de que exista el campo con el nombre `name`, devuelve `true`, de lo contrario `false`

Un formulario técnicamente tiene permitido contar con muchos campos con el mismo atributo `name`, por lo que múltiples llamadas a `append` agregarán más campos con el mismo nombre.

Por otra parte existe un método `set`, con la misma sintáxis que `append`. La diferencia está en que `.set` remueve todos los campos con el `name` que se le ha pasado, y luego agrega el nuevo campo. De este modo nos aseguramos de que sólo un campo éxiste con determinado `name`, el resto es tal como en `append`:
=======
In this example, the server code is not presented, as it's beyound our scope. The server accepts the POST request and replies "User saved".

## FormData Methods

We can modify fields in `FormData` with methods:

- `formData.append(name, value)` - add a form field with the given `name` and `value`,
- `formData.append(name, blob, fileName)` - add a field as if it were `<input type="file">`, the third argument `fileName` sets file name (not form field name), as it were a name of the file in user's filesystem,
- `formData.delete(name)` - remove the field with the given `name`,
- `formData.get(name)` - get the value of the field with the given `name`,
- `formData.has(name)` - if there exists a field with the given `name`, returns `true`, otherwise `false`

A form is technically allowed to have many fields with the same `name`, so multiple calls to `append` add more same-named fields.

There's also method `set`, with the same syntax as `append`. The difference is that `.set` removes all fields with the given `name`, and then appends a new field. So it makes sure there's only one field with such `name`, the rest is just like `append`:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

<<<<<<< HEAD
También es posible iterar por los campos del objeto formData utilizando un bucle `for..of`:
=======
Also we can iterate over formData fields using `for..of` loop:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

<<<<<<< HEAD
// Se listan los pares clave/valor
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1=value1, luego key2=value2
}
```

## Enviando un formulario con un archivo

El formulario siempre es enviado como `Content-Type: multipart/form-data`, esta codificación permite enviar archivos. Por lo tanto los campos `<input type="file">` también son enviados, tal como sucede en un envío normal.

Aquí un ejemplo con un formulario de este tipo:
=======
// List key/value pairs
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1=value1, then key2=value2
}
```

## Sending a form with a file

The form is always sent as `Content-Type: multipart/form-data`, this encoding allows to send files. So, `<input type="file">` fields are sent also, similar to a usual form submission.

Here's an example with such form:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
<<<<<<< HEAD
  Imagen: <input type="file" name="picture" accept="image/*">
=======
  Picture: <input type="file" name="picture" accept="image/*">
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
  <input type="submit">
</form>

<script>
  formElem.onsubmit = async (e) => {
    e.preventDefault();

    let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
*!*
      body: new FormData(formElem)
*/!*
    });

    let result = await response.json();

    alert(result.message);
  };
</script>
```

<<<<<<< HEAD
## Enviando un formulario con datos Blob

Tal como pudimos ver en el capítulo <info:fetch>, es fácil enviar datos binarios generados dinámicamente (por ejemplo una imagen) como `Blob`. Podemos proporcionarlos directamente en un `fetch` con el parámetro `body`.

De todos modos, en la práctica suele ser conveniente enviar la imagen como parte del formulario junto a otra metadata tal como el nombre y no de forma separada.

Además los servidores suelen ser más propensos a aceptar formularios multipart, en lugar de datos binarios sin procesar.

Este ejemplo envía una imagen desde un `<canvas>` junto con algunos campos más, como un formulario utilizando `FormData`:
=======
## Sending a form with Blob data

As we've seen in the chapter <info:fetch>, it's easy to send dynamically generated binary data e.g. an image, as `Blob`. We can supply it directly as `fetch` parameter `body`.

In practice though, it's often convenient to send an image not separately, but as a part of the form, with additional fields, such as "name" and other metadata.

Also, servers are usually more suited to accept multipart-encoded forms, rather than raw binary data.

This example submits an image from `<canvas>`, along with some other fields, as a form, using `FormData`:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```html run autorun height="90"
<body style="margin:0">
  <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

  <input type="button" value="Submit" onclick="submit()">

  <script>
    canvasElem.onmousemove = function(e) {
      let ctx = canvasElem.getContext('2d');
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    };

    async function submit() {
      let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

*!*
      let formData = new FormData();
      formData.append("firstName", "John");
      formData.append("image", imageBlob, "image.png");
*/!*    

      let response = await fetch('/article/formdata/post/image-form', {
        method: 'POST',
        body: formData
      });
      let result = await response.json();
      alert(result.message);
    }

  </script>
</body>
```

<<<<<<< HEAD
Nota como la imagen `Blob` es agregada:
=======
Please note how the image `Blob` is added:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
formData.append("image", imageBlob, "image.png");
```

<<<<<<< HEAD
Es lo mismo que si hubiera un campo `<input type="file" name="image">` en el formulario, y el usuario enviara un archivo con nombre `"image.png"` (3er argumento) con los datos `imageBlob` (2do argumento) desde su sistema de archivos.

El servidor lee el formulario `form-data` y el archivo tal como si de un formulario regular se tratara.

## Resumen

Los objetos [FormData](https://xhr.spec.whatwg.org/#interface-formdata) son utilizados para capturar un formulario HTML y enviarlo utilizando `fetch` u otro método de red.

Podemos crear el objeto con `new FormData(form)` desde un formulario HTML, o crearlo sin un formulario en absoluto, y agregar los campos con los siguientes métodos:

- `formData.append(nombre, valor)`
- `formData.append(nombre, blob, nombreDeArchivo)`
- `formData.set(nombre, valor)`
- `formData.set(nombre, blob, nombreDeArchivo)`

Nótese aquí dos particularidades:

1. El método `set` remueve campos con el mismo nombre, mientras que `append` no. Esta es la única diferencia entre estos dos métodos.
2. Para enviar un archivo, se requiere de tres argumentos, el último argumento es el nombre del archivo, el cual normalmente es tomado desde el sistema de archivos del usuario por el `<input type="file">`.

Otros métodos son:

- `formData.delete(nombre)`
- `formData.get(nombre)`
- `formData.has(nombre)`

¡Esto es todo!
=======
That's same as if there were `<input type="file" name="image">` in the form, and the visitor submitted a file named `"image.png"` (3rd argument) with the data `imageBlob` (2nd argument) from their filesystem.

The server reads form data and the file, as if it were a regular form submission.

## Summary

[FormData](https://xhr.spec.whatwg.org/#interface-formdata) objects are used to capture HTML form and submit it using `fetch` or another network method.

We can either create `new FormData(form)` from an HTML form, or create a object without a form at all, and then append fields with methods:

- `formData.append(name, value)`
- `formData.append(name, blob, fileName)`
- `formData.set(name, value)`
- `formData.set(name, blob, fileName)`

Let's note two peculiarities here:

1. The `set` method removes fields with the same name, `append` doesn't. That's the only difference between them.
2. To send a file, 3-argument syntax is needed, the last argument is a file name, that normally is taken from user filesystem for `<input type="file">`.

Other methods are:

- `formData.delete(name)`
- `formData.get(name)`
- `formData.has(name)`

That's it!
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
