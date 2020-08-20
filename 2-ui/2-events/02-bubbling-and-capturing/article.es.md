# Propagación y captura

Vamos a empezar con un ejemplo.

Este manejador está asignado a `<div>`, pero también es ejecutado si haces clic elemento anidado como `<em>` ó `<code>`:

```html autorun height=60
<div onclick="alert('The handler!')">
  <em>Si haces clic en<code>EM</code>, el manejador en <code>DIV</code> es ejecutado.</em>
</div>
```

¿No es un poco extraño? ¿Por qué el manejador en `<div>` es ejecutado, si el clic fue hecho en `<em>`?

# Propagación

El principio de propagación es simple.

**Cuando un evento ocurre en un elemento, este primero ejecuta los manejadores que tiene asignados, luego los manejadores de su padre, así hasta otros ancentros.**

Dígamos que tenemos 3 elementos anidados `FORM > DIV > P` con un manejador en cada uno de ellos:

```html run autorun
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">FORM
  <div onclick="alert('div')">DIV
    <p onclick="alert('p')">P</p>
  </div>
</form>
```

Un clic en el elemento `<p>` primero ejecuta `onclick`:
1. En ese `<p>`.
2. Luego en el `<div>` de arriba.
3. Luego en el `<form>` de más arriba.
4. Y así sucesivamente hasta el objeto `document`.

![](event-order-bubbling.svg)

Si hacemos clic en `<p>`, entonces veremos 3 alertas: `p` -> `div` -> `form`.

Este proceso se conoce como "propagación", porque los eventos "se propagan" desde el elemento más al interior a través de los padres como una burbujas en el agua.

```warn header="*Almost* all events bubble."
La palabra clave en esta frase es "casi".


Por ejemplo, un evento `focus` no se propaga. Hay otros ejemplos también, los veremos. Pero aún así, esta es la excepción a la regla, la mayoría de eventos sí se propagan.
```

## event.target

Un manejado en un elemento padre puede siempre obtener los detalles sobre dónde el evento ocurrió.

**El elemento anidado más profundo que causó el evento es llamado elemento *objetivo*, accesible como `event.target`**

Nota la diferencia de `this` (=`event.currentTarget`):

- `event.target` -- es el elemento "objetivo" que inició el evento, no cambia a través de todo el proceso de propagación.
- `this` -- es el elemento "actual", el que tiene un manejador ejecutándose en el momento.

Por ejemplo, si tenemos un solo manejador `form.onclick`, este puede `atrapar` todos los clicks dentro del formulario. No importa dónde el clic se dio, se propaga hasta el `<form>` y ejecuta el manejador.

En el manejador `form.onclick`:

- `this` (=`event.currentTarget`) es el elemento `<form>`, porque el manejador se ejecuto en él.
- `event.target` es el elemento actual dentro de el formulario al que se le dio clic.

Mira esto:

[codetabs height=220 src="bubble-target"]

Es posible que `event.target` sea igual a `this` -- ocurre cuando el clic se da directamente en el elemento `<form>`.

## Detener la propagación

Una propagación de evento va desde el elemento objetivo hacia arriba. Normalmente este continua hasta `<html>` y luego hacia el objeto `document`, algunos eventos incluso alcanzan `window`, llamando a todos los manejadores en el camino.

Pero cualquier manejador podría decidir que el evento se ha procesado por completo y detener su propagación.

El método para esto es `event.stopPropagation()`.

Por ejemplo, aquí `body.onclick` no funciona si haces clic en `<button>`:

```html run autorun height=60
<body onclick="alert(`No se propago hasta aquí`)">
  <button onclick="event.stopPropagation()">Da clic</button>
</body>
```

```smart header="event.stopImmediatePropagation()"
Si un elemento tiene multiples manejadores para un solo evento, aunque uno de ellos detenga la propagación, los demás aún se ejecutarán.

En otras palabras, `event.stopPropagation()` detiene la propagación hacia arriba, pero en el elemento actual todos los manejadores se ejecutarán.

Para detener la propagación y prevenir que los manejadores de el elemento actual se ejecuten, hay un método `event.stopImmediatePropagation()`. Después de él, ningún otro manejador será ejecutado.
```

```warn header="Don't stop bubbling without a need!"
La propagación es conveniente. No la detengas sin una necesidad real: obvia y arquitectónicamente bien pensada.

A veces `event.stopPropagation()` crea trampas ocultas que luego se convierten en problemas.

Por ejemplo:

1. Creamos un menú anidado. Cada submenú maneja los clics en sus elementos y ejecuta `stopPropagation` para que el menu de arriba no se desencadene.
2.  Luego decidimos atrapar los clic en toda la ventana, para seguir el rastro del comportamiento del usuario (donde dan clic). Algunos sistemas de análisis hacen eso. Usualmente el código usa `document.addEventListener('click'…)` para atrapar todos los clics.
3. Nuestro análisis no funcionará sobre el área dónde los clics son detenidos por `stopPropagation`. Tristemente, tenemos una "zona muerta".

Usualmente no hay una necesidad real para prevenir la propagación. Una tarea que aparentemente requiere que sea resuelto por otros medios. Uno de ellas es usar eventos personalizados, cubriremos eso más tarde. También podemos escribir nuestros datos en el objeto `event` en un manejador y leerlo en otro (manejador), para así poder pasar a los manejadores en los padres información sobre el proceso de abajo.
```

## Captura

Hay otra fase en el procesamiento de eventos llamada "captura". Es raro usarla en código real, pero a veces puede ser útil.

Los [eventos del DOM](http://www.w3.org/TR/DOM-Level-3-Events/) estándar describen 3 fases de la propagación de eventos:

1. Fase de captura -- el evento desciende al elemento.
2. Fase de objetivo -- el evento alcanza al elemento.
3. Fase de propagación -- el evento se propaga hacia arriba del elemento.

Aquí está la imagen de un clic en `<td>` dentro de una tabla, tomada desde la específicación:

![](eventflow.svg)

Eso es: por un clic en `<td>` el evento primera va a través de la cadena de ancestros hacia el elemento (fase de captura), luego alcanza el objetivo y se desendena ahí (fase de objetivo), y por último va hacia arriba (fase de propagación), ejecutando los manejadores en su camino.

**Antes solo hablamos de la propagación, porque la fase de captura es raramente usada. Normalmente es invisible a nosotros.**
