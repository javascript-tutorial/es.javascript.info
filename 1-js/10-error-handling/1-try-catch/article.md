# Manejo de errores, "try..catch"

<<<<<<< HEAD
No importa lo buenos que seamos en la programación, a veces nuestros scripts tienen errores. Pueden ocurrir debido a nuestros descuidos, una entrada inesperada del usuario, una respuesta errónea del servidor y por otras razones más.
=======
No matter how great we are at programming, sometimes our scripts have errors. They may occur because of our mistakes, an unexpected user input, an erroneous server response, and for a thousand other reasons.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Por lo general, un script "muere" (se detiene inmediatamente) en caso de error, imprimiéndolo en la consola.

<<<<<<< HEAD
Pero hay una construcción de sintaxis `try..catch` que nos permite "atrapar" errores para que el script pueda, en lugar de morir, hacer algo más razonable.
=======
But there's a syntax construct `try..catch` that allows us to "catch" errors so the script can, instead of dying, do something more reasonable.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## La sintaxis "try..catch"

La construcción `try..catch` tiene dos bloques principales: `try`, y luego `catch`:

```js
try {

  // código...

} catch (err) {

  // manipulación de error

}
```

Funciona así:

<<<<<<< HEAD
1. Primero, se ejecuta el código en `try {...}`.
2. Si no hubo errores, se ignora `catch(err)`: la ejecución llega al final de `try` y continúa, omitiendo `catch`.
3. Si se produce un error, la ejecución de `try` se detiene y el control fluye al comienzo de `catch(err)`. La variable `err` (podemos usar cualquier nombre para ella) contendrá un objeto de error con detalles sobre lo que sucedió.

![](try-catch-flow.svg)

Entonces, un error dentro del bloque `try {...}` no mata el script; tenemos la oportunidad de manejarlo en `catch`.

Veamos algunos ejemplos.
=======
1. First, the code in `try {...}` is executed.
2. If there were no errors, then `catch(err)` is ignored: the execution reaches the end of `try` and goes on, skipping `catch`.
3. If an error occurs, then the `try` execution is stopped, and control flows to the beginning of `catch(err)`. The `err` variable (we can use any name for it) will contain an error object with details about what happened.

![](try-catch-flow.svg)

So, an error inside the `try {…}` block does not kill the script -- we have a chance to handle it in `catch`.

Let's look at some examples.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

- Un ejemplo sin errores: muestra `alert` `(1)` y `(2)`:

    ```js run
    try {

      alert('Inicio de intentos de prueba');  // *!*(1) <--*/!*

      // ...no hay errores aquí

      alert('Fin de las ejecuciones de try');   // *!*(2) <--*/!*

    } catch(err) {

      alert('Se ignora catch porque no hay errores'); // (3)

    }
    ```
- Un ejemplo con un error: muestra `(1)` y `(3)`:

    ```js run
    try {

      alert('Inicio de ejecuciones try');  // *!*(1) <--*/!*

    *!*
      lalala; // error, variable no está definida!
    */!*

      alert('Fin de try (nunca alcanzado)');  // (2)

    } catch(err) {

<<<<<<< HEAD
      alert(`¡Un error ha ocurrido!`); // *!*(3) <--*/!*
=======
      alert(`Error has occurred!`); // *!*(3) <--*/!*
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    }
    ```


````warn header="`try..catch` solo funciona para errores de tiempo de ejecución"
Para que `try..catch` funcione, el código debe ser ejecutable. En otras palabras, debería ser JavaScript válido.

No funcionará si el código es sintácticamente incorrecto, por ejemplo, si hay llaves sin cerrar:

```js run
try {
  {{{{{{{{{{{{
} catch(e) {
  alert("El motor no puede entender este código, no es válido.");
}
```

<<<<<<< HEAD
El motor de JavaScript primero lee el código y luego lo ejecuta. Los errores que ocurren en la fase de lectura se denominan errores de "tiempo de análisis" y son irrecuperables (desde dentro de ese código). Eso es porque el motor no puede entender el código.

Entonces, `try..catch` solo puede manejar errores que ocurren en un código válido. Dichos errores se denominan "errores de tiempo de ejecución" o, a veces, "excepciones".
=======
The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phase are called "parse-time" errors and are unrecoverable (from inside that code). That's because the engine can't understand the code.

So, `try..catch` can only handle errors that occur in valid code. Such errors are called "runtime errors" or, sometimes, "exceptions".
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
````


````warn header="`try..catch` trabaja sincrónicamente"
Si ocurre una excepción en el código "programado", como en `setTimeout`, entonces `try..catch` no lo detectará:

```js run
try {
  setTimeout(function() {
    noSuchVariable; // el script morirá aquí
  }, 1000);
} catch (e) {
  alert( "no funcionará" );
}
```

<<<<<<< HEAD
Esto se debe a que la función en sí misma se ejecuta más tarde, cuando el motor ya ha abandonado la construcción `try..catch`.
=======
That's because the function itself is executed later, when the engine has already left the `try..catch` construct.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Para detectar una excepción dentro de una función programada, `try..catch` debe estar dentro de esa función:
```js run
setTimeout(function() {
  try {    
    noSuchVariable; // try..catch maneja el error!
  } catch {
    alert( "El error se detecta aquí!" );
  }
}, 1000);
```
````

## Objeto Error

Cuando se produce un error, JavaScript genera un objeto que contiene los detalles al respecto. El objeto se pasa como argumento para `catch`:

```js
try {
  // ...
} catch(err) { // <-- el "objeto error", podría usar otra palabra en lugar de err
  // ...
}
```

<<<<<<< HEAD
Para todos los errores integrados, el objeto error tiene dos propiedades principales:

`name`
: Nombre de error. Por ejemplo, para una variable indefinida que es `"ReferenceError"`.
=======
For all built-in errors, the error object has two main properties:

`name`
: Error name. For instance, for an undefined variable that's `"ReferenceError"`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

`message`
: Mensaje de texto sobre detalles del error.

Hay otras propiedades no estándar disponibles en la mayoría de los entornos. Uno de los más utilizados y compatibles es:

`stack`
: Pila de llamadas actual: una cadena con información sobre la secuencia de llamadas anidadas que condujeron al error. Utilizado para fines de depuración.

Por ejemplo:

```js run untrusted
try {
*!*
  lalala; // error, la variable no está definida!
*/!*
} catch(err) {
  alert(err.name); // ReferenceError
<<<<<<< HEAD
  alert(err.message); // lalala no está definida!
  alert(err.stack); // ReferenceError: lalala no está definida en (...call stack)
=======
  alert(err.message); // lalala is not defined
  alert(err.stack); // ReferenceError: lalala is not defined at (...call stack)
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

  // También puede mostrar un error como un todo
  // El error se convierte en cadena como "nombre: mensaje"
alert(err); // ReferenceError: lalala no está definido
}
```

## Omitiendo el "catch" asociado

[recent browser=new]

Si no necesitamos detalles del error, `catch` puede omitirlo:

```js
try {
  // ...
<<<<<<< HEAD
} catch { // <-- sin (err)
=======
} catch { // <-- without (err)
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  // ...
}
```

## Usando "try..catch"

Exploremos un caso de uso de la vida real de `try..catch`.

Como ya sabemos, JavaScript admite el método [JSON.parse(str)](mdn:js/JSON/parse) para leer valores codificados con JSON.

Por lo general, se utiliza para decodificar datos recibidos a través de la red, desde el servidor u otra fuente.

<<<<<<< HEAD
Lo recibimos y llamamos a `JSON.parse` así:
=======
We receive it and call `JSON.parse` like this:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
let json = '{"name":"John", "age": 30}'; // datos del servidor

*!*
let user = JSON.parse(json); // convierte la representación de texto a objeto JS
*/!*

// ahora user es un objeto con propiedades de la cadena
alert( user.name ); // John
alert( user.age );  // 30
```

Puede encontrar información más detallada sobre JSON en el capítulo <info:json>.

**Si `json` está mal formado, `JSON.parse` genera un error, por lo que el script "muere".**

<<<<<<< HEAD
¿Deberíamos estar satisfechos con eso? ¡Por supuesto no!
=======
Should we be satisfied with that? Of course not!
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

De esta manera, si algo anda mal con los datos, el visitante nunca lo sabrá (a menos que abra la consola del desarrollador). Y a la gente realmente no le gusta cuando algo "simplemente muere" sin ningún mensaje de error.

Usemos `try..catch` para manejar el error:

```js run
let json = "{ json malo }";

try {

*!*
  let user = JSON.parse(json); // <-- cuando ocurre un error ...
*/!*
  alert( user.name ); // no funciona

} catch (e) {
*!*
  // ...la ejecución salta aquí
  alert( "Nuestras disculpas, los datos tienen errores, intentaremos solicitarlos una vez más." );
  alert( e.name );
  alert( e.message );
*/!*
}
```

Aquí usamos el bloque `catch` solo para mostrar el mensaje, pero podemos hacer mucho más: enviar una nueva solicitud de red, sugerir una alternativa al visitante, enviar información sobre el error a una instalación de registro, .... Todo mucho mejor que solo morir.

## Lanzando nuestros propios errores

¿Qué sucede si `json` es sintácticamente correcto, pero no tiene una propiedad requerida de `name`?

Como este:

```js run
let json = '{ "age": 30 }'; // dato incompleto

try {

  let user = JSON.parse(json); // <-- sin errores
*!*
  alert( user.name ); // sin nombre!
*/!*

} catch (e) {
  alert( "no se ejecuta" );
}
```

Aquí `JSON.parse` se ejecuta normalmente, pero la ausencia de `name` es en realidad un error nuestro.

Para unificar el manejo de errores, usaremos el operador `throw`.

### El operador "throw" 

El operador `throw` genera un error.

La sintaxis es:

```js
throw <error object>
```

Técnicamente, podemos usar cualquier cosa como un objeto error. Eso puede ser incluso un primitivo, como un número o una cadena, pero es mejor usar objetos, preferiblemente con propiedades `name` y `message` (para mantenerse algo compatible con los errores incorporados).

JavaScript tiene muchos constructores integrados para manejar errores estándar: `Error`, `SyntaxError`, `ReferenceError`, `TypeError` y otros. Podemos usarlos para crear objetos de error también.

Su sintaxis es:

```js
let error = new Error(message);
// or
let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...
```

Para errores incorporados (no para cualquier objeto, solo para errores), la propiedad `name` es exactamente el nombre del constructor. Y `mensaje` se toma del argumento.

Por ejemplo:

```js run
let error = new Error("Estas cosas pasan... o_O");

alert(error.name); // Error
alert(error.message); // Estas cosas pasan... o_O
```

Veamos qué tipo de error genera `JSON.parse`:

```js run
try {
  JSON.parse("{ json malo o_O }");
} catch(e) {
*!*
  alert(e.name); // SyntaxError
*/!*
<<<<<<< HEAD
  alert(e.message); // Token b inesperado en JSON en la posición 2
=======
  alert(e.message); // Unexpected token b in JSON at position 2
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
}
```

Como podemos ver, ese es un `SyntaxError`.

<<<<<<< HEAD
Y en nuestro caso, la ausencia de `name` es un error, ya que los usuarios deben tener un `name`.
=======
And in our case, the absence of `name` is an error, as users must have a `name`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Así que vamos a lanzarlo:

```js run
let json = '{ "age": 30 }'; // dato incompleto

try {

  let user = JSON.parse(json); // <-- sin errores

  if (!user.name) {
*!*
    throw new SyntaxError("dato incompleto: sin nombre"); // (*)
*/!*
  }

  alert( user.name );

} catch(e) {
  alert( "Error en JSON: " + e.message ); // Error en JSON: dato incompleto: sin nombre
}
```

En la línea `(*)`, el operador `throw` genera un `SyntaxError` con el `message` dado, de la misma manera que JavaScript lo generaría él mismo. La ejecución de `try` se detiene inmediatamente y el flujo de control salta a `catch`.

Ahora `catch` se convirtió en un lugar único para todo el manejo de errores: tanto para `JSON.parse` como para otros casos.

## Relanzando (rethrowing)

<<<<<<< HEAD
En el ejemplo anterior usamos `try..catch` para manejar datos incorrectos. Pero, ¿es posible que *ocurra otro error inesperado* dentro del bloque `try{...}`? Como un error de programación (la variable no está definida) o algo más, no solo "datos incorrectos".

Por ejemplo:
=======
In the example above we use `try..catch` to handle incorrect data. But is it possible that *another unexpected error* occurs within the `try {...}` block? Like a programming error (variable is not defined) or something else, not just this "incorrect data" thing.

For example:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
let json = '{ "age": 30 }'; // dato incompleto

try {
  user = JSON.parse(json); // <-- olvidé poner "let" antes del usuario

  // ...
} catch(err) {
  alert("Error en JSON: " + err); // Error en JSON: ReferenceError: user no está definido
  // (no es error JSON)
}
```

<<<<<<< HEAD
¡Por supuesto, todo es posible! Los programadores cometen errores. Incluso en las utilidades de código abierto utilizadas por millones durante décadas, de repente se puede descubrir un error que conduce a hacks terribles.

En nuestro caso, `try..catch` está destinado a detectar errores de "datos incorrectos". Pero por su naturaleza, `catch` obtiene *todos* los errores de `try`. Aquí recibe un error inesperado, pero aún muestra el mismo mensaje de "Error en JSON". Eso está mal y también hace que el código sea más difícil de depurar.

Para evitar tales problemas, podemos emplear la técnica de "rethrowing". La regla es simple:

**Catch solo debe procesar los errores que conoce y "volver a lanzar" (rethrow) a todos los demás.**

La técnica de "rethrowing" puede explicarse con más detalle:

1. Catch captura todos los errores.
2. En el bloque `catch(err) {...}` analizamos el objeto error `err`.
3. Si no sabemos cómo manejarlo, hacemos 'throw err`.

Por lo general, podemos verificar el tipo de error usando el operador `instanceof`:
=======
Of course, everything's possible! Programmers do make mistakes. Even in open-source utilities used by millions for decades -- suddenly a bug may be discovered that leads to terrible hacks.

In our case, `try..catch` is placed to catch "incorrect data" errors. But by its nature, `catch` gets *all* errors from `try`. Here it gets an unexpected error, but still shows the same `"JSON Error"` message. That's wrong and also makes the code more difficult to debug.

To avoid such problems, we can employ the "rethrowing" technique. The rule is simple:

**Catch should only process errors that it knows and "rethrow" all others.**

The "rethrowing" technique can be explained in more detail as:

1. Catch gets all errors.
2. In the `catch(err) {...}` block we analyze the error object `err`.
3. If we don't know how to handle it, we do `throw err`.

Usually, we can check the error type using the `instanceof` operator:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
try {
  user = { /*...*/ };
} catch(err) {
*!*
  if (err instanceof ReferenceError) {
*/!*
<<<<<<< HEAD
    alert('ReferenceError'); // "ReferenceError" para acceder a una variable indefinida
=======
    alert('ReferenceError'); // "ReferenceError" for accessing an undefined variable
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  }
}
```

<<<<<<< HEAD
También podemos obtener el nombre de la clase error con la propiedad `err.name`. Todos los errores nativos lo tienen. Otra opción es leer `err.constructor.name`.
=======
We can also get the error class name from `err.name` property. All native errors have it. Another option is to read `err.constructor.name`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

En el siguiente código, usamos el rethrowing para que `catch` solo maneje `SyntaxError`:

```js run
let json = '{ "age": 30 }'; // dato incompleto
try {

  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("dato incompleto: sin nombre");
  }

*!*
  blabla(); // error inesperado
*/!*

  alert( user.name );

} catch(e) {

*!*
  if (e instanceof SyntaxError) {
<<<<<<< HEAD
    alert( "Error en JSON: " + e.message );
=======
    alert( "JSON Error: " + e.message );
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  } else {
    throw e; // rethrow (*)
  }
*/!*

}
```

El error lanzado en la línea `(*)` desde el interior del bloque `catch` cae desde `try..catch` y puede ser atrapado por una construcción externa `try..catch` (si existe), o mata al script.

Por lo tanto, el bloque `catch` en realidad maneja solo los errores con los que sabe cómo lidiar y "omite" todos los demás.

El siguiente ejemplo demuestra cómo dichos errores pueden ser detectados por un nivel más de `try..catch`:

```js run
function readData() {
  let json = '{ "age": 30 }';

  try {
    // ...
*!*
    blabla(); // error!
*/!*
  } catch (e) {
    // ...
    if (!(e instanceof SyntaxError)) {
*!*
      throw e; // rethrow (no sé cómo lidiar con eso)
*/!*
    }
  }
}

try {
  readData();
} catch (e) {
*!*
  alert( "La captura externa tiene: " + e ); // capturado!
*/!*
}
```

Aquí `readData` solo sabe cómo manejar `SyntaxError`, mientras que el `try..catch` externo sabe cómo manejar todo.

## try..catch..finally

Espera, eso no es todo.

La construcción `try..catch` puede tener una cláusula de código más: `finally`.

Si existe, se ejecuta en todos los casos:

- después de `try`, si no hubo errores,
- después de `catch`, si hubo errores.

La sintaxis extendida se ve así:

```js
*!*try*/!* {
   ... intenta ejecutar el código ...
} *!*catch*/!*(e) {
   ... capturar errores ...
} *!*finally*/!* {
   ... ejecutar siempre ...
}
```

Intenta ejecutar este código:

```js run
try {
  alert( 'intenta (try)' );
  if (confirm('¿Cometer un error?')) BAD_CODE();
} catch (e) {
  alert( 'atrapa (catch)' );
} finally {
  alert( 'finalmente (finally)' );
}
```

El código tiene dos formas de ejecución:

1. Si responde "Sí" a "¿Cometer un error?", Entonces `try -> catch -> finally`.
2. Si dice "No", entonces `try -> finally`.

<<<<<<< HEAD
La cláusula `finally` a menudo se usa cuando comenzamos a hacer algo y queremos finalizarlo en cualquier resultado.
=======
The `finally` clause is often used when we start doing something and want to finalize it in any case of outcome.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Por ejemplo, queremos medir el tiempo que tarda una función de números de Fibonacci `fib(n)`. Naturalmente, podemos comenzar a medir antes de que se ejecute y terminar después. ¿Pero qué pasa si hay un error durante la llamada a la función? En particular, la implementación de `fib(n)` en el código siguiente devuelve un error para números negativos o no enteros.

La cláusula `finally` es un excelente lugar para terminar las mediciones, pase lo que pase.

Aquí `finally` garantiza que el tiempo se medirá correctamente en ambas situaciones, en caso de una ejecución exitosa de `fib` y en caso de error:

```js run
let num = +prompt("Ingrese un número entero positivo?", 35)

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Debe ser un número positivo y entero.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (e) {
  result = 0;
*!*
} finally {
  diff = Date.now() - start;
}
*/!*

<<<<<<< HEAD
alert(result || "error ocurrido");
=======
alert(result || "error occurred");
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

alert( `la ejecución tomó ${diff}ms` );
```

<<<<<<< HEAD
Puede verificar ejecutando el código e ingresando `35` en `prompt`; se ejecuta normalmente, `finally` después de `try`. Y luego ingrese `-1` - habrá un error inmediato, y la ejecución tomará `0ms`. Ambas mediciones se realizan correctamente.

En otras palabras, la función puede terminar con `return` o `throw`, eso no importa. La cláusula `finally` se ejecuta en ambos casos.
=======
You can check by running the code with entering `35` into `prompt` -- it executes normally, `finally` after `try`. And then enter `-1` -- there will be an immediate error, and the execution will take `0ms`. Both measurements are done correctly.

In other words, the function may finish with `return` or `throw`, that doesn't matter. The `finally` clause executes in both cases.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187


```smart header="Las variables son locales dentro de `try..catch..finally`"
Tenga en cuenta que las variables `result` y `diff` en el código anterior se declaran *antes de* `try..catch`.

<<<<<<< HEAD
De lo contrario, si declaramos `let` en el bloque `try`, solo sería visible dentro de él.
=======
Otherwise, if we declared `let` in `try` block, it would only be visible inside of it.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
```

````smart header="`finally` y `return`"
La cláusula `finally` funciona para *cualquier* salida de `try..catch`. Eso incluye un `return` explícito.

En el ejemplo a continuación, hay un `return` en `try`. En este caso, `finally` se ejecuta justo antes de que el control regrese al código externo.

```js run
function func() {

  try {
*!*
    return 1;
*/!*

  } catch (e) {
    /* ... */
  } finally {
*!*
    alert( 'finally' );
*/!*
  }
}

alert( func() ); // primero funciona la alerta de "finally", y luego este
```
````

````smart header="`try..finally`"

<<<<<<< HEAD
La construcción `try..finally`, sin la cláusula `catch`, también es útil. Lo aplicamos cuando no queremos manejar los errores (se permite que se pierdan), pero queremos asegurarnos de que los procesos que comenzamos estén finalizados.
=======
The `try..finally` construct, without `catch` clause, is also useful. We apply it when we don't want to handle errors here (let them fall through), but want to be sure that processes that we started are finalized.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
function func() {
  // comenzar a hacer algo que necesita ser completado (como mediciones)
  try {
    // ...
  } finally {
    // completar esto si todo muere
  }
}
```
<<<<<<< HEAD
En el código anterior, siempre se produce un error dentro de `try`, porque no hay `catch`. Pero `finally` funciona antes de que el flujo de ejecución abandone la función.
=======
In the code above, an error inside `try` always falls out, because there's no `catch`. But `finally` works before the execution flow leaves the function.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
````

## Captura global

```warn header="Específico del entorno"
La información de esta sección no es parte del núcleo de JavaScript.
```

<<<<<<< HEAD
Imaginemos que tenemos un error fatal fuera de `try..catch`, y el script murió. Como un error de programación o alguna otra cosa terrible.

¿Hay alguna manera de reaccionar ante tales ocurrencias? Es posible que queramos registrar el error, mostrarle algo al usuario (normalmente no ve mensajes de error), etc.

No hay ninguna en la especificación, pero los entornos generalmente lo proporcionan, porque es realmente útil. Por ejemplo, Node.js tiene [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception) para eso. Y en el navegador podemos asignar una función a la propiedad especial [window.onerror](mdn:api/GlobalEventHandlers/onerror), que se ejecutará en caso de un error no detectado.
=======
Let's imagine we've got a fatal error outside of `try..catch`, and the script died. Like a programming error or some other terrible thing.

Is there a way to react on such occurrences? We may want to log the error, show something to the user (normally they don't see error messages), etc.

There is none in the specification, but environments usually provide it, because it's really useful. For instance, Node.js has [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception) for that. And in the browser we can assign a function to the special [window.onerror](mdn:api/GlobalEventHandlers/onerror) property, that will run in case of an uncaught error.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

La sintaxis:

```js
window.onerror = function(message, url, line, col, error) {
  // ...
};
```

`message`
: Mensaje de error.

`url`
: URL del script donde ocurrió el error.

`line`, `col`
: Números de línea y columna donde ocurrió el error.

`error`
: El objeto error.

Por ejemplo:

```html run untrusted refresh height=1
<script>
*!*
  window.onerror = function(message, url, line, col, error) {
    alert(`${message}\n At ${line}:${col} of ${url}`);
  };
*/!*

  function readData() {
    badFunc(); // ¡Vaya, algo salió mal!
  }

  readData();
</script>
```

El rol del controlador global `window.onerror` generalmente no es recuperar la ejecución del script, probablemente sea imposible en caso de errores de programación, pero sí enviar el mensaje de error a los desarrolladores.

También hay servicios web que proporcionan registro de errores para tales casos, como <https://errorception.com> o <http://www.muscula.com>.

Ellos trabajan asi:

<<<<<<< HEAD
1. Nos registramos en el servicio y obtenemos un fragmento de JS (o una URL de script) para insertar en las páginas.
2. Ese script JS establece una función personalizada `window.onerror`.
3. Cuando se produce un error, envía una solicitud de red al servicio.
4. Podemos iniciar sesión en la interfaz web del servicio y ver errores.
=======
1. We register at the service and get a piece of JS (or a script URL) from them to insert on pages.
2. That JS script sets a custom `window.onerror` function.
3. When an error occurs, it sends a network request about it to the service.
4. We can log in to the service web interface and see errors.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

## Resumen

<<<<<<< HEAD
La construcción `try..catch` permite manejar errores de tiempo de ejecución. Literalmente permite "intentar (try)" ejecutar el código y "atrapar (catch)" errores que pueden ocurrir en él.
=======
The `try..catch` construct allows to handle runtime errors. It literally allows to "try" running the code and "catch" errors that may occur in it.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

La sintaxis es:

```js
try {
  // ejecuta este código
} catch(err) {
  // si ocurrió un error, entonces salta aquí
  // err es el objeto error
} finally {
  // hacer en cualquier caso después de try/catch
}
```

<<<<<<< HEAD
Puede que no haya una sección `catch` o `finally`, por lo que las construcciones más cortas `try..catch` y `try..finally` también son válidas.
=======
There may be no `catch` section or no `finally`, so shorter constructs `try..catch` and `try..finally` are also valid.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Los objetos Error tienen las siguientes propiedades:

<<<<<<< HEAD
- `message` -- el mensaje de error legible por humanos.
- `name` -- la cadena con el nombre del error (nombre del constructor de error).
- `stack` (No estándar, pero bien soportado) -- la pila en el momento de la creación del error.

Si no se necesita un objeto error, podemos omitirlo usando `catch {` en lugar de `catch(err) {`.
=======
- `message` -- the human-readable error message.
- `name` -- the string with error name (error constructor name).
- `stack` (non-standard, but well-supported) -- the stack at the moment of error creation.

If an error object is not needed, we can omit it by using `catch {` instead of `catch(err) {`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

También podemos generar nuestros propios errores utilizando el operador `throw`. Técnicamente, el argumento de `throw` puede ser cualquier cosa, pero generalmente es un objeto error heredado de la clase incorporada `Error`. Más sobre la extensión de errores en el próximo capítulo.

<<<<<<< HEAD
*Relanzado (rethrowing)* es un patrón muy importante de manejo de errores: un bloque `catch` generalmente espera y sabe cómo manejar el tipo de error en particular, por lo que debería relanzar errores que no conoce.

Incluso si no tenemos `try..catch`, la mayoría de los entornos nos permiten configurar un controlador de errores "global" para detectar los errores que caigan. En el navegador, eso es `window.onerror`.
=======
*Rethrowing* is a very important pattern of error handling: a `catch` block usually expects and knows how to handle the particular error type, so it should rethrow errors it doesn't know.

Even if we don't have `try..catch`, most environments allow us to setup a "global" error handler to catch errors that "fall out". In-browser, that's `window.onerror`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
