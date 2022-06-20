# Comentarios

Como hemos aprendido en el capítulo <info:structure>, los comentarios pueden ser de una sola línea: comenzando con `//` y de múltiples líneas: `/* ... */`.

Normalmente los usamos para describir cómo y por qué el código funciona.

A primera vista, los comentarios pueden ser obvios, pero los principiantes en programación generalmente los usan incorrectamente.

## Comentarios incorrectos

Los principiantes tienden a utilizar los comentarios para explicar "lo que está pasando en el código". Así:

```js
// Este código hará esto (...) y esto (...)
// ...y quién sabe qué más...
código;
muy;
complejo;
```

Pero en un buen código, la cantidad de comentarios "explicativos" debería ser mínima. En serio, el código debería ser fácil de entender sin ellos.

Existe una fantástica regla al respeto: "si el código es tan poco claro que necesita un comentario, tal vez en su lugar debería ser reescrito.".

### Receta: funciones externas

A veces es beneficioso reemplazar trozos de código con funciones, como aquí:

```js
function showPrimes(n) {
  nextPrime:
  for (let i = 2; i < n; i++) {

*!*
    // comprobar si i es un número primo
    for (let j = 2; j < i; j++) {
      if (i % j == 0) continue nextPrime;
    }
*/!*

    alert(i);
  }
}
```

La mejor variante, con una función externa `isPrime`:


```js
function showPrimes(n) {

  for (let i = 2; i < n; i++) {
    *!*if (!isPrime(i)) continue;*/!*

    alert(i);  
  }
}

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i == 0) return false;
  }

  return true;
}
```

Ahora podemos entender el código fácilmente. La propia función se convierte en comentario. Este tipo de código se le llama *auto descriptivo*.

### Receta: crear funciones

Y si tenemos una larga "hoja de código" como esta:

```js
// aquí añadimos whiskey
for(let i = 0; i < 10; i++) {
  let drop = getWhiskey();
  smell(drop);
  add(drop, glass);
}

// aquí añadimos zumo
for(let t = 0; t < 3; t++) {
  let tomato = getTomato();
  examine(tomato);
  let juice = press(tomato);
  add(juice, glass);
}

// ...
```

Entonces, una versión mejor puede ser reescribirlo en funciones de esta manera:

```js
addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
  for(let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    //...
  }
}

function addJuice(container) {
  for(let t = 0; t < 3; t++) {
    let tomato = getTomato();
    //...
  }
}
```

De nuevo, la propias funciones nos dicen qué está pasando. No hay nada que comentar. Y además, la estructura del código es mejor cuando está dividida. Queda claro qué hace cada función, qué necesita y qué retorna.

En realidad, no podemos evitar totalmente los comentarios "explicativos". Existen algoritmos complejos. Y existen "trucos" ingeniosos con el propósito de optimizar. Pero generalmente, tenemos que intentar mantener el código simple y auto descriptivo.

## Comentarios correctos

Entonces, los comentarios explicativos suelen ser incorrectos. ¿Qué comentarios son correctos?

Describe la arquitectura
: Proporcionan una descripción general de alto nivel de los componentes, cómo interactúan, cuál es el flujo de control en diversas situaciones... En resumen -- la vista panorámica del código. Hay un lenguaje de diagramas especial [UML](https://es.wikipedia.org/wiki/Lenguaje_unificado_de_modelado) para diagramas de alto nivel. Definitivamente vale la pena estudiarlo.

Documenta la utilización de una función
: Hay una sintaxis especial [JSDoc](https://en.wikipedia.org/wiki/JSDoc) para documentar una función: utilización, parámetros, valor devuelto.

<<<<<<< HEAD
	Por ejemplo:
	```js
    /**
     * Devuelve x elevado a la potencia de n.
     *
     * @param {number} x El número a elevar.
     * @param {number} n La potencia, debe ser un número natural.
     * @return {number} x elevado a la potencia de n.
     */
    function pow(x, n) {
      ...
    }
    ```
	
	Estos tipos de comentarios nos permiten entender el propósito de la función y cómo usarla de la manera correcta sin mirar su código.
	
	Por cierto, muchos editores como [WebStorm](https://www.jetbrains.com/webstorm/) también pueden entenderlos y usarlos para proveer auto completado y algún tipo de verificación automática para el código.
	
	Además, existen herramientas como [JSDoc 3](https://github.com/jsdoc3/jsdoc) que pueden generar documentación en formato HTML de los comentarios. Puedes leer más información sobre JSDoc en <https://jsdoc.app>.
=======
For instance:
```js
/**
 * Returns x raised to the n-th power.
 *
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
function pow(x, n) {
  ...
}
```

Such comments allow us to understand the purpose of the function and use it the right way without looking in its code.

By the way, many editors like [WebStorm](https://www.jetbrains.com/webstorm/) can understand them as well and use them to provide autocomplete and some automatic code-checking.

Also, there are tools like [JSDoc 3](https://github.com/jsdoc/jsdoc) that can generate HTML-documentation from the comments. You can read more information about JSDoc at <https://jsdoc.app>.

Why is the task solved this way?
: What's written is important. But what's *not* written may be even more important to understand what's going on. Why is the task solved exactly this way? The code gives no answer.

    If there are many ways to solve the task, why this one? Especially when it's not the most obvious one.

    Without such comments the following situation is possible:
    1. You (or your colleague) open the code written some time ago, and see that it's "suboptimal".
    2. You think: "How stupid I was then, and how much smarter I'm now", and rewrite using the "more obvious and correct" variant.
    3. ...The urge to rewrite was good. But in the process you see that the "more obvious" solution is actually lacking. You even dimly remember why, because you already tried it long ago. You revert to the correct variant, but the time was wasted.
>>>>>>> 7964b11b8fa2c314d9a09a82ea4b585cda618c80

¿Por qué se resuelve de esa manera?
: Lo que está escrito es importante. Pero lo que *no* está escrito puede ser aún más importante para entender qué está pasando. ¿Por qué resuelven la tarea exactamente de esa manera? El código no nos da ninguna respuesta.

	Si hay muchas maneras de resolver el problema, ¿por qué esta? Especialmente cuando no es la más obvia.
	
	Sin dichos comentarios, las siguientes situaciones son posibles:
	1. Tú (o tu compañero) abres el código escrito hace ya algún tiempo, y te das cuenta de que es "subóptimo".
	2. Piensas: "Que estúpido que era antes, y que inteligente que soy ahora", y lo reescribes utilizando la variante "más obvia y correcta".
	3. ...El impulso de reescribir era bueno. Pero en el proceso ves que la solución "más obvia" en realidad falla. Incluso recuerdas vagamente el porqué, porque ya lo intentaste hace mucho. Vuelves a la variante correcta pero has estado perdiendo el tiempo.
	
	Los comentarios que explican la solución correcta son muy importantes. Nos ayudan a continuar el desarrollo de forma correcta.
	
¿Alguna característica sutil del código? ¿Dónde se usan?
: Si el código tiene algo sutil y contraintuitivo, definitivamente vale la pena comentarlo.

## Resumen

Una señal importante de un buen desarrollador son los comentarios: su presencia e incluso su ausencia.

Los buenos comentarios nos permiten mantener bien el código, volver después de un retraso y usarlo de manera más efectiva.

**Comenta esto:**

- Arquitectura en general, vista de alto nivel.
- Utilización de funciones.
- Soluciones importantes, especialmente cuando no son inmediatamente obvias.

**Evita comentarios:**

- Que explican "cómo funciona el código" y "qué hace".
- Escríbelos solo si es imposible escribir el código de manera tan simple y auto descriptiva que no los necesite.

Los comentarios también son usados para herramientas de auto documentación como JSDoc3: los leen y generan documentación en HTML (o documentos en otros formatos).
