# El modo moderno, "use strict"

Durante mucho tiempo, JavaScript evolucionó sin problemas de compatibilidad. Se añadían nuevas características al lenguaje sin que la funcionalidad existente cambiase.

Esto tenía el beneficio de nunca romper código existente, pero lo malo era que cualquier error o decisión incorrecta tomada por los creadores de JavaScript se quedaba para siempre en el lenguage.

<<<<<<< HEAD
Esto fue así hasta 2009, cuando ECMAScript 5 (ES5) apareció. Esta versión añadío nuevas características al lenguaje y modificó algunas de las ya existentes. Para mantener el código antiguo funcionando, la mayor parte de las modificaciones están desactivadas por defecto. Tienes que activarlas explícitamente usando una directiva especial: `"use strict"`.
=======
This was the case until 2009 when ECMAScript 5 (ES5) appeared. It added new features to the language and modified some of the existing ones. To keep the old code working, most such modifications are off by default. You need to explicitly enable them with a special directive: `"use strict"`.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

## "use strict"

La directiva se asemeja a un string: `"use strict"`. Cuando se sitúa al principio de un script, el script entero funciona de la manera "moderna".

Por ejemplo:

```js
"use strict";

// este código funciona de la manera moderna
...
```

<<<<<<< HEAD
Aprenderemos funciones (una manera de agrupar comandos) en breve, pero adelantemos que `"use strict"` se puede poner al inicio de una función. De esta manera, se activa el modo estricto únicamente en esa función. Pero normalmente se utiliza para el script entero.

````warn header="Asegúrate de que \"use strict\" está al inicio"
Por favor, asegúrate de que `"use strict"` está al principio de tus scripts. Si no, el modo estricto podría no estar activado.

El modo estricto no está activado aquí:
=======
Quite soon we're going to learn functions (a way to group commands), so let's note in advance that `"use strict"` can be put at the beginning of a function. Doing that enables strict mode in that function only. But usually people use it for the whole script.

````warn header="Ensure that \"use strict\" is at the top"
Please make sure that `"use strict"` is at the top of your scripts, otherwise strict mode may not be enabled.

Strict mode isn't enabled here:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js no-strict
alert("algo de código");
// la directiva "use strict" de abajo es ignorada, tiene que estar al principio

"use strict";

// el modo estricto no está activado
```

Únicamente pueden aparecer comentarios por encima de `"use strict"`.
````

```warn header="No hay manera de cancelar `use strict`"
No hay ninguna directiva del tipo `"no use strict"` que haga al motor volver al comportamiento anterior.

<<<<<<< HEAD
Una vez entramos en modo estricto, no hay vuelta atrás.
=======
Once we enter strict mode, there's no going back.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
```

## Consola del navegador

Cuando utilices la [consola del navegador](info:devtools) para ejecutar código, ten en cuenta que no utiliza `use strict` por defecto.

En ocasiones, donde `use strict` cause diferencia, obtendrás resultados incorrectos.

Entonces, ¿como utilizar `use strict` en la consola? 

<<<<<<< HEAD
Primero puedes intentar pulsando `key:Shift+Enter` para ingresar múltiples líneas y poner `use strict` al principio, como aquí:
=======
When you use a [developer console](info:devtools) to run code, please note that it doesn't `use strict` by default.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js
'use strict'; <Shift+Enter para una nueva línea>
//  ...tu código
<Intro para ejecutar>
```

<<<<<<< HEAD
Esto funciona para la mayoría de los navegadores, específicamente Firefox y Chrome.

Si esto no funciona, como en los viejos navegadores, hay una fea pero confiable manera de asegurar `use strict`. Ponlo dentro de esta especie de envoltura:
=======
So, how to actually `use strict` in the console?

First, you can try to press `key:Shift+Enter` to input multiple lines, and put `use strict` on top, like this:

```js
'use strict'; <Shift+Enter for a newline>
//  ...your code
<Enter to run>
```

It works in most browsers, namely Firefox and Chrome.

If it doesn't, e.g. in an old browser, there's an ugly, but reliable way to ensure `use strict`. Put it inside this kind of wrapper:
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

```js
(function() {
  'use strict';

<<<<<<< HEAD
  // ...tu código...
})()
```

## ¿Deberíamos utilizar "use strict"?

La pregunta podría parecer obvia, pero no lo es.

Uno podría recomentar que se comiencen los script con `"use strict"`... ¿Pero sabes lo que es interesante?

El JavaScript moderno admite "clases" y "módulos", estructuras de lenguaje avanzadas (que seguramente llegaremos a ver), que automáticamente habilitan `use strict`. Entonces no necesitamos agregar la directiva `"use strict"` si las usamos.

**Entonces, por ahora `"use strict";` es un invitado bienvenido al tope de tus scripts. Luego, cuando tu código sea todo clases y módulos, puedes omitirlo.**

A partir de ahora tenemos que saber acerca de `use strict` en general.

En los siguientes capítulos, a medida que aprendamos características del lenguaje, veremos las diferencias entre el modo estricto y el antiguo. Afortunadamente no hay muchas y realmente hacen nuestra vida mejor.

Todos los ejemplos en este tutorial asumen modo estricto salvo que (muy raramente) se especifique lo contrario.
=======
  // ...your code here...
})()
```

## Should we "use strict"?

The question may sound obvious, but it's not so.

One could recommend to start scripts with `"use strict"`... But you know what's cool?

Modern JavaScript supports "classes" and "modules" - advanced language structures (we'll surely get to them), that enable `use strict` automatically. So we don't need to add the `"use strict"` directive, if we use them.

**So, for now `"use strict";` is a welcome guest at the top of your scripts. Later, when your code is all in classes and modules, you may omit it.**

As of now, we've got to know about `use strict` in general.

In the next chapters, as we learn language features, we'll see the differences between the strict and old modes. Luckily, there aren't many and they actually make our lives better.

All examples in this tutorial assume strict mode unless (very rarely) specified otherwise.
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d
