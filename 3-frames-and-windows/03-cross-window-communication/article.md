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

### En acción: iframe

Una etiqueta `<iframe>` aloja una ventana incrustada por separado, con sus propios objetos `document` y `window` separados.

Podemos acceder a ellos usando propiedades:

- `iframe.contentWindow` para obtener la ventana dentro del `<iframe>`.
- `iframe.contentDocument` para obtener el documento dentro del `<iframe>`, abreviatura de `iframe.contentWindow.document`.

Cuando accedemos a algo dentro de la ventana incrustada, el navegador comprueba si el iframe tiene el mismo origen. Si no es así, se niega el acceso (escribir en `location` es una excepción, aún está permitido).

Por ejemplo, intentemos leer y escribir en `<iframe>` desde otro origen:

```html run
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // podemos obtener la referencia a la ventana interior
*!*
    let iframeWindow = iframe.contentWindow; // OK
*/!*
    try {
      // ...pero no al documento que contiene
*!*
      let doc = iframe.contentDocument; // ERROR
*/!*
    } catch(e) {
      alert(e); // Error de seguridad (otro origen)
    }

    // tampoco podemos LEER la URL de la página en iframe
    try {
      // No se puede leer la URL del objeto Location
*!*
      let href = iframe.contentWindow.location.href; // ERROR
*/!*
    } catch(e) {
      alert(e); // Error de seguridad
    }

    // ...¡podemos ESCRIBIR en location (y así cargar algo más en el iframe)!
*!*
    iframe.contentWindow.location = '/'; // OK
*/!*

    iframe.onload = null; // borra el controlador para no ejecutarlo después del cambio de ubicación
  };
</script>
```

El código anterior muestra errores para cualquier operación excepto:

- Obtener la referencia a la ventana interna `iframe.contentWindow` - eso está permitido.
- Escribir a `location`.

Por el contrario, si el `<iframe>` tiene el mismo origen, podemos hacer cualquier cosa con él:

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
El evento `iframe.onload` (en la etiqueta `<iframe>`) es esencialmente el mismo que `iframe.contentWindow.onload` (en el objeto de ventana incrustado). Se activa cuando la ventana incrustada se carga completamente con todos los recursos.

... Pero no podemos acceder a `iframe.contentWindow.onload` para un iframe de otro origen, así que usamos `iframe.onload`.
```

## Ventanas en subdominios: document.domain

Por definición, dos URL con diferentes dominios tienen diferentes orígenes.

Pero si las ventanas comparten el mismo dominio de segundo nivel, por ejemplo, `john.site.com`, `peter.site.com` y `site.com` (de modo que su dominio de segundo nivel común es `site.com`), podemos hacer que el navegador ignore esa diferencia, de modo que puedan tratarse como si vinieran del "mismo origen" para efecto de la comunicación entre ventanas.

Para que funcione, cada una de estas ventanas debe ejecutar el código:

```js
document.domain = 'site.com';
```

Eso es todo. Ahora pueden interactuar sin limitaciones. Nuevamente, eso solo es posible para páginas con el mismo dominio de segundo nivel.

```warn header="Obsoleto, pero aún funcionando"
La propiedad `document.domain` está en proceso de ser removido de la [especificación](https://html.spec.whatwg.org/multipage/origin.html#relaxing-the-same-origin-restriction). Los mensajería cross-window  (explicado pronto más abajo) es el reemplazo sugerido.

Dicho esto, hasta ahora todos los navegadores lo soportan. Y tal soporte será mantenido en el futuro, para no romper el código existente que se apoya en `document.domain`.
```


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

No deberíamos trabajar con el documento de un iframe aún no cargado, porque ese es el *documento incorrecto*. Si configuramos algún controlador de eventos en él, se ignorarán.

¿Cómo detectar el momento en que el documento está ahí?

El documento correcto definitivamente está en su lugar cuando se activa `iframe.onload`. Pero solo se activa cuando se carga todo el iframe con todos los recursos.

Podemos intentar capturar el momento anterior usando comprobaciones en `setInterval`:

```html run
<iframe src="/" id="iframe"></iframe>

<script>
  let oldDoc = iframe.contentDocument;

  // cada 100 ms comprueba si el documento es el nuevo
  let timer = setInterval(() => {
    let newDoc = iframe.contentDocument;
    if (newDoc == oldDoc) return;

    alert("¡El nuevo documento está aquí!");

    clearInterval(timer); // cancelo setInterval, ya no lo necesito
  }, 100);
</script>
```

## Colección: window.frames

Una forma alternativa de obtener un objeto de ventana para `<iframe>` -- es obtenerlo de la colección nombrada `window.frames`:

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

## El atributo "sandbox" de iframe

El atributo `sandbox` permite la exclusión de ciertas acciones dentro de un `<iframe>` para evitar que ejecute código no confiable. Separa el iframe en un "sandbox" tratándolo como si procediera de otro origen y/o aplicando otras limitaciones.

Hay un "conjunto predeterminado" de restricciones aplicadas para `<iframe sandbox src="...">`. Pero se puede relajar si proporcionamos una lista de restricciones separadas por espacios que no deben aplicarse como un valor del atributo, así: `<iframe sandbox="allow-forms allow-popups">`.

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

Consulta [el manual](https://developer.mozilla.org/es/docs/Web/HTML/Elemento/iframe) para obtener más información.

El siguiente ejemplo muestra un iframe dentro de un entorno controlado con el conjunto de restricciones predeterminado: `<iframe sandbox src="...">`. Tiene algo de JavaScript y un formulario.

Tenga en cuenta que nada funciona. Entonces, el conjunto predeterminado es realmente duro:

[codetabs src="sandbox" height=140]


```smart
El propósito del atributo `"sandbox"` es solo *agregar más* restricciones. No puede eliminarlas. En particular, no puede relajar las restricciones del mismo origen si el iframe proviene de otro origen.
```

## Mensajería entre ventanas

La interfaz `postMessage` permite que las ventanas se comuniquen entre sí sin importar de qué origen sean.

Por lo tanto, es una forma de evitar la política del "mismo origen". Permite a una ventana de `john-smith.com` hablar con `gmail.com` e intercambiar información, pero solo si ambos están de acuerdo y llaman a las funciones de JavaScript correspondientes. Eso lo hace seguro para los usuarios.

La interfaz tiene dos partes.

### postMessage

La ventana que quiere enviar un mensaje llama al método [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage) de la ventana receptora. En otras palabras, si queremos enviar el mensaje a `win`, debemos llamar a `win.postMessage(data, targetOrigin)`.

Argumentos:

`data`
: Los datos a enviar. Puede ser cualquier objeto, los datos se clonan mediante el "algoritmo de clonación estructurada". IE solo admite strings, por lo que debemos usar `JSON.stringify` en objetos complejos para admitir ese navegador.

`targetOrigin`
: Especifica el origen de la ventana de destino, de modo que solo una ventana del origen dado recibirá el mensaje.

El argumento "targetOrigin" es una medida de seguridad. Recuerde que si la ventana de destino proviene de otro origen, no podemos leer su `location` en la ventana del remitente. Por lo tanto, no podemos estar seguros qué sitio está abierto en la ventana deseada en este momento: el usuario podría navegar fuera del sitio y la ventana del remitente no tener idea de ello.

Especificar `targetOrigin` asegura que la ventana solo reciba los datos si todavía está en el sitio correcto. Importante cuando los datos son sensibles.

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
: La referencia a la ventana del remitente. Podemos llamar inmediatamente `source.postMessage(...)` de regreso si queremos.

Para asignar ese controlador, debemos usar `addEventListener`, una sintaxis corta `window.onmessage` no funciona.

He aquí un ejemplo:

```js
window.addEventListener("message", function(event) {
  if (event.origin != 'http://javascript.info') {
    // algo de un dominio desconocido, ignorémoslo
    return;
  }

  alert( "Recibí: " + event.data );

  // puedes enviar un mensaje usando event.source.postMessage(...)
});
```

El ejemplo completo:

[codetabs src="postmessage" height=120]

## Resumen

Para llamar a métodos y acceder al contenido de otra ventana, primero debemos tener una referencia a ella.

Para las ventanas emergentes tenemos estas referencias:
- Desde la ventana de apertura: `window.open` -- abre una nueva ventana y devuelve una referencia a ella,
- Desde la ventana emergente: `window.opener` -- es una referencia a la ventana de apertura desde una ventana emergente.

Para iframes, podemos acceder a las ventanas padres o hijas usando:
- `window.frames` -- una colección de objetos de ventana anidados,
- `window.parent`, `window.top` son las referencias a las ventanas principales y superiores,
- `iframe.contentWindow` es la ventana dentro de una etiqueta `<iframe>`.

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

    Deberíamos usar `addEventListener` para configurar el controlador para este evento dentro de la ventana de destino.
