# Código ninja


```quote author="Confucio"
Aprender sin pensar es inútil. Pensar sin aprender peligroso.
```

Los programadores ninjas del pasado usaron estos trucos para afilar la mente de los mantenedores de código.

Los gurús de revisión de código los buscan en tareas de prueba.

Los desarrolladores novatos algunas veces los usan incluso mejor que los programadores ninjas.

Léelos detenidamente y encuentra quién eres -- ¿un ninja?, ¿un novato?, o tal vez ¿un revisor de código?

```warn header="Ironía detectada"
Muchos intentan seguir los caminos de los ninjas. Pocos tienen éxito.
```


## La brevedad es el alma del ingenio

Has el código lo más corto posible. Demuestra cuan inteligente eres.

Deja que las características sutiles del lenguaje te guíen.

Por ejemplo, echa un vistazo a este operador ternario `'?'`:

```js
// tomado de una librería de javascript muy conocida
i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
```

Fascinante, ¿cierto?. Si escribes de esa forma, un desarrollador que se encuentre esta línea e intente entender cuál es el valor de `i` la va a pasar muy mal. Por lo que tendrá que venir a ti, buscando una respuesta.

Diles que mientras más corto mucho mejor. Guíalos a los caminos del ninja.

## Variables de una sola letra

```quote author="Laozi (Tao Te Ching)"
El Dao se esconde sin palabras. Solo el Dao está bien comenzado y bien
terminado.
```

Otra forma de programar más rápido es usando variables de una sola letra en todas partes. Como `a`, `b` o `c`.

Una variable corta desaparece en el código como lo hace un ninja en un bosque. Nadie será capaz de encontrarla usando "buscar" en el editor. E incluso si alguien lo hace, no será capaz de "descifrar" el significado de `a` o `b`.

...Pero hay una excepción. Un verdadero ninja nunca usaría `i` como el contador en un bucle `"for"`. En cualquier otro lugar, pero no aquí. Mira alrededor, hay muchas más letras exóticas. Por ejemplo, `x` o `y`.

Una variable exótica como el contador de un bucle es especialmente genial si el cuerpo del bucle toma 1-2 páginas (hazlo más grande si puedes). Entonces si alguien mira en las profundidades del bucle, no será capaz de figurar rápidamente que la variable llamada `x` es el contador del bucle.

## Usa abreviaciones

Si las reglas del equipo prohíben el uso de nombres de una sola letra o nombres vagos -- acórtalos, has abreviaciones.

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

- **El nombre ideal para una variable es `data`.** Usalo lo más que puedas. En efecto, toda variable contiene *data*, ¿no?

    ...¿Pero qué hacer si `data` ya está siendo usado? Intenta con `value`, también es universal. Después de todo, una variable eventualmente recibe un *value* (valor).

- **Nombra una variable por su tipo: `str`, `num`...**

    Pruébalos. Un recién iniciado puede preguntarse -- ¿Son estos nombres realmente útiles para un ninja? En efecto, ¡lo son!

    Claro, el nombre de la variable sigue significando algo. Dice que hay en el interior de la variable: una cadena de texto, un número o cualquier otra cosa. Pero cuando una persona ajena intenta entender el código, se verá sorprendido al ver que en realidad no hay información. Y finalmente fracasara en el intento de alterar tu código bien pensado.

    El valor del tipo es fácil de encontrar con una depuración. Pero, ¿cuál es el significado de la variable? ¿Qué cadena de texto o número guarda?

    ¡No hay forma de saberlo sin una buena meditación!

- **...Pero, ¿Y si ya no hay dichos nombres?** Simplemente añade un número: `data1, item2, elem5`...

## Prueba de atención

Solo un realmente atento programador debería ser capaz de entender tu código. Pero, ¿cómo comprobarlo?

**Una de las maneras -- usa nombre de variables similares, como `date` y `data`.**

Combínalos donde puedas.

Una lectura rápida de dicho código se hace imposible. Y cuando hay un error de tipografía.... Ummm... 
A quick read of such code becomes impossible. And when there's a typo... Ummm... Estamos atrapados por mucho tiempo, tiempo para tomar té.


## Sinónimos inteligentes

```quote author="Confucius"
Es difícil encontrar un gato negro en una habitación oscura, sobre todo cuando no está.
```

Usando nombres *similar* para las mismas cosas hace tu vida mas interesante y le muestra al público tu creatividad.

Por ejemplo, considera prefijos de funciones. Si una función muestra un mensaje en la pantalla -- comiénzalo con `mostrar...`, como `mostarMensaje`. Y entonces si otra función muestra en la pantalla otra cosa, como un nombre de usuario, comiénzalo con `presentar...` (como `presentarNombre`).

Insinúa que hay una diferencia sutil entre dichas funciones, cuando no lo hay.

Has un pacto con tus compañeros ninjas del equipo: si John comienza funciones de "mostrar" con `presentar...` en su código, entonces Peter podría usar `exhibir..`, y Ann -- `pintar...`. Nota como el código es mucho más interesante y diverso ahora.

...¡Y ahora el truco del sombrero!

Para dos funciones con importantes diferencias -- ¡usa el mismo prefijo!

Por ejemplo, la función `imprimirPagina(pagina)` usara una impresora. Y la función `imprimirTexto(texto)` mostrará el texto en la pantalla.. Deja que un lector no familiar a tu código piense sobre una función llamada de forma similar `imprimirMensaje`: "¿Dónde coloca el mensaje? ¿A una impresora o en la pantalla?. Como guinda al pastel, ¡`imprimirMensaje(mensaje)` debería mostrar el mensaje en una nueva ventana!

## Reúsa nombres

```quote author="Laozi (Tao Te Ching)"
Una vez que el todo se divide, las partes <br>
necesitan nombres. <br>
Ya hay suficientes nombres. <br>
Uno debe saber cuándo parar.
```

Añade una nueva variable solo cuando sea necesario.

En lugar, reúsa nombres que ya existen. Simplemente escribe nuevo valores en ellos.

En una función intenta solo usar las variables pasadas como parámetro.

Eso hará que sea realmente difícil identificar qué es exactamente la variable *ahora*. Y además de donde viene. El propósito es desarrollar la intuición y memoria de la persona que lee el código. Una persona con intuición débil tendrá que analizar el código línea por línea y seguir los cambios en cada rama de código.

**Una variante avanzada del enfoque es reemplazar los valores de forma encubierta con algo igual en la mitad de un bucle o una función.**

Por ejemplo:

```js
function ninjaFunction(elem) {
  // 20 líneas de código trabajando con elem

  elem = clone(elem);

  // 20 líneas más, ¡ahora trabajando con el clon de elem!
}
```

Un colega programador que quiera trabajar con `elem` en la segunda mitad de la función será sorprendido... ¡Solo durante la depuración, después de examinar el código encontrara que está trabajando con un clon!

Visto regularmente en códigos. Letalmente efectivo, incluso contra ninjas experimentados. 

## Guiones bajos por diversión

Coloca guiones bajos `_` y `__` antes de los nombres de las variables. Como `_name` o `__value`. Sería genial si solo tú sabes su significado. O, mejor, añádelos simplemente por diversión, sin ningún significado especial. O diferentes significados en diferentes lugares.

Matarás dos pájaros de un solo tiro. Primero, el código se hará más largo y menos legible, y segundo, un colega desarrollador podría gastar una gran cantidad de tiempo intentado entender el significado del guion bajo.

Un ninja inteligente coloca los guiones bajos en un solo lugar del código y los evita en otros lugars. Eso hace que el código sea mucho más frágil y aumenta la probabilidad de errores futuros.

## Muestra tu amor

¡Deja que todos vean cuán magníficas son tus entidades! Nombres como `superElement`, `megaFrame` and `niceItem` iluminaran sin duda al lector.

En efecto, por una parte, algo es escrito: `super..`, `mega..`, `nice..`, pero por otra parte -- no da ningún detalle. Un lector podría decidir mirar por un significado oculto y meditar por una hora o dos.


## Superpón variables externas

```quote author="Guan Yin Zi"
Cuando está a la luz, no puede ver nada en la oscuridad. <br>
Cuando está en la oscuridad, puede ver todo a la luz.
```

Usa los mismos nombres para variables dentro y fuera de una función. Así de simple. Sin el esfuerzo de inventar nuevos nombres.

```js
let *!*user*/!* = authenticateUser();

function render() {
  let *!*user*/!* = anotherValue();
  ...
  ...many lines...
  ...
  ... // <-- un programador quiere trabajar con user aquí y...
  ...
}
```

Un programador que se adentra en `render` probablemente no notara que hay un `user` local opacando al de afuera.

Entonces intentaran trabajar con `user` asumiendo que es la variable externa, el resultado de `authenticateUser()`...
Then they'll try to work with `user` assuming that it's the external variable, the result of `authenticateUser()`... ¡Se activa la trampa! Hola, depurador...


## ¡Efectos secundarios en todas partes!

Hay muchas funciones que parecen que no cambian nada. Como `estaListo()`, `comprobarPermiso()`, `encontrarEtiquetas()`... Se asume que sacan los cálculos, encuentran y regresan los datos, sin cambiar nada fuera de ellos. En otras palabras, sin "efectos secundarios".

**Un truco realmente bello es añadirles una acción "útil", además de su tarea principal.**

Una expresión de sorpresa aturdida aparecerá en la cara de tus colegas cuando vean que la función llamada `es..`, `comprobar..` o `encontrar...` cambia algo -- definitivamente ampliará tus límites de razón.

**Otra forma de sorprender es retornar un resultado no estándar**

¡Muestra tu pensamiento original! Deja que la llamada de `comprobarPermiso` retorne no `true/false`, pero un objeto complejo con los resultados de tu comprobación.

## Funciones poderosas!

```quote author="Laozi (Tao Te Ching)"
El gran Tao fluye por todas partes, <br>
tanto a la izquierda como a la derecha.
```

No limites la función por lo que está escrito en el nombre. Se más abierto.

Por ejemplo, una función `validarEmail(email)` podría (además de comprobar el email por exactitud) muestra un mensaje de error y preguntar de nuevo por el email.

Acciones adicionales no deberían ser obvias por el nombre de la función. Un verdadero programador ninja no las hará obvias por el código tampoco.  

**Uniendo muchas acciones en una proteje tu código de reusos.**

Imagina, otro desarrollador quiere solo comprobar el correo, y no mostrar ningún mensaje. Tu función `validarEmail(email)` que hace ambas no le será de utilidad. Así que no romperán tu meditación preguntando cualquier cosa sobre ello.

## Resumen

Todos los *consejos* anteriores son de código real... Algunas veces, escrito por desarrolladores experimentados. Quizás incluso más experimentado que tú ;)

- Sigue alguno de ellos, y tu código estará lleno de sorpresas.
- Sigue muchos de ellos, y tu código será realmente tuyo, nadie quera cambiarlo.
- Sigue todos, y tu código será una lección valiosa para desarrolladores jóvenes buscando iluminación.
