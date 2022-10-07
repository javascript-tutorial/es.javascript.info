
La etiqueta de apertura es `pattern:\[(b|url|quote)]`.

Luego, para encontrar todo hasta la etiqueta de cierre, usemos el patrón`pattern:.*?` con la bandera `pattern:s` para que coincida con cualquier carácter, incluida la nueva línea, y luego agreguemos una referencia inversa a la etiqueta de cierre.

El patrón completo: `pattern:\[(b|url|quote)\].*?\[/\1]`.

En acción:

```js run
let regexp = /\[(b|url|quote)].*?\[\/\1]/gs;

let str = `
  [b]hello![/b]
  [quote]
    [url]http://google.com[/url]
  [/quote]
`;

alert( str.match(regexp) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]
```

Tenga en cuenta que además de escapar `pattern:[` tuvimos que escapar de una barra para la etiqueta de cierre `pattern:[\/\1]`, porque normalmente la barra cierra el patrón.
