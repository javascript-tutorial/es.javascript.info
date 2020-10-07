# Eventos de puntero

Los eventos de puntero son una forma moderna de manejar la entrada de una variedad de dispositivos señaladores, como un mouse, un lápiz, una pantalla táctil, etc.

## Una breve historia

Hagamos una pequeña descripción general para que comprenda la imagen general y el lugar de los Eventos de Puntero entre otros tipos de eventos.

- Hace mucho tiempo, en el pasado, solo existían eventos de mouse.

    Luego aparecieron los dispositivos táctiles. Para que el código antiguo funcione, también generan eventos de mouse. Por ejemplo, tocar genera `mousedown`. 
    
    Pero los dispositivos táctiles tienen más capacidadess que un mouse. Por ejemplo, es posible tocar múltiples puntos al mismo ("multi-touch"). Los eventos del mouse no tienen las propiedades necesariass para manejar tal multi-touch.

- Por lo tanto, se introdujeron eventos táctiles, como `touchstart`,`touchend`, `touchmove`, que tienen propiedades específicas de toque (no los cubrimos en detalle aquí, porque los eventos de puntero son aún mejores).

    Aún así no fue suficiente, ya que hay muchos otros dispositivos, como los lápices, que tienen sus propias funciones. Además, escribir un código que escuchara ambos eventos, los táctiles y los del mouse era engorroso.

- Para resolver estos problemas, se introdujo el nuevo estándar: *Pointer Events*. Este proporciona un conjunto único de eventos para todo tipo de dispositivos señaladores.

Al momento la especificación [Pointer Events Level 2](https://www.w3.org/TR/pointerevents2/) es compatible con todos los principales navegadores, mientras que [Pointer Events Level 3](https://w3c.github.io/pointerevents/) está en proceso y es mayormente compatible con Pointer Events level 2. 

A menos que codifique para navegadores viejos tales como Internet Explorer 10 o Safari 12 y versiones anteriores, ya no tiene sentido usar el mouse o los eventos táctiles: podemos cambiar a eventos de puntero.

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

El soporte para dispositivos táctiles también mejorará "mágicamente", pero probablemente necesitemos agregar la regla `touch-action: none` en CSS. Vea los detalles a continuación en la sección sobre `pointercancel`.
```

## Propiedades de los eventos de puntero

Los eventos de puntero tienen las mismas propiedades que los eventos del mouse, como `clientX/Y`, `target`, etc., más algunos adicionales:

- `pointerId` - el identificador único del puntero que causa el evento.
    
    Generado por el navegador. Permite manejar múltiples punteros, como una pantalla táctil con lápiz y multitáctil (explicado a continuación).
- `pointerType` - el tipo de dispositivo señalador. Debe ser una cadena, uno de los siguientes: "mouse", "pen" o "touch".

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

El evento `pointercancel` se dispara cuando hay una interacción de puntero en curso, y luego sucede algo que hace que se anule, de modo que no se generan más eventos de puntero.

Algunos causas son:
- Se deshabilitó el hardware del dispositivo de puntero.
- La orientación del dispositivo cambió (tableta rotada).
- El navegador decidió manejar la interacción por sí solo, considerándolo un gesto del mouse o una acción de zoom y panorámica u otra cosa.

Demostraremos `pointercancel` en un ejemplo práctico para ver cómo nos afecta.

Digamos que estamos implementando arrastrar y soltar (drag'n'drop) en una pelota, como al principio del artículo <info:mouse-drag-and-drop>.

A continuación, se muestra el flujo de acciones del usuario y los eventos correspondientes:

1) El usuario presiona sobre una imagen para comenzar a arrastrar
    - `pointerdown` el evento se dispara
2) Luego comienzan a mover el puntero (arrastrando la imagen)
    - `pointermove` se dispara, tal vez varias veces
3) ¡Sorpresa! El navegador tiene soporte nativo de arrastrar y soltar para imágenes, que se dispara y se hace cargo del proceso de arrastrar y soltar, generando así el evento `pointercancel`.
    - El navegador ahora maneja arrastrar y soltar la imagen por sí solo. El usuario puede incluso arrastrar la imagen de la bola fuera del navegador, a su programa de correo o al administrador de archivos.
    - No más eventos `pointermove` para nosotros.

Así que el problema es que el navegador "secuestra" la interacción: `pointercancel` se dispara y no se generan más eventos de `pointermove`.

```online
Aquí está la demostración con eventos de puntero (solo `arriba / abajo`, `mover` y `cancelar`) registrados en el área de texto:

[iframe src="ball" height=240 edit]
```

Nos gustaría implementar nuestro propio arrastrar y soltar, así que digámosle al navegador que no se haga cargo.

**Evitar las acciones predeterminadas del navegador para prevenir `pointercancel`.**

Necesitaremos dos cosas:

1. Evitar que suceda la función nativa de arrastrar y soltar:
    - Puede hacerlo configurando `ball.ondragstart = () => false`, tal como se describe en el artículo <info:mouse-drag-and-drop>.
    - Eso funciona bien para eventos de mouse.
2. Para los dispositivos táctiles, también existen acciones del navegador relacionadas con el tacto (además de arrastrar y soltar). También tendremos problemas con ellos.
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

La idea es muy simple, pero puede verse extraña al principio, porque no existe algo así para ningún otro tipo de evento. 

El método principal es: 
- `elem.setPointerCapture(pointerId)` - vincula el `pointerId` dado a `elem`. Después del llamado todos los eventos de puntero con el mismo `pointerId` tendrán `elem` como objetivo (como si pasara sobre `elem`), no importa dónde en el documento realmente ocurrió.

En otras palabras, `elem.setPointerCapture(pointerId)` redirecciona todos los subsecuentes eventos con el `pointerId` dado hacia `elem`.

El vínculo se deshace::
- automáticamente cuando ocurren los eventos `pointerup` o `pointercancel`,
- automáticamente cuando `elem` es quitado del documento,
- cuando `elem.releasePointerCapture(pointerId)` es llamado.

**La captura de puntero puede utilizarse para simplificar el tipo de interacciones de arrastrar y soltar.**

Recordemos el problema que encontramos al hacer un control deslizante personalizado en el artículo <info:mouse-drag-and-drop>.

Hacemos un elemento deslizante con la corredera y botón (`thumb`) dentro.

Funciona así:

1) Primero, el usuario presiona en el deslizante - se dispara `pointerdown`
2) Entonces mueve el puntero - se dispara `pointermove` y mueve el botón `thumb`
    - ...mientras el puntero se mueve, puede salirse del control deslizante: que vaya por debajo o por encima de él. El botón debe moverse estrictamente horizontal, permaneciendo alineado con el puntero.

Entonces, para rastrear todos los movimientos del puntero, incluyendo aquellos por arriba o por debajo, tenemos que asignar el controlador de evento `pointermove` al `document` entero.

Esta solución se ve un poco "sucia". Uno de los problemas es que los movimientos alrededor del documento pueden causar efectos colaterales, disparar otros eventos, completamente sin relación al deslizante.

La captura de puntero provee un medio de vincular `pointermove` a `thumb` y evitar cualquiera de tales problemas:

- Podemos llamar `thumb.setPointerCapture(event.pointerId)` en el controlador`pointerdown`,
- Entoncess futuros eventos de puntero hasta `pointerup/cancel` serán redirigidos a `thumb`. 
- Cuando ocurre `pointerup` (arrastre finalizado), el vínculo se deshace automáticamente, no necesitamos atender eso.

Entonces, incluso si el usuario mueve el puntero alrededor de todo el documento, los controladores de eventos serán llamados sobre `thumb`. Además las propiedades de coordenadas de los eventos, tales como `clientX/clientY` aún serán correctas, la captura solo afecta a `target/currentTarget`.

Aquí está el código esencial:

```js
thumb.onpointerdown = function(event) {
  // reorienta todos los eventos de puntero (hasta pointerup) a thumb
  thumb.setPointerCapture(event.pointerId);
};

thumb.onpointermove = function(event) {
  // mueve el control deslizante: escucha a thumb, ya que todos los eventos se redireccionan a él
  let newLeft = event.clientX - slider.getBoundingClientRect().left;
  thumb.style.left = newLeft + 'px';
};

// nota: no es necesario llamar a thumb.releasePointerCapture,
// esto sucede con el pointerup automáticamente
```

```online
La demostración completa:

[iframe src="slider" height=100 edit]
```

Finalizando, la captura de puntero nos brinda dos beneficios:
1. El código se vuelve más claro, ya no necesitamos agregar o quitar controladores para el `document` entero. El vínculo se deshace automáticamente.
2. Si hay cualquier controlador `pointermove` en el documento, no serán disparados accidentalmente mientras el usuario está arrastrando el deslizante.

### Eventos de captura de puntero

Hay dos eventos de puntero asociados:

- `gotpointercapture` se dispara cuando un elemento usa `setPointerCapture` para permitir la captura.
- `lostpointercapture` se dispara cuando se libera la captura: ya sea explícitamente con la llamada a `releasePointerCapture`, o automáticamente con `pointerup`/`pointercancel`.

## Resumen

Los eventos de puntero permiten manejar eventos de mouse, toque y lápiz simultáneamente con una simple pieza de código.

Los eventos de puntero extienden los eventos del mouse. Podemos reemplazar `mouse` con `pointer` en los nombres de los eventos y esperar que nuestro código continúe funcionando para el mouse, con mejor soporte para otros tipos de dispositivos.

Para arrastrar y soltar, y complejas interacciones que el navegador pudiera decidir secuestrar y manejarlas por su cuenta, recuerde cancelar la acción predeterminada sobre eventos y establecer `touch-events: none` en CSS para los elementos que involucramos.

Las habilidades adicionales de los eventos Pointer son:

- Soporte multitáctil usando `pointerId` y `isPrimary`.
- Propiedades específicas del dispositivo, como `pressure`, `width/height` y otras.
- Captura de puntero: podemos redirigir todos los eventos de puntero a un elemento específico hasta `pointerup`/`pointercancel`.

Al momento los eventos de puntero son compatibles con todos los navegadores principales, por lo que podemos cambiarlos de forma segura si no se necesitan IE10 y Safari 12. E incluso con esos navegadores, existen polyfills que permiten la compatibilidad con eventos de puntero.
