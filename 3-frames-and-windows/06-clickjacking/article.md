# El ataque de secuestro de clics

El ataque "secuestro de clics" permite que una página maligna haga clic en un "sitio víctima" * en nombre del visitante *.

Muchos sitios fueron pirateados de esta manera, incluidos Twitter, Facebook, Paypal y otros sitios. Todos han sido arreglados, por supuesto.

## La idea

La idea es muy simple.

Así es como se hizo el secuestro de clics con Facebook:

1. Un visitante es atraído a la página maligna. No importa cómo.
2. La página tiene un enlace de apariencia inofensiva (como "hazte rico ahora" o "haz clic aquí, muy divertido").
3. Sobre ese enlace, la página maligna coloca un `<iframe>` transparente con `src` de facebook.com, de tal manera que el botón" Me gusta "está justo encima de ese enlace. Por lo general, eso se hace con `z-index`.
4. Al intentar hacer clic en el enlace, el visitante de hecho hace clic en el botón.

## La demostración

Así es como se ve la página malvada. Para aclarar las cosas, el `<iframe>` es semitransparente (en las páginas realmente malvadas es completamente transparente):

```html run height=120 no-beautify
<style>
iframe { /* iframe del sitio de la víctima */
  width: 400px;
  height: 100px;
  position: absolute;
  top:0; left:-20px;
*!*
  opacity: 0.5; /* realmente opacity:0 */
*/!*
  z-index: 1;
}
</style>

<div>Haga clic para hacerse rico ahora:</div>

<!-- La URL del sitio de la víctima -->
*!*
<iframe src="/clickjacking/facebook.html"></iframe>

<button>¡Haga clic aquí!</button>
*/!*

<div>...Y eres genial (en realidad soy un pirata informático genial)!</div>
```

La demostración completa del ataque:

[codetabs src="clickjacking-visible" height=160]

Aquí tenemos un `<iframe src="facebook.html">` semitransparente, y en el ejemplo podemos verlo flotando sobre el botón. Un clic en el botón realmente hace clic en el iframe, pero eso no es visible para el usuario, porque el iframe es transparente.

Como resultado, si el visitante está autorizado en Facebook ("recordarme" generalmente está activado), entonces agrega un "Me gusta". En Twitter sería un botón "Seguir".

Este es el mismo ejemplo, pero más cercano a la realidad, con `opacity:0` para `<iframe>`:

[codetabs src="clickjacking" height=160]

Todo lo que necesitamos para atacar es colocar el `<iframe>` en la página maligna de tal manera que el botón esté justo sobre el enlace. De modo que cuando un usuario hace clic en el enlace, en realidad hace clic en el botón. Eso suele ser posible con CSS.

```smart header="Clickjacking es para clics, no para teclado"
El ataque solo afecta las acciones del mouse (o similares, como los toques en el móvil).

La entrada del teclado es muy difícil de redirigir. Técnicamente, si tenemos un campo de texto para piratear, entonces podemos colocar un iframe de tal manera que los campos de texto se superpongan entre sí. Entonces, cuando un visitante intenta concentrarse en la entrada que ve en la página, en realidad se enfoca en la entrada dentro del iframe.

Pero luego hay un problema. Todo lo que escriba el visitante estará oculto, porque el iframe no es visible.

Las personas generalmente dejarán de escribir cuando no puedan ver sus nuevos caracteres impresos en la pantalla.
```

## Defensas de la vieja escuela (débiles)

La defensa más antigua es un poco de JavaScript que prohíbe abrir la página en un marco (el llamado "framebusting").

Eso se ve así:

```js
if (top != window) {
  top.location = window.location;
}
```

Es decir: si la ventana descubre que no está en la parte superior, automáticamente se convierte en la parte superior.

Esta no es una defensa confiable, porque hay muchas formas de esquivarla. Cubramos algunas.

### Bloquear la navegación superior

Podemos bloquear la transición causada por cambiar `top.location` en el controlador de eventos [beforeunload](info:onload-ondomcontentloaded#window.onbeforeunload).

La página superior (adjuntando una, que pertenece al pirata informático) establece un controlador de prevención, como este:

```js
window.onbeforeunload = function() {
  return false;
};
```

Cuando el `iframe` intenta cambiar `top.location`, el visitante recibe un mensaje preguntándole si quiere irse.

En la mayoría de los casos, el visitante respondería negativamente porque no conocen el iframe; todo lo que pueden ver es la página superior, no hay razón para irse. ¡Así que `top.location` no cambiará!

En acción:

[codetabs src="top-location"]

### Atributo Sandbox

Una de las cosas restringidas por el atributo `sandbox` es la navegación. Un iframe de espacio aislado no puede cambiar `top.location`.

Entonces podemos agregar el iframe con `sandbox="allow-scripts allow-forms"`. Eso relajaría las restricciones, permitiendo guiones y formularios. Pero omitimos `allow-top-navigation` para que se prohíba cambiar `top.location`.

Aquí está el código:

```html
<iframe *!*sandbox="allow-scripts allow-forms"*/!* src="facebook.html"></iframe>
```

También hay otras formas de evitar esa simple protección.

## X-Frame-Options

El encabezado del lado del servidor `X-Frame-Options` puede permitir o prohibir mostrar la página dentro de un marco.

Debe enviarse exactamente como encabezado HTTP: el navegador lo ignorará si se encuentra en la etiqueta HTML `<meta>`. Entonces, `<meta http-equiv="X-Frame-Options"...>` no hará nada.

El encabezado puede tener 3 valores:


`DENY`
: Nunca muestra la página dentro de un marco.

`SAMEORIGIN`
: Permitir dentro de un marco si el documento principal proviene del mismo origen.

`ALLOW-FROM domain`
: Permitir dentro de un marco si el documento principal es del dominio dado.

Por ejemplo, Twitter usa `X-Frame-Options: SAMEORIGIN`.

````online
Aquí está el resultado:

```html
<iframe src="https://twitter.com"></iframe>
```

<!-- ebook: prerender / chrome headless muere y se termina su tiempo de espera en este iframe -->
<iframe src="https://twitter.com"></iframe>

Dependiendo de su navegador, el `iframe` anterior está vacío o le advierte que el navegador no permitirá que esa página navegue de esta manera.
````

## Mostrando con funcionalidad deshabilitada

El encabezado `X-Frame-Options` tiene un efecto secundario. Otros sitios no podrán mostrar nuestra página en un marco, incluso si tienen buenas razones para hacerlo.

Así que hay otras soluciones... Por ejemplo, podemos "cubrir" la página con un `<div>` con estilos `height: 100%; width: 100%;`, de modo que interceptará todos los clics. Ese `<div>` debe eliminarse si `window == top` o si descubrimos que no necesitamos la protección.

Algo como esto:

```html
<style>
  #protector {
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 99999999;
  }
</style>

<div id="protector">
  <a href="/" target="_blank">Ir al sitio</a>
</div>

<script>
  // habrá un error si la ventana superior es de un origen diferente
  // pero esta bien aqui
  if (top.document.domain == document.domain) {
    protector.remove();
  }
</script>
```

La demostración:

[codetabs src="protector"]

## Atributo Samesite cookie

El atributo `samesite` cookie también puede prevenir ataques de secuestro de clics.

Una cookie con dicho atributo solo se envía a un sitio web si se abre directamente, no a través de un marco o de otra manera. Más información en el capítulo <info:cookie#samesite>.

Si el sitio, como Facebook, tenía el atributo `samesite` en su cookie de autenticación, así:

```
Set-Cookie: authorization=secret; samesite
```

...Entonces dicha cookie no se enviaría cuando Facebook esté abierto en iframe desde otro sitio. Entonces el ataque fracasaría.

El atributo `samesite` cookie no tendrá efecto cuando no se utilicen cookies. Esto puede permitir que otros sitios web muestren fácilmente nuestras páginas públicas no autenticadas en iframes.

Sin embargo, esto también puede permitir que los ataques de secuestro de clics funcionen en algunos casos limitados. Un sitio web de sondeo anónimo que evita la duplicación de votaciones al verificar las direcciones IP, por ejemplo, aún sería vulnerable al secuestro de clics porque no autentica a los usuarios que usan cookies.

## Resumen

El secuestro de clics es una forma de "engañar" a los usuarios para que hagan clic en el sitio de una víctima sin siquiera saber qué está sucediendo. Eso es peligroso si hay acciones importantes activadas por clic.

Un pirata informático puede publicar un enlace a su página maligna en un mensaje o atraer visitantes a su página por otros medios. Hay muchas variaciones.

Desde una perspectiva, el ataque "no es profundo": todo lo que hace un pirata informático es interceptar un solo clic. Pero desde otra perspectiva, si el pirata informático sabe que después del clic aparecerá otro control, entonces pueden usar mensajes astutos para obligar al usuario a hacer clic en ellos también.

El ataque es bastante peligroso, porque cuando diseñamos la interfaz de usuario generalmente no anticipamos que un pirata informático pueda hacer clic en nombre del visitante. Entonces, las vulnerabilidades se pueden encontrar en lugares totalmente inesperados.

- Se recomienda utilizar `X-Frame-Options: SAMEORIGIN` en páginas (o sitios web completos) que no están destinados a verse dentro de marcos.
- Usa una cubierta `<div>` si queremos permitir que nuestras páginas se muestren en iframes, pero aún así permanecer seguras.
