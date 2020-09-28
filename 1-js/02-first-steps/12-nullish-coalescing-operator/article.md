# Nullish coalescing operator '??'

[recent browser="new"]

<<<<<<< HEAD
El _nullish coalescing operator_ `??` brinda una sintaxis corta para seleccionar la primera variable "definida" de una lista.

El resultado de `a ?? b` es:
- `a` si esta no es `null` o `undefined`,
- `b`, en el caso contrario.

Entonces, `x = a ?? b` es la versión corta de:
=======
Here, in this article, we'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The nullish coalescing operator is written as two question marks `??`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.


In other words, `??` returns the first argument if it's defined. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js
result = (a !== null && a !== undefined) ? a : b;
```

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `Anonymous` if `user` isn't defined:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous
```

<<<<<<< HEAD
Aquí un ejemplo más detallado.

Pensemos que tenemos un `firstName`, `lastName` o `nickName`, todos ellos pueden ser undefined  si el usuario decide no ingresar ningún nombre.

Queremos mostrar un nombre, una de las tres variables, o "Anonymous" si ninguno está definido:
=======
Of course, if `user` had any value except `null/undefined`, then we would see it instead:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John
```

We can also use a sequence of `??` to select the first defined value from a list.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be undefined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them are undefined.

Let's use the `??` operator for that:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
// Muestra la primera variable que no sea null/undefined
=======
// shows the first defined value:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparación con ||

<<<<<<< HEAD
El operador OR `||` puede ser usado de la misma manera que `??`. De hecho, podemos reemplazar `??` con `||` en el código anterior y obtener el mismo resultado tal como está explicado en el [capítulo previo](info:logical-operators#or-finds-the-first-truthy-value)

La gran diferencia es que:
- `||` retorna el primer valor *truthy*.
- `??` retorna el primer valor *defined*.

Esto es de suma importancia cuando queremos tratar `null/undefined` diferente de `0`.

Por ejemplo:
=======
The OR `||` operator can be used in the same way as `??`, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

For example, in the code above we could replace `??` with `||` and still get the same result:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

<<<<<<< HEAD
Esto le asigna `100` a `height` si esta no está definida.

Comparémoslo con `||`:
=======
The OR `||` operator exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.

On the other hand, the nullish coalescing operator `??` was added only recently, and the reason for that was that people weren't quite happy with `||`.

The subtle, yet important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

In other words, `||` doesn't distinguish between `false`, `0`, an empty string `""` and `null/undefined`. They are all the same -- falsy values. If any of these is the first argument of `||`, then we'll get the second argument as the result.

In practice though, we may want to use default value only when the variable is `null/undefined`. That is, when the value is really unknown/not set.

For example, consider this:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
En este caso, `height || 100` maneja `height` con un valor de `0` como no asignada, al igual que con `null`, `undefined` o cualquier otro valor _falsy_, dependiendo de la situación, esto puede ser incorrecto.

En el caso de `height ?? 100` este retorna `100` solo si `height` es exactamente `null` o `undefined`.
=======
Here, we have a zero height.

- The `height || 100` checks `height` for being a falsy value, and it really is.
    - so the result is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

If we assume that zero height is a valid value, that shouldn't be replaced with the default, then `??` does just the right thing.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

## Precedencia

<<<<<<< HEAD
La precedencia del operador `??` es bastante baja: `5` en la [Tabla MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Operator_Precedence#Table).

Es más baja que en la mayoría de los operadores y un poco más alta que `=` y `?`.

Así que si necesitas usar `??` en una expresión compleja,  considera añadir paréntesis:
=======
The precedence of the `??` operator is rather low: `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table). So `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.

So if we'd like to choose a value with `??` in an expression with other operators, consider adding parentheses:
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

```js run
let height = null;
let width = null;

// Importante: usar paréntesis
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

<<<<<<< HEAD
Caso contrario, si omitimos los paréntesis, entonces `*` tiene una mayor precedencia y se ejecutará primero. Eso sería lo mismo que:

```js
// Incorrecto
let area = height ?? (100 * width) ?? 50;
```

Existe también una limitación a nivel del lenguaje. Por razones de seguridad, está prohibido usar `??` junto con los operadores `&&` y `||`.
=======
Otherwise, if we omit parentheses, then as `*` has the higher precedence than `??`, it would execute first, leading to incorrect results.

```js
// without parentheses
let area = height ?? 100 * width ?? 50;

// ...works the same as this (probably not what we want):
let area = height ?? (100 * width) ?? 50;
```

### Using ?? with && or ||

Due to safety reasons, JavaScript forbids using `??` together with `&&` and `||` operators, unless the precedence is explicitly specified with parentheses.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

El siguiente código desencadena un error de sintáxis:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
La limitación es sin duda alguna debatible, pero por ciertas razones fue agregada a la especificación del lenguaje.
=======
The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch to `??` from `||`.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d

Usa paréntesis explícitos para solucionarlo:

```js run
let x = (1 && 2) ?? 3; // Funciona
alert(x); // 2
```

## Resumen

- El _nullish coalescing operator_ `??` proveé una manera concisa de seleccionar un valor "definido" de una lista.

    Es usado para asignar valores por defecto a las variables:

    ```js
    // Asignar height=100, si height es null o undefined
    height = height ?? 100;
    ```

<<<<<<< HEAD
- El operador `??` tiene una precedencia muy baja, un poco más alta que `?` y `=`.
- Está prohibido su uso con `||` y `&&` sin paréntesis explícitos.
=======
- The operator `??` has a very low precedence, a bit higher than `?` and `=`, so consider adding parentheses when using it in an expression.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> f489145731a45df6e369a3c063e52250f3f0061d
