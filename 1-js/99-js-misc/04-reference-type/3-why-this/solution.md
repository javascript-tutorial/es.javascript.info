
Aquí está la explicación.

1. Esta es una llamada común al método del objeto

2. Lo mismo, aquí los paréntesis no cambian el orden de las operaciones, el punto es el primero de todos modos.

<<<<<<< HEAD
3. Aquí tenemos una llamada más compleja `(expression).method()`. La llamada funciona como si se dividiera en dos líneas:
=======
3. Here we have a more complex call `(expression)()`. The call works as if it were split into two lines:
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

    ```js no-beautify
    f = obj.go; // Calcula la expresión
    f();        // Llama a lo que tenemos
    ```

    Aquí `f()` se ejecuta como una función, sin `this`.

<<<<<<< HEAD
4. Lo mismo que `(3)`, a la izquierda del punto `.` tenemos una expresión.
=======
4. The similar thing as `(3)`, to the left of the parentheses `()` we have an expression.
>>>>>>> 99e59ba611ab11319ef9d0d66734b0bea2c3f058

Para explicar el funcionamiento de `(3)` y `(4)` necesitamos recordar que los accesores de propiedad (punto o corchetes) devuelven un valor del Tipo de Referencia.  

Cualquier operación en él excepto una llamada al método (como asignación `=` o `||`) lo convierte en un valor ordinario que no transporta la información que permite establecer `this`.
