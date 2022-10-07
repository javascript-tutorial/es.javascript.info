Una expresión regular para buscar colores de 3 dígitos `#abc`: `pattern:/#[a-f0-9]{3}/i`.

Podemos agregar exactamente 3 dígitos hexadecimales opcionales más. No necesitamos más ni menos. El color tiene 3 o 6 dígitos.

Utilicemos el cuantificador `pattern:{1,2}` para esto: llegaremos a `pattern:/#([a-f0-9]{3}){1,2}/i`.

Aquí el patrón `pattern:[a-f0-9]{3}` está rodeado en paréntesis para aplicar el cuantificador `pattern:{1,2}`.

En acción:

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef #abc
```

Hay un pequeño problema aquí: el patrón encontrado `match:#abc` en `subject:#abcd`. Para prevenir esto podemos agregar `pattern:\b` al final:

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```
