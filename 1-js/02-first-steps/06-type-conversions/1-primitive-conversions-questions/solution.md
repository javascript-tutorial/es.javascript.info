
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

1. La suma con un string `"" + 1` convierte el número `1` a un string: `"" + 1 = "1"`, luego tenemos `"1" + 0`, la misma regla es aplicada.
2. La resta `-` (como la mayoría de las operaciones matemáticas) sólo funciona con números, convierte un string vacío `""` a `0`.
3. La suma con un string añade el número `5` al string.
4. La resta siempre convierte a números, por lo que convierte `"  -9  "` al número `-9` (ignorando los espacios alrededor del string).
5. La conversión a número convierete `null` en `0`.
6. La conversión a número convierete `undefined` en `NaN`.
