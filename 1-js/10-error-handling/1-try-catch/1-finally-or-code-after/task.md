importance: 5

---

# Finally o solo el código?

Compara los dos fragmentos de código.

1. El primero usa `finally` para ejecutar el código después de `try..catch`:

    ```js
    try {
      trabajo trabajo
    } catch (e) {
      maneja errores
    } finally {
    *!*
      limpiar el espacio de trabajo
    */!*
    }
    ```
2. El segundo fragmento coloca la limpieza justo después de `try..catch`:

    ```js
    try {
      trabajo trabajo
    } catch (e) {
      manejo de errores
    }

    *!*
    limpiar el espacio de trabajo
    */!*
    ```

<<<<<<< HEAD
Definitivamente necesitamos la limpieza después del trabajo, no importa si hubo un error o no.
=======
We definitely need the cleanup after the work, doesn't matter if there was an error or not.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

¿Hay alguna ventaja aquí en usar `finally` o ambos fragmentos de código son iguales? Si existe tal ventaja, entonces da un ejemplo cuando sea importante.
