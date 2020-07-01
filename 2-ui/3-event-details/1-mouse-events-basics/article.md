# Eventos del Mouse

En este capítulo vamos a entrar en más detalles sobre los eventos del mouse y sus propiedades.

Ten en cuenta que tales eventos pueden provenir no sólo del "dispositivo mouse", sino también de otros dispositivos, como teléfonos y tabletas, donde se emulan por compatibilidad.

## Tipos de eventos del mouse

Ya hemos visto algunos de estos eventos:

`mousedown/mouseup`
: Se oprime/suelta el botón del ratón sobre un elemento.

`mouseover/mouseout`
: El puntero del mouse se mueve sobre/sale de un elemento.

`mousemove`
: Cualquier movimiento del mouse sobre un elemento activa el evento.

`click`
: Se activa después de `mousedown` y un `mouseup` enseguida sobre el mismo elemeto si se usó el botón.

`dblclick`
: Se activa después de dos clicks seguidos sobre el mismo elemento. Hoy en día se usa raramente.

`contextmenu`
: Se activa al pulsar el botón derecho del ratón. Existen otras formas de abrir el menú contextual, por ejemplo: usando un comando especial de teclado también puede activarse, de manera que no es exactamente un evento exclusivo del mouse.

...Existen otros eventos más que cubriremos más tarde.

## El orden de los eventos

Como pudiste ver en la lista anterior, una acción del usuario puede desencadenar varios eventos.

Por ejemlo , un click izquierdo primero activa `mousedown`cuando se presiona el botón, enseguida `mouseup` y `click` cuando se suelta.

En casos así, el orden es fijo. Es decir, los controladores son llamados en el siguiente orden `mousedown` -> `mouseup` -> `click`. 

```online
Haz click en el botón abajo y verás los eventos. Intenta con doble click también.

En el testeador de abajo todos los eventos quedan registrados. Si hay mas de un segundo de retraso entre cada uno de ellos quedan separados por una regla horizontal.

Además podemos ver la propiedad de `button` que nos permite detectar el botón del mouse. Lo explicaremos a continuación.

<input onmousedown="return logMouse(event)" onmouseup="return logMouse(event)" onclick="return logMouse(event)" oncontextmenu="return logMouse(event)" ondblclick="return logMouse(event)" value="Haz click sobre mí con el botón izquierdo o derecho del mouse" type="button"> <input onclick="logClear('test')" value="Clear" type="button"> <form id="testform" name="testform"> <textarea style="font-size:12px;height:150px;width:360px;"></textarea></form>
```

## El botón del mouse

Los eventos relacionados con clics siempre tienen la propiedad `button`, esta nos permite conocer el boton exacto del mouse.

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

```warn header="El obsoleto `event.which`"
El código puede utilizar la propiedad `event.which` que es una forma antigua no estándar de obtener un botón con los valores posibles:

- `event.which == 1` – botón izquierdo,
- `event.which == 2` – botón central,
- `event.which == 3` – botón derecho.

A partir de ahora `event.which` is deprecatedestá en desuso, no deberíamos usarlo.
```

## Modificadores: shift, alt, ctrl y meta

Todos los eventos del mouse incluyen la información sobre las teclas modificadoras presionadas.

Propiedades del evento:

- `shiftKey`: `key:Shift`
- `altKey`: `key:Alt` (p `key:Opt` para Mac)
- `ctrlKey`: `key:Ctrl`
- `metaKey`: `key:Cmd` para Mac

Su valor es `true` si la tecla fue presionada durante el evento.

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

```warn header="Atención: en Mac suele ser `Cmd` en lugar de `Ctrl`"
En Windows y Linux existen las teclas modificadoras `key:Alt`, `key:Shift` y `key:Ctrl`. En Mac hay una más: `key:Cmd`, correspondiente a la propiedad `metaKey`.

En la mayoría de las aplicaciones, cuando Windows/Linux usan `key:Ctrl`, en Mac se usa `key:Cmd`.

Es decir: cuando un usuario de Windows usa `key:Ctrl+Enter` o `key:Ctrl+A`, un usuario Mac presionaría `key:Cmd+Enter` o `key:Cmd+A`, y así sucesivamente.

Entonces si queremos darle soporte a combinaciones como `key:Ctrl`+click, entonces para Mac tendría más sentido usar `key:Cmd`+click. Esto es más cómodo para los usuarios de Mac.

Incluso si quisieramos obligar a los usuarios de Mac a hacer `key:Ctrl`+click -- esto supone algo de dificultad. El problema es que: un click izquierdo con `key:Ctrl` es intrepetado como  *click derecho* en MacOS, y esto genera un evento `contextmenu`, no un `click` como en Windows/Linux.

Así que si queremos que los usuarios de todos los sistemas operativos se sientan cómodos, entonces junto con `ctrlKey` debemos verificar `metaKey`.

Para código JS  signidica que debemos hacer la comprobación `if (event.ctrlKey || event.metaKey)`.
```

```warn header="También hay dispositivos móviles"
Las combinaciones de teclado son buenas como una adición al flujo de trabajo. De modo que si el visitante usa un teclado -- funcionan. 

Pero si su dispositivo no lo tiene -- entonces debería haber una manera de vivir sin teclas modificadoras.

```

## Coordenadas: clientX/Y, pageX/Y

Todos los eventos del ratón proporcionan coordenadas en dos sabores:

1. Relativas a la ventana: `clientX` y `clientY`.
2. Relativos al documento: `pageX` y `pageY`.

Ya cubrimos la diferencia entre ellos en el capítulo <info:coordinates>.

En resumen, las coordenadas relativas al documento `pageX/Y`se cuentan desde la esquina superior izquierda del documento y no cambian cuando se desplaza la página, mientras que `clientX/Y` se cuentan desde la esquina superior actual. Cambian cuando se desplaza la página.

Por ejemplo, si tenemos una ventana del tamaño 500x500, y el mouse está en la esquina superior izquierda, entonces `clientX` y `clientY` son `0`, sin importar cómo se desplace la página. 

Y si el mouse está en el centro, entonces `clientX` y `clientY` son `250`, No importa en eque parte del documento se encuentren. Esto es similar a `position:fixed` en ese aspecto.

````online
Mueve el mouse sobre el campo de entrada para ver `clientX/clientY` (el ejemplo está dentro del `iframe`, así que las coordenadas son relativas al `iframe`):

```html autorun height=50
<input onmousemove="this.value=event.clientX+':'+event.clientY" value="Pasa el mouse sobre mí">
```
````

## Prevención de selección en mousedown

El doble clic del mouse tiene un efecto secundario que puede ser molesto en algunas interfaces: selecciona texto.

Por ejemplo, un doble clic en el texto de abajo lo selecciona además de activar nuestro controlador:

```html autorun height=50
<span ondblclick="alert('dblclick')">Haz doble click en mi</span>
```

Si se pulsa el botón izquierdo del ratón y, sin soltarlo, mueve el ratón, también hace la selección, a menudo no deseado.

Hay varias maneras de evitar la selección, que se pueden leer en el capítulo <info:selection-range>.

In this particular case the most reasonable way is to prevent the browser action on `mousedown`. It prevents both these selections:

```html autorun height=50
Before...
<b ondblclick="alert('Click!')" *!*onmousedown="return false"*/!*>
  Double-click me
</b>
...After
```

Now the bold element is not selected on double clicks, and pressing the left button on it won't start the selection.

Please note: the text inside it is still selectable. However, the selection should start not on the text itself, but before or after it. Usually that's fine for users.

````smart header="Preventing copying"
If we want to disable selection to protect our page content from copy-pasting, then we can use another event: `oncopy`.

```html autorun height=80 no-beautify
<div *!*oncopy="alert('Copying forbidden!');return false"*/!*>
  Dear user,
  The copying is forbidden for you.
  If you know JS or HTML, then you can get everything from the page source though.
</div>
```
If you try to copy a piece of text in the `<div>`, that won't work, because the default action `oncopy` is prevented.

Surely the user has access to HTML-source of the page, and can take the content from there, but not everyone knows how to do it.
````

## Summary

Mouse events have the following properties:

- Button: `button`.
- Modifier keys (`true` if pressed): `altKey`, `ctrlKey`, `shiftKey` and `metaKey` (Mac).
  - If you want to handle `key:Ctrl`, then don't forget Mac users, they usually use `key:Cmd`, so it's better to check `if (e.metaKey || e.ctrlKey)`.

- Window-relative coordinates: `clientX/clientY`.
- Document-relative coordinates: `pageX/pageY`.

The default browser action of `mousedown` is text selection, if it's not good for the interface, then it should be prevented.

In the next chapter we'll see more details about events that follow pointer movement and how to track element changes under it.
