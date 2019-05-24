# Bucles: while y for

Usualmente necesitamos repetir acciones.

Por ejemplo, imprimiendo bienes de una lista uno tras otro o simplemente ejecutando el mismo código para cada número del 1 al 10.

Los *Bucles* son una forma de repetir el mismo código varias veces.

## El bucle "while"

El bucle `while` (mientras) tiene el siguiente sintaxis:

```js
while (condition) {
  // código
  // llamado "cuerpo del bucle"
}
```

Mientras que `condition` (condición) sea `true`, el `código` del cuerpo del bucle sera ejecutado.

Por ejemplo, el bucle debajo imprime `i` mientras que `i < 3`:

```js run
let i = 0;
while (i < 3) { // muestra 0, entonces 1, entonces 2
  alert( i );
  i++;
}
```

Una sola ejecución del cuerpo del bucle es llamada *una iteracíon*. El bucle en ejemplo de arriba realiza 3 iteraciones.

Si `i++` no estuviera en el ejemplo de arriba, el bucle sera repetido (en teoría) eternamente. En la practica, el navegader proporciona maneras de detener dichos bucles, y en el JavaScript del lado del servidor, podemos eliminar el proceso.

Cualquier expresión o variable puede ser una condición del bucle, no solo comparaciones: la condición sera evaluada y transformada a un booleano por `while`.

Por ejemplo, una manera más corta de escribir `while (i != 0)` es `while (i)`:

```js run
let i = 3;
*!*
while (i) { // cuando i sea 0, la condición sera un valor falso, y el bucle se detendra
*/!*
  alert( i );
  i--;
}
```

````smart header="Las llaves no son requeridas por un cuerpo de una sola línea"
Si el cuerpo del bucle no tiene una sola declaración, podemos omitir las llaves `{…}`:

```js run
let i = 3;
*!*
while (i) alert(i--);
*/!*
```
````

## El bucle "do..while"

La comprobación de la condición puede ser movida *debajo* del cuerpo del bucle usando la sintaxis de `do..while`:

```js
do {
  // cuerpo del bucle
} while (condition);
```

El bucle primero ejecuta el cuerpo, luego comprueba la condición, y, mientras sea un valor verdadero, la ejecutara una y otra vez.

Por ejemplo:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Esta forma de sintaxis solo deberia ser usado cuando quieres que el cuerpo del bucle sea ejecutado **al menos una vez** sin 
This form of syntax should only be used when you want the body of the loop to execute **at least once** sin importar que la condición sea un valor verdadero. Usualmente, la otra forma es preferida: `while(…) {…}`.

## El bucle "for"

El bucle `for` es el bucle comunmente más usado.

Se ve así:

```js
for (begin; condition; step) {
  // ... cuerpo del bucle ...
}
```

Vamo a aprender el signifcado de cada parte por ejemplo. El bucle debajo corre `alert(i)` para `i` del `0` hasta (pero no incluyendo) `3`:

```js run
for (let i = 0; i < 3; i++) { // muestra 0, entonces 1, entonces 2
  alert(i);
}
```

Vamos a examinar la declaración `for` parte por parte:

| parte  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
| comenzar | `i = 0`    | Se ejecuta una vez comenzando el bucle.                         |
| condición | `i < 3`| Comprobada antes de cada iteración del bucle. Si es falsa, el bucle se detiene.             |
| paso | `i++`      | Se ejecuta despues del cuerpo en cada iteración pero antes de la comprobación de la condición. |
| cuerpo | `alert(i)`| Se ejecuta una y otra vez mientras que la condición sea un valor verdadero.                         |

El algoritmo general del bucle funciona de esta forma:
```
Se ejecuta comenzar
→ (si condición → ejecutar cuerpo y ejecutar paso)
→ (si condición → ejecutar cuerpo y ejecutar paso)
→ (si condición → ejecutar cuerpo y ejecutar paso)
→ ...
```

Si eres nuevo en bucles, te podria ayudar regresar al ejemplo y reproducir como se ejecuta paso por paso en una pedazo de papel.

Aquí esta exactamente que sucede en nuetro caso:

```js
// for (let i = 0; i < 3; i++) alert(i)

// se ejecuta comenzar
let i = 0
// si condición → ejecutar cuerpo y ejecutar paso
if (i < 3) { alert(i); i++ }
// si condición → ejecutar cuerpo y ejecutar paso
if (i < 3) { alert(i); i++ }
// si condición → ejecutar cuerpo y ejecutar paso
if (i < 3) { alert(i); i++ }
// ...finaliza, porque ahora i == 3
```

````smart header="Declaración de variable en línea"
Aquí, la variable "counter" `i` es declarado en el bucle. Esto es llamado una declaración de variable "en línea". Dichas variables son visibles solo dentro del bucle.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no hay dicha variable
```

En vez de definir una variable, podemos usar una que ya exista:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // usar variable existente
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, porque es declarado afuera del bucle
```

````


### Saltando partes

Cualquier parte de `for` puede ser saltada.

Por ejemplo, podemos omitir `comenzar` si no necesitamos realizar nada al comienzo del bucle.

Como aquí:

```js run
let i = 0; // Ya tenemos i declarado y asignado

for (; i < 3; i++) { // no hay necesidad de "comenzar"
  alert( i ); // 0, 1, 2
}
```

Tambine podemos eliminar la parte `paso`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Esto hace al bucle identico a `while (i < 3)`.

En realidad podemos eliminar todo, creando un bucle infinito:

```js
for (;;) {
  // se repite sin limtes
}
```

Por favor nota que los dos punto y comas `;` deben estar presente. De otra manera, habria un error de sintaxis.

## Rompiendo el bucle

Normalmente, se sale de un bucle cuando la condición es un valor falso.

Pero podemos forzar una salida en cualquier momento usando la directiva especial `break`.

Por ejemplo, el bucle debajo le pide al usuario por una serie de números, "rompiendo" cuando un número no es ingresado:

```js
let sum = 0;

while (true) {

  let value = +prompt("Ingresa un número", '');

*!*
  if (!value) break; // (*)
*/!*

  sum += value;

}
alert( 'Suma: ' + sum );
```

La directiva `break` es activada en la linea `(*)` si el usuario ingresa una línea vacía o cancela la entrada. Detiene inmediatamente el bucle, pasando el control a la primera linea despues de el bucle. `alert`.

La combinación "bucle infinito + `break` según sea necesario" es genial para situaciones cuando la condición del loop debe ser comprobada no en el inicio o al final de el bucle, sino a la mitad o incluso en varias partes del cuerpo. 

## Continuar a la siguiente iteración [#continue]

La directiva `continue` es una "versión más liger" de `breal`. No detiene todo el bucle. En lugar, detiene la iteración actual y forza el bucle a comenzar una nueva (si la condición lo permite).

Podemos usarlo si hemos terminado con la iteración actual y nos gustaria movernos a la siguiente.

El bucle debajo usa `continue` para mostrar solo valores impares:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // si es verdadero, saltar el resto del cuerpo
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, entonces 3, 5, 7, 9
}
```

Para los valores pares de `i`, la directiva `continue` para de ejecutar el cuerpo y pasa el control a la siguiente iteración de `for` (con el siguiente número). Así que el `alert` solo es llamado para valores impares.

````smart header="La directiva `continue` ayuda a disminuir la anidación"
Un bucle que muestra valores impares podria verse así:

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Desde un punto de vista técnico, esto es identico al ejemplo de arriba. Claro, podemos simplemente envolver el code en un bloque `if` en vez de usar `continue`.

Pero como efecto secundario, esto crearia un nivel mas de anidación (la llamada a `alert` dentro de las llaves). Si el código dentro de `if` es más que solo unas líneas, eso prodia reducir la legibilidad en general.
````

````warn header="No `break/continue` a la derecha de '?'"
Porfavor nota que las construcciones de sintaxis que no son expresiones no pueden user usadas con el operador terniario `?`. En particular, directivas como `break/continue` no son permitidas aquí.

Por ejemplo, si tomamos este código:

```js
if (i > 5) {
  alert(i);
} else {
  continue;
}
```

...y lo reescribimos usando un signo de interrogación:


```js no-beautify
(i > 5) ? alert(i) : *!*continue*/!*; // continue no es permitido aquí
```

...deja de funcionar. Código como este generaran un error de sintaxis: 


Esta es otra razón por la cual se recomienda no usar el operador de signo de interrogación `?` en vez de `if`.
````

## Etiquitas para break/continue

A veces necesitamos salirnos de multiples bucles anidados al mismo tiempo.

Por ejemplo, en el código debajo nosotros usamos un bucle sobre `i` y `j`, solicitando las coordenadas `(i,j)` de `(0,0)` a `(3,3)`:

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Valor en las coordenadas (${i},${j})`, '');

    // ¿Y si quier salir de aquí hacia Listo (debajo)?

  }
}

alert('Listo!');
```

Necesitamos una manera de detener el proceso si el usuario cancela la entrada.

El `break` ordinario despues de `input` solo nos sacaria de el bucle interno. Eso no es suficiente--etiquitas, vienen al rescate!

Una *etiqueta* es un indentificar con dos puntos antes de un bucle:
```js
labelName: for (...) {
  ...
}
```

La declaración `break <labelName>` en el bucle debajo nos saca hacia la etiqueta:

```js run no-beautify
*!*outer:*/!* for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // Si es una cadena de texto vacía o es cancelada, entonces salir de ambos bucles
    if (!input) *!*break outer*/!*; // (*)

    // hacer algo con el valor...
  }
}
alert('Listo!');
```

En el codigo de arriba, `break outer` mira hacia arriba por la etiquieta llamada `outer` y nos saca de dicho bucle.

Asi que el control va directamente de `(*)` a `alert('Listo!')`.

Tambien podemos mover la etiqueta a una línea separada:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

La directiva `continue` tambien puede usar usada con una etiquita. En este caso, la ejecución de el código salta a la siguiente iteración de el bucle etiquetado.

````warn header="Las etiquetas no son \"goto\""
Las etiquetas no nos permiten saltar a un lugar arbitrario en el código.

Por ejemplo, es imposible de hacer esto:
```js
break label;  // saltar a label? No.

label: for (...)
```

Una llamada a `break/continue` solo es posible desde el interior del bucle y la etiqueta debe estar en alguna parte arriba de la directiva.
````

## Resumen

Cubrimos 3 tipos de bucles:

- `while` -- La condición es comprobada antes de cada iteración.
- `do..while` --  La condición es comprobada despues de cada iteración.
- `for (;;)` --  La condición es comprobada antes de cada iteración, con ajustes adicionales disponibles.

Para crear un bucle "infinito", usualmente se usa `while(true)`. Un bucle como este, tal y como cualquier otro, puede ser detenido con la directiva `break`.

Si no queremos hacer nada cona la iteración actual y queremos adelantarnos a la siguiente, podemos usar la directiva `continue`.

`break/continue` soportan etiquitas antes del bucle. Una etiqueta es la unica forma de usar `break/continue` para escapar de un bucle anidado para ir a uno exterior.