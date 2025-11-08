
```js no-beautify
"" + 1 + 0 = "10" // (1)
"" - 1 + 0 = -1 // (2)
true + false = 1
6 / "3" = 2
"2" * "3" = 6
4 + 5 + "px" = "9px"
"$" + 4 + 5 = "$45"
"4" - 2 = 2
"4px" - 2 = NaN
"  -9  " + 5 = "  -9  5" // (3)
"  -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. La suma con una cadena `"" + 1` convierte `1` a un string: `"" + 1 = "1"`, y luego tenemos `"1" + 0`, la misma regla se aplica.
2. La resta `-` (como la mayoría de las operaciones matemáticas) sólo funciona con números, convierte una cadena vacía `""` a `0`.
3. La suma con una cadena concatena el número `5` a la cadena.
4. La resta siempre convierte a números, por lo tanto hace de `"  -9  "` un número `-9` (ignorando los espacios que lo rodean).
5. `null` se convierte en `0` después de la conversión numérica.
6. `undefined` se convierte en `NaN` después de la conversión numérica.
7. Al convertir una cadena en número, se ignoran los espacios en blanco al principio y al final (espacio común " ", tabulador \t, salto de línea \n, etc.). Si la cadena contiene solo ellos, queda vacía y se convierte en 0.
