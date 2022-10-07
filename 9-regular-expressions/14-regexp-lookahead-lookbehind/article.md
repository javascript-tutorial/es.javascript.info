# Lookahead y lookbehind (revisar delante/detrás)

A veces necesitamos buscar únicamente aquellas coincidencias donde un patrón es precedido o seguido por otro patrón.

Existe una sintaxis especial para eso llamadas "lookahead" y "lookbehind" ("ver delante" y "ver detrás"), juntas son conocidas como "lookaround" ("ver alrededor"). 

Para empezar, busquemos el precio de la cadena siguiente `subject:1 pavo cuesta 30€`. Eso es: un número, seguido por el signo `subject:€`.

## Lookahead

La sintaxis es: `pattern:X(?=Y)`. Esto significa "buscar `pattern:X`, pero considerarlo una coincidencia solo si es seguido por `pattern:Y`". Puede haber cualquier patrón en `pattern:X` y `pattern:Y`.

Para un número entero seguido de `subject:€`, la expresión regular será `pattern:\d+(?=€)`:

```js run
let str = "1 pavo cuesta 30€";

alert( str.match(/\d+(?=€)/) ); // 30, el número 1 es ignorado porque no está seguido de €
```

Tenga en cuenta que "lookahead" es solamente una prueba, lo contenido en los paréntesis `pattern:(?=...)` no es incluido en el resultado `match:30`.

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

## Lookahead negativo

Digamos que queremos una cantidad, no un precio de la misma cadena. Eso es el número `pattern:\d+` NO seguido por `subject:€`.

Para eso se puede aplicar un "lookahead negativo".

La sintaxis es: `pattern:X(?!Y)`, que significa "busca `pattern:X`, pero solo si no es seguido por `pattern:Y`".

```js run
let str = "2 pavos cuestan 60€";

alert( str.match(/\d+\b(?!€)/g) ); // 2 (el precio es omitido)
```

## Lookbehind

```warn header="Compatibilidad de navegadores en lookbehind"
Ten en cuenta: Lookbehind no está soportado en navegadores que no utilizan V8, como Safari, Internet Explorer.
```

"lookahead" permite agregar una condición para "lo que sigue".

"Lookbehind" es similar. Permite coincidir un patrón solo si hay algo anterior a él.

La sintaxis es:
- Lookbehind positivo: `pattern:(?<=Y)X`, coincide `pattern:X`, pero solo si hay `pattern:Y` antes de él.
- Lookbehind negativo: `pattern:(?<!Y)X`, coincide `pattern:X`, pero solo si no hay `pattern:Y` antes de él.

Por ejemplo, cambiemos el precio a dólares estadounidenses. El signo de dólar usualmente va antes del número, entonces para buscar `$30` usaremos `pattern:(?<=\$)\d+`: una cantidad precedida por `subject:$`: 

```js run
let str = "1 pavo cuesta $30";

// el signo de dólar se ha escapado \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (omite los números aislados)
```

Y si necesitamos la cantidad (un número no precedida por `subject:$`), podemos usar "lookbehind negativo" `pattern:(?<!\$)\d+`: 

```js run
let str = "2 pavos cuestan $60";

alert( str.match(/(?<!\$)\b\d+/g) ); // 2 (el precio es omitido)
```

## Atrapando grupos

Generalmente, los contenidos dentro de los paréntesis de "lookaround" (ver alrededor) no se convierten en parte del resultado.

Ejemplo en el patrón `pattern:\d+(?=€)`, el signo `pattern:€`  no es capturado como parte de la coincidencia. Eso es esperado: buscamos un número `pattern:\d+`, mientras `pattern:(?=€)` es solo una prueba que indica que debe ser seguida por `subject:€`.

Pero en algunas situaciones nosotros podríamos querer capturar también la expresión en "lookaround", o parte de ella. Eso es posible: solo hay que rodear esa parte con paréntesis adicionales.

En los ejemplos de abajo el signo de divisa `pattern:(€|kr)` es capturado junto con la cantidad:  

```js run
let str = "1 pavo cuesta 30€";
let regexp = /\d+(?=(€|kr))/; // paréntesis extra alrededor de €|kr

alert( str.match(regexp) ); // 30, €
```

Lo mismo para "lookbehind":

```js run
let str = "1 pavo cuesta $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Resumen

Lookahead y lookbehind (en conjunto conocidos como "lookaround") son útiles cuando queremos hacer coincidir algo dependiendo del contexto antes/después.

Para expresiones regulares simples podemos hacer lo mismo manualmente. Esto es: coincidir todo, en cualquier contexto, y luego filtrar por contexto en el bucle.

Recuerda, `str.match` (sin el indicador `pattern:g`) y `str.matchAll` (siempre) devuelven las coincidencias como un array con la propiedad `index`, así que sabemos exactamente dónde están dentro del texto y podemos comprobar su contexto.

Pero generalmente "lookaround" es más conveniente.

Tipos de "lookaround":

| Patrón             | Tipo             | Coincidencias |
|--------------------|------------------|---------|
| `X(?=Y)`   | lookahead positivo | `pattern:X` si está seguido por `pattern:Y` |
| `X(?!Y)`   | lookahead negativo | `pattern:X` si no está seguido por `pattern:Y` |
| `(?<=Y)X` | lookbehind positivo | `pattern:X` si está después de `pattern:Y` |
| `(?<!Y)X` | lookbehind negativo | `pattern:X` si no está después de `pattern:Y` |
