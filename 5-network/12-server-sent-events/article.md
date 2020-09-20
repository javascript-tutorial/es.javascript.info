# Eventos enviados por el servidor

La especificación de los [Eventos enviados por el servidor](https://html.spec.whatwg.org/multipage/comms.html#the-eventsource-interface) describe una clase incorporada `EventSource`, que mantiene la conexión con el servidor y permite recibir eventos de él.

Similar a `WebSocket`, la conexión es persistente.

Pero existen varias diferencias importantes:

| `WebSocket` | `EventSource` |
|-------------|---------------|
| Bidireccional: tanto el cliente como el servidor pueden intercambiar mensajes | Unidireccional: solo el servidor envía datos |
| Datos binarios y de texto | Solo texto |
| Protocolo WebSocket | HTTP regular |

`EventSource` es una forma menos poderosa de comunicarse con el servidor que `WebSocket`.

¿Por qué debería uno usarlo?

El motivo principal: es más sencillo. En muchas aplicaciones, el poder de `WebSocket` es demasiado.

Necesitamos recibir un flujo de datos del servidor: tal vez mensajes de chat o precios de mercado, o lo que sea. Para eso es bueno `EventSource`. También admite la reconexión automática, algo que debemos implementar manualmente con `WebSocket`. Además, es HTTP común, no un protocolo nuevo.

## Recibir mensajes

Para comenzar a recibir mensajes, solo necesitamos crear un `new EventSource(url)`.

El navegador se conectará a la `url` y mantendrá la conexión abierta, esperando eventos.

El servidor debe responder con el estado 200 y el encabezado `Content-Type:text/event-stream`, entonces mantener la conexión y escribir mensajes en el formato especial, así:

```
data: Mensaje 1

data: Mensaje 2

data: Mensaje 3
data: de dos líneas
```

- Un mensaje de texto va después de `data:`, el espacio después de los dos puntos es opcional.
- Los mensajes están delimitados con saltos de línea dobles `\n\n`.
- Para enviar un salto de línea `\n`, podemos enviar inmediatamente un `data:` (tercer mensaje arriba) más.

En la práctica, los mensajes complejos generalmente se envían codificados en JSON. Los saltos de línea están codificados así `\n` dentro de los mensajes, por lo que los mensajes `data:` multilínea no son necesarios.

Por ejemplo:

```js
data: {"user":"John","message":"Primera línea*!*\n*/!* Segunda línea"}
```

... Entonces podemos asumir que un `data:` contiene exactamente un mensaje.

Para cada uno de estos mensajes, se genera el evento `message`:

```js
let eventSource = new EventSource("/events/subscribe");

eventSource.onmessage = function(event) {
  console.log("Nuevo mensaje", event.data);
  // registrará apuntes 3 veces para el flujo de datos anterior
};

// o eventSource.addEventListener('message', ...)
```

### Solicitudes Cross-origin

`EventSource` admite solicitudes cross-origin, como `fetch` o cualquier otro método de red. Podemos utilizar cualquier URL:

```js
let source = new EventSource("https://another-site.com/events");
```

El servidor remoto obtendrá el encabezado `Origin` y debe responder con `Access-Control-Allow-Origin` para continuar.

Para pasar las credenciales, debemos configurar la opción adicional `withCredentials`, así:

```js
let source = new EventSource("https://another-site.com/events", {
  withCredentials: true
});
```

Consulte el capítulo <info:fetch-crossorigin> para obtener más detalles sobre los encabezados cross-origin.


## Reconexión

Tras la creación con `new EventSource`, el cliente se conecta al servidor y, si la conexión se interrumpe, se vuelve a conectar.

Eso es muy conveniente, ya que no tenemos que preocuparnos por eso.

Hay un pequeño retraso entre las reconexiones, unos segundos por defecto.

El servidor puede establecer la demora recomendada usando `retry:` dentro de la respuesta (en milisegundos):

```js
retry: 15000
data: Hola, configuré el retraso de reconexión en 15 segundos
```

El `retry:` puede venir junto con algunos datos, o como un mensaje independiente.

El navegador debe esperar esa cantidad de milisegundos antes de volver a conectarse. O más, por ejemplo: si el navegador sabe (desde el sistema operativo) que no hay conexión de red en este momento, puede esperar hasta que aparezca la conexión y luego volver a intentarlo.

- Si el servidor desea que el navegador deje de volver a conectarse, debería responder con el estado HTTP 204.
- Si el navegador quiere cerrar la conexión, debe llamar a `eventSource.close()`:

```js
let eventSource = new EventSource(...);

eventSource.close();
```

Además, no habrá reconexión si la respuesta tiene un `Content-Type` incorrecto o su estado HTTP difiere de 301, 307, 200 y 204. En tales casos, se emitirá el evento `"error"` y el navegador no se volverá a conectar.

```smart
Cuando una conexión finalmente se cierra, no hay forma de "reabrirla". Si queremos conectarnos de nuevo, simplemente crea un nuevo `EventSource`.
```

## ID del mensaje

Cuando una conexión se interrumpe debido a problemas de red, ninguna de las partes puede estar segura de qué mensajes se recibieron y cuáles no.

Para reanudar correctamente la conexión, cada mensaje debe tener un campo `id`, así:

```
data: Mensaje 1
id: 1

data: Mensaje 2
id: 2

data: Mensaje 3
data: de dos líneas
id: 3
```

Cuando se recibe un mensaje con `id:`, el navegador:

- Establece la propiedad `eventSource.lastEventId` a su valor.
- Tras la reconexión, el navegador envía el encabezado `Last-Event-ID` con ese `id`, para que el servidor pueda volver a enviar los siguientes mensajes.

```smart header="Pon `id:` después de `data:`"
Ten en cuenta: el `id` es adjuntado debajo del mensaje `data` por el servidor, para garantizar que `lastEventId` se actualice después de recibir el mensaje.
```

## Estado de conexión: readyState

El objeto `EventSource` tiene la propiedad `readyState`, que tiene uno de tres valores:

```js no-beautify
EventSource.CONNECTING = 0; // conectando o reconectando
EventSource.OPEN = 1;       // conectado
EventSource.CLOSED = 2;     // conexión cerrada
```

Cuando se crea un objeto, o la conexión no funciona, siempre es `EventSource.CONNECTING` (es igual a `0`).

Podemos consultar esta propiedad para conocer el estado de `EventSource`.

## Tipos de eventos

Por defecto, el objeto `EventSource` genera tres eventos:

- `message` -- un mensaje recibido, disponible como `event.data`.
- `open` -- la conexión está abierta.
- `error` -- no se pudo establecer la conexión, por ejemplo, el servidor devolvió el estado HTTP 500.

El servidor puede especificar otro tipo de evento con `event: ...` al inicio del evento.

Por ejemplo:

```
event: join
data: Bob

data: Hola

event: leave
data: Bob
```

Para manejar eventos personalizados, debemos usar `addEventListener`, no `onmessage`:

```js
eventSource.addEventListener('join', event => {
  alert(`Se unió ${event.data}`);
});

eventSource.addEventListener('message', event => {
  alert(`Dijo: ${event.data}`);
});

eventSource.addEventListener('leave', event => {
  alert(`Salió ${event.data}`);
});
```

## Ejemplo completo

Aquí está el servidor que envía mensajes con `1`, `2`, `3`, luego `bye` y cierra la conexión.

Luego, el navegador se vuelve a conectar automáticamente.

[codetabs src="eventsource"]

## Resumen

El objeto `EventSource` establece automáticamente una conexión persistente y permite al servidor enviar mensajes a través de él.

Ofrece:
- Reconexión automática, con tiempo de espera de `reintento` ajustable.
- IDs en cada mensaje para reanudar los eventos, el último identificador recibido se envía en el encabezado `Last-Event-ID` al volver a conectarse.
- El estado actual está en la propiedad `readyState`.

Eso hace que `EventSource` sea una alternativa viable a `WebSocket`, ya que es de un nivel más bajo y carece de esas características integradas (aunque se pueden implementar).

En muchas aplicaciones de la vida real, el poder de `EventSource` es suficiente.

Compatible con todos los navegadores modernos (no IE).

La sintaxis es:

```js
let source = new EventSource(url, [credentials]);
```

El segundo argumento tiene solo una opción posible: `{withCredentials: true}`, permite enviar credenciales de cross-origin.

La seguridad general de cross-origin es la misma que para `fetch` y otros métodos de red.

### Propiedades de un objeto `EventSource`

`readyState`
: El estado de conexión actual: `EventSource.CONNECTING (=0)`, `EventSource.OPEN (=1)` o `EventSource.CLOSED (=2)`.

`lastEventId`
: El último `id` recibido. Tras la reconexión, el navegador lo envía en el encabezado `Last-Event-ID`.

### Métodos

`close()`
: Cierra la conexión.

### Eventos

`message`
: Mensaje recibido, los datos están en `event.data`.

`open`
: Se establece la conexión.

`error`
: En caso de error, se incluyen tanto la pérdida de conexión (se reconectará automáticamente) como los errores fatales. Podemos comprobar `readyState` para ver si se está intentando la reconexión.

El servidor puede establecer un nombre de evento personalizado en `event:`. Tales eventos deben manejarse usando `addEventListener`, no `on<evento>`.

### Formato de respuesta del servidor

El servidor envía mensajes, delimitados por `\n\n`.

Un mensaje puede tener los siguientes campos:

- `data:` -- cuerpo del mensaje, una secuencia de múltiples `datos` se interpreta como un solo mensaje, con `\n` entre las partes.
- `id:` -- renueva `lastEventId`, enviado en el encabezado `Last-Event-ID` al volver a conectarse.
- `retry:` -- recomienda una demora de reintento para las reconexiones en milisegundos. No hay forma de configurarlo desde JavaScript.
- `event:` -- nombre del evento, debe preceder a `data:`.

Un mensaje puede incluir uno o más campos en cualquier orden, pero `id:` suele ser el último.
