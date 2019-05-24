La tarea demuestra como las formas de sufjio y prefijo pueden llevar a diferentes resultado cuando son usadas en comparaciones.

1. **Del 1 al 4**

    ```js run
    let i = 0;
    while (++i < 5) alert( i );
    ```

    El primer valor es `i = 1`, porque primero `++i` incrementa `i` y entonces retorna el valor nuevo. Asi que la primera comparación es `1 < 5` y el `alert` muestra `1`.

    Entonces siguen `2, 3, 4…` -- los valores son mostrados uno tras de otro. La comparación siempre usa el valor incrementado, porque `++` esta antes de la variable.

    Finalmente, `i = 4` es incrementada a `5`, la comparación `while(5 < 5)` falla, y el bucle se detiene. Asi que `5` no es mostrado.
2. **Del 1 al 5**

    ```js run
    let i = 0;
    while (i++ < 5) alert( i );
    ```

    El primer valor es de nuevo `i = 1`. La forma del sufijo de `i++` incrementa `i` y entonce retorna el valor *viejo*, asi que la comparación `i++ < 5` usara `i = 0` (contrario a `++i < 5`).

    Pero la llamada a `alert` esta separda. Es otra declaración la cual se ejecuta luego del increment y la comparación. Asi que obtiene el `i = 1` actual.

    Luego siguen `2, 3, 4…`

    Vamos a parar en `i = 4`. La forma del prefijo `++i` lo incrementaria y usaria `5` en la comparación. Pero aqui tenemos la forma del sufijo `i++`. Asi que incrementa `i` a `5`, pero retorna el valor viejo. Por lo tanto, la comparación es en realidad `while(4 < 5)` -- verdadero, y el control sigue a `alert`.

    El valor `i = 5` es el último, porque el siguiente paso `while(5 < 5)` es falso.
