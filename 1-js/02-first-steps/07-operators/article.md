# Operadores

Conocemos varios operadores de la escuela. Son cosas como la suma `+`, multiplicación `*`, resta `-`, etcétera.

En este capítulo, nos vamos a concentrar en los aspectos de los operadores que no están cubiertos en la aritmética escolar.

## Términos: "unario", "binario", "operando"

Antes de continuar, comprendamos la terminología común.

- *Un operando* -- es a lo que se aplican los operadores. Por ejemplo, en la multiplicación de `5 * 2` hay dos operandos: el operando izquierdo es `5` y el operando derecho es `2`. A veces, la gente llama a estos "argumentos" en lugar de "operandos".
- Un operador es *unario* si tiene un solo operando. Por ejemplo, la negación unaria `-` invierte el signo de un número:

    ```js run
    let x = 1;

    *!*
    x = -x;
    */!*
    alert( x ); // -1, se aplicó negación unaria
    ```
- Un operador es *binario* si tiene dos operandos. El mismo negativo también existe en forma binaria:

    ```js run no-beautify
    let x = 1, y = 3;
    alert( y - x ); // 2, binario negativo resta valores
    ```

Formalmente, en el ejemplo de arriba tenemos dos operadores distintos que comparten el mismo símbolo: el operador de negación, un operador unario que invierte el signo, y el operador de resta, un operador binario que resta un número de otro.

## Concatenación de cadenas, binario +

Ahora veamos características especiales de JavaScript que van más allá de las aritméticas escolares.

Normalmente el operador `+` suma números.

Pero si se aplica el `+` binario a una cadena, los une (concatena):

```js
let s = "my" + "string";
alert(s); // mystring
```

Tenga presente que si uno de los operandos es una cadena, el otro es convertido a una cadena también.

Por ejemplo:

```js run
alert( '1' + 2 ); // "12"
alert( 2 + '1' ); // "21"
```

Vieron, no importa si el primer operando es una cadena o el segundo. La regla es simple: si cualquiera de los operandos es una cadena, el otro también se convierte en una cadena.

Sin embargo, tenga en cuenta que las operaciones se ejecutan de izquierda a derecha. Si hay dos números seguidos de una cadena, los números se agregarán antes de convertirlos en una cadena:

```js run
alert(2 + 2 + '1' ); // "41" y no "221"
```

Concatenación de cadena y conversión es una característica especial del operador binario suma `+`. Otros operadores aritméticos sólo funcionan con números y siempre convierten sus operandos a números.

Por ejemplo, resta y división:

```js run
alert( 2 - '1' ); // 1
alert( '6' / '2' ); // 3
```

## Conversión numérica, unario +

La suma `+` existe en dos formas: la forma binaria que utilizamos arriba y la forma unaria.

El unario suma o, en otras palabras, el operador suma `+` aplicado a un solo valor, no hace nada a los números. Pero si el operando no es un número, el unario suma lo convierte en un número.

Por ejemplo:

```js run
// Sin efecto en números
let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

*!*
// Convierte los no números
alert( +true ); // 1
alert( +"" );   // 0
*/!*
```

Realmente hace lo mismo que `Number(...)`, pero es más corto.

La necesidad de convertir cadenas en números surge con mucha frecuencia. Por ejemplo, si estamos obteniendo valores de campos de formulario HTML, generalmente son cadenas. ¿Qué pasa si queremos sumarlos?

El operador binario suma los agregaría como cadenas:

```js run
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", el binario suma concatena las cadenas
```

Si queremos tratarlos como números, necesitamos convertirlos y luego sumarlos:

```js run
let apples = "2";
let oranges = "3";

*!*
// ambos valores convertidos a números antes del operador binario suma
alert( +apples + +oranges ); // 5
*/!*

// la variante más larga
// alert( Number(apples) + Number(oranges) ); // 5
```

Desde el punto de vista de un matemático, la abundancia de signos más puede parecer extraña. Pero desde el punto de vista de un programador, no hay nada especial: primero se aplican los signos más unarias, convierten las cadenas en números, y luego el signos más binario las resume.

¿Por qué se aplican los signos más unarios a los valores antes que los binarios? Como veremos, eso se debe a su *mayor precedencia*.

## Precedencia del operador

Si una expresión tiene más de un operador, el orden de ejecución se define por su *precedencia* o, en otras palabras, el orden de prioridad predeterminado de los operadores.

Desde la escuela, todos sabemos que la multiplicación en la expresión `1 + 2 * 2` debe calcularse antes de la suma. Eso es exactamente la precedencia. Se dice que la multiplicación tiene *una mayor precedencia* que la suma.

Los paréntesis anulan cualquier precedencia, por lo que si no estamos satisfechos con el orden predeterminado, podemos usarlos para cambiarlo. Por ejemplo, escriba `(1 + 2) * 2`.

Hay muchos operadores en JavaScript. Cada operador tiene un número de precedencia correspondiente. El que tiene el número más grande se ejecuta primero. Si la precedencia es la misma, el orden de ejecución es de izquierda a derecha.

Aquí hay un extracto de la [tabla de precedencia] (https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Operator_Precedence) (no necesita recordar esto, pero tenga en cuenta que los operadores unarios son más altos que el operador binario correspondiente):

| Precedencia| Nombre | Signo |
|------------|------|------|
| ... | ... | ... |
| 17 | suma unaria | `+` |
| 17 | negación unaria | `-` |
| 15 | multiplicación | `*` |
| 15 | division | `/` |
| 13 | suma | `+` |
| 13 | resta | `-` |
| ... | ... | ... |
| 3 | asignación | `=` |
| ... | ... | ... |

Como podemos ver, la "suma unaria" tiene una prioridad de `17`, que es mayor que el `13` de "suma" (suma binaria). Es por eso que, en la expresión '' + apples + + oranges '', las sumas unarias funcionan antes de la adición.

## Asignación

Tengamos en cuenta que una asignación `=` también es un operador. Está listado en la tabla de precedencia con la prioridad muy baja de `3`.

Es por eso que, cuando asignamos una variable, como `x = 2 * 2 + 1`, los cálculos se realizan primero y luego se evalúa el `=`, almacenando el resultado en `x`.

```js
let x = 2 * 2 + 1;

alert( x ); // 5
```

Es posible encadenar asignaciones:

```js run
let a, b, c;

*!*
a = b = c = 2 + 2;
*/!*

alert( a ); // 4
alert( b ); // 4
alert( c ); // 4
```

Las asignaciones encadenadas evalúan de derecha a izquierda. Primero, se evalúa la expresión más a la derecha `2 + 2` y luego se asigna a las variables de la izquierda:` c`, `b` y` a`. Al final, todas las variables comparten un solo valor.

````smart header="El operador asignación `\"=\"` devuelve un valor"
Un operador siempre devuelve un valor. Eso es obvio para la mayoría de ellos, como la suma `+` o la multiplicación `*`. Pero el operador de asignación también sigue esta regla.

La llamada `x = value` escribe el `value` en `x` *y luego lo devuelve*.

Aquí hay una demostración que usa una asignación como parte de una expresión más compleja:

```js run
let a = 1;
let b = 2;

*!*
let c = 3 - (a = b + 1);
*/!*

alert( a ); // 3
alert( c ); // 0
```

En el ejemplo anterior, el resultado de la expresión `(a = b + 1)` es el valor asignado a `a` (es decir,` 3`). Luego se usa para evaluaciones adicionales.

Código gracioso, ¿no? Deberíamos entender cómo funciona, porque a veces lo vemos en las bibliotecas de JavaScript, pero no deberíamos escribir algo así. Tales trucos definitivamente no hacen que el código sea más claro o legible.
````

## Resto %

El operador resto `%`, a pesar de su apariencia, no está relacionado con porcentajes.

El resultado de `a % b` es el resto de la división entera de `a` por `b`.

Por ejemplo:

```js run
alert( 5 % 2 ); // 1 es un resto de 5 dividido por 2
alert( 8 % 3 ); // 2 es un resto de 8 dividido por 3
alert( 6 % 3 ); // 0 es un resto de 6 dividido por 3
```

## Exponenciación **

El operador de exponenciación `**` es una inclusión reciente al lenguaje.

Para un número natural `b`, el resultado de `a ** b` es `a` multiplicado por sí mimos `b` veces.

Por ejemplo:

```js run
alert( 2 ** 2 ); // 4  (2 * 2)
alert( 2 ** 3 ); // 8  (2 * 2 * 2)
alert( 2 ** 4 ); // 16 (2 * 2 * 2 * 2)
```

El operador también funciona para números no enteros.

Por ejemplo:

```js run
alert( 4 ** (1/2) ); // 2 (potencia de 1/2 es lo mismo que raíz cuadrada, eso es matemáticas)
alert( 8 ** (1/3) ); // 2 (potencia de 1/3 es lo mismo que raíz cúbica)
```

## Incremento/decremento

<!-- No se puede usar -- en título, porque el conversor interno lo convierte a – -->

Aumentar o disminuir un número en uno es una de las operaciones numéricas más comunes.

Entonces, hay operadores especiales para ello:

- **Incremento** `++` incrementa una variable por 1:

    ```js run no-beautify
    let counter = 2;
    counter++;        // funciona igual que counter = counter + 1, pero es más corto
    alert( counter ); // 3
    ```
- **Decremento** `--` decrementa una variable por 1:

    ```js run no-beautify
    let counter = 2;
    counter--;        // funciona igual que counter = counter - 1, pero es más corto
    alert( counter ); // 1
    ```

```warn
Incremento/decremento sólo puede ser aplicado a variables. Intentar utilizarlo en un valor como `5++` dará un error.
```

Los operadores `++` y `--` pueden ser colocados antes o después de una variable.

- Cuando el operador va desoués de la variable, está en "forma de sufijo": `counter++`.
- La "forma de prefijo" es cuando el operador va después de la variable: `++counter`.

Ambas sentencias hacen la misma cosa: aumentar `counter` por `1`.

Existe alguna diferencia? Si, pero solamente la podemos ver si utilizamos el valor devuelto de `++/--`.

Aclaremos. Tal como conocemos, todos los operadores devuelven un valor. Incremento/decremento no es una excepción. La forma prefijo devuelve el nuevo valor mientras que la forma sufijo devuelve el valor anterior (antes del incremento/decremento).

Para ver la diferencia, aquí hay un ejemplo:

```js run
let counter = 1;
let a = ++counter; // (*)

alert(a); // *!*2*/!*
```

En la línea `(*)`, la forma *prefijo* `++counter` incrementa `counter` y devuelve el nuevo valor, `2`. Por lo tanto, el `alert` muestra `2`.

Ahora usemos la forma sufijo:

```js run
let counter = 1;
let a = counter++; // (*) cambiado ++counter a counter++

alert(a); // *!*1*/!*
```

En la línea `(*)`, la forma *sufijo* `counter++` también incrementa `counter` pero devuelve el *antiguo* valor (antes de incrementar). Por lo tanto, el `alert` muestra `1`.

Para resumir:

- Si no se usa el resultado del incremento/decremento, no hay diferencia en la forma de usar:

    ```js run
    let counter = 0;
    counter++;
    ++counter;
    alert( counter ); // 2, las líneas de arriba realizan lo mismo
    ```
- Si queremos aumentar un valor *y* usar inmediatamente el resultado del operador, necesitamos la forma de prefijo:

    ```js run
    let counter = 0;
    alert( ++counter ); // 1
    ```
- Si queremos incrementar un valor pero usamos su valor anterior, necesitamos la forma sufijo:

    ```js run
    let counter = 0;
    alert( counter++ ); // 0
    ```

````smart header="Incremento/decremento entre otros operadores"
Los operadores `++/--` también pueden ser usados dentro de expresiones. Su precedencia es más alta que la mayoría de los otros operadores aritméticos.

Por ejemplo:

```js run
let counter = 1;
alert( 2 * ++counter ); // 4
```

Compara con:

```js run
let counter = 1;
alert( 2 * counter++ ); // 2, porque counter++ devuelve el valor "antiguo"
```

Aunque técnicamente está bien, tal notación generalmente hace que el código sea menos legible. Una línea hace varias cosas, no es bueno.

Mientras lee el código, un rápido escaneo ocular "vertical" puede pasar por alto fácilmente algo como 'counter++' y no será obvio que la variable aumentó.

Aconsejamos un estilo de "una línea - una acción":

```js run
let counter = 1;
alert( 2 * counter );
counter++;
```
````

## Operadores a nivel de bit

Los operadores a nivel bit tratan los argumentos como números enteros de 32 bits y trabajan en el nivel de su representación binaria.

Estos operadores no son específicos de JavaScript. Son compatibles con la mayoría de los lenguajes de programación.

La lista de operadores:

- AND ( `&` )
- OR ( `|` )
- XOR ( `^` )
- NOT ( `~` )
- LEFT SHIFT ( `<<` )
- RIGHT SHIFT ( `>>` )
- ZERO-FILL RIGHT SHIFT ( `>>>` )

These operators are used very rarely. To understand them, we need to delve into low-level number representation and it would not be optimal to do that right now, especially since we won't need them any time soon. If you're curious, you can read the [Bitwise Operators](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators) article on MDN. It would be more practical to do that when a real need arises.

## Modificar en el lugar

A menudo necesitamos aplicar un operador a una variable y guardar el nuevo resultado en esa misma variable.

Por ejemplo:

```js
let n = 2;
n = n + 5;
n = n * 2;
```

Esta notación puede ser acortada utilizando los operadores `+=` y `*=`:

```js run
let n = 2;
n += 5; // now n = 7 (lo mismo que n = n + 5)
n *= 2; // now n = 14 (lo mismo que n = n * 2)

alert( n ); // 14
```

Los operadores cortos "modifica y asigna" existen para todos los operadores aritméticos y de nivel bit: `/=`, `-=`, etcétera.

Tales operadores tienen la misma precedencia que la asignación normal, por lo tanto se ejecutan después de otros cálculos:

```js run
let n = 2;

n *= 3 + 5;

alert( n ); // 16  (lado derecho evaluado primero, lo mismo que n *= 8)
```

## Coma

El operador coma `,` es uno de los operadores más raros e inusuales. Aveces, es utilizado para escribir código más corto, entonces tenemos que saberlo para poder entender qué está pasando.

El operador coma nos permite evaluar varias expresiones, dividiendolas con una coma `,`. Cada una de ellas es evaluada pero sólo el resultado de la última es devuelto.

Por ejemplo:

```js run
*!*
let a = (1 + 2, 3 + 4);
*/!*

alert( a ); // 7 (el resultado de 3 + 4)
```

Aquí, se evalúa la primera expresión `1 + 2` y se desecha su resultado. Luego, se evalúa `3 + 4` y se devuelve como resultado.

```smart header="Coma tiene muy baja precedencia"
Tenga en cuenta que el operador coma tiene una precedencia muy baja, inferior a `=`, por lo que los paréntesis son importantes en el ejemplo anterior.

Sin ellos: `a = 1 + 2, 3 + 4` se evalua el `+` primero, sumando los números a `a = 3, 7`, luego el operador de asignación `=` asigna `a = 3`, y el resto es ignorado. Es igual que `(a = 1 + 2), 3 + 4`.
```

¿Por qué necesitamos un operador que deseche todo excepto la última expresión?

A veces, las personas lo usan en construcciones más complejas para poner varias acciones en una línea.

Por ejemplo:

```js
// tres operaciones en una línea
for (*!*a = 1, b = 3, c = a * b*/!*; a < 10; a++) {
 ...
}
```

Tales trucos se usan en muchos frameworks de JavaScript. Por eso los estamos mencionando. Pero generalmente no mejoran la legibilidad del código, por lo que debemos pensar bien antes de usarlos.