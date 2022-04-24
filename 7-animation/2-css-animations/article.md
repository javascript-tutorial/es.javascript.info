# Animaciones CSS

Las animaciones CSS permiten hacer animaciones simples sin JavaScript en absoluto.

Se puede utilizar JavaScript para controlar la animación CSS y mejorarla con un poco de código.

## Transiciones CSS [#css-transition]

La idea de las transiciones CSS es simple. Describimos una propiedad y cómo se deberían animar sus cambios. Cuando la propiedad cambia, el navegador pinta la animación.

Es decir: todo lo que necesitamos es cambiar la propiedad, y la transición fluida la hará el navegador.

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

Las cubriremos en un momento, por ahora tengamos en cuenta que la propiedad común `transition` permite declararlas juntas en el orden: `property duration timing-function delay`, y también animar múltiples propiedades a la vez.

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

Ahora cubramos las propiedades de animación una por una.

## transition-property

En `transition-property` escribimos una lista de propiedades para animar, por ejemplo: `left`, `margin-left`, `height`, `color`. O podemos escribir `all`, que significa "animar todas las propiedades".

No todas las propiedades pueden ser animadas, pero sí [la mayoría de las generalmente usadas](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties). 

## transition-duration

En `transition-duration` podemos especificar cuánto tiempo debe durar la animación. El tiempo debe estar en [formato de tiempo CSS](http://www.w3.org/TR/css3-values/#time): en segundos `s` o milisegundos `ms`.

## transition-delay

En `transition-delay` podemos especificar el retraso *antes* de la animación. Por ejemplo, si `transition-delay` es `1s` y `transition-duration` es `2s`, la animación comienza después de 1 segundo tras el cambio de la propiedad y la duración total será de 2 segundos.

Los valores negativos también son posibles. De esta manera la animación comienza inmediatamente, pero el punto de inicio de la animación será el del valor dado (tiempo). Por ejemplo, si `transition-delay` es `-1s` y `transition-duration` es `2s`, entonces la animación comienza desde la mitad y la duración total será de 1 segundo.

Aquí la animación cambia los números de `0` a `9` usando la propiedad CSS `translate`:

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

También podemos comenzar "desde el medio", desde el número exacto, p. ej. correspondiente al segundo actual, usando el negativo `transition-delay`.

Aquí, si haces clic en el dígito, comienza la animación desde el segundo actual:

[codetabs src="digits-negative-delay"]

JavaScript lo hace con una línea extra:

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

La función de temporización describe cómo se distribuye el proceso de animación a lo largo del tiempo. Comenzará lentamente y luego irá rápido o viceversa.

Es la propiedad más complicada a primera vista. Pero se vuelve muy simple si le dedicamos un poco de tiempo.

Esa propiedad acepta dos tipos de valores: una curva de Bézier o pasos. Comencemos por la curva, ya que se usa con más frecuencia.

### Curva de Bézier

La función de temporización se puede establecer como una [curva de Bézier](/bezier-curve) con 4 puntos de control que satisfacen las condiciones:

1. Primer punto de control: `(0,0)`.
2. Último punto de control: `(1,1)`.
3. Para los puntos intermedios, los valores de `x` deben estar en el intervalo `0..1`, `y` puede ser cualquier cosa.

La sintaxis de una curva de Bézier en CSS: `cubic-bezier(x2, y2, x3, y3)`. Aquí necesitamos especificar solo los puntos de control segundo y tercero, porque el primero está fijado a `(0,0)` y el cuarto es `(1,1)`.

La función de temporización determina qué tan rápido ocurre el proceso de animación.

- El eje `x` es el tiempo: `0` -- el momento inicial, `1` -- el último momento de `transition-duration`.
- El eje `y` especifica la finalización del proceso: `0` -- el valor inicial de la propiedad, `1` -- el valor final.

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
  /* el clic en un tren establece left a 450px, disparando la animación */
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
  /* el clic en un tren establece left a 450px, disparando la animación */
}
```

Hay varias curvas incorporadas: `linear`,` ease`, `ease-in`,` ease-out` y `ease-in-out`.

La `linear` es una abreviatura de `cubic-bezier(0, 0, 1, 1) ` -- una línea recta, como ya vimos.

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
  /* igual que transition: left 5s cubic-bezier(0, .5, .5, 1); */
}
```

Pero se ve un poco diferente.

**Una curva de Bézier puede hacer que la animación exceda su rango.**

Los puntos de control en la curva pueden tener cualquier coordenada `y`: incluso negativa o enorme. Entonces la curva de Bézier también saltaría muy bajo o alto, haciendo que la animación vaya más allá de su rango normal.

En el siguiente ejemplo, el código de animación es:
```css
.train {
  left: 100px;
  transition: left 5s cubic-bezier(.5, -1, .5, 2);
  /* clic en un tren establece left a 400px */
}
```

La propiedad `left` debería animarse de `100px` a `400px`.

Pero si haces clic en el tren, verás que:

- Primero, el tren va *atrás*: `left` llega a ser menor que `100px`.
- Luego avanza, un poco más allá de `400px`.
- Y luego de vuelve a `400px`.

[codetabs src="train-over"]

¿Por qué sucede? es bastante obvio si miramos la gráfica de la curva de Bézier dada:

![](bezier-train-over.svg)

Movimos la coordenada `y` del segundo punto por debajo de cero, y para el tercer punto lo colocamos sobre `1`, de modo que la curva sale del cuadrante "regular". La `y` está fuera del rango "estándar" `0..1`.

Como sabemos, `y` mide "la finalización del proceso de animación". El valor `y = 0` corresponde al valor inicial de la propiedad e `y = 1` al valor final. Por lo tanto, los valores `y<0` mueven la propiedad por debajo del `left` inicial e `y>1` por encima del `left` final.

Esa es una variante "suave" sin duda. Si ponemos valores `y` como `-99` y `99`, entonces el tren saltaría mucho más fuera del rango.

Pero, ¿cómo hacer la curva de Bézier para una tarea específica? Hay muchas herramientas. Por ejemplo, podemos hacerlo en el sitio <http://cubic-bezier.com/>.

### Pasos

La función de temporización `steps(number of steps[, start/end])` permite dividir la animación en múltiples pasos.

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
- `8s` -- `-90%`
- (el último segundo muestra el valor final).

El valor alternativo 'end' significaría que el cambio debe aplicarse no al principio, sino al final de cada segundo.

Entonces el proceso para `steps(9, end)` sería así:

- `0s` -- `0` (durante el primer segundo nada cambia)
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

Por ejemplo, el barco a continuación comienza a navegar ida y vuelta al hacer clic, cada vez más y más a la derecha:

[iframe src="boat" height=300 edit link]

La animación se inicia mediante la función `go` que se vuelve a ejecutar cada vez que finaliza la transición y cambia la dirección:

```js
boat.onclick = function() {
  //...
  let times = 1;

  function go() {
    if (times % 2) {
      // navegar a la derecha
      boat.classList.remove('back');
      boat.style.marginLeft = 100 * times + 200 + 'px';
    } else {
      // navegar a la izquierda
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

El objeto de evento para `transitionend` tiene pocas propiedades específicas:

`event.propertyName`
: La propiedad que ha terminado de animarse. Puede ser bueno si animamos múltiples propiedades simultáneamente.

`event.elapsedTime`
: El tiempo (en segundos) que duró la animación, sin `transition-delay`.

## Fotogramas clave  (Keyframes)

Podemos unir múltiples animaciones simples juntas usando la regla CSS `@keyframes`.

Especifica el "nombre" de la animación y las reglas: qué, cuándo y dónde animar. Luego, usando la propiedad `animation`, adjuntamos la animación al elemento y especificamos parámetros adicionales para él.

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

Probablemente no necesitarás `@keyframes` a menudo, a menos que todo esté en constante movimiento en tus sitios.

## Performance

La mayoría de las propiedades CSS pueden ser animadas, porque la mayoría son valores numéricos. Por ejemplo `width`, `color`, `font-size` son todas números. Cuando las animamos, el navegador cambia estos valores gradualmente grama por grama, creando un efecto suave.

Sin embargo, no todas las animaciones se verán tan suaves como quisieras, porque diferentes propiedades CSS tienen diferente costo para cambiar.

En detalles más técnicos, cuando hay un cambio de estilo, el navegador atraviesa 3 pasos para renderizar la nueva vista:

1. **Layout**: (diagrama) recalcula la geometría y posición de cada elemento, luego
2. **Paint**: (dibuja) recalcula cómo debe verse todo en sus lugares, incluyendo background, colores,
3. **Composite**: (render) despliega el resultado final en pixels de la pantalla, aplicando transformaciones CSS si existen.

Durante una animación CSS , este proceso se repite para cada frame. Sin embargo las propiedades CSS que nunca afectan geometría o posición, como `color`, pueden saltar el paso "Layout". Si un `color` cambia, el navegador no recalcula geometría, va a Paint -> Composite. Y hay unas pocas propiedades que saltan directo a "Composite". Puedes encontrar la lista de propiedades CSS y cuáles estados disparan en <https://csstriggers.com>.

Los cálculos pueden tomar un tiempo, especialmente en páginas con muchos elementos y diagramación compleja. Y los retrasos pueden ser notorios en muchos dispositivos, provocando "jitter": animaciones irregulares, menos fluidas.

La animación de propiedades que salten el paso "Layout" son más rápidas. Mucho mejor si el paso "Paint" se salta también.

La propiedad `transform` es una excelente opción porque:
- CSS transform afecta el elemento objetivo como un todo (rotar, tornar, estirar, desplazar).
- CSS transform nunca afecta a los elementos vecinos.

...entonces los navegadores aplican `transform` "por encima" de "Layout" y "Paint" ya calculados, en el paso "Composite".

En otras palabras, el navegador calcula la diagramación en la etapa Layout (tamaños, posiciones); lo dibuja con colores, backgrounds, etc., en la etapa "Paint"; y luego aplica `transform` a los elementos que lo necesitan.

Cambios (animaciones) de la propiedad `transform` nunca disparan los pasos Layout y Paint. Aún más, el navegador delega las transformaciones CSS en el acelerador gráfico (un chip especial en la CPU o placa gráfica), haciéndolas muy eficientes.

Afortunadamente la propiedad  `transform` es muy poderosa. Usando `transform` en un elemento, puedes rotarlo, darlo vuelta, estirarlo o comprimirlo, desplazarlo y [mucho más](https://developer.mozilla.org/docs/Web/CSS/transform#syntax). Así que en lugar de las propiedades `left/margin-left` podemos usar `transform: translateX(…)`, o usar `transform: scale` para incrementar su tamaño, etc.

La propiedad `opacity` tampoco dispara "Layout" (también se salta "Paint" en Gecko de Mozilla). Podemos usarlo para efectos de mostrar/ocultar o desvanecer/aparecer.

Aparear `transform` con `opacity` puede usualmente resolver la mayoría de nuestras necesidades brindando animaciones vistosas y fluidas.

Aquí por ejemplo, clic en el elemento `#boat` le agrega la clase con `transform: translateX(300)` y `opacity: 0`, haciendo que se mueva `300px` a la derecha y desaparezca:

```html run height=260 autorun no-beautify
<img src="https://js.cx/clipart/boat.png" id="boat">

<style>
#boat {
  cursor: pointer;
  transition: transform 2s ease-in-out, opacity 2s ease-in-out;
}

.move {
  transform: translateX(300px);
  opacity: 0;
}
</style>
<script>
  boat.onclick = () => boat.classList.add('move');
</script>
```

Un ejemplo más complejo con `@keyframes`:

```html run height=80 autorun no-beautify
<h2 onclick="this.classList.toggle('animated')">click me to start / stop</h2>
<style>
  .animated {
    animation: hello-goodbye 1.8s infinite;
    width: fit-content;
  }
  @keyframes hello-goodbye {
    0% {
      transform: translateY(-60px) rotateX(0.7turn);
      opacity: 0;
    }
    50% {
      transform: none;
      opacity: 1;
    }
    100% {
      transform: translateX(230px) rotateZ(90deg) scale(0.5);
      opacity: 0;
    }
  }
</style>
```

## Resumen

Las animaciones CSS permiten animar, suavemente o por pasos, los cambios de una o varias propiedades CSS.

Son buenas para la mayoría de las tareas de animación. También podemos usar JavaScript para animaciones, el siguiente capítulo está dedicado a eso.

Limitaciones de las animaciones CSS en comparación con las animaciones JavaScript:

```comparar más="Animaciones CSS" menos="Animaciones JavaScript"
+ Cosas simples hechas simplemente.
+ Rápido y ligero para la CPU.
- Las animaciones de JavaScript son flexibles. Pueden implementar cualquier lógica de animación, como una "explosión" de un elemento.
- No solo cambios de propiedad. Podemos crear nuevos elementos en JavaScript para fines de animación.
```

En los ejemplos de este artículo animamos `font-size`, `left`, `width`, `height`, etc. En proyectos de la vida real es preferible usar `transform: scale()` y `transform: translate()` para obtener mejor performance.

La mayoría de las animaciones se pueden implementar usando CSS como se describe en este capítulo. Y el evento `transitionend` permite ejecutar JavaScript después de la animación, por lo que se integra bien con el código.

Pero en el próximo capítulo haremos algunas animaciones en JavaScript para cubrir casos más complejos.
