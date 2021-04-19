
# Polyfills

El lenguaje JavaScript evoluciona constantemente. Nuevas propuestas al lenguaje aparecen regularmente, son analizadas y, si se consideran valiosas, se agregan a la lista en <https://tc39.github.io/ecma262/> y luego avanzan hasta [specification](http://www.ecma-international.org/publications/standards/Ecma-262.htm).

Equipos detrás de intérpretes (engines) de JavaScript tienen sus propias ideas sobre qué implementar primero. Pueden decidir implementar propuestas que están en borrador y posponer cosas que ya están en la especificación, porque son menos interesantes o simplemente más difíciles de hacer.

Por lo tanto, es bastante común para un intérprete implementar solo la parte del estándar.

Una buena página para ver el estado actual de soporte para características del lenguaje es <https://kangax.github.io/compat-table/es6/> (es grande, todavía tenemos mucho que aprender).

## Babel

Cuando usamos características modernas del lenguaje, puede que algunos intérpretes no soporten dicho código. Como hemos dicho, no todas las características están implementadas en todas partes.

Aquí Babel viene al rescate.

[Babel](https://babeljs.io) es un [transpilador](https://en.wikipedia.org/wiki/Source-to-source_compiler). Reescribe código JavaScript moderno en el estándar anterior.

En realidad, hay dos partes en Babel:

1. Primero, el programa transpilador, que reescribe código. El desarrollador lo ejecuta en su propio ordenador. Reescribe el código al viejo estándar. Y entonces el código es entregado al navegador para los usuarios. Proyectos modernos para construcción de sistemas como [webpack](http://webpack.github.io/) o [brunch](http://brunch.io/), proporcionan medios para ejecutar el transpilador automáticamente en cada cambio al código, de modo que no implique ninguna perdida de tiempo de nuestra parte.

2. Segundo, el polyfill.

    Nuevas características del lenguaje pueden incluir no solo construcciones sintácticas sino también funciones incorporadas.
    El transpilador reescribe el código, transformando las construcciones sintácticas nuevas al viejo formato. Pero para funciones nuevas, necesitamos implementarlas. JavaScript es un lenguaje muy dinámico, los scripts pueden agregar o modificar cualquier función para que actúen acorde al estándar moderno.

    Existe el término "polyfill" para scripts que "llenan"(fill in) el vacío y agregan las implementaciones que faltan.

    Dos polyfills interesantes son:
    - [babel polyfill](https://babeljs.io/docs/usage/polyfill/) que soporta mucho, pero es muy grande.
    - [polyfill.io](http://polyfill.io) servicio que nos permite cargar/construir polyfills bajo demanda, dependiendo de las características que necesitemos.

<<<<<<< HEAD
Así que, si queremos usar características modernas del lenguaje, el transpiler y polyfill son necesarios.
=======
// after running the transpiler
height = (height !== undefined && height !== null) ? height : 100;
```

Now the rewritten code is suitable for older JavaScript engines.

Usually, a developer runs the transpiler on their own computer, and then deploys the transpiled code to the server.

Speaking of names, [Babel](https://babeljs.io) is one of the most prominent transpilers out there. 

Modern project build systems, such as [webpack](http://webpack.github.io/), provide means to run transpiler automatically on every code change, so it's very easy to integrate into development process.

## Polyfills

New language features may include not only syntax constructs and operators, but also built-in functions.

For example, `Math.trunc(n)` is a function that "cuts off" the decimal part of a number, e.g `Math.trunc(1.23)` returns `1`.

In some (very outdated) JavaScript engines, there's no `Math.trunc`, so such code will fail.
>>>>>>> 6ab384f2512902d74e4b0ff5a6be60e48ab52e96

## Ejemplos en el tutorial


````online
La mayoría de ejemplos se pueden ejecutar en el sitio, así:

```js run
alert('Presione el botón "Play" en la esquina superior derecha para ejecutar');
```

Ejemplos que usan JS moderno solo funcionarán si tu navegador lo soporta.
````

```offline
Como estás leyendo la versión offline, en PDF los ejemplos no se pueden ejecutar. En EPUB algunos pueden ejecutarse.
```

Generalmente, Google Chrome está actualizado con las últimas características del lenguaje, funciona bien para ejecutar demos con tecnología puntera sin ningún transpilador, pero otros navegadores modernos también funcionan bien.
