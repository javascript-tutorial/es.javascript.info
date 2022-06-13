Para insertar algo después de la etiqueta `<body>`, primero debemos encontrarla. Para ello  podemos usar la expresión regular `pattern:<body.*?>`.

<<<<<<< HEAD
En esta tarea no debemos modificar la etiqueta `<body>`. Solamente agregar texto después de ella.
=======
In this task, we don't need to modify the `<body>` tag. We only need to add the text after it.
>>>>>>> 7bb6066eb6ea3a030b875cdc75433c458f80997e

Veamos cómo podemos hacerlo:

```js run
let str = '...<body style="...">...';
str = str.replace(/<body.*?>/, '$&<h1>Hello</h1>');

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

En el string de reemplazo, `$&` significa la coincidencia misma, la parte del texto original que corresponde a `pattern:<body.*?>`. Es reemplazada por sí misma más `<h1>Hello</h1>`.

Una alternativa es el uso de "lookbehind":

```js run
let str = '...<body style="...">...';
str = str.replace(/(?<=<body.*?>)/, `<h1>Hello</h1>`);

alert(str); // ...<body style="..."><h1>Hello</h1>...
```

Como puedes ver, solo está presente la parte "lookbehind" en esta expresión regular.

<<<<<<< HEAD
Esto funciona así:
- En cada posición en el texto.
- Chequea si está precedida por `pattern:<body.*?>`.
- Si es así, tenemos una coincidencia.

La etiqueta `pattern:<body.*?>` no será devuelta. El resultado de esta expresión regular es un string vacío, pero coincide solo en las posiciones precedidas por `pattern:<body.*?>`.

Entonces reemplaza la "linea vacía", precedida por `pattern:<body.*?>`, con `<h1>Hello</h1>`. Esto es, la inserción después de `<body>`.
=======
It works like this:
- At every position in the text.
- Check if it's preceded by `pattern:<body.*?>`.
- If it's so, then we have the match.

The tag `pattern:<body.*?>` won't be returned. The result of this regexp is literally an empty string, but it matches only at positions preceded by `pattern:<body.*?>`.

So it replaces the "empty line", preceded by `pattern:<body.*?>`, with `<h1>Hello</h1>`. That's the insertion after `<body>`.
>>>>>>> 7bb6066eb6ea3a030b875cdc75433c458f80997e

P.S. Los indicadores de Regexp tales como `pattern:s` y `pattern:i` también nos pueden ser útiles: `pattern:/<body.*?>/si`. El indicador `pattern:s` hace que que el punto `pattern:.` coincida también con el carácter de salto de línea, y el indicador `pattern:i` hace que `pattern:<body>` también acepte coincidencias `match:<BODY>` en mayúsculas y minúsculas.
