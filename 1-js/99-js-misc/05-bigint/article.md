# BigInt

[recent caniuse="bigint"]

<<<<<<< HEAD
`BigInt` es un tipo numérico especial que provee soporte a enteros de tamaño arbitrario.

Un bigint se crea agregando `n` al final del literal entero o llamando a la función `BigInt` que crea bigints desde cadenas, números, etc.
=======
`BigInt` is a special numeric type that provides support for integers of arbitrary length.

A bigint is created by appending `n` to the end of an integer literal or by calling the function `BigInt` that creates bigints from strings, numbers etc.
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

<<<<<<< HEAD
const bigintFromNumber = BigInt(10); // lo mismo que 10n
```

## Operadores matemáticos

`BigInt` puede ser usado mayormente como un número regular, por ejemplo:
=======
const bigintFromNumber = BigInt(10); // same as 10n
```

## Math operators

`BigInt` can mostly be used like a regular number, for example:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

<<<<<<< HEAD
Por favor, ten en cuenta: la división `5/2` devuelve el resultado redondeado a cero, sin la parte decimal. Todas las operaciones sobre bigints devuelven bigints.

No podemos mezclar bigints con números regulares:

```js run
alert(1n + 2); // Error: No se puede mezclar BigInt y otros tipos.
```

Podemos convertirlos explícitamente cuando es necesario: usando `BigInt()` o `Number()` como aquí:
=======
Please note: the division `5/2` returns the result rounded towards zero, without the decimal part. All operations on bigints return bigints.

We can't mix bigints and regular numbers:

```js run
alert(1n + 2); // Error: Cannot mix BigInt and other types
```

We should explicitly convert them if needed: using either `BigInt()` or `Number()`, like this:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
let bigint = 1n;
let number = 2;

<<<<<<< HEAD
// De number a bigint
alert(bigint + BigInt(number)); // 3

// De bigint a number
alert(Number(bigint) + number); // 3
```

Las operaciones de conversión siempre son silenciosas, nunca dan error, pero si el bigint es tan gigante que no podrá ajustarse al tipo numérico, los bits extra serán recortados, entonces deberíamos ser cuidadosos al hacer tal conversión.

````smart header="El unario más no tiene soporte en bigints"
El operador unario más `+value` es una manera bien conocida de convertir `value` a number.

Para evitar las confusiones, con bigints eso no es soportado:
=======
// number to bigint
alert(bigint + BigInt(number)); // 3

// bigint to number
alert(Number(bigint) + number); // 3
```

The conversion operations are always silent, never give errors, but if the bigint is too huge and won't fit the number type, then extra bits will be cut off, so we should be careful doing such conversion.

````smart header="The unary plus is not supported on bigints"
The unary plus operator `+value` is a well-known way to convert `value` to a number.

In order to avoid confusion, it's not supported on bigints:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```js run
let bigint = 1n;

alert( +bigint ); // error
```
<<<<<<< HEAD
Entonces debemos usar `Number()` para convertir un bigint a number.
````

## Comparaciones

Comparaciones tales como `<`, `>` funcionan bien entre bigints y numbers:
=======
So we should use `Number()` to convert a bigint to a number.
````

## Comparisons

Comparisons, such as `<`, `>` work with bigints and numbers just fine:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

<<<<<<< HEAD
Por favor, nota que como number y bigint pertenecen a diferentes tipos, ellos pueden ser iguales `==`, pero no estrictamente iguales `===`:
=======
Please note though, as numbers and bigints belong to different types, they can be equal `==`, but not strictly equal `===`:
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

<<<<<<< HEAD
## Operaciones booleanas 

Cuando estan dentro de un `if` u otra operación booleana, los bigints se comportan como numbers.

Por ejemplo, en `if`, el bigint `0n` es falso, los otros valores son verdaderos:

```js run
if (0n) {
  // nunca se ejecuta
}
```

Los operadores booleanos, tales como `||`, `&&` y otros, también trabajan con bigints en forma similar a los number:

```js run
alert( 1n || 2 ); // 1 (1n es considerado verdadero)

alert( 0n || 2 ); // 2 (0n es considerado falso)
=======
## Boolean operations

When inside `if` or other boolean operations, bigints behave like numbers.

For instance, in `if`, bigint `0n` is falsy, other values are truthy:

```js run
if (0n) {
  // never executes
}
```

Boolean operators, such as `||`, `&&` and others also work with bigints similar to numbers:

```js run
alert( 1n || 2 ); // 1 (1n is considered truthy)

alert( 0n || 2 ); // 2 (0n is considered falsy)
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
```

## Polyfills

<<<<<<< HEAD
Hacer Polyfill con bigints es trabajoso. La razón es que muchos operadores JavaScript como `+`, `-` y otros se comportan de diferente manera comparados con los números regulares.

Por ejemplo, la división de bigints siempre devuelve un bigint (redondeado cuando es necesario).

Para emular tal comportamiento, un polyfill necesitaría analizar el código y reemplazar todos los operadores con sus funciones. Pero hacerlo es engorroso y tendría mucho costo en performance.

Por lo que no se conoce un buen polyfill.

Aunque hay otra manera, la propuesta por los desarrolladores de la librería [JSBI](https://github.com/GoogleChromeLabs/jsbi).

Esta librería implementa bigint usando sus propios métodos. Podemos usarlos en lugar de bigints nativos:

| Operación | `BigInt` nativo | JSBI |
|-----------|-----------------|------|
| Creación desde Number | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Suma | `c = a + b` | `c = JSBI.add(a, b)` |
| Resta	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...Y entonces usar polyfill (plugin Babel) para convertir las llamadas de JSBI en bigints nativos para aquellos navegadores que los soporten.

En otras palabras, este enfoque sugiere que escribamos código en JSBI en lugar de bigints nativos. Pero JSBI trabaja internamente tanto con numbers como con bigints, los emula siguiendo de cerca la especificación, entonces el código será "bigint-ready" (preparado para bigint).

Podemos usar tal código JSBI "tal como está" en motores que no soportan bigints, y para aquellos que sí lo soportan - el polyfill convertirá las llamadas en bigints nativos.

## Referencias

- [MDN documentación BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
- [Especificación](https://tc39.es/ecma262/#sec-bigint-objects).
=======
Polyfilling bigints is tricky. The reason is that many JavaScript operators, such as `+`, `-` and so on behave differently with bigints compared to regular numbers.

For example, division of bigints always returns a bigint (rounded if necessary).

To emulate such behavior, a polyfill would need to analyze the code and replace all such operators with its functions. But doing so is cumbersome and would cost a lot of performance.

So, there's no well-known good polyfill.

Although, the other way around is proposed by the developers of [JSBI](https://github.com/GoogleChromeLabs/jsbi) library.

This library implements big numbers using its own methods. We can use them instead of native bigints:

| Operation | native `BigInt` | JSBI |
|-----------|-----------------|------|
| Creation from Number | `a = BigInt(789)` | `a = JSBI.BigInt(789)` |
| Addition | `c = a + b` | `c = JSBI.add(a, b)` |
| Subtraction	| `c = a - b` | `c = JSBI.subtract(a, b)` |
| ... | ... | ... |

...And then use the polyfill (Babel plugin) to convert JSBI calls to native bigints for those browsers that support them.

In other words, this approach suggests that we write code in JSBI instead of native bigints. But JSBI works with numbers as with bigints internally, emulates them closely following the specification, so the code will be "bigint-ready".

We can use such JSBI code "as is" for engines that don't support bigints and for those that do support - the polyfill will convert the calls to native bigints.

## References

- [MDN docs on BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt).
- [Specification](https://tc39.es/ecma262/#sec-bigint-objects).
>>>>>>> fbf443e414097e5a3a41dd1273ef9a4a3230e72c
