# Insertar después de la cabecera

Tenemos un string con un documento HTML.

Escribe una expresión regular que inserte `<h1>Hello</h1>` inmediatamente después de la etiqueta `<body>`. La etiqueta puede tener atributos.

Por ejemplo:

```js
let regexp = /tu expresión regular/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

<<<<<<< HEAD
Después de esto el valor de `str` debe ser:
=======
After that the value of `str` should be:

>>>>>>> 7bb6066eb6ea3a030b875cdc75433c458f80997e
```html
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```
