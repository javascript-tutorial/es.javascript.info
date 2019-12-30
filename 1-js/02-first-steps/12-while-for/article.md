# Bucles: while y for

Usualmente necesitamos repetir acciones.

Por ejemplo, mostrar los elementos de una lista uno tras otro o simplemente ejecutar el mismo código para cada número del 1 al 10.

Los *Bucles* son una forma de repetir el mismo código varias veces.

## El bucle "while"

El bucle `while` (mientras) tiene la siguiente sintaxis:

```js
while (condition) {
  // código
  // llamado "cuerpo del bucle"
}
```

<<<<<<< HEAD
Mientras que la `condition` (condición) sea `true`, el `código` del cuerpo del bucle será ejecutado.
=======
While the `condition` is truthy, the `code` from the loop body is executed.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Por ejemplo, el bucle debajo imprime `i` mientras que `i < 3`:

```js run
let i = 0;
while (i < 3) { // muestra 0, luego 1, luego 2
  alert( i );
  i++;
}
```

Una sola ejecución del cuerpo del bucle es llamada *una iteración*. El bucle en el ejemplo de arriba realiza 3 iteraciones.

Si `i++` no estuviera en el ejemplo de arriba, el bucle sería repetido (en teoría) eternamente. En la practica, el navegador proporciona maneras de detener dichos bucles, y en el JavaScript del lado del servidor, podemos eliminar el proceso.

Cualquier expresión o variable puede ser una condición del bucle, no solo comparaciones: la condición será evaluada y transformada a un booleano por `while`.

Por ejemplo, una manera más corta de escribir `while (i != 0)` es `while (i)`:

```js run
let i = 3;
*!*
while (i) { // cuando i sea 0, la condición será un valor falso, y el bucle se detendrá
*/!*
  alert( i );
  i--;
}
```

<<<<<<< HEAD
````smart header="Las llaves no son requeridas para un cuerpo de una sola línea"
Si el cuerpo del bucle tiene una sola sentencia, podemos omitir las llaves `{…}`:
=======
````smart header="Curly braces are not required for a single-line body"
If the loop body has a single statement, we can omit the curly braces `{…}`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

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

El bucle primero ejecuta el cuerpo, luego comprueba la condición, y, mientras sea un valor verdadero, la ejecuta una y otra vez.

Por ejemplo:

```js run
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

Esta sintaxis solo debería ser usada cuando quieres que el cuerpo del bucle sea ejecutado **al menos una vez** sin importar que la condición sea verdadera. Usualmente, se prefiere la otra forma: `while(…) {…}`.

## El bucle "for"

<<<<<<< HEAD
El bucle `for` es el bucle más comúnmente usado.
=======
The `for` loop is more complex, but it's also the most commonly used loop.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Se ve así:

```js
for (begin; condition; step) {
  // ... cuerpo del bucle ...
}
```

Aprendamos el significado de cada parte con un ejemplo. El bucle debajo corre `alert(i)` para `i` desde `0` hasta (pero no incluyendo) `3`:

```js run
for (let i = 0; i < 3; i++) { // muestra 0, luego 1, luego 2
  alert(i);
}
```

Vamos a examinar la declaración `for` parte por parte:

| parte  |          |                                                                            |
|-------|----------|----------------------------------------------------------------------------|
<<<<<<< HEAD
| comienzo | `i = 0`    | Se ejecuta una vez al comienzo del bucle.                         |
| condición | `i < 3`| Comprobada antes de cada iteración del bucle. Si es falsa, el bucle se detiene.             |
| paso | `i++`      | Se ejecuta después del cuerpo en cada iteración pero antes de la comprobación de la condición. |
| cuerpo | `alert(i)`| Se ejecuta una y otra vez mientras que la condición sea verdadera.                         |

El algoritmo general del bucle funciona de esta forma:
=======
| begin | `i = 0`    | Executes once upon entering the loop.                                      |
| condition | `i < 3`| Checked before every loop iteration. If false, the loop stops.              |
| body | `alert(i)`| Runs again and again while the condition is truthy.                         |
| step| `i++`      | Executes after the body on each iteration. |

The general loop algorithm works like this:

>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
```
Se ejecuta comenzar
→ (si condición → ejecutar cuerpo y ejecutar paso)
→ (si condición → ejecutar cuerpo y ejecutar paso)
→ (si condición → ejecutar cuerpo y ejecutar paso)
→ ...
```

<<<<<<< HEAD
Si eres nuevo en bucles, te podría ayudar regresar al ejemplo y reproducir cómo se ejecuta paso por paso en una pedazo de papel.
=======
That is, `begin` executes once, and then it iterates: after each `condition` test, `body` and `step` are executed.

If you are new to loops, it could help to go back to the example and reproduce how it runs step-by-step on a piece of paper.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Esto es lo que sucede exactamente en nuestro caso:

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
Aquí, la variable "counter" `i` es declarada en el bucle. Esto es llamado una declaración de variable "en línea". Dichas variables son visibles solo dentro del bucle.

```js run
for (*!*let*/!* i = 0; i < 3; i++) {
  alert(i); // 0, 1, 2
}
alert(i); // error, no existe dicha variable
```

En vez de definir una variable, podemos usar una que ya exista:

```js run
let i = 0;

for (i = 0; i < 3; i++) { // usa una variable existente
  alert(i); // 0, 1, 2
}

alert(i); // 3, visible, porque fue declarada fuera del bucle
```

````


### Saltando partes

Cualquier parte de `for` puede ser saltada.

Por ejemplo, podemos omitir `comenzar` si no necesitamos realizar nada al comienzo del bucle.

Como aquí:

```js run
let i = 0; // Ya tenemos i declarada y asignada

for (; i < 3; i++) { // no hay necesidad de "comenzar"
  alert( i ); // 0, 1, 2
}
```

También podemos eliminar la parte `paso`:

```js run
let i = 0;

for (; i < 3;) {
  alert( i++ );
}
```

Esto hace al bucle idéntico a `while (i < 3)`.

En realidad podemos eliminar todo, creando un bucle infinito:

```js
for (;;) {
  // se repite sin limites
}
```

Por favor, nota que los dos punto y coma `;` del `for` deben estar presentes. De otra manera, habría un error de sintaxis.

## Rompiendo el bucle

Normalmente, se sale de un bucle cuando la condición es falsa.

Pero podemos forzar una salida en cualquier momento usando la directiva especial `break`.

Por ejemplo, el bucle debajo le pide al usuario por una serie de números, "rompiendo" cuando un número no es ingresado:

```js run
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

La directiva `break` es activada en la línea `(*)` si el usuario ingresa una línea vacía o cancela la entrada. Detiene inmediatamente el bucle, pasando el control a la primera línea después de el bucle. En este caso, `alert`.

La combinación "bucle infinito + `break` según sea necesario" es ideal en situaciones donde la condición del bucle debe ser comprobada no al inicio o al final de el bucle, sino a la mitad o incluso en varias partes del cuerpo. 

## Continuar a la siguiente iteración [#continue]

La directiva `continue` es una "versión más ligera" de `break`. No detiene todo el bucle. En su lugar, detiene la iteración actual y fuerza al bucle a comenzar una nueva (si la condición lo permite).

Podemos usarlo si hemos terminado con la iteración actual y nos gustaría movernos a la siguiente.

El bucle debajo usa `continue` para mostrar solo valores impares:

```js run no-beautify
for (let i = 0; i < 10; i++) {

  // si es verdadero, saltar el resto del cuerpo
  *!*if (i % 2 == 0) continue;*/!*

  alert(i); // 1, luego 3, 5, 7, 9
}
```

Para los valores pares de `i`, la directiva `continue` deja de ejecutar el cuerpo y pasa el control a la siguiente iteración de `for` (con el siguiente número). Así que el `alert` solo es llamado para valores impares.

````smart header="La directiva `continue` ayuda a disminuir la anidación"
Un bucle que muestra valores impares podría verse así:

```js
for (let i = 0; i < 10; i++) {

  if (i % 2) {
    alert( i );
  }

}
```

Desde un punto de vista técnico, esto es idéntico al ejemplo de arriba. Claro, podemos simplemente envolver el código en un bloque `if` en vez de usar `continue`.

Pero como efecto secundario, esto crearía un nivel más de anidación (la llamada a `alert` dentro de las llaves). Si el código dentro de `if` posee varias líneas, eso podría reducir la legibilidad en general.
````

````warn header="No `break/continue` a la derecha de '?'"
Por favor, nota que las construcciones de sintaxis que no son expresiones no pueden user usadas con el operador terniario `?`. En particular, directivas como `break/continue` no son permitidas aquí.

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
(i > 5) ? alert(i) : *!*continue*/!*; // continue no está permitida aquí
```

<<<<<<< HEAD
...deja de funcionar. Código como este generarán un error de sintaxis: 

=======
...it stops working: there's a syntax error.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Esta es otra razón por la cual se recomienda no usar el operador de signo de interrogación `?` en lugar de `if`.
````

## Etiquetas para break/continue

A veces necesitamos salirnos de múltiples bucles anidados al mismo tiempo.

<<<<<<< HEAD
Por ejemplo, en el código debajo nosotros usamos un bucle sobre `i` y `j`, solicitando las coordenadas `(i,j)` de `(0,0)` a `(3,3)`:
=======
For example, in the code below we loop over `i` and `j`, prompting for the coordinates `(i, j)` from `(0,0)` to `(2,2)`:
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

```js run no-beautify
for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Valor en las coordenadas (${i},${j})`, '');

<<<<<<< HEAD
    // ¿Y si quiero salir de aquí hacia Listo (debajo)?

=======
    // what if we want to exit from here to Done (below)?
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117
  }
}

alert('Listo!');
```

Necesitamos una manera de detener el proceso si el usuario cancela la entrada.

El `break` ordinario después de `input` solo nos sacaría del bucle interno. Eso no es suficiente--etiquetas, vengan al rescate!

Una *etiqueta* es un identificar con dos puntos antes de un bucle:
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

    // Si es una cadena de texto vacía o se canceló, entonces salir de ambos bucles
    if (!input) *!*break outer*/!*; // (*)

    // hacer algo con el valor...
  }
}
alert('Listo!');
```

En el código de arriba, `break outer` mira hacia arriba por la etiquieta llamada `outer` y nos saca de dicho bucle.

Así que el control va directamente de `(*)` a `alert('Listo!')`.

También podemos mover la etiqueta a una línea separada:

```js no-beautify
outer:
for (let i = 0; i < 3; i++) { ... }
```

La directiva `continue` también puede usar usada con una etiqueta. En este caso, la ejecución del código salta a la siguiente iteración del bucle etiquetado.

<<<<<<< HEAD
````warn header="Las etiquetas no son \"goto\""
Las etiquetas no nos permiten saltar a un lugar arbitrario en el código.
=======
````warn header="Labels do not allow to \"jump\" anywhere"
Labels do not allow us to jump into an arbitrary place in the code.
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

Por ejemplo, es imposible hacer esto:
```js
<<<<<<< HEAD
break label;  // saltar a label? No.
=======
break label; // doesn't jumps to the label below
>>>>>>> 28ed5a3f7df9e015cf81c126423c76c9408d7117

label: for (...)
```

Una llamada a `break/continue` solo es posible desde el interior del bucle y la etiqueta debe estar en alguna parte arriba de la directiva.
````

## Resumen

Cubrimos 3 tipos de bucles:

- `while` -- La condición es comprobada antes de cada iteración.
- `do..while` --  La condición es comprobada después de cada iteración.
- `for (;;)` --  La condición es comprobada antes de cada iteración, con ajustes adicionales disponibles.

Para crear un bucle "infinito", usualmente se usa `while(true)`. Un bucle como este, tal y como cualquier otro, puede ser detenido con la directiva `break`.

Si no queremos hacer nada con la iteración actual y queremos adelantarnos a la siguiente, podemos usar la directiva `continue`.

`break/continue` soportan etiquetas antes del bucle. Una etiqueta es la única forma de usar `break/continue` para escapar de un bucle anidado para ir a uno exterior.
