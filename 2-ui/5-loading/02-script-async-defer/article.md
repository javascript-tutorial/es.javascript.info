
# Scripts: async, defer

En los sitios web modernos los scripts suelen ser más "pesados" que el HTML, el tamaño de la descarga es grande y el tiempo de procesamiento es mayor.

Cuando el navegador carga el HTML y se encuentra con una etiqueta `<script>...</script>`, no puede continuar construyendo el DOM ya que ahora debe ejecutar el script. Lo mismo sucede con los scripts externos `<script src="..."></script>`, el navegador tiene que esperar hasta que el script sea descargado para poder ejecutarlo y solo después procesa el resto de la página.   

Esto nos lleva a dos importantes problemas:

1. Los scripts no pueden ver los elementos del DOM que se encuentran debajo de él por lo que no pueden agregar controladores de eventos, etc.
2. Si hay un script muy pesado en la parte superior de la página, este "bloquea la página". Los usuarios no pueden ver el contenido de la página hasta que sea descargado y ejecutado.

```html run height=100
<p>...contenido previo al script...</p>

<script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Esto no es visible hasta que el script sea cargado -->
<p>...contenido posterior al script...</p>
```

Hay algunas soluciones para eso. Por ejemplo podemos poner el script en la parte inferior de la página por lo que podrá ver los elementos sobre él y no bloqueará la visualización del contenido de la página.

```html
<body>
  ...todo el contenido está arriba del script...

  <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
</body>
```

Pero esta solución está lejos de ser perfecta. Por ejemplo el navegador solo se dará cuenta del script (y podrá empezar a descargarlo) después de descargar todo el documento HTML. Para documentos HTML extensos eso puede ser un retraso notable.

Este tipo de cosas son imperceptibles para las personas que usan conexiones muy rápidas, pero muchas personas en el mundo todavía tienen velocidades de internet lentas y utilizan una conexión de internet móvil que esta lejos de ser perfecta.

Afortunadamente hay dos atributos de `<script>` que resuelven ese problema para nosotros: `defer` y `async`.

## defer

<<<<<<< HEAD
El atributo `defer` indica al navegador que debe seguir trabajando en la página y cargar el script "en segundo plano" para luego ejecutarlo cuando haya cargado.
=======
The `defer` attribute tells the browser not to wait for the script. Instead, the browser will continue to process the HTML, build DOM. The script loads "in the background", and then runs when the DOM is fully built. 
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Aquí está el mismo ejemplo de arriba pero con `defer`:

```html run height=100
<p>...contenido previo script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Inmediatamete visible -->
<p>...contenido posterior al script...</p>
```

<<<<<<< HEAD
- Los scripts con `defer` nunca bloquean la página.
- Los scripts con `defer` siempre se ejecutan cuando el DOM esta listo pero antes del evento `DOMContentLoaded`.

Los siguientes ejemplos demuestran eso:
=======
In other words:

- Scripts with `defer` never block the page.
- Scripts with `defer` always execute when the DOM is ready (but before `DOMContentLoaded` event).

The following example demonstrates the second part:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```html run height=100
<p>...contenido previo a los scripts...</p>

<script>
<<<<<<< HEAD
  document.addEventListener('DOMContentLoaded', () => alert("¡DOM listo después del defer!")); // (2)
=======
  document.addEventListener('DOMContentLoaded', () => alert("DOM ready after defer!"));
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...contenido posterior a los scripts...</p>
```

<<<<<<< HEAD
1. El contenido de la página se muestra inmediatamente.
2. El `DOMContentLoaded` espera por el script diferido y solo lo se dispara cuando el script `(2)` es descargado y ejecutado.

Los scripts diferidos mantienen su orden tal y cual los scripts regulares.

Entonces si tenemos un script grande primero y luego otro pequeño, el último espera.
=======
1. The page content shows up immediately.
2. `DOMContentLoaded` event handler waits for the deferred script. It only triggers when the script is downloaded and executed.

**Deferred scripts keep their relative order, just like regular scripts.**

Let's say, we have two deferred scripts: the `long.js` and then `small.js`:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

<<<<<<< HEAD
```smart header="El script pequeño se descarga primero y se ejecuta segundo"
Los navegadores analizan la página en busca de scripts y los descarga en paralelo para mejorar el rendimiento. Entonces en el ejemplo superior ambos scripts se descargan en paralelo, el `small.js` probablemente lo haga primero.

Pero la especificación requiere que los scripts sean ejecutados en el orden en el que están en el documento, entonces espera por `long.js` para ejecutarlo.
```
=======
Browsers scan the page for scripts and download them in parallel, to improve performance. So in the example above both scripts download in parallel. The `small.js` probably finishes first.

...But the `defer` atribute, besides telling the browser "not to block", ensures that the relative order is kept. So even though `small.js` loads first, it still waits and runs after `long.js` executes.

That may be important for cases when we need to load a JavaScript library and then a script that depends on it.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```smart header="El atributo `defer` es solo para scripts externos"
El atributo `defer` es ignorado si el `<script>` no tiene el atributo `src`.
```

## async

<<<<<<< HEAD
El atributo `async` significa que el script es completamente independiente:

- La página no espera a los scripts asincrónicos por lo que el contenido de la página se procesa y se muestra.
- El evento `DOMContentLoaded` y los scripts asincrónicos no se esperan entre sí:
    - El evento `DOMContentLoaded` puede suceder antes que un script asincrónico (si un script asincrónico termina de cargar una vez la página está completa)
    - o después de un script asincrónico (si tal script asincrónico es pequeño o está en cache)
- Otros scripts no esperan a los scripts asincrónicos y los scripts asincrónicos no esperan por ellos.
=======
The `async` attribute is somewhat like `defer`. It also makes the script non-blocking. But it has important differences in the behavior.

The `async` attribute means that a script is completely independent:

- The browser doesn't block on `async` scripts (like `defer`). 
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them. 
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

In other words, `async` scripts load in the background and run when ready. The DOM and other scripts don't wait for them, and they don't wait for anything. A fully independent script that runs when loaded. As simple, at it can get, right? 

<<<<<<< HEAD
Entonces si tenemos muchos scripts asincrónicos estos pueden ser ejecutados en cualquier orden, cualquiera que cargue primero se ejecutará primero.
=======
Here's an example similar to what we've seen with `defer`: two scripts `long.js` and `small.js`, but now with `async` instead of `defer`.

They don't wait for each other. Whatever loads first (probably `small.js`) -- runs first:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```html run height=100
<p>...contenido previo a los scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("¡DOM listo!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...contenido posterior a los scripts...</p>
```

<<<<<<< HEAD
1. El contenido de la página se muestra inmediatamente: `async` no lo bloquea.
2. El evento `DOMContentLoaded` puede suceder antes o después de `async`, no hay garantías aquí.
3. Los scripts asincrónicos no esperan por el otro. Un script pequeño `small.js` va segundo pero probablemente cargue antes que `long.js` entonces se ejecutará primero. A eso lo llamamos "load-first order".
=======
- The page content shows up immediately: `async` doesn't block it.
- `DOMContentLoaded` may happen both before and after `async`, no guarantees here.
- A smaller script `small.js` goes second, but probably loads before `long.js`, so `small.js` runs first. Although, it might be that `long.js` loads first, if cached, then it runs first. In other words, async scripts run in the "load-first" order.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Los scripts asincrónicos son excelentes cuando incluimos scripts de terceros (contadores, anuncios, etc) en la página debido a que ellos no dependen de nuestros scripts y nuestros scripts no deberían esperar por ellos.

```html
<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

<<<<<<< HEAD

## Scripts dinámicos

También podemos agregar un script dinámicamente usando JavaScript:
=======
## Dynamic scripts
 
There's one more important way of adding a script to the page.

We can create a script and append it to the document dynamically using JavaScript:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";
document.body.append(script); // (*)
```

El script comienza a cargar tan pronto como es agregado al documento `(*)`.

**Los scripts dinámicos se comportan como `async` por defecto**

Esto es:
- Ellos no esperan a nadie y nadie espera por ellos.
- El script que carga primero se ejecuta primero (`load-first order`)

This can be changed if we explicitly set `script.async=true`. Then scripts will be executed in the document order, just like `defer`.

<<<<<<< HEAD
```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";

*!*
script.async = false;
*/!*

document.body.append(script);
```

Por ejemplo, aquí agregamos dos scripts sin el `script.async=false` por lo que deberían ejecutarse en `load-first order` (el `small.js` probablemente primero). Pero con esa bandera el orden es `document order`.
=======
In this example, `loadScript(src)` function adds a script and also sets `async` to `false`.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

So `long.js` always runs first (as it's added first):

```js run
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

// long.js se ejecuta primero a causa del async=false
loadScript("/article/script-async-defer/long.js");
loadScript("/article/script-async-defer/small.js");
```

Without `script.async=false`, scripts would execute in default, load-first order (the `small.js` probably first).

Again, as with the `defer`, the order matters if we'd like to load a library and then another script that depends on it.


## Resumen

Ambos, `async` y `defer`, tienen algo en común: la descarga de tales scripts no bloquean el renderizado de la página. Por lo cual el usuario puede leer el contenido de la página y familiarizarse con la página inmediatamente.

Pero hay algunas diferencias esenciales entre ellos:

|         | Orden | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. El orden del documento no importa. ¿cual script carga primero? | Tal vez cargue y ejecute mientras el documento no ha sido completamente descargado, eso puede pasar si el script es pequeño o está en cache y el documento es suficientemente extenso. |
| `defer` | *Document order* (como va en el documento). |  Ejecuta después de que el documento es cargado y analizado (espera si es necesario) |

<<<<<<< HEAD
```warn header="La página sin scripts debe ser utilizable"
Por favor ten en cuenta que si estas usando `defer` la página es visible antes de que el script sea cargado.

Por lo que el usuario tal vez pueda leer la página, pero algunos componentes gráficos probablemente no estén listos.

Debería haber algunas señales de "cargando" en lugares apropiados y los botones deshabilitados deberían ser mostrados como tal para que el usuario pueda ver claramente qué está listo y qué no.
```

En la práctica, `defer` es usado para scripts que necesitan todo el DOM y/o el orden de ejecución es importante. Y `async` es usado para scripts independientes como contadores y anuncios donde el orden de ejecución no importa.
=======
In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important. 

And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.

```warn header="Page without scripts should be usable"
Please note: if you're using `defer` or `async`, then user will see the the page *before* the script loads.

In such case, some graphical components are probably not initialized yet.

Don't forget to put "loading" indication and disable buttons that aren't functional yet. Let the user clearly see what he can do on the page, and what's still getting ready.
```
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
