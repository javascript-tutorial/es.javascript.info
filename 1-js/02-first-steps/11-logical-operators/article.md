# Operadores Lógicos

Hay cuatro operadores lógicos en JavaScript: `||` (O), `&&` (Y), `!` (NO), `??` (Fusión de nulos). Aquí cubrimos los primeros tres, el operador  `??` se verá en el siguiente artículo. 

Aunque sean llamados lógicos, pueden ser aplicados a valores de cualquier tipo, no solo booleanos. El resultado también puede ser de cualquier tipo.

Veamos los detalles.

## || (OR)

El operador `OR` se representa con dos símbolos de linea vertical:

```js
result = a || b;
```

En la programación clásica, el OR lógico esta pensado para manipular solo valores booleanos. Si cualquiera de sus argumentos es `true`, retorna `true`, de lo contrario retorna `false`.

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

La mayoría de las veces, OR `||` es usado en una declaración `if` para probar si *alguna* de las condiciones dadas es `true`.

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

## OR "||" encuentra el primer valor verdadero [#or-finds-the-first-truthy-value]

La lógica descrita arriba es algo clásica. Ahora, mostremos las características "extra" de JavaScript.

El algoritmo extendido trabaja de la siguiente forma.

Dado múltiples valores aplicados al operador OR:

```js
result = value1 || value2 || value3;
```

El operador OR `||` realiza lo siguiente:

-  Evalúa los operandos de izquierda a derecha.
-  Para cada operando, convierte el valor a booleano. Si el resultado es `true`, se detiene y retorna el valor original de ese operando.
-  Si todos los operandos han sido evaluados (todos eran `false`), retorna el ultimo operando.

Un valor es retornado en su forma original, sin la conversión.

En otras palabras, una cadena de OR `"||"` devuelve el primer valor verdadero o el último si ningún verdadero es encontrado.

Por ejemplo:

```js run
alert(1 || 0); // 1 (1 es un valor verdadero)

alert(null || 1); // 1 (1 es el primer valor verdadero)
alert(null || 0 || 1); // 1 (el primer valor verdadero)

alert(undefined || null || 0); // 0 (todos son valores falsos, retorna el último valor)
```

Esto brinda varios usos interesantes comparados al "OR puro, clásico, de solo booleanos".

1. **Obtener el primer valor verdadero de una lista de variables o expresiones.**

   Por ejemplo, tenemos las variables `firstName`, `lastName` y `nickName`, todas opcionales (pueden ser undefined o tener valores falsos).

   Usemos OR `||` para elegir el que tiene los datos y mostrarlo (o anónimo si no hay nada configurado):

   ```js run
   let firstName = "";
   let lastName = "";
   let nickName = "SuperCoder";

   *!*
   alert( firstName || lastName || nickName || "Anonymous"); // SuperCoder
   */!*
   ```

    Si todas las variables fueran falsas, aparecería `"Anonymous"`. 

2. **Evaluación del camino más corto.**

Otra característica de OR || operador es la evaluación de "el camino más corto".

Esto significa que `||` procesa sus argumentos hasta que se alcanza el primer valor verdadero, y luego el valor se devuelve inmediatamente, sin siquiera tocar el otro argumento.

    La importancia de esta característica se vuelve obvia si un operando no es solo un valor, sino una expresión con un efecto secundario, como una asignación de variable o una llamada a función.

En el siguiente ejemplo, solo se imprime el segundo mensaje:

 ```js run no-beautify
    *!*true*/!* || alert("not printed");
    *!*false*/!* || alert("printed");
 ```

En la primera línea, el operador OR `||` detiene la evaluación inmediatamente después de ver que es verdadera, por lo que la alerta no se ejecuta.

A veces, las personas usan esta función para ejecutar comandos solo si la condición en la parte izquierda es falsa.

## && (AND)

El operador AND es representado con dos ampersands `&&`:

```js
result = a && b;
```

En la programación clásica, AND retorna `true` si ambos operandos son valores verdaderos y `false` en cualquier otro caso.

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

## AND "&&" encuentra el primer valor falso

Dado múltiples valores aplicados al operador AND:

```js
result = value1 && value2 && value3;
```

El operador AND `&&` realiza lo siguiente:

-  Evalúa los operandos de izquierda a derecha.
-  Para cada operando, los convierte a un booleano. Si el resultado es `false`, se detiene y retorna el valor original de dicho operando.
-  Si todos los operandos han sido evaluados (todos fueron valores verdaderos), retorna el último operando.

En otras palabras, AND retorna el primer valor falso o el último valor si ninguno fue encontrado.

Las reglas anteriores son similares a las de OR. La diferencia es que AND retorna el primer valor *falso* mientras que OR retorna el primer valor *verdadero*.

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

````smart header="La precedencia de AND `&&` es mayor que la de OR `||`"

La precedencia del operador AND `&&` es mayor que la de OR `||`.

Así que el código `a && b || c && d` es básicamente el mismo que si la expresiones `&&` estuvieran entre paréntesis: `(a && b) || (c && d)`
````

````warn header="No remplace *if* con || ni &&"
A veces, la gente usa el operador AND `&&` como una "forma más corta de escribir `if`".

Por ejemplo:

```js run
let x = 1;

(x > 0) && alert("¡Mayor que cero!");
```

La acción en la parte derecha de `&&` sería ejecutada sólo si la evaluación la alcanza. Eso es, solo si `(x > 0)` es verdadero.

Así que básicamente tenemos un análogo para:

```js run
let x = 1;

if (x > 0) alert("Mayor que cero!");
```
Aunque la variante con `&&` parece más corta, `if` es más obvia y tiende a ser un poco más legible. Por lo tanto, recomendamos usar cada construcción para su propósito: use `if` si queremos si y use` && `si queremos AND.
````

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
