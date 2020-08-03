<<<<<<< HEAD
# Test automatizados con mocha

Los tests automáticos deben ser considerados como una tarea más, y son ampliamente usasdos en proyectos reales.

## ¿Por qué necesitamos tests?
=======
# Automated testing with Mocha

Automated testing will be used in further tasks, and it's also widely used in real projects.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Cuando escribimos una función, normalmente imaginamos qué debe hacer: Para ciertos parámetros, qué resultado.

Durante el desarrollo, podemos comprobar la función ejecutándola y comparando el resultado con la salida esperada. Por ejemplo, podemos hacer eso en la consola.

Si algo está incorrecto -- entonces corregimos el código, ejecutamos de nuevo, comprobamos resultado -- y así sucesivamente hasta que funcione.

Pero esas "re-ejecuciones" manuales son imperfectas.

**Cuando testeamos un código re-ejecutándolo manualmente es fácil obviar algo.**

Por ejemplo, estamos creando una función `f`. Escribimos algo de código, testeamos: `f(1)` funciona, pero `f(2)` no funciona. Corregimos el código y ahora funciona `f(2)`. ¿Está completo? Hemos olvidado re-testear `f(1)`. Esto puede resultar error.

Todo esto es muy típico. Cuando desarrollamos algo, mantenemos muchos casos de uso posibles en la cabeza. Pero es complicado esperar que un/a programador/a compruebe todos después de cada cambio. Por lo que deviene fácil arreglar una cosa y romper otra.

**Los tests automatizados implican escribir los tests por separado, además del código. Ellos ejecutan nuestras funciones de varias formas y comparan los resultados con los esperados.**

<<<<<<< HEAD
## Desarrollo guiado por comportamiento (Behavior Driven Development, BDD) 
=======
**Automated testing means that tests are written separately, in addition to the code. They run our functions in various ways and compare results with the expected.**
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Vamos a usar una técnica llamada [Desarrollo guiado por comportamiento](https://es.wikipedia.org/wiki/Desarrollo_guiado_por_comportamiento) o por sus siglas en inglés, BDD. 

<<<<<<< HEAD
**BDD son tres cosas en uno: tests, documentación y ejemplos.**
=======
Let's start with a technique named [Behavior Driven Development](http://en.wikipedia.org/wiki/Behavior-driven_development) or, in short, BDD.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

PAra entender BDD, examinaremos un caso de desarrollo práctico:

<<<<<<< HEAD
## Desarrollo de potencia de un número "pow": la especificación
=======
To understand BDD, we'll examine a practical case of development.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Digamos que queremos hacer una función `pow(x, n)` que eleve `x` a la potencia de un entero `n`. Asumimos que `n≥0`.

Esta tarea es sólo un ejemplo: Hay un operador `**` en JavaScript que hace eso, pero queremos concentrarnos en el flujo de desarrollo que puede ser aplicado a tareas más complejas.

Antes de crear el código de `pow`, podemos imaginar lo que hace la función y describirlo.

<<<<<<< HEAD
Esa descripción es llamada *especificación* o "spec" y contiene las descripciones de uso junto con los test para probarlas, como:
=======
Before creating the code of `pow`, we can imagine what the function should do and describe it.

Such description is called a *specification* or, in short, a spec, and contains descriptions of use cases together with tests for them, like this:
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

```js
describe("pow", function() {

  it("eleva a la n-ésima potencia", function() {
    assert.equal(pow(2, 3), 8);
  });

});
```

Una spec tiene los tres bloques principales mostrados abajo:

<<<<<<< HEAD
`describe("titulo", function() { ... })`
: Qué funcionalidad estamos describiendo. En nuestro caso estamos describiendo la función `pow`. Utilizado para agrupar los "workers" (trabajadores) -- los bloques `it`.

`it("titulo", function() { ... })`
: En el título de `it` introducimos una descripción entendible en forma humana del caso de uso. El segundo argumento es la función que testea eso.
=======
`describe("title", function() { ... })`
: What functionality we're describing. In our case we're describing the function `pow`. Used to group "workers" -- the `it` blocks.

`it("use case description", function() { ... })`
: In the title of `it` we *in a human-readable way* describe the particular use case, and the second argument is a function that tests it.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

`assert.equal(value1, value2)`
: El código dentro del bloque `it`, si la implementación es correcta, debe ejecutar sin errores.

    Las funciones `assert.*` son usadas para comprobar cuando `pow` funciona como esperamos. Justo aquí utilizamos una de ellas -- `assert.equal`, que compara argumentos y produce un error si los mismos no son iguales. Arriba se está comprobando que el resultado de `pow(2, 3)` sea igual a `8`. Hay otros tipos de comparaciones y comprobaciones que veremos más adelante.

<<<<<<< HEAD
La especificación puede ser ejecutada, y hará los los test dictados en el bloque `it`.  Lo veremos luego.

## El flujo de desarrollo
=======
    Functions `assert.*` are used to check whether `pow` works as expected. Right here we're using one of them -- `assert.equal`, it compares arguments and yields an error if they are not equal. Here it checks that the result of `pow(2, 3)` equals `8`. There are other types of comparisons and checks, that we'll add later.

The specification can be executed, and it will run the test specified in `it` block. We'll see that later.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

El flujo de desarrollo podría asemejarse a:

1. Un spec inicial es escrito, con tests para la funcionalidad más básica.
2. Una implementación inicial es creada.
3. Para comprobar que funciona, ejecutamos el framework de test [Mocha](http://mochajs.org/) (detallado más adelante) que ejecuta el spec.  Mostrará los errores mientras la funcionalidad no esté completa. Hacemos correcciones hasta que todo funciona.
4. Ahora tenemos una implementación inicial con tests.
5. Añadimos más casos de uso al spec, seguramente no soportados aún por la implementación. Los tests empiezan a fallar.
6. Ir a 3, actualizar la implementación hasta que los tests no den errores.
7. Repetir pasos 3-6 hasta que la funcionalidad este lista.

<<<<<<< HEAD
De tal forma que el desarrollo es iterativo. Escribimos la especificación, la implementamos, aseguramos que los tests pasen y entonces escribimos más tests y volvemos a asegurar que pasen, etc. Al final tenemos una implementación funcionando con tests para ella.
=======
1. An initial spec is written, with tests for the most basic functionality.
2. An initial implementation is created.
3. To check whether it works, we run the testing framework [Mocha](http://mochajs.org/) (more details soon) that runs the spec. While the functionality is not complete, errors are displayed. We make corrections until everything works.
4. Now we have a working initial implementation with tests.
5. We add more use cases to the spec, probably not yet supported by the implementations. Tests start to fail.
6. Go to 3, update the implementation till tests give no errors.
7. Repeat steps 3-6 till the functionality is ready.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Veamos el flujo de desarrollo en nuestro caso práctico.

<<<<<<< HEAD
El primer paso esta completo: tenemos una spec inicial para `pow`. Ahora, antes de realizar la implementación, usamos algunas librería JavaScript para ejecutar los tests, solo para asegurarnos que funcionen (van a fallar todos).
=======
Let's see this development flow in our practical case.

The first step is already complete: we have an initial spec for `pow`. Now, before making the implementation, let's use few JavaScript libraries to run the tests, just to see that they are working (they will all fail).
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

## La spec en acción

En éste tutorial estamos usando las siguientes librerías JavaScript para los tests:

- [Mocha](http://mochajs.org/) -- el framework central: provee de funciones para test comunes como `describe` e `it` y la función principal que ejecuta los tests.
- [Chai](http://chaijs.com) -- una librería con muchas funciones de comprobación (assertions). Permite el uso de diferentes comprobaciones. De momento usaremos `assert.equal`.
- [Sinon](http://sinonjs.org/) -- una libraería para espiar funciones. Simula funciones incorparadas al lenguaje y mucho más. La necesitaremos a menudo más adelante.

Estas librerías son adecuadas tanto para tests en el navegador como en el lado del servidor. Aquí nos enfocaremos en el lado del navegador.

La página HTML con estos frameworks y la spec de `pow`:

```html src="index.html"
```

La página puede ser dividida en cinco partes:

1. El `<head>` -- importa librerías de terceros y estilos para los tests.
2. El `<script>` con la función a comprobar, en nuesro caso -- con el código de `pow`.
3. Los tests -- en nuestro caso un fichero externo `test.js` que contiene un sentencia `describe("pow", ...)`al inicio.
4. El elemento HTML `<div id="mocha">` utilizado para la salida de los resultados.
5. Los test se inician con el comando `mocha.run()`.

El resultado:

[iframe height=250 src="pow-1" border=1 edit]

De momento, el test falla. Es lógico: tenemos el código vacío en la función `pow`, así que `pow(2,3)` devuelve `undefined` en lugar de `8`.

<<<<<<< HEAD
Para más adelante, ten en cuenta que hay avanzados test-runners (Herramientas para ejecutar los test en diferentes entornos de forma automática), como [karma](https://karma-runner.github.io/) y otros. Por lo que generalmente no es un problema configurar muchos tests diferentes.
=======
For the future, let's note that there are more high-level test-runners, like [karma](https://karma-runner.github.io/) and others, that make it easy to autorun many different tests.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

## Implementación inicial

Vamos a realizar una implementación simple de `pow`, suficiente para pasar el test:

```js
function pow(x, n) {
  return 8; // :) ¡hacemos trampas!
}
```

¡Ahora funciona!

[iframe height=250 src="pow-min" border=1 edit]

## Mejoramos el spec

Lo que hemos hecho es una trampa. La función no funciona bien: ejecutar un cálculo diferente como   `pow(3,4)` nos devuelve un resultado incorrecto pero el test pasa.

... pero la situación es habitual, ocurre en la práctica. Los tests pasan, pero la función no funciona bien. Nuestra especificación está incompleta. Necesitamos añadir más casos de uso a la especificación.

<<<<<<< HEAD
Vamos a incluir un test para ver si `pow(3,4) = 81`.
=======
Let's add one more test to check that `pow(3, 4) = 81`.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Podemos escoger entre dos formas de organizar el test:

1. La primera manera -- añadir un `assert` más en el mismo `it`:

    ```js
    describe("pow", function() {

      it("eleva a la n-ésima potencia", function() {
        assert.equal(pow(2, 3), 8);
    *!*
        assert.equal(pow(3, 4), 81);
    */!*
      });

    });
    ```
2. La segunda -- hacer dos tests:

    ```js
    describe("pow", function() {

      it("2 elevado a la potencia de 3 es 8", function() {
        assert.equal(pow(2, 3), 8);
      });

<<<<<<< HEAD
      it("3 elevado a la potencia de 3 es 27", function() {
        assert.equal(pow(3, 3), 27);
=======
      it("3 raised to power 4 is 81", function() {
        assert.equal(pow(3, 4), 81);
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
      });

    });
    ```

La diferencia principal se da cuando `assert` lanza un error, el bloque `it` termina inmediatamente. De forma que si en la primera manera el primer `assert` falla, no veremos nunca el resultado del segundo `assert`.

Hacer los tests separados es útil para recoger información sobre qué está pasando, de forma que la segunda manera es mejor.

A parte de eso, hay otra regla que es bueno seguir.

**Un test comprueba una sola cosa**

Si vemos que un test contiene dos comprobaciones independientes, es mejor separar el test en dos tests más simples.

Así que continuamos con la segunda manera.

El resultado:

[iframe height=250 src="pow-2" edit border="1"]

<<<<<<< HEAD
Como podemos esperar, el segundo falla. Nuestra función siempre devuelve `8` mientras el `assert` espera `27`.
=======
As we could expect, the second test failed. Sure, our function always returns `8`, while the `assert` expects `81`.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

## Mejoramos la implementación

Vamos a escribir algo más real para que pasen los tests:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Para estar seguros de que la función trabaja bien, vamos a hacer comprobaciones para más valores. En lugar de escribir bloques `it`s manualmente, vamos a generarlos con un `for`:

```js
describe("pow", function() {

  function makeTest(x) {
    let expected = x * x * x;
    it(`${x} elevado a 3 es ${expected}`, function() {
      assert.equal(pow(x, 3), expected);
    });
  }

  for (let x = 1; x <= 5; x++) {
    makeTest(x);
  }

});
```

El resultado:

[iframe height=250 src="pow-3" edit border="1"]

## `Describe` anidados

Vamos a añadir más tests. Pero antes, hay que apuntar que la función `makeTest` y la instrución `for` deben ser agrupados juntos. No queremos `makeTest` en otros tests, solo se necesita en el `for`: su tarea común es comprobar cómo `pow` eleva a una potencia concreta.

Agrupar tests se realiza con `describe`:

```js
describe("pow", function() {

*!*
  describe("eleva x a la potencia de 3", function() {
*/!*

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} elevado a 3 es ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

*!*
  });
*/!*

  // ... otros test irían aquí, se puede escribir describe como it
});
```

El `describe` anidado define un nuevo subgrupo de tests. En la salida podemos ver la identación en los títulos:

[iframe height=250 src="pow-4" edit border="1"]

En el futuro podemos añadir más `it` y `describe` en el primer nivel con funciones de ayuda para ellos mismos, no se solaparán con `makeTest`.

````smart header="`before/after` y `beforeEach/afterEach`"
Podemos configurar funciones `before/after` que se ejecuten antes/después de la ejecución de los tests, y también funciones `beforeEach/afterEach` que ejecuten antes/después de cada `it`.

Por ejemplo:

```js no-beautify
describe("test", function() {

  before(() => alert("Inicio testing – antes de todos los tests"));
  after(() => alert("Final testing – después de todos los tests"));

  beforeEach(() => alert("Antes de un test – entramos al test"));
  afterEach(() => alert("Después de un test – salimos del test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
```

La secuencia que se ejecuta es la siguiente:

```
Inicio testing – antes de todos los tests (before)
Antes de un test – entramos al test (beforeEach)
1
Después de un test – salimos del test   (afterEach)
Antes de un test – entramos al test (beforeEach)
2
Después de un test – salimos del test   (afterEach)
Final testing – después de todos los tests (after)
```

[edit src="beforeafter" title="Abre el ejemplo en un sandbox."]

<<<<<<< HEAD
Normalmente, `beforeEach/afterEach` (`before/after`) son usados para realizar la inicialización, poner contadores a cero o hacer algo entre cada test o cada grupo de tests.
=======
Usually, `beforeEach/afterEach` and `before/after` are used to perform initialization, zero out counters or do something else between the tests (or test groups).
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
````

## Extender los spec

La funcionalidad básica de `pow` está completa. La primera iteración del desarrollo está hecha. Cuando acabemos de celebrar y beber champán -- sigamos adelante y mejorémosla.

Como se dijo, la función `pow(x, n)` está dedicada a trabajar con valores enteros positivos `n`.

Para indicar un error matemático, JavaScript normalmente devuelve `NaN` como resultado de una función. Hagamos lo mismo para valores incorrectos de `n`.

Primero incluyamos el comportamiento en el spec(!):

```js
describe("pow", function() {

  // ...

  it("para n negativos el resultado es NaN", function() {
*!*
    assert.isNaN(pow(2, -1));
*/!*
  });

  it("para no enteros el resultado is NaN", function() {
*!*
    assert.isNaN(pow(2, 1.5));    
*/!*
  });

});
```

El resultado con los nuevos tests:

[iframe height=530 src="pow-nan" edit border="1"]

El test recién creado falla, porque nuestra implementación no lo soporta. Así es como funciona la metodología BDD: primero escribimos un test que falle y luego realizamos la implementación para que pase.

<<<<<<< HEAD
```smart header="Otras comprobaciones"
Por favor, ten en cuenta la comprobación `assert.isNaN`: ella comprueba que el valor es `NaN`.

Hay otras comprobaciones en Chai también [Chai](http://chaijs.com), por ejemplo:

- `assert.equal(value1, value2)` -- prueba la igualdad  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- prueba la igualdad estricta `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- el contrario que arriba.
- `assert.isTrue(value)` -- prueba que `value === true`
- `assert.isFalse(value)` -- prueba que `value === false`
- ... la lista entera se puede encontrar en [docs](http://chaijs.com/api/assert/)
=======
```smart header="Other assertions"
Please note the assertion `assert.isNaN`: it checks for `NaN`.

There are other assertions in [Chai](http://chaijs.com) as well, for instance:

- `assert.equal(value1, value2)` -- checks the equality  `value1 == value2`.
- `assert.strictEqual(value1, value2)` -- checks the strict equality `value1 === value2`.
- `assert.notEqual`, `assert.notStrictEqual` -- inverse checks to the ones above.
- `assert.isTrue(value)` -- checks that `value === true`
- `assert.isFalse(value)` -- checks that `value === false`
- ...the full list is in the [docs](http://chaijs.com/api/assert/)
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e
```

Así que podemos añadir un par de líneas a `pow`:

```js
function pow(x, n) {
*!*
  if (n < 0) return NaN;
  if (Math.round(n) != n) return NaN;
*/!*

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}
```

Ahora funciona y todos los tests pasan:

[iframe height=300 src="pow-full" edit border="1"]

[edit src="pow-full" title="Abre el ejemplo final en un sandbox."]

## Resumen

En BDD, la especificación va primero, seguida de la implementación. Al final tenemos tanto la especificación como la implementación.

<<<<<<< HEAD
El spec puede ser usado de tres formas:
=======
1. As **Tests** - they guarantee that the code works correctly.
2. As **Docs** -- the titles of `describe` and `it` tell what the function does.
3. As **Examples** -- the tests are actually working examples showing how a function can be used.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

1. **Tests** garantizan que el código funciona correctamente.
2. **Docs** -- los títulos de los `describe` e `it` nos dicen que hacen la función.
3. **Ejemplos** -- los tests son también ejemplos funcionales que muestran como una función puede ser usada.

Con la especificación, podemos mejorar de forma segura, cambiar, incluso reescribir la función desde cero y estar seguros que seguirá funcionando.

Esto es especialmente importante en proyectos largos cuando una función es usada en muchos sitios. Cuando cambiamos una función, no hay forma manual de comprobar si cada sitio donde se usaba sigue funcionando correctamente.

<<<<<<< HEAD
Sin tests, la gente tiene dos opciones:

1. Realizar el cambio, no importa nada más. Luego nuestros usuarios encontrán errores porque probablemente fallemos en encontrarlos.
2. Si el castigo por errores es duro, la gente tendrá miedo de hacer cambios en las funciones. Entonces el código envejecerá, nadie querrá meterse en él y eso no es bueno para el desarrollo.

**¡El test automatizado ayuda a evitar estos problemas!**
=======
1. To perform the change, no matter what. And then our users meet bugs, as we probably fail to check something manually.
2. Or, if the punishment for errors is harsh, as there are no tests, people become afraid to modify such functions, and then the code becomes outdated, no one wants to get into it. Not good for development.

**Automatic testing helps to avoid these problems!**

If the project is covered with tests, there's just no such problem. After any changes, we can run tests and see a lot of checks made in a matter of seconds.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Si el proyecto esta cubierto de pruebas, no tendremos ese problema. Podemos correr los tests y hacer multitud de comprobaciones en cuestión de segundos.

<<<<<<< HEAD
**Además, un código bien probado tendrá una mejor arquitectura.**
=======
Naturally, that's because auto-tested code is easier to modify and improve. But there's also another reason.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Naturalmente, porque el código será más fácil de cambiar y mejorar. Pero no sólo eso.

Al escribir tests, el código debe estar organizado de tal manera que cada función tenga un propósito claro y explícito, una entrada y una salida bien definida. Eso implica una buena arquitectura desde el principio.

<<<<<<< HEAD
En la vida real a veces no es tan fácil. A veces es difícil escribir una especificación antes que el código, porque no está claro aún cómo debe comportarse dicho código. Pero en general, escribir los tests hace el desarrollo más rápido y más estable.

En el tutorial encontrarás más adelante muchas tareas respaldadas con pruebas. Veremos más ejemplos prácticos de tests.
=======
Later in the tutorial you will meet many tasks with tests baked-in. So you'll see more practical examples.
>>>>>>> cdf382de4cf3ed39ca70cb7df60c4c4886f2d22e

Escribir tests requiere un buen conocimiento de JavaScript. Pero nosotros justo acabamos de empezar a aprenderlo. Así que para comenzar no es necesario que escribas tests, pero deberías ser capaz de leerlos incluso si son más compleos que en este capítulo.
