# mirar adelante y mirar atras

A veces necesitamos buscar solo aquella coincidencia en un patrón que es precedida o antecedida por otro patrón.

Existe una sintaxis especial para eso, llamada "mirar adelante" y "mirar atras" (del ingles: _"lookahead" and "lookbehind"_ ) ,juntas conocidas como "mirar alrededor"
para empezar, busquemos el precio de la cadena siguente `subject:1 pavo cuesta 30€`. eso es: un numero, seguido de `subject:€` signo  
## mirar adelante

La sintaxis es: `pattern:X(?=Y)`. esto significa "mirar por `pattern:X`, pero encontrar una coincidencia solo si es seguido por `pattern:Y`". Deben haber algun patron en lugar de `pattern:X` and `pattern:Y`.  
Para un numero entero seguido de `subject:€`, la expresion regular sera `pattern:\d+(?=€)`:
```js run
let str = "1 pavo cuesta 30€";

alert( str.match(/\d+(?=€)/) ); // 30, el numero 1 es ignorad0, por que no tiene al lado a €
```

por favor nota: el mirar adelante es solamente una prueba,lo contenido en los parentesis `pattern:(?=...)` no es incluido en el resultado `match:30`.
Cuando buscamos por `pattern:X(?=Y)`, el  buscador de expresion regular encuentra `pattern:X` y luego verifica si existe algun `pattern:Y` inmediatamente despues de el.Si no se cumple, entonces la posible coincidencia es omitida, y la busqueda continua.    

More complex tests are possible, e.g. `pattern:X(?=Y)(?=Z)` means:
Pruebas mas complejas son posibles, ejemplo.`pattern:X(?=Y)(?=Z)` significa:
1. encuentra `pattern:X`.
2. Verifica si `pattern:Y` es inmediatamente despues de `pattern:X` (omitir si no es).
3. Verifica si `pattern:Z` es también inmediatamente después de `pattern:X` (omitir si no es).
4. Si ambos casos se cumplen, entonces el `pattern:X` es una coincidencia, de lo contrario, continúe buscando.

En otras palabras, dicho patron significa que estamos buscando por `pattern:X` seguido de `pattern:Y` y `pattern:Z` al mismo tiempo. 
Eso solo es posible si los patrones `pattern:Y` y `pattern:Z` no son mutuamente exclusivos. 
Por ejemplo, `pattern:\d+(?=\s)(?=.*30)` busca por `pattern:\d+` solo si es seguido por un espacio, y si hay `30` en algun lugar despues de eso:
```js run
let str = "1 pavo cuesta 30€";

alert( str.match(/\d+(?=\s)(?=.*30)/) ); // 1
```

En nuestra cadena eso coincide exactamente con el numero `1`. 
## Mirada hacia delante negativa

Digamos que queremos una cantidad, no un precio de la misma cadena.Eso es el numero `pattern:\d+`, NO seguido por `subject:€`.  
Por eso, una mirada hacia delante negativa puede ser aplicada.
La sintaxis es: `pattern:X(?!Y)`, la cual significa "busca `pattern:X`, pero solo si es seguido por `pattern:Y`".

```js run
let str = "2 pavos cuestan 60€";

alert( str.match(/\d+(?!€)/) ); // 2 (el precio es omitido)
```

## Mirar atras

Mirar adelante permite agregar a una condicion para "que sigue".
Mirar atras es similar, pero mira detras. Eso es, permite coincidir un patron solo si hay algo antes de el.
La sintaxis es:
- Mirar atras positivo: `pattern:(?<=Y)X`, coincide `pattern:X`, pero solo si hay `pattern:Y` antes de el.
- Mirar atras negativo: `pattern:(?<!Y)X`, coincide `pattern:X`, pero solo si no hay `pattern:Y` antes de el.

Por ejemplo,cambiemos el precio a dolares estadounidenses. El signo de dollar usualmente va antes del numero, entonces miramos por `$30` usaremos `pattern:(?<=\$)\d+` -- una cantidad precedida por `subject:$`: 
```js run
let str = "1 pavo cuesta $30";

// el signo de dolar es escapado \$
alert( str.match(/(?<=\$)\d+/) ); // 30 (omitido el numero)
```

And, if we need the quantity -- a number, not preceded by `subject:$`, then we can use a negative lookbehind `pattern:(?<!\$)\d+`:
Y, si necesitamos la cantidad -- un numero, no precedida por  `subject:$`,entonces podemos usar un mirar atras negativo `pattern:(?<!\$)\d+`: 
```js run
let str = "2 pavos cuestan $60";

alert( str.match(/(?<!\$)\d+/) ); // 2 (precio omitido)
```

## Atrapando grupos

Generalmente, los contenidos dentro de los parentesis de mirar alrededor no se convierten en parte del resultado.
Ejemplo en el patron `pattern:\d+(?=€)`, el `pattern:€` signo no es capturado como parte de la coincidencia. Eso es esperado: buscamos un numero `pattern:\d+`, mientras `pattern:(?=€)` es solo una prueba que deberia ser seguida por `subject:€`.

Pero en algunas situaciones nosotros podriamos querer el capturar la expresion mirar alrededor, o parte de ella. Eso es posible. solo hay que rodear esa parte por parentesis adicionales
En los ejemplos de abajo el signo de divisa  `pattern:(€|kr)` es capturado, junto con la cantidad:  
```js run
let str = "1 pavo cuesta 30€";
let regexp = /\d+(?=(€|kr))/; // parentesis extra alrededor de €|kr

alert( str.match(regexp) ); // 30, €
```

Y esto es lo mismo para mirar atrás:

```js run
let str = "1 pavo cuesta $30";
let regexp = /(?<=(\$|£))\d+/;

alert( str.match(regexp) ); // 30, $
```

## Resumen

Mirar adelante y mirar atras (comúnmente conocido como "mirar alrededor") son útiles cuando nos gustaría hacer coincidir algo dependiendo del contexto antes / después.

Para simples expresiones regulares podemos hacer lo mismo maualmente. Esto es:coincidir todo, en cualquier contexto, y luego filtrar por contexto en el bucle.
Remember, `str.match` (without flag `pattern:g`) and `str.matchAll` (always) return matches as arrays with `index` property, so we know where exactly in the text it is, and can check the context.
Recuerda,`str.match` (sin el indicador `pattern:g`) y `str.matchAll` (siempre) retorna coincidencias como un arreglo con la propiedad `index`, ´pr ñp cual sabemos donde exactamente esta en el texto, y podemos verificar el contexto.

Pero generalmente mirar alrededor es mas conveniente.
tipos de mirar alrededor:

| Patron             | tipo             | coincidencias |
|--------------------|------------------|---------|
| `X(?=Y)`   | Mirar adelante positivo | `pattern:X` si es seguido por `pattern:Y` |
| `X(?!Y)`   | Mirar adelante negativo | `pattern:X` si no es seguido por `pattern:Y` |
| `(?<=Y)X` |  Mirar atras positivo | `pattern:X` si es despues de `pattern:Y` |
| `(?<!Y)X` | Mirar atras negativo | `pattern:X` si no es despues de `pattern:Y` |
