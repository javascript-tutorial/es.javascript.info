# Mirar hacia delante (lookahead) y mirar hacia atrás (lookbehind)

A veces necesitamos buscar solo aquella coincidencia en un patrón que es precedida o antecedida por otro patrón.

Existe una sintaxis especial para eso  llamada "mirar hacia delante" y "mirar hacia atrás" (del ingles: "lookahead" y "lookbehind" ) , juntas son conocidas como "mirar alrededor" ("lookaround").
Para empezar, busquemos el precio de la cadena siguiente `subject:1 pavo cuesta 30€`. Eso es: un número, seguido por el signo `subject:€`.
## Mirar hacia delante

La sintaxis es: `pattern:X(?=Y)`. Esto significa "buscar `pattern:X`, pero encontrar una coincidencia solo si es seguido por `pattern:Y`". Debe haber algún patrón en lugar de `pattern:X` y `pattern:Y`.  
Para un número entero seguido de `subject:€`, la expresión regular será `pattern:\d+(?=€)`:
```js run
let str = "1 pavo cuesta 30€";

alert( str.match(/\d+(?=€)/) ); // 30, el número 1 es ignorado, porque no está seguido de €
```

Por favor tenga en cuenta: "mirar hacia delante" es solamente una prueba, lo contenido en los paréntesis `pattern:(?=...)` no es incluido en el resultado `match:30`.
Cuando buscamos por `pattern:X(?=Y)`, el  buscador de expresión regular encuentra `pattern:X` y luego verifica si existe algún `pattern:Y` inmediatamente después de él. Si no se cumple, entonces la posible coincidencia es omitida, y la búsqueda continua.    

Es posible realizar pruebas más complejas, e.j. `pattern:X(?=Y)(?=Z)` significa:
1. Encuentra `pattern:X`.
2. Verifica si `pattern:Y` está inmediatamente después de `pattern:X` (omitir si no es así).
3. Verifica si `pattern:Z` está también inmediatamente después de `pattern:X` (omitir si no es así).
4. Si ambos casos se cumplen, entonces el `pattern:X` es una coincidencia, de lo contrario, continúe buscando.

En otras palabras, dicho patrón significa que estamos buscando por `pattern:X` seguido de `pattern:Y` y `pattern:Z` al mismo tiempo. 
Eso solo es posible si los patrones `pattern:Y` y `pattern:Z` no son mutuamente exclusivos. 
Por ejemplo, `pattern:\d+(?=\s)(?=.*30)` busca por `pattern:\d+` solo si es seguido por un espacio, y si hay `30` en algún lugar después de eso:
```js run
let str = "1 pavo cuesta 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

En nuestra cadena eso coincide exactamente con el número `1`. 
## Mirada hacia delante negativa

Digamos que queremos una cantidad, no un precio de la misma cadena. Eso es el número `pattern:\d+`, NO seguido por `subject:€`.  
Por eso se puede aplicar una "mirada hacia delante negativa" ("negative lookahead").
La sintaxis es: `pattern:X(?!Y)`, que significa "busca `pattern:X`, pero solo si no es seguido por `pattern:Y`".

```js run
let str = "2 pavos cuestan 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (el precio es omitido)
```

## Mirar atras

Mirar hacia delante permite agregar a una condicion para "lo que sigue".
Mirar hacia atrás es similar. Es decir, permite coincidir un patrón solo si hay algo antes de el.
La sintaxis es:
- Mirar hacia atrás positivo: `pattern:(?<=Y)X`, coincide `pattern:X`, pero solo si hay `pattern:Y` antes de el.
- Mirar hacia atrás negativo: `pattern:(?<!Y)X`, coincide `pattern:X`, pero solo si no hay `pattern:Y` antes de el.

Por ejemplo,cambiemos el precio a dólares estadounidenses. El signo de dólar usualmente va antes del número, entonces para buscar `$30` usaremos `pattern:(?<=\$)\d+` -- una cantidad precedida por `subject:$`: 
```js run
let str = "1 pavo cuesta $30";

// el signo de dólar se ha escapado \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (omitido el número)
```

Y, si necesitamos la cantidad -- un número, no precedida por  `subject:$`,entonces podemos usar mirar hacia atrás negativo `pattern:(?<!\$)\d+`: 
```js run
let str = "2 pavos cuestan $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (el precio es omitido)
```

## Atrapando grupos

Generalmente, los contenidos dentro de los paréntesis de "mirar alrededor" (lookaround) no se convierten en parte del resultado.
Ejemplo en el patrón `pattern:\d+(?=€)`, el signo `pattern:€`  no es capturado como parte de la coincidencia. Eso es esperado: buscamos un número `pattern:\d+`, mientras `pattern:(?=€)` es solo una prueba que debería ser seguida por `subject:€`.

Pero en algunas situaciones nosotros podríamos querer capturar la expresión mirar alrededor, o parte de ella. Eso es posible. Solo hay que rodear esa parte por paréntesis adicionales.
En los ejemplos de abajo el signo de divisa  `pattern:(€|kr)` es capturado, junto con la cantidad:  
```js run
let str = "1 pavo cuesta 30€";
let regexp = /\d+(?=(€|kr))/; // paréntesis extra alrededor de €|kr

alert( str.match(regexp) ); // 30, €
```

Y esto es lo mismo para "mirar hacia atrás":

```js run
let str = "1 pavo cuesta $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Resumen

"Mirar hacia delante" y "mirar hacia atrás" (en conjunto conocidos como "mirar alrededor") son útiles cuando nos gustaría hacer coincidir algo dependiendo del contexto antes / después.

Para simples expresiones regulares podemos hacer lo mismo maualmente. Esto es: coincidir todo, en cualquier contexto, y luego filtrar por contexto en el bucle.
Remember, `str.match` (without flag `pattern:g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.
Recuerda,`str.match` (sin el indicador `pattern:g`) y `str.matchAll` (siempre) retorna coincidencias como un array con la propiedad `index`,  para que sepamos exactamente dónde está en el texto, y poder comprobar el contexto.

Pero generalmente "mirar alrededor" es más conveniente.
Tipos de "mirar alrededor":

| Patrón             | Tipo             | Coincidencias |
|--------------------|------------------|---------|
| `X(?=Y)`   | Mirar hacia delante positivo | `pattern:X` si es seguido por `pattern:Y` |
| `X(?!Y)`   | Mirar hacia delante negativo | `pattern:X` si no es seguido por `pattern:Y` |
| `(?<=Y)X` |  Mirar hacia atrás positivo | `pattern:X` si es después de `pattern:Y` |
| `(?<!Y)X` | Mirar hacia atrás negativo | `pattern:X` si no es después de `pattern:Y` |
