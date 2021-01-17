
Aquí está la explicación.

1. Esta es una llamada común al método del objeto

2. Lo mismo, aquí los paréntesis no cambian el orden de las operaciones, el punto es el primero de todos modos.

3. Aquí tenemos una llamada más compleja `(expression)()`. La llamada funciona como si se dividiera en dos líneas:

    ```js no-beautify
    f = obj.go; // Calcula la expresión
    f();        // Llama a lo que tenemos
    ```

    Aquí `f()` se ejecuta como una función, sin `this`.

4. Lo mismo que `(3)`, a la izquierda de los paréntesis `()` tenemos una expresión.

Para explicar el funcionamiento de `(3)` y `(4)` necesitamos recordar que los accesores de propiedad (punto o corchetes) devuelven un valor del Tipo de Referencia.  

Cualquier operación en él excepto una llamada al método (como asignación `=` o `||`) lo convierte en un valor ordinario que no transporta la información que permite establecer `this`.
