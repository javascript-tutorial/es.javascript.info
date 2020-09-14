# Envío de eventos personalizados

No solo podemos asignar controladores, sino también generar eventos desde JavaScript.

<<<<<<< HEAD
Los eventos personalizados se pueden utilizar para crear "componentes gráficos". Por ejemplo, un elemento raíz de nuestro propio menú basado en JS puede desencadenar eventos que indiquen lo que sucede con el menú: `abrir` (menú abierto),` seleccionar` (se selecciona un elemento) y así sucesivamente. Otro código puede escuchar los eventos y observar lo que sucede con el menú.

No solo podemos generar eventos completamente nuevos, que inventamos para nuestros propios fines, sino también eventos integrados, como `click`, `mousedown`, etc. Eso puede ser útil para las pruebas automatizadas.
=======
Custom events can be used to create "graphical components". For instance, a root element of our own JS-based menu may trigger events telling what happens with the menu: `open` (menu open), `select` (an item is selected) and so on. Another code may listen for the events and observe what's happening with the menu.

We can generate not only completely new events, that we invent for our own purposes, but also built-in ones, such as `click`, `mousedown` etc. That may be helpful for automated testing.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## Constructor de eventos

<<<<<<< HEAD
Las clases de eventos integradas forman una jerarquía, similar a las clases de elementos DOM. La raíz es la clase incorporada [Event](http://www.w3.org/TR/dom/#event).
=======
Build-in event classes form a hierarchy, similar to DOM element classes. The root is the built-in [Event](http://www.w3.org/TR/dom/#event) class.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Podemos crear objetos `Event` así:

```js
let event = new Event(type[, options]);
```

Argumentos:

<<<<<<< HEAD
- *type* -- tipo de event, un string como `"click"` o nuestro propio evento como `"mi-evento"`.
- *options* -- el objeto con 2 propiedades opcionales:
  - `bubbles: true/false` -- si es `true`, entonces el evento se propaga.
  - `cancelable: true/false` -- si es `true`, entonces la "acción predeterminada" puede ser prevenida. Más adelante veremos qué significa para los eventos personalizados.
=======
- *type* -- event type, a string like `"click"` or our own like `"my-event"`.
- *options* -- the object with two optional properties:
  - `bubbles: true/false` -- if `true`, then the event bubbles.
  - `cancelable: true/false` -- if `true`, then the "default action"  may be prevented. Later we'll see what it means for custom events.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

  Por defecto, los dos son false: `{bubbles: false, cancelable: false}`.

## dispatchEvent

<<<<<<< HEAD
Después de que se crea un objeto de evento, debemos "ejecutarlo" en un elemento usando la llamada `elem.dispatchEvent(event)`.

Luego, los controladores reaccionan como si fuera un evento normal del navegador. Si el evento fue creado con la bandera `bubbles`, entonces se propaga.
=======
After an event object is created, we should "run" it on an element using the call `elem.dispatchEvent(event)`.

Then handlers react on it as if it were a regular browser event. If the event was created with the `bubbles` flag, then it bubbles.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

En el siguiente ejemplo, el evento `click` se inicia en JavaScript. El controlador funciona de la misma manera que si se hiciera clic en el botón:

```html run no-beautify
<button id="elem" onclick="alert('Clic!');">Click automático</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```smart header="event.isTrusted"
Hay una forma de diferenciar un evento de usuario "real" de uno generado por script.

La propiedad `event.isTrusted` es `true` para eventos que provienen de acciones de usuarios reales y `false` para eventos generados por script.
```

## Ejemplo de Bubbling

Podemos crear un evento bubbling con el nombre `"hello"` y capturarlo en `document`.

Todo lo que necesitamos es establecer `bubbles` en `true`:

```html run no-beautify
<h1 id="elem">Hola desde el script!</h1>

<script>
  // Captura en document...
  document.addEventListener("hello", function(event) { // (1)
    alert("Hola desde " + event.target.tagName); // Hola desde H1
  });

  // ...Envío en elem!
  let event = new Event("hello", {bubbles: true}); // (2)
  elem.dispatchEvent(event);

<<<<<<< HEAD
// el controlador del documento se activará y mostrará el mensaje.
=======
  // the handler on document will activate and display the message.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

</script>
```

<<<<<<< HEAD
=======

Notes:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Notas:

1. Debemos usar `addEventListener` para nuestros eventos personalizados, porque `on<event>` solo existe para eventos incorporados, `document.onhello` no funciona.
2. Debes poner `bubbles:true`, de otra manera el evento no se propagará.

La mecánica de bubbling es la misma para los eventos integrados (`click`) y personalizados (`hello`). También hay etapas de captura y propagación.

## MouseEvent, KeyboardEvent y otros

Aquí hay una breve lista de clases para eventos UI (interfaz de usuario) de la [especificación de eventos UI](https://www.w3.org/TR/uievents):

- `UIEvent`
- `FocusEvent`
- `MouseEvent`
- `WheelEvent`
- `KeyboardEvent`
- ...

Deberíamos usarlos en lugar de `new Event` si queremos crear tales eventos. Por ejemplo, `new MouseEvent("click")`.

El constructor correcto permite especificar propiedades estándar para ese tipo de evento.

Como `clientX/clientY` para un evento de mouse:

```js run
let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // 100
*/!*
```

Tenga en cuenta: el constructor genérico `Event` no lo permite.

Intentemos:

```js run
let event = new Event("click", {
  bubbles: true, // solo bubbles y cancelable
  cancelable: true, // funcionan en el constructor de Event
  clientX: 100,
  clientY: 100
});

*!*
alert(event.clientX); // undefined, se ignora la propiedad desconocida!
*/!*
```

Técnicamente, podemos solucionarlo asignando directamente `event.clientX=100` después de la creación. Entonces eso es una cuestión de conveniencia y de seguir las reglas. Los eventos generados por el navegador siempre tienen el tipo correcto.

<<<<<<< HEAD
La lista completa de propiedades para diferentes eventos de UI se encuentra en la especificación, por ejemplo, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).
=======
The full list of properties for different UI events is in the specification, for instance, [MouseEvent](https://www.w3.org/TR/uievents/#mouseevent).
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## Eventos personalizados

<<<<<<< HEAD
Para nuestros tipos de eventos completamente nuevos, como `"hello"`, deberíamos usar `new CustomEvent`. Técnicamente, [CustomEvent](https://dom.spec.whatwg.org/#customevent) es lo mismo que `Event`, con una excepción.
=======
For our own, completely new events types like `"hello"` we should use `new CustomEvent`. Technically [CustomEvent](https://dom.spec.whatwg.org/#customevent) is the same as `Event`, with one exception.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

En el segundo argumento (objeto) podemos agregar una propiedad adicional `detail` para cualquier información personalizada que queramos pasar con el evento.

Por ejemplo:

```html run refresh
<h1 id="elem">Hola para John!</h1>

<script>
  // detalles adicionales que vienen con el evento para el controlador.
  elem.addEventListener("hello", function(event) {
    alert(*!*event.detail.name*/!*);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
*!*
    detail: { name: "John" }
*/!*
  }));
</script>
```

La propiedad `detail` puede tener cualquier dato. Técnicamente podríamos vivir sin él, porque podemos asignar cualquier propiedad a un objeto `new Event` regular después de su creación. Pero `CustomEvent` proporciona el campo especial `detail` para evitar conflictos con otras propiedades del evento.

<<<<<<< HEAD
Además, la clase de evento describe "qué tipo de evento" es, y si el evento es personalizado, entonces deberíamos usar `CustomEvent` solo para tener claro qué es.

## event.preventDefault()

Muchos eventos del navegador tienen una "acción predeterminada", como ir a un enlace, iniciar una selección, etc.

Para eventos nuevos y personalizados, definitivamente no hay acciones predeterminadas del navegador, pero un código que distribuye dicho evento puede tener sus propios planes de qué hacer después de activar el evento.

Al llamar a `event.preventDefault()`, un controlador de eventos puede enviar una señal de que esas acciones deben cancelarse.

En ese caso, la llamada a `elem.dispatchEvent(event)` devuelve `false`. Y el código que lo envió sabe que no debería continuar.

Veamos un ejemplo práctico: un conejo escondido (podría ser un menú de cierre u otra cosa).

A continuación puede ver una función `#rabbit` y `hide()` que distribuye el evento `"hide"` en él, para que todas las partes interesadas sepan que el conejo se va a esconder.

Cualquier controlador puede escuchar ese evento con `rabbit.addEventListener('hide', ...)` y, si es necesario, cancelar la acción usando `event.preventDefault()`. Entonces el conejo no desaparecerá:
=======
Besides, the event class describes "what kind of event" it is, and if the event is custom, then we should use `CustomEvent` just to be clear about what it is.

## event.preventDefault()

Many browser events have a "default action", such as navigating to a link, starting a selection, and so on.

For new, custom events, there are definitely no default browser actions, but a code that dispatches such event may have its own plans what to do after triggering the event.

By calling `event.preventDefault()`, an event handler may send a signal that those actions should be canceled.

In that case the call to `elem.dispatchEvent(event)` returns `false`. And the code that dispatched it knows that it shouldn't continue.

Let's see a practical example - a hiding rabbit (could be a closing menu or something else).

Below you can see a `#rabbit` and `hide()` function that dispatches `"hide"` event on it, to let all interested parties know that the rabbit is going to hide.

Any handler can listen for that event with `rabbit.addEventListener('hide',...)` and, if needed, cancel the action using `event.preventDefault()`. Then the rabbit won't disappear:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```html run refresh autorun
<pre id="rabbit">
  |\   /|
   \|_|/
   /. .\
  =\_Y_/=
   {>o<}
</pre>
<<<<<<< HEAD
<button onclick="hide()">Esconder()</button>

<script>
  // hide() será llamado automáticamente en 2 segundos.
=======
<button onclick="hide()">Hide()</button>

<script>
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // sin esa bandera preventDefault no funciona
    });
    if (!rabbit.dispatchEvent(event)) {
<<<<<<< HEAD
      alert('La acción fue impedida por un controlador');
=======
      alert('The action was prevented by a handler');
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("¿Llamar a preventDefault?")) {
      event.preventDefault();
    }
  });
</script>
```

<<<<<<< HEAD
Tenga en cuenta: el evento debe tener la bandera `cancelable: true`, de lo contrario, la llamada `event.preventDefault()` se ignora.
=======
Please note: the event must have the flag `cancelable: true`, otherwise the call `event.preventDefault()` is ignored.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## Los eventos dentro de eventos son sincrónicos

<<<<<<< HEAD
Por lo general, los eventos se procesan en una cola. Es decir: si el navegador está procesando `onclick` y ocurre un nuevo evento, por ejemplo, con el mouse movido, luego su despacho se pone en cola, los controladores correspondientes `mousemove` serán llamados después de que el procesamiento de `onclick` haya terminado.

La excepción notable es cuando un evento se inicia desde dentro de otro, por ejemplo, usando `dispatchEvent`. Dichos eventos se procesan inmediatamente: se llaman los nuevos controladores de eventos y luego se reanuda el manejo de eventos actual.

Por ejemplo, en el código siguiente, el evento `menu-open` se activa durante el `onclick`.

Se procesa inmediatamente, sin esperar a que termine el controlador `onclick`:


```html run autorun
<button id="menu">Menu (dame clic)</button>
=======
Usually events are processed in a queue. That is: if the browser is processing `onclick` and a new event occurs, e.g. mouse moved, then it's handling is queued up, corresponding `mousemove` handlers will be called after `onclick` processing is finished.

The notable exception is when one event is initiated from within another one, e.g. using `dispatchEvent`. Such events are processed immediately: the new event handlers are called, and then the current event handling is resumed.

For instance, in the code below the `menu-open` event is triggered during the `onclick`.

It's processed immediately, without waiting for `onclick` handler to end:


```html run autorun
<button id="menu">Menu (click me)</button>
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

<script>
  menu.onclick = function() {
    alert(1);

    menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    }));

    alert(2);
  };

<<<<<<< HEAD
  // se dispara entre 1 y 2
  document.addEventListener('menu-open', () => alert('anidado'));
</script>
```

El orden de salida es: 1 -> anidado -> 2.

Tenga en cuenta que el evento anidado `menu-open` se captura en `document`. La propagación y el manejo del evento anidado finaliza antes de que el procesamiento vuelva al código externo (`onclick`).

No se trata solo de `dispatchEvent`, hay otros casos. Si un controlador de eventos llama a métodos que desencadenan otros eventos, también se procesan sincrónicamente, de forma anidada.

Digamos que no nos gusta. Querríamos que `onclick` se procesara por completo primero, independientemente de `menu-open` o cualquier otro evento anidado.

Entonces podemos poner el `dispatchEvent` (u otra llamada de activación de eventos) al final de `onclick` o, mejor aún, envolverlo en el `setTimeout` de retardo cero:
=======
  // triggers between 1 and 2
  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

The output order is: 1 -> nested -> 2.

Please note that the nested event `menu-open` is caught on the `document`. The propagation and handling of the nested event is finished before the processing gets back to the outer code (`onclick`).

That's not only about `dispatchEvent`, there are other cases. If an event handler calls methods that trigger other events -- they are processed synchronously too, in a nested fashion.

Let's say we don't like it. We'd want `onclick` to be fully processed first, independently from `menu-open` or any other nested events.

Then we can either put the `dispatchEvent` (or another event-triggering call) at the end of `onclick` or, maybe better, wrap it in the zero-delay `setTimeout`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```html run
<button id="menu">Menu (dame clic)</button>

<script>
  menu.onclick = function() {
    alert(1);

    setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
      bubbles: true
    })));

    alert(2);
  };

<<<<<<< HEAD
  document.addEventListener('menu-open', () => alert('anidado'));
</script>
```

Entonces podemos poner el `dispatchEvent` (u otra llamada de activación de eventos) al final de `onclick` o, mejor aún, envolverlo en el `setTimeout` de retardo cero:

El orden de salida se convierte en: 1 -> 2 -> anidado.
=======
  document.addEventListener('menu-open', () => alert('nested'));
</script>
```

Now `dispatchEvent` runs asynchronously after the current code execution is finished, including `mouse.onclick`, so event handlers are totally separate.

The output order becomes: 1 -> 2 -> nested.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## Resumen

<<<<<<< HEAD
Para generar un evento a partir del código, primero necesitamos crear un objeto de evento.

El constructor genérico `Event(name, options)` acepta un nombre de evento arbitrario y el objeto `options` con dos propiedades:
- `bubbles: true` si el evento debe propagarse.
- `cancelable: true` si `event.preventDefault()` debe funcionar.
=======
To generate an event from code, we first need to create an event object.

The generic `Event(name, options)` constructor accepts an arbitrary event name and the `options` object with two properties:
- `bubbles: true` if the event should bubble.
- `cancelable: true` if the `event.preventDefault()` should work.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Otros constructores de eventos nativos como `MouseEvent`, `KeyboardEvent`, y similares, aceptan propiedades específicas para ese tipo de evento. Por ejemplo, `clientX` para eventos de mouse.

Para eventos personalizados deberíamos usar el constructor `CustomEvent`. Este tiene una opción adicional llamada `detail` a la que podemos asignarle los datos específicos del evento. De esta forma, todos los controladores pueden accederlos como `event.detail`.

<<<<<<< HEAD
A pesar de la posibilidad técnica de generar eventos del navegador como `click` o `keydown`, debemos usarlo con mucho cuidado.

No deberíamos generar eventos de navegador, ya que es una forma trillada de ejecutar controladores. Esa es una mala arquitectura la mayor parte del tiempo.
=======
Despite the technical possibility of generating browser events like `click` or `keydown`, we should use them with great care.

We shouldn't generate browser events as it's a hacky way to run handlers. That's bad architecture most of the time.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Se pueden generar eventos nativos:

- Como un truco sucio para hacer que las bibliotecas de terceros funcionen de la manera necesaria, si  es que ellas no proporcionan otros medios de interacción.
- Para pruebas automatizadas, que el script "haga clic en el botón" y vea si la interfaz reacciona correctamente.

Los eventos personalizados con nuestros propios nombres a menudo se generan con fines arquitectónicos, para señalar lo que sucede dentro de nuestros menús, controles deslizantes, carruseles, etc.
