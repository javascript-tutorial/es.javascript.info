
# Objeto Global

<<<<<<< HEAD
El objeto global proporciona variables y funciones que están disponibles en cualquier lugar. Por defecto, aquellas que están integradas en el lenguaje o el entorno.

En un navegador se denomina `window`, para Node.js es` global`, para otros entornos puede tener otro nombre.

Recientemente, `globalThis` se agregó al lenguaje, como un nombre estandarizado para un objeto global, que debería ser compatible con todos los entornos. En algunos navegadores, como Chromium Edge, `globalThis` aún no es compatible, pero se puede usar mediante *polyfill*.

Aquí usaremos `window`, suponiendo que nuestro entorno sea un navegador. Si su script puede ejecutarse en otros entornos, es mejor usar `globalThis` en su lugar.

Se puede acceder directamente a todas las propiedades del objeto global:

```js run
alert("Hello");
// es lo mismo que
window.alert("Hello");
```

En un navegador, las funciones y variables globales declaradas con `var` (¡**no**` let / const`!) , se convierten en propiedad del objeto global:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (se convirtió en una propiedad del objeto global)
```

¡Por favor no te fíes de eso! Este comportamiento existe por razones de compatibilidad. Los scripts modernos hacen uso de [Módulos Javascript](info:modules) para que tales cosas no sucedan.

Si usáramos `let` en su lugar, esto no sucedería:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (no se convierte en una propiedad del objeto global)
```

Si un valor es tan importante que desea que esté disponible globalmente, escríbalo directamente como una propiedad:

```js run
*!*
// Hacer que la información actual del usuario sea global, para que todos los scripts puedan acceder a ella
window.currentUser = {
  name: "John"
};
*/!*

// en otro lugar en el código
alert(currentUser.name);  // John

// o, si tenemos una variable local con el nombre "currentUser"
// obténgalo de la ventana explícitamente (¡seguro!)
alert(window.currentUser.name); // John
```

Dicho esto, generalmente se desaconseja el uso de variables globales. Debe haber la menor cantidad posible de ellas. El diseño del código donde una función obtiene variables de "entrada" y produce cierto "resultado" es más claro, menos propenso a errores y más fácil de probar que si usa variables externas o globales.

## Uso para polyfills

Usamos el objeto global para probar el soporte de las características del lenguaje moderno.

Por ejemplo, probar si existe un objeto `Promise` incorporado (no existe en navegadores muy antiguos):

```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

Si no hay ninguno (suponiendo que estamos en un navegador antiguo), podemos crear "polyfills": agregar funciones que no son compatibles con el entorno, pero que existen en el estándar moderno.

```js run
if (!window.Promise) {
  window.Promise = ... // implementación personalizada del lenguaje moderno
}
```

## Resumen

- El objeto global contiene variables que deberían estar disponibles en todas partes.

    Eso incluye JavaScript incorporado, como `Array` y valores específicos del entorno, como ` window.innerHeight` -- la altura de la ventana en el navegador.

- El objeto global tiene un nombre universal: `globalThis`.

    ... Pero con mayor frecuencia se hace referencia a nombres específicos del entorno de la "vieja escuela", como `window` (navegador) y `global` (Node.js). Como `globalThis` es una propuesta reciente, no es compatible con Chromium Edge (pero sí mediante *polyfill*).

- Deberíamos almacenar valores en el objeto global solo si son verdaderamente globales para nuestro proyecto. Y manteniendo  su uso al mínimo.
- En el navegador, a menos que estemos utilizando [módulos](info:modules), las funciones globales y las variables declaradas con `var` se convierten en una propiedad del objeto global.
- Para que nuestro código esté preparado para el futuro y sea más fácil de entender, debemos acceder a las propiedades del objeto global directamente, como `window.x`.
=======
The global object provides variables and functions that are available anywhere. By default, those that are built into the language or the environment.

In a browser it is named `window`, for Node.js it is `global`, for other environments it may have another name.

Recently, `globalThis` was added to the language, as a standardized name for a global object, that should be supported across all environments. In some browsers, namely non-Chromium Edge, `globalThis` is not yet supported, but can be easily polyfilled.

We'll use `window` here, assuming that our environment is a browser. If your script may run in other environments, it's better to use `globalThis` instead.

All properties of the global object can be accessed directly:

```js run
alert("Hello");
// is the same as
window.alert("Hello");
```

In a browser, global functions and variables declared with `var` (not `let/const`!) become the property of the global object:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (became a property of the global object)
```

Please don't rely on that! This behavior exists for compatibility reasons. Modern scripts use [JavaScript modules](info:modules) where such thing doesn't happen.

If we used `let` instead, such thing wouldn't happen:

```js run untrusted refresh
let gLet = 5;

alert(window.gLet); // undefined (doesn't become a property of the global object)
```

If a value is so important that you'd like to make it available globally, write it directly as a property:

```js run
*!*
// make current user information global, to let all scripts access it
window.currentUser = {
  name: "John"
};
*/!*

// somewhere else in code
alert(currentUser.name);  // John

// or, if we have a local variable with the name "currentUser"
// get it from window explicitly (safe!)
alert(window.currentUser.name); // John
```

That said, using global variables is generally discouraged. There should be as few global variables as possible. The code design where a function gets "input" variables and produces certain "outcome" is clearer, less prone to errors and easier to test than if it uses outer or global variables.

## Using for polyfills

We use the global object to test for support of modern language features.

For instance, test if a built-in `Promise` object exists (it doesn't in really old browsers):
```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

If there's none (say, we're in an old browser), we can create "polyfills": add functions that are not supported by the environment, but exist in the modern standard.

```js run
if (!window.Promise) {
  window.Promise = ... // custom implementation of the modern language feature
}
```

## Summary

- The global object holds variables that should be available everywhere.

    That includes JavaScript built-ins, such as `Array` and environment-specific values, such as `window.innerHeight` -- the window height in the browser.
- The global object has a universal name `globalThis`.

    ...But more often is referred by "old-school" environment-specific names, such as `window` (browser) and `global` (Node.js). As `globalThis` is a recent proposal, it's not supported in non-Chromium Edge (but can be polyfilled).
- We should store values in the global object only if they're truly global for our project. And keep their number at minimum.
- In-browser, unless we're using [modules](info:modules), global functions and variables declared with `var` become a property of the global object.
- To make our code future-proof and easier to understand, we should access properties of the global object directly, as `window.x`.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
