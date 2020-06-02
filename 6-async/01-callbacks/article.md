# Introducción: callbacks

Muchas acciones en JavaScript son _asíncronas_.

Por ejemplo, vemos la función `loadScript(src)`:

```js
function loadScript(src) {
  let script = document.createElement("script");
  script.src = src;
  document.head.append(script);
}
```

El propósito de la función es cargar un nuevo script. Cuando agrega el `<script src="…">` al documento, el navegador lo carga y ejecuta.

Podemos usarlo así:

```js
// loads and executes the script
loadScript("/my/script.js");
```

La función es llamada "asíncronamente", porque la acción (cargar el script) no termina ahora, sino luego.

La llamada inicia la carga del script, luego la ejecución continúa. Mientras el script está cargando, el código de abajo podría terminar su ejecución, y si la carga toma tiempo, otros scripts también pueden correr mientras tanto.

```js
loadScript("/my/script.js");
// el código debajo del script no espera a que termine la carga de script
// ...
```

Ahora, digamos que queremos usar el nuevo script cuando cargue. Probablemente el script declara nuevas funciones, así que nos gustaría ejecutarlas.

Pero si hacemos eso inmediatamente después de la llamada a `loadScript(…)`, no funcionaría:

```js
loadScript('/my/script.js'); // el script tiene una nueva función "function newFunction() {…}"

*!*
newFunction(); // no hay tal función!
*/!*
```

Naturalmente, el navegador probablemente no tuvo el tiempo de cargar el script. Así que el llamado inmediato de la nueva función falla. Por ahora, la función `loadScript` no provee una manera de rastrear que la carga se ha completado. El script carga y a la larga ejecuta, eso es todo. Pero nos gustaría saber cuándo sucede, para usar las funciones y variables de ese script.

Agreguemos un función `callback` como segundo argumento a `loadScript` que debe ejecutarse cuando el script carga:

```js
function loadScript(src, *!*callback*/!*) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(script);
*/!*

  document.head.append(script);
}
```

Ahora, si queremos cargar una nueva función del script, debemos escribirlo en la función callback:

```js
loadScript('/my/script.js', function() {
  // el callbck corre después de que el script ha sido cargado
  newFunction(); // ahora sí funciona
  ...
});
```

Esa es la idea: el segundo argumento es una función (usualmente anónima) que corre cuando la acción se ha completado.

Aquí hay un ejemplo ejecutable con un script real:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

*!*
loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`Genial, el ${script.src} esta cargado`);
  alert( _ ); // función declarada en el script cargado
});
*/!*
```

Eso se llama un estilo "callback-based" o "basado en callbacks" de programación asíncrona. Una función que hace algo de manera asíncrona debe proveer un argumento `callback` donde pongamos la función que correrá después de que sea completada.

Aquí lo hicimos en `loadScript`, pero por supuesto, es un enfoque general.

## Callback en callback

Como cargar dos script secuencialmente: el primero, ¿y luego el segundo después de ese?

La solución natural sería poner un segundo llamdo a `loadScript` dentro del callback, así:

```js
loadScript('/my/script.js', function(script) {

  alert(`Genial, el ${script.src} esta cargado, carguemos uno más`);

*!*
  loadScript('/my/script2.js', function(script) {
    alert(`Genial, el segundo script esta cargado`);
  });
*/!*

});
```

Después de que el `loadScript` exterior se ha completado, el callback inicia el interior.

¿Qué pasa si queremos cargar un script más?

```js
loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

*!*
    loadScript('/my/script3.js', function(script) {
      // ...continua después de que todos los scripts han cargado
    });
*/!*

  })

});
```

De esta manera, cada nueva acción está dentro de un callback. Esto está bien para unas pocas acciones, pero no tan bien para varias, así que veremos otras variantes pronto.

## Manejo de errors

En el ejemplo de arriba, no consideramos errores. ¿Qué pasa si al cargar el script falla? Nuestro callback debería poder reaccionar a eso.

Aquí hay una versión mejorada de `loadScript` que monitorea los errores de carga:

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

*!*
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
*/!*

  document.head.append(script);
}
```

Esta versión llama a `callback(null, script)` cuando la carga ha sido exitosa y a `callback(error)` en otro caso.

En uso:

```js
loadScript("/my/script.js", function(error, script) {
  if (error) {
    // handle error
  } else {
    // script loaded successfully
  }
});
```

Una vez más, la receta que usamos para `loadScript` es bastante usada. Es llamado estilo "error-first callback".

La convención es:

1. El primer argumento del callback `callback` es reservado para un error en caso que ocurra. Entonces se llama`callback(err)`.
2. El segundo argumento (y los siguientes si se necesita) son para el resultado exitoso. Entonces se llama `callback(null, result1, result2…)`.

De esta manera esta única función `callback` es usada para ambas cosas, reportar errores y pasar de vuelta los resultados.

## Pirámide de la catástrofe (Pyramid of Doom)

A primera vista, es una menera viable de código asíncrono. Y en sí, lo es. Para uno o dos callbacks anidados luce bien.

Pero para múltiples acciones asíncronas que siguen una después de otra tendremos código como este:

```js
loadScript('1.js', function(error, script) {

  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
  *!*
            // ...continua luego que todos los scripts han cargado (*)
  */!*
          }
        });

      }
    })
  }
});
```

En el código de arriba:

1. Cargamos `1.js`, entonces, si no hay error.
2. Cargamos `2.js`, entonces, si no hay error.
3. Cargamos `3.js`, entonces, si no hay error -- hacemos algo más `(*)`.

Mientras las llamadas se hagan más anidadas, el código se vuelve más profundo e incrementalmente más difícil de manejar, especialmente si tenemos código real en lugar de `...`, que puede incluir más bucles, declaraciones de condiciones y más.

Esto es a lo que algunas veces llamamos "infierno de callback" o "pirámide de la catástrofe."

![](callback-hell.png)

La "pirámide" de llamadas anidadas crece hacia la derecha en cada acción asíncrona. Pronto será una espiral fuera de control.

Así que esta manera de programar no es tan buena.

Podemos intentar aliviar el problema haciendo cada acción una función independiente, así:

```js
loadScript("1.js", step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("2.js", step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("3.js", step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...continue after all scripts are loaded (*)
  }
}
```

¿Ves? Hace lo mismo, y no hay anidación profunda ahora porque hicimos cada acción en una función separada al nivel más alto.

Funciona, pero el código luse ve como unaa hoja de cálculo partida. Es difícil de leer, probablemente ya lo notaste. Uno necesita saltar con la mirada entre las piezas mientras lo lee. Ese es el inconveniente, especiamente si el lector no esta familizarizado con el código y no sabe dónde saltar con la mirada.

Además, las funciones llamadas `step*` son todas de un solo uso. Sólo son creadas para evitar la "pirámide de la catástrofe". Nadie va a reusarlas fuera de la cadena de acciones. Así que hay un poco de sobrecarga de nombres aquí.

Nos gustaría algo mejor.

Por suerte, hay otras manera de evitar dichas pirámides. Una de las mejores maneras es usar "promesas", que se describen en el siguiente capítulo.
