# Eval: ejecutando una cadena de código

La función incorporada `eval` permite ejecutar una cadena de código.

La sintaxis es:

```js
let result = eval(code);
```

Por ejemplo:

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

Una cadena de código puede ser larga, contener cortes de línea, declaración de funciones, variables y así.

El resultado de `eval` es el resultado de la última sentencia.

Por ejemplo:
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

El código evaluado es ejecutado en el entorno léxico presente, entonces podemos ver sus variables externas:

```js run no-beautify
let a = 1;

function f() {
  let a = 2;

*!*
  eval('alert(a)'); // 2
*/!*
}

f();
```

También puede modificar variables externas:

```js untrusted refresh run
let x = 5;
eval("x = 10");
alert(x); // 10, valor modificado
```

En modo estricto, `eval` tiene su propio entorno léxico. Entonces funciones y variables declaradas dentro de eval no son visibles fuera:

```js untrusted refresh run
// recordatorio: 'use strict' está habilitado en los ejemplos ejecutables por defecto

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (no existe tal variable)
// la función f tampoco es visible
```

Sin `use strict`, `eval` no tiene su propio entorno léxico, entonces podemos ver `x` y `f` afuera.

## Usando "eval"

En programación moderna `eval` es usado muy ocasionalmente. Se suele decir que "eval is evil" - juego de palabras en inglés que significa en español: "eval es malvado".

La razón es simple: largo, largo tiempo atrás JavaScript era un lenguaje mucho más débil, muchas cosas podían ser concretadas solamente con `eval`. Pero aquel tiempo pasó hace una década.

Ahora casi no hay razones para usar `eval`. Si alguien lo está usando, hay buena chance de que pueda ser reemplazado con una construcción moderna del lenguaje o un [Módulo JavaScript](info:modules).

Por favor ten en cuenta que su habilidad para acceder a variables externas tiene efectos colaterales.

Los Code minifiers (minimizadores de código, herramientas usadas antes de poner JS en producción para comprimirlo) renombran las variables locales acortándolas (como `a`, `b` etc) para achicar el código. Usualmente esto es seguro, pero no si `eval` es usado porque las variables locales pueden ser accedidas desde la cadena de código evaluada. Por ello los minimizadores no hacen tal renombrado en todas las variables potencialmente visibles por `eval`. Esto afecta negativamente en el índice de compresión.

El uso de variables locales dentro de `eval` es también considerado una mala práctica de programación, porque hace el mantenimiento de código más difícil.

Hay dos maneras de estar asegurado frente a tales problemas.

**Si el código evaluado no usa variables externas, por favor llama `eval` como `window.eval(...)`:**

De esta manera el código es ejecutado en el entorno global:

```js untrusted refresh run
let x = 1;
{
  let x = 5;
  window.eval('alert(x)'); // 1 (variable global)
}
```

**Si el código evaluado necesita variables locales, cambia `eval` por `new Function` y pásalas como argumentos:**

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

La construcción `new Function` es explicada en el capítulo <info:new-function>. Esta crea una función desde una cadena, también en el entorno global, y así no puede ver las variables locales. Pero es mucho más claro pasarlas explícitamente como argumentos como en el ejemplo de arriba.

## Resumen

Un llamado a `eval(code)` ejecuta la cadena de código y devuelve el resultado de la última sentencia.
- Es raramente usado en JavaScript moderno, y usualmente no es necesario.
- Puede acceder a variables locales externas. Esto es considerado una mala práctica.
- En su lugar, para evaluar el código en el entorno global, usa `window.eval(code)`.
- O, si tu código necesita algunos datos de el entorno externo, usa `new Function` y pásalos como argumentos.
