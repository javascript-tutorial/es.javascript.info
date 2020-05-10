La respuesta es: **Pete**.

La función `work()` en el código a continuación obtiene `name` del lugar de su origen a través de la referencia del entorno léxico externo:

![](lexenv-nested-work.svg)

Entonces, el resultado es "Pete".

Pero si no hubiera `let name` en` makeWorker () `, entonces la búsqueda saldría y tomaría la variable global como podemos ver en la cadena de arriba. En ese caso, el resultado sería `John`.
