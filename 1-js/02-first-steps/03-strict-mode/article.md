# El modo moderno, "use strict".

Durante mucho tiempo, JavaScript evolucionó sin problemas de compatibilidad. Se agregaron nuevas funciones al lenguaje, mientras que la funcionalidad anterior no cambió.

Eso tuvo la ventaja de no romper nunca el código existente. Pero el inconveniente fue que cualquier error o una decisión incorrecta tomada por los creadores de JavaScript se quede en el lenguaje para siempre.

Este fue el caso hasta 2009 cuando apareció ECMAScript 5 (ES5). Añadió nuevas características al lenguaje y modificó algunas de las existentes. Para mantener el código antiguo en funcionamiento, la mayoría de las modificaciones están desactivadas de forma predeterminada. Debe habilitarlos explícitamente con una directiva especial: `"use strict"`.

## "use strict"

La directiva es una cadena de texto: `"use strict"` o `'use strict'`. Cuando se encuentra en la parte superior de un script, todo el script funciona de la manera "moderna".

Por ejemplo:

```js
"use strict";

// este código funciona de manera moderna
...
```

Aprenderemos funciones (una forma de agrupar comandos) pronto.

De cara al futuro, observaremos que `"use strict"` puede ponerse al comienzo de la mayoría de las funciones en lugar de todo el script. Hacer eso habilita el modo estricto solo en esa función. Pero usualmente, la gente lo usa para todo el script.


````warn header="Asegúrese de que \"use strict\" esté en la parte superior"
Asegúrese de que `"use strict"` esté en la parte superior de sus scripts, de lo contrario el modo estricto podría no estar habilitado.

El modo estricto no está habilitado aquí:

```js no-strict
alert("algún código");
// el "use strict" a continuación se ignora, debe estar en la parte superior

"use strict";

// el modo estricto no está activado
```

Solo los comentarios pueden aparecer arriba de `"use strict"`.
````

```warn header="No hay manera de cancelar `use strict`"
No existe una directiva como `"no use strict"` que revierte el motor al comportamiento anterior.

Una vez que entramos en modo estricto, no hay retorno.
```

## Consola del navegador

Para el futuro, cuando utilice una consola del navegador para probar las funciones, tenga en cuenta que, de forma predeterminada, no está en modo estricto.

A veces, cuando `use strict` hace una diferencia, obtendrás resultados incorrectos.

Incluso si presionamos `key:Shift+Enter` para ingresar múltiples líneas, y ponemos `use strict` en la parte superior, no funciona. Esto se debe a cómo la consola ejecuta el código internamente.

La manera confiable de activar el modo estricto sería ingresar el código en la consola de esta manera:

```js
(function() {
  'use strict';

  // ...su código...
})()
```

## Siempre usar "use strict"

Todavía tenemos que cubrir las diferencias entre el modo estricto y el modo "predeterminado".

En los siguientes capítulos, a medida que aprendamos las características del lenguaje, notaremos las diferencias entre los modos estricto y predeterminado. Afortunadamente, no son muchos y en realidad hacen que nuestras vidas sean mejores.

Por ahora, basta con saber que:

1. La directiva `"use strict"` cambia el motor al modo "moderno", cambiando el comportamiento de algunas características incorporadas. Veremos los detalles más adelante en el tutorial.
2. El modo estricto se habilita al colocar `"use strict"` en la parte superior de un script o función. Varias características de lenguaje, como "clases" y "módulos", habilitan el modo estricto automáticamente.
3. El modo estricto es compatible con todos los navegadores modernos.
4. Recomendamos comenzar siempre los scripts con `"use strict"`. Todos los ejemplos en este tutorial asumen un modo estricto a menos que (muy raramente) se especifique lo contrario.
