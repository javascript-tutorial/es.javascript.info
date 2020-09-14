<<<<<<< HEAD
# Eventos de puntero

Los eventos de puntero son una forma moderna de manejar la entrada de una variedad de dispositivos señaladores, como un mouse, un lápiz, una pantalla táctil, etc.

## Una breve historia

Hagamos una pequeña descripción general para que comprenda la imagen general y el lugar de los Eventos de Puntero entre otros tipos de eventos.

- Hace mucho tiempo, en el pasado, solo existían eventos de mouse.

    Luego aparecieron los dispositivos táctiles. Para que el código antiguo funcione, también generan eventos de mouse. Por ejemplo, tocar genera `mousedown`. Pero los eventos del mouse no eran adecuados porque los dispositivos táctiles son más poderosos en muchos aspectos. Por ejemplo, es posible tocar varios puntos a la vez, y los eventos del mouse no tienen propiedades para eso.

- Por lo tanto, se introdujeron eventos táctiles, como `touchstart`,`touchend`, `touchmove`, que tienen propiedades específicas de toque (no los cubrimos en detalle aquí, porque los eventos de puntero son aún mejores).

    Aún así no fue suficiente, ya que hay muchos otros dispositivos, como los lápices, que tienen sus propias funciones. Además, escribir un código que escuchara ambos eventos, los táctiles y los del mouse era engorroso.

- Para resolver estos problemas, se introdujo el nuevo estándar: *Pointer Events*. Este proporciona un conjunto único de eventos para todo tipo de dispositivos señaladores.

Al momento la especificación [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) es compatible con todos los principales navegadores, mientras que [Pointer Events Level 3](https://w3c.github.io/pointerevents/) está en proceso. A menos que codifique para Internet Explorer 10 o Safari 12 y versiones anteriores, ya no tiene sentido usar el mouse o los eventos táctiles. Podemos cambiar a eventos de puntero.

Dicho esto, hay peculiaridades importantes, uno debe saber usarlas correctamente y evitar sorpresas adicionales. Les prestaremos atención en este artículo.

## Tipos de eventos de puntero

Los eventos de puntero se llaman de forma similar a los eventos del mouse:

| Eventos de puntero | Eventos de mouse |
=======
# Pointer events

Pointer events are a modern way to handle input from a variety of pointing devices, such as a mouse, a pen/stylus, a touchscreen, and so on.

## The brief history

Let's make a small overview, so that you understand the general picture and the place of Pointer Events among other event types.

- Long ago, in the past, there were only mouse events.

    Then touch devices became widespread, phones and tablets in particular. For the existing scripts to work, they generated (and still generate) mouse events. For instance, tapping a touchscreen generates `mousedown`. So touch devices worked well with web pages.
    
    But touch devices have more capabilities than a mouse. For example, it's possible to touch multiple points at once ("multi-touch"). Although, mouse events don't have necessary properties to handle such multi-touches.

- So touch events were introduced, such as `touchstart`, `touchend`, `touchmove`, that have touch-specific properties (we don't cover them in detail here, because pointer events are even better).

    Still, it wasn't enough, as there are many other devices, such as pens, that have their own features. Also, writing code that listens for both touch and mouse events was cumbersome. 

- To solve these issues, the new standard Pointer Events was introduced. It provides a single set of events for all kinds of pointing devices.

As of now, [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) specification is supported in all major browsers, while the newer [Pointer Events Level 3](https://w3c.github.io/pointerevents/) is in the works and is mostly compartible with Pointer Events level 2. 

Unless you develop for old browsers, such as Internet Explorer 10, or for Safari 12 or below, there's no point in using mouse or touch events any more -- we can switch to pointer events.

Then your code will work well with both touch and mouse devices.

That said, there are some important peculiarities that one should know in order to use Pointer Events correctly and avoid surprises. We'll make note of them in this article.

## Pointer event types

Pointer events are named similarly to mouse events:

| Pointer event | Similar mouse event |
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
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

<<<<<<< HEAD
Como podemos ver, para cada `mouse<event>`, hay un `pointer<event>` que juega un papel similar. También hay 3 eventos de puntero adicionales que no tienen una contraparte correspondiente de `mouse ...`, pronto hablaremos sobre ellos.

```smart header="Remplazando *mouse<event>* con *pointer<event>* en nuestro código"
Podemos reemplazar los eventos `mouse<event>` con `pointer<event>` en nuestro código y esperar que las cosas sigan funcionando bien con el mouse.

El soporte para dispositivos táctiles también mejorará "mágicamente", pero probablemente necesitemos agregar la regla `touch-action: none` en CSS. Vea los detalles a continuación en la sección sobre `pointercancel`.
```

## Propiedades de los eventos de puntero

Los eventos de puntero tienen las mismas propiedades que los eventos del mouse, como `clientX/Y`, `target`, etc., más algunos adicionales:

- `pointerId` - el identificador único del puntero que causa el evento.
    
    Permite manejar múltiples punteros, como una pantalla táctil con lápiz y multitáctil (explicado a continuación).
- `pointerType` - el tipo de dispositivo señalador debe ser una cadena, uno de los siguientes: "mouse", "pen" o "touch".

    Podemos usar esta propiedad para reaccionar de manera diferente en varios tipos de punteros.
- `isPrimary` - `true` para el puntero principal (el primer dedo en multitáctil).

Para punteros que miden un área de contacto y presión, p. Ej. un dedo en la pantalla táctil, las propiedades adicionales pueden ser útiles:

- `width` - el ancho del área donde el puntero toca el dispositivo. Donde no sea compatible, como en el mouse, siempre es `1`. 
- `height` - el alto del área donde el puntero toca el dispositivo. Donde no sea compatible, siempre es `1`.
- `pressure` - la presión de la punta del puntero, en el rango de 0 a 1. Para dispositivos que no soportan presión, debe ser `0.5` (presionada) o `0`.
- `tangentialPressure` - la presión tangencial normalizada.
- `tiltX`, `tiltY`, `twist` - propiedades específicas del lápiz que describen cómo se lo coloca en relación con la superficie.

Estas propiedades no son muy compatibles en todos los dispositivos, por lo que rara vez se utilizan. Puede encontrar los detalles en la [especificación](https://w3c.github.io/pointerevents/#pointerevent-interface) si lo necesita.

## Multi-touch (Multitáctil)

Una de las cosas con las que los eventos del mouse no son compatibles es la propiedad multitáctil: un usuario puede tocarlos en varios lugares a la vez en su teléfono o tableta, realizar gestos especiales.

Los eventos de puntero permiten manejar multitáctiles con la ayuda de las propiedades `pointerId` e `isPrimary`.

Esto es lo que sucede cuando un usuario toca una pantalla en un lugar y luego coloca otro dedo en otro lugar:

1. En el primer toque:
    - `pointerdown` with `isPrimary=true` y algún `pointerId`.
2. Para el segundo dedo y toques posteriores:
    - `pointerdown` con `isPrimary=false` y un diferente `pointerId` por cada dedo.

Tenga en cuenta: el `pointerId` no se asigna a todo el dispositivo, sino a cada dedo que se toca. Si usamos 5 dedos para tocar simultáneamente la pantalla, tenemos 5 eventos `pointerdown` con coordenadas respectivas y diferentes `pointerId`.

Los eventos asociados con el primer dedo siempre tienen `isPrimary = true`.

Podemos rastrear el toque de varios dedos usando sus respectivos `pointerId`. Cuando el usuario mueve un dedo y luego lo quita, obtenemos los eventos `pointermove` y `pointerup` con el mismo `pointerId` que teníamos en `pointerdown`

```online
Aquí está la demostración que registra los eventos `pointerdown` y `pointerup`:

[iframe src="multitouch" edit height=200]

Tenga en cuenta que debe utilizar un dispositivo con pantalla táctil, como un teléfono o una tableta, para ver realmente la diferencia. Para dispositivos de un solo toque, como el de un mouse, siempre será el mismo `pointerId` con `isPrimary=true` para todos los eventos de puntero.
```

## Evento: pointercancel

Ya hemos mencionado la importancia de `touch-action: none`. Ahora expliquemos por qué, ya que omitir esto puede hacer que nuestras interfaces funcionen mal.

El evento `pointercancel` se dispara cuando hay una interacción de puntero en curso, y luego sucede algo que hace que se anule, de modo que no se generan más eventos de puntero.

Algunos causas son:
- Se deshabilitó el hardware del dispositivo de puntero.
- La orientación del dispositivo cambió (tableta rotada).
- El navegador decidió manejar la interacción por sí solo, considerándolo un gesto del mouse o una acción de zoom y panorámica u otra cosa.

Demostraremos `pointercancel` en un ejemplo práctico para ver cómo nos afecta.

Digamos que estamos implementando arrastrar y soltar (drag'n'drop) en una pelota, como al principio del artículo <info:mouse-drag-and-drop>.

A continuación, se muestra el flujo de acciones del usuario y los eventos correspondientes:

1) El usuario presiona el botón del mouse sobre una imagen para comenzar a arrastrar
    - `pointerdown` el evento se dispara
2) Luego comienzan a arrastrar la imagen
    - `pointermove` se dispara, tal vez varias veces
3) ¡Sorpresa! El navegador tiene soporte nativo de arrastrar y soltar para imágenes, que se dispara y se hace cargo del proceso de arrastrar y soltar, generando así el evento `pointercancel`.
    - El navegador ahora maneja arrastrar y soltar la imagen por sí solo. El usuario puede incluso arrastrar la imagen de la bola fuera del navegador, a su programa de correo o al administrador de archivos.
    - No más eventos `pointermove` para nosotros.

Así que el problema es que el navegador "secuestra" la interacción: `pointercancel` se dispara y no se generan más eventos de `pointermove`.

```online
Aquí está la demostración con eventos de puntero (solo `arriba / abajo`, `mover` y `cancelar`) registrados en el área de texto:
=======
As we can see, for every `mouse<event>`, there's a `pointer<event>` that plays a similar role. Also there are 3 additional pointer events that don't have a corresponding `mouse...` counterpart, we'll explain them soon. 

```smart header="Replacing `mouse<event>` with `pointer<event>` in our code"
We can replace `mouse<event>` events with `pointer<event>` in our code and expect things to continue working fine with mouse.

The support for touch devices will also "magically" improve. Although, we may need to add `touch-action: none` in some places in CSS. We'll cover it below in the section about `pointercancel`. 
```

## Pointer event properties

Pointer events have the same properties as mouse events, such as `clientX/Y`, `target`, etc., plus some others:

- `pointerId` - the unique identifier of the pointer causing the event.
    
    Browser-generated. Allows us to handle multiple pointers, such as a touchscreen with stylus and multi-touch (examples will follow).
- `pointerType` - the pointing device type. Must be a string, one of: "mouse", "pen" or "touch". 

    We can use this property to react differently on various pointer types.
- `isPrimary` - is `true` for the primary pointer (the first finger in multi-touch).

Some pointer devices measure contact area and pressure, e.g. for a finger on the touchscreen, there are additional properties for that:

- `width` - the width of the area where the pointer (e.g. a finger) touches the device. Where unsupported, e.g. for a mouse, it's always `1`. 
- `height` - the height of the area where the pointer touches the device. Where unsupported, it's always `1`.
- `pressure` - the pressure of the pointer tip, in range from 0 to 1. For devices that don't support pressure must be either `0.5` (pressed) or `0`.
- `tangentialPressure` - the normalized tangential pressure.
- `tiltX`, `tiltY`, `twist` - pen-specific properties that describe how the pen is positioned relative the surface.

These properties aren't supported by most devices, so they are rarely used. You can find the details about them in the [specification](https://w3c.github.io/pointerevents/#pointerevent-interface) if needed.

## Multi-touch

One of the things that mouse events totally don't support is multi-touch: a user can touch in several places at once on their phone or tablet, or perform special gestures.

Pointer Events allow handling multi-touch with the help of the `pointerId` and `isPrimary` properties.

Here's what happens when a user touches a touchscreen in one place, then puts another finger somewhere else on it:

1. At the first finger touch:
    - `pointerdown` with `isPrimary=true` and some `pointerId`.
2. For the second finger and more fingers (assuming the first one is still touching):
    - `pointerdown` with `isPrimary=false` and a different `pointerId` for every finger.

Please note: the `pointerId` is assigned not to the whole device, but for each touching finger. If we use 5 fingers to simultaneously touch the screen, we have 5 `pointerdown` events, each with their respective coordinates and a different `pointerId`.

The events associated with the first finger always have `isPrimary=true`.

We can track multiple touching fingers using their `pointerId`. When the user moves and then removes a finger, we get `pointermove` and `pointerup` events with the same `pointerId` as we had in `pointerdown`.

```online
Here's the demo that logs `pointerdown` and `pointerup` events:

[iframe src="multitouch" edit height=200]

Please note: you must be using a touchscreen device, such as a phone or a tablet, to actually see the difference in `pointerId/isPrimary`. For single-touch devices, such as a mouse, there'll be always same `pointerId` with `isPrimary=true`, for all pointer events.
```

## Event: pointercancel

The `pointercancel` event fires when there's an ongoing pointer interaction, and then something happens that causes it to be aborted, so that no more pointer events are generated. 

Such causes are: 
- The pointer device hardware was physically disabled.
- The device orientation changed (tablet rotated). 
- The browser decided to handle the interaction on its own, considering it a mouse gesture or zoom-and-pan action or something else.

We'll demonstrate `pointercancel` on a practical example to see how it affects us.

Let's say we're impelementing drag'n'drop for a ball, just as in the beginning of the article <info:mouse-drag-and-drop>.

Here is the flow of user actions and the corresponding events:

1) The user presses on an image, to start dragging
    - `pointerdown` event fires
2) Then they start moving the pointer (thus dragging the image)
    - `pointermove` fires, maybe several times
3) And then the surprise happens! The browser has native drag'n'drop support for images, that kicks in and takes over the drag'n'drop process, thus generating `pointercancel` event.
    - The browser now handles drag'n'drop of the image on its own. The user may even drag the ball image out of the browser, into their Mail program or a File Manager.
    - No more `pointermove` events for us.

So the issue is that the browser "hijacks" the interaction: `pointercancel` fires in the beginning of the "drag-and-drop" process, and no more `pointermove` events are generated.

```online
Here's the drag'n'drop demo with loggin of pointer events (only `up/down`, `move` and `cancel`) in the `textarea`: 
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

[iframe src="ball" height=240 edit]
```

<<<<<<< HEAD
Nos gustaría implementar nuestro propio arrastrar y soltar, así que digámosle al navegador que no se haga cargo.

**Evitar las acciones predeterminadas del navegador para prevenir `pointercancel`.**

Necesitaremos dos cosas:

1. Evitar que suceda la función nativa de arrastrar y soltar:
    - Puede hacerlo configurando `ball.ondragstart = () => false`, tal como se describe en el artículo <info:mouse-drag-and-drop>.
    - Eso funciona bien para eventos de mouse.
2. Para los dispositivos táctiles, también existen acciones del navegador relacionadas con el tacto. También tendremos problemas con ellos.
    - Podemos prevenirlos configurando `#ball{touch-action: none}` en CSS.
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

La idea es que podemos "vincular" todos los eventos con un `pointerId` particular a un elemento dado. Luego, todos los eventos posteriores con el mismo `pointerId` se redireccionarán al mismo elemento. Es decir: el navegador establece ese elemento como destino y dispara los controladores asociados, sin importar dónde sucedió realmente.

Los métodos relacionados son:
- `elem.setPointerCapture(pointerId)` - vincula el `pointerId` dado a `elem`.
- `elem.releasePointerCapture(pointerId)` - desvincula el `pointerId` dado del `elem`.

Tal unión no dura mucho. Se elimina automáticamente después de los eventos `pointerup` o `pointercancel`, o cuando el `elem` de destino se elimina del documento.

Ahora, ¿cuándo necesitamos esto?

**La captura de puntero se utiliza para simplificar el tipo de interacciones de arrastrar y soltar.**

Recordemos el problema que encontramos al hacer un control deslizante personalizado en el artículo <info:mouse-drag-and-drop>.

1) Primero, el usuario presiona `pointerdown` en el control deslizante para comenzar a arrastrarlo.
2) ...Pero luego, a medida que mueven el puntero, puede salirse del control deslizante: que vaya por debajo o por encima de él.

Pero continuamos rastreando los eventos de la pista `pointermove` y movemos el pulgar hasta `pointerup`, aunque el puntero ya no esté en el control deslizante.

[Anteriormente](info: mouse-drag-and-drop), para manejar los eventos `pointermove` que ocurrían fuera del control deslizante, escuchábamos los eventos `pointermove` en todo el `document`. 

La captura de puntero proporciona una solución alternativa: podemos llamar a `thumb.setPointerCapture(event.pointerId)` en el controlador `pointerdown`, y luego a todos los eventos de puntero futuros hasta que `pointerup` se redireccione a `thumb`.

Es decir: se llamará a los controladores de eventos en `thumb` y `event.target` siempre será `thumb`, incluso si el usuario mueve el puntero por todo el documento. Así que podemos escuchar en `thumb` desde `pointermove`, sin importar dónde suceda.

Aquí está el código esencial:

```js
thumb.onpointerdown = function(event) {
  // reorienta todos los eventos de puntero (hasta pointerup) a mí
=======
We'd like to implement the drag'n'drop on our own, so let's tell the browser not to take it over.

**Prevent the default browser action to avoid `pointercancel`.**

We need to do two things:

1. Prevent native drag'n'drop from happening:
    - We can do this by setting `ball.ondragstart = () => false`, just as described in the article <info:mouse-drag-and-drop>.
    - That works well for mouse events.
2. For touch devices, there are other touch-related browser actions (besides drag'n'drop). To avoid problems with them too:
    - Prevent them by setting `#ball { touch-action: none }` in CSS. 
    - Then our code will start working on touch devices.

After we do that, the events will work as intended, the browser won't hijack the process and doesn't emit `pointercancel`.

```online
This demo adds these lines:

[iframe src="ball-2" height=240 edit]

As you can see, there's no `pointercancel` any more.
```

Now we can add the code to actually move the ball, and our drag'n'drop will work for mouse devices and touch devices.

## Pointer capturing

Pointer capturing is a special feature of pointer events.

The idea is very simple, but may seem quite odd at first, as nothing like that exists for any other event type.

The main method is:
- `elem.setPointerCapture(pointerId)` - binds events with the given `pointerId` to `elem`. After the call all pointer events with the same `pointerId` will have `elem` as the target (as if happened on `elem`), no matter where in document they really happened.

In other words, `elem.setPointerCapture(pointerId)` retargets all subsequent events with the given `pointerId` to `elem`.

The binding is removed:
- automatically when `pointerup` or `pointercancel` events occur,
- automatically when `elem` is removed from the document,
- when `elem.releasePointerCapture(pointerId)` is called.

**Pointer capturing can be used to simplify drag'n'drop kind of interactions.**

As an example, let's recall how one can implement a custom slider, described in the <info:mouse-drag-and-drop>.

We make a slider element with the strip and the "runner" (`thumb`) inside it.

Then it works like this:

1. The user presses on the slider `thumb` - `pointerdown` triggers.
2. Then they move the pointer - `pointermove` triggers, and we move the `thumb` along.
    - ...As the pointer moves, it may leave the slider `thumb`: go above or below it. The `thumb` should move strictly horizontally, remaining aligned with the pointer.

So, to track all pointer movements, including when it goes above/below the `thumb`, we had to assign `pointermove` event handler on the whole `document`.

That solution looks a bit "dirty". One of the problems is that pointer movements around the document may cause side effects, trigger other event handlers, totally not related to the slider.

Pointer capturing provides a means to bind `pointermove` to `thumb` and avoid any such problems:

- We can call `thumb.setPointerCapture(event.pointerId)` in `pointerdown` handler,
- Then future pointer events until `pointerup/cancel` will be retargeted to `thumb`. 
- When `pointerup` happens (dragging complete), the binding is removed automatically, we don't need to care about it.

So, even if the user moves the pointer around the whole document, events handlers will be called on `thumb`. Besides, coordinate properties of the event objects, such as `clientX/clientY` will still be correct - the capturing only affects `target/currentTarget`.

Here's the essential code:

```js
thumb.onpointerdown = function(event) {
  // retarget all pointer events (until pointerup) to thumb
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
<<<<<<< HEAD
  // mueve el control deslizante: escucha con thumb, ya que todos los eventos se redireccionan a él
=======
  // moving the slider: listen on the thumb, as all pointer events are retargeted to it
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

<<<<<<< HEAD
// nota: no es necesario llamar a thumb.releasePointerCapture,
// esto sucede con el pointerup automáticamente
```

```online
La demostración completa:
=======
// note: no need to call thumb.releasePointerCapture, 
// it happens on pointerup automatically
```

```online
The full demo:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

[iframe src="slider" height=100 edit]
```

<<<<<<< HEAD
**Como resumen: el código se vuelve más limpio ya que ya no necesitamos agregar o eliminar controladores en todo el `document`. Eso es lo que hace la captura de punteros.**

Hay dos eventos de puntero asociados:

- `gotpointercapture` se dispara cuando un elemento usa `setPointerCapture` para permitir la captura.
- `lostpointercapture` se dispara cuando se libera la captura: ya sea explícitamente con la llamada a `releasePointerCapture`, o automáticamente con `pointerup`/`pointercancel`.

## Resumen

Los eventos de puntero permiten manejar eventos de mouse, toque y lápiz simultáneamente.

Los eventos de puntero extienden los eventos del mouse. Podemos reemplazar `mouse` con `pointer` en los nombres de los eventos y esperar que nuestro código continúe funcionando para el mouse, con mejor soporte para otros tipos de dispositivos.

Recuerde establecer `touch-events: none` en CSS para los elementos que involucramos, de lo contrario, el navegador secuestra muchos tipos de interacciones táctiles y no se generarán eventos de puntero.

Las habilidades adicionales de los eventos Pointer son:

- Soporte multitáctil usando `pointerId` y `isPrimary`.
- Propiedades específicas del dispositivo, como `pressure`, `width/height` y otras.
- Captura de puntero: podemos redirigir todos los eventos de puntero a un elemento específico hasta `pointerup`/`pointercancel`.

Al momento los eventos de puntero son compatibles con todos los navegadores principales, por lo que podemos cambiarlos de forma segura si no se necesitan IE10 y Safari 12. E incluso con esos navegadores, existen polyfills que permiten la compatibilidad con eventos de puntero.
=======
At the end, pointer capturing gives us two benefits:
1. The code becomes cleaner as we don't need to add/remove handlers on the whole `document` any more. The binding is released automatically.
2. If there are any `pointermove` handlers in the document, they won't be accidentally triggered by the pointer while the user is dragging the slider.

### Pointer capturing events

There are two associated pointer events:

- `gotpointercapture` fires when an element uses `setPointerCapture` to enable capturing.
- `lostpointercapture` fires when the capture is released: either explicitly with `releasePointerCapture` call, or automatically on `pointerup`/`pointercancel`.

## Summary

Pointer events allow handling mouse, touch and pen events simultaneously, with a single piece of code.

Pointer events extend mouse events. We can replace `mouse` with `pointer` in event names and expect our code to continue working for mouse, with better support for other device types.

For drag'n'drops and complex touch interactions that the browser may decide to hijack and handle on its own - remember to cancel the default action on events and set `touch-events: none` in CSS for elements that we engage.

Additional abilities of pointer events are:

- Multi-touch support using `pointerId` and `isPrimary`.
- Device-specific properties, such as `pressure`, `width/height`, and others.
- Pointer capturing: we can retarget all pointer events to a specific element until `pointerup`/`pointercancel`.

As of now, pointer events are supported in all major browsers, so we can safely switch to them, especially if IE10- and Safari 12- are not needed. And even with those browsers, there are polyfills that enable the support of pointer events.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
