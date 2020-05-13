
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
7 / 0 = Infinity
" -9  " + 5 = " -9  5" // (3)
" -9  " - 5 = -14 // (4)
null + 1 = 1 // (5)
undefined + 1 = NaN // (6)
" \t \n" - 2 = -2 // (7)
```

1. La suma con una cadena `" "+ 1` convierte `1` en una cadena: `" "+ 1 =" 1 "`, y luego tenemos `" 1 "+ 0`, se aplica la misma regla.
2. La resta `-` (como la mayoría de las operaciones matemáticas) solo funciona con números, convierte una cadena vacía `"" ` a `0`.
3. La suma con una cadena agrega el número '5' a la cadena.
4. La resta siempre se convierte en números, por lo que hace que `"  -9  "` un número `-9` (ignorando los espacios a su alrededor).
5. `null` se convierte en `0` después de la conversión numérica.
6. `undefined` se convierte en` NaN` después de la conversión numérica.
7. Los caracteres de espacio se recortan al inicio y al final de la cadena cuando una cadena se convierte en un número. Aquí la cadena completa consta de caracteres de espacio, como `\ t`, `\ n` y un espacio "regular" entre ellos. Entonces, de manera similar a una cadena vacía, se convierte en `0`.