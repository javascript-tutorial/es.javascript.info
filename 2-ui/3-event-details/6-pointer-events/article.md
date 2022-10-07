# Eventos de puntero

Los eventos de puntero son una forma moderna de manejar la entrada de una variedad de dispositivos señaladores, como un mouse, un lápiz, una pantalla táctil, etc.

## Una breve historia

Hagamos una pequeña descripción general para que comprenda la imagen general y el lugar de los Eventos de Puntero entre otros tipos de eventos.

- Hace mucho tiempo, en el pasado, solo existían eventos de mouse.

    Luego aparecieron los dispositivos táctiles, teléfonos y tablets en particular. Para que el código antiguo funcionara, generanban (y aún lo hacen) eventos de mouse. Por ejemplo, tocar la pantalla táctil genera `mousedown`. Así los dispositivos táctiles funcionaban bien con las páginas web.
    
    Pero los dispositivos táctiles tienen más capacidades que un mouse. Por ejemplo, es posible tocar múltiples puntos al mismo ("multi-touch"). Los eventos del mouse no tienen las propiedades necesarias para manejar tal multi-touch.

- Por lo tanto, se introdujeron eventos táctiles, como `touchstart`,`touchend`, `touchmove`, que tienen propiedades específicas de toque (no los cubrimos en detalle aquí, porque los eventos de puntero son aún mejores).

    Aún así no fue suficiente, ya que hay muchos otros dispositivos, como los lápices, que tienen sus propias funciones. Y escribir código que escuchara ambos eventos, los táctiles y los del mouse, era engorroso.

- Para resolver estos problemas, se introdujo el nuevo estándar: *Pointer Events*. Este proporciona un conjunto único de eventos para todo tipo de dispositivos señaladores.

Al momento la especificación [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) es soportada en todos los principales navegadores, mientras que [Pointer Events Level 3](https://w3c.github.io/pointerevents/) está en proceso y es mayormente compatible con Pointer Events level 2. 

A menos que codifique para navegadores viejos tales como Internet Explorer 10 o Safari 12 y versiones anteriores, ya no tiene sentido usar el mouse o los eventos táctiles: podemos cambiar a eventos de puntero.

Así tu código funcionará tanto con mouse como con dispositivos táctiles.

Dicho esto, hay peculiaridades importantes, uno debe saber usarlas correctamente y evitar sorpresas adicionales. Les prestaremos atención en este artículo.

## Tipos de eventos de puntero

Los eventos de puntero se llaman de forma similar a los eventos del mouse:

| Evento de puntero | Evento de mouse similar |
|---------------|-------------|
| `pointerdown` | `mousedown` |
| `pointerup` | `mouseup` |
| `pointermove` | `mousemove` |
| `pointerover` | `mouseover` |
| `pointerout` | `mouseout` |
| `pointerenter` | `mouseenter` |
| `pointerleave` | `mouseleave` |
| `pointercancel` | - |
| `gotpointercapture` | - |
| `lostpointercapture` | - |

Como podemos ver, para cada `mouse<event>`, hay un `pointer<event>` que juega un papel similar. También hay 3 eventos de puntero adicionales que no tienen una contraparte correspondiente de `mouse ...`, pronto hablaremos sobre ellos.

```smart header="Remplazando *mouse<event>* con *pointer<event>* en nuestro código"
Podemos reemplazar los eventos `mouse<event>` con `pointer<event>` en nuestro código y esperar que las cosas sigan funcionando bien con el mouse.

El soporte para dispositivos táctiles mejorará "mágicamente". Pero probablemente necesitemos agregar la regla `touch-action: none` en CSS. Cubriremos esto en la sección sobre `pointercancel`.
```

## Propiedades de los eventos de puntero

Los eventos de puntero tienen las mismas propiedades que los eventos del mouse, como `clientX/Y`, `target`, etc., más algunos adicionales:

- `pointerId` - el identificador único del puntero que causa el evento.
    
    Generado por el navegador. Permite manejar múltiples punteros, como una pantalla táctil con lápiz y multitáctil (explicado a continuación).
- `pointerType` - el tipo de dispositivo señalador. Debe ser una cadena, uno de los siguientes: "mouse", "pen" o "touch".

    Podemos usar esta propiedad para reaccionar de manera diferente en varios tipos de punteros.
- `isPrimary` - `true` para el puntero principal (el primer dedo en multitáctil).

Para punteros que miden un área de contacto y presión, p. Ej. un dedo en la pantalla táctil, las propiedades adicionales pueden ser útiles:

- `width` - el ancho del área donde el puntero (p.ej. el dedo) toca el dispositivo. Si el dispositivo no lo soporta (como el mouse), es siempre `1`. 
- `height` - el alto del área donde el puntero toca el dispositivo. Donde no lo soporte es siempre `1`.
- `pressure` - la presión de la punta del puntero, en el rango de 0 a 1. En dispositivos que no soportan presión, debe ser `0.5` (presionada) o `0`.
- `tangentialPressure` - la presión tangencial normalizada.
- `tiltX`, `tiltY`, `twist` - propiedades específicas del lápiz que describen cómo se lo coloca en relación con la superficie.

En la mayoría de los dispositivos estas propiedades no están soportadas, por lo que rara vez se utilizan. Si lo necesita puede encontrar los detalles en la [especificación](https://w3c.github.io/pointerevents/#pointerevent-interface).

## Multi-touch (Multitáctil)

Una de las cosas que los eventos del mouse no soportan es la propiedad multitáctil: un usuario puede tocar en varios lugares a la vez en su teléfono o tableta, realizar gestos especiales.

Los eventos de puntero permiten manejar multitáctiles con la ayuda de las propiedades `pointerId` e `isPrimary`.

Esto es lo que sucede cuando un usuario toca una pantalla en un lugar y luego coloca otro dedo en otro lugar:

1. En el primer toque:
    - `pointerdown` with `isPrimary=true` y algún `pointerId`.
2. Para el segundo dedo y toques posteriores (asumiendo que el primero sigue tocando):
    - `pointerdown` con `isPrimary=false` y un diferente `pointerId` por cada dedo.

Tenga en cuenta: el `pointerId` no se asigna a todo el dispositivo, sino a cada dedo que se toca. Si usamos 5 dedos para tocar simultáneamente la pantalla, tenemos 5 eventos `pointerdown` con coordenadas respectivas y diferentes `pointerId`.

Los eventos asociados con el primer dedo siempre tienen `isPrimary = true`.

Podemos rastrear el toque de varios dedos usando sus respectivos `pointerId`. Cuando el usuario mueve un dedo y luego lo quita, obtenemos los eventos `pointermove` y `pointerup` con el mismo `pointerId` que teníamos en `pointerdown`

```online
Aquí está la demostración que registra los eventos `pointerdown` y `pointerup`:

[iframe src="multitouch" edit height=200]

Tenga en cuenta que debe utilizar un dispositivo con pantalla táctil, como un teléfono o una tableta, para ver realmente la diferencia en `pointerId/isPrimary`. Para dispositivos de un solo toque, como el de un mouse, siempre será el mismo `pointerId` con `isPrimary=true` para todos los eventos de puntero.
```

## Evento: pointercancel

El evento `pointercancel` se dispara cuando, mientras hay una interacción de puntero en curso, sucede algo que hace que esta se anule de modo que no se generan más eventos de puntero.

Las causas son:
- Se deshabilitó el hardware del dispositivo de puntero.
- La orientación del dispositivo cambió (tableta rotada).
- El navegador decidió manejar la interacción por su cuenta: porque lo consideró un gesto de mouse, una acción de zoom, o alguna otra cosa.

Demostraremos `pointercancel` en un ejemplo práctico para ver cómo nos afecta.

Digamos que queremos una implementación de "arrastrar y soltar" en una pelota, como la que está al principio del artículo <info:mouse-drag-and-drop>.

A continuación, se muestra el flujo de acciones del usuario y los eventos correspondientes:

1) El usuario presiona sobre una imagen para comenzar a arrastrar
    - `pointerdown` el evento se dispara
2) Luego comienzan a mover el puntero (arrastrando la imagen)
    - `pointermove` se dispara, tal vez varias veces
3) ¡Sorpresa! El navegador tiene soporte nativo de arrastrar y soltar para imágenes, este bloquea el nuestro y se hace cargo del proceso de arrastrar y soltar, generando el evento `pointercancel`.
    - El navegador ahora maneja arrastrar y soltar la imagen por sí solo. El usuario puede incluso arrastrar la imagen de la bola fuera del navegador, a su programa de correo o al administrador de archivos.
    - No más eventos `pointermove` para nosotros.

Así que el problema es que el navegador "secuestra" la interacción: `pointercancel` se dispara y no se generan más eventos de `pointermove`.

```online
Aquí la demo con eventos de puntero (solamente `arriba/abajo`, `mover` y `cancelar`) registrados en `textarea`:

[iframe src="ball" height=240 edit]
```

Queremos implementar nuestro propio arrastrar y soltar, así que digámosle al navegador que no se haga cargo.

**Evitar las acciones predeterminadas del navegador para evitar `pointercancel`.**

Necesitaremos dos cosas:

1. Evitar que suceda la función nativa de arrastrar y soltar:
    - Puede hacerlo configurando `ball.ondragstart = () => false`, tal como se describe en el artículo <info:mouse-drag-and-drop>.
    - Eso funciona bien para eventos de mouse.
2. Para los dispositivos táctiles, también existen acciones del navegador relacionadas con el tacto (además de arrastrar y soltar). Para evitar problemas con ellos también:
    - Configurar `#ball{touch-action: none}` en CSS.
    - Entonces nuestro código comenzará a funcionar en dispositivos táctiles.

Después de hacer eso, los eventos funcionarán según lo previsto, el navegador no secuestrará el proceso y no emitirá ningún `pointercancel`.

```online
Esta demostración agrega estas líneas:

[iframe src="ball-2" height=240 edit]

Como puede ver, ya no hay `pointercancel`.
```

Ahora podemos agregar el código para mover realmente la bola, y nuestro método de arrastrar y soltar funcionará en dispositivos de mouse y dispositivos táctiles.

## Captura del puntero

La captura de puntero es una característica especial de los eventos de puntero.

La idea es muy simple, pero puede verse extraña al principio, porque no existe algo así para ningún otro tipo de evento. 

El método principal es: 
- `elem.setPointerCapture(pointerId)` -- vincula el `pointerId` dado a `elem`. Después del llamado todos los eventos de puntero con el mismo `pointerId` tendrán `elem` como objetivo (como si ocurrieran sobre `elem`), no importa dónde hayan ocurrido en realidad.

En otras palabras: `elem.setPointerCapture(pointerId)` redirige hacia `elem` todos los eventos subsecuentes que tengan el `pointerId` dado.

El vínculo se deshace::
- automáticamente cuando ocurren los eventos `pointerup` o `pointercancel`,
- automáticamente cuando `elem` es quitado del documento,
- cuando `elem.releasePointerCapture(pointerId)` es llamado.

Ahora, ¿para qué es bueno esto? Momento de ver un ejemplo de la vida real.

**La captura de puntero puede utilizarse para simplificar interacciones del tipo "arrastrar y soltar".**

Recordemos cómo uno puede implementar un control deslizante personalizado,  descrito en el artículo <info:mouse-drag-and-drop>.

Podemos hacer un elemento `slider` que representa la corredera con una perilla `thumb` dentro.

```html
<div class="slider">
  <div class="thumb"></div>
</div>
```

Con estilos, se ve así:

[iframe src="slider-html" height=40 edit]

<p></p>

Esta es la lógica de funcionamientodespués de reemplazar eventos de mouse con sus equivalentes de puntero:

1. El usuario presiona en el deslizante `thumb`: se dispara `pointerdown`
2. Entonces mueve el puntero: se dispara `pointermove` y nuestro código mueve el botón `thumb` a lo largo.
    - ...Mientras el puntero se mueve, puede salirse del control deslizante: que vaya por debajo o por encima de él. El botón debe moverse de forma estrictamente horizontal, permaneciendo alineado con el puntero.

En la solución basada en eventos de mouse, para rastrear todos los movimientos del puntero incluyendo aquellos por arriba o por debajo de `thumb`, asignamos el controlador de evento `mousemove` al `document` entero.

No es la solución más limpia. Uno de los problemas es que cuando el usuario mueve el puntero por el documento puede disparar manejadores de eventos (como `mouseover`) en otros elementos invocando funcionalidad de interfaz completamente sin relación al deslizante.

Aquí es donde entra en juego `setPointerCapture`.

- Podemos llamar `thumb.setPointerCapture(event.pointerId)` en el controlador `pointerdown`,
- Entonces futuros eventos de puntero hasta `pointerup/cancel` serán redirigidos a `thumb`. 
- Cuando ocurre `pointerup` (arrastre finalizado), el vínculo se deshace automáticamente, no necesitamos atender eso.

Entonces, incluso si el usuario mueve el puntero alrededor de todo el documento, los controladores de eventos serán llamados sobre `thumb`. A pesar de ello las propiedades de coordenadas de los eventos, tales como `clientX/clientY` aún serán correctas, la captura solo afecta a `target/currentTarget`.

Aquí está el código esencial:

```js
thumb.onpointerdown = function(event) {
  // reorienta todos los eventos de puntero (hasta pointerup) a thumb
  thumb.setPointerCapture(event.pointerId);

  // comienza a rastrear movimientos de puntero
  thumb.onpointermove = function(event) {
    // se mueve el control deslizante: escucha a thumb, ya que todos los eventos se redirigen a él
    let newLeft = event.clientX - slider.getBoundingClientRect().left;
    thumb.style.left = newLeft + 'px';
  };
  
  // on pointer up finaliza el seguimiento
  thumb.onpointerup = function(event) {
    thumb.onpointermove = null;
    thumb.onpointerup = null;
    // ...también procesa "fin de arrastre" si es necesario
  };
};

// nota: no es necesario llamar a thumb.releasePointerCapture,
// esto sucede con el pointerup automáticamente
```

```online
La demostración completa:

[iframe src="slider" height=100 edit]

<p></p>

En el demo, hay un elemento adicional con un controlador `onmouseover` que muestra la fecha actual.

Nota que mientras arrastras el dial, puedes pasar sobre ese elemento y su controlador *no* se dispara.

Entonces el arrastre esta ahora libre de efectos secundarios gracias a `setPointerCapture`.
```



Finalizando, la captura de puntero nos brinda dos beneficios:
1. El código se vuelve más claro, ya no necesitamos agregar o quitar controladores para el `document` entero. El vínculo se deshace automáticamente.
2. Si hay cualquier otro controlador de evento en el documento, no serán disparados accidentalmente mientras el usuario está arrastrando el deslizante.

### Eventos de captura de puntero

Una cosa más por mencionar en bien de la exhaustividad.

Hay dos eventos de puntero asociados con la captura de puntero:

- `gotpointercapture` se dispara cuando un elemento usa `setPointerCapture` para permitir la captura.
- `lostpointercapture` se dispara cuando se libera la captura: ya sea explícitamente con la llamada a `releasePointerCapture`, o automáticamente con `pointerup`/`pointercancel`.

## Resumen

Los eventos de puntero permiten manejar eventos de mouse, toque y lápiz simultáneamente con una simple pieza de código.

Los eventos de puntero extienden los eventos del mouse. Podemos reemplazar `mouse` con `pointer` en los nombres de los eventos y esperar que nuestro código continúe funcionando para el mouse, con mejor soporte para otros tipos de dispositivos.

Para arrastrar y soltar, y complejas interacciones que el navegador pudiera decidir secuestrar y manejar por su cuenta, recuerde cancelar la acción predeterminada sobre eventos y establecer `touch-action: none` en CSS para los elementos que involucramos.

Las habilidades adicionales de los eventos Pointer son:

- Soporte multitáctil usando `pointerId` y `isPrimary`.
- Propiedades específicas del dispositivo, como `pressure`, `width/height` y otras.
- Captura de puntero: podemos redirigir todos los eventos de puntero a un elemento específico hasta `pointerup`/`pointercancel`.

Al momento los eventos de puntero son compatibles con todos los navegadores principales, por lo que podemos cambiarlos de forma segura si no se necesitan IE10 y Safari 12. E incluso con esos navegadores, existen polyfills que permiten la compatibilidad con eventos de puntero.
