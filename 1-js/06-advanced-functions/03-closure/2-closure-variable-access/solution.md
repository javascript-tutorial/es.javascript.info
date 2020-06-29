<<<<<<< HEAD

La respuesta es: **Pete**.

La función `work()` en el código a continuación obtiene `name` del lugar de su origen a través de la referencia del entorno léxico externo:

![](lexenv-nested-work.svg)

Entonces, el resultado es "Pete".

Pero si no hubiera `let name` en` makeWorker () `, entonces la búsqueda saldría y tomaría la variable global como podemos ver en la cadena de arriba. En ese caso, el resultado sería `John`.

=======
The answer is: **Pete**.

The `work()` function in the code below gets `name` from the place of its origin through the outer lexical environment reference:

![](lexenv-nested-work.svg)

So, the result is `"Pete"` here.

But if there were no `let name` in `makeWorker()`, then the search would go outside and take the global variable as we can see from the chain above. In that case the result would be `"John"`.
>>>>>>> 340ce4342100f36bb3c4e42dbe9ffa647d8716c8
