# Operador Nullish Coalescing '??'

[recent browser="new"]

El operador "nullish coalescing" (fusión de null) se escribe con un doble signo de cierre de interrogación `??`.

Como este trata a `null` y a `undefined` de forma similar, usaremos un término especial para este artículo. Diremos que una expresión es "definida" cuando no es `null` ni `undefined`.

El resultado de `a ?? b`:
- si `a` está "definida", será `a`, 
- si `a` no está "definida", será `b`.

Es decir, `??` devuelve el primer argumento cuando este no es `null` ni `undefined`. En caso contrario, devuelve el segundo.

El operador "nullish coalescing" no es algo completamente nuevo. Es solamente una sintaxis agradable para obtener el primer valor "definido" de entre dos.

Podemos reescribir `result = a ?? b` usando los operadores que ya conocemos:

```js
result = (a !== null && a !== undefined) ? a : b;
```

Ahora debería estar absolutamente claro lo que `??` hace. Veamos dónde podemos utilizarlo.

El uso típico de `??` es brindar un valor predeterminado.

Por ejemplo, aquí mostramos `user` si su valor está "definido" (que no es `null` ni `undefined`). De otro modo, muestra `Anonymous`:

```js run
let user;

alert(user ?? "Anonymous"); // Anonymous (user no definido)
```

Aquí el ejemplo de `user` con un nombre asignado:

```js run
let user = "John";

alert(user ?? "Anonymous"); // John (user definido)
```

También podemos usar una secuencia de `??` para seleccionar el primer valor que no sea `null/undefined` de una lista.

Digamos que tenemos los datos de un usuario en las variables `firstName`, `lastName` y `nickName`. Todos ellos podrían ser indefinidos si el usuario decide no ingresar los valores correspondientes.

Queremos mostrar un nombre usando una de estas variables, o mostrar "anónimo" si todas ellas son `null/undefined`.

Usemos el operador `??` para ello:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// Muestra el primer valor definido:
*!*
alert(firstName ?? lastName ?? nickName ?? "Anonymous"); // Supercoder
*/!*
```

## Comparación con ||

El operador OR `||` puede ser usado de la misma manera que `??`, tal como está explicado en el [capítulo previo](info:logical-operators#or-finds-the-first-truthy-value)

Por ejemplo, en el código de arriba podemos reemplazar `??` por `||` y obtener el mismo resultado:

```js run
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// muestra el primer valor "verdadero":
*!*
alert(firstName || lastName || nickName || "Anonymous"); // Supercoder
*/!*
```

Históricamente, el operador OR `||` estuvo primero. Existe desde el origen de JavaScript, así que los desarrolladores lo estuvieron usando para tal propósito durante mucho tiempo.

Por otro lado, el operador "nullish coalescing" `??` fue una adición reciente, y la razón es que la gente no estaba del todo satisfecha con `||`.

La gran diferencia es que:
- `||` devuelve el primer valor *verdadero*.
- `??` devuelve el primer valor *definido*.

El `||` no distingue entre `false`, `0`, un string vacío `""`, y `null/undefined`.  Todos son lo mismo: valores "falsos". Si cualquiera de ellos es el primer argumento de `||`, obtendremos el segundo argumento como resultado. 

Pero en la práctica podemos querer usar el valor predeterminado solamente cuando la variable es `null/undefined`, es decir cuando el valor realmente es desconocido o no fue establecido.

Por ejemplo considera esto:

```js run
let height = 0; // altura cero

alert(height || 100); // 100
alert(height ?? 100); // 0
```

`height || 100` verifica si `height` es "falso", y `0` lo es. 
    - así el resultado de `||` es el segundo argumento, `100`.
`height ?? 100` verifica si `height` es `null/undefined`, y no lo es.
    - así el resultado es `height` como está, que es `0`.

En la práctica, una altura cero es a menudo un valor válido que no debería ser reemplazado por un valor por defecto. En este caso `??` hace lo correcto.

## Precedencia

La precedencia del operador `??` es la misma de `||`. Ambos son iguales a `4` en la [Tabla MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Operator_Precedence#Table).

Esto significa que ambos operadores, `||` y `??`, son evaluados antes que `=` y `?`, pero después de la mayoría de las demás operaciones como `+` y `*`. 

Así que podemos necesitar añadir paréntesis:

```js run
let height = null;
let width = null;

// Importante: usar paréntesis
let area = (height ?? 100) * (width ?? 50);

alert(area); // 5000
```

Caso contrario, si omitimos los paréntesis, entonces `*` tiene una mayor precedencia y se ejecutará primero. Eso sería lo mismo que:

```js
// sin paréntesis
let area = height ?? 100 * width ?? 50;

// ...funciona de esta forma (no es lo que queremos):
let area = height ?? (100 * width) ?? 50;
```

### Uso de ?? con && y ||

Por motivos de seguridad, JavaScript prohíbe el uso de `??` junto con los operadores `&&` y `||`, salvo que la precedencia sea explícitamente especificada con paréntesis.

El siguiente código desencadena un error de sintaxis:

```js run
let x = 1 && 2 ?? 3; // Syntax error
```

La limitación es debatible. Fue agregada a la especificación del lenguaje con propósito de evitar equivocaciones cuando la gente comenzara a reemplazar `||` por `??`.

Usa paréntesis explícitos para solucionarlo:

```js run
*!*
let x = (1 && 2) ?? 3; // Funciona
*/!*

alert(x); // 2
```

## Resumen

- El operador "nullish coalescing" `??` brinda una manera concisa de seleccionar un valor "definido" de una lista.

    Es usado para asignar valores por defecto a las variables:

    ```js
    // Asignar height=100, si height es null o undefined
    height = height ?? 100;
    ```

- El operador `??` tiene una precedencia muy baja, un poco más alta que `?` y `=`.
- Está prohibido su uso con `||` y `&&` sin paréntesis explícitos.
