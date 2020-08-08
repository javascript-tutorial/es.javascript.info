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

Podemos rastrear el toque de varios dedos usando sus `pointerId`. Cuando el usuario mueve y luego levanta un dedo, obtenemos los eventos `pointermove` y `pointerup` con el mismo `pointerId` que teníamos en `pointerdown`.

```online
Aquí está la demostración que registra los eventos `pointerdown` y `pointerup`:

[iframe src="multitouch" edit height=200]

Tenga en cuenta que debe utilizar un dispositivo con pantalla táctil, como un teléfono o una tableta, para ver realmente la diferencia. Para dispositivos de un solo toque, como el de un mouse, siempre será el mismo `pointerId` con `isPrimary=true` para todos los eventos de puntero.
```

## Evento: pointercancel

Ya hemos mencionado la importancia de `touch-action: none`. Ahora expliquemos por qué, ya que omitir esto puede hacer que nuestras interfaces funcionen mal.

El evento `pointercancel` se dispara cuando hay una interacción de puntero en curso, y luego sucede algo que hace que se anule, de modo que no se generan más eventos de puntero.

Algunos casos son:
- Se deshabilitó el hardware del dispositivo de puntero.
- La orientación del dispositivo cambió (tableta rotada).
- El navegador decidió manejar la interacción por sí solo, considerándolo un gesto del mouse o una acción de zoom y panorámica u otra cosa.

Demostraremos `pointercancel` en un ejemplo práctico para ver cómo nos afecta.

Digamos que estamos implementando arrastrar y soltar(drag'n'drop) en una pelota, como al principio del artículo. <info:mouse-drag-and-drop>.

A continuación, se muestra el flujo de acciones del usuario y los eventos correspondientes:

1) El usuario presiona el botón del mouse sobre una imagen, para comenzar a arrastrar
    - `pointerdown` el evento se dispara
2) Luego comienzan a arrastrar la imagen
    - `pointermove` se dispara, tal vez varias veces
3) ¡Sorpresa! El navegador tiene soporte nativo de arrastrar y soltar para imágenes, que se dispara y se hace cargo del proceso de arrastrar y soltar, generando así el evento `pointercancel`.
    - El navegador ahora maneja arrastrar y soltar la imagen por sí solo. El usuario puede incluso arrastrar la imagen de la bola fuera del navegador, a su programa de correo o al administrador de archivos.
    - No más eventos `pointermove` para nosotros.

Así que el problema es que el navegador "secuestra" la interacción: `pointercancel` se dispara y no se generan más eventos de `pointermove`.

```online
Aquí está la demostración con eventos de puntero (solo `arriba / abajo`, `mover` y `cancelar`) registrados en el área de texto:

[iframe src="ball" height=240 edit]
```

Nos gustaría implementar nuestro propio arrastrar y soltar, así que digamos al navegador que no se haga cargo.

**Evitar las acciones predeterminadas del navegador para evitar `pointercancel`.**

Necesitaremos dos cosas:

1. Evitar que suceda la función de arrastrar y soltar nativa:
    - Puede hacerlo configurando `ball.ondragstart = () => false`, tal como se describe en el artículo <info:mouse-drag-and-drop>.
    - Eso funciona bien para eventos de mouse.
2. Para los dispositivos táctiles, también existen acciones del navegador relacionadas con el tacto. También tendremos problemas con ellos.
    -Podemos prevenirlos configurando `#ball{touch-action: none}` en CSS.
    - Entonces nuestro código comenzará a funcionar en dispositivos táctiles.

Después de hacer eso, los eventos funcionarán según lo previsto, el navegador no secuestrará el proceso y no emitirá ningún `pointercancel`.

```online
Esta demostración agrega estas líneas:

[iframe src="ball-2" height=240 edit]

Como puede ver, ya no hay `pointercancel`.
```

Ahora podemos agregar el código para mover realmente la bola, y nuestro método de arrastrar y soltar funcionará para dispositivos de mouse y dispositivos táctiles.

## Captura del puntero

La captura de puntero es una característica especial de los eventos de puntero.

La idea es que podemos "vincular" todos los eventos con un `pointerId` particular a un elemento dado. Luego, todos los eventos posteriores con el mismo `pointerId` se redireccionarán al mismo elemento. Es decir: el navegador establece ese elemento como destino y dispara los controladores asociados, sin importar dónde sucedió realmente.

Los métodos relacionados son:
- `elem.setPointerCapture(pointerId)` - vincula el `pointerId` dado a `elem`.
- `elem.releasePointerCapture(pointerId)` - desvincula el `pointerId` dado del `elem`.

Tal unión no dura mucho. Se elimina automáticamente después de los eventos `pointerup` o `pointercancel`, o cuando el `elem` de destino se elimina del documento.

Ahora, ¿cuándo necesitamos esto?

**La captura de puntero se utiliza para simplificar el tipo de interacciones de arrastrar y soltar.**

Recordemos el problema que encontramos al hacer un control deslizante personalizado en el artículo. <info:mouse-drag-and-drop>.

1) Primero, el usuario presiona `pointerdown` en el control deslizante para comenzar a arrastrarlo.
2) ... Pero luego, a medida que mueven el puntero, puede salir del control deslizante: vaya por debajo o por encima de él.

Pero continuamos rastreando los eventos de la pista `pointermove` y movemos el pulgar hasta `pointerup`, aunque el puntero ya no esté en el control deslizante.

[Anteriormente] (info: mouse-drag-and-drop), para manejar los eventos `pointermove` que ocurrían fuera del control deslizante, escuchabamos los eventos `pointermove` en todo el `document`. 

La captura de puntero proporciona una solución alternativa: podemos llamar a `thumb.setPointerCapture(event.pointerId)` en el controlador `pointerdown`, y luego a todos los eventos de puntero futuros hasta que `pointerup` se redireccione a `thumb`.

Es decir: se llamará a los controladores de eventos en `thumb` y `event.target` siempre será `thumb`, incluso si el usuario mueve el puntero por todo el documento. Así que podemos escuchar en `thumb` desde `pointermove`, sin importar dónde suceda.

Aquí está el código esencial:

```js
thumb.onpointerdown = function(event) {
  // reorienta todos los eventos de puntero (hasta pointerup) a mí
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
  // mueve el control deslizante: escucha con thumb, ya que todos los eventos se redireccionan a él
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

// nota: no es necesario llamar a thumb.releasePointerCapture,
// sucede en el puntero automáticamente
```

```online
La demostración completa:

[iframe src="slider" height=100 edit]
```

**Como resumen: el código se vuelve más limpio ya que ya no necesitamos agregar / eliminar controladores en todo el `document`. Eso es lo que hace la captura de punteros.**

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

A partir de ahora, los eventos de puntero son compatibles con todos los navegadores principales, por lo que podemos cambiarlos de forma segura, si no se necesitan IE10 y Safari 12. E incluso con esos navegadores, existen polyfills que permiten la compatibilidad con eventos de puntero.
