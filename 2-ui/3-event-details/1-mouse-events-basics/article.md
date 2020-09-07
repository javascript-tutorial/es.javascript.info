<<<<<<< HEAD
# Eventos del Mouse

En este capítulo vamos a entrar en más detalles sobre los eventos del mouse y sus propiedades.
=======
# Mouse events
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Ten en cuenta que tales eventos pueden provenir no sólo del "dispositivo mouse", sino también de otros dispositivos, como teléfonos y tabletas, donde se emulan por compatibilidad.

<<<<<<< HEAD
## Tipos de eventos del mouse

Ya hemos visto algunos de estos eventos:
=======
Please note: such events may come not only from "mouse devices", but are also from other devices, such as phones and tablets, where they are emulated for compatibility.

## Mouse event types

We've already seen some of these events:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

`mousedown/mouseup`
: Se oprime/suelta el botón del ratón sobre un elemento.

`mouseover/mouseout`
: El puntero del mouse se mueve sobre/sale de un elemento.

`mousemove`
<<<<<<< HEAD
: Cualquier movimiento del mouse sobre un elemento activa el evento.

`click`
: Se activa después de `mousedown` y un `mouseup` enseguida sobre el mismo elemento si se usó el botón.

`dblclick`
: Se activa después de dos clicks seguidos sobre el mismo elemento. Hoy en día se usa raramente.

`contextmenu`
: Se activa al pulsar el botón derecho del ratón. Existen otras formas de abrir el menú contextual, por ejemplo: usando un comando especial de teclado también puede activarse, de manera que no es exactamente un evento exclusivo del mouse.

...Existen otros eventos más que cubriremos más tarde.

## El orden de los eventos

Como pudiste ver en la lista anterior, una acción del usuario puede desencadenar varios eventos.

Por ejemlo , un click izquierdo primero activa `mousedown`cuando se presiona el botón, enseguida `mouseup` y `click` cuando se suelta.

En casos así, el orden es fijo. Es decir, los controladores son llamados en el siguiente orden `mousedown` -> `mouseup` -> `click`. 
=======
: Every mouse move over an element triggers that event.

`click`
: Triggers after `mousedown` and then `mouseup` over the same element if the left mouse button was used.

`dblclick`
: Triggers after two clicks on the same element within a short timeframe. Rarely used nowadays.

`contextmenu`
: Triggers when the right mouse button is pressed. There are other ways to open a context menu, e.g. using a special keyboard key, it triggers in that case also, so it's not exactly the mouse event.

...There are several other events too, we'll cover them later.

## Events order

As you can see from the list above, a user action may trigger multiple events.

For instance, a left-button click first triggers `mousedown`, when the button is pressed, then `mouseup` and `click` when it's released.

In cases when a single action initiates multiple events, their order is fixed. That is, the handlers are called in the order `mousedown` -> `mouseup` -> `click`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```online
Haz click en el botón abajo y verás los eventos. Intenta con doble click también.

<<<<<<< HEAD
En el testeador de abajo todos los eventos quedan registrados. Si hay mas de un segundo de retraso entre cada uno de ellos quedan separados por una regla horizontal.

Además podemos ver la propiedad de `button` que nos permite detectar el botón del mouse. Lo explicaremos a continuación.
=======
On the teststand below all mouse events are logged, and if there is more than a 1 second delay between them they are separated by a horizontal ruler.

Also we can see the `button` property that allows to detect the mouse button, it's explained below.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Haz click sobre mí con el botón izquierdo o derecho del mouse" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

<<<<<<< HEAD
## El botón del mouse

Los eventos relacionados con clics siempre tienen la propiedad `button`, esta nos permite conocer el botón exacto del mouse.

Normalmente no la usamos para eventos `click` y `contextmenu` events, porque sabemos que ocurren solo con click izquierdo y derecho respectivamente. 

Por otro lado, con lo controloadores `mousedown` y `mouseup` vamos a necesitar `event.button` ya que estos eventos se activan con cualquier botón, por lo que `button` nos permitira distinguir entre "mousedown derecho" y "mousedown izquierdo".

Los valores posibles para `event.button` son:

| Estado del botón | `event.button` |
|--------------|----------------|
| Botón izquierdo (primario) | 0 |
| Botón central (auxiliar) | 1 |
| Botón derecho (secundario) | 2 |
| Botón X1 (atrás) | 3 |
| Botón X2 (adelante) | 4 |

La mayoría de los dispositivos de ratón sólo tienen los botones izquierdo y derecho, por lo que los valores posibles son `0` o `2`. Los dispositivos táctiles también generan eventos similares cuando se toca sobre ellos.

También hay una propiedad `event.buttons` que guarda todos los botones presionados actuales en un solo entero, un bit por botón. En la práctica, esta propiedad es raramente utilizada. Puedes encontrar más detalles en [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons) si alguna vez lo necesitas.
=======
## Mouse button

Click-related events always have the `button` property, which allows to get the exact mouse button.

We usually don't use it for `click` and `contextmenu` events, because the former happens only on left-click, and the latter -- only on right-click.

From the other hand, `mousedown` and `mouseup` handlers we may need `event.button`, because these events trigger on any button, so `button` allows to distinguish between "right-mousedown" and "left-mousedown".

The possible values of `event.button` are:

| Button state | `event.button` |
|--------------|----------------|
| Left button (primary) | 0 |
| Middle button (auxiliary) | 1 |
| Right button (secondary) | 2 |
| X1 button (back) | 3 |
| X2 button (forward) | 4 |

Most mouse devices only have the left and right buttons, so possible values are `0` or `2`. Touch devices also generate similar events when one taps on them.

Also there's `event.buttons` property that has all currently pressed buttons as an integer, one bit per button. In practice this property is very rarely used, you can find details at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons) if you ever need it.

```warn header="The outdated `event.which`"
Old code may use `event.which` property that's an old non-standard way of getting a button, with possible values:

- `event.which == 1` – left button,
- `event.which == 2` – middle button,
- `event.which == 3` – right button.

As of now, `event.which` is deprecated, we shouldn't use it.
```
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```warn header="El obsoleto `event.which`"
El código puede utilizar la propiedad `event.which` que es una forma antigua no estándar de obtener un botón con los valores posibles:

- `event.which == 1` – botón izquierdo,
- `event.which == 2` – botón central,
- `event.which == 3` – botón derecho.

<<<<<<< HEAD
Ahora `event.which` está en desuso, no deberíamos usarlo.
```

## Modificadores: shift, alt, ctrl y meta

Todos los eventos del mouse incluyen la información sobre las teclas modificadoras presionadas.

Propiedades del evento:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (p `key:Opt` para Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` para Mac

Su valor es `true` si la tecla fue presionada durante el evento.
=======
Event properties:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (or `key:Opt` for Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` for Mac

They are `true` if the corresponding key was pressed during the event.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Por ejemplo, el botón abajo solo funciona con`key:Alt+Shift`+click:

```html autorun height=60
<button id="button">Alt+Shift+¡Click sobre mí!</button>

<script>
  button.onclick = function(event) {
*!*
    if (event.altKey && event.shiftKey) {
*/!*
      alert('¡Genial!');
    }
  };
</script>
```

<<<<<<< HEAD
```warn header="Atención: en Mac suele ser `Cmd` en lugar de `Ctrl`"
En Windows y Linux existen las teclas modificadoras `key:Alt`, `key:Shift` y `key:Ctrl`. En Mac hay una más: `key:Cmd`, correspondiente a la propiedad `metaKey`.

En la mayoría de las aplicaciones, cuando Windows/Linux usan `key:Ctrl`, en Mac se usa `key:Cmd`.

Es decir: cuando un usuario de Windows usa `key:Ctrl+Enter` o `key:Ctrl+A`, un usuario Mac presionaría `key:Cmd+Enter` o `key:Cmd+A`, y así sucesivamente.

Entonces si queremos darle soporte a combinaciones como `key:Ctrl`+click, entonces para Mac tendría más sentido usar `key:Cmd`+click. Esto es más cómodo para los usuarios de Mac.

Incluso si quisieramos obligar a los usuarios de Mac a hacer `key:Ctrl`+click -- esto supone algo de dificultad. El problema es que: un click izquierdo con `key:Ctrl` es intrepetado como  *click derecho* en MacOS, y esto genera un evento `contextmenu`, no un `click` como en Windows/Linux.
=======
```warn header="Attention: on Mac it's usually `Cmd` instead of `Ctrl`"
On Windows and Linux there are modifier keys `key:Alt`, `key:Shift` and `key:Ctrl`. On Mac there's one more: `key:Cmd`, corresponding to the property `metaKey`.

In most applications, when Windows/Linux uses `key:Ctrl`, on Mac `key:Cmd` is used.

That is: where a Windows user presses `key:Ctrl+Enter` or `key:Ctrl+A`, a Mac user would press `key:Cmd+Enter` or `key:Cmd+A`, and so on.

So if we want to support combinations like `key:Ctrl`+click, then for Mac it makes sense to use `key:Cmd`+click. That's more comfortable for Mac users.

Even if we'd like to force Mac users to `key:Ctrl`+click -- that's kind of difficult. The problem is: a left-click with `key:Ctrl` is interpreted as a *right-click* on MacOS, and it generates the `contextmenu` event, not `click` like Windows/Linux.

So if we want users of all operating systems to feel comfortable, then together with `ctrlKey` we should check `metaKey`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Así que si queremos que los usuarios de todos los sistemas operativos se sientan cómodos, entonces junto con `ctrlKey` debemos verificar `metaKey`.

<<<<<<< HEAD
Para código JS  significa que debemos hacer la comprobación `if (event.ctrlKey || event.metaKey)`.
```

```warn header="También hay dispositivos móviles"
Las combinaciones de teclado son buenas como una adición al flujo de trabajo. De modo que si el visitante usa un teclado -- funcionan. 
=======
```warn header="There are also mobile devices"
Keyboard combinations are good as an addition to the workflow. So that if the visitor uses a keyboard -- they work. 

But if their device doesn't have it -- then there should be a way to live without modifier keys.
```

## Coordinates: clientX/Y, pageX/Y

All mouse events provide coordinates in two flavours:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Pero si su dispositivo no lo tiene -- entonces debería haber una manera de vivir sin teclas modificadoras.

<<<<<<< HEAD
=======
We already covered the difference between them in the chapter <info:coordinates>.

In short, document-relative coordinates `pageX/Y` are counted from the left-upper corner of the document, and do not change when the page is scrolled, while `clientX/Y` are counted from the current window left-upper corner. When the page is scrolled, they change.

For instance, if we have a window of the size 500x500, and the mouse is in the left-upper corner, then `clientX` and `clientY` are `0`, no matter how the page is scrolled. 

And if the mouse is in the center, then `clientX` and `clientY` are `250`, no matter what place in the document it is. They are similar to `position:fixed` in that aspect.

````online
Move the mouse over the input field to see `clientX/clientY` (the example is in the `iframe`, so coordinates are relative to that `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Mouse over me">
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
```

<<<<<<< HEAD
## Coordenadas: clientX/Y, pageX/Y

Todos los eventos del ratón proporcionan coordenadas en dos sabores:

1. Relativas a la ventana: `clientX` y `clientY`.
2. Relativos al documento: `pageX` y `pageY`.

Ya cubrimos la diferencia entre ellos en el capítulo <info:coordinates>.

En resumen, las coordenadas relativas al documento `pageX/Y`se cuentan desde la esquina superior izquierda del documento y no cambian cuando se desplaza la página, mientras que `clientX/Y` se cuentan desde la esquina superior actual. Cambian cuando se desplaza la página.

Por ejemplo, si tenemos una ventana del tamaño 500x500, y el mouse está en la esquina superior izquierda, entonces `clientX` y `clientY` son `0`, sin importar cómo se desplace la página. 

Y si el mouse está en el centro, entonces `clientX` y `clientY` son `250`, No importa en qué parte del documento se encuentren. Esto es similar a `position:fixed` en ese aspecto.

````online
Mueve el mouse sobre el campo de entrada para ver `clientX/clientY` (el ejemplo está dentro del `iframe`, así que las coordenadas son relativas al `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Pasa el mouse sobre mí">
=======
## Preventing selection on mousedown

Double mouse click has a side-effect that may be disturbing in some interfaces: it selects text.

For instance, double-clicking on the text below selects it in addition to our handler:

```html autorun height=50
<span ondblclick="alert('dblclick')">Double-click me</span>
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
```
````

<<<<<<< HEAD
## Previniendo la selección en mousedown

El doble clic del mouse tiene un efecto secundario que puede ser molesto en algunas interfaces: selecciona texto.

Por ejemplo, un doble clic en el texto de abajo lo selecciona además de activar nuestro controlador:
=======
If one presses the left mouse button and, without releasing it, moves the mouse, that also makes the selection, often unwanted.

There are multiple ways to prevent the selection, that you can read in the chapter <info:selection-range>.

In this particular case the most reasonable way is to prevent the browser action on `mousedown`. It prevents both these selections:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```html autorun height=50
<span ondblclick="alert('dblclick')">Haz doble click en mi</span>
```

<<<<<<< HEAD
Si se pulsa el botón izquierdo del ratón y, sin soltarlo, mueve el ratón, también hace la selección, a menudo no deseado.

Hay varias maneras de evitar la selección, que se pueden leer en el capítulo <info:selection-range>.

En este caso particular, la forma más razonable es evitar la acción del navegador `mousedown`. Esto evita ambas selecciones:

```html autorun height=50
Antes...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Haz doble click en mí
</b>
...Después
```

Ahora el elemento en negrita no se selecciona con doble clic, y al mantener presionado el botón izquierdo y arrastrar no se iniciará la selección.

Tenga en cuenta: el texto dentro de él todavía es seleccionable. Sin embargo, la selección no debe comenzar en el texto en sí, sino antes o después. Por lo general, eso está bien para los usuarios.

````smart header="Previniendo copias"
Si queremos inhabilitar la selección para proteger nuestro contenido de la página del copy-paste, entonces podemos utilizar otro evento: `oncopy`.
=======
Now the bold element is not selected on double clicks, and pressing the left button on it won't start the selection.

Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine for users.

````smart header="Preventing copying"
If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```html autorun height=80 no-beautify
<div *!*oncopy="alert('¡Copiado prohibido!');return false"*/!*>
  Querido usuario,
  El copiado está prohibida para ti.
  Si sabes JS o HTML entonces puedes obtener todo de la fuente de la página.
</div>
```
Si intenta copiar un fragmento de texto en el `<div>` no va a funcionar porque la acción default de `oncopy` fue evitada.

<<<<<<< HEAD
Seguramente el usuario tiene acceso a la fuente HTML de la página, y puede tomar el contenido desde allí, pero no todos saben cómo hacerlo.
=======
Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
````

## Resumen

Los eventos del mouse tienen las siguientes propiedades:

<<<<<<< HEAD
- Botón: `button`.
- Teclas modificadoras (`true` si fueron presionadas): `altKey`, `ctrlKey`, `shiftKey` y `metaKey` (Mac).
  - Si quieres controlar las acciones de la tecla `key:Ctrl` no te olvides de los usuarios de Mac que generalmente usan `key:Cmd`, de manera que es mejor ferificar con la condicional: `if (e.metaKey || e.ctrlKey)`.
=======
- Button: `button`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

- Coordenadas relativas a la ventana: `clientX/clientY`.
- Coordenadas relativas al documento: `pageX/pageY`.

<<<<<<< HEAD
La acción predeterminada del navegador `mousedown` es la selección del texto, si no es bueno para la interfaz, entonces debe evitarse.

En el próximo capítulo veremos más detalles sobre los eventos que siguen al movimiento del puntero y cómo rastrear los cambios de elementos debajo de él.
=======
The default browser action of `mousedown` is text selection, if it's not good for the interface, then it should be prevented.

In the next chapter we'll see more details about events that follow pointer movement and how to track element changes under it.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
