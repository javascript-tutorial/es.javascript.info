# Promisification

<<<<<<< HEAD
Promisification (Promisificación) -- es una palabra larga para una simple transformación. Es una conversión: de una función que acepta un callback a una función que retorna una promesa.

En otras palabras, creamos una función de envoltura que realiza lo mismo, llamando a la original internamente, pero retornando una promesa.

Estas transformaciones son usualmente necesarias en la vida real, ya que muchas funciones y librerías están basadas en callbacks. Pero las promesas son mas convenientes, así que tiene sentido promisificar.
=======
"Promisification" is a long word for a simple transformation. It's the conversion of a function that accepts a callback into a function that returns a promise.

Such transformations are often required in real-life, as many functions and libraries are callback-based. But promises are more convenient, so it makes sense to promisify them.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Por ejemplo, tenemos `loadScript(src, callback)` del capítulo <info:callbacks>.

```js run
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Error de carga de script para ${src}`));

  document.head.append(script);
}

// uso:
// loadScript('path/script.js', (err, script) => {...})
```

<<<<<<< HEAD
Vamos a promisificarla. La función nueva `loadScriptPromise(src)` va a hacer lo mismo, pero solo acepta `src` (sin callback) y retorna una promesa.
=======
Let's promisify it. The new `loadScriptPromise(src)` function achieves the same result, but it accepts only `src` (no `callback`) and returns a promise.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err)
      else resolve(script);
    });
  })
}

// uso:
// loadScriptPromise('path/script.js').then(...)
```

<<<<<<< HEAD
Ahora `loadScriptPromise` se ajusta bien a nuestro código basado en promesas.
=======
Now `loadScriptPromise` fits well in promise-based code.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Como podemos ver, le delega todo el trabajo a la función `loadScript` original, proveyendo su propio callback que es traducido a promise `resolve/reject`.

<<<<<<< HEAD
Como vamos a tener que promisificar muchas funciones, tiene sentido usar un ayudante.

Esto es en realidad muy simple -- La función `promisify(f)` debajo toma una función `f` que sera promisificada y retorna una función de envoltura (wrapper function).
=======
In practice we'll probably need to promisify many functions, so it makes sense to use a helper. We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Esa envoltura realiza lo mismo que el código de arriba: retorna una promesa y pasa el llamado a la `f` original, rastreando el resultado en un callback personalizado.

```js
function promisify(f) {
  return function (...args) { // retorna una función de envoltura
    return new Promise((resolve, reject) => {
      function callback(err, result) { // nuestro callback personalizado para f
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

<<<<<<< HEAD
      args.push(callback); // adjunta nuestro callback personalizado al final de los argumentos
=======
      args.push(callback); // append our custom callback to the end of f arguments
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

      f.call(this, ...args); // llama a la función original
    });
  };
};

// uso:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Aquí asumimos que la función original espera un callback con dos argumentos `(err, result)`. Eso es lo que usualmente encontramos. Entonces nuestro callback personalizado está exactamente en el formato correcto, y `promisify` funciona muy bien para tal caso.

<<<<<<< HEAD
¿Y si la `f` original espera un callback con más argumentos `callback(err, res1, res2)`?

Aquí hay una modificación de `promisify` que retorna un array de los múltiples resultados del callback:
=======
But what if the original `f` expects a callback with more arguments `callback(err, res1, res2, ...)`?

Here's a more advanced version of `promisify`: if called as `promisify(f, true)`, the promise result will be an array of callback results `[res1, res2, ...]`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
// promisify(f, true) para conseguir array de resultados
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // Nuestro callback personalizado para f
        if (err) {
          reject(err);
        } else {
          // Retornar todos los resultados del callback si manyArgs es especificado
          *!*resolve(manyArgs ? results : results[0]);*/!*
        }
      }

      args.push(callback);

      f.call(this, ...args);
    });
  };
};

// Uso:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...)
```
En algunos casos, puede que `err` esté ausente: `callback(result)`, o que haya algo que no es habitual en el formato del callback, por lo que tendremos que promisificar tales funciones manualmente.

<<<<<<< HEAD
También hay módulos con funciones de promisificación un poco más flexibles, ej. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). En Node.js, hay una función integrada `util.promisify` para ello.
=======
For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.

There are also modules with a bit more flexible promisification functions, e.g. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). In Node.js, there's a built-in `util.promisify` function for that.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```smart
La promisificación es un excelente enfoque, especialmente cuando usas `async/await` (revisa el siguiente capítulo), pero no es totalmente un substituto para los callbacks.

Recuerda, una promesa puede tener sólo un resultado, pero un callback puede ser técnicamente llamado muchas veces.

Así que la promisificación está solo pensada para funciones que llaman al callback una vez. Las llamadas adicionales serán ignoradas.
```
