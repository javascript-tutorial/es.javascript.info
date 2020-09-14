# Comunicación entre ventanas

La política de "Mismo origen" (mismo sitio) limita el acceso de ventanas y marcos entre sí.

La idea es que si un usuario tiene dos páginas abiertas: una de `john-smith.com`, y otra es `gmail.com`, entonces no querrán que un script de `john-smith.com` lea nuestro correo de `gmail.com`. Por lo tanto, el propósito de la política de "Mismo origen" es proteger a los usuarios del robo de información.

## Mismo origen [#same-origin]

Se dice que dos URL tienen el "mismo origen" si tienen el mismo protocolo, dominio y puerto.

Todas estas URL comparten el mismo origen:

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

Estas no:

- <code>http://<b>www.</b>site.com</code> (otro dominio: `www.` importa)
- <code>http://<b>site.org</b></code> (otro dominio: `.org` importa)
- <code><b>https://</b>site.com</code> (otro protocolo: `https`)
- <code>http://site.com:<b>8080</b></code> (otro puerto: `8080`)

La política "Mismo Origen" establece que:

- si tenemos una referencia a otra ventana, por ejemplo, una ventana emergente creada por `window.open` o una ventana dentro de `<iframe>`, y esa ventana viene del mismo origen, entonces tenemos acceso completo a esa ventana.
- en caso contrario, si viene de otro origen, entonces no podemos acceder al contenido de esa ventana: variables, documento, nada. La única excepción es `location`: podemos cambiarla (redirigiendo así al usuario). Pero no podemos *leer* location (por lo que no podemos ver dónde está el usuario ahora, no hay fuga de información).

<<<<<<< HEAD
### En acción: iframe

Una etiqueta `<iframe>` aloja una ventana incrustada por separado, con sus propios objetos `document` y `window` separados.

Podemos acceder a ellos usando propiedades:

- `iframe.contentWindow` para obtener la ventana dentro del `<iframe>`.
- `iframe.contentDocument` para obtener el documento dentro del `<iframe>`, abreviatura de `iframe.contentWindow.document`.

Cuando accedemos a algo dentro de la ventana incrustada, el navegador comprueba si el iframe tiene el mismo origen. Si no es así, se niega el acceso (escribir en `location` es una excepción, aún está permitido).

Por ejemplo, intentemos leer y escribir en `<iframe>` desde otro origen:
=======
### In action: iframe

An `<iframe>` tag hosts a separate embedded window, with its own separate `document` and `window` objects.

We can access them using properties:

- `iframe.contentWindow` to get the window inside the `<iframe>`.
- `iframe.contentDocument` to get the document inside the `<iframe>`, shorthand for `iframe.contentWindow.document`.

When we access something inside the embedded window, the browser checks if the iframe has the same origin. If that's not so then the access is denied (writing to `location` is an exception, it's still permitted).

For instance, let's try reading and writing to `<iframe>` from another origin:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
<<<<<<< HEAD
    // podemos obtener la referencia a la ventana interior
=======
    // we can get the reference to the inner window
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
<<<<<<< HEAD
      // ...pero no al documento que contiene
=======
      // ...but not to the document inside it
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
*!*
      let doc = iframe.contentDocument; // ERROR
*/!*
    } catch(e) {
      alert(e); // Error de seguridad (otro origen)
    }

<<<<<<< HEAD
    // tampoco podemos LEER la URL de la página en iframe
    try {
      // No se puede leer la URL del objeto Location
=======
    // also we can't READ the URL of the page in iframe
    try {
      // Can't read URL from the Location object
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
*!*
      let href = iframe.contentWindow.location.href; // ERROR
*/!*
    } catch(e) {
      alert(e); // Error de seguridad
    }

<<<<<<< HEAD
    // ...¡podemos ESCRIBIR en location (y así cargar algo más en el iframe)!
=======
    // ...we can WRITE into location (and thus load something else into the iframe)!
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

<<<<<<< HEAD
    iframe.onload = null; // borra el controlador para no ejecutarlo después del cambio de ubicación
=======
    iframe.onload = null; // clear the handler, not to run it after the location change
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  };
</script>
```

<<<<<<< HEAD
El código anterior muestra errores para cualquier operación excepto:

- Obtener la referencia a la ventana interna `iframe.contentWindow` - eso está permitido.
- Escribir a `location`.

Por el contrario, si el `<iframe>` tiene el mismo origen, podemos hacer cualquier cosa con él:
=======
The code above shows errors for any operations except:

- Getting the reference to the inner window `iframe.contentWindow` - that's allowed.
- Writing to `location`.

Contrary to that, if the `<iframe>` has the same origin, we can do anything with it:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```html run
<!-- iframe from the same site -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // solo haz cualquier cosa
    iframe.contentDocument.body.prepend("¡Hola, mundo!");
  };
</script>
```

```smart header="`iframe.onload` vs `iframe.contentWindow.onload`"
<<<<<<< HEAD
El evento `iframe.onload` (en la etiqueta `<iframe>`) es esencialmente el mismo que `iframe.contentWindow.onload` (en el objeto de ventana incrustado). Se activa cuando la ventana incrustada se carga completamente con todos los recursos.

... Pero no podemos acceder a `iframe.contentWindow.onload` para un iframe de otro origen, así que usamos `iframe.onload`.
```

## Ventanas en subdominios: document.domain

Por definición, dos URL con diferentes dominios tienen diferentes orígenes.

Pero si las ventanas comparten el mismo dominio de segundo nivel, por ejemplo, `john.site.com`, `peter.site.com` y `site.com` (de modo que su dominio de segundo nivel común es `site.com`), podemos hacer que el navegador ignore esa diferencia, de modo que puedan tratarse como si vinieran del "mismo origen" para efecto de la comunicación entre ventanas.

Para que funcione, cada una de estas ventanas debe ejecutar el código:
=======
The `iframe.onload` event (on the `<iframe>` tag) is essentially the same as `iframe.contentWindow.onload` (on the embedded window object). It triggers when the embedded window fully loads with all resources.

...But we can't access `iframe.contentWindow.onload` for an iframe from another origin, so using `iframe.onload`.
```

## Windows on subdomains: document.domain

By definition, two URLs with different domains have different origins.

But if windows share the same second-level domain, for instance `john.site.com`, `peter.site.com` and `site.com` (so that their common second-level domain is `site.com`), we can make the browser ignore that difference, so that they can be treated as coming from the "same origin" for the purposes of cross-window communication.

To make it work, each such window should run the code:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
document.domain = 'site.com';
```
<<<<<<< HEAD

Eso es todo. Ahora pueden interactuar sin limitaciones. Nuevamente, eso solo es posible para páginas con el mismo dominio de segundo nivel.
=======

That's all. Now they can interact without limitations. Again, that's only possible for pages with the same second-level domain.

## Iframe: wrong document pitfall

When an iframe comes from the same origin, and we may access its  `document`, there's a pitfall. It's not related to cross-origin things, but important to know.

Upon its creation an iframe immediately has a document. But that document is different from the one that loads into it!

So if we do something with the document immediately, that will probably be lost.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## Iframe: trampa del documento incorrecto

Cuando un iframe proviene del mismo origen y podemos acceder a su `document`, existe una trampa. No está relacionado con cross-origin, pero es importante saberlo.

Tras su creación, un iframe tiene inmediatamente un documento. ¡Pero ese documento es diferente del que se carga en él!

Entonces, si hacemos algo con el documento de inmediato, probablemente se perderá.

Aquí, mira:


```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;
  iframe.onload = function() {
    let newDoc = iframe.contentDocument;
*!*
    // ¡el documento cargado no es el mismo que el inicial!
    alert(oldDoc == newDoc); // false
*/!*
  };
</script>
```

<<<<<<< HEAD
No deberíamos trabajar con el documento de un iframe aún no cargado, porque ese es el *documento incorrecto*. Si configuramos algún controlador de eventos en él, se ignorarán.

¿Cómo detectar el momento en que el documento está ahí?

El documento correcto definitivamente está en su lugar cuando se activa `iframe.onload`. Pero solo se activa cuando se carga todo el iframe con todos los recursos.

Podemos intentar capturar el momento anterior usando comprobaciones en `setInterval`:
=======
We shouldn't work with the document of a not-yet-loaded iframe, because that's the *wrong document*. If we set any event handlers on it, they will be ignored.

How to detect the moment when the document is there?

The right document is definitely at place when `iframe.onload`  triggers. But it only triggers when the whole iframe with all resources is loaded.

We can try to catch the moment earlier using checks in `setInterval`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // cada 100 ms comprueba si el documento es el nuevo
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

<<<<<<< HEAD
    alert("¡El nuevo documento está aquí!");
=======
    alert("New document is here!");
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    clearInterval(timer); // cancelo setInterval, ya no lo necesito
  }, 100);
</script>
```

<<<<<<< HEAD
## Colección: window.frames

Una forma alternativa de obtener un objeto de ventana para `<iframe>` -- es obtenerlo de la colección nombrada `window.frames`:
=======
## Collection: window.frames
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

- Por número: `window.frames[0]` -- el objeto de ventana para el primer marco del documento.
- Por nombre: `window.frames.iframeName` -- el objeto de ventana para el marco con `name="iframeName"`.

Por ejemplo:

```html run
<iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

<script>
  alert(iframe.contentWindow == frames[0]); // true
  alert(iframe.contentWindow == frames.win); // true
</script>
```

Un iframe puede tener otros iframes en su interior. Los objetos `window` correspondientes forman una jerarquía.

Los enlaces de navegación son:

- `window.frames` -- la colección de ventanas "hijas" (para marcos anidados).
- `window.parent` -- la referencia a la ventana "padre" (exterior).
- `window.top` -- la referencia a la ventana padre superior.

Por ejemplo:

```js run
window.frames[0].parent === window; // true
```

Podemos usar la propiedad `top` para verificar si el documento actual está abierto dentro de un marco o no:

```js run
if (window == top) { // current window == window.top?
  alert('El script está en la ventana superior, no en un marco.');
} else {
  alert('¡El script se ejecuta en un marco!');
}
```

<<<<<<< HEAD
## El atributo "sandbox" de iframe
=======
## The "sandbox" iframe attribute
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

El atributo `sandbox` permite la exclusión de ciertas acciones dentro de un `<iframe>` para evitar que ejecute código no confiable. Separa el iframe en un "sandbox" tratándolo como si procediera de otro origen y/o aplicando otras limitaciones.

<<<<<<< HEAD
Hay un "conjunto predeterminado" de restricciones aplicadas para `<iframe sandbox src="...">`. Pero se puede relajar si proporcionamos una lista de restricciones separadas por espacios que no deben aplicarse como un valor del atributo, así: `<iframe sandbox="allow-forms allow-popups">`.
=======
There's a "default set" of restrictions applied for `<iframe sandbox src="...">`. But it can be relaxed if we provide a space-separated list of restrictions that should not be applied as a value of the attribute, like this: `<iframe sandbox="allow-forms allow-popups">`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

En otras palabras, un atributo "sandbox" vacío pone las limitaciones más estrictas posibles, pero podemos poner una lista delimitada por espacios de aquellas que queremos levantar.

Aquí hay una lista de limitaciones:

`allow-same-origin`
: Por defecto, "sandbox" fuerza la política de "origen diferente" para el iframe. En otras palabras, hace que el navegador trate el `iframe` como si viniera de otro origen, incluso si su `src` apunta al mismo sitio. Con todas las restricciones implícitas para los scripts. Esta opción elimina esa característica.

`allow-top-navigation`
: Permite que el `iframe` cambie `parent.location`.

`allow-forms`
: Permite enviar formularios desde `iframe`.

`allow-scripts`
: Permite ejecutar scripts desde el `iframe`.

`allow-popups`
: Permite `window.open` popups desde el `iframe`

Consulta [el manual](mdn:/HTML/Element/iframe) para obtener más información.

El siguiente ejemplo muestra un iframe dentro de un entorno controlado con el conjunto de restricciones predeterminado: `<iframe sandbox src="...">`. Tiene algo de JavaScript y un formulario.

Tenga en cuenta que nada funciona. Entonces, el conjunto predeterminado es realmente duro:

[codetabs src="sandbox" height=140]


```smart
El propósito del atributo `"sandbox"` es solo *agregar más* restricciones. No puede eliminarlas. En particular, no puede relajar las restricciones del mismo origen si el iframe proviene de otro origen.
```

## Mensajería entre ventanas

La interfaz `postMessage` permite que las ventanas se comuniquen entre sí sin importar de qué origen sean.

<<<<<<< HEAD
Por lo tanto, es una forma de evitar la política del "mismo origen". Permite a una ventana de `john-smith.com` hablar con `gmail.com` e intercambiar información, pero solo si ambos están de acuerdo y llaman a las funciones de JavaScript correspondientes. Eso lo hace seguro para los usuarios.
=======
So, it's a way around the "Same Origin" policy. It allows a window from `john-smith.com` to talk to `gmail.com` and exchange information, but only if they both agree and call corresponding JavaScript functions. That makes it safe for users.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

La interfaz tiene dos partes.

### postMessage

La ventana que quiere enviar un mensaje llama al método [postMessage](mdn:api/Window.postMessage) de la ventana receptora. En otras palabras, si queremos enviar el mensaje a `win`, debemos llamar a `win.postMessage(data, targetOrigin)`.

Argumentos:

`data`
<<<<<<< HEAD
: Los datos a enviar. Puede ser cualquier objeto, los datos se clonan mediante el "algoritmo de clonación estructurada". IE solo admite strings, por lo que debemos usar `JSON.stringify` en objetos complejos para admitir ese navegador.
=======
: The data to send. Can be any object, the data is cloned using the "structured serialization algorithm". IE supports only strings, so we should `JSON.stringify` complex objects to support that browser.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

`targetOrigin`
: Especifica el origen de la ventana de destino, de modo que solo una ventana del origen dado recibirá el mensaje.

<<<<<<< HEAD
El argumento "targetOrigin" es una medida de seguridad. Recuerde, si la ventana de destino proviene de otro origen, no podemos leer su `location` en la ventana del remitente. Por lo tanto, no podemos estar seguros de qué sitio está abierto en la ventana deseada en este momento: el usuario podría navegar fuera y la ventana del remitente no tiene idea de ello.

Especificar `targetOrigin` asegura que la ventana solo reciba los datos si todavía está en el sitio correcto. Importante cuando los datos son sensibles.
=======
The `targetOrigin` is a safety measure. Remember, if the target window comes from another origin, we can't read it's `location` in the sender window. So we can't be sure which site is open in the intended window right now: the user could navigate away, and the sender window has no idea about it.

Specifying `targetOrigin` ensures that the window only receives the data if it's still at the right site. Important when the data is sensitive.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Por ejemplo, aquí `win` solo recibirá el mensaje si tiene un documento del origen `http://example.com`:

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

  win.postMessage("message", "http://example.com");
</script>
```

Si no queremos esa comprobación, podemos establecer `targetOrigin` en `*`.

```html no-beautify
<iframe src="http://example.com" name="example">

<script>
  let win = window.frames.example;

*!*
  win.postMessage("message", "*");
*/!*
</script>
```


### onmessage

Para recibir un mensaje, la ventana destino debe tener un controlador en el evento `message`. Se activa cuando se llama a `postMessage` (y la comprobación de `targetOrigin` es correcta).

El objeto de evento tiene propiedades especiales:

`data`
: Los datos de `postMessage`.

`origin`
: El origen del remitente, por ejemplo, `http://javascript.info`.

`source`
<<<<<<< HEAD
: La referencia a la ventana del remitente. Podemos llamar inmediatamente `source.postMessage(...)` de regreso si queremos.
=======
: The reference to the sender window. We can immediately `source.postMessage(...)` back if we want.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Para asignar ese controlador, debemos usar `addEventListener`, una sintaxis corta `window.onmessage` no funciona.

He aquí un ejemplo:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // algo de un dominio desconocido, ignorémoslo
    return;
  }

<<<<<<< HEAD
  alert( "Recibí: " + event.data );

  // puedes enviar un mensaje usando event.source.postMessage(...)
=======
  alert( "received: " + event.data );

  // can message back using event.source.postMessage(...)
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
});
```

El ejemplo completo:

[codetabs src="postmessage" height=120]

<<<<<<< HEAD
## Resumen

Para llamar a métodos y acceder al contenido de otra ventana, primero debemos tener una referencia a ella.
=======
## Summary

To call methods and access the content of another window, we should first have a reference to it.

For popups we have these references:
- From the opener window: `window.open` -- opens a new window and returns a reference to it,
- From the popup: `window.opener` -- is a reference to the opener window from a popup.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Para las ventanas emergentes tenemos estas referencias:
- Desde la ventana de apertura: `window.open` -- abre una nueva ventana y devuelve una referencia a ella,
- Desde la ventana emergente: `window.opener` -- es una referencia a la ventana de apertura desde una ventana emergente.

Para iframes, podemos acceder a las ventanas padres o hijas usando:
- `window.frames` -- una colección de objetos de ventana anidados,
- `window.parent`, `window.top` son las referencias a las ventanas principales y superiores,
- `iframe.contentWindow` es la ventana dentro de una etiqueta `<iframe>`.

<<<<<<< HEAD
Si las ventanas comparten el mismo origen (host, puerto, protocolo), las ventanas pueden hacer lo que quieran entre sí.

En caso contrario, las únicas acciones posibles son:
- Cambiar `location` en otra ventana (acceso de solo escritura).
- Enviarle un mensaje.

Las excepciones son:
- Ventanas que comparten el mismo dominio de segundo nivel: `a.site.com` y `b.site.com`. Luego, configurar `document.domain='site.com'` en ambos, los coloca en el estado de "mismo origen".
- Si un iframe tiene un atributo `sandbox`, se coloca forzosamente en el estado de "origen diferente", a menos que se especifique `allow-same-origin` en el valor del atributo. Eso se puede usar para ejecutar código que no es de confianza en iframes desde el mismo sitio.

La interfaz `postMessage` permite que dos ventanas con cualquier origen hablen:

1. El remitente llama a `targetWin.postMessage(data, targetOrigin)`.
2. Si `targetOrigin` no es `'*'`, entonces el navegador comprueba si la ventana `targetWin` tiene el origen `targetOrigin`.
3. Si es así, entonces `targetWin` activa el evento `message` con propiedades especiales:
    - `origin` -- el origen de la ventana del remitente (como` http://my.site.com`)
    - `source` -- la referencia a la ventana del remitente.
    - `data` -- los datos, cualquier objeto en todas partes excepto IE que solo admite cadenas.
=======
Otherwise, only possible actions are:
- Change the `location` of another window (write-only access).
- Post a message to it.

Exceptions are:
- Windows that share the same second-level domain: `a.site.com` and `b.site.com`. Then setting `document.domain='site.com'` in both of them puts them into the "same origin" state.
- If an iframe has a `sandbox` attribute, it is forcefully put into the "different origin" state, unless the `allow-same-origin` is specified in the attribute value. That can be used to run untrusted code in iframes from the same site.

The `postMessage` interface allows two windows with any origins to talk:

1. The sender calls `targetWin.postMessage(data, targetOrigin)`.
2. If `targetOrigin` is not `'*'`, then the browser checks if window `targetWin` has the origin `targetOrigin`.
3. If it is so, then `targetWin` triggers the `message` event with special properties:
    - `origin` -- the origin of the sender window (like `http://my.site.com`)
    - `source` -- the reference to the sender window.
    - `data` -- the data, any object in everywhere except IE that supports only strings.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    Deberíamos usar `addEventListener` para configurar el controlador para este evento dentro de la ventana de destino.
