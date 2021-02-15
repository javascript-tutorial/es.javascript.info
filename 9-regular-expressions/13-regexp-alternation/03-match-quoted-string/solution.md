La solución: `pattern:/"(\\.|[^"\\])*"/g`.

El paso a paso:

<<<<<<< HEAD
- Primero buscamos una comilla de apertura `pattern:"`
- Entonces, si tenemos una barra invertida `pattern:\\` (tenemos que duplicarla en el patrón porque es un carácter especial), y luego cualquier carácter está bien después de él (un punto).
- De lo contrario, tomamos cualquier carácter excepto una comilla (que significaría el final de la cadena) y una barra invertida (para evitar barras invertidas solitarias, la barra invertida solo se usa con algún otro símbolo después): `pattern:[^"\\]`
- ...Y así sucesivamente hasta la comilla de cierre.
=======
- First we look for an opening quote `pattern:"`
- Then if we have a backslash `pattern:\\` (we have to double it in the pattern because it is a special character), then any character is fine after it (a dot).
- Otherwise we take any character except a quote (that would mean the end of the string) and a backslash (to prevent lonely backslashes, the backslash is only used with some other symbol after it): `pattern:[^"\\]`
- ...And so on till the closing quote.
>>>>>>> 7533c719fbf62ba57188d6d51fe4c038b282bd0c

En acción:

```js run
let regexp = /"(\\.|[^"\\])*"/g;
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

alert( str.match(regexp) ); // "test me","Say \"Hello\"!","\\ \""
```
