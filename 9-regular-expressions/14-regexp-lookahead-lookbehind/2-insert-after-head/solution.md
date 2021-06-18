Para insertar algo después de la etiqueta `<body>`, primero debemos encontrarla. Para ello  podemos usar la expresión regular `pattern:<body.*?>`.

En esta tarea no debemos modificar la etiqueta `<body>`. Solamente agregar texto después de ella.

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

Esto funciona así:
- En cada posición en el texto.
- Chequea si está precedida por `pattern:<body.*?>`.
- Si es así, tenemos una coincidencia.

La etiqueta `pattern:<body.*?>` no será devuelta. El resultado de esta expresión regular es un string vacío, pero coincide solo en las posiciones precedidas por `pattern:<body.*?>`.

Entonces reemplaza la "linea vacía", precedida por `pattern:<body.*?>`, con `<h1>Hello</h1>`. Esto es, la inserción después de `<body>`.

P.S. Los indicadores de Regexp tales como `pattern:s` y `pattern:i` también nos pueden ser útiles: `pattern:/<body.*?>/si`. El indicador `pattern:s` hace que que el punto `pattern:.` coincida también con el carácter de salto de línea, y el indicador `pattern:i` hace que `pattern:<body>` también acepte coincidencias `match:<BODY>` en mayúsculas y minúsculas.
