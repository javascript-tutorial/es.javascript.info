
# Scripts: async, defer

En los sitios web modernos los scripts suelen ser más "pesados" que el HTML, el tamaño de la descarga es grande y el tiempo de procesamiento es mayor.

<<<<<<< HEAD
Cuando el navegador carga el HTML y se encuentra con una etiqueta `<script>...</script>`, no puede continuar construyendo el DOM ya que ahora debe ejecutar el script. Lo mismo sucede con los scripts externos `<script src="..."></script>`, el navegador tiene que esperar hasta que el script sea descargado para poder ejecutarlo y solo después procesa el resto de la página.   
=======
When the browser loads HTML and comes across a `<script>...</script>` tag, it can't continue building the DOM. It must execute the script right now. The same happens for external scripts `<script src="..."></script>`: the browser must wait until the script downloads, execute it, and only after process the rest of the page.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

Esto nos lleva a dos importantes problemas:

<<<<<<< HEAD
1. Los scripts no pueden ver los elementos del DOM que se encuentran debajo de él por lo que no pueden agregar controladores de eventos, etc.
2. Si hay un script muy pesado en la parte superior de la página, este "bloquea la página". Los usuarios no pueden ver el contenido de la página hasta que sea descargado y ejecutado.
=======
1. Scripts can't see DOM elements below them, so they can't add handlers etc.
2. If there's a bulky script at the top of the page, it "blocks the page". Users can't see the page content till it downloads and runs:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

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

<<<<<<< HEAD
Pero esta solución está lejos de ser perfecta. Por ejemplo el navegador solo se dará cuenta del script (y podrá empezar a descargarlo) después de descargar todo el documento HTML. Para documentos HTML extensos eso puede ser un retraso notable.

Este tipo de cosas son imperceptibles para las personas que usan conexiones muy rápidas, pero muchas personas en el mundo todavía tienen velocidades de internet lentas y utilizan una conexión de internet móvil que esta lejos de ser perfecta.

Afortunadamente hay dos atributos de `<script>` que resuelven ese problema para nosotros: `defer` y `async`.
=======
But this solution is far from perfect. For example, the browser notices the script (and can start downloading it) only after it downloaded the full HTML document. For long HTML documents, that may be a noticeable delay.

Such things are invisible for people using very fast connections, but many people in the world still have slow internet speeds and use a far-from-perfect mobile internet connection.

Luckily, there are two `<script>` attributes that solve the problem for us: `defer` and `async`.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

## defer

El atributo `defer` indica al navegador que debe seguir trabajando en la página y cargar el script "en segundo plano" para luego ejecutarlo cuando haya cargado.

Aquí está el mismo ejemplo de arriba pero con `defer`:

```html run height=100
<p>...contenido previo script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Inmediatamete visible -->
<p>...contenido posterior al script...</p>
```

- Los scripts con `defer` nunca bloquean la página.
- Los scripts con `defer` siempre se ejecutan cuando el DOM esta listo pero antes del evento `DOMContentLoaded`.

Los siguientes ejemplos demuestran eso:

```html run height=100
<p>...contenido previo a los scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("¡DOM listo después del defer!")); // (2)
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...contenido posterior a los scripts...</p>
```

<<<<<<< HEAD
1. El contenido de la página se muestra inmediatamente.
2. El `DOMContentLoaded` espera por el script diferido y solo lo se dispara cuando el script `(2)` es descargado y ejecutado.
=======
1. The page content shows up immediately.
2. `DOMContentLoaded` waits for the deferred script. It only triggers when the script `(2)` is downloaded and executed.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

Los scripts diferidos mantienen su orden tal y cual los scripts regulares.

Entonces si tenemos un script grande primero y luego otro pequeño, el último espera.

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

```smart header="El script pequeño se descarga primero y se ejecuta segundo"
Los navegadores analizan la página en busca de scripts y los descarga en paralelo para mejorar el rendimiento. Entonces en el ejemplo superior ambos scripts se descargan en paralelo, el `small.js` probablemente lo haga primero.

<<<<<<< HEAD
Pero la especificación requiere que los scripts sean ejecutados en el orden en el que están en el documento, entonces espera por `long.js` para ejecutarlo.
```

```smart header="El atributo `defer` es solo para scripts externos"
El atributo `defer` es ignorado si el `<script>` no tiene el atributo `src`.
=======
But the specification requires scripts to execute in the document order, so it waits for `long.js` to execute.
```

```smart header="The `defer` attribute is only for external scripts"
The `defer` attribute is ignored if the `<script>` tag has no `src`.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
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
The `async` attribute means that a script is completely independent:

- The page doesn't wait for async scripts, the contents are processed and displayed.
- `DOMContentLoaded` and async scripts don't wait for each other:
    - `DOMContentLoaded` may happen both before an async script (if an async script finishes loading after the page is complete)
    - ...or after an async script (if an async script is short or was in HTTP-cache)
- Other scripts don't wait for `async` scripts, and `async` scripts don't wait for them.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1


Entonces si tenemos muchos scripts asincrónicos estos pueden ser ejecutados en cualquier orden, cualquiera que cargue primero se ejecutará primero.

```html run height=100
<p>...contenido previo a los scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("¡DOM listo!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...contenido posterior a los scripts...</p>
```

1. El contenido de la página se muestra inmediatamente: `async` no lo bloquea.
2. El evento `DOMContentLoaded` puede suceder antes o después de `async`, no hay garantías aquí.
3. Los scripts asincrónicos no esperan por el otro. Un script pequeño `small.js` va segundo pero probablemente cargue antes que `long.js` entonces se ejecutará primero. A eso lo llamamos "load-first order".

<<<<<<< HEAD
Los scripts asincrónicos son excelentes cuando incluimos scripts de terceros (contadores, anuncios, etc) en la página debido a que ellos no dependen de nuestros scripts y nuestros scripts no deberían esperar por ellos.
=======
Async scripts are great when we integrate an independent third-party script into the page: counters, ads and so on, as they don't depend on our scripts, and our scripts shouldn't wait for them:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```html
<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>
```


## Scripts dinámicos

<<<<<<< HEAD
También podemos agregar un script dinámicamente usando JavaScript:
=======
We can also add a script dynamically using JavaScript:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

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


```js run
let script = document.createElement('script');
script.src = "/article/script-async-defer/long.js";

*!*
script.async = false;
*/!*

document.body.append(script);
```

Por ejemplo, aquí agregamos dos scripts sin el `script.async=false` por lo que deberían ejecutarse en `load-first order` (el `small.js` probablemente primero). Pero con esa bandera el orden es `document order`.


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


## Resumen

<<<<<<< HEAD
Ambos, `async` y `defer`, tienen algo en común: la descarga de tales scripts no bloquean el renderizado de la página. Por lo cual el usuario puede leer el contenido de la página y familiarizarse con la página inmediatamente.
=======
Both `async` and `defer` have one common thing: downloading of such scripts doesn't block page rendering. So the user can read page content and get acquainted with the page immediately.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

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
```warn header="Page without scripts should be usable"
Please note that if you're using `defer`, then the page is visible *before* the script loads.

So the user may read the page, but some graphical components are probably not ready yet.

There should be "loading" indications in the proper places, and disabled buttons should show as such, so the user can clearly see what's ready and what's not.
```

In practice, `defer` is used for scripts that need the whole DOM and/or their relative execution order is important. And  `async` is used for independent scripts, like counters or ads. And their relative execution order does not matter.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
