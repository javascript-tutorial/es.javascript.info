<<<<<<< HEAD
# Encontrar las etiquetas HTML

Crear una expresión regular para encontrar todas las etiquetas HTML (de apertura y cierre) con sus atributos.

Un ejemplo de uso:

```js run
let regexp = /tu regexp/g;

let str = '<> <a href="/"> <input type="radio" checked > <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked >', '<b>'
```

Asumimos que los atributos de etiqueta no deben contener `<` ni `>` (dentro de comillas dobles también), esto simplifica un poco las cosas. 
=======
# Find HTML tags

Create a regular expression to find all (opening and closing) HTML tags with their attributes.

An example of use:

```js run
let regexp = /your regexp/g;

let str = '<> <a href="/"> <input type="radio" checked> <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'
```

Here we assume that tag attributes may not contain `<` and `>` (inside squotes too), that simplifies things a bit. 
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
