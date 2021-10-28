
# Objeto Global

El objeto global proporciona variables y funciones que están disponibles en cualquier lugar. Por defecto, aquellas que están integradas en el lenguaje o el entorno.

En un navegador se denomina `window`, para Node.js es` global`, para otros entornos puede tener otro nombre.

Recientemente, se agregó `globalThis` al lenguaje, como un nombre estandarizado para un objeto global, que debería ser compatible con todos los entornos al igual que con los principales navegadores.

Aquí usaremos `window`, suponiendo que nuestro entorno sea un navegador. Si su script puede ejecutarse en otros entornos, es mejor usar `globalThis` en su lugar.

Se puede acceder directamente a todas las propiedades del objeto global:

```js run
alert("Hello");
// es lo mismo que
window.alert("Hello");
```

En un navegador, las funciones y variables globales declaradas con `var` (¡**no** con `let/const`!) se convierten en propiedades del objeto global:

```js run untrusted refresh
var gVar = 5;

alert(window.gVar); // 5 (se convirtió en una propiedad del objeto global)
```

El mismo efecto lo tienen las declaraciones de función (sentencias con la palabra clave `function` en el flujo principal del código, no las expresiones de función).

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
// obténgalo de la ventana explícitamente (¡más seguro!)
alert(window.currentUser.name); // John
```

Dicho esto, generalmente se desaconseja el uso de variables globales. Debería haber la menor cantidad posible de ellas. El diseño del código donde una función obtiene variables de "entrada" y produce cierto "resultado" es más claro, menos propenso a errores y más fácil de probar que si usa variables externas o globales.

## Uso para polyfills

Podemos usar el objeto global para probar el soporte de características modernas del lenguaje .

Por ejemplo, probar si existe un objeto `Promise` incorporado (no existe en navegadores muy antiguos):

```js run
if (!window.Promise) {
  alert("Your browser is really old!");
}
```

Si no lo encuentra (suponiendo que estamos en un navegador antiguo), podemos crear "polyfills": agregarle funciones que no están soportadas por el entorno, pero que existen en el estándar moderno.

```js run
if (!window.Promise) {
  window.Promise = ... // implementación personalizada del lenguaje moderno
}
```

## Resumen

- El objeto global contiene variables que deberían estar disponibles en todas partes.

    Eso incluye JavaScript incorporado, tales como `Array` y valores específicos del entorno, o como ` window.innerHeight`: la altura de la ventana en el navegador.

- El objeto global tiene un nombre universal: `globalThis`.

    ... Pero con mayor frecuencia se hace referencia a nombres específicos del entorno de la "vieja escuela", como `window` (en el navegador) y `global` (en Node.js). 

- Deberíamos almacenar valores en el objeto global solo si son verdaderamente globales para nuestro proyecto. Y manteniendo su uso al mínimo.
- En el navegador, a menos que estemos utilizando [módulos](info:modules), las funciones globales y las variables declaradas con `var` se convierten en propiedades del objeto global.
- Para que nuestro código esté preparado para el futuro y sea más fácil de entender, debemos acceder a las propiedades del objeto global directamente, como `window.x`.
