Una expresión regular para un número es: `pattern:-?\d+(\.\d+)?`. La creamos en tareas anteriores.

Un operador es `pattern:[-+*/]`. El guión `pattern:-` va primero dentro de los corchetes porque colocado en el medio significaría un rango de caracteres, cuando nosotros queremos solamente un carácter `-`.

La barra inclinada `/` debe ser escapada dentro de una expresión regular de JavaScript `pattern:/.../`, eso lo haremos más tarde.

Necesitamos un número, un operador y luego otro número. Y espacios opcionales entre ellos.

La expresión regular completa: `pattern:-?\d+(\.\d+)?\s*[-+*/]\s*-?\d+(\.\d+)?`.

<<<<<<< HEAD
Tiene 3 partes, con `pattern:\s*` en medio de ellas:
1. `pattern:-?\d+(\.\d+)?` - el primer número,
1. `pattern:[-+*/]` - el operador,
1. `pattern:-?\d+(\.\d+)?` - el segundo número.
=======
It has 3 parts, with `pattern:\s*` between them:
1. `pattern:-?\d+(\.\d+)?` - the first number,
2. `pattern:[-+*/]` - the operator,
3. `pattern:-?\d+(\.\d+)?` - the second number.
>>>>>>> 53b35c16835b7020a0a5046da5a47599d313bbb8

Para hacer que cada una de estas partes sea un elemento separado del array de resultados, encerrémoslas entre paréntesis: `pattern:(-?\d+(\.\d+)?)\s*([-+*/])\s*(-?\d+(\.\d+)?)`.

En acción:

```js run
let regexp = /(-?\d+(\.\d+)?)\s*([-+*\/])\s*(-?\d+(\.\d+)?)/;

alert( "1.2 + 12".match(regexp) );
```

El resultado incluye:

- `result[0] == "1.2 + 12"` (coincidencia completa)
- `result[1] == "1.2"` (primer grupo `(-?\d+(\.\d+)?)` -- el primer número, incluyendo la parte decimal)
- `result[2] == ".2"` (segundo grupo `(\.\d+)?` -- la primera parte decimal)
- `result[3] == "+"` (tercer grupo `([-+*\/])` -- el operador)
- `result[4] == "12"` (cuarto grupo `(-?\d+(\.\d+)?)` -- el segundo número)
- `result[5] == undefined` (quinto grupo `(\.\d+)?` -- la última parte decimal no está presente, por lo tanto es indefinida)

Solo queremos los números y el operador, sin la coincidencia completa o las partes decimales, así que "limpiemos" un poco el resultado.

La coincidencia completa (el primer elemento del array) se puede eliminar cambiando el array `result.shift()`.

Los grupos que contengan partes decimales (número 2 y 4) `pattern:(.\d+)` pueden ser excluídos al agregar  `pattern:?:` al comienzo: `pattern:(?:\.\d+)?`.

La solución final:

```js run
function parse(expr) {
  let regexp = /(-?\d+(?:\.\d+)?)\s*([-+*\/])\s*(-?\d+(?:\.\d+)?)/;

  let result = expr.match(regexp);

  if (!result) return [];
  result.shift();

  return result;
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45
```

As an alternative to using the non-capturing `?:`, we could name the groups, like this:

```js run
function parse(expr) {
	let regexp = /(?<a>-?\d+(?:\.\d+)?)\s*(?<operator>[-+*\/])\s*(?<b>-?\d+(?:\.\d+)?)/;

	let result = expr.match(regexp);

	return [result.groups.a, result.groups.operator, result.groups.b];
}

alert( parse("-1.23 * 3.45") );  // -1.23, *, 3.45;
```