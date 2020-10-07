# Nullish coalescing operator '??'

[recent browser="new"]

El _nullish coalescing operator_ `??` brinda una sintaxis corta para seleccionar la primera variable "definida" de una lista.

El resultado de `a ?? b` es:
- `a` si esta no es `null` o `undefined`,
- `b`, en el caso contrario.

Entonces, `x = a ?? b` es la versión corta de:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Aquí un ejemplo más detallado.

Pensemos que tenemos un `firstName`, `lastName` o `nickName`, todos ellos pueden ser undefined  si el usuario decide no ingresar ningún nombre.

Queremos mostrar un nombre, una de las tres variables, o "Anonymous" si ninguno está definido:

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

La gran diferencia es que:
- `||` retorna el primer valor *truthy*.
- `??` retorna el primer valor *defined*.

Esto es de suma importancia cuando queremos tratar `null/undefined` diferente de `0`.

Por ejemplo:

// shows the first truthy value:
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Esto le asigna `100` a `height` si esta no está definida.

Comparémoslo con `||`:

```js run
let height = 0;

alert(height || 100); // 100
alert(height ?? 100); // 0
```

En este caso, `height || 100` maneja `height` con un valor de `0` como no asignada, al igual que con `null`, `undefined` o cualquier otro valor _falsy_, dependiendo de la situación, esto puede ser incorrecto.

En el caso de `height ?? 100` este retorna `100` solo si `height` es exactamente `null` o `undefined`.

## Precedencia

La precedencia del operador `??` es bastante baja: `5` en la [Tabla MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Operator_Precedence#Table).

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
