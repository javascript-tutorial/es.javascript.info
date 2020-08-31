<<<<<<< HEAD
# Referencias inversas en patrones: \N y \k<nombre>

Podemos utilizar el contenido de los grupos de captura `pattern:(...)` no solo en el resultado o en la cadena de reemplazo, sino también en el patrón en sí.

## Referencia inversa por número: \N

Se puede hacer referencia a un grupo en el patrón usando `pattern:\N`, donde `N` es el número de grupo.

Para aclarar por qué es útil, consideremos una tarea.

Necesitamos encontrar una cadena entre comillas: con cualquiera de los dos tipos, comillas simples `subject:'...'` o comillas dobles `subject:"..."` -- ambas variantes deben coincidir.

¿Cómo encontrarlas?

Ambos tipos de comillas se pueden poner entre corchetes: `pattern:['"](.*?)['"]`, pero encontrará cadenas con comillas mixtas, como `match:"...'` y `match:'..."`. Eso conduciría a coincidencias incorrectas cuando una cita aparece dentro de otra., como en la cadena `subject:"She's the one!"` (en este ejemplo los strings no se traducen por el uso de la comilla simple):
=======
# Backreferences in pattern: \N and \k<name>

We can use the contents of capturing groups `pattern:(...)` not only in the result or in the replacement string, but also in the pattern itself.

## Backreference by number: \N

A group can be referenced in the pattern using `pattern:\N`, where `N` is the group number.

To make clear why that's helpful, let's consider a task.

We need to find quoted strings: either single-quoted `subject:'...'` or a double-quoted `subject:"..."` -- both variants should match.

How to find them?

We can put both kinds of quotes in the square brackets: `pattern:['"](.*?)['"]`, but it would find strings with mixed quotes, like `match:"...'` and `match:'..."`. That would lead to incorrect matches when one quote appears inside other ones, like in the string `subject:"She's the one!"`:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

<<<<<<< HEAD
// El resultado no es el que nos gustaría tener
alert( str.match(regexp) ); // "She'
```

Como podemos ver, el patrón encontró una cita abierta `match:"`, luego se consume el texto hasta encontrar la siguiente comilla `match:'`, esta cierra la coincidencia.

Para asegurar que el patrón busque la comilla de cierre exactamente igual que la de apertura, se pone dentro de un grupo de captura y se hace referencia inversa al 1ero: `pattern:(['"])(.*?)\1`.

Aquí está el código correcto:
=======
// The result is not what we'd like to have
alert( str.match(regexp) ); // "She'
```

As we can see, the pattern found an opening quote `match:"`, then the text is consumed till the other quote `match:'`, that closes the match.

To make sure that the pattern looks for the closing quote exactly the same as the opening one, we can wrap it into a capturing group and backreference it: `pattern:(['"])(.*?)\1`.

Here's the correct code:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

<<<<<<< HEAD
¡Ahora funciona! El motor de expresiones regulares encuentra la primera comilla `pattern:(['"])` y memoriza su contenido. Este es el primer grupo de captura.

Continuando en el patrón, `pattern:\1` significa "encuentra el mismo texto que en el primer grupo", en nuestro caso exactamente la misma comilla.

Similar a esto, `pattern:\2` debería significar: el contenido del segundo grupo, `pattern:\3` - del tercer grupo, y así sucesivamente.

```smart
Si usamos `?:` en el grupo, entonces no lo podremos referenciar. Los grupos que se excluyen de las capturas `(?:...)` no son memorizados por el motor.
```

```warn header="No confundas: el patrón `pattern:\1`, con el reemplazo: `pattern:$1`"
En el reemplazo de cadenas usamos el signo dólar: `pattern:$1`, mientras que en el patrón - una barra invertida `pattern:\1`.
```

## Referencia inversa por nombre: `\k<nombre>`

Si una regexp tiene muchos paréntesis, es conveniente asignarle nombres.

Para referenciar un grupo con nombre usamos `pattern:\k<nombre>`.

En el siguiente ejemplo, el grupo con comillas se llama `pattern:?<quote>`, entonces la referencia inversa es `pattern:\k<quote>`:
=======
Now it works! The regular expression engine finds the first quote `pattern:(['"])` and memorizes its content. That's the first capturing group.

Further in the pattern `pattern:\1` means "find the same text as in the first group", exactly the same quote in our case.

Similar to that, `pattern:\2` would mean the contents of the second group, `pattern:\3` - the 3rd group, and so on.

```smart
If we use `?:` in the group, then we can't reference it. Groups that are excluded from capturing `(?:...)` are not memorized by the engine.
```

```warn header="Don't mess up: in the pattern `pattern:\1`, in the replacement: `pattern:$1`"
In the replacement string we use a dollar sign: `pattern:$1`, while in the pattern - a backslash `pattern:\1`.
```

## Backreference by name: `\k<name>`

If a regexp has many parentheses, it's convenient to give them names.

To reference a named group we can use `pattern:\k<name>`.

In the example below the group with quotes is named `pattern:?<quote>`, so the backreference is `pattern:\k<quote>`:
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```
