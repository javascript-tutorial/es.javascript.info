# Entorno del navegador, especificaciones

El lenguaje JavaScript fue creado inicialmente para los navegadores web. Desde entonces, ha evolucionado y se ha convertido en un lenguaje con muchos usos y plataformas.

Una plataforma puede ser un navegador, un servidor web u otro *host*, incluso una máquina de café "inteligente", si puede ejecutar JavaScript. Cada uno de ellos proporciona una funcionalidad específica de la plataforma. La especificación de JavaScript llama esto como *entorno de host* (host enviroment).

Un entorno host proporciona objetos específicos de la plataforma y funciones adicionales al núcleo del lenguaje. Los navegadores web proporcionan un medio para controlar las páginas web. Node.JS proporciona características del lado del servidor, y así sucesivamente.

Aquí tienes una vista general de lo que tenemos cuando JavaScript se ejecuta en un navegador web:

![](windowObjects.svg)

Hay un objeto "raíz" llamado `window`.Tiene dos roles:

1. Primero, es un objeto global para el código JavaScript, como se describe en el capítulo [Objeto global](/global-object).
2. En segundo lugar, representa la "ventana del navegador" y proporciona métodos para controlarla.

Por ejemplo, aquí lo usamos como un objeto global:

```js run
function sayHi() {
  alert("Hola");
}

// Las funciones globales son accesibles como propiedades de window
window.sayHi();
```

Y aquí lo usamos como una ventana del navegador, para ver la altura de la ventana:

```js run
alert(window.innerHeight); // altura interior de la ventana
```

Hay más métodos y propiedades específicos de `window`, los cubriremos más adelante.

## Modelo de Objetos del Documento (DOM)

El objeto `document` da acceso al contenido de la página. Con él podemos cambiar o crear cualquier cosa en la página.

Por ejemplo:
```js run
// cambiar el color de fondo a rojo
document.body.style.background = "red";

// deshacer el cambio después de 1 segundo
setTimeout(() => document.body.style.background = "", 1000);
```

Aquí usamos `document.body.style`, pero hay muchos, muchos más. Las propiedades y métodos se describen en la especificación: [DOM Living Standard](https://dom.spec.whatwg.org).

```smart header="DOM no es solo para navegadores"
La especificación DOM explica la estructura de un documento y proporciona objetos para manipularlo. Hay instrumentos que no son del navegador que también usan DOM.

Por ejemplo, los scripts del lado del servidor que descargan páginas HTML y las procesan, también pueden usar DOM. Sin embargo, pueden admitir solo una parte de la especificación.
```

```smart header="CSSOM para los estilos"
También hay una especificación separada, [CSS Object Model (CSSOM)] (https://www.w3.org/TR/cssom-1/) para las reglas y hojas de estilo CSS, que explica cómo se representan como objetos y cómo leerlos y escribirlos.

CSSOM se usa junto con DOM cuando modificamos las reglas de estilo para el documento. Sin embargo, en la práctica, rara vez se requiere CSSOM, porque rara vez necesitamos modificar las reglas CSS de JavaScript (generalmente solo agregamos / eliminamos clases CSS, no modificamos sus reglas CSS), pero eso también es posible.
```

## BOM (parte de la especificación HTML)

El Modelo de Objetos del Navegador (BOM) son objetos adicionales proporcionados por el navegador (entorno host) para trabajar con todo excepto el documento.

Por ejemplo:

- El objeto [navigator](https://developer.mozilla.org/es/docs/Web/API/Window/navigator), proporciona información sobre el navegador y el sistema operativo. Hay muchas propiedades, pero las dos más conocidas son: `navigator.userAgent` -- sobre el navegador actual, y `navigator.platform` -- sobre la plataforma (puede ayudar a diferenciar entre Windows/Linux/Mac, etc.).
- El objeto [location](https://developer.mozilla.org/es/docs/Web/API/Window/location), nos permite leer la URL actual y puede redirigir el navegador a uno nuevo.

Aquí vemos cómo podemos usar el objeto `location`:

```js run
alert(location.href); // muestra la URL actual
if (confirm("Go to wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirigir el navegador a otra URL
}
```

Las funciones `alert/confirm/prompt` también forman parte de BOM: no están directamente relacionadas con el documento, sino que representan métodos de comunicación puros con el usuario.

```smart header="Especificación de HTML"
BOM es la parte general de la especificación de [HTML specification](https://html.spec.whatwg.org).

Sí, oíste bien. La especificación HTML en <https://html.spec.whatwg.org> no solo trata sobre el "lenguaje HTML" (etiquetas, atributos), sino que también cubre un montón de objetos, métodos y extensiones DOM específicas del navegador. Eso es "HTML en términos generales".
```

## Resumen

Hablando de estándares, tenemos:

La especificación del DOM
: Describe la estructura del documento, las manipulaciones y los eventos, consulte <https://dom.spec.whatwg.org>.

La especificación del CSSOM
: Describe las hojas de estilo y las reglas de estilo, las manipulaciones con ellas y su vinculación a los documentos, consulte <https://www.w3.org/TR/cssom-1/>.

La especificación del HTML
: Describe el lenguaje HTML (por ejemplo, etiquetas) y también el BOM (modelo de objeto del navegador) -- varias funciones del navegador: `setTimeout`, `alert`, `location`, etc., consulte <https://html.spec.whatwg.org>. Toma la especificación DOM y la extiende con muchas propiedades y métodos adicionales.

Ahora nos concentraremos en aprender el DOM, porque juega un papel central en la interfaz de usuario.

Ten en cuenta los enlaces anteriores, ya que hay tantas cosas que aprender que es imposible cubrir y recordar todo.

Cuando desees leer sobre una propiedad o un método, el manual de Mozilla en <https://developer.mozilla.org/es/search> es un buen recurso, pero leer las especificaciones correspondientes puede ser mejor: es más complejo y hay más para leer, pero hará que su conocimiento de los fundamentos sea sólido y completo.
