
El inicio del patrón es obvio: `pattern:<style`.

...Pero entonces no podemos simplemente escribir `pattern:<style.*?>`, porque `match:<styler>` coincidiría.

Necesitamos un espacio después `match:<style` y luego, opcionalmente, algo más o el final `match:>`.

En el lenguaje de expresión regular: `pattern:<style(>|\s.*?>)`.

En acción:

```js run
let regexp = /<style(>|\s.*?>)/g;

alert( '<style> <styler> <style test="...">'.match(regexp) ); // <style>, <style test="...">
```
