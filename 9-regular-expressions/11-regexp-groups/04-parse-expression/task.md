# Analizar una expresión:

Una expresión aritmética consta de 2 números y un operador entre ellos, por ejemplo:

- `1 + 2`
- `1.2 * 3.4`
- `-3 / -6`
- `-2 - 2`

El operador es uno de estos: `"+"`, `"-"`, `"*"` o `"/"`.

Puede haber espacios adicionales al principio, al final o entre las partes.

Crea una función `parse(expr)` que tome una expresión y devuelva un array de 3 ítems:

1. El primer número.
2. El operador.
3. El segundo número.

Por ejemplo:

```js
let [a, op, b] = parse("1.2 * 3.4");

alert(a); // 1.2
alert(op); // *
alert(b); // 3.4
```
