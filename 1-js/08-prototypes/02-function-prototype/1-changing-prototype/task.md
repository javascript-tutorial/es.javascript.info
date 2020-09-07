importance: 5

---

# Cambiando "prototype"

En el siguiente código creamos `new Rabbit`, y luego intentamos modificar su prototipo.

Al principio, tenemos este código:

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // verdadero
```


<<<<<<< HEAD
1. Agregamos una cadena más (enfatizada). ¿Qué mostrará `alert` ahora?
=======
1. We added one more string (emphasized). What will `alert` show now?
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```

2. ...¿Y si el código es así (se reemplazó una línea)?

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

<<<<<<< HEAD
3. ¿Y así (se reemplazó una línea)?
=======
3. And like this (replaced one line)?
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```

4. La última variante:

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
