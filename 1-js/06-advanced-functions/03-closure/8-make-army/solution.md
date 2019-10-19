
Examinemos lo que se hace dentro de `makeArmy`, y la solución será obvia.

1. Crea un array vacío `shooters`:

    ```js
    let shooters = [];
    ```
2. Lo rellena en el bucle mediante `shooters.push(function...)`.

    Cada elemento es una función, por lo que resultará un array como este:

    ```js no-beautify
    shooters = [
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); },
      function () { alert(i); }
    ];
    ```

3. El array es devuelto desde la función.

Entonces, después, la llamada a `army[5]()` cogerá el elemento `army[5]` desde el array (será una función) y lo llama.

Ahora, ¿Por qué todas las funciones muestran lo mismo?

Esto es porque no hay una variable local `i` dentro de las funciones `shooter`. Cuando esta función es llamada, coge `i` desde su lexical environment externo.

¿Qué valor tendrá `i`?

Si miramos el código fuente:

```js
function makeArmy() {
  ...
  let i = 0;
  while (i < 10) {
    let shooter = function() { // función shooter
      alert( i ); // enseñaría su número
    };
    ...
  }
  ...
}
```

...Podemos ver que vive en el lexical evironment asociado con el actual `makeArmy()` en ejecución. Pero cuando `army[5]()` es llamadado, `makeArmy` ha terminado su tarea e `i` tiene el último valor: `10` (al final del `while`).

Como resultado, todas las funciones `shooter` obtienen desde el lexical environment externo lo mismo, el último valor `i=10`.

Podemos arreglarlo moviendo la definición de la variable dentro del bucle:

```js run demo
function makeArmy() {

  let shooters = [];

*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // función shooter
      alert( i ); // mostraría su número
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

Ahora funciona correctamente porque cada vez que el bloque de código en `for (let i=0...) {...}` es ejecutado, un nuevo Lexical Environment es creado para el, con la variable `i` correspondiente.

Así que, el valor de `i` ahora vive un poco más cerca. No en el Lexical Environment `makeArmy()`, pero en el Lexical Environment que corresponde en la iteración del bucle. Por eso ahora funciona.

![](lexenv-makearmy.svg)

Aquí hemos reescrito `while` dentro de `for`.

Es posible otro truco, veamoslo para entender mejor el asunto:

```js run
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
*!*
    let j = i;
*/!*
    let shooter = function() { // función shooter
      alert( *!*j*/!* ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

El bucle `while`, igual que `for`, crea un nuevo Lexical Environment por cada ejecución. Así que aquí nos aseguramos que obtiene el valor correcto para `shooter`.

Copiamos `let j = i`. Esto crea un cuerpo del bucle local `j` y copia el valor de `i` en el. Los primitivos son copiados "por valor", entonces actualmente obtenemos una copia independiente de `i`, que pertenece a la iteración actual del bucle.
