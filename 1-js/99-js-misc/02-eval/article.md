<<<<<<< HEAD
# Eval: ejecutando una cadena de código

La función incorporada `eval` permite ejecutar una cadena de código.

La sintaxis es:
=======
# Eval: run a code string

The built-in `eval` function allows to execute a string of code.

The syntax is:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js
let result = eval(code);
```

<<<<<<< HEAD
Por ejemplo:
=======
For example:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js run
let code = 'alert("Hello")';
eval(code); // Hello
```

<<<<<<< HEAD
Una cadena de código puede ser larga, contener cortes de línea, declaración de funciones, variables y así.

El resultado de `eval` es el resultado de la última sentencia.

Por ejemplo:
=======
A string of code may be long, contain line breaks, function declarations, variables and so on.

The result of `eval` is the result of the last statement.

For example:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
```js run
let value = eval('1+1');
alert(value); // 2
```

```js run
let value = eval('let i = 0; ++i');
alert(value); // 1
```

<<<<<<< HEAD
El código evaluado es ejecutado en el entorno léxico presente, entonces podemos ver sus variables externas:
=======
The eval'ed code is executed in the current lexical environment, so it can see outer variables:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

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

<<<<<<< HEAD
También puede modificar variables externas:
=======
It can change outer variables as well:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js untrusted refresh run
let x = 5;
eval("x = 10");
<<<<<<< HEAD
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

Los Code minifiers (minimizadores de código, herramientas usadas antes de poner JS en producción para comprimirlo) renombran las variables locales acortándolas (como `a`, `b` etc) para achicar el código. Usualmente esto es seguro, pero no si `eval` es usado porque las variables locales puden ser accedidas desde la cadena de código evaluada. Por ello los minimizadores no hacen tal renombado en todas las variables potencialmente visibles por `eval`. Esto afecta negativamente en el índice de compresión.

El uso de variables locales dentro de `eval` es también considerado una mala práctica de programación, porque hace el mantenimiento de código más difícil.

Hay dos maneras de estar asegurado frente a tales problemas.

**Si el código evaluado no usa variables externas, por favor llama `eval` como `window.eval(...)`:**

De esta manera el código es ejecutado en el entorno global:
=======
alert(x); // 10, value modified
```

In strict mode, `eval` has its own lexical environment. So functions and variables, declared inside eval, are not visible outside:

```js untrusted refresh run
// reminder: 'use strict' is enabled in runnable examples by default

eval("let x = 5; function f() {}");

alert(typeof x); // undefined (no such variable)
// function f is also not visible
```

Without `use strict`, `eval` doesn't have its own lexical environment, so we would see `x` and `f` outside.

## Using "eval"

In modern programming `eval` is used very sparingly. It's often said that "eval is evil".

The reason is simple: long, long time ago JavaScript was a much weaker language, many things could only be done with `eval`. But that time passed a decade ago.

Right now, there's almost no reason to use `eval`. If someone is using it, there's a good chance they can replace it with a modern language construct or a [JavaScript Module](info:modules).

Please note that its ability to access outer variables has side-effects.

Code minifiers (tools used before JS gets to production, to compress it) rename local variables into shorter ones (like `a`, `b` etc) to make the code smaller. That's usually safe, but not if `eval` is used, as local variables may be accessed from eval'ed code string. So minifiers don't do that renaming for all variables potentially visible from `eval`. That negatively affects code compression ratio.

Using outer local variables inside `eval` is also considered a bad programming practice, as it makes maintaining the code more difficult.

There are two ways how to be totally safe from such problems.

**If eval'ed code doesn't use outer variables, please call `eval` as `window.eval(...)`:**

This way the code is executed in the global scope:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js untrusted refresh run
let x = 1;
{
  let x = 5;
<<<<<<< HEAD
  window.eval('alert(x)'); // 1 (variable global)
}
```

**Si el código evaluado necesita variables locales, cambia `eval` por `new Function` y pásalas como argumentos:**
=======
  window.eval('alert(x)'); // 1 (global variable)
}
```

**If eval'ed code needs local variables, change `eval` to `new Function` and pass them as arguments:**
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js run
let f = new Function('a', 'alert(a)');

f(5); // 5
```

<<<<<<< HEAD
La contrucción `new Function` es explicada en el capítulo <info:new-function>. Esta crea una función desde una cadena, también en el entorno global, y así no puede ver las variables locales. Pero es mucho más claro pasarlas explícitamente como argumentos como en el ejemplo de arriba.

## Resumen

Un llamado a `eval(code)` ejecuta la cadena de código y devuelve el resultado de la última sentencia.
- Es raramente usado en JavaScript moderno, y usualmente no es necesario.
- Puede acceder a variables locales externas. Esto es considerado una mala práctica.
- En su lugar, para evaluar el código en el entorno global, usa `window.eval(code)`.
- O, si tu código necesita algunos datos de el entorno externo, usa `new Function` y pásalos como argumentos.
=======
The `new Function` construct is explained in the chapter <info:new-function>. It creates a function from a string, also in the global scope. So it can't see local variables. But it's so much clearer to pass them explicitly as arguments, like in the example above.

## Summary

A call to `eval(code)` runs the string of code and returns the result of the last statement.
- Rarely used in modern JavaScript, as there's usually no need.
- Can access outer local variables. That's considered bad practice.
- Instead, to `eval` the code in the global scope, use `window.eval(code)`.
- Or, if your code needs some data from the outer scope, use `new Function` and pass it as arguments.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
