# Alternancia (O) |

Alternancia es un término en expresión regular que simplemente significa "O".

En una expresión regular se denota con un carácter de línea vertical `pattern:|`.

Por ejemplo, necesitamos encontrar lenguajes de programación: HTML, PHP, Java o JavaScript.

La expresión regular correspondiente es: `pattern:html|php|java(script)?`.

Un ejemplo de uso:

```js run
let regexp = /html|php|css|java(script)?/gi;

let str = "Primera aparición de HTML, luego CSS, luego JavaScript";

alert( str.match(regexp) ); // 'HTML', 'CSS', 'JavaScript'
```

Ya vimos algo similar: corchetes. Permiten elegir entre varios caracteres, por ejemplo `pattern:gr[ae]y` coincide con `match:gray` o `match:grey`.

Los corchetes solo permiten caracteres o conjuntos de caracteres. La alternancia permite cualquier expresión. Una expresión regular `pattern:A|B|C` significa una de las expresiones `A`, `B` o `C`.

Por ejemplo:

- `pattern:gr(a|e)y` significa exactamente lo mismo que `pattern:gr[ae]y`.
- `pattern:gra|ey` significa `match:gra` o `match:ey`.

Para aplicar la alternancia a una parte elegida del patrón, podemos encerrarla entre paréntesis:
- `pattern:I love HTML|CSS` coincide con `match:I love HTML` o `match:CSS`.
- `pattern:I love (HTML|CSS)` coincide con `match:I love HTML` o `match:I love CSS`.

## Ejemplo: Expresión regular para el tiempo

En artículos anteriores había una tarea para construir una expresión regular para buscar un horario en la forma `hh:mm`, por ejemplo `12:00`. Pero esta simple expresión `pattern:\d\d:\d\d` es muy vaga. Acepta `25:99` como tiempo (ya que 99 segundos coinciden con el patrón, pero ese tiempo no es válido).

¿Cómo podemos hacer un mejor patrón?

Podemos utilizar una combinación más cuidadosa. Primero, las horas:

- Si el primer dígito es `0` o `1`, entonces el siguiente dígito puede ser cualquiera: `pattern:[01]\d`.
- De otra manera, si el primer dígito es `2`, entonces el siguiente debe ser `pattern:[0-3]`.
- (no se permite ningún otro dígito)

Podemos escribir ambas variantes en una expresión regular usando alternancia: `pattern:[01]\d|2[0-3]`.

A continuación, los minutos deben estar comprendidos entre `00` y `59`. En el lenguaje de expresiones regulares se puede escribir como `pattern:[0-5]\d`: el primer dígito `0-5`, y luego cualquier otro.

Si pegamos minutos y segundos juntos, obtenemos el patrón: `pattern:[01]\d|2[0-3]:[0-5]\d`.

Ya casi terminamos, pero hay un problema. La alternancia `pattern:|` ahora pasa a estar entre `pattern:[01]\d` y `pattern:2[0-3]:[0-5]\d`.

Es decir: se agregan minutos a la segunda variante de alternancia, aquí hay una imagen clara:

```
[01]\d  |  2[0-3]:[0-5]\d
```

Este patrón busca `pattern:[01]\d` o `pattern:2[0-3]:[0-5]\d`.

Pero eso es incorrecto, la alternancia solo debe usarse en la parte "horas" de la expresión regular, para permitir `pattern:[01]\d` O `pattern:2[0-3]`. Corregiremos eso encerrando las "horas" entre paréntesis: `pattern:([01]\d|2[0-3]):[0-5]\d`.

La solución final sería:

```js run
let regexp = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(regexp)); // 00:00,10:10,23:59
```
