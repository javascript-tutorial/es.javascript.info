# Ventanas emergentes y métodos de ventana

Una ventana emergente (popup window) es uno de los métodos más antiguos para mostrar documentos adicionales al usuario.

Básicamente, solo ejecutas :
```js
window.open("https://javascript.info/");
```

<<<<<<< HEAD
...Y eso abrirá una nueva ventana con una URL. La mayoría de los navegadores modernos están configurados para abrir pestañas nuevas en vez de ventanas separadas.

Los popups existen desde tiempos realmente antiguos. La idea inicial fue mostrar otro contenido sin cerrar la ventana principal. Ahora hay otras formas de hacerlo: podemos cargar contenido dinámicamente con [fetch](info:fetch) y mostrarlo de forma dinámica con `<div>`. Entonces, los popups no son algo que usamos todos los días.

Además, los popups son complicados en dispositivos móviles, que no muestran varias ventanas simultáneamente.

Aún así, hay tareas donde los popups todavía son usados, por ejemplo para autorización o autenticación (Ingreso con Google/Facebook/...), porque:
=======
...And it will open a new window with given URL. Most modern browsers are configured to open new tabs instead of separate windows.

Popups exist from really ancient times. The initial idea was to show another content without closing the main window. As of now, there are other ways to do that: we can load content dynamically with [fetch](info:fetch) and show it in a dynamically generated `<div>`. So, popups is not something we use everyday.

Also, popups are tricky on mobile devices, that don't show multiple windows simultaneously.

Still, there are tasks where popups are still used, e.g. for OAuth authorization (login with Google/Facebook/...), because:

1. A popup is a separate window with its own independent JavaScript environment. So opening a popup from a third-party non-trusted site is safe.
2. It's very easy to open a popup.
3. A popup can navigate (change URL) and send messages to the opener window.

## Popup blocking

In the past, evil sites abused popups a lot. A bad page could open tons of popup windows with ads. So now most browsers try to block popups and protect the user.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

1. Un popup es una ventana separada con su propio entorno JavaScript independiente. Por lo tanto es seguro abrir un popup desde un sitio de terceros no confiable.
2. Es muy fácil abrir un popup.
3. Un popup puede navegar (cambiar URL) y enviar mensajes a la ventana que lo abrió.

## Bloqueo de ventanas emergentes (Popup)

En el pasado, sitios malvados abusaron mucho de las ventanas emergentes. Una página incorrecta podría abrir toneladas de ventanas emergentes con anuncios. Entonces, la mayoría de los navegadores intentan bloquear las ventanas emergentes y proteger al usuario.

**La mayoría de los navegadores bloquean las ventanas emergentes si se llaman fuera de los controladores de eventos activados por el usuario, como `onclick`.**

Por ejemplo:
```js
// popup blocked
window.open("https://javascript.info");

// popup allowed
button.onclick = () => {
  window.open("https://javascript.info");
};
```

De esta manera, los usuarios están algo protegidos de ventanas emergentes no deseadas, pero la funcionalidad no está totalmente deshabilitada.

¿Qué pasa si la ventana emergente se abre desde `onclick`, pero después de `setTimeout`? Eso es un poco complicado.

Intenta este código:

```js run
// open after 3 seconds
setTimeout(() => window.open("http://google.com"), 3000);
```

Las ventanas emergentes se abren en Chrome , pero se bloquean en Firefox.

...Si disminuimos el retraso, la ventana emergente también funciona en Firefox:

```js run
// open after 1 seconds
setTimeout(() => window.open("http://google.com"), 1000);
```

<<<<<<< HEAD
La diferencia es que Firefox trata al timeout de 2000ms o menos como aceptable, pero después elimina la "confianza" asumiendo que ahora está "fuera de la acción del usuario". Entonces el primero está bloqueado, y el segundo no lo está.
=======
The difference is that Firefox treats a timeout of 2000ms or less are acceptable, but after it -- removes the "trust", assuming that now it's "outside of the user action". So the first one is blocked, and the second one is not.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## window.open

La sintaxis para abrir una ventana emergente es: `window.open(url, name, params)`:

url
: Una URL para cargar en la nueva ventana.

name
: Un nombre de la nueva ventana. Cada ventana tiene un `window.name`, y aquí podemos especificar cuál ventana usar para la ventana emergente. Si hay una ventana con ese nombre, la URL dada se abre en ella, de lo contrario abre una nueva ventana.

params
<<<<<<< HEAD
: La cadena de configuración para nueva ventana. Contiene configuraciones, delimitado por una coma. No debe haber espacios en los parámetros, por ejemplo: `width:200,height=100`.
=======
: The configuration string for the new window. It contains settings, delimited by a comma. There must be no spaces in params, for instance: `width=200,height=100`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Configuración de `params`:

- Posición:
  - `left/top` (numérico) -- coordenadas de la esquina superior izquierda de la ventana en la pantalla.Hay una limitación: no se puede colocar una nueva ventana fuera de la pantalla.
  - `width/height` (numérico) -- ancho y alto de una nueva ventana. Hay un límite mínimo de ancho / alto , así que es imposible crear una ventana invisible.
- Características de la ventana:
  - `menubar` (yes/no) -- muestra u oculta el menú del navegador en la nueva ventana.
  - `toolbar` (yes/no) -- muestra u oculta la barra de navegación del navegador (atrás, adelante, recargar, etc.) en la nueva ventana.
  - `location` (yes/no) -- muestra u oculta el campo URL en la nueva ventana. FF e IE no permiten ocultarlo por defecto.
  - `status` (yes/no) -- muestra u oculta la barra de estado. De nuevo, la mayoría de los navegadores lo obligan a mostrar.
  - `resizable` (yes/no) -- permite deshabilitar el cambio de tamaño para la nueva ventana. No recomendado.
  - `scrollbars` (yes/no) -- permite deshabilitar las barras de desplazamiento para la nueva ventana. No recomendado.


También hay una serie de características específicas del navegador menos compatibles, que generalmente no se usan. Revisa <a href="https://developer.mozilla.org/es/docs/Web/API/Window/open">window.open en MDN</a> para ejemplos.

## Ejemplo: Minimalizar una ventana

Abramos una ventana con un conjunto mínimo de características solo para ver cuál de ellos permite desactivar el navegador:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;

open("/", "test", params);
```

Aquí la mayoría de las "características de la ventana" están deshabilitadas y la ventana se coloca fuera de la pantalla. Ejecútelo y vea lo que realmente sucede. La mayoría de los navegadores "arreglan" cosas extrañas como cero `ancho/alto` y fuera de pantalla `Izquierda/superior`. Por ejemplo, Chrome abre una ventana con ancho/alto completo, para que ocupe la pantalla completa.

Agreguemos opciones de posicionamiento normal y coordenadas razonables de `ancho`,`altura`, `izquierda`,`arriba`:

```js run
let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=600,height=300,left=100,top=100`;

open("/", "test", params);
```

La mayoría de los navegadores muestran el ejemplo anterior según sea necesario.

Reglas para configuraciones omitidas:

- Si no hay un tercer argumento en la llamada a `open` o está vacío, se usan los parámetros de ventana predeterminados.
- Si hay una cadena de params, pero se omiten algunas características sí / no (`yes/no`), las características omitidas se asumen con valor `no` . Entonces, si especifica parámetros, asegúrese de establecer explícitamente todas las funciones requeridas en `yes`.
- Si no hay `izquierda/arriba` en params, entonces el navegador intenta abrir una nueva ventana cerca de la última ventana abierta.
- Si no hay `ancho/altura`, entonces la nueva ventana tendrá el mismo tamaño que la última abierta.

<<<<<<< HEAD
## Acceder a la ventana emergente desde la ventana

La llamada `open` devuelve una referencia a la nueva ventana. Se puede usar para manipular sus propiedades, cambiar de ubicación y aún más.

En este ejemplo, generamos contenido emergente a partir de JavaScript:

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");
=======
- If there is no 3rd argument in the `open` call, or it is empty, then the default window parameters are used.
- If there is a string of params, but some `yes/no` features are omitted, then the omitted features assumed to have `no` value. So if you specify params, make sure you explicitly set all required features to yes.
- If there is no `left/top` in params, then the browser tries to open a new window near the last opened window.
- If there is no `width/height`, then the new window will be the same size as the last opened.

## Accessing popup from window
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

newWin.document.write("Hello, world!");
```

<<<<<<< HEAD
Y aquí modificamos el contenido después de la carga:
=======
In this example, we generate popup content from JavaScript:

```js
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write("Hello, world!");
```

And here we modify the contents after loading:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
let newWindow = open("/", "example", "width=300,height=300");
newWindow.focus();

alert(newWindow.location.href); // (*) about:blank, loading hasn't started yet

newWindow.onload = function() {
  let html = `<div style="font-size:30px">Welcome!</div>`;
*!*  
  newWindow.document.body.insertAdjacentHTML("afterbegin", html);
*/!*  
};
```

<<<<<<< HEAD
Por favor, tenga en cuenta: inmediatamente después de `window.open` la nueva ventana no está cargada aún. Esto queda demostrado por el `alert` en la linea `(*)`. Así que esperamos a que `onload` lo modifique. También podríamos usar `DOMContentLoaded` de los manejadores de `newWin.document`.

```warn header="Same origin policy"
Las ventanas pueden acceder libremente a los contenidos de las demás sólo si provienen del mismo origen (el mismo protocolo://domain:port).

De lo contrario es imposible por razones de seguridad del usuario, por ejemplo si la ventana principal es de `site.com` y la ventana emergente (popup) es de  `gmail.com`. Para los detalles, ver capitulo <info:cross-window-communication>.
```

## Acceder a la ventana desde el popup

Un popup también puede acceder la ventana que lo abrió usando la referencia `window.opener`. Es `null` para todas las ventanas excepto los popups.

Si ejecutas el código de abajo, reemplaza el contenido de la ventana del opener (actual) con "Test":

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

Así que la conexión entre las ventanas es bidireccional: la ventana principal y el popup tienen una referencia entre sí.
=======
Please note: immediately after `window.open`, the new window isn't loaded yet. That's demonstrated by `alert` in line `(*)`. So we wait for `onload` to modify it. We could also use `DOMContentLoaded` handler for `newWin.document`.

```warn header="Same origin policy"
Windows may freely access content of each other only if they come from the same origin (the same protocol://domain:port).

Otherwise, e.g. if the main window is from `site.com`, and the popup from `gmail.com`, that's impossible for user safety reasons. For the details, see chapter <info:cross-window-communication>.
```

## Accessing window from popup

A popup may access the "opener" window as well using `window.opener` reference. It is `null` for all windows except popups.

If you run the code below, it replaces the opener (current) window content with "Test":

```js run
let newWin = window.open("about:blank", "hello", "width=200,height=200");

newWin.document.write(
  "<script>window.opener.document.body.innerHTML = 'Test'<\/script>"
);
```

So the connection between the windows is bidirectional: the main window and the popup have a reference to each other.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## Cerrar una popup

<<<<<<< HEAD
Para cerrar una ventana: `win.close()`.

Para comprobar si una ventana esta cerrada: `win.closed`.

Técnicamente, el `close()` es un método disponible para cualquier `ventana`, pero `window.close()` es ignorado por la mayoría de los navegadores si `window` no es creada con `window.open()`. Así que solo funcionará en una popup.
=======
To close a window: `win.close()`.

To check if a window is closed: `win.closed`.

Technically, the `close()` method is available for any `window`, but `window.close()` is ignored by most browsers if `window` is not created with `window.open()`. So it'll only work on a popup.

The `closed` property is `true` if the window is closed. That's useful to check if the popup (or the main window) is still open or not. A user can close it anytime, and our code should take that possibility into account.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

El `closed` es una propiedad `true` si la ventana esta cerrada. Eso es usualmente para comprobar la popup (o la ventana principal) está todavía abierta o no. Un usuario puede cerrarla en cualquier momento, y nuestro código debería tener esa posibilidad en cuenta.

Este código se carga y luego cierra la ventana:

```js run
<<<<<<< HEAD
let newWindow = open("/", "example", "width=300,height=300");

newWindow.onload = function () {
=======
let newWindow = open('/', 'example', 'width=300,height=300');

newWindow.onload = function() {
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  newWindow.close();
  alert(newWindow.closed); // true
};
```


<<<<<<< HEAD
## desplazamiento y cambio de tamaño

Hay métodos para mover/redimensionar una ventana:

`win.moveBy(x,y)`
: Mueve la ventana en relación con la posición actual `x` píxeles a la derecha y `y` pixeles hacia abajo. Valores negativos están permitidos(para mover a la izquierda/arriba).

`win.moveTo(x,y)`
: Mover la ventana por coordenadas `(x,y)` en la pantalla.

`win.resizeBy(width,height)`
: Cambiar el tamaño de la ventana según el `width/height` dado en relación con el tamaño actual. Se permiten valores negativos.

`win.resizeTo(width,height)`
: Redimensionar la ventana al tamaño dado.

También existe el evento `window.onresize`.

```warn header="Solo Popup"
Para evitar abusos, el navegador suele bloquear estos métodos. Solo funcionan de manera confiable en las ventanas emergentes que abrimos, que no tienen pestañas adicionales.
```

```warn header="No minification/maximization"
JavaScript no tiene forma de minimizar o maximizar una ventana. Estas funciones de nivel de sistema operativo están ocultas para los desarrolladores de frontend.

Los métodos de movimiento / cambio de tamaño no funcionan para ventanas maximizadas / minimizadas.
```

## desplazando una ventana

Ya hemos hablado sobre el desplazamiento de una ventana en el capítulo <info:size-and-scroll-window>.

`win.scrollBy(x,y)`
: Desplaza la ventana `x` píxeles a la derecha y `y` hacia abajo en relación con el actual desplazamiento. Se permiten valores negativos.

`win.scrollTo(x,y)`
: Desplaza la ventana a las coordenadas dadas `(x,y)`.

`elem.scrollIntoView(top = true)`
: Desplaza la ventana para hacer que `elem` aparezca en la parte superior (la predeterminada) o en la parte inferior para `elem.scrollIntoView(false)`.

También existe el evento `window.onscroll`.

## Enfocar/desenfocar una ventana

Teóricamente, están los métodos `window.focus()` y `window.blur()` para poner/sacar el foco de una ventana. Y los eventos `focus/blur` que permiten captar el momento en el que el visitante enfoca una ventana y en el que cambia a otro lugar.

En el pasado las páginas malignas abusaron de ellos. 

Por ejemplo, mira este código:
=======
## Scrolling and resizing

There are methods to move/resize a window:

`win.moveBy(x,y)`
: Move the window relative to current position `x` pixels to the right and `y` pixels down. Negative values are allowed (to move left/up).

`win.moveTo(x,y)`
: Move the window to coordinates `(x,y)` on the screen.

`win.resizeBy(width,height)`
: Resize the window by given `width/height` relative to the current size. Negative values are allowed.

`win.resizeTo(width,height)`
: Resize the window to the given size.

There's also `window.onresize` event.

```warn header="Only popups"
To prevent abuse, the browser usually blocks these methods. They only work reliably on popups that we opened, that have no additional tabs.
```

```warn header="No minification/maximization"
JavaScript has no way to minify or maximize a window. These OS-level functions are hidden from Frontend-developers.

Move/resize methods do not work for maximized/minimized windows.
```

## Scrolling a window

We already talked about scrolling a window in the chapter <info:size-and-scroll-window>.

`win.scrollBy(x,y)`
: Scroll the window `x` pixels right and `y` down relative the current scroll. Negative values are allowed.

`win.scrollTo(x,y)`
: Scroll the window to the given coordinates `(x,y)`.

`elem.scrollIntoView(top = true)`
: Scroll the window to make `elem` show up at the top (the default) or at the bottom for `elem.scrollIntoView(false)`.

There's also `window.onscroll` event.

## Focus/blur on a window

Theoretically, there are `window.focus()` and `window.blur()` methods to focus/unfocus on a window. And there are also `focus/blur` events that allow to catch the moment when the visitor focuses on a window and switches elsewhere.

Although, in practice they are severely limited, because in the past evil pages abused them. 

For instance, look at this code:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
window.onblur = () => window.focus();
```

<<<<<<< HEAD
Cuando un usuario intenta salir de la ventana (`window.onblur`), lo vuelve a enfocar. La intención es "bloquear" al usuario dentro de la `window`.

Entonces, hay limitaciones que prohíben el código así. Existen muchas limitaciones para proteger al usuario de anuncios y páginas malignas. Ellos dependen del navegador.

Por ejemplo, un navegador móvil generalmente ignora esa llamada por completo. Además, el enfoque no funciona cuando se abre una ventana emergente en una pestaña separada en lugar de en una nueva ventana.

Aún así hay algunas cosas que se pueden hacer.

Por ejemplo:

- Cuando abrimos una popup, puede ser una buena idea ejecutar un `newWindow.focus()` en eso. Por si acaso, para algunas combinaciones de sistema operativo / navegador, asegura que el usuario esté en la nueva ventana ahora.
- Si queremos rastrear cuándo un visitante realmente usa nuestra aplicación web, Nosotros podemos rastrear `window.onfocus/onblur`. Eso nos permite suspender / reanudar las actividades en la página, animaciones etc. Pero tenga en cuenta que el evento `blur` significa que el visitante salió de la ventana, pero aún pueden observarlo. La ventana está al fondo, pero aún puede ser visible.

## Resumen
=======
When a user attempts to switch out of the window (`window.onblur`), it brings the window back into focus. The intention is to "lock" the user within the `window`.

So browsers had to introduce many limitations to forbid the code like that and protect the user from ads and evils pages. They depend on the browser.

For instance, a mobile browser usually ignores `window.focus()` completely. Also focusing doesn't work when a popup opens in a separate tab rather than a new window.

Still, there are some use cases when such calls do work and can be useful.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Las ventanas emergentes se utilizan con poca frecuencia, ya que existen alternativas: cargar y mostrar información en la página o en iframe.

Si vamos a abrir una ventana emergente, una buena práctica es informar al usuario al respecto. Un icono de "ventana que se abre" cerca de un enlace o botón permitiría al visitante sobrevivir al cambio de enfoque y tener en cuenta ambas ventanas.

- Se puede abrir una ventana emergente con la llamada `open (url, name, params)`. Devuelve la referencia a la ventana recién abierta.
- Los navegadores bloquean las llamadas `open` desde el código fuera de las acciones del usuario. Por lo general aparece una notificación para que un usuario pueda permitirlos.
- Los navegadores abren una nueva pestaña de forma predeterminada, pero si se proporcionan tamaños, será una ventana emergente.
- La ventana emergente puede acceder a la ventana que la abre usando la propiedad `window.opener`.
- La ventana principal y la ventana emergente pueden leerse y modificarse libremente entre sí si tienen el mismo origen. De lo contrario, pueden cambiar de ubicación e [intercambiar mensajes](info:cross-window-communication).

<<<<<<< HEAD
Para cerrar la ventana emergente: use `close ()`. Además, el usuario puede cerrarlas (como cualquier otra ventana). El `window.closed` es`true` después de eso.

- Los métodos `focus ()` y `blur ()` permiten enfocar / desenfocar una ventana. Pero no funcionan todo el tiempo.
- Los eventos `focus` y`blur` permiten rastrear el cambio dentro y fuera de la ventana. Pero tenga en cuenta que una ventana puede seguir siendo visible incluso en el estado de fondo, después de "desenfoque".
=======
Popup windows are used rarely, as there are alternatives: loading and displaying information in-page, or in iframe.

If we're going to open a popup, a good practice is to inform the user about it. An "opening window" icon near a link or button would allow the visitor to survive the focus shift and keep both windows in mind.

- A popup can be opened by the `open(url, name, params)` call. It returns the reference to the newly opened window.
- Browsers block `open` calls from the code outside of user actions. Usually a notification appears, so that a user may allow them.
- Browsers open a new tab by default, but if sizes are provided, then it'll be a popup window.
- The popup may access the opener window using the `window.opener` property.
- The main window and the popup can freely read and modify each other if they have the same origin. Otherwise, they can change location of each other and [exchange messages](info:cross-window-communication).

To close the popup: use `close()` call. Also the user may close them (just like any other windows). The `window.closed` is `true` after that.

- Methods `focus()` and `blur()` allow to focus/unfocus a window. But they don't work all the time.
- Events `focus` and `blur` allow to track switching in and out of the window. But please note that a  window may still be visible even in the background state, after `blur`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
