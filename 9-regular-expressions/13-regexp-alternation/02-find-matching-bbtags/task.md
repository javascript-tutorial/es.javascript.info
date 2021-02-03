# Encuentra la pareja bbtag 

Un "bb-tag" se ve como `[tag]...[/tag]`, donde `tag` es uno de: `b`, `url` o `quote`.

Por ejemplo:
```
[b]text[/b]
[url]http://google.com[/url]
```

BB-tags se puede anidar. Pero una etiqueta no se puede anidar en sí misma, por ejemplo:

```
Normal:
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

No puede suceder:
[b][b]text[/b][/b]
```

Las etiquetas pueden contener saltos de línea, eso es normal:

```
[quote]
  [b]text[/b]
[/quote]
```

Cree una expresión regular para encontrar todas las BB-tags con su contenido.

Por ejemplo:

```js
let regexp = /your regexp/flags;

let str = "..[url]http://google.com[/url]..";
alert( str.match(regexp) ); // [url]http://google.com[/url]
```

Si las etiquetas están anidadas, entonces necesitamos la etiqueta externa (si queremos podemos continuar la búsqueda en su contenido):

```js
let regexp = /your regexp/flags;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(regexp) ); // [url][b]http://google.com[/b][/url]
```
