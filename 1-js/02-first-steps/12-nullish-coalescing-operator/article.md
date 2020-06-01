# Nullish coalescing operator '??'

[recent browser="new"]

<<<<<<< HEAD
El _nullish coalescing operator_ `??` brinda una sintáxis corta para seleccionar la primera variable "definida" de una lista.

El resultado de `a ?? b` es:
- `a` si esta no es `null` o `undefined`,
- `b`, en el caso contrario.

Entonces, `x = a ?? b` es la versión corta de:
=======
The nullish coalescing operator `??` provides a short syntax for selecting a first "defined" variable from the list.

The result of `a ?? b` is:
- `a` if it's not `null` or `undefined`,
- `b`, otherwise.

So, `x = a ?? b` is a short equivalent to:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
x = (a !== null && a !== undefined) ? a : b;
```

<<<<<<< HEAD
Aquí un ejemplo más detallado.

Pensemos que tenemos un `firstName`, `lastName` o `nickName`, todos ellos opcionales.

Escojamos el que esté definido y mostrémoslo (o mostremos "Anonymous" si ninguno está definido):
=======
Here's a longer example.

Imagine, we have a user, and there are variables `firstName`, `lastName` or `nickName` for their first name, last name and the nick name. All of them may be undefined, if the user decided not to enter any value.

We'd like to display the user name: one of these three variables, or show "Anonymous" if nothing is set.

Let's use the `??` operator to select the first defined one:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

<<<<<<< HEAD
// Muestra la primera variable que no sea null/undefined
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
```

## Comparación con ||

Esto es muy similiar al operador OR `||`. De hecho, podemos reemplazar `??` con `||` en el código anterior y obtener el mismo resultado.

La gran diferencia es que:
- `||` retorna el primer valor _*truthy*_.
- `??` retorna el primer valor _*defined*_.

Esto es de suma importancia cuando queremos tratar `null/undefined` diferente de `0`.

Por ejemplo:
=======
// show the first not-null/undefined value
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparison with ||

The OR `||` operator can be used in the same way as `??`. Actually, we can replace `??` with `||` in the code above and get the same result, as it was described in the [previous chapter](info:logical-operators#or-finds-the-first-truthy-value).

The important difference is that:
- `||` returns the first *truthy* value.
- `??` returns the first *defined* value.

This matters a lot when we'd like to treat `null/undefined` differently from `0`.

For example, consider this:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js
height = height ?? 100;
```

<<<<<<< HEAD
Esto le asigna `100` a `height` si esta no está definida. En cambio si `height` es `0`, esta se mantiene "tal cual".

Comparémoslo con `||`:
=======
This sets `height` to `100` if it's not defined.

Let's compare it with `||`:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

<<<<<<< HEAD
En este caso, `height || 100` maneja `height` con un valor de `0` como no asignada, al igual que con `null`, `undefined` o cualquier otro valor _falsy_, dependiendo de la situación, esto puede ser incorrecto.

En el caso de `height ?? 100` este retorna `100` solo si `height` es exactamente `null` o `undefined`.

## Precedencia

La precedencia del operador `??` es bastante baja: `7` en la [Tabla MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Operator_Precedence#Table).

Es más baja que en la mayoría de los operadores y un poco más alta que `=` y `?`.

Así que si necesitas usar `??` en una expresión compleja,  considera añadir paréntesis:
=======
Here, `height || 100` treats zero height as unset, same as `null`, `undefined` or any other falsy value. So zero becames `100`.

The `height ?? 100` returns `100` only if `height` is exactly `null` or `undefined`. So zero remains "as is".

Which behavior is better depends on a particular use case. When zero height is a valid value, that we shouldn't touch, then `??` is preferrable.

## Precedence

The precedence of the `??` operator is rather low: `7` in the [MDN table](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table).

So `??` is evaluated after most other operations, but before `=` and `?`.

If we need to choose a value with `??` in a complex expression, then consider adding parentheses:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
let height = null;
let width = null;

<<<<<<< HEAD
// Importante: usar paréntesis
=======
// important: use parentheses
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
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

El siguiente código desencadena un error de sintáxis:
=======
Otherwise, if we omit parentheses, `*` has the higher precedence than `??` and would run first.

That would work be the same as:

```js
// probably not correct
let area = height ?? (100 * width) ?? 50;
```

There's also a related language-level limitation.

**Due to safety reasons, it's forbidden to use `??` together with `&&` and `||` operators.**

The code below triggers a syntax error:
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

<<<<<<< HEAD
La limitación es sin duda alguna debatible, pero por ciertas razones fue agregada a la especificación del lenguaje.

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
=======
The limitation is surely debatable, but it was added to the language specification with the purpose to avoid programming mistakes, as people start to switch to `??` from `||`.

Use explicit parentheses to work around it:

```js run
*!*
let x = (1 && 2) ?? 3; // Works
*/!*

alert(x); // 2
```

## Summary

- The nullish coalescing operator `??` provides a short way to choose a "defined" value from the list.

    It's used to assign default values to variables:

    ```js
    // set height=100, if height is null or undefined
    height = height ?? 100;
    ```

- The operator `??` has a very low precedence, a bit higher than `?` and `=`.
- It's forbidden to use it with `||` or `&&` without explicit parentheses.
>>>>>>> 69e44506c3e9dac74c282be37b55ba7ff122ae74
