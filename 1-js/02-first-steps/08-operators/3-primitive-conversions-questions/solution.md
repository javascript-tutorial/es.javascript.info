
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

<<<<<<< HEAD
1. La suma con una cadena `"" + 1` convierte `1` a un string: `"" + 1 = "1"`, y luego tenemos `"1" + 0`, la misma regla se aplica.
2. La resta `-` (como la mayoría de las operaciones matemáticas) sólo funciona con números, convierte una cadena vacía `""` a `0`.
3. La suma con una cadena concatena el número `5` a la cadena.
4. La resta siempre convierte a números, por lo tanto hace de `"  -9  "` un número `-9` (ignorando los espacios que lo rodean).
5. `null` se convierte en `0` después de la conversión numérica.
6. `undefined` se convierte en `NaN` después de la conversión numérica.
7. Los caracteres de espacio se recortan al inicio y al final de la cadena cuando una cadena se convierte en un número. Aquí toda la cadena consiste en caracteres de espacio, tales como `\t`, `\n` y un espacio "común" entre ellos. Por lo tanto, pasa lo mismo que a una cadena vacía, se convierte en `0`.
=======
1. The addition with a string `"" + 1` converts `1` to a string: `"" + 1 = "1"`, and then we have `"1" + 0`, the same rule is applied.
2. The subtraction `-` (like most math operations) only works with numbers, it converts an empty string `""` to `0`.
3. The addition with a string appends the number `5` to the string.
4. The subtraction always converts to numbers, so it makes `"  -9  "` a number `-9` (ignoring spaces around it).
5. `null` becomes `0` after the numeric conversion.
6. `undefined` becomes `NaN` after the numeric conversion.
7. Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as `\t`, `\n` and a "regular" space between them. So, similarly to an empty string, it becomes `0`.
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e
