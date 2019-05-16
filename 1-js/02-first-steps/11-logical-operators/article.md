# Operadores Lógicos

Hay tres operadores lógicos en JavaScript: `||` (OR (O)), `&&` (AND (Y)), `!` (NOT (NO)).

Aun que sean llamados lógicos, pueden ser aplicados a valores de cualquier tipo, no solo booleanos. El resultado también puede ser de cualquier tipo.

Veamos los detalles.

## || (OR)

El operador `OR` es represtando con dos simbolos de linea verticales:

```js
result = a || b;
```

En la programación clasica, el OR lógico esta pensado para manipular solo valore booleanos. Si cualquiera de sus argumentos son `true`, retornara `true`, de lo contrario retornara `false`.

En JavaScript, el operador es un poco más complicado y poderoso. Pero primero, veamos que pasa con los valores booleanos.

Hay cuatro posibles combinaciones lógicas:

```js run
alert(true || true); // true (verdadero)
alert(false || true); // true
alert(true || false); // true
alert(false || false); // false (falso)
```

Como podemos ver, los resultados son siempre `true` excepto en el caso de que ambos operandos sean `false`

Si un operando no es un booleano, entonces es convertido a un booleano para la evaluación.

Por ejemplo, el número `1` es tratado como `true`, el número `0` como `false`:

```js run
if (1 || 0) {
	// Funciona como if( true || false )
	alert("valor verdadero!");
}
```

La mayoría del tiempo, OR `||` es usando como una declaración de `if` para probar si *cualqueria* de las condiciones dadas son `true`

Por ejemplo:

```js run
let hour = 9;

*!*
if (hour < 10 || hour > 18) {
*/!*
  alert( 'La oficina esta cerrada.' );
}
```

Podemos pasar mas condiciones:

```js run
let hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
	alert("La oficina esta cerrada."); // Esta los fines de semana
}
```

## OR encuentra el primer valor verdadero

La lógica descrita arriba es algo clásica. Ahora, vamos a traer las caracteristicas "extra" de JavaScript.

El algoritmo extendido trabajo de la siguiente forma.

Dado múltiples valores aplicados al operador OR:

```js
result = value1 || value2 || value3;
```

El operador OR `||` realiza lo siguiente:

-  Evalua los operandos de izquierda a derecha.
-  Para cada operando, convierte el valor a booleano. Si el resultado es `true`, se detiene y retorna el valor orginal de ese operando.
-  Si todos los operandos han sido evaluados (todos eran `false`), retorna el ultimo operando.

Un valor es retornado en su forma original, sin la conversión.

En otras palabras, una cadena de OR `"||"` retorna el primer valor verdadero o el último valor en caso de que dicho valor no sea encontrado.

Por ejemplo:

```js run
alert(1 || 0); // 1 (1 es un valor verdado)
alert(true || "sin importar que"); // (true es un valor verdadero)

alert(null || 1); // 1 (1 es el primer valor verdadero)
alert(null || 0 || 1); // 1 (el primer valor verdadero)
alert(undefined || null || 0); // 0 (todos son valores falsos, retorna el último valor)
```

Esto lleva a varios usos interesantes comparados a el "puro, clásico, solo booleanos OR".

1. **Consiguiendo el primer valor verdadero de una lista de expresiones.**

   Imagina que tenemos varias variables que pueden contener datos o ser `null/undefined`. ¿Comó podemos encontrar el primero valor con datos?

   Podemos usar OR `||`:

   ```js run
   let currentUser = null;
   let defaultUser = "John";

   *!*
   let name = currentUser || defaultUser || "sin nombre";
   */!*

   alert( name ); // seleccioná "John" – el primer valor verdadero
   ```

   Si tanto `currentUser` como `defaultUser` eran valores falsos, `"sin nombre"` hubiera sido el resultado.

2. **Evaluación de cortocircuito.**

   Los operandos no solo pueden ser valors, si no que tambien expresiones arbitrarias. OR los evalua y comprueba de izquierda a derecha. La evaluación termina cuando un valor verdadero es alcanzado, y dicho valor es retornado. Este proceso es llamado "evaluación de cortocircuito" porque va lo más corto posible de izquierda a derecha.

   Esto es claramente visto cuando una expresión dada como segundo argumento tiene un efecto secundario como una asignación de variable.

   En el ejemplo debajo, `x` no es asignada:

   ```js run no-beautify
   let x;

   *!*true*/!* || (x = 1);

   alert(x); // undefined, porque (x = 1) no es evaluado.
   ```

   Si, en vez, el primer argumento fuera `false`, `||` evaluaria el segundo, por tanto corriendo el asignamiento.

   ```js run no-beautify
   let x;

   *!*false*/!* || (x = 1);

   alert(x); // 1
   ```

   Un asignamiento es un caso simple. Otros efectos secundarios tambien puede ser usados.

   Como podemos ver, tal caso de uso es una "manera más corta de usar `if`". El primer operando es convertido a booleano. Si y el primero es falso, el segundo sera evaluado.

   La mayoría del tiempo, es mejor usar un `if` "normal" para mantener el código fácil de entender, pero a veces esto puede ser útil.

## && (AND)

El operador AND es representado con `&&`:

```js
result = a && b;
```

En la programación clasica, AND retorna `true` si ambos operandos son valores verdaderos o de otro caso valores falsos.

```js run
alert(true && true); // true
alert(false && true); // false
alert(true && false); // false
alert(false && false); // false
```

Un ejemplo con `if`:

```js run
let hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
	alert("La hora es 12:30");
}
```

Tal y como con OR, cualquier valor es permitido como operando de AND: Just as with OR, any value is allowed as an operand of AND:

```js run
if (1 && 0) { // evaluated as true && false
  alert( "no funcionara, por que el resultado es un valor falso );
}
```

## AND encuentra el primer valor verdadero y lo retorna

Dado varios múltiples valores aplicados al operador AND:

```js
result = value1 && value2 && value3;
```

El operador AND `&&` realiza lo siguiente:

-  Evalua los operandos de izquierda a derecha.
-  Para cada operando, los convierte a un booleano. Si el resultado es `false`, se detiene y retorna el valor original de dicho operando.
-  Si todos los operandos han sido evaluados (todos fueron valores verdaderos), retorna el último operando.

En otras palabras, AND retorna el primer valor falso o el último valor si ninguno fue encontrado.

Las reglas de arriba son similares a las de OR. La difierence es que AND retorna el primer valor *falso* mientras que OR retorna el primer valor *verdadero*.

Ejemplo:

```js run
// si el primer operando es un valor verdadero,
// AND retorna el segundo operando:
alert(1 && 0); // 0
alert(1 && 5); // 5

// si el primer operando es un valor falso,
// AND lo retorna. El segundo operando es ignorado
alert(null && 5); // null
alert(0 && "no matter what"); // 0
```

Tambien podemos pasar varios valores en una fila. Observa como el primer valor falso es retornado: We can also pass several values in a row. See how the first falsy one is returned:

```js run
alert(1 && 2 && null && 3); // null
```

Cuando todos los valores son verdaderos, el último valor es retornado:

```js run
alert(1 && 2 && 3); // 3, el último.
```

```smart header="La precedencia de AND `&&` es mayor que la de OR `||`"

La precedencia del operador AND `&&` es mayor que la de OR `|| ``.

Así que el código `a && b || c && d` es esensialmente el mismo que si la expresiones `&&` estuvieran en parentesis: `(a && b) || (c && d)`
```

Justo como en OR, el operador AND `&&` puede ser algunas vece remplazado por `if`.

Por ejemplo:

```js run
let x = 1;

x > 0 && alert("Mayor que cero!");
````

La acción en la parte derecha de `&&` seria ejecutada solo si la evaluación la alcanza. Eso es, solo si `(x > 0)` que es verdadero.

Asi que basicamente tenemos un análogo para:

```js run
let x = 1;

if (x > 0) {
	alert("Mayor que cero!");
}
```

La variante con `&&` parece más corta. Pero `if` es más obvio y tiende a ser un poco más legible.

Asi que recomendamos usar cada construcción para su propósito: usa `if` si queremos if y usa `&&` si queremos AND. So we recommend using every construct for its purpose: use `if` if we want if and use `&&` if we want AND.

## ! (NOT)

El operador booleano NOT es representado con un signo de exclamación `!`.

La sintaxis es bastante simple:

```js
result = !value;
```

El operador acepta un solo argumento y realiza lo siguiente:

1. Convierte el operando al tipo booleano: `true/false`.
2. Retorna el valor contrario.

Por ejemplo:

```js run
alert(!true); // false
alert(!0); // true
```

Un doble NOT `!!` es a veces usado para convertir un valor al tipo booleano:

```js run
alert(!!"cadena de texto no vacía"); // true
alert(!!null); // false
```

Eso es, el primer NOT convierte el valor a booleano y retorna el inverso, y el sgundo NOT lo invierte de nuevo. Al final, tenemos una simple conversión a booleano.

Hay una manera un poco mas verbosa de realizar lo mismo -- una función integrada `Boolean`:

```js run
alert(Boolean("cadena de texto no vacía")); // true
alert(Boolean(null)); // false
```

La precedencia de NOT `!` es la mayor de todos los operadores lógicos, asi que siempre se ejecuta primero, antes de `&&` o `||`.

```

```
