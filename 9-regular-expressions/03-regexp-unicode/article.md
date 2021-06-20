# Unicode: bandera "u" y clase \p{...}

JavaScript utiliza [codificación Unicode](https://en.wikipedia.org/wiki/Unicode) para las cadenas. La mayoría de los caracteres están codificados con 2 bytes, esto permite representar un máximo de 65536 caracteres.

Ese rango no es lo suficientemente grande como para codificar todos los caracteres posibles, es por eso que algunos caracteres raros se codifican con 4 bytes, por ejemplo como `𝒳` (X matemática) o `😄` (una sonrisa), algunos sinogramas, etc.

Aquí los valores unicode de algunos caracteres:

| Carácter  | Unicode | conteo de Bytes en unicode  |
|------------|---------|--------|
| a | `0x0061` |  2 |
| ≈ | `0x2248` |  2 |
|𝒳| `0x1d4b3` | 4 |
|𝒴| `0x1d4b4` | 4 |
|😄| `0x1f604` | 4 |

Entonces los caracteres como `a` e `≈` ocupan 2 bytes, mientras que los códigos para `𝒳`, `𝒴` y `😄` son más largos, tienen 4 bytes.

Hace mucho tiempo, cuando se creó el lenguaje JavaScript, la codificación Unicode era más simple: no había caracteres de 4 bytes. Por lo tanto, algunas características del lenguaje aún los manejan incorrectamente.

Por ejemplo, aquí `length` interpreta que hay dos caracteres:

```js run
alert('😄'.length); // 2
alert('𝒳'.length); // 2
```

...Pero podemos ver que solo hay uno, ¿verdad? El punto es que `length` maneja 4 bytes como dos caracteres de 2 bytes. Eso es incorrecto, porque debe considerarse como uno solo (el llamado "par sustituto", puede leer sobre ellos en el artículo <info:string>).

Por defecto, las expresiones regulares manejan los "caracteres largos" de 4 bytes como un par de caracteres de 2 bytes cada uno. Y, como sucede con las cadenas, eso puede conducir a resultados extraños. Lo veremos un poco más tarde, en el artículo <info:regexp-character-sets-and-range>.

A diferencia de las cadenas, las expresiones regulares tienen la bandera `pattern:u` que soluciona tales problemas. Con dicha bandera, una expresión regular maneja correctamente los caracteres de 4 bytes. Y podemos usar la búsqueda de propiedades Unicode, que veremos a continuación.

## Propiedades Unicode \p{...}

Cada carácter en Unicode tiene varias propiedades. Describen a qué "categoría" pertenece el carácter, contienen información diversa al respecto.

Por ejemplo, si un carácter tiene la propiedad `Letter`, significa que pertenece a un alfabeto (de cualquier idioma). Y la propiedad `Number` significa que es un dígito: tal vez árabe o chino, y así sucesivamente.

Podemos buscar caracteres por su propiedad, usando `pattern:\p{...}`. Para usar `pattern:\p{...}`, una expresión regular debe usar también `pattern:u`.

Por ejemplo, `\p{Letter}` denota una letra en cualquiera de los idiomas. También podemos usar `\p{L}`, ya que `L` es un alias de `Letter`. Casi todas las propiedades tienen alias cortos.

En el ejemplo a continuación se encontrarán tres tipos de letras: inglés, georgiano y coreano.

```js run
let str = "A ბ ㄱ";

alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
alert( str.match(/\p{L}/g) ); // null (sin coincidencia, como no hay bandera "u")
```

Estas son las principales categorías y subcategorías de caracteres:

- Letter (Letra) `L`:
  - lowercase (minúscula) `Ll`
  - modifier (modificador) `Lm`,
  - titlecase (capitales) `Lt`,
  - uppercase (mayúscula) `Lu`,
  - other (otro) `Lo`.
- Number (número) `N`:
  - decimal digit (dígito decimal) `Nd`,
  - letter number (número de letras) `Nl`,
  - other (otro) `No`.
- Punctuation (puntuación) `P`:
  - connector (conector) `Pc`,
  - dash (guión) `Pd`,
  - initial quote (comilla inicial) `Pi`,
  - final quote (comilla final) `Pf`,
  - open (abre) `Ps`,
  - close (cierra) `Pe`,
  - other (otro) `Po`.
- Mark (marca) `M` (acentos etc):
  - spacing combining (combinación de espacios) `Mc`,
  - enclosing (encerrado) `Me`,
  - non-spacing (sin espaciado) `Mn`.
- Symbol (símbolo) `S`:
  - currency (moneda) `Sc`,
  - modifier (modificador) `Sk`,
  - math (matemática) `Sm`,
  - other (otro) `So`.
- Separator (separador) `Z`:
  - line (línea) `Zl`,
  - paragraph (párrafo)`Zp`,
  - space (espacio) `Zs`.
- Other (otros) `C`:
  - control `Cc`,
  - format (formato) `Cf`,
  - not assigned (sin asignación) `Cn`,
  - private use (uso privado) `Co`,
  - surrogate (sustituto) `Cs`.

Entonces, por ejemplo si necesitamos letras en minúsculas, podemos escribir `pattern:\p{Ll}`, signos de puntuación: `pattern:\p{P}` y así sucesivamente.

También hay otras categorías derivadas, como:
- `Alphabetic` (alfabético) (`Alfa`), incluye letras `L`, más números de letras `Nl` (por ejemplo, Ⅻ - un carácter para el número romano 12), y otros símbolos `Other_Alphabetic` (`OAlpha`).
- `Hex_Digit` incluye dígitos hexadecimales: `0-9`, `a-f`.
- ...Y así.

Unicode admite muchas propiedades diferentes, la lista completa es muy grande, estas son las referencias:

- Lista de todas las propiedades por carácter: https://unicode.org/cldr/utility/character.jsp (enlace no disponible).
- Lista de caracteres por propiedad: <https://unicode.org/cldr/utility/list-unicodeset.jsp>. (enlace no disponible)
- Alias cortos para propiedades: <https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt>.
- Aquí una base completa de caracteres Unicode en formato de texto, con todas las propiedades: <https://www.unicode.org/Public/UCD/latest/ucd/>.

### Ejemplo: números hexadecimales

Por ejemplo, busquemos números hexadecimales, escritos como `xFF` donde` F` es un dígito hexadecimal (0..9 o A..F).

Un dígito hexadecimal se denota como `pattern:\p{Hex_Digit}`:

```js run
let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

alert("número: xAF".match(regexp)); // xAF
```

### Ejemplo: sinogramas chinos

Busquemos sinogramas chinos.

Hay una propiedad Unicode `Script` (un sistema de escritura), que puede tener un valor: `Cyrillic`, `Greek`, `Arabic`, `Han` (chino), etc. [lista completa](https://en.wikipedia.org/wiki/Script_(Unicode)).

Para buscar caracteres de un sistema de escritura dado, debemos usar `pattern:Script=<value>`, por ejemplo para letras cirílicas: `pattern:\p{sc=Cyrillic}`, para sinogramas chinos: `pattern:\p{sc=Han}`, y así sucesivamente:

```js run
let regexp = /\p{sc=Han}/gu; // devuelve sinogramas chinos

let str = `Hello Привет 你好 123_456`;

alert( str.match(regexp) ); // 你,好
```

### Ejemplo: moneda

Los caracteres que denotan una moneda, como `$`, `€`, `¥`, tienen la propiedad unicode `pattern:\p{Currency_Symbol}`, el alias corto: `pattern:\p{Sc}`.

Usémoslo para buscar precios en el formato "moneda, seguido de un dígito":

```js run
let regexp = /\p{Sc}\d/gu;

let  str = `Precios: $2, €1, ¥9`;

alert( str.match(regexp) ); // $2,€1,¥9
```

Más adelante, en el artículo <info:regexp-quantifiers> veremos cómo buscar números que contengan muchos dígitos.

## Resumen

La bandera `pattern:u` habilita el soporte de Unicode en expresiones regulares.

Eso significa dos cosas:

1. Los caracteres de 4 bytes se manejan correctamente: como un solo carácter, no dos caracteres de 2 bytes.
2. Las propiedades Unicode se pueden usar en las búsquedas: `\p{…}`.

Con las propiedades Unicode podemos buscar palabras en determinados idiomas, caracteres especiales (comillas, monedas), etc.
