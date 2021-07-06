# Ejecución condicional: if, '?'

Algunas veces, necesitamos ejecutar diferentes acciones basadas en diferentes condiciones.

Para esto podemos usar la sentencia `if` y el operador condicional `?`, también llamado operador de “signo de interrogación”.

## La sentencia "if"

La sentencia `if(...)` evalúa la condición en los paréntesis, y si el resultado es `true` ejecuta un bloque de código.

Por ejemplo:

```js run
let year = prompt('¿En que año fué publicada la especificación ECMAScript-2015?', '');

*!*
if (year == 2015) alert( '¡Estás en lo cierto!' );
*/!*
```

Aquí la condición es una simple igualdad (`year == 2015`), pero podría ser mucho mas complejo.

Si quisiéramos ejecutar más de una sentencia, debemos encerrar nuestro bloque de código entre llaves:

```js
if (year == 2015) {
  alert( "¡Es Correcto!" );
  alert( "¡Eres muy inteligente!" );
}
```

Recomendamos siempre encerrar nuestro bloque de código entre llaves `{}` siempre que se utilice la sentencia `if`, inclusive si solo se va a ejecutar una sola sentencia en este caso. Hacer eso mejora la legibilidad.

## Conversión Booleana

La sentencia `if (…)` evalúa la expresión dentro de sus paréntesis y convierte el resultado en booleano.

Recordemos las reglas de conversión del capítulo <info:type-conversions>:

- El número `0`, un string vacío `""`, `null`, `undefined`, y `NaN` se convierte en `false`. Por esto son llamados valores "falso".
- El resto de los valores se convierten en  `true`, entonces los llamaremos valores "verdadero".

Entonces, el código bajo esta condición nunca se ejecutaría:

```js
if (0) { // 0 es falso
  ...
}
```

...y dentro de esta condición siempre se ejecutará:

```js
if (1) { // 1 es verdadero
  ...
}
```

También podemos pasar un valor booleano pre-evaluado al `if`, así:

```js
let cond = (year == 2015); // la igualdad evalúa y devuelve un true o false

if (cond) {
  ...
}
```

## La cláusula "else"

La sentencia `if` quizás contenga un bloque "else" opcional. Este se ejecutará cuando la condición sea falsa.

Por ejemplo:
```js run
let year = prompt('¿En qué año fue publicada la especificación ECMAScript-2015?', '');

if (year == 2015) {
  alert( '¡Lo adivinaste, correcto!' );
} else {
  alert( '¿Cómo puedes estar tan equivocado?' ); // cualquier valor excepto 2015
}
```

## Muchas condiciones: "else if"

Algunas veces, queremos probar variantes de una condición. La clausula `else if` nos permite hacer esto.

Por ejemplo:

```js run
let year = prompt('¿En qué año fue publicada la especificación ECMAScript-2015?', '');

if (year < 2015) {
  alert( 'Muy poco...' );
} else if (year > 2015) {
  alert( 'Muy Tarde' );
} else {
  alert( '¡Exactamente!' );
}
```

En el código de arriba, JavaScript primero revisa si `year < 2015`. Si esto es falso, continúa a la siguiente condición `year > 2015`. Si esta también es falsa, mostrará la última `alert`.

Podría haber más bloques `else if`.  Y el último  `else` es opcional.

## Operador ternario '?'

A veces necesitamos asignar una variable dependiendo de alguna condición.

Por ejemplo:

```js run no-beautify
let accessAllowed;
let age = prompt('¿Qué edad tienes?', '');

*!*
if (age > 18) {
  accessAllowed = true;
} else {
  accessAllowed = false;
}
*/!*

alert(accessAllowed);
```

Entonces el operador "ternario" también llamado  "signo de interrogación" nos permite ejecutar esto en una forma más corta y simple.

El operador está representado por un signo de interrogación de cierre `?`.  A veces es llamado "ternario" porque el operador tiene tres operandos. Es el único operador de JavaScript que tiene esta cantidad de ellos.

La Sintaxis es:
```js
let result = condition ? value1 : value2;
```

Se evalúa `condition`: si es verdadera entonces devuelve `value1` , de lo contrario `value2`.

Por ejemplo:

```js
let accessAllowed = (age > 18) ? true : false;
```

Técnicamente, podemos omitir el paréntesis alrededor de  `age > 18`. El operador de signo de interrogación tiene una precedencia baja, por lo que se ejecuta después de la comparación `>`. 

En este ejemplo realizaremos lo mismo que en el anterior:

```js
// el operador de comparación  "age > 18" se ejecuta primero de cualquier forma
// (no necesitamos agregar los paréntesis)
let accessAllowed = age > 18 ? true : false;
```

Pero los paréntesis hacen el código mas legible, asi que recomendamos utilizarlos.

````smart
En el ejemplo de arriba, podrías evitar utilizar el operador de signo de interrogación porque esta comparación devuelve directamente `true/false`:

```js
// es lo mismo que
let accessAllowed = age > 18;
```
````

## Múltiples '?'

Una secuencia de operadores de signos de interrogación  `?` puede devolver un valor que depende de más de una condición.

Por ejemplo:
```js run
let age = prompt('¿edad?', 18);

let message = (age < 3) ? '¡Hola, bebé!' :
  (age < 18) ? '¡Hola!' :
  (age < 100) ? '¡Felicidades!' :
  '¡Qué edad tan inusual!';

alert( message );
```

Puede ser difícil al principio comprender lo que está sucediendo. Pero después de una mirada más cercana, podemos ver que es solo una secuencia ordinaria de condiciones:

1. El primer signo de pregunta revisa si `age < 3`.
2. Si es cierto -- devuelve `'¡Hola, bebé!'`. De lo contrario, continua a la expresión que está después de los dos puntos '":"', revisando `age < 18`.
3. Si es cierto -- devuelve `'¡Hola!'`. De lo contrario, continúa con la expresión que está después de los dos puntos siguientes '":"', revisando `age < 100`.
4. Si es cierto -- devuelve `'¡Felicidades!'`. De lo contrario, continúa a la expresión que está después de los dos puntos '":"', devolviendo `'¡Qué edad tan inusual!'`.

Aquí lo podemos ver utilizando `if..else`:

```js
if (age < 3) {
  message = '¡Hola, bebé!';
} else if (age < 18) {
  message = '¡Hola!';
} else if (age < 100) {
  message = '¡Felicidades!';
} else {
  message = '¡Qué edad tan inusual!';
}
```

## Uso no tradicional de '?'

A veces el signo de interrogación cerrado `?` se utiliza para reemplazar `if`:

```js run no-beautify
let company = prompt('¿Qué compañía creó JavaScript?', '');

*!*
(company == 'Netscape') ?
   alert('¡Correcto!') : alert('Equivocado.');
*/!*
```

Dependiendo de la condición `company == 'Netscape'`, se ejecutará la primera o la segunda expresión del operador `?` y se mostrará una alerta.

Aquí no asignamos el resultado de una variable. En vez de esto, ejecutamos diferentes códigos dependiendo de la condición.

**No se recomienda el uso del operador de signo de interrogación de esta forma.**

La notación es más corta que la sentencia equivalente con `if`, lo cual seduce a algunos programadores. Pero es menos legible.

Aquí está el mismo código utilizando la sentencia `if` para comparar:

```js run no-beautify
let company = prompt('¿Cuál compañía creó JavaScript?', '');

*!*
if (company == 'Netscape') {
  alert('¡Correcto!');
} else {
  alert('Equivocado.');
}
*/!*
```

Nuestros ojos leen el código verticalmente. Los bloques de código que se expanden múltiples lineas son mas fáciles de entender que los las instrucciones largas horizontales.

El propósito del operador de signo de interrogación `?` es para devolver un valor u otro dependiendo de su condición. Por favor utilízala para exactamente esto. Utiliza la sentencia `if` cuando necesites ejecutar código en ramas distintas.
