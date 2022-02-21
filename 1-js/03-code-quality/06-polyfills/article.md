
# Polyfills y transpiladores

El lenguaje JavaScript evoluciona constantemente. Nuevas propuestas al lenguaje aparecen regularmente, son analizadas y, si se consideran valiosas, se agregan a la lista en <https://tc39.github.io/ecma262/> y luego avanzan a la [especificación](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Los equipos de desarrollo detrás de los intérpretes (engines) de JavaScript tienen sus propias ideas sobre qué implementar primero. Pueden decidir implementar propuestas que están en borrador y posponer cosas que ya están en la especificación porque son menos interesantes o simplemente porque son más difíciles de hacer.

Por lo tanto, es bastante común para un intérprete implementar solo la parte del estándar.

Una buena página para ver el estado actual de soporte de características del lenguaje es <https://kangax.github.io/compat-table/es6/> (es grande, todavía tenemos mucho que aprender).

Como programadores, queremos las características más recientes. Cuanto más, ¡mejor!

Por otro lado, ¿cómo hacer que nuestro código moderno funcione en intérpretes más viejos que aún no entienden las características más nuevas?

Hay dos herramientas para ello:

1. Transpiladores
2. Polyfills.

En este artículo nuestro propósito es llegar a la esencia de cómo trabajan y su lugar en el desarrollo web.

## Transpiladores

Un [transpilador](https://es.wikipedia.org/wiki/Transpilador) es un software que traduce un código fuente a otro código fuente. Puede analizar ("leer y entender") código moderno y rescribirlo usando sintaxis y construcciones más viejas para que también funcione en intérpretes antiguos.

Por ejemplo, antes del año 2020 JavaScript no tenía el operador "nullish coalescing" `??`. Entonces, si un visitante lo usa en un navegador desactualizado, este fallaría en entender un código como `height = height ?? 100`.

Un transpilador analizaría nuestro código y rescribiría `height ?? 100` como `(height !== undefined && height !== null) ? height : 100`.

```js
// antes de ejecutar el transpilador
height = height ?? 100;

// después de ejecutar el transpilador
height = (height !== undefined && height !== null) ? height : 100;
```

Ahora el código rescrito es apto para los intérpretes de JavaScript más viejos.

Usualmente, un desarrollador ejecuta el transpilador en su propia computadora y luego despliega el código transpilado al servidor.

Acerca de nombres, [Babel](https://babeljs.io) es uno de los más prominentes transpiladores circulando.

Sistemas de desarrollo de proyectos modernos, tales como [webpack](https://webpack.js.org/), brindan los medios para ejecutar la transpilación automática en cada cambio de código, haciendo muy fácil la integración al proceso de desarrollo.

## Polyfills

Nuevas características en el lenguaje pueden incluir no solo construcciones sintácticas y operadores, sino también funciones integradas.

Por ejemplo, `Math.trunc(n)` es una función que corta la parte decimal de un número, ej. `Math.trunc(1.23)` devuelve `1`.

En algunos (muy desactualizados) intérpretes JavaScript no existe `Math.trunc`, así que tal código fallará.

Aquí estamos hablando de nuevas funciones, no de cambios de sintaxis. No hay necesidad de transpilar nada. Solo necesitamos declarar la función faltante.

Un script que actualiza o agrega funciones nuevas es llamado "polyfill". Este llena los vacíos agregando las implementaciones que faltan.

En este caso particular, el polyfill para `Math.trunc` es un script que lo implementa:

```js
if (!Math.trunc) { // no existe tal función
  // implementarla
  Math.trunc = function(number) {
    // Math.ceil y Math.floor existen incluso en los intérpretes antiguos
    // los cubriremos luego en el tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript es un lenguaje muy dinámico, los scripts pueden agregar o modificar cualquier función, incluso las integradas. 

Dos librerías interesantes de polyfills son:
- [core js](https://github.com/zloirock/core-js) - da muchísimo soporte, pero permite que se incluyan solamente las características necesitadas.
- [polyfill.io](http://polyfill.io) - servicio que brinda un script con polyfills dependiendo de las características del navegador del usuario.


## Resumen

En este artículo queremos motivarte a estudiar las características más modernas y hasta experimentales del lenguaje, incluso si aún no tienen aún buen soporte en los intérpretes JavaScript.

Pero no olvides usar transpiladores (si usas sintaxis u operadores modernos) y polyfills (para añadir funciones que pueden estar ausentes). Ellos se asegurarán de que el código funcione.

Por ejemplo, cuando estés más familiarizado con JavaScript puedes configurar la construcción de código basado en [webpack](https://webpack.js.org/) con el plugin de [babel](https://github.com/babel/babel-loader).

Buenos recursos que muestran el estado actual de soporte para varias característica:
- <https://kangax.github.io/compat-table/es6/> - para JavaScript puro.
- <https://caniuse.com/> - para funciones relacionadas al navegador.

P.S. Google Chrome usualmente es el más actualizado con las características del lenguaje, pruébalo si algún demo del tutorial falla. Aunque la mayoría de los demos funciona con cualquier navegador moderno.

