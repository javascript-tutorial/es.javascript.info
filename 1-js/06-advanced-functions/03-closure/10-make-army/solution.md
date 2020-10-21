
Examinemos lo que sucede dentro de `makeArmy`, y la solución será obvia.

1. Esta crea un array vacío de tiradores, `shooters`:

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

    Más tarde la llamada a cualquier miembro, por ejemplo `army[5]()`, obtendrá el elemento `army[5]` del array (será una función) y lo llamará.

    Ahora, ¿por qué todas esas funciones muestran el mismo valor, `10`?

    Esto se debe a que no hay una variable local `i` dentro de las funciones `shooter`. Cuando se llama a tal función, toma `i` de su entorno léxico externo.

    Entonces ¿cuál será el valor de `i`?

    Si miramos la fuente:

    ```js
    function makeArmy() {
      ...
      let i = 0;
      while (i < 10) {
        let shooter = function() { // shooter function
          alert( i ); // debería mostrar su número
        };
        shooters.push(shooter); // agrega la función al array
        i++;
      }
      ...
    }
    ```

    Podemos ver que todas las funciones `shooter` están creadas en el ambiente léxico asociado a la ejecución de `makeArmy()`.  Pero cuando se llama a `army[5]()`, `makeArmy` ya ha terminado su trabajo, y el valor final de `i` es `10` (`while` finaliza en `i=10`).

    Como resultado, todas las funciones `shooter` obtienen el mismo valor del mismo entorno léxico externo, que es el último valor `i=10`.

    ![](lexenv-makearmy-empty.svg)

    Como puedes ver arriba, con cada iteración del bloque `while {...}` un nuevo ambiente léxico es creado. Entonces, para corregir el problema podemos copiar el valor de `i` en una variable dentro del bloque `while {...}` como aquí:

    ```js run
    function makeArmy() {
      let shooters = [];

      let i = 0;
      while (i < 10) {
        *!*
        let j = i;
        */!*
        let shooter = function() { // shooter function
          alert( *!*j*/!* ); // debería mostrar su número
        };
        shooters.push(shooter);
        i++;
      }

      return shooters;
    }

    let army = makeArmy();

    // Ahora el código funciona correctamente
    army[0](); // 0
    army[5](); // 5
    ```

    Aquí `let j = i` declara una variable de iteración local `j` y copia `i` en ella. Las primitivas son copiadas por valor, así que realmente obtenemos una copia independiente de `i`, perteneciente a la iteración del bucle actual.

    Los shooters funcionan correctamente, porque el valor de `i` ahora vive más cerca. No en el ambiente léxico de `makeArmy()` sino en el que corresponde a la iteración del bucle actual:

    ![](lexenv-makearmy-while-fixed.svg)

    Tal problema habría sido evitado si hubiéramos usado `for` desde el principio:

    ```js run demo
    function makeArmy() {

      let shooters = [];

    *!*
      for(let i = 0; i < 10; i++) {
    */!*
        let shooter = function() { // shooter function
          alert( i ); // debería mostrar su número
        };
        shooters.push(shooter);
      }

      return shooters;
    }

    let army = makeArmy();

    army[0](); // 0
    army[5](); // 5
    ```

    Esto es esencialmente lo mismo, ya que cada iteración de `for` genera un nuevo ambiente léxico con su propia variable `i`. Así el `shooter` generado en cada iteración hace referencia a su propio `i`, de esa misma iteración.

    ![](lexenv-makearmy-for-fixed.svg)

Ahora, como has puesto mucho esfuerzo leyendo esto, y la receta final es tan simple: simplemente usa `for`, puede que te preguntes: ¿valió la pena?

Bien, si pudiste resolver el problema fácilmente probablemente no habrías necesitado leer la solución, así que esperamos que esta tarea te haya ayudado a entender las cosas mejor. 

Además, efectivamente hay casos donde uno prefiere `while` a `for`, y otros escenarios donde tales problemas son reales.

