# Promisification

Promisification (Promisificación) -- es una palabra larga para una simple transformación. Es una conversión: de una función que acepta un callback a una función que retorna una promesa.

En otras palabras, creamos una función de envoltura que realiza lo mismo, llamando a la original internamente, pero retornando una promesa.

<<<<<<< HEAD
Estas transformaciones son usualmente necesarias en la vida real, ya que muchas funciones y librerías están basadas en callbacks. Pero las promesas son mas convenientes, así que tiene sentido promisificar.

Por ejemplo, tenemos `loadScript(src, callback)` del capítulo <info:callbacks>.
=======
For better understanding, let's see an example.

For instance, we have `loadScript(src, callback)` from the chapter <info:callbacks>.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

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
The function loads a script with the given `src`, and then calls `callback(err)` in case of an error, or `callback(null, script)` in case of successful loading. That's a widespread agreement for using callbacks, we saw it before.

Let's promisify it. 

We'll make a new function `loadScriptPromise(src)`, that does the same (loads the script), but returns a promise instead of using callbacks.

In other words, we pass it only `src` (no `callback`) and get a promise in return, that resolves with `script` when the load is successful, and rejects with the error otherwise.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Here it is:
```js
let loadScriptPromise = function(src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

// uso:
// loadScriptPromise('path/script.js').then(...)
```

<<<<<<< HEAD
Ahora `loadScriptPromise` se ajusta bien a nuestro código basado en promesas.

Como podemos ver, le delega todo el trabajo a la función `loadScript` original, proveyendo su propio callback que es traducido a promise `resolve/reject`.

Como vamos a tener que promisificar muchas funciones, tiene sentido usar un ayudante.

Esto es en realidad muy simple -- La función `promisify(f)` debajo toma una función `f` que sera promisificada y retorna una función de envoltura (wrapper function).

Esa envoltura realiza lo mismo que el código de arriba: retorna una promesa y pasa el llamado a la `f` original, rastreando el resultado en un callback personalizado.

```js
function promisify(f) {
  return function (...args) { // retorna una función de envoltura
    return new Promise((resolve, reject) => {
      function callback(err, result) { // nuestro callback personalizado para f
=======
As we can see, the new function is a wrapper around the original `loadScript` function. It calls it providing its own callback that translates to promise `resolve/reject`.

Now `loadScriptPromise` fits well in promise-based code. If we like promises more than callbacks (and soon we'll see more reasons for that), then we will use it instead.

In practice we may need to promisify more than one function, so it makes sense to use a helper. 

We'll call it `promisify(f)`: it accepts a to-promisify function `f` and returns a wrapper function.

```js
function promisify(f) {
  return function (...args) { // return a wrapper-function (*)
    return new Promise((resolve, reject) => {
      function callback(err, result) { // our custom callback for f (**)
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // adjunta nuestro callback personalizado al final de los argumentos

      f.call(this, ...args); // llama a la función original
    });
  };
}

// uso:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

<<<<<<< HEAD
Aquí asumimos que la función original espera un callback con dos argumentos `(err, result)`. Eso es lo que usualmente encontramos. Entonces nuestro callback personalizado está exactamente en el formato correcto, y `promisify` funciona muy bien para tal caso.
=======
The code may look a bit complex, but it's essentially the same that we wrote above, while promisifying `loadScript` function.

A call to `promisify(f)` returns a wrapper around `f` `(*)`. That wrapper returns a promise and forwards the call to the original `f`, tracking the result in the custom callback `(**)`.

Here, `promisify` assumes that the original function expects a callback with exactly two arguments `(err, result)`. That's what we encounter most often. Then our custom callback is in exactly the right format, and `promisify` works great for such a case.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

¿Y si la `f` original espera un callback con más argumentos `callback(err, res1, res2)`?

<<<<<<< HEAD
Aquí hay una modificación de `promisify` que retorna un array de los múltiples resultados del callback:
=======
We can improve our helper. Let's make a more advanced version of `promisify`.

- When called as `promisify(f)` it should work similar to the version above.
- When called as `promisify(f, true)`, it should return the promise that resolves with the array of callback results. That's exactly for callbacks with many arguments.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

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
}

// Uso:
f = promisify(f, true);
f(...).then(arrayOfResults => ..., err => ...);
```
En algunos casos, puede que `err` esté ausente: `callback(result)`, o que haya algo que no es habitual en el formato del callback, por lo que tendremos que promisificar tales funciones manualmente.

<<<<<<< HEAD
También hay módulos con funciones de promisificación un poco más flexibles, ej. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). En Node.js, hay una función integrada `util.promisify` para ello.
=======
As you can see it's essentially the same as above, but `resolve` is called with only one or all arguments depending on whether `manyArgs` is truthy.

For more exotic callback formats, like those without `err` at all: `callback(result)`, we can promisify such functions manually without using the helper.

There are also modules with a bit more flexible promisification functions, e.g. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). In Node.js, there's a built-in `util.promisify` function for that.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

```smart
La promisificación es un excelente enfoque, especialmente cuando usas `async/await` (revisa el siguiente capítulo), pero no es totalmente un substituto para los callbacks.

Recuerda, una promesa puede tener sólo un resultado, pero un callback puede ser técnicamente llamado muchas veces.

Así que la promisificación está solo pensada para funciones que llaman al callback una vez. Las llamadas adicionales serán ignoradas.
```
