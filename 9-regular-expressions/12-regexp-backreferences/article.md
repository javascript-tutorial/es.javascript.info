# Referencias inversas en patrones: \N y \k<nombre>

Podemos utilizar el contenido de los grupos de captura `pattern:(...)` no solo en el resultado o en la cadena de reemplazo, sino también en el patrón en sí.

## Referencia inversa por número: \N

Se puede hacer referencia a un grupo en el patrón usando `pattern:\N`, donde `N` es el número de grupo.

Para aclarar por qué es útil, consideremos una tarea.

Necesitamos encontrar una cadena entre comillas: con cualquiera de los dos tipos, comillas simples `subject:'...'` o comillas dobles `subject:"..."` -- ambas variantes deben coincidir.

¿Cómo encontrarlas?

Ambos tipos de comillas se pueden poner entre corchetes: `pattern:['"](.*?)['"]`, pero encontrará cadenas con comillas mixtas, como `match:"...'` y `match:'..."`. Eso conduciría a coincidencias incorrectas cuando una cita aparece dentro de otra., como en la cadena `subject:"She's the one!"` (en este ejemplo los strings no se traducen por el uso de la comilla simple):

```js run
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// El resultado no es el que nos gustaría tener
alert( str.match(regexp) ); // "She'
```

Como podemos ver, el patrón encontró una cita abierta `match:"`, luego se consume el texto hasta encontrar la siguiente comilla `match:'`, esta cierra la coincidencia.

Para asegurar que el patrón busque la comilla de cierre exactamente igual que la de apertura, se pone dentro de un grupo de captura y se hace referencia inversa al 1ero: `pattern:(['"])(.*?)\1`.

Aquí está el código correcto:

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(['"])(.*?)\1/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```

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

```js run
let str = `He said: "She's the one!".`;

*!*
let regexp = /(?<quote>['"])(.*?)\k<quote>/g;
*/!*

alert( str.match(regexp) ); // "She's the one!"
```
