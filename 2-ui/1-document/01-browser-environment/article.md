# Entorno del navegador, especificaciones

El lenguaje JavaScript fue creado inicialmente para los navegadores web. Desde entonces, ha evolucionado y se ha convertido en un lenguaje con muchos usos y plataformas.

Una plataforma puede ser un navegador, un servidor web, una lavadora u otro *host (anfitrión)*. Cada uno de ellos proporciona una funcionalidad específica. La especificación de JavaScript lo llama *entorno host*.

<<<<<<< HEAD
Un entorno host proporciona objetos específicos de la plataforma y funciones adicionales al núcleo del lenguaje. Los navegadores web proporcionan un medio para controlar las páginas web. Node.JS proporciona características del lado del servidor, y así sucesivamente.
=======
A host environment provides platform-specific objects and functions additional to the language core. Web browsers give a means to control web pages. Node.js provides server-side features, and so on.
>>>>>>> 8735adcb6f08d7b3f38992d8dd3dab301ca9e272

Aquí tienes una vista general de lo que tenemos cuando JavaScript se ejecuta en un navegador web:

![](windowObjects.png)

Hay un objeto "raíz" llamado `window`.Tiene dos roles:

1. Primero, es un objeto global para el código JavaScript, como se describe en el capítulo [Objeto global](/global-object).
2. En segundo lugar, representa la "ventana del navegador" y proporciona métodos para controlarla.

Por ejemplo, aquí lo usamos como un objeto global:

```js run
function sayHi() {
  alert("Hello");
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

El objeto de `document` da acceso al contenido de la página. Con él podemos cambiar o crear cualquier cosa en la página.

Por ejemplo:
```js run
// cambia el color de fondo a rojo
document.body.style.background = "red";

// deshace el cambio después de 1 segundo
setTimeout(() => document.body.style.background = "", 1000);
```

Aquí usamos `document.body.style`, pero hay muchos, muchos más. Las propiedades y métodos se describen en la especificación. Sucede que hay dos grupos de trabajo que lo desarrollan:

1. [W3C](https://es.wikipedia.org/wiki/World_Wide_Web_Consortium) -- la documentación se encuentra en <https://www.w3.org/TR/dom>.
2. [WhatWG](https://es.wikipedia.org/wiki/Web_Hypertext_Application_Technology_Working_Group), publicado en <https://dom.spec.whatwg.org>.

Como es de esperar, los dos grupos no siempre están de acuerdo, así que es como si tuviéramos dos conjuntos de estándares. Pero son muy similares y eventualmente las cosas se fusionan. La documentación que puede encontrar en los recursos dados es muy similar, con aproximadamente un 99% de coincidencia. Hay diferencias muy pequeñas que probablemente no notarás.

Personalmente, encuentro <https://dom.spec.whatwg.org> más agradable de usar.

En el pasado lejano, no existía ninguna norma en absoluto: cada navegador lo implementaba como quería. Diferentes navegadores tenían diferentes métodos y propiedades para la misma cosa, y los desarrolladores tenían que escribir un código diferente para cada uno de ellos. Tiempos oscuros, desordenados.

Incluso ahora, podemos encontrarnos con código antiguo que usa propiedades específicas del navegador y soluciona las incompatibilidades. Pero, en este tutorial usaremos cosas modernas: no hay necesidad de aprender cosas antiguas hasta que realmente lo necesites (es muy probable que no lo hagas).

Luego apareció el estándar DOM, en un intento de llevar a todos a un acuerdo. La primera versión fue "DOM Level 1", luego fue extendida por DOM Level 2, luego DOM Level 3, y ahora llegó a DOM Level 4. La gente del grupo WhatWG se cansó de los números de versión y lo están llamando simplemente "DOM", sin un numero. Así que haremos lo mismo.

```smart header="DOM no es solo para navegadores"
La especificación DOM explica la estructura de un documento y proporciona objetos para manipularlo. Hay instrumentos que no son del navegador que también lo utilizan.

Por ejemplo, las herramientas del lado del servidor que descargan páginas HTML y las procesan utilizan el DOM. Sin embargo, pueden soportar solo una parte de la especificación.
```

```smart header="CSSOM para los estilos"
Las reglas CSS y las hojas de estilo no están estructuradas como HTML. Hay una especificación [CSSOM](https://www.w3.org/TR/cssom-1/) separada, que explica cómo se representan como objetos, y cómo leerlos y escribirlos.

CSSOM se usa junto con DOM cuando modificamos las reglas de estilo para el documento. En la práctica, sin embargo, rara vez se requiere CSSOM, porque generalmente las reglas de CSS son estáticas. Rara vez necesitamos agregar/eliminar reglas CSS desde JavaScript, por lo que no lo cubriremos ahora.
```

## BOM (parte de la especificación HTML)

El Modelo de Objetos del Navegador (BOM) son objetos adicionales proporcionados por el navegador (entorno host) para trabajar con todo excepto el documento.

Por ejemplo:

- El objeto [navigator](mdn:api/Window/navigator), proporciona información sobre el navegador y el sistema operativo. Hay muchas propiedades, pero las dos más conocidas son: `navigator.userAgent` -- sobre el navegador actual, y `navigator.platform` -- sobre la plataforma (puede ayudar a diferenciar entre Windows/Linux/Mac, etc.).
- El objeto [location](mdn:api/Window/location), nos permite leer la URL actual y puede redirigir el navegador a uno nuevo.

Aquí vemos cómo podemos usar el objeto `location`:

```js run
alert(location.href); // muestra la URL actual
if (confirm("Go to wikipedia?")) {
  location.href = "https://wikipedia.org"; // redirigir el navegador a otra URL
}
```

Las funciones `alert/confirm/prompt` también forman parte de BOM: no están directamente relacionadas con el documento, sino que representan métodos de comunicación puros con el usuario.

```smart header="Especificación de HTML"
BOM es la parte general de la especificación de HTML [HTML specification](https://html.spec.whatwg.org).

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

Ahora nos ocuparemos de aprender DOM, porque el documento juega el papel central en la interfaz de usuario.

Ten en cuenta los enlaces anteriores, ya que hay tantas cosas que aprender que es imposible cubrir y recordar todo.

Cuando desees leer sobre una propiedad o un método, el manual de Mozilla en <https://developer.mozilla.org/es/search> es un buen recurso, pero leer las especificaciones correspondientes puede ser mejor: es más complejo y más para leer, pero hará que su conocimiento de los fundamentos sea sólido y completo.
