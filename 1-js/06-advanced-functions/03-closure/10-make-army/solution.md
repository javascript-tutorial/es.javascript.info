
<<<<<<< HEAD
Examinemos lo que se hace dentro de `makeArmy`, y la solución será obvia.
=======
Let's examine what exactly happens inside `makeArmy`, and the solution will become obvious.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

1. Crea un array vacío. `shooters`:

    ```js
    let shooters = [];
    ```

2. Lo llena en el bucle a través de `shooters.push(function...)`.

  Cada elemento es una función, por lo que el array resultante se ve así:

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
    
3. El array se devuelve desde la función.

<<<<<<< HEAD
Luego, más tarde, la llamada a `army[5] ()` obtendrá el elemento `army[5]` de el array (será una función) y lo llamará.

Ahora, ¿por qué todas esas funciones muestran lo mismo?
=======
3. The array is returned from the function.

Then, later, the call to any member, e.g. `army[5]()` will get the element `army[5]` from the array (that's a function) and call it.

Now why do all such functions show the same value, `10`?
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

Esto se debe a que no hay una variable local `i` dentro de las funciones `shooter`. Cuando se llama a tal función, toma `i` de su entorno léxico externo.

¿Cuál será el valor de 'i'?

Si miramos la fuente:

```js
function makeArmy() {
  ...
  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter function
      alert( i ); // debería mostrar su número
    };
    ...
  }
  ...
}
```

<<<<<<< HEAD
... Podemos ver que vive en el entorno léxico asociado con la ejecución actual de `makeArmy()`. Pero cuando se llama a `army[5]()`, `makeArmy` ya ha terminado su trabajo, y `i` tiene el último valor: `10` (el final de `while`).

Como resultado, todas las funciones `shooter` obtienen del mismo entorno léxico externo, el último valor `i = 10`.

Podemos arreglarlo moviendo la definición de variable al bucle:
=======
We can see that all `shooter` functions are created in the lexical environment, associated with the one `makeArmy()` run. But when `army[5]()` is called, `makeArmy` has already finished its job, and the final value of `i` is `10`(`while` finishes at `10`).

As the result, all `shooter` functions get the same value from the outer lexical environment and that is, the last value, `i=10`.

![](lexenv-makearmy-empty.svg)
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

As you can see above, on each iteration of a `while {...} ` block, a new lexical environment is created. 

So, to fix a problem we can copy the value of `i` into a variable within the `while {...}` block, like this:

```js run
function makeArmy() {
  let shooters = [];

<<<<<<< HEAD
*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // shooter function
      alert( i ); // debería mostrar su número
    };
=======
  let i = 0;
  while (i < 10) {
    *!*
      let j = i;
    */!*
      let shooter = function() { // shooter function
        alert( *!*j*/!* ); // should show its number
      };
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

// Now the code works correctly
army[0](); // 0
army[5](); // 5
```

<<<<<<< HEAD
Ahora funciona correctamente, porque cada vez que se ejecuta el bloque de código en `for (let i = 0 ...) {...}`, se crea un nuevo entorno léxico para él, con la variable correspondiente `i`.

Entonces, el valor de `i` ahora vive un poco más cerca. No en el entorno léxico `makeArmy()`, sino en el entorno léxico que corresponde a la iteración del bucle actual. Por eso ahora funciona.
=======
Here `let j = i` declares an "iteration-local" variable `j` and copies `i` into it. Primitives are copied "by value", so we actually get an independent copy of `i`, belonging to the current loop iteration.

The shooters work correctly, because, the value of `i` now lives a little bit closer. Not in `makeArmy()` Lexical Environment, but in the Lexical Environment that corresponds the current loop iteration:
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

![](lexenv-makearmy-while-fixed.svg)

<<<<<<< HEAD
Aquí reescribimos `while` en `for`.

Podría usarse otro truco, veámoslo para comprender mejor el tema:

```js run
=======
Such problem could also be avoided if we used `for` in the beginning, like this:

```js run demo
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
function makeArmy() {

  let shooters = [];

*!*
  for(let i = 0; i < 10; i++) {
*/!*
    let shooter = function() { // shooter function
<<<<<<< HEAD
      alert( *!*j*/!* ); // debería verse el núemero
=======
      alert( i ); // should show its number
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3
    };
    shooters.push(shooter);
  }

  return shooters;
}

let army = makeArmy();

army[0](); // 0
army[5](); // 5
```

<<<<<<< HEAD
El bucle `while`, al igual que `for`, crea un nuevo entorno léxico para cada ejecución. Así que aquí nos aseguramos de que obtenga el valor correcto para un `shooter`.

Copiamos `let j = i`. Esto hace que el cuerpo del bucle sea `j` local y copia el valor de `i` en él. Los primitivos se copian "por valor", por lo que en realidad obtenemos una copia independiente completa de `i`, que pertenece a la iteración del bucle actual.
=======
That's essentially, the same, as `for` on each iteration generates the new lexical environment, with its own variable `i`. So `shooter` generated in every iteration references its own `i`, from that very iteration.

![](lexenv-makearmy-for-fixed.svg)

Now, as you've put so much effort into reading this, and the final recipe is so simple - just use `for`, you may wonder: was it worth that?

Well, if you could easily answer the question of that task, you wouldn't read the solution, so hopefully this task must have helped you to understand things a bit better. 

Besides, there are indeed cases when one prefers `while` to `for`, and other scenarios where such problems are real.
>>>>>>> e074a5f825a3d10b0c1e5e82561162f75516d7e3

