
# Objeto Global

El objeto global proporciona variables y funciones que están disponibles en cualquier lugar. Por defecto,  aquellas que están integradas en el lenguaje o el entorno.

En un navegador se denomina `window`, para Node.js es` global`, para otros entornos puede tener otro nombre.

Recientemente, `globalThis`  se agregó al lenguaje, como un nombre estandarizado para un objeto global, que debería ser compatible con todos los entornos. En algunos navegadores, como Chromium  Edge, `globalThis` aún no es compatible, pero se puede  usar  mediante *polyfill*.

Aquí usaremos  `window` , suponiendo que nuestro entorno sea un navegador. Si su script puede ejecutarse en otros entornos, es mejor usar `globalThis` en su lugar.

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

Si usáramos `let` en su lugar, esto  no sucedería:

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

## Usado como  polyfills

Usamos el objeto global para probar el soporte de las características del lenguaje moderno.

Por ejemplo, probar si existe un objeto `Promise` incorporado (no existe en navegadores muy antiguos):

```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

Si no hay ninguno (suponiendo que  estamos en un navegador antiguo), podemos crear "polyfills": agregar funciones que no son compatibles con el entorno, pero que existen en el estándar moderno.

```js run
if (!window.Promise) {
  window.Promise = ... // implementación personalizada del lenguaje moderno
}
```

## Resumen

- El objeto global contiene variables que deberían estar disponibles en todas partes.

    Eso incluye JavaScript incorporado, como  `Array` y valores específicos del entorno, como ` window.innerHeight` -- la altura de la ventana en el navegador.

- El objeto global tiene un nombre universal: `globalThis`.

    ... Pero con mayor frecuencia se hace referencia a nombres específicos del entorno de la "vieja escuela", como `window` (navegador) y` global` (Node.js). Como `globalThis` es una propuesta reciente, no es compatible con Chromium Edge (pero si mediante *polyfill*).

- Deberíamos almacenar valores en el objeto global solo si son verdaderamente globales para nuestro proyecto. Y manteniendo  su uso al mínimo.
- En el navegador, a menos que estemos utilizando [módulos](info:modules), las funciones globales y las variables declaradas con `var` se convierten en una propiedad del objeto global.
- Para que nuestro código esté preparado para el futuro y sea más fácil de entender, debemos acceder a las propiedades del objeto global directamente, como `window.x`.
