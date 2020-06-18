La tarea demuestra cómo las formas de sufijo y prefijo pueden llevar a diferentes resultados cuando son usadas en comparaciones.

1. **Del 1 al 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    El primer valor es `i = 1`, porque `++i` primero incrementa `i` y luego retorna el valor nuevo. Así que la primera comparación es `1 < 5` y el `alert` muestra `1`. 

    Entonces siguen `2, 3, 4…` -- los valores son mostrados uno tras otro. La comparación siempre usa el valor incrementado, porque `++` está antes de la variable.

    Finalmente, `i = 4` es incrementada a `5`, la comparación `while(5 < 5)` falla, y el bucle se detiene. Así que `5` no es mostrado.
2. **Del 1 al 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    El primer valor es de nuevo `i = 1`. La forma del sufijo de `i++` incrementa `i` y luego retorna el valor *viejo*, así que la comparación `i++ < 5` usará `i = 0` (contrario a `++i < 5`).

    Pero la llamada a `alert` está separada. Es otra declaración, la cual se ejecuta luego del incremento y la comparación. Así que obtiene el `i = 1` actual.

    Luego siguen `2, 3, 4…`

    Detengámonos en `i = 4`. La forma del prefijo `++i` lo incrementaría y usaría `5` en la comparación. Pero aquí tenemos la forma del sufijo `i++`. Así que incrementa `i` a `5`, pero retorna el valor viejo. Por lo tanto, la comparación es en realidad `while(4 < 5)` -- verdadero, y el control sigue a `alert`.

    El valor `i = 5` es el último, porque el siguiente paso `while(5 < 5)` es falso.
