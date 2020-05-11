importance: 5

---

# Finally o solo el código?

Compara los dos fragmentos de código.

1. El primero usa `finally` para ejecutar el código después de `try..catch`:

    ```js
    try {
      trabajo trabajo
    } catch (e) {
      captura errores
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
      captura de errores
    }

    *!*
    limpiar el espacio de trabajo
    */!*
    ```

Definitivamente necesitamos la limpieza después del trabajo, no importa si hubo un error o no.

¿Hay alguna ventaja aquí en usar `finally` o ambos fragmentos de código son iguales? Si existe tal ventaja, entonces da un ejemplo cuando sea importante.
