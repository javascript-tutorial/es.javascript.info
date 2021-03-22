importance: 5

---

# Finally o solo el código?

Compara los dos fragmentos de código.

<<<<<<< HEAD
1. El primero usa `finally` para ejecutar el código después de `try..catch`:

    ```js
    try {
      trabajo trabajo
    } catch (e) {
      maneja errores
=======
1. The first one uses `finally` to execute the code after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
    } finally {
    *!*
      limpiar el espacio de trabajo
    */!*
    }
    ```
<<<<<<< HEAD
2. El segundo fragmento coloca la limpieza justo después de `try..catch`:

    ```js
    try {
      trabajo trabajo
    } catch (e) {
      manejo de errores
=======
2. The second fragment puts the cleaning right after `try...catch`:

    ```js
    try {
      work work
    } catch (err) {
      handle errors
>>>>>>> d4b3c135ccf80914f59677803e64ebc832d165e3
    }

    *!*
    limpiar el espacio de trabajo
    */!*
    ```

Definitivamente necesitamos la limpieza después del trabajo, no importa si hubo un error o no.

¿Hay alguna ventaja aquí en usar `finally` o ambos fragmentos de código son iguales? Si existe tal ventaja, entonces da un ejemplo cuando sea importante.
