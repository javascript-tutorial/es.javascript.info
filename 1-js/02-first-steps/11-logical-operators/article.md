# Operadores Lógicos

Hay tres operadores lógicos en JavaScript: `||` (OR (O)), `&&` (AND (Y)), `!` (NOT (NO)).

Aunque sean llamados lógicos, pueden ser aplicados a valores de cualquier tipo, no solo booleanos. El resultado también puede ser de cualquier tipo.

Veamos los detalles.

## || (OR)

El operador `OR` se representa con dos simbolos de linea vertical:

```js
result = a || b;
```

En la programación clasica, el OR lógico esta pensado para manipular solo valores booleanos. Si cualquiera de sus argumentos es `true`, retorna `true`, de lo contrario retorna `false`.

En JavaScript, el operador es un poco más complicado y poderoso. Pero primero, veamos qué pasa con los valores booleanos.

Hay cuatro combinaciones lógicas posibles:

```js run
alert(true || true); // true (verdadero)
alert(false || true); // true
alert(true || false); // true
alert(false || false); // false (falso)
```

Como podemos ver, el resultado es siempre `true` excepto cuando ambos operandos son `false`.

Si un operando no es un booleano, se lo convierte a booleano para la evaluación.

Por ejemplo, el número `1` es tratado como `true`, el número `0` como `false`:

```js run
if (1 || 0) { // Funciona como if( true || false )
	alert("valor verdadero!");
}
```

La mayoría de las veces, OR `||` es usado en una declaración `if` para probar si *cualquiera* de las condiciones dadas es `true`.

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
	alert("La oficina esta cerrada."); // Es fin de semana
}
```

<<<<<<< HEAD
## OR encuentra el primer valor verdadero
=======
## OR "||" finds the first truthy value
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

La lógica descrita arriba es algo clásica. Ahora, mostremos las características "extra" de JavaScript.

El algoritmo extendido trabaja de la siguiente forma.

Dado múltiples valores aplicados al operador OR:

```js
result = value1 || value2 || value3;
```

El operador OR `||` realiza lo siguiente:

-  Evalua los operandos de izquierda a derecha.
-  Para cada operando, convierte el valor a booleano. Si el resultado es `true`, se detiene y retorna el valor orginal de ese operando.
-  Si todos los operandos han sido evaluados (todos eran `false`), retorna el ultimo operando.

Un valor es retornado en su forma original, sin la conversión.

<<<<<<< HEAD
En otras palabras, una cadena de OR `"||"` retorna el primer valor verdadero o el último valor en caso de que ningún verdadero sea encontrado.
=======
In other words, a chain of OR `"||"` returns the first truthy value or the last one if no truthy value is found.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

Por ejemplo:

```js run
alert(1 || 0); // 1 (1 es un valor verdado)
alert(true || "cualquier valor"); // (true es un valor verdadero)

alert(null || 1); // 1 (1 es el primer valor verdadero)
alert(null || 0 || 1); // 1 (el primer valor verdadero)
alert(undefined || null || 0); // 0 (todos son valores falsos, retorna el último valor)
```

Esto brinda varios usos interesantes comparados al "OR puro, clásico, de solo booleanos".

1. **Consiguiendo el primer valor verdadero de una lista de variables o expresiones.**

<<<<<<< HEAD
   Imagina que tenemos múltiples variables que pueden contener datos o bien ser `null/undefined`. ¿Cómo podemos encontrar el primer valor que contenga datos?
=======
    Imagine we have a list of variables which can either contain data or be `null/undefined`. How can we find the first one with data?
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

   Podemos usar OR `||`:

   ```js run
   let currentUser = null;
   let defaultUser = "John";

   *!*
   let name = currentUser || defaultUser || "sin nombre";
   */!*

   alert( name ); // selecciona "John" – el primer valor verdadero
   ```

   Si tanto `currentUser` como `defaultUser` hubieran sido valores falsos, `"sin nombre"` hubiera sido el resultado.

2. **Evaluación de cortocircuito.**

   Los operandos no solo pueden ser valores, sino que tambien expresiones arbitrarias. OR los evalua y comprueba de izquierda a derecha. La evaluación termina cuando un valor verdadero es alcanzado, y dicho valor es retornado. Este proceso es llamado "evaluación de cortocircuito" porque avanza lo menos posible de izquierda a derecha.

   Esto se ve claramente cuando la expresión dada como segundo argumento tiene un efecto secundario como una asignación de variable.

   En el ejemplo debajo, `x` no es asignada:

   ```js run no-beautify
   let x;

   *!*true*/!* || (x = 1);

   alert(x); // undefined, porque (x = 1) no es evaluado.
   ```

   Si, en cambio, el primer argumento fuera `false`, `||` evaluaría el segundo, realizando la asignación.

   ```js run no-beautify
   let x;

   *!*false*/!* || (x = 1);

<<<<<<< HEAD
   alert(x); // 1
   ```
=======
    An assignment is a simple case. There may be side effects, that won't show up if the evaluation doesn't reach them.
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

   Una asignación es un caso simple. Puede haber efectos secundarios, los cuales no se notarán si la evaluación no los alcanza.

   Como podemos ver, tal caso de uso es una "manera más corta de usar `if`". El primer operando es convertido a booleano. Si el primero es falso, el segundo sera evaluado.

   La mayor parte del tiempo, es mejor usar un `if` "normal" para mantener el código fácil de entender, pero a veces esto puede ser útil.

## && (AND)

El operador AND es representado con `&&`:

```js
result = a && b;
```

En la programación clasica, AND retorna `true` si ambos operandos son valores verdaderos y falso en cualquier otro caso.

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

Al igual que con OR, cualquier valor es permitido como operando de AND: 

```js run
if (1 && 0) { // evaluado como true && false
  alert( "no funcionará porque el resultado es un valor falso" );
}
```

## AND encuentra el primer valor verdadero

<<<<<<< HEAD
Dado múltiples valores aplicados al operador AND:
=======
## AND "&&" finds the first falsy value

Given multiple AND'ed values:
>>>>>>> 2b5ac971c1bd8abe7b17cdcf724afd84799b6cbd

```js
result = value1 && value2 && value3;
```

El operador AND `&&` realiza lo siguiente:

-  Evalua los operandos de izquierda a derecha.
-  Para cada operando, los convierte a un booleano. Si el resultado es `false`, se detiene y retorna el valor original de dicho operando.
-  Si todos los operandos han sido evaluados (todos fueron valores verdaderos), retorna el último operando.

En otras palabras, AND retorna el primer valor falso o el último valor si ninguno fue encontrado.

Las reglas anteriores son similares a las de OR. La difierence es que AND retorna el primer valor *falso* mientras que OR retorna el primer valor *verdadero*.

Ejemplo:

```js run
// si el primer operando es un valor verdadero,
// AND retorna el segundo operando:
alert(1 && 0); // 0
alert(1 && 5); // 5

// si el primer operando es un valor falso,
// AND lo retorna. El segundo operando es ignorado
alert(null && 5); // null
alert(0 && "cualquier valor"); // 0
```

También podemos pasar varios valores de una vez. Observa como el primer valor falso es retornado: 

```js run
alert(1 && 2 && null && 3); // null
```

Cuando todos los valores son verdaderos, el último valor es retornado:

```js run
alert(1 && 2 && 3); // 3, el último.
```

```smart header="La precedencia de AND `&&` es mayor que la de OR `||`"

La precedencia del operador AND `&&` es mayor que la de OR `||`.

Así que el código `a && b || c && d` es básicamente el mismo que si la expresiones `&&` estuvieran entre paréntesis: `(a && b) || (c && d)`
```

Justo como en OR, el operador AND `&&` puede reemplazar en ocasiones al `if`.

Por ejemplo:

```js run
let x = 1;

(x > 0) && alert("Mayor que cero!");
````

La acción en la parte derecha de `&&` sería ejecutada sólo si la evaluación la alcanza. Eso es, solo si `(x > 0)` es verdadero.

Así que básicamente tenemos un análogo para:

```js run
let x = 1;

if (x > 0) {
	alert("Mayor que cero!");
}
```

La variante con `&&` parece más corta. Pero `if` es más obvio y tiende a ser un poco más legible.

Así que recomendamos usar cada construcción para su propósito: usar `if` si queremos if y usar `&&` si queremos AND.

## ! (NOT)

El operador booleano NOT se representa con un signo de exclamación `!`.

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

Eso es, el primer NOT convierte el valor a booleano y retorna el inverso, y el segundo NOT lo invierte de nuevo. Al final, tenemos una simple conversión a booleano.

Hay una manera un poco mas prolija de realizar lo mismo -- una función integrada `Boolean`:

```js run
alert(Boolean("cadena de texto no vacía")); // true
alert(Boolean(null)); // false
```

La precedencia de NOT `!` es la mayor de todos los operadores lógicos, así que siempre se ejecuta primero, antes que `&&` o `||`.

