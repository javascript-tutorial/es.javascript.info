# Acciones predeterminadas del navegador

Muchos eventos conducen automáticamente a determinadas acciones realizadas por el navegador.

Por ejemplo:

- Un clic en un enlace: inicia la navegación a su URL.
- Un clic en el botón de envío de un formulario inicia su envío al servidor.
- Al presionar un botón del ratón sobre un texto y moverlo, se selecciona el texto.

Si manejamos un evento en JavaScript, es posible que no queramos que suceda la acción correspondiente del navegador e implementar en cambio otro comportamiento.

## Evitar las acciones del navegador

Hay dos formas de decirle al navegador que no queremos que actúe:

- La forma principal es utilizar el objeto `event`. Hay un método `event.preventDefault()`.
- Si el controlador se asigna usando `on<event>` (no por `addEventListener`), entonces devolver `false` también funciona igual.

En este HTML, un clic en un enlace no conduce a la navegación. El navegador no hace nada:

```html autorun height=60 no-beautify
<a href="/" onclick="return false">Haz clic aquí</a>
o
<a href="/" onclick="event.preventDefault()">aquí</a>
```

En el siguiente ejemplo usaremos esta técnica para crear un menú basado en JavaScript.

```warn header="Regresar `false` desde un controlador es una excepción"
El valor devuelto por un controlador de eventos generalmente se ignora.

La única excepción es `return false` de un controlador asignado usando `on<event>`.

En todos los demás casos, se ignora el valor `return`. En particular, no tiene sentido devolver `true`.
```

### Ejemplo: el menú

Considere un menú de sitio, como este:

```html
<ul id="menu" class="menu">
  <li><a href="/html">HTML</a></li>
  <li><a href="/javascript">JavaScript</a></li>
  <li><a href="/css">CSS</a></li>
</ul>
```

Así es como se ve con algo de CSS:

[iframe height=70 src="menu" link edit]

Los elementos del menú se implementan como enlaces HTML `<a>`, no como botones `<botón>`. Hay varias razones para hacerlo, por ejemplo:

- A muchas personas les gusta usar "clic derecho" -- "abrir en una nueva ventana". Si usamos `<button>` o `<span>`, eso no funciona.
- Los motores de búsqueda siguen los enlaces `<a href="...">` durante la indexación.

Entonces usamos `<a>` en el markup. Pero normalmente pretendemos manejar clics en JavaScript. Por tanto, deberíamos evitar la acción predeterminada del navegador.

Como aquí:

```js
menu.onclick = function(event) {
  if (event.target.nodeName != 'A') return;

  let href = event.target.getAttribute('href');
  alert( href ); // ...se puede cargar desde el servidor, generación de interfaz de usuario, etc.

*!*
  return false; // evitar la acción del navegador (no vaya a la URL)
*/!*
};
```

Si omitimos `return false`, luego de ejecutar nuestro código el navegador realizará su "acción predeterminada": navegar a la URL en `href`. Y no lo necesitamos aquí, ya que estamos manejando el clic nosotros mismos.

Por cierto, usar la delegación de eventos aquí hace que nuestro menú sea muy flexible. Podemos agregar listas anidadas y diseñarlas usando CSS para "deslizarlas hacia abajo".

````smart header="Eventos de seguimiento"
Ciertos eventos fluyen unos a otros. Si evitamos el primer evento, no habrá segundo.

Por ejemplo, `mousedown` en un campo `<input>` conduce a enfocarse en él, y al evento `focus`. Si evitamos el evento `mousedown`, no hay enfoque.

Intenta hacer clic en el primer `<input>` a continuación: se produce el evento `focus`. Pero si haces clic en el segundo, no hay enfoque.

```html run autorun
<input value="Enfoque funciona" onfocus="this.value=''">
<input *!*onmousedown="return false"*/!* onfocus="this.value=''" value="Haz clic en mí">
```

Eso es porque la acción del navegador se cancela en `mousedown`. El enfoque aún es posible si usamos otra forma de ingresar la entrada. Por ejemplo, la tecla `key:Tab` para cambiar de la primera entrada a la segunda. Pero ya no con el clic del ratón.
````

## La opción de controlador "pasivo"

La opción opcional `passive:true` de `addEventListener` indica al navegador que el controlador no llamará a `preventDefault()`.

¿Para qué podría ser necesario?

Hay algunos eventos como `touchmove` en dispositivos móviles (cuando el usuario mueve el dedo por la pantalla), que provocan el desplazamiento por defecto, pero ese desplazamiento se puede evitar usando `preventDefault()` en el controlador.

Entonces, cuando el navegador detecta tal evento, primero tiene que procesar todos los controladores, y luego, si no se llama a `preventDefault` en ninguna parte, puede continuar con el desplazamiento. Eso puede causar retrasos innecesarios y "movimientos de salto repentinos" en la interfaz de usuario.

Las opciones `passive: true` le dicen al navegador que el controlador no va a cancelar el desplazamiento. Entonces el navegador se desplaza de inmediato para brindar una experiencia con la máxima fluidez, y el evento se maneja de inmediato.

Para algunos navegadores (Firefox, Chrome), `passive` es `true` por defecto para los eventos `touchstart` y `touchmove`.


## event.defaultPrevented

La propiedad `event.defaultPrevented` es `true` si se impidió la acción predeterminada y `false` en caso contrario.

Hay un caso de uso interesante para ello.

¿Recuerdas que en el capítulo <info:bubbling-and-capturing> hablamos sobre `event.stopPropagation()` y por qué detener propagación es malo?

A veces podemos usar `event.defaultPrevented` en su lugar, para señalar a otros controladores de eventos que el evento fue manejado.

Veamos un ejemplo práctico.

Por defecto, el navegador en el evento `contextmenu` (clic derecho del ratón) muestra un menú contextual con opciones estándar. Podemos prevenirlo y mostrar el nuestro, así:

```html autorun height=50 no-beautify run
<button>El clic derecho muestra el menú contextual del navegador</button>

<button *!*oncontextmenu="alert('Dibuja nuestro menú'); return false"*/!*>
  El clic derecho muestra nuestro menú contextual
</button>
```

Ahora, además de ese menú contextual, nos gustaría implementar un menú contextual para todo el documento.

Al hacer clic derecho, debería aparecer el menú contextual más cercano.

```html autorun height=80 no-beautify run
<p>Haz clic derecho aquí para el menú contextual del documento</p>
<button id="elem">Haz clic derecho aquí para el menú contextual del botón</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menú contextual del botón");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menú contextual del documento");
  };
</script>
```

El problema es que cuando hacemos clic en `elem`, obtenemos dos menús: el de nivel de botón y (el evento emerge) el menú de nivel de documento.

¿Como arreglarlo? Una de las soluciones es pensar así: "Cuando hagamos clic con el botón derecho en el controlador de botones, detengamos su propagación" y usemos `event.stopPropagation()`:

```html autorun height=80 no-beautify run
<p>Haz clic derecho para el menú del documento</p>
<button id="elem">Haz clic derecho para el menú del botón (arreglado con event.stopPropagation)</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
*!*
    event.stopPropagation();
*/!*
    alert("Menú contextual del botón");
  };

  document.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menú contextual del documento");
  };
</script>
```

Ahora, el menú de nivel de botón funciona según lo previsto. Pero el precio es alto. Siempre negamos el acceso a la información sobre los clics con el botón derecho del ratón para cualquier código externo, incluidos los contadores que recopilan estadísticas, etc. Eso es bastante imprudente.

¿Sería una solución alternativa verificar en el controlador `document` si se evitó la acción predeterminada? Si es así, entonces se manejó el evento y no necesitamos reaccionar ante él.


```html autorun height=80 no-beautify run
<p>Haz clic con el botón derecho en el menú del documento (se agregó una marca de verificación para event.defaultPrevented)</p>
<button id="elem">Haz clic derecho para el menú de botones</button>

<script>
  elem.oncontextmenu = function(event) {
    event.preventDefault();
    alert("Menú contextual del botón");
  };

  document.oncontextmenu = function(event) {
*!*
    if (event.defaultPrevented) return;
*/!*

    event.preventDefault();
    alert("Menú contextual del documento");
  };
</script>
```

Ahora todo también funciona correctamente. Si tenemos elementos anidados, y cada uno de ellos tiene un menú contextual propio, eso también funcionaría. Solo asegúrate de buscar `event.defaultPrevented` en cada controlador de `contextmenu`.

```smart header="event.stopPropagation() y event.preventDefault()"
Como podemos ver claramente, `event.stopPropagation()` y `event.preventDefault()` (también conocido como `return false`) son dos cosas diferentes. No están relacionados entre sí.
```

```smart header="Arquitectura de menús contextuales anidados"
También hay formas alternativas de implementar menús contextuales anidados. Uno de ellos es tener un único objeto global con un manejador para `document.oncontextmenu`, y también métodos que nos permitan almacenar otros manejadores en él.

El objeto detectará cualquier clic derecho, examinará los controladores almacenados y ejecutará el apropiado.

Pero entonces cada fragmento de código que quiera un menú contextual debe conocer ese objeto y usar su ayuda en lugar del propio controlador `contextmenu`.
```

## Resumen

Hay muchas acciones predeterminadas del navegador:

- `mousedown` -- inicia la selección (mueva el ratón para seleccionar).
- `click` en `<input type="checkbox">` -- marca/desmarca el `input`.
- `submit` -- dar clic en `<input type="submit">` o presionar `key:Enter` dentro de un campo de formulario hace que suceda este evento y el navegador envía el formulario a continuación.
- `keydown` -- presionar una tecla puede llevar a agregar un carácter a un campo u otras acciones.
- `contextmenu` -- el evento ocurre con un clic derecho, la acción es mostrar el menú contextual del navegador.
- ...hay mas...

Todas las acciones predeterminadas se pueden evitar si queremos manejar el evento exclusivamente mediante JavaScript.

Para evitar una acción predeterminada, utiliza `event.preventDefault()` o `return false`. El segundo método funciona solo para los controladores asignados con `on<event>`.

La opción `passive: true` de `addEventListener` le dice al navegador que la acción no se evitará. Eso es útil para algunos eventos móviles, como `touchstart` y `touchmove`, para decirle al navegador que no debe esperar a que todos los controladores terminen antes de desplazarse.

Si se evitó la acción predeterminada, el valor de `event.defaultPrevented` se convierte en `true`, de lo contrario, es `false`.

```warn header="Mantente semántico, no abuses"
Técnicamente, al evitar acciones predeterminadas y agregar JavaScript, podemos personalizar el comportamiento de cualquier elemento. Por ejemplo, podemos hacer que un enlace `<a>` funcione como un botón, y un botón `<button>` se comporte como un enlace (redirigir a otra URL o algo así).

Pero en general deberíamos mantener el significado semántico de los elementos HTML. Por ejemplo, la navegación debe realizarla `<a>`, no un botón.

Además de ser "algo bueno", hace que su HTML sea mejor en términos de accesibilidad.

Además, si consideramos el ejemplo con `<a>`, ten en cuenta: un navegador nos permite abrir dichos enlaces en una nueva ventana (usando el botón derecho u otros medios). Y a la gente le gusta. Pero si hacemos que un botón se comporte como un enlace usando JavaScript e incluso parezca un enlace usando CSS, las características específicas de `<a>` no funcionarán en él.
```
