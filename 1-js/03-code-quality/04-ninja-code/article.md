# Ninja code


```quote author="Confucio"
Aprender sin pensar es inútil. Pensar sin aprender peligroso.
```

Los programadores ninjas del pasado usaron estos trucos para afilar la mente de los mantenedores de código.

Los gurus de revisión de código los buscan en tareas de prueba.

Los desarrolladores novatos algunas veces los usan incluso mejor que los programadores ninjas.

Leelos detenidamente y encuentra quien eres -- ¿un ninja?, ¿un novato?, o tal vez ¿un revisor de código?

```warn header="Ironía detectada"
Muchos intentan seguir los caminos de los ninjas. Pocos tiene éxito.
```


## La brevedad es el alma del ingenio

Has el código lo más corto posible. Demuestra cuan inteligente eres.

Deja que las características sutiles del lenguaje te guíen.

Por ejemplo, echa un vistazo a este operador ternario ``? '':

```js
// tomado de una librería de javascript muy conocida
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Fascinante, ¿cierto?. Si escribes de esa forma, un desarollador que se encuentre esta linea e intente entender cual es el valor de `i` la va a pasar muy mal. Por lo que tendra que venir a ti, buscando una respuesta.

Diles que mientras mas corto mucho mejor. Guialos a los caminos del ninja.

## Variables de una sola letra

```quote author="Laozi (Tao Te Ching)"
El Dao se esconde sin palabras. Solo el Dao está bien comenzado y bien
terminado.
```

Otra forma de programar más rápido es usando variables de una sola letra en todas partes. Como `a`, `b` o `c`.

Una variable corta desaparece en el código como lo hace un ninja en un bosque. Nadie será capaz de encontrarla usando "buscar" en el editor. E incluso si alguien lo hace, no será capaz de "descifrar" el significado de `a` o `b`.

...Pero hay una excepción. Un verdadero ninja nunca usaría `i` como el contador en un bucle `"for"`. En cualquier otro lugar, pero no aquí. Mira alrededor, hay muchas mas letras exóticas. Por ejemplo, `x` o `y`.

Una variable exótica como el contador de un bucle es especialmente genial si el cuerpo del bucle toma 1-2 páginas (hazlo más grande si puedes). Entonces si alguien mira en las profundidades del bucle, no será capaz de figurar rápidamente que la variable llamada `x` es el contador del bucle.

## Usa abreviaciones

Si las reglas del equipo prohíbe el uso de nombres de una sola letra o nombres vagos -- acórtalos, has abreviaciones.

Como esto:

- `list` -> `lst`.
- `userAgent` -> `ua`.
- `browser` -> `brsr`.
- ...etc

Solo aquel con buena intuición será capaz de entender dichos nombres. Intenta acortar todo. Solo una persona digna debería ser capaz de sostener el desarrollo de tu código.

## Vuela alto. Se abstracto

```quote author="Laozi (Tao Te Ching)"
El gran cuadrado no tiene esquina<br>
La gran vasija se completa por última vez,<br>
La gran nota es un sonido enrarecido,<br>
La gran imagen no tiene forma.
```

Cuando estés escogiendo un nombre intenta usar la palabra más abstracta. Como `obj`, `data`, `value`, `item`, `elem`, etc.

- **El nombre ideal para una variable es `data`.** Usalo lo más que puedas. En efecto, toda variable sostiene *data*, ¿no?

    ...¿Pero que hacer si `data` ya esta siendo usado? Intenta con `value`, también es universal. Después de todo, una variable eventualmente obtiene un *value*(valor).

- **Nombra una variable por su tipo: `str`, `num`...**

    Dales un intento. Un recién iniciado puede preguntarse -- ¿Son dichos nombres realmente útiles para un ninja? En efecto, ¡lo son!

    Claro, el nombre de la variable sigue significando algo. Dice que hay en el interior de la variable: una cadena de texto, un número o cualquier otra cosa. Pero cuando un forastero intenta entender el código, se verá sorprendido al ver que en realidad no hay información. Y finalmente fracasara en el intento de alterar tu código bien pensado.

    El valor del tipo es fácil de encontrar con una depuración. Pero, ¿cuál es el significado de la variable? ¿Qué cadena de texto o número guarda?

    ¡No hay forma de saberlo sin una buena meditación!

- **...Pero, ¿Y si ya no hay dichos nombres?** Simplemente añade un número: `data1, item2, elem5`...

## Prueba de atención

Solo un realmente atento programador deberia ser capaz de entender tu código. Pero, ¿cómo comprobarlo?

**Una de las maneras -- usa nombre de variables similares, como `date` y `data`.**

Combinalos donde puedas.

Una lectura rapida de dicho código se hace imposible. Y cuando hay un error de tipografía.... Ummm... 
A quick read of such code becomes impossible. And when there's a typo... Ummm... Estamos atrapados por mucho tiempo, tiempo para tomar té.


## Sinonimos inteligentes

```quote author="Confucius"
Es difícil encontrar un gato negro en una habitación oscura, sobre todo cuando no está.
```

Usando nombres *similar* para las mismas cosas hace tu vida mas interesante y le muestra al público tu creatividad.

Por ejemplo, considera prefijos de funciones. Si una función muestra un mensaje en la pantalla -- comienzalo con `display...`(mostrar), como `displayMessage`(mostrarMensaje). Y entonces si otra función muestra en la pantalla otra cosa, como un nombre de usuario, comienzalo con `show...`(presentar) (como `showName`(presentarNombre)).

Insinua que hay una diferencia sútil entre dichas funciones, cuando no lo hay.

Has un pacto con tus compañeros ninjas del equipo: si John comienza funciones de "mostrar" con `presentar...` en su código, entonces Peter podría usar `exhibir..`, y Ann -- `pintar...`. Nota como el código es mucho más interesante y diverso ahora.

...¡Y ahora el truco del sombrero!

Para dos funciones con diferencias importantes -- ¡usa el mismo prefijo!

For instance, the function `printPage(page)` will use a printer. And the function `printText(text)` will put the text on-screen. Let an unfamiliar reader think well over similarly named function `printMessage`: "Where does it put the message? To a printer or on the screen?". To make it really shine, `printMessage(message)` should output it in the new window!

## Reuse names

```quote author="Laozi (Tao Te Ching)"
Once the whole is divided, the parts<br>
need names.<br>
There are already enough names.<br>
One must know when to stop.
```

Add a new variable only when absolutely necessary.

Instead, reuse existing names. Just write new values into them.

In a function try to use only variables passed as parameters.

That would make it really hard to identify what's exactly in the variable *now*. And also where it comes from. A person with weak intuition would have to analyze the code line-by-line and track the changes through every code branch.

**An advanced variant of the approach is to covertly (!) replace the value with something alike in the middle of a loop or a function.**

For instance:

```js
function ninjaFunction(elem) {
  // 20 lines of code working with elem

  elem = clone(elem);

  // 20 more lines, now working with the clone of the elem!
}
```

A fellow programmer who wants to work with `elem` in the second half of the function will be surprised... Only during the debugging, after examining the code they will find out that they're working with a clone!

Seen in code regularly. Deadly effective even against an experienced ninja. 

## Underscores for fun

Put underscores `_` and `__` before variable names. Like `_name` or `__value`. It would be great if only you knew their meaning. Or, better, add them just for fun, without particular meaning at all. Or different meanings in different places.

You kill two rabbits with one shot. First, the code becomes longer and less readable, and the second, a fellow developer may spend a long time trying to figure out what the underscores mean.

A smart ninja puts underscores at one spot of code and evades them at other places. That makes the code even more fragile and increases the probability of future errors.

## Show your love

Let everyone see how magnificent your entities are! Names like `superElement`, `megaFrame` and `niceItem` will definitely enlighten a reader.

Indeed, from one hand, something is written: `super..`, `mega..`, `nice..` But from the other hand -- that brings no details. A reader may decide to look for a hidden meaning and meditate for an hour or two.



## Overlap outer variables

```quote author="Guan Yin Zi"
When in the light, can't see anything in the darkness.<br>
When in the darkness, can see everything in the light.
```

Use same names for variables inside and outside a function. As simple. No efforts required.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- a programmer wants to work with user here and...
  ...
}
```

A programmer who jumps inside the `render` will probably fail to notice that there's a local `user` shadowing the outer one.

Then they'll try to work with `user` assuming that it's the external variable, the result of `authenticateUser()`... The trap is sprung! Hello, debugger...


## Side-effects everywhere!

There are functions that look like they don't change anything. Like `isReady()`, `checkPermission()`, `findTags()`... They are assumed to carry out calculations, find and return the data, without changing anything outside of them. In other words, without "side-effects".

**A really beautiful trick is to add a "useful" action to them, besides the main task.**

An expression of dazed surprise on the face of your colleague when they see a function named `is..`, `check..` or `find...` changing something -- will definitely broaden your boundaries of reason.

**Another way to surprise is to return a non-standard result.**

Show your original thinking! Let the call of `checkPermission` return not `true/false`, but a complex object with the results of the check.

Those developers who try to write `if (checkPermission(..))`, will wonder why it doesn't work. Tell them: "Read the docs!". And give this article.


## Powerful functions!

```quote author="Laozi (Tao Te Ching)"
The great Tao flows everywhere,<br>
both to the left and to the right.
```

Don't limit the function by what's written in its name. Be broader.

For instance, a function `validateEmail(email)` could (besides checking the email for correctness) show an error message and ask to re-enter the email.

Additional actions should not be obvious from the function name. A true ninja coder will make them not obvious from the code as well.

**Joining several actions into one protects your code from reuse.**

Imagine, another developer wants only to check the email, and not output any message. Your function  `validateEmail(email)` that does both will not suit them. So they won't break your meditation by asking anything about it.

## Summary

All "pieces of advice" above are from the real code... Sometimes, written by experienced developers. Maybe even more experienced than you are ;)

- Follow some of them, and your code will become full of surprises.
- Follow many of them, and your code will become truly yours, no one would want to change it.
- Follow all, and your code will become a valuable lesson for young developers looking for enlightenment.
