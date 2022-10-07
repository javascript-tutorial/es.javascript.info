
# FormData

Este capítulo trata sobre el envío de formularios HTML: con o sin archivos, con campos adicionales y cosas similares.

Los objetos [FormData](https://xhr.spec.whatwg.org/#interface-formdata) pueden ser de ayuda en esta tarea. Tal como habrás supuesto, éste es el objeto encargado de representar los datos de los formularios HTML.

El constructor es:
```js
let formData = new FormData([form]);
```

Si se le brinda un elemento HTML `form`, el objeto automáticamente capturará sus campos.

Lo que hace especial al objeto `FormData` es que los métodos de red, tales como `fetch`, pueden aceptar un objeto `FormData` como el cuerpo. Es codificado y enviado como `Content-Type: multipart/form-data`.

Desde el punto de vista del servidor, se ve como una entrega normal.

## Enviando un formulario simple

Enviemos un formulario simple.

Tal como se puede ver, es prácticamente una línea:

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

En este ejemplo, el código del servidor no es representado ya que está fuera de nuestro alcance. El servidor acepta la solicitud POST y responde "Usuario registrado".

## Métodos de FormData

Contamos con métodos para poder modificar los campos del `FormData`:

- `formData.append(name, value)` - agrega un campo al formulario con el nombre `name` y el valor `value`,
- `formData.append(name, blob, fileName)` - agrega un campo tal como si se tratara de un `<input type="file">`, el tercer argumento `fileName` establece el nombre del archivo (no el nombre del campo), tal como si se tratara del nombre del archivo en el sistema de archivos del usuario,
- `formData.delete(name)` - elimina el campo de nombre `name`,
- `formData.get(name)` - obtiene el valor del campo con el nombre `name`,
- `formData.has(name)` - en caso de que exista el campo con el nombre `name`, devuelve `true`, de lo contrario `false`

Un formulario técnicamente tiene permitido contar con muchos campos con el mismo atributo `name`, por lo que múltiples llamadas a `append` agregarán más campos con el mismo nombre.

Por otra parte existe un método `set`, con la misma sintaxis que `append`. La diferencia está en que `.set` remueve todos los campos con el `name` que se le ha pasado, y luego agrega el nuevo campo. De este modo nos aseguramos de que exista solamente un campo con determinado `name`, el resto es tal como en `append`:

- `formData.set(name, value)`,
- `formData.set(name, blob, fileName)`.

También es posible iterar por los campos del objeto formData utilizando un bucle `for..of`:

```js run
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// Se listan los pares clave/valor
for(let [name, value] of formData) {
  alert(`${name} = ${value}`); // key1 = value1, luego key2 = value2
}
```

## Enviando un formulario con un archivo

El formulario siempre es enviado como `Content-Type: multipart/form-data`, esta codificación permite enviar archivos. Por lo tanto los campos `<input type="file">` también son enviados, tal como sucede en un envío normal.

Aquí un ejemplo con un formulario de este tipo:

```html run autorun
<form id="formElem">
  <input type="text" name="firstName" value="John">
  Imagen: <input type="file" name="picture" accept="image/*">
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

## Enviando un formulario con datos Blob

Tal como pudimos ver en el capítulo <info:fetch>, es fácil enviar datos binarios generados dinámicamente (por ejemplo una imagen) como `Blob`. Podemos proporcionarlos directamente en un `fetch` con el parámetro `body`.

De todos modos, en la práctica suele ser conveniente enviar la imagen como parte del formulario junto a otra metadata tal como el nombre y no de forma separada.

Además los servidores suelen ser más propensos a aceptar formularios multipart, en lugar de datos binarios sin procesar.

Este ejemplo envía una imagen desde un `<canvas>` junto con algunos campos más, como un formulario utilizando `FormData`:

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

Nota como la imagen `Blob` es agregada:

```js
formData.append("image", imageBlob, "image.png");
```

Es lo mismo que si hubiera un campo `<input type="file" name="image">` en el formulario, y el usuario enviara un archivo con nombre `"image.png"` (3er argumento) con los datos `imageBlob` (2do argumento) desde su sistema de archivos.

El servidor lee el formulario `form-data` y el archivo tal como si de un formulario regular se tratara.

## Resumen

Los objetos [FormData](https://xhr.spec.whatwg.org/#interface-formdata) son utilizados para capturar un formulario HTML y enviarlo utilizando `fetch` u otro método de red.

Podemos crear el objeto con `new FormData(form)` desde un formulario HTML, o crear un objeto sin un formulario en absoluto y agregar los campos con los siguientes métodos:

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
