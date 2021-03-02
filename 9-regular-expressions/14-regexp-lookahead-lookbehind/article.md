# Ver delante (lookahead) y ver detrás (lookbehind)

A veces necesitamos buscar únicamente aquellas coincidencias donde un patrón es precedido o seguido por otro patrón.

Existe una sintaxis especial para eso llamada "ver delante" y "ver detrás" (del ingles: "lookahead" y "lookbehind"), juntas son conocidas como "ver alrededor" ("lookaround"). Nota en español: se considera el flujo de lectura, "ahead" o "delante" es lo que tiene a la derecha (lo siguiente por leer), mientras que "behind" o "detrás" es lo que tiene a la izquierda (lo ya leido, no lo que viene "después"). 

Para empezar, busquemos el precio de la cadena siguiente `subject:1 pavo cuesta 30€`. Eso es: un número, seguido por el signo `subject:€`.

## Ver delante

La sintaxis es: `pattern:X(?=Y)`. Esto significa "buscar `pattern:X`, pero considerarlo una coincidencia solo si es seguido por `pattern:Y`". Puede haber cualquier patrón en `pattern:X` y `pattern:Y`.

Para un número entero seguido de `subject:€`, la expresión regular será `pattern:\d+(?=€)`:

```js run
let str = "1 pavo cuesta 30€";

alert( str.match(/\d+(?=€)/) ); // 30, el número 1 es ignorado porque no está seguido de €
```

Tenga en cuenta: "ver delante" es solamente una prueba, lo contenido en los paréntesis `pattern:(?=...)` no es incluido en el resultado `match:30`.

Cuando buscamos `pattern:X(?=Y)`, el motor de expresión regular encuentra `pattern:X` y luego verifica si existe `pattern:Y` inmediatamente después de él. Si no existe, entonces la coincidencia potencial es omitida y la búsqueda continúa.    

Es posible realizar pruebas más complejas, por ejemplo `pattern:X(?=Y)(?=Z)` significa:

1. Encuentra `pattern:X`.
2. Verifica si `pattern:Y` está inmediatamente después de `pattern:X` (omite si no es así).
3. Verifica si `pattern:Z` está también inmediatamente después de `pattern:X` (omite si no es así).
4. Si ambas verificaciones se cumplen, el `pattern:X` es una coincidencia. De lo contrario continúa buscando.

En otras palabras, dicho patrón significa que estamos buscando por `pattern:X` seguido de `pattern:Y` y `pattern:Z` al mismo tiempo. 

Eso es posible solamente si los patrones `pattern:Y` y `pattern:Z` no se excluyen mutuamente.

Por ejemplo, `pattern:\d+(?=\s)(?=.*30)` busca un `pattern:\d+` que sea seguido por un espacio `pattern:(?=\s)` y que también tenga un `30` en algún lugar después de él `pattern:(?=.*30)`:

```js run
let str = "1 pavo cuesta 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

En nuestra cadena eso coincide exactamente con el número `1`.

## Ver delante negativo

Digamos que queremos una cantidad, no un precio de la misma cadena. Eso es el número `pattern:\d+` NO seguido por `subject:€`.

Para eso se puede aplicar un "ver delante negativo" ("negative lookahead").

La sintaxis es: `pattern:X(?!Y)`, que significa "busca `pattern:X`, pero solo si no es seguido por `pattern:Y`".

```js run
let str = "2 pavos cuestan 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (el precio es omitido)
```

## Ver detrás

"Ver delante" permite agregar una condicion para "lo que sigue".

"Ver detrás" es similar. Permite coincidir un patrón solo si hay algo anterior a él.

La sintaxis es:
- Ver detrás positivo: `pattern:(?<=Y)X`, coincide `pattern:X`, pero solo si hay `pattern:Y` antes de él.
- Ver detrás negativo: `pattern:(?<!Y)X`, coincide `pattern:X`, pero solo si no hay `pattern:Y` antes de él.

Por ejemplo, cambiemos el precio a dólares estadounidenses. El signo de dólar usualmente va antes del número, entonces para buscar `$30` usaremos `pattern:(?<=\$)\d+`: una cantidad precedida por `subject:$`: 

```js run
let str = "1 pavo cuesta $30";

// el signo de dólar se ha escapado \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (omite los números aislados)
```

Y si necesitamos la cantidad (un número no precedida por `subject:$`), podemos usar "ver detrás negativo" `pattern:(?<!\$)\d+`: 

```js run
let str = "2 pavos cuestan $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (el precio es omitido)
```

## Atrapando grupos

Generalmente, los contenidos dentro de los paréntesis de "ver alrededor" (lookaround) no se convierten en parte del resultado.

Ejemplo en el patrón `pattern:\d+(?=€)`, el signo `pattern:€`  no es capturado como parte de la coincidencia. Eso es esperado: buscamos un número `pattern:\d+`, mientras `pattern:(?=€)` es solo una prueba que indica que debe ser seguida por `subject:€`.

Pero en algunas situaciones nosotros podríamos querer capturar también la expresión "ver alrededor", o parte de ella. Eso es posible. Solo hay que rodear esa parte con paréntesis adicionales.

En los ejemplos de abajo el signo de divisa `pattern:(€|kr)` es capturado junto con la cantidad:  

```js run
let str = "1 pavo cuesta 30€";
let regexp = /\d+(?=(€|kr))/; // paréntesis extra alrededor de €|kr

alert( str.match(regexp) ); // 30, €
```

Lo mismo para "ver detrás":

```js run
let str = "1 pavo cuesta $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Resumen

"Ver delante" y "ver detrás" (en conjunto conocidos como "ver alrededor") son útiles cuando queremos hacer coincidir algo dependiendo del contexto antes / después.

Para expresiones regulares simples podemos hacer lo mismo manualmente. Esto es: coincidir todo, en cualquier contexto, y luego filtrar por contexto en el bucle.

Recuerda, `str.match` (sin el indicador `pattern:g`) y `str.matchAll` (siempre) devuelven las coincidencias como un array con la propiedad `index`, así que sabemos exactamente dónde están dentro del texto y podemos comprobar su contexto.

Pero generalmente "ver alrededor" es más conveniente.

Tipos de "ver alrededor":

| Patrón             | Tipo             | Coincidencias |
|--------------------|------------------|---------|
| `X(?=Y)`   | Ver delante positivo | `pattern:X` si está seguido por `pattern:Y` |
| `X(?!Y)`   | Ver delante negativo | `pattern:X` si no está seguido por `pattern:Y` |
| `(?<=Y)X` |  Ver detrás positivo | `pattern:X` si está después de `pattern:Y` |
| `(?<!Y)X` | Ver detrás negativo | `pattern:X` si no está después de `pattern:Y` |
