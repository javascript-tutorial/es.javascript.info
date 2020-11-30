# Animaciones CSS

<<<<<<< HEAD
Las animaciones CSS permiten hacer animaciones simples sin JavaScript en absoluto.

Se puede utilizar JavaScript para controlar la animación CSS y mejorarla con un poco de código.
=======
CSS animations make it possible to do simple animations without JavaScript at all.

JavaScript can be used to control CSS animations and make them even better, with little code.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## Transiciones CSS [#css-transition]

La idea de las transiciones CSS es simple. Describimos una propiedad y cómo se deberían animar sus cambios. Cuando la propiedad cambia, el navegador pinta la animación.

<<<<<<< HEAD
Es decir: todo lo que necesitamos es cambiar la propiedad. Y la transición fluida es realizada por el navegador.
=======
That is, all we need is to change the property, and the fluid transition will be done by the browser.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Por ejemplo, el CSS a continuación anima los cambios de `background-color` durante 3 segundos:

```css
.animated {
  transition-property: background-color;
  transition-duration: 3s;
}
```

Ahora, si un elemento tiene la clase `.animated`, cualquier cambio de `background-color` es animado durante 3 segundos.

Haz clic en el botón de abajo para animar el fondo:

```html run autorun height=60
<button id="color">Haz clic en mi</button>

<style>
  #color {
    transition-property: background-color;
    transition-duration: 3s;
  }
</style>

<script>
  color.onclick = function() {
    this.style.backgroundColor = 'red';
  };
</script>
```

Hay 4 propiedades para describir las transiciones CSS:

- `transition-property`
- `transition-duration`
- `transition-timing-function`
- `transition-delay`

<<<<<<< HEAD
Las cubriremos en un momento, por ahora tengamos en cuenta que la propiedad común `transition` permite declararlas juntas en el orden: `property duration timing-function delay`, y también animar múltiples propiedades a la vez.
=======
We'll cover them in a moment, for now let's note that the common `transition` property allows declaring them together in the order: `property duration timing-function delay`, as well as animating multiple properties at once.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Por ejemplo, este botón anima tanto `color` como `font-size`:

```html run height=80 autorun no-beautify
<button id="growing">Haz clic en mi</button>

<style>
#growing {
*!*
  transition: font-size 3s, color 2s;
*/!*
}
</style>

<script>
growing.onclick = function() {
  this.style.fontSize = '36px';
  this.style.color = 'red';
};
</script>
```

<<<<<<< HEAD
Ahora cubramos las propiedades de animación una por una.

## transition-property

En `transition-property` escribimos una lista de propiedades para animar, por ejemplo: `left`, `margin-left`, `height`, `color`.

No todas las propiedades pueden ser animadas, sí [muchas de ellas](http://www.w3.org/TR/css3-transitions/#animatable-properties-). El valor `all` significa "animar todas las propiedades".
=======
Now, let's cover animation properties one by one.

## transition-property

In `transition-property`, we write a list of properties to animate, for instance: `left`, `margin-left`, `height`, `color`. Or we could write `all`, which means "animate all properties".

Do note that, there are properties which can not be animated. However, [most of the generally used properties are animatable](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## transition-duration

En `transition-duration` podemos especificar cuánto tiempo debe durar la animación. El tiempo debe estar en [formato de tiempo CSS](http://www.w3.org/TR/css3-values/#time): en segundos `s` o milisegundos `ms`.

## transition-delay

<<<<<<< HEAD
En `transition-delay` podemos especificar el retraso *antes* de la animación. Por ejemplo, si `transition-delay: 1s`, la animación comienza después de 1 segundo tras el cambio.

Los valores negativos también son posibles. Entonces la animación comienza desde el medio. Por ejemplo, si `transition-duration` es `2s`, y el retraso es `-1s`, entonces la animación toma 1 segundo y comienza desde la mitad.

Aquí la animación cambia los números de `0` a `9` usando la propiedad CSS `translate`:
=======
In `transition-delay` we can specify the delay *before* the animation. For instance, if `transition-delay` is `1s` and `transition-duration` is `2s`, then the animation starts 1 second after the property change and the total duration will be 2 seconds.

Negative values are also possible. Then the animation is shown immediately, but the starting point of the animation will be after given value (time). For example, if `transition-delay` is `-1s` and `transition-duration` is `2s`, then animation starts from the halfway point and total duration will be 1 second. 

Here the animation shifts numbers from `0` to `9` using CSS `translate` property:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

[codetabs src="digits"]

La propiedad `transform` se anima así:

```css
#stripe.animate {
  transform: translate(-90%);
  transition-property: transform;
  transition-duration: 9s;
}
```

En el ejemplo anterior, JavaScript agrega la clase `.animate` al elemento, y comienza la animación:

```js
stripe.classList.add('animate');
```

<<<<<<< HEAD
También podemos comenzar "desde el medio", desde el número exacto, p. ej. correspondiente al segundo actual, usando el negativo `transition-delay`.
=======
We could also start it from somewhere in the middle of the transition, from an exact number, e.g. corresponding to the current second, using a negative `transition-delay`.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Aquí, si haces clic en el dígito, comienza la animación desde el segundo actual:

[codetabs src="digits-negative-delay"]

<<<<<<< HEAD
JavaScript lo hace con una línea extra:
=======
JavaScript does it with an extra line:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js
stripe.onclick = function() {
  let sec = new Date().getSeconds() % 10;
*!*
  // por ejemplo, -3s aquí comienza la animación desde el 3er segundo
  stripe.style.transitionDelay = '-' + sec + 's';
*/!*
  stripe.classList.add('animate');
};
```

## transition-timing-function

<<<<<<< HEAD
La función de temporización describe cómo se distribuye el proceso de animación a lo largo del tiempo. Comenzará lentamente y luego irá rápido o viceversa.

Es la propiedad más complicada a primera vista. Pero se vuelve muy simple si le dedicamos un poco de tiempo.

Esa propiedad acepta dos tipos de valores: una curva de Bézier o pasos. Comencemos por la curva, ya que se usa con más frecuencia.
=======
The timing function describes how the animation process is distributed along its timeline. Will it start slowly and then go fast, or vice versa.

It appears to be the most complicated property at first. But it becomes very simple if we devote a bit time to it.

That property accepts two kinds of values: a Bezier curve or steps. Let's start with the curve, as it's used more often.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

### Curva de Bézier

<<<<<<< HEAD
La función de temporización se puede establecer como una [curva de Bézier](/bezier-curve) con 4 puntos de control que satisfacen las condiciones:

1. Primer punto de control: `(0,0)`.
2. Último punto de control: `(1,1)`.
3. Para los puntos intermedios, los valores de `x` deben estar en el intervalo `0..1`, `y` puede ser cualquier cosa.
=======
The timing function can be set as a [Bezier curve](/bezier-curve) with 4 control points that satisfy the conditions:

1. First control point: `(0,0)`.
2. Last control point: `(1,1)`.
3. For intermediate points, the values of `x` must be in the interval `0..1`, `y` can be anything.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

La sintaxis de una curva de Bézier en CSS: `cubic-bezier(x2, y2, x3, y3)`. Aquí necesitamos especificar solo los puntos de control segundo y tercero, porque el primero está fijado a `(0,0)` y el cuarto es `(1,1)`.

<<<<<<< HEAD
La función de temporización determina qué tan rápido ocurre el proceso de animación a lo largo del tiempo.

- El eje `x` es el tiempo: `0` -- el momento inicial, `1` -- el último momento de `transition-duration`.
- El eje `y` especifica la finalización del proceso: `0` -- el valor inicial de la propiedad, `1` -- el valor final.
=======
The timing function describes how fast the animation process goes.

- The `x` axis is the time: `0` -- the start, `1` -- the end of `transition-duration`.
- The `y` axis specifies the completion of the process: `0` -- the starting value of the property, `1` -- the final value.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

La variante más simple es cuando la animación es uniforme, con la misma velocidad lineal. Eso puede especificarse mediante la curva `cubic-bezier(0, 0, 1, 1)`.

Así es como se ve esa curva:

![](bezier-linear.svg)

... Como podemos ver, es solo una línea recta. A medida que pasa el tiempo (`x`), la finalización (`y`) de la animación pasa constantemente de `0` a` 1`.

El tren, en el ejemplo a continuación, va de izquierda a derecha con velocidad constante (haz clic en él):

[codetabs src="train-linear"]

La `transition` de CSS se basa en esa curva:

```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, 0, 1, 1);
  /* JavaScript establece left a 450px */
}
```

... ¿Y cómo podemos mostrar un tren desacelerando?

Podemos usar otra curva de Bézier: `cubic-bezier(0.0, 0.5, 0.5, 1.0)`.

La gráfica:

![](train-curve.svg)

Como podemos ver, el proceso comienza rápido: la curva se eleva mucho, y luego más y más despacio.

Aquí está la función de temporización en acción (haz clic en el tren):

[codetabs src="train"]

CSS:
```css
.train {
  left: 0;
  transition: left 5s cubic-bezier(0, .5, .5, 1);
  /* JavaScript establece left a 450px */
}
```

Hay varias curvas incorporadas: `linear`,` ease`, `ease-in`,` ease-out` y `ease-in-out`.

<<<<<<< HEAD
La `linear` es una abreviatura de `cubic-bezier(0, 0, 1, 1) ` -- una línea recta, como ya vimos.
=======
The `linear` is a shorthand for `cubic-bezier(0, 0, 1, 1)` -- a straight line, which we described above.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Otros nombres son abreviaturas para la siguiente `cubic-bezier`:

| <code>ease</code><sup>*</sup> | <code>ease-in</code> | <code>ease-out</code> | <code>ease-in-out</code> |
|-------------------------------|----------------------|-----------------------|--------------------------|
| <code>(0.25, 0.1, 0.25, 1.0)</code> | <code>(0.42, 0, 1.0, 1.0)</code> | <code>(0, 0, 0.58, 1.0)</code> | <code>(0.42, 0, 0.58, 1.0)</code> |
| ![ease, figure](ease.svg) | ![ease-in, figure](ease-in.svg) | ![ease-out, figure](ease-out.svg) | ![ease-in-out, figure](ease-in-out.svg) |

`*` -- por defecto, si no hay una función de temporización, se utiliza `ease`.

Por lo tanto, podríamos usar `ease-out` para nuestro tren desacelerando:


```css
.train {
  left: 0;
  transition: left 5s ease-out;
  /* transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Pero se ve un poco diferente.

<<<<<<< HEAD
**Una curva de Bézier puede hacer que la animación "salte fuera" de su rango.**

Los puntos de control en la curva pueden tener cualquier coordenada `y`: incluso negativa o enorme. Entonces la curva de Bézier también saltaría muy bajo o alto, haciendo que la animación vaya más allá de su rango normal.
=======
**A Bezier curve can make the animation exceed its range.**

The control points on the curve can have any `y` coordinates: even negative or huge ones. Then the Bezier curve would also extend very low or high, making the animation go beyond its normal range.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

En el siguiente ejemplo, el código de animación es:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* JavaScript establece left a 400px */
}
```

La propiedad `left` debería animarse de `100px` a `400px`.

Pero si haces clic en el tren, verás que:

- Primero, el tren va *atrás*: `left` llega a ser menor que `100px`.
- Luego avanza, un poco más allá de `400px`.
- Y luego de vuelve a `400px`.

[codetabs src="train-over"]

<<<<<<< HEAD
¿Por qué sucede? es bastante obvio si miramos la gráfica de la curva de Bézier dada:

![](bezier-train-over.svg)

Movimos la coordenada `y` del segundo punto por debajo de cero, y para el tercer punto lo colocamos sobre `1`, de modo que la curva sale del cuadrante "regular". La `y` está fuera del rango "estándar" `0..1`.

Como sabemos, `y` mide "la finalización del proceso de animación". El valor `y = 0` corresponde al valor inicial de la propiedad e `y = 1` al valor final. Por lo tanto, los valores `y<0` mueven la propiedad por debajo del `left` inicial e `y>1` por encima del `left` final.
=======
Why it happens is pretty obvious if we look at the graph of the given Bezier curve:

![](bezier-train-over.svg)

We moved the `y` coordinate of the 2nd point below zero, and for the 3rd point we made it over `1`, so the curve goes out of the "regular" quadrant. The `y` is out of the "standard" range `0..1`.

As we know, `y` measures "the completion of the animation process". The value `y = 0` corresponds to the starting property value and `y = 1` -- the ending value. So values `y<0` move the property beyond the starting `left` and `y>1` -- past the final `left`.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Esa es una variante "suave" sin duda. Si ponemos valores `y` como `-99` y `99`, entonces el tren saltaría mucho más fuera del rango.

<<<<<<< HEAD
Pero, ¿cómo hacer la curva de Bézier para una tarea específica? Hay muchas herramientas. Por ejemplo, podemos hacerlo en el sitio <http://cubic-bezier.com/>.
=======
But how do we make a Bezier curve for a specific task? There are many tools. For instance, we can do it on the site <http://cubic-bezier.com/>.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

### Pasos

<<<<<<< HEAD
La función de temporización `steps(number of steps[, start/end])` permite dividir la animación en pasos.
=======
The timing function `steps(number of steps[, start/end])` allows splitting an animation into steps.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Veamos eso en un ejemplo con dígitos.

Aquí tenemos una lista de dígitos, sin animaciones, solo como fuente:

[codetabs src="step-list"]

Haremos que los dígitos aparezcan de manera discreta haciendo invisible la parte de la lista fuera de la "ventana" roja y desplazando la lista a la izquierda con cada paso.

Habrá 9 pasos, un paso para cada dígito:

```css
#stripe.animate  {
  transform: translate(-90%);
  transition: transform 9s *!*steps(9, start)*/!*;
}
```

En acción:

[codetabs src="step"]

El primer argumento de `steps(9, start)` es el número de pasos. La transformación se dividirá en 9 partes (10% cada una). El intervalo de tiempo también se divide automáticamente en 9 partes, por lo que `transition: 9s` nos da 9 segundos para toda la animación: 1 segundo por dígito.

El segundo argumento es una de dos palabras: `start` o `end`.

El `start` significa que al comienzo de la animación debemos hacer el primer paso de inmediato.

Podemos observar eso durante la animación: cuando hacemos clic en el dígito, cambia a `1` (el primer paso) inmediatamente, y luego cambia al comienzo del siguiente segundo.

El proceso está progresando así:

- `0s` -- `-10%` (primer cambio al comienzo del primer segundo, inmediatamente)
- `1s` -- `-20%`
- ...
- `8s` -- `-80%`
- (el último segundo muestra el valor final).

El valor alternativo 'end' significaría que el cambio debe aplicarse no al principio, sino al final de cada segundo.

Entonces el proceso sería así:

- `0s` -- `0`
- `1s` -- `-10%` (primer cambio al final del primer segundo)
- `2s` -- `-20%`
- ...
- `9s` -- `-90%`

Aquí está el `step(9, end)` en acción (observa la pausa entre el primer cambio de dígitos):

[codetabs src="step-end"]

También hay valores abreviados:

- `step-start` -- es lo mismo que` steps(1, start)`. Es decir, la animación comienza de inmediato y toma 1 paso. Entonces comienza y termina inmediatamente, como si no hubiera animación.
- `step-end` -- lo mismo que `steps(1, end)`: realiza la animación en un solo paso al final de `transition-duration`.

Estos valores rara vez se usan, porque eso no es realmente animación, sino un cambio de un solo paso.

## Evento transitionend

Cuando finaliza la animación CSS, se dispara el evento `transitionend`.

Es ampliamente utilizado para hacer una acción después que se realiza la animación. También podemos unir animaciones.

<<<<<<< HEAD
Por ejemplo, el barco a continuación comienza a navegar ida y vuelta al hacer clic, cada vez más y más a la derecha:

[iframe src="boat" height=300 edit link]

La animación se inicia mediante la función `go` que se vuelve a ejecutar cada vez que finaliza la transición y cambia la dirección:
=======
For instance, the ship in the example below starts to sail there and back when clicked, each time farther and farther to the right:

[iframe src="boat" height=300 edit link]

The animation is initiated by the function `go` that re-runs each time the transition finishes, and flips the direction:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
<<<<<<< HEAD
      // navegar a la derecha
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // navegar a la izquierda
=======
      // sail to the right
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // sail to the left
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5
      boat.classList.add('back');
      boat.style.marginLeft = 100 * times - 200 + 'px';
    }

  }

  go();

  boat.addEventListener('transitionend', function() {
    times++;
    go();
  });
};
```

<<<<<<< HEAD
El objeto de evento para `transitionend` tiene pocas propiedades específicas:
=======
The event object for `transitionend` has a few specific properties:
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

`event.propertyName`
: La propiedad que ha terminado de animarse. Puede ser bueno si animamos múltiples propiedades simultáneamente.

`event.elapsedTime`
: El tiempo (en segundos) que duró la animación, sin `transition-delay`.

## Fotogramas clave  (Keyframes)

Podemos unir múltiples animaciones simples juntas usando la regla CSS `@keyframes`.

<<<<<<< HEAD
Especifica el "nombre" de la animación y las reglas: qué, cuándo y dónde animar. Luego, usando la propiedad `animation`, adjuntamos la animación al elemento y especificamos parámetros adicionales para él.
=======
It specifies the "name" of the animation and rules - what, when and where to animate. Then using the `animation` property, we can attach the animation to the element and specify additional parameters for it.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Aquí tenemos un ejemplo con explicaciones:

```html run height=60 autorun="no-epub" no-beautify
<div class="progress"></div>

<style>
*!*
  @keyframes go-left-right {        /* dale un nombre: "go-left-right" */
    from { left: 0px; }             /* animar desde la izquierda: 0px */
    to { left: calc(100% - 50px); } /* animar a la izquierda: 100%-50px */
  }
*/!*

  .progress {
*!*
    animation: go-left-right 3s infinite alternate;
    /* aplicar la animación "go-left-right" al elemento
       duración 3 segundos
       número de veces: infinitas
       alternar la dirección cada vez
    */
*/!*

    position: relative;
    border: 2px solid green;
    width: 50px;
    height: 20px;
    background: lime;
  }
</style>
```

Hay muchos artículos sobre `@keyframes` y una [especificación detallada](https://drafts.csswg.org/css-animations/).

<<<<<<< HEAD
Probablemente no necesitarás `@keyframes` a menudo, a menos que todo esté en constante movimiento en tus sitios.
=======
You probably won't need `@keyframes` often, unless everything is in constant motion on your sites.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

## Resumen

<<<<<<< HEAD
Las animaciones CSS permiten animar suavemente (o no) los cambios de una o varias propiedades CSS.
=======
CSS animations allow smoothly (or not) animated changes of one or multiple CSS properties.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Son buenas para la mayoría de las tareas de animación. También podemos usar JavaScript para animaciones, el siguiente capítulo está dedicado a eso.

Limitaciones de las animaciones CSS en comparación con las animaciones JavaScript:

<<<<<<< HEAD
```comparar más="Animaciones CSS" menos="Animaciones JavaScript"
+ Cosas simples hechas simplemente.
+ Rápido y ligero para la CPU.
- Las animaciones de JavaScript son flexibles. Pueden implementar cualquier lógica de animación, como una "explosión" de un elemento.
- No solo cambios de propiedad. Podemos crear nuevos elementos en JavaScript para fines de animación.
```

La mayoría de las animaciones se pueden implementar usando CSS como se describe en este capítulo. Y el evento `transitionend` permite ejecutar JavaScript después de la animación, por lo que se integra bien con el código.
=======
```compare plus="CSS animations" minus="JavaScript animations"
+ Simple things done simply.
+ Fast and lightweight for CPU.
- JavaScript animations are flexible. They can implement any animation logic, like an "explosion" of an element.
- Not just property changes. We can create new elements in JavaScript as part of the animation.
```

The majority of animations can be implemented using CSS as described in this chapter. And the `transitionend` event allows JavaScript to be run after the animation, so it integrates fine with the code.
>>>>>>> e1a3f634a47c119cf1ec7420c49fc0fc7172c0b5

Pero en el próximo capítulo haremos algunas animaciones en JavaScript para cubrir casos más complejos.
