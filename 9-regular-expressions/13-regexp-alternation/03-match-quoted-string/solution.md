La solución: `pattern:/"(\\.|[^"\\])*"/g`.

El paso a paso:

- Primero buscamos una comilla de apertura `pattern:"`
- Luego, si tenemos una barra invertida `pattern:\\` (tenemos que duplicarla en el patrón porque es un carácter especial). Luego, cualquier carácter está bien después de él (un punto).
- De lo contrario, tomamos cualquier carácter excepto una comilla (que significaría el final de la cadena) y una barra invertida (para evitar barras invertidas solitarias, la barra invertida solo se usa con algún otro símbolo después): `pattern:[^"\\]`
- ...Y así sucesivamente hasta la comilla de cierre.

En acción:

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""
```
