# Encuentra cadenas entre comillas

Crea una expresión regular para encontrar cadenas entre comillas dobles `subject:"..."`.

Las cadenas deben admitir el escape, de la misma manera que lo hacen las cadenas de JavaScript. Por ejemplo, las comillas se pueden insertar como `subject:\"` ,una nueva línea como `subject:\n`, y la doble barra invertida como `subject:\\`.

```js
let str = "Just like \"here\".";
```

Tenga en cuenta, en particular, que una comilla escapada `subject:\"` no termina una cadena.

Por lo tanto, deberíamos buscar de una comilla a otra (la de cierre), ignorando las comillas escapadas en el camino.

Esa es la parte esencial de la tarea, de lo contrario sería trivial.

Ejemplos de cadenas para hacer coincidir:
```js
.. *!*"test me"*/!* ..  
.. *!*"Say \"Hello\"!"*/!* ... (comillas escapadas dentro)
.. *!*"\\"*/!* ..  (doble barra invertida dentro)
.. *!*"\\ \""*/!* ..  (doble barra y comilla escapada dentro.)
```

En JavaScript, necesitamos duplicar las barras para pasarlas directamente a la cadena, así:

```js run
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```
