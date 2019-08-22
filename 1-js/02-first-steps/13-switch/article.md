# La sentencia "switch"

Una sentencia `switch` puede reemplazar múltiples condiciones `if`.

Provee una mejor manera de comparar un valor con sus múltiples variantes.


## La sintaxis

`switch` tiene uno o mas bloques `case`y un opcional `default`.

Se ve de esta forma:

```js no-beautify
switch(x) {
  case 'valor1':  // if (x === 'valor1')
    ...
    [break]

  case 'valor2':  // if (x === 'valor2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- El valor de `x` es comparado contra el valor del primer `case` (en este caso, `valor1`), luego contra el segundo (`valor2`) y así sucesivamente, todo esto bajo una igualdad estricta.
- Si la igualdad es encontrada, `switch` empieza a ejecutar el código iniciando por el primer `case` correspondiente, hasta el `break` más cercano (o hasta el final del `switch`).
- Si no se cumple ningún caso entonces el código `default` es ejecutado (si existe).

## Ejemplo

Un ejemplo de `switch` (se resalta el código ejecutado):

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Muy pequeño' );
    break;
*!*
  case 4:
    alert( '¡Exacto!' );
    break;
*/!*
  case 5:
    alert( 'Muy grande' );
    break;
  default:
    alert( "Desconozco estos valores" );
}
```

Aquí el `switch` inicia comparando `a` con la primera variante `case` que es `3`. La comparación falla.

Luego `4`. La comparación es exitosa, por tanto la ejecución empieza desde `case 4` hasta el `break` más cercano.

**Si no existe `break` entonces la ejecución continúa con el próximo `case` sin ninguna revisión.**

Un ejemplo sin `break`:

```js run
let a = 2 + 2;

switch (a) {
  case 3:
    alert( 'Muy pequeño' );
*!*
  case 4:
    alert( '¡Exacto!' );
  case 5:
    alert( 'Muy grande' );
  default:
    alert( "Desconozco estos valores" );
*/!*
}
```

En el ejemplo anterior veremos ejecuciones de tres `alert` secuenciales:

```js
alert( '¡Exacto!' );
alert( 'Muy grande' );
alert( "Desconozco estos valores" );
```

````encabezado inteligente="Cualquier expresión puede ser un argumento `switch/case`"
Ambos `switch` y `case` permiten expresiones arbitrarias.

Por ejemplo:

```js run
let a = "1";
let b = 0;

switch (+a) {
*!*
  case b + 1:
    alert("esto se ejecuta, porque +a es 1, exactamente igual b+1");
    break;
*/!*

  default:
    alert("esto no se ejecuta");
}
```
Aquí `+a` da `1`, esto es comparado con `b + 1` en `case`, y el código correspondiente es ejecutado.
````

## Agrupamiento de "case"

Varias variantes de `case` los cuales comparten el mismo código pueden ser agrupadas.

Por ejemplo, si queremos que se ejecute el mismo código para `case 3` y `case 5`:

```js run no-beautify
let a = 2 + 2;

switch (a) {
  case 4:
    alert('¡Correcto!');
    break;

*!*
  case 3:                    // (*) agrupando dos cases
  case 5:
    alert('¡Incorrecto!');
    alert("¿Por qué no tomas una clase de matemáticas?");
    break;
*/!*

  default:
    alert('El resultado es extraño. Realmente.');
}
```

Ahora ambos `3` y `5` muestran el mismo mensaje.

La habilidad para "agrupar" cases es un efecto secundario de como trabaja `switch/case` sin `break`. Aquí la ejecución de `case 3` inicia desde la línea `(*)` y continúa a través de `case 5`, porque no existe `break`.

## El tipo importa

Vamos a enfatizar que la comparación de igualdad es siempre estricta. Los valores deben ser del mismo tipo para coincidir.

Por ejemplo, consideremos el código:

```js run
let arg = prompt("Ingrese un valor");
switch (arg) {
  case '0':
  case '1':
    alert( 'Uno o cero' );
    break;

  case '2':
    alert( 'Dos' );
    break;

  case 3:
    alert( '¡Nunca ejecuta!' );
    break;
  default:
    alert( 'Un valor desconocido' );
}
```

1. Para `0`, `1`, se ejecuta el primer `alert`.
2. Para `2` se ejecuta el segundo `alert`.
3. Pero para `3`, el resultado del `prompt` es un string `"3"`, el cual no es estrictamente igual `===` al número `3`. Por tanto ¡Tenemos un código muerto en `case 3`! La variante `default` se ejecutará.
