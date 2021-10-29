
# Scripts: async, defer

En los sitios web modernos los scripts suelen ser más "pesados" que el HTML, el tamaño de la descarga es grande y el tiempo de procesamiento es mayor.

Cuando el navegador carga el HTML y se encuentra con una etiqueta `<script>...</script>`, no puede continuar construyendo el DOM. Debe ejecutar el script en el momento. Lo mismo sucede con los scripts externos `<script src="..."></script>`, el navegador tiene que esperar hasta que el script sea descargado, ejecutarlo y solo después procesa el resto de la página.   

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

El atributo `defer` indica al navegador que no espere por el script. En lugar de ello, debe seguir procesando el HTML, construir el DOM. El script carga "en segundo plano" y se ejecuta cuando el DOM esta completo.

Aquí está el mismo ejemplo de arriba pero con `defer`:

```html run height=100
<p>...contenido previo script...</p>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<!-- Inmediatamete visible -->
<p>...contenido posterior al script...</p>
```

En otras palabras:

- Los scripts con `defer` nunca bloquean la página.
- Los scripts con `defer` siempre se ejecutan cuando el DOM esta listo (pero antes del evento `DOMContentLoaded`).

Los siguientes ejemplos demuestran la segunda parte:

```html run height=100
<p>...contenido previo a los scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("¡DOM listo después del defer!"));
</script>

<script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

<p>...contenido posterior a los scripts...</p>
```

1. El contenido de la página se muestra inmediatamente.
2. `DOMContentLoaded` espera por el script diferido. Solo se dispara cuando el script es descargado y ejecutado.

**Los scripts diferidos mantienen su orden relativo, tal cual los scripts regulares.

Digamos que tenemos dos scripts diferidos, `long.js` (largo) y luego `small.js` (corto):

```html
<script defer src="https://javascript.info/article/script-async-defer/long.js"></script>
<script defer src="https://javascript.info/article/script-async-defer/small.js"></script>
```

Los navegadores analizan la página en busca de scripts y los descarga en paralelo para mejorar el rendimiento. Entonces en el ejemplo superior ambos scripts se descargan en paralelo, el `small.js` probablemente lo haga primero.

...Pero el atributo `defer`, además de decirle al navegador "no bloquear", asegura que el orden relativo se mantenga. Entonces incluso si `small.js` se carga primero, aún espera y se ejecuta después de `long.js`.

Por ello es importante para casos donde necesitamos cargar un librería JavaScript y entonces un script que depende de ella.

```smart header="El atributo `defer` es solo para scripts externos"
El atributo `defer` es ignorado si el `<script>` no tiene el atributo `src`.
```

## async

El atributo `async` es de alguna manera como `defer`. También hace el script no bloqueante. Pero tiene importantes diferencias de comportamiento.

El atributo `async` significa que el script es completamente independiente:

- El navegador no se bloquea con scripts `async` (como `defer`).
- Otros scripts no esperan por scripts `async`, y scripts `async` no espera por ellos.
- `DOMContentLoaded` y los scripts asincrónicos no se esperan entre sí:
    - `DOMContentLoaded` puede suceder antes que un script asincrónico (si un script asincrónico termina de cargar una vez la página está completa)
    - ...o después de un script asincrónico (si tal script asincrónico es pequeño o está en cache)

En otras palabras, los scripts `async` cargan en segundo plano y se ejecutan cuando están listos. El DOM y otros scripts no esperan por ellos, y ellos no esperan por nada. Un script totalmente independiente que se ejecuta en cuanto se ha cargado. Tan simple como es posible, ¿cierto? 

Aquí hay un ejemplo similar al que vimos con `defer`: Dos scripts `long.js` y `small.js`, pero ahora con `async` en lugar de `defer`.

Los unos no esperan por lo otros. El que cargue primero (probablemente `small.js`), se ejecuta primero.

```html run height=100
<p>...contenido previo a los scripts...</p>

<script>
  document.addEventListener('DOMContentLoaded', () => alert("¡DOM listo!"));
</script>

<script async src="https://javascript.info/article/script-async-defer/long.js"></script>
<script async src="https://javascript.info/article/script-async-defer/small.js"></script>

<p>...contenido posterior a los scripts...</p>
```

- El contenido de la página se muestra inmediatamente: `async` no lo bloquea.
- El evento `DOMContentLoaded` puede suceder antes o después de `async`, no hay garantías aquí.
- Un script más pequeño `small.js` que esté segundo probablemente cargue antes que uno más largo `long.js`, entonces se ejecutará primero. Aunque podría ser que `long.js` cargue primero si está en caché y ejecute primero. A eso lo llamamos "load-first order", se ejecuta primero el que cargue antes .

Los scripts asincrónicos son excelentes cuando incluimos scripts de terceros (contadores, anuncios, etc) en la página debido a que ellos no dependen de nuestros scripts y nuestros scripts no deberían esperar por ellos.

```html
<!-- Google Analytics is usually added like this -->
<script async src="https://google-analytics.com/analytics.js"></script>
```

```smart header="El atributo `async` es solo para scripts externos"
Tal como `defer`, el atributo `async` se ignora si la etiqueta `<script>` no tiene `src`.
```

## Scripts dinámicos

Hay otra manera importante de agregar un script a la página.

Podemos crear un script y agregarlo dinámicamente al documento usando JavaScript:

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

Esto puede ser cambiado si explícitamente establecemos `script.async=false`. Así los scripts serán ejecutados en el orden del documento, tal como en `defer`.

En este ejemplo, la función `loadScript(src)` añade un script y también establece `async` a `false`.

Entonces `long.js` siempre ejecuta primero (por haber sido agregado primero):

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

Sin `script.async=false`, los scripts es ejecutarían de forma predeterminada, en el orden de carga primero (probablemente `small.js` primero).

De nuevo, como con `defer`, el orden importa si queremos cargar una librería y luego otro script que depende de ella.


## Resumen

Ambos, `async` y `defer`, tienen algo en común: la descarga de tales scripts no bloquean el renderizado de la página. Por lo cual el usuario puede leer el contenido de la página y familiarizarse con la página inmediatamente.

Pero hay algunas diferencias esenciales entre ellos:

|         | Orden | `DOMContentLoaded` |
|---------|---------|---------|
| `async` | *Load-first order*. El orden del documento no importa. El que carga primero ejecuta primero | Irrelevante. Puede cargar y ejecutarse mientras el documento no ha sido completamente descargado, eso puede pasar si el script es pequeño o está en cache y el documento es suficientemente extenso. |
| `defer` | *Document order* (como van en el documento). |  Ejecutan después de que el documento es cargado y analizado (espera si es necesario), justo antes de `DOMContentLoaded`. |

En la práctica, `defer` es usado para scripts que necesitan todo el DOM y/o si su orden de ejecución relativa es importante. 

Y `async` es usado para scripts independientes, como contadores y anuncios donde el orden de ejecución no importa.

```warn header="La página sin scripts debe ser utilizable"
Ten en cuenta: si usas `defer` o `async`, el usuario verá la página *antes* de que el script sea cargado.

En tal caso algunos componentes gráficos probablemente no estén listos.

No olvides poner alguna señal de "cargando" y deshabilitar los botones que aún no estén funcionando. Esto permite al usuario ver claramente qué puede hacer en la página y qué está listo y qué no.
```
