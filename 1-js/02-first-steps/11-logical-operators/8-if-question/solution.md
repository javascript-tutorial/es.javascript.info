La respuesta: el primero y el tercero serán ejecutados.

Detalles:

```js run
// Corre.
// El resultado de -1 || 0 = -1, valor verdadero
if (-1 || 0) alert("primero");

// No corre.
// -1 && 0 = 0, valor falso
if (-1 && 0) alert("segundo");

// Se ejecuta
// El operador && tiene mayor precedencia que ||
// Asi que -1 && 1 se ejecuta primero, dandonos la cadena:
// null || -1 && 1  ->  null || 1  ->  1
if (null || (-1 && 1)) alert("tercero");
```
