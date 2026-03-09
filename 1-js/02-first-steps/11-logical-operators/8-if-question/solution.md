La respuesta: el primero y el tercero serán ejecutados.

Detalles:

```js run
// Corre.
// El resultado de -1 || 0 es -1, valor truthy
if (-1 || 0) alert( "primero" );

// No corre.
// -1 && 0 es 0, valor falsy
if (-1 && 0) alert( "segundo" );

// Se ejecuta
// El operador && tiene mayor precedencia que ||
// Así que -1 && 1 se ejecuta primero, dándonos la cadena:
// null || -1 && 1  ->  null || 1  ->  1
if (null || -1 && 1) alert( "tercero" );
```

