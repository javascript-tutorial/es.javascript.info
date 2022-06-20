# Entorno del navegador, especificaciones

<<<<<<< HEAD
El lenguaje JavaScript fue creado inicialmente para los navegadores web. Desde entonces, ha evolucionado y se ha convertido en un lenguaje con muchos usos y plataformas.

Una plataforma puede ser un navegador, un servidor web u otro *host*; incluso una máquina de café "inteligente", si puede ejecutar JavaScript. Cada uno de ellos proporciona una funcionalidad específica de la plataforma. La especificación de JavaScript llama a esto *entorno de host* (host environment).

Un entorno host proporciona sus propios objetos específicos de la plataforma y funciones adicionales al núcleo del lenguaje. Los navegadores web proporcionan un medio para controlar las páginas web. Node.js proporciona características del lado del servidor, etc.
=======
The JavaScript language was initially created for web browsers. Since then, it has evolved into a language with many uses and platforms.

A platform may be a browser, or a web-server or another *host*, or even a "smart" coffee machine if it can run JavaScript. Each of these provides platform-specific functionality. The JavaScript specification calls that a *host environment*.

A host environment provides its own objects and functions in addition to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

Aquí tienes una vista general de lo que tenemos cuando JavaScript se ejecuta en un navegador web:

![](windowObjects.svg)

Hay un objeto "raíz" llamado `window`. Tiene dos roles:

1. Primero, es un objeto global para el código JavaScript, como se describe en el capítulo <info:global-object>.
2. Segundo, representa la "ventana del navegador" y proporciona métodos para controlarla.

<<<<<<< HEAD
Por ejemplo, aquí lo usamos como un objeto global:
=======
For instance, we can use it as a global object:
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

```js run global
function sayHi() {
  alert("Hola");
}

// Las funciones globales son métodos del objeto global:
window.sayHi();
```

<<<<<<< HEAD
Y aquí, lo usamos como una ventana del navegador para ver la altura de la ventana:
=======
And we can use it as a browser window, to show the window height:
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

```js run
alert(window.innerHeight); // altura interior de la ventana
```

<<<<<<< HEAD
Hay más métodos y propiedades específicos de `window` que cubriremos más adelante.
=======
There are more window-specific methods and properties, which we'll cover later.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

## DOM (Modelo de Objetos del Documento)

<<<<<<< HEAD
Document Object Model, o DOM, representa todo el contenido de la página como objetos que pueden ser modificados.
=======
The Document Object Model, or DOM for short, represents all page content as objects that can be modified.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

El objeto `document` es el punto de entrada a la página. Con él podemos cambiar o crear cualquier cosa en la página.

Por ejemplo:
```js run
// cambiar el color de fondo a rojo
document.body.style.background = "red";

// deshacer el cambio después de 1 segundo
setTimeout(() => document.body.style.background = "", 1000);
```

<<<<<<< HEAD
Aquí usamos `document.body.style`, pero hay muchos, muchos más. Las propiedades y métodos se describen en la especificación: [DOM Living Standard](https://dom.spec.whatwg.org).
=======
Here, we used `document.body.style`, but there's much, much more. Properties and methods are described in the specification: [DOM Living Standard](https://dom.spec.whatwg.org).
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

```smart header="DOM no es solo para navegadores"
La especificación DOM explica la estructura de un documento y proporciona objetos para manipularlo. Hay instrumentos que no son del navegador que también usan DOM.

<<<<<<< HEAD
Por ejemplo, los scripts del lado del servidor que descargan páginas HTML y las procesan, también pueden usar DOM. Sin embargo, pueden admitir solo una parte de la especificación.
=======
For instance, server-side scripts that download HTML pages and process them can also use the DOM. They may support only a part of the specification though.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
```

```smart header="CSSOM para los estilos"
También hay una especificación separada, [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/) para las reglas y hojas de estilo CSS, que explica cómo se representan como objetos y cómo leerlos y escribirlos.

<<<<<<< HEAD
CSSOM se usa junto con DOM cuando modificamos las reglas de estilo para el documento. Sin embargo, en la práctica rara vez se requiere CSSOM, porque rara vez necesitamos modificar las reglas CSS de JavaScript (generalmente solo agregamos y eliminamos clases CSS, no modificamos sus reglas CSS), pero eso también es posible.
=======
The CSSOM is used together with the DOM when we modify style rules for the document. In practice though, the CSSOM is rarely required, because we rarely need to modify CSS rules from JavaScript (usually we just add/remove CSS classes, not modify their CSS rules), but that's also possible.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
```

## BOM (Modelo de Objetos del Navegador)

El Modelo de Objetos del Navegador (Browser Object Model, BOM) son objetos adicionales proporcionados por el navegador (entorno host) para trabajar con todo excepto el documento.

Por ejemplo:

<<<<<<< HEAD
- El objeto [navigator](https://developer.mozilla.org/es/docs/Web/API/Window/navigator) proporciona información sobre el navegador y el sistema operativo. Hay muchas propiedades, pero las dos más conocidas son: `navigator.userAgent`: acerca del navegador actual, y `navigator.platform`: acerca de la plataforma (ayuda a distinguir Windows/Linux/Mac, etc.).
- El objeto [location](https://developer.mozilla.org/es/docs/Web/API/Window/location) nos permite leer la URL actual y puede redirigir el navegador a una nueva.
=======
- The [navigator](mdn:api/Window/navigator) object provides background information about the browser and the operating system. There are many properties, but the two most widely known are: `navigator.userAgent` -- about the current browser, and `navigator.platform` -- about the platform (can help to differentiate between Windows/Linux/Mac etc).
- The [location](mdn:api/Window/location) object allows us to read the current URL and can redirect the browser to a new one.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

Aquí vemos cómo podemos usar el objeto `location`:

```js run
alert(location.href); // muestra la URL actual
if (confirm("Ir a wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirigir el navegador a otra URL
}
```

<<<<<<< HEAD
Las funciones `alert/confirm/prompt` también forman parte de BOM: no están directamente relacionadas con el documento, sino que representan métodos puros de comunicación del navegador con el usuario.

```smart header="Especificación de HTML"
BOM es la parte general de la especificación de [HTML specification](https://html.spec.whatwg.org).

Sí, oíste bien. La especificación HTML en <https://html.spec.whatwg.org> no solo trata sobre el "lenguaje HTML" (etiquetas, atributos), sino que también cubre un montón de objetos, métodos y extensiones DOM específicas del navegador. Eso es "HTML en términos generales". Además, algunas partes tienen especificaciones adicionales listadas en <https://spec.whatwg.org>.
=======
The functions `alert/confirm/prompt` are also a part of the BOM: they are not directly related to the document, but represent pure browser methods for communicating with the user.

```smart header="Specifications"
The BOM is a part of the general [HTML specification](https://html.spec.whatwg.org).

Yes, you heard that right. The HTML spec at <https://html.spec.whatwg.org> is not only about the "HTML language" (tags, attributes), but also covers a bunch of objects, methods, and browser-specific DOM extensions. That's "HTML in broad terms". Also, some parts have additional specs listed at <https://spec.whatwg.org>.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
```

## Resumen

En términos de estándares, tenemos:

<<<<<<< HEAD
La especificación del DOM
: Describe la estructura del documento, las manipulaciones y los eventos; consulte <https://dom.spec.whatwg.org>.

La especificación del CSSOM
: Describe las hojas de estilo y las reglas de estilo, las manipulaciones con ellas y su vinculación a los documentos; consulte <https://www.w3.org/TR/cssom-1/>.
=======
DOM specification
: Describes the document structure, manipulations, and events, see <https://dom.spec.whatwg.org>.

CSSOM specification
: Describes stylesheets and style rules, manipulations with them, and their binding to documents, see <https://www.w3.org/TR/cssom-1/>.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

La especificación del HTML
: Describe el lenguaje HTML (por ejemplo, etiquetas), y también el BOM (modelo de objeto del navegador) que describe varias funciones del navegador como `setTimeout`, `alert`, `location`, etc. Esta toma la especificación DOM y la extiende con muchas propiedades y métodos adicionales. Consulta <https://html.spec.whatwg.org>.

Adicionalmente, algunas clases son descritas separadamente en <https://spec.whatwg.org/>.

<<<<<<< HEAD
Ten en cuenta los enlaces anteriores, ya que hay tantas cosas que es imposible cubrir y recordar todo.

Cuando desees leer sobre una propiedad o un método, el manual de Mozilla en <https://developer.mozilla.org/es/search> es un buen recurso, pero leer las especificaciones correspondientes puede ser mejor: es más complejo y hay más para leer, pero hará que su conocimiento de los fundamentos sea sólido y completo.
=======
Please note these links, as there's so much to learn that it's impossible to cover everything and remember it all.

When you'd like to read about a property or a method, the Mozilla manual at <https://developer.mozilla.org/en-US/> is also a nice resource, but the corresponding spec may be better: it's more complex and longer to read, but will make your fundamental knowledge sound and complete.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

Para encontrar algo, a menudo es conveniente usar una búsqueda como "WHATWG [término]" o "MDN [término]". Por ejemplo <https://google.com?q=whatwg+localstorage>, <https://google.com?q=mdn+localstorage>.

<<<<<<< HEAD
Ahora nos concentraremos en aprender el DOM, porque juega un papel central en la interfaz de usuario.
=======
Now, we'll get down to learning the DOM, because the document plays the central role in the UI.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80
