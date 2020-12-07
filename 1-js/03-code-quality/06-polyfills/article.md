
# Polyfills and transpilers

El lenguaje JavaScript evoluciona constantemente. Nuevas propuestas al lenguaje aparecen regularmente, son analizadas y, si se consideran valiosas, se agregan a la lista en <https://tc39.github.io/ecma262/> y luego avanzan hasta [specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Equipos detrás de intérpretes (engines) de JavaScript tienen sus propias ideas sobre qué implementar primero. Pueden decidir implementar propuestas que están en borrador y posponer cosas que ya están en la especificación, porque son menos interesantes o simplemente más difíciles de hacer.

Por lo tanto, es bastante común para un intérprete implementar solo la parte del estándar.

Una buena página para ver el estado actual de soporte para características del lenguaje es <https://kangax.github.io/compat-table/es6/> (es grande, todavía tenemos mucho que aprender).

As programmers, we'd like to use most recent features. The more good stuff - the better!

<<<<<<< HEAD
Cuando usamos características modernas del lenguaje, puede que algunos intérpretes no soporten dicho código. Como hemos dicho, no todas las características están implementadas en todas partes.

Aquí Babel viene al rescate.

[Babel](https://babeljs.io) es un [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler). Reescribe código JavaScript moderno en el estándar anterior.

En realidad, hay dos partes en Babel:

1. Primero, el programa transpiler, que reescribe código. El desarrollador lo ejecuta en su propio ordenador. Reescribe el código al viejo estándar. Y entonces el código es entregado al navegador para los usuarios. Proyectos modernos para construcción de sistemas como [webpack](http://webpack.github.io/) o [brunch](http://brunch.io/), proporcionan medios para ejecutar el transpiler automáticamente en cada cambio al código, de modo que no implique ninguna perdida de tiempo de nuestra parte.

2. Segundo, el polyfill.

    Nuevas características del lenguaje pueden incluir no solo contrucciones sintácticas sino también funciones incorporadas.
    El transpilador reescribe el código, transformando las contrucciones sintácticas nuevas al viejo formato. Pero para funciones nuevas, necesitamos implementarlas. JavaScript es un lenguaje muy dinámico, los scripts pueden agregar o modificar cualquier función para que actúen acorde al estándar moderno.

    Existe el término "polyfill" para scripts que "llenan"(fill in) el vacío y agregan las implementaciones que faltan.

    Dos polyfills interesantes son:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) que soporta mucho, pero es muy grande.
    - [polyfill.io](http://polyfill.io) servicio que nos permite cargar/construir polyfills bajo demanda, dependiendo de las características que necesitemos.

Así que, si queremos usar características modernas del lenguaje, el transpiler y polyfill son necesarios.

## Ejemplos en el tutorial
=======
From the other hand, how to make out modern code work on older engines that don't understand recent features yet?

There are two tools for that:

1. Transpilers.
2. Polyfills.

Here, in this chapter, our purpose is to get the gist of how they work, and their place in web development.

## Transpilers

A [transpiler](https://en.wikipedia.org/wiki/Source-to-source_compiler) is a special piece of software that can parse ("read and understand") modern code, and rewrite it using older syntax constructs, so that the result would be the same.

E.g. JavaScript before year 2020 didn't have the "nullish coalescing operator" `??`. So, if a visitor uses an outdated browser, it may fail to understand the code like `height = height ?? 100`.

A transpiler would analyze our code and rewrite `height ?? 100` into `(height !== undefined && height !== null) ? height : 100`.

```js
// before running the transpiler
height = height ?? 100;

// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.
>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

<<<<<<< HEAD
````online
La mayoría de ejemplos se pueden ejecutar en el sitio, así:

```js run
alert('Presione el botón "Play" en la esquina superior derecha para ejecutar');
```

Ejemplos que usan JS moderno solo funcionarán si tu navegador lo soporta.
````

```offline
Como estás leyendo la verión offline, en PDF los ejemplos no se pueden ejecutar. En EPUB algunos pueden ejecutarse.
```

Generalmente, Google Chrome está actualizado con las últimas características del lenguaje, funciona bien para ejecutar demos con tecnología puntera sin ningún transpiler, pero otros navegadores modernos también funcionan bien.
=======
Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23) = 1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.

As we're talking about new functions, not syntax changes, there's no need to transpile anything here. We just need to declare the missing function.

A script that updates/adds new functions is called "polyfill". It "fills in" the gap and adds missing implementations.

For this particular case, the polyfill for `Math.trunc` is a script that implements it, like this:

```js
if (!Math.trunc) { // if no such function
  // implement it
  Math.trunc = function(number) {
    // Math.ceil and Math.floor exist even in ancient JavaScript engines
    // they are covered later in the tutorial
    return number < 0 ? Math.ceil(number) : Math.floor(number);
  };
}
```

JavaScript is a highly dynamic language, scripts may add/modify any functions, even including built-in ones. 

Two interesting libraries of polyfills are:
- [core js](https://github.com/zloirock/core-js) that supports a lot, allows to include only needed features.
- [polyfill.io](http://polyfill.io) service that provides a script with polyfills, depending on the features and user's browser.


## Summary

In this chapter we'd like to motivate you to study modern and even "bleeding-edge" langauge features, even if they aren't yet well-supported by JavaScript engines.

Just don't forget to use transpiler (if using modern syntax or operators) and polyfills (to add functions that may be missing). And they'll ensure that the code works.

For example, later when you're familiar with JavaScript, you can setup a code build system based on [webpack](http://webpack.github.io/) with [babel-loader](https://github.com/babel/babel-loader) plugin.

Good resources that show the current state of support for various features:
- <https://kangax.github.io/compat-table/es6/> - for pure JavaScript.
- <https://caniuse.com/> - for browser-related functions.

P.S. Google Chrome is usually the most up-to-date with language features, try it if a tutorial demo fails. Most tutorial demos work with any modern browser though.

>>>>>>> c56e6a57ac3497aab77128c5bfca13513980709b
