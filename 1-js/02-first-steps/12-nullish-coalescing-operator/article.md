# Nullish coalescing operator '??'

[recent browser="new"]

<<<<<<< HEAD
El _nullish coalescing operator_ `??` brinda una sintaxis corta para seleccionar la primera variable "definida" de una lista.

El resultado de `a ?? b` es:
- `a` si esta no es `null` o `undefined`,
- `b`, en el caso contrario.

Entonces, `x = a ?? b` es la versión corta de:
=======
The nullish coalescing operator is written as two question marks `??`.

As it treats `null` and `undefined` similarly, we'll use a special term here, in this article. We'll say that an expression is "defined" when it's neither `null` nor `undefined`.

The result of `a ?? b` is:
- if `a` is defined, then `a`,
- if `a` isn't defined, then `b`.

In other words, `??` returns the first argument if it's not `null/undefined`. Otherwise, the second one.

The nullish coalescing operator isn't anything completely new. It's just a nice syntax to get the first "defined" value of the two.

We can rewrite `result = a ?? b` using the operators that we already know, like this:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js
result = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
Aquí un ejemplo más detallado.

Pensemos que tenemos un `firstName`, `lastName` o `nickName`, todos ellos pueden ser undefined  si el usuario decide no ingresar ningún nombre.

Queremos mostrar un nombre, una de las tres variables, o "Anonymous" si ninguno está definido:
=======
Now it should be absolutely clear what `??` does. Let's see where it helps.

The common use case for `??` is to provide a default value for a potentially undefined variable.

For example, here we show `user` if defined, otherwise `Anonymous`:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user not defined)
```

Here's the example with `user` assigned to a name:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user defined)
```

We can also use a sequence of `??` to select the first value from a list that isn't `null/undefined`.

Let's say we have a user's data in variables `firstName`, `lastName` or `nickName`. All of them may be not defined, if the user decided not to enter a value.

We'd like to display the user name using one of these variables, or show "Anonymous" if all of them aren't defined.

Let's use the `??` operator for that:
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// Muestra la primera variable que no sea null/undefined
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparación con ||

El operador OR `||` puede ser usado de la misma manera que `??`. De hecho, podemos reemplazar `??` con `||` en el código anterior y obtener el mismo resultado tal como está explicado en el [capítulo previo](info:logical-operators#or-finds-the-first-truthy-value)

<<<<<<< HEAD
La gran diferencia es que:
- `||` retorna el primer valor *truthy*.
- `??` retorna el primer valor *defined*.
=======
```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Historically, the OR `||` operator was there first. It exists since the beginning of JavaScript, so developers were using it for such purposes for a long time.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

Esto es de suma importancia cuando queremos tratar `null/undefined` diferente de `0`.

Por ejemplo:

```js
height = height ?? 100;
```

Esto le asigna `100` a `height` si esta no está definida.

Comparémoslo con `||`:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
En este caso, `height || 100` maneja `height` con un valor de `0` como no asignada, al igual que con `null`, `undefined` o cualquier otro valor _falsy_, dependiendo de la situación, esto puede ser incorrecto.

En el caso de `height ?? 100` este retorna `100` solo si `height` es exactamente `null` o `undefined`.
=======
- The `height || 100` checks `height` for being a falsy value, and it's `0`, falsy indeed.
    - so the result of `||` is the second argument, `100`.
- The `height ?? 100` checks `height` for being `null/undefined`, and it's not,
    - so the result is `height` "as is", that is `0`.

In practice, the zero height is often a valid value, that shouldn't be replaced with the default. So `??` does just the right thing.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

## Precedencia

<<<<<<< HEAD
La precedencia del operador `??` es bastante baja: `5` en la [Tabla MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Operator_Precedence#Table).
=======
The precedence of the `??` operator is about the same as `||`, just a bit lower. It equals `5` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table), while `||` is `6`.

That means that, just like `||`, the nullish coalescing operator `??` is evaluated before `=` and `?`, but after most other operations, such as `+`, `*`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

Es más baja que en la mayoría de los operadores y un poco más alta que `=` y `?`.

Así que si necesitas usar `??` en una expresión compleja,  considera añadir paréntesis:

```js run
let height = null;
let width = null;

// Importante: usar paréntesis
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Caso contrario, si omitimos los paréntesis, entonces `*` tiene una mayor precedencia y se ejecutará primero. Eso sería lo mismo que:

```js
// Incorrecto
let area = height ?? (100 * width) ?? 50;
```

Existe también una limitación a nivel del lenguaje. Por razones de seguridad, está prohibido usar `??` junto con los operadores `&&` y `||`.

El siguiente código desencadena un error de sintáxis:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
La limitación es sin duda alguna debatible, pero por ciertas razones fue agregada a la especificación del lenguaje.
=======
The limitation is surely debatable, it was added to the language specification with the purpose to avoid programming mistakes, when people start to switch from `||` to `??`.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

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

- El operador `??` tiene una precedencia muy baja, un poco más alta que `?` y `=`.
- Está prohibido su uso con `||` y `&&` sin paréntesis explícitos.
