<<<<<<< HEAD
Una expresión regular para buscar colores de 3 dígitos `#abc`: `pattern:/#[a-f0-9]{3}/i`.

Podemos agregar exactamente 3 dígitos hexadecimales opcionales más. No necesitamos más ni menos. El color tiene 3 o 6 dígitos.

Utilizemos el cuantificador `pattern:{1,2}` para esto: llegaremos a `pattern:/#([a-f0-9]{3}){1,2}/i`.

Aquí el patrón `pattern:[a-f0-9]{3}` está rodeado en paréntesis para aplicar el cuantificador `pattern:{1,2}`.

En acción:
=======
A regexp to search 3-digit color `#abc`: `pattern:/#[a-f0-9]{3}/i`.

We can add exactly 3 more optional hex digits. We don't need more or less. The color has either 3 or 6 digits.

Let's use the quantifier `pattern:{1,2}` for that: we'll have `pattern:/#([a-f0-9]{3}){1,2}/i`.

Here the pattern `pattern:[a-f0-9]{3}` is enclosed in parentheses to apply the quantifier `pattern:{1,2}`.

In action:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
let regexp = /#([a-f0-9]{3}){1,2}/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef #abc
```

<<<<<<< HEAD
Hay un pequeño problema aquí: el patrón encontrado `match:#abc` en `subject:#abcd`. Para prevenir esto podemos agregar `pattern:\b` al final:
=======
There's a minor problem here: the pattern found `match:#abc` in `subject:#abcd`. To prevent that we can add `pattern:\b` to the end:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
let regexp = /#([a-f0-9]{3}){1,2}\b/gi;

let str = "color: #3f3; background-color: #AA00ef; and: #abcd";

alert( str.match(regexp) ); // #3f3 #AA00ef
```
