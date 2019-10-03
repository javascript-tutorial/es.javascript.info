# Promisification

Promisification (Promisificación) -- es una palabra larga para una simple transformación. Es una conversión de una función que acepta un callback a una función que retorna una promesa.

En otras palabras, creamos una función de envoltura que realiza lo mismo, llamando a la original internamente, pero retornando una promesa.

Estas transformaciones son usualmente necesarias en la vida real, ya que muchas funciones y librerías están basadas en callbacks. Pero las promesas son mas convenientes, así que tiene sentido promisificar.

Por ejemplo, tenemos `loadScript(src, callback)` del capitulo <info:callbacks>.

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

Vamos a promisificarla. La funcion nueva `loadScriptPromise(src)` va a hacer lo mismo, pero solo acepta `src` (sin callback) y retorna una promesa.

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

Ahora `loadScriptPromise` se ajusta bien a nuestro código basado en promesas.

Como podemos ver, le delega todo el trabajo a la función `loadScript` original, proveyendo su propio callback que es traducido a promise `resolve/reject`.

Como vamos a tener que promisificar muchas funciones, tiene sentido usar un ayudante.

Esto es en realidad muy simple -- La función `promisify(f)` debajo toma una función `f` que sera promisificada y retorna una función de envoltura.

Esa envoltura realiza lo mismo que el código de arriba: retorna una promesa y pasa el llamado a la `f` original, rastreando el resultado en un callback personalizado.

```js
function promisify(f) {
  return function (...args) { // retorna una función de envoltura
    return new Promise((resolve, reject) => {
      function callback(err, result) { // nuestro callback personalizado para f
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // adjunta nuestro callback personalizado al final de los argumentos

      f.call(this, ...args); // llama a la función original
    });
  };
};

// uso:
let loadScriptPromise = promisify(loadScript);
loadScriptPromise(...).then(...);
```

Aquí asumimos que la función original espera un callback con dos argumentos `(err, result)`. Eso es lo que usualmente encontramos. Entonces nuestro callback personalizado está exactamente en el formato correcto, y `promisify` funciona muy bien para tal caso.

¿Y si la `f` original espera un callback con más argumentos `callback(err, res1, res2)`?

Aquí hay una modificación de `promisify` que retorna un array de los múltiples resultados del callback:

```js
// promisify(f, true) para conseguir array de resultados
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function *!*callback(err, ...results*/!*) { // Nuestro callback personalizado para f
        if (err) {
          return reject(err);
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

También hay módulos con funciones de promisificación un poco más flexibles, ej. [es6-promisify](https://github.com/digitaldesignlabs/es6-promisify). En Node.js, hay una función integrada `util.promisfy` para ello.

```smart
La promisificación es un excelente enfoque, especialmente cuando usas `async/await` (revisa el siguiente capitulo), pero no es totalmente un substituto para los callbacks.

Recuerda, una promesa puede tener sólo un resultado, pero un callback puede ser técnicamente llamado muchas veces.

Así que la promisificación está solo pensada para funciones que llaman al callback una vez. Las llamadas adicionales serán ignoradas.
```
