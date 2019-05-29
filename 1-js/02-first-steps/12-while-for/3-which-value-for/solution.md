**La respuesta: de `0 `a `4` en ambos casos.**

```js run
for (let i = 0; i < 5; ++i) alert( i );

for (let i = 0; i < 5; i++) alert( i );
```

Eso puede ser fácilmente deducido de el algoritmo de `for`:

1. Ejecutar `i = 0` una vez antes de todo (comienzo).
2. Comprobar la condición `i <  5`.
3. Si `true` -- ejecutar el cuerpo del bucle `alert(i)` y luego `i++`.

El incremento `i++` es separado de la comprobación de la condición (2). Es simplemente otra declaración.

El valor retornado por el incremento no es usado aquí, así que no hay diferencia entre `i++` y `++i`.
