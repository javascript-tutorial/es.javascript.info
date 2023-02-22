# Debugging en el navegador

Antes de escribir código más complejo, hablemos de debugging.

[Debugging o Depuración en español](https://es.wikipedia.org/wiki/Depuraci%C3%B3n_de_programas#:~:text=La%20depuraci%C3%B3n%20de%20programas%20es%20el%20proceso%20de,se%20conoce%20informalmente%20a%20los%20errores%20de%20programaci%C3%B3n.) es el proceso de encontrar y corregir errores dentro de un script. Todos los navegadores modernos y la mayoría de los demás entornos admiten herramientas de depuración: una interfaz de usuario especial en las herramientas de desarrollo que facilita mucho la depuración. También permite rastrear el código paso a paso para ver qué está pasando exactamente.

Usaremos Google Chrome Canary aquí en este tutorial, porque tiene suficientes funciones incluso en español; y la mayoría de los otros navegadores tienen un proceso similar.

## El panel Fuentes

Tu versión de Chrome puede verse un poco diferente, pero aún así debería ser obvio lo que hay allí.

- Abre esta [pagina de ejemplo](debugging/index.html).
- Activa las herramientas de desarrollo con `Tecla:F12` (Mac: `Tecla:Cmd+Opt+I`).
- Selecciona el panel `Sources/Fuentes`.

Esto es lo que debería ver si lo está haciendo por primera vez:

![](chrome-open-sources.svg)

El botón de alternancia <span class="devtools" style="background-position:-172px -98px"></span> abre la pestaña con los archivos.

Hagamos clic en él y seleccionemos `hello.js` en la vista de árbol. Esto es lo que debería aparecer:

![](chrome-tabs.svg)

El panel Fuentes tiene 3 partes:

1. La sección **Navegador de archivos** enumera HTML, JavaScript, CSS y otros archivos, incluidas las imágenes que se adjuntan a la página. Las extensiones de Chrome también pueden aparecer aquí.
2. La sección **Editor de código** muestra el código fuente.
3. La  sección **Depuración de JavaScript** es para la depuración, lo exploraremos pronto.

Ahora puede hacer clic en el mismo conmutador <span class="devtools" style="background-position:-172px -122px"></span> nuevamente para ocultar la lista de recursos y darle algo de espacio al código.

## Consola

Si presionamos `la tecla:Esc`, se abre una consola debajo. Podemos escribir comandos allí y presionar `la tecla:Enter` para ejecutar.

Después de ejecutar una declaración, su resultado se muestra a continuación.

Por ejemplo, aquí `1+2` da como resultado `3`, mientras que la llamada a la función `hello("debugger")` no devuelve nada, por lo que el resultado es `indefinido`:

![](chrome-sources-console.svg)

## Puntos de interrupción

Examinemos lo que sucede dentro del código de la [página de ejemplo](debugging/index.html). En `hello.js`, haga clic en el número de línea `4`. Sí, justo en el dígito '4', no en el código.

¡Felicidades! Has establecido un punto de interrupción. Haz clic también en el número de la línea `8`.

Debería verse así (el azul es en donde debes hacer clic):

![](chrome-sources-breakpoint.svg)

Un *punto de interrupción* es un punto de código donde el depurador pausará automáticamente la ejecución de JavaScript.

Mientras el código está en pausa, podemos examinar las variables actuales, ejecutar comandos en la consola, etc. En otras palabras, podemos depurarlo.

Siempre podemos encontrar una lista de puntos de interrupción en el panel derecho. Eso es útil cuando tenemos muchos puntos de interrupción en varios archivos. Ya que nos permite:
- Saltar rápidamente al punto de interrupción en el código (haciendo clic en él dentro del panel).
- Deshabilitar temporalmente el punto de interrupción desmarcándolo.
- Eliminar el punto de interrupción haciendo clic con el botón derecho y seleccionando Eliminar.
- ...Y así.

```smart header="Puntos de interrupción Conditionales"
*Hacer clic con el botón derecho* en el número de línea permite crear un punto de interrupción *condicional*. Solo se activa cuando la expresión dada es veraz.
*Hacer clic con el botón derecho* en el número de línea permite crear un punto de interrupción *condicional*. Solo se activa cuando la expresión dada, que debe proporcionar cuando la crea, es veraz.
Eso es útil cuando necesitamos detenernos solo para un determinado valor de variable o para ciertos parámetros de función.
```

## El comando "debugger"

También podemos pausar el código usando el comando `debugger`, así:

```js
function hello(name) {
  let phrase = `Hello, ${name}!`;

*!*
  debugger;  // <-- the debugger stops here
*/!*

  say(phrase);
}
```

Dicho comando funciona solo cuando las herramientas del navegador están abiertas; de lo contrario el navegador lo ignora.

## Haz una pausa y mira a tu alrededor

En nuestro ejemplo, se llama a `hello()` durante la carga de la página, por lo que la forma más fácil de activar el depurador (después de establecer los puntos de interrupción) es recargar la página. Así que presionemos `tecla:F5` (Windows, Linux) o `tecla:Cmd+R` (Mac).

Cuando se establece el punto de interrupción, la ejecución se detiene en la cuarta línea:

![](chrome-sources-debugger-pause.svg)

Abra los menús desplegables informativos a la derecha (etiquetados con flechas). Le permiten examinar el estado actual del código:

1. **`Watch`: muestra los valores actuales de cualquier expresión.**

    Puedes hacer clic en el signo más `+` e ingresar una expresión. El depurador mostrará su valor, recalculándolo automáticamente en el proceso de ejecución.

2. **`Call Stack`: muestra la cadena de llamadas anidadas.**

    En el momento actual, el depurador está dentro de la llamada `hello()`, llamado por un guión o script en `index.html` (no hay función allí, por lo que se llama "anónimo").
    Si haces clic en un elemento de la pila (por ejemplo, "anónimo"), el depurador salta al código correspondiente y también se pueden examinar todas sus variables.

3. **`Scope` : variables actuales.**

    - `Local` muestra variables de funciones locales. También puedes ver sus valores resaltados justo sobre el código fuente.
    - `Global` contiene variables globales (fuera de cualquier función).

    También existe `this`, palabra clave que no estudiamos todavía, pero lo haremos pronto.

## Seguimiento de la ejecución

Ahora es el momento de *rastrear* el guión.

Hay botones para ello en la parte superior del panel derecho. Involucrémoslos.

<span class="devtools" style="background-position:-146px -168px"></span> -- "Reanudar": continúa la ejecución, tecla de acceso rápido `tecla:F8`.
: Reanuda la ejecución. Si no hay puntos de interrupción adicionales, la ejecución continúa y el depurador pierde el control.

  Esto es lo que podemos ver después de hacer clic en él:

![](chrome-sources-debugger-trace-1.svg)

  La ejecución se reanudó, alcanzó otro punto de interrupción dentro de `say()` y se detuvo allí. Eche un vistazo a la "Pila de llamadas" o "Call Stack" a la derecha. Ha aumentado en una convocatoria más. Estamos dentro de `say()` ahora.

<span class="devtools" style="background-position:-200px -190px"></span> -- "Paso": ejecute el siguiente comando, tecla de acceso rápido `tecla:F9`.
: Ejecute la siguiente sentencia. Si hacemos clic ahora, se mostrará `alerta`.

  Al hacer clic aquí una y otra vez, recorrerá todas las instrucciones del script una por una.
    
<span class="devtools" style="background-position:-62px -192px"></span> -- "Siguiente paso": ejecute el siguiente comando, pero *no entre en una función*, tecla de acceso rápido `tecla :F10`.
: Similar al comando "Paso" anterior, pero se comporta de manera diferente si la siguiente declaración es una llamada de función (no una función incorporada, como `alerta`, sino una función propia).

Si los comparamos, el comando "Paso" entra en una llamada de función anidada y detiene la ejecución en su primera línea, mientras que "Siguiente paso" ejecuta la llamada de función anidada de forma invisible para nosotros, omitiendo las funciones internas.

  Luego, la ejecución se detiene inmediatamente después de esa llamada de función.
    
  Eso es bueno si no estamos interesados en ver qué sucede dentro de la llamada a la función.
    
<span class="devtools" style="background-position:-4px -194px"></span> -- "Paso a", tecla de acceso rápido `tecla:F11`.
: Eso es similar a "Paso", pero se comporta de manera diferente en el caso de llamadas a funciones asincrónicas. Si recién está comenzando a aprender JavaScript, puede ignorar la diferencia, ya que aún no tenemos llamadas asincrónicas.

  Para el futuro, solo tenga en cuenta que el comando "Paso" ignora las acciones asíncronas, como `setTimeout` (llamada de función programada), que se ejecutan más tarde. El "Paso a" entra en su código, esperándolos si es necesario. Consulte el [manual de DevTools](https://developers.google.com/web/updates/2018/01/devtools#async) para obtener más detalles.

<span class="devtools" style="background-position:-32px -194px"></span> -- "Salir": continuar la ejecución hasta el final de la función actual, tecla de acceso rápido `tecla:Shift+F11` .
: continúa la ejecución y la detiene en la última línea de la función actual. Eso es útil cuando accidentalmente ingresamos una llamada anidada usando <span class="devtools" style="background-position:-200px -190px"></span>, pero no nos interesa y queremos continuar hasta el final lo antes posible.

<span class="devtools" style="background-position:-61px -74px"></span> -- habilitar/deshabilitar todos los puntos de interrupción.
: Ese botón no mueve la ejecución. Solo  prende y apaga los puntos de interrupción.

<span class="devtools" style="background-position:-90px -146px"></span> -- habilitar/deshabilitar la pausa automática en caso de error.
: cuando está habilitado, si las herramientas de desarrollo están abiertas, un error durante la ejecución del script lo detiene automáticamente. Luego podemos analizar las variables en el depurador para ver qué salió mal. Entonces, si nuestro script muere con un error, podemos abrir el depurador, habilitar esta opción y volver a cargar la página para ver dónde muere y cuál es el contexto en ese momento.

```smart header="Continuar hasta aquí"
Al hacer clic con el botón derecho en una línea de código, se abre el menú contextual con una excelente opción llamada "Continuar hasta aquí".

Eso es útil cuando queremos avanzar varios pasos hacia la línea, pero somos demasiado perezosos para establecer un punto de interrupción.
```

## Inicio sesión

Para enviar algo a la consola desde nuestro código, existe la función `console.log`.

Por ejemplo, esto genera valores de `0` a `4` en la consola:

```js run
// open console to see
for (let i = 0; i < 5; i++) {
  console.log("value,", i);
}
```

Los usuarios regulares no ven esa salida y está en la consola. Para verlo, abra el panel Consola de herramientas de desarrollador o presione la `tecla: Esc` mientras está en otro panel: eso abre la consola en la parte inferior.

Si tenemos suficientes registros en nuestro código, entonces podemos ver lo que sucede en los registros, sin el depurador.

## Resumen

Como podemos ver, existen tres maneras principales de pausar un guión o script:
1. Un punto de interrupción o breakpoint.
2. Las sentencias del `depurador` o `debugger`.
3. Un error (si las herramientas de desarrollo están abiertas y el botón <span class="devtools" style="background-position:-90px -146px"></span> está "activado").

Cuando está en pausa, podemos depurar: examinar variables y rastrear el código para ver dónde falla la ejecución.

Hay muchas más opciones en las herramientas para desarrolladores de las que se tratan aquí. El manual completo está en <https://developers.google.com/web/tools/chrome-devtools>.

La información de este capítulo es suficiente para comenzar la depuración, pero más adelante, especialmente si hace muchas cosas del navegador, vaya allí y revise las capacidades más avanzadas de las herramientas de desarrollo.

Ah, y también puede hacer clic en varios lugares de las herramientas de desarrollo y ver lo que aparece. Esa es probablemente la ruta más rápida para aprender herramientas de desarrollo. ¡No te olvides del clic derecho y los menús contextuales!