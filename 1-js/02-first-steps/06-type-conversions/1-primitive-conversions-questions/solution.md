
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
```

1. La adicción con una cadena `"" + 1` convierte `1` a una cadena: `"" + 1 = "1"`, y entonces tenemos `"1" + 0`, se aplica la misma regla.
2. La sustracción `-` (como la mayoría de las operaciones matemáticas) solo trabaja con números, esto convierte una cadena vaciá `""` a `0`.
3. La adicción con una cadena añade el numero `5` a la cadena.
4. La sustracción siempre convierte a números, asi que hace `"  -9  "` un numero `-9` (ignorando espacios a su alrededor).
5. `null` se convierte en `0` después de la conversión numérica.
6. `undefined` se convierte `NaN` después de la conversión numérica.
