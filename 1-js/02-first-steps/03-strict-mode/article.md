# El modo moderno, "use strict"

Durante mucho tiempo, JavaScript evolucionó sin problemas de compatibilidad. Se añadían nuevas características al lenguaje sin que la funcionalidad existente cambiase.

Esto tenía el beneficio de nunca romper código existente, pero lo malo era que cualquier error o decisión incorrecta tomada por los creadores de JavaScript se quedaba para siempre en el lenguage.

<<<<<<< HEAD
Esto fue así hasta 2009, cuando ECMAScript 5 (ES5) apareció. Esta versión añadío nuevas características al lenguaje y modificó algunas de las ya existentes. Para mantener el código antiguo funcionando, la mayor parte de las modificaciones están desactivadas por defecto. Tienes que activarlas explícitamente usando una directiva especial: `"use strict"`.
=======
This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

## "use strict"

La directiva se asemeja a un string: `"use strict"`. Cuando se sitúa al principio de un script, el script entero funciona de la manera "moderna".

Por ejemplo:

```js
"use strict";

// este código funciona de la manera moderna
...
```

<<<<<<< HEAD
Aprenderemos funciones (una manera de agrupar comandos) en breve.

De cara al futuro, tengamos en cuenta que `"use strict"` se puede poner al inicio de la mayoría de los tipos de funciones en lugar del script entero. De esta manera, se activa el modo estricto únicamente en esa función. Pero, normalmente, la gente lo utiliza para el script entero.
=======
We will learn functions (a way to group commands) soon. Looking ahead, let's note that `"use strict"` can be put at the beginning of the function body instead of the whole script. Doing that enables strict mode in that function only. But usually, people use it for the whole script.
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

````warn header="Asegúrate de que \"use strict\" está al inicio"
Por favor, asegúrate de que `"use strict"` está al principio de tus scripts. Si no, el modo estricto podría no estar activado.

El modo estricto no está activado aquí:

```js no-strict
alert("algo de código");
// la directiva "use strict" de abajo es ignorada, tiene que estar al principio

"use strict";

// el modo estricto no está activado
```

Únicamente pueden aparecer comentarios por encima de `"use strict"`.
````

````warn header="No hay manera de cancelar `use strict`"
No hay ninguna directiva del tipo `"no use strict"` que haga al motor volver al comportamiento anterior.

Una vez entramos en modo estricto, no hay vuelta atrás.
````

## Consola del navegador

A partir de ahora, cuando utilices la consola del navegador para probar características, ten en cuenta que no utiliza `use strict` por defecto.

En ocasiones, cuando `use strict` causa una diferencia, obtendrás resultados incorrectos.

<<<<<<< HEAD
Incluso si pulsamos `key:Shift+Enter` para ingresar múltiples líneas y ponemos `use strict` al principio, no funciona. Esto es por cómo la consola ejecuta el código internamente.

La única manera confiable de asegurar que `use strict` funcionará sería escribir el código en la consola de la siguiente forma:
=======
You can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:

```js
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```

It works in most browsers, namely Firefox and Chrome.

If it doesn't, the most reliable way to ensure `use strict` would be to input the code into console like this:
>>>>>>> 3dd8ca09c1a7ed7a7b04eefc69898559902478e1

```js
(function() {
  'use strict';

  // ...tu código...
})()
```

## Utiliza siempre "use strict"

Aún tenemos que comentar las diferencias entre el modo estricto y el modo "por defecto".

En los siguientes capítulos, según aprendamos características del lenguaje, veremos las diferencias entre los modos estricto y por defecto. Afortunadamente, no hay tantas y, de hecho, nos hacen la vida más fácil.

De momento, es suficiente saber lo general:

1. La directiva `"use strict"` cambia el motor de ejecución al modo "moderno", modificando el comportamiento de algunas características incluídas en el lenguaje. Veremos los detalles más adelante.
2. El modo estricto se habilita poniendo `"use strict"` al principio de una función o del script. Varias características del lenguaje, como las "clases" y los "módulos", activan el modo estricto automáticamente.
3. El modo estricto funciona en todos los navegadores modernos.
4. Recomendamos empezar todos los scripts siempre con `"use strict"`. Todos los ejemplos de este tutorial asumen que el modo estricto está activado excepto cuando (muy raramente) se especifica lo contrario.
