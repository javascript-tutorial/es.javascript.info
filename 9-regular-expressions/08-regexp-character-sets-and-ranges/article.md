# Conjuntos y rangos [...]

Varios caracteres o clases de caracteres entre corchetes `[…]` significa "buscar cualquier carácter entre los dados".

## Conjuntos

Por ejemplo, `pattern:[eao]` significa cualquiera de los 3 caracteres: `'a'`, `'e'`, o `'o'`.

A esto se le llama *conjunto*. Los conjuntos se pueden usar en una expresión regular junto con los caracteres normales:

```js run
// encontrar [t ó m], y luego "op"
alert( "Mop top".match(/[tm]op/gi) ); // "Mop", "top"
```

Tenga en cuenta que aunque hay varios caracteres en el conjunto, corresponden exactamente a un carácter en la coincidencia.

Entonces, en el siguiente ejemplo no hay coincidencias:

```js run
// encuentra "V", luego [o ó i], luego "la"
alert( "Voila".match(/V[oi]la/) ); // null, sin coincidencias
```

El patrón busca:

- `pattern:V`,
- después *una* de las letras `pattern:[oi]`,
- después `pattern:la`.

Entonces habría una coincidencia para `match:Vola` o `match:Vila`.

## Rangos

Los corchetes también pueden contener *rangos de caracteres*.

Por ejemplo, `pattern:[a-z]` es un carácter en el rango de `a` a `z`, y `pattern:[0-5]` es un dígito de `0` a `5`.

En el ejemplo a continuación, estamos buscando `"x"` seguido de dos dígitos o letras de `A` a `F`:

```js run
alert( "Excepción 0xAF".match(/x[0-9A-F][0-9A-F]/g) ); // xAF
```

Aquí `pattern:[0-9A-F]` tiene dos rangos: busca un carácter que sea un dígito de `0` a `9` o una letra de `A` a `F`.

Si también queremos buscar letras minúsculas, podemos agregar el rango `a-f`: `pattern:[0-9A-Fa-f]`. O se puede agregar la bandera `pattern:i`.

También podemos usar clases de caracteres dentro de los `[…]`.

Por ejemplo, si quisiéramos buscar un carácter de palabra `pattern:\w` o un guión `pattern:-`, entonces el conjunto es `pattern:[\w-]`.

También es posible combinar varias clases, p.ej.: `pattern:[\s\d]` significa "un carácter de espacio o un dígito".

```smart header="Las clases de caracteres son abreviaturas (o atajos) para ciertos conjuntos de caracteres."
Por ejemplo:

- **\d** -- es lo mismo que `pattern:[0-9]`,
- **\w** -- es lo mismo que `pattern:[a-zA-Z0-9_]`,
- **\s** -- es lo mismo que `pattern:[\t\n\v\f\r ]`, además de otros caracteres de espacio raros de unicode.
```

### Ejemplo: multi-idioma \w

Como la clase de caracteres `pattern:\w` es una abreviatura de `pattern:[a-zA-Z0-9_]`, no puede coincidir con sinogramas chinos, letras cirílicas, etc.

Podemos escribir un patrón más universal, que busque caracteres de palabra en cualquier idioma. Eso es fácil con las propiedades unicode: `pattern:[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]`.

Decifrémoslo. Similar a `pattern:\w`, estamos creando un conjunto propio que incluye caracteres con las siguientes propiedades unicode:

- `Alfabético` (`Alpha`) - para letras,
- `Marca` (`M`) - para acentos,
- `Numero_Decimal` (`Nd`) - para dígitos,
- `Conector_Puntuación` (`Pc`) - para guión bajo `'_'` y caracteres similares,
- `Control_Unión` (`Join_C`) - dos códigos especiales `200c` and `200d`, utilizado en ligaduras, p.ej. en árabe.

Un ejemplo de uso:

```js run
let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

let str = `Hola 你好 12`;

// encuentra todas las letras y dígitos:
alert( str.match(regexp) ); // H,o,l,a,你,好,1,2
```

Por supuesto, podemos editar este patrón: agregar propiedades unicode o eliminarlas. Las propiedades Unicode se cubren con más detalle en el artículo <info:regexp-unicode>.

```warn header="Las propiedades Unicode no son compatibles con IE"
Las propiedades Unicode `pattern:p{…}` no se implementaron en IE. Si realmente las necesitamos, podemos usar la biblioteca [XRegExp](http://xregexp.com/).

O simplemente usa rangos de caracteres en el idioma de tu interés, p.ej. `pattern:[а-я]` para letras cirílicas.
```

## Excluyendo rangos

Además de los rangos normales, hay rangos "excluyentes" que se parecen a `pattern:[^…]`.

Están denotados por un carácter caret `^` al inicio y coinciden con cualquier carácter *excepto los dados*.

Por ejemplo:

- `pattern:[^aeyo]` -- cualquier carácter excepto  `'a'`, `'e'`, `'y'` u `'o'`.
- `pattern:[^0-9]` -- cualquier carácter excepto un dígito, igual que `pattern:\D`.
- `pattern:[^\s]` -- cualquiere carácter sin espacio, igual que `\S`.

El siguiente ejemplo busca cualquier carácter, excepto letras, dígitos y espacios:

```js run
alert( "alice15@gmail.com".match(/[^\d\sA-Z]/gi) ); // @ y .
```

## Escapando dentro de corchetes […]

Por lo general, cuando queremos encontrar exactamente un carácter especial, necesitamos escaparlo con `pattern:\.`. Y si necesitamos una barra invertida, entonces usamos `pattern:\\`, y así sucesivamente.

Entre corchetes podemos usar la gran mayoría de caracteres especiales sin escaparlos:

- Los símbolos `pattern:. + ( )` nunca necesitan escape.
- Un guión `pattern:-` no se escapa al principio ni al final (donde no define un rango).
- Un carácter caret `pattern:^` solo se escapa al principio (donde significa exclusión).
- El corchete de cierre `pattern:]` siempre se escapa (si se necesita buscarlo).

En otras palabras, todos los caracteres especiales están permitidos sin escapar, excepto cuando significan algo entre corchetes.

Un punto `.` dentro de corchetes significa solo un punto. El patrón `pattern:[.,]` Buscaría uno de los caracteres: un punto o una coma.

En el siguiente ejemplo, la expresión regular `pattern: [-().^+]` busca uno de los caracteres `-().^+`:

```js run
// no es necesario escaparlos
let regexp = /[-().^+]/g;

alert( "1 + 2 - 3".match(regexp) ); // Coincide +, -
```

...Pero si decides escaparlos "por si acaso", no habría daño:

```js run
// Todo escapado
let regexp = /[\-\(\)\.\^\+]/g;

alert( "1 + 2 - 3".match(regexp) ); // funciona también: +, -
```

## Rangos y la bandera (flag) "u"

Si hay pares sustitutos en el conjunto, se requiere la flag `pattern:u` para que funcionen correctamente.

Por ejemplo, busquemos `pattern:[𝒳𝒴]` en la cadena `subject:𝒳`:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/) ); // muestra un carácter extraño, como [?]
// (la búsqueda se realizó incorrectamente, se devolvió medio carácter)
```

El resultado es incorrecto porque, por defecto, las expresiones regulares "no saben" sobre pares sustitutos.

El motor de expresión regular piensa que la cadena `[𝒳𝒴]` no son dos, sino cuatro caracteres:
1. mitad izquierda de `𝒳` `(1)`,
2. mitad derecha de `𝒳` `(2)`,
3. mitad izquierda de `𝒴` `(3)`,
4. mitad derecha de `𝒴` `(4)`.

Sus códigos se pueden mostrar ejecutando:

```js run
for(let i = 0; i < '𝒳𝒴'.length; i++) {
  alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
};
```

Entonces, el ejemplo anterior encuentra y muestra la mitad izquierda de `𝒳`.

Si agregamos la flag `pattern:u`, entonces el comportamiento será correcto:

```js run
alert( '𝒳'.match(/[𝒳𝒴]/u) ); // 𝒳
```

Ocurre una situación similar cuando se busca un rango, como`[𝒳-𝒴]`.

Si olvidamos agregar la flag `pattern:u`, habrá un error:

```js run
'𝒳'.match(/[𝒳-𝒴]/); // Error: Expresión regular inválida
```

La razón es que sin la bandera `pattern:u` los pares sustitutos se perciben como dos caracteres, por lo que `[𝒳-𝒴]` se interpreta como `[<55349><56499>-<55349><56500>]` (cada par sustituto se reemplaza con sus códigos). Ahora es fácil ver que el rango `56499-55349` es inválido: su código de inicio `56499` es mayor que el último `55349`. Esa es la razón formal del error.

Con la bandera `pattern:u` el patrón funciona correctamente:

```js run
// buscar caracteres desde  𝒳  a 𝒵
alert( '𝒴'.match(/[𝒳-𝒵]/u) ); // 𝒴
```
