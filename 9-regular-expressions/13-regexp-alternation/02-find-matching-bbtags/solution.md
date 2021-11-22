
<<<<<<< HEAD
La etiqueta de apertura es `pattern:\[(b|url|quote)\]`.
=======
Opening tag is `pattern:\[(b|url|quote)]`.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

Luego, para encontrar todo hasta la etiqueta de cierre, usemos el patrón`pattern:.*?` con la bandera `pattern:s` para que coincida con cualquier carácter, incluida la nueva línea, y luego agreguemos una referencia inversa a la etiqueta de cierre.

<<<<<<< HEAD
El patrón completo: `pattern:\[(b|url|quote)\].*?\[/\1\]`.
=======
The full pattern: `pattern:\[(b|url|quote)\].*?\[/\1]`.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425

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

<<<<<<< HEAD
Tenga en cuenta que además de escapar `pattern:[` y `pattern:]`, tuvimos que escapar de una barra para la etiqueta de cierre `pattern:[\/\1]`, porque normalmente la barra cierra el patrón.
=======
Please note that besides escaping `pattern:[`, we had to escape a slash for the closing tag `pattern:[\/\1]`, because normally the slash closes the pattern.
>>>>>>> a82915575863d33db6b892087975f84dea6cb425
