# BigInt

[recent caniuse="bigint"]

`BigInt` es un tipo numérico especial que provee soporte a enteros de tamaño arbitrario.

Un bigint se crea agregando `n` al final del literal entero o llamando a la función `BigInt` que crea bigints desde cadenas, números, etc.

```js
const bigint = 1234567890123456789012345678901234567890n;

const sameBigint = BigInt("1234567890123456789012345678901234567890");

const bigintFromNumber = BigInt(10); // lo mismo que 10n
```

## Operadores matemáticos

`BigInt` puede ser usado mayormente como un número regular, por ejemplo:

```js run
alert(1n + 2n); // 3

alert(5n / 2n); // 2
```

Por favor, ten en cuenta: la división `5/2` devuelve el resultado redondeado a cero, sin la parte decimal. Todas las operaciones sobre bigints devuelven bigints.

No podemos mezclar bigints con números regulares:

```js run
alert(1n + 2); // Error: No se puede mezclar BigInt y otros tipos.
```

Podemos convertirlos explícitamente cuando es necesario: usando `BigInt()` o `Number()` como aquí:

```js run
let bigint = 1n;
let number = 2;

// De number a bigint
alert(bigint + BigInt(number)); // 3

// De bigint a number
alert(Number(bigint) + number); // 3
```

Las operaciones de conversión siempre son silenciosas, nunca dan error, pero si el bigint es tan gigante que no podrá ajustarse al tipo numérico, los bits extra serán recortados, entonces deberíamos ser cuidadosos al hacer tal conversión.

````smart header="El unario más no tiene soporte en bigints"
El operador unario más `+value` es una manera bien conocida de convertir `value` a number.

Para evitar las confusiones, con bigints eso no es soportado:
```js run
let bigint = 1n;

alert( +bigint ); // error
```
Entonces debemos usar `Number()` para convertir un bigint a number.
````

## Comparaciones

Comparaciones tales como `<`, `>` funcionan bien entre bigints y numbers:

```js run
alert( 2n > 1n ); // true

alert( 2n > 1 ); // true
```

Por favor, nota que como number y bigint pertenecen a diferentes tipos, ellos pueden ser iguales `==`, pero no estrictamente iguales `===`:

```js run
alert( 1 == 1n ); // true

alert( 1 === 1n ); // false
```

## Operaciones booleanas 

Cuando están dentro de un `if` u otra operación booleana, los bigints se comportan como numbers.

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
```

## Polyfills

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
