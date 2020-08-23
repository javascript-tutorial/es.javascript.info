# Encontrar las etiquetas HTML

Crear una expresión regular para encontrar todas las etiquetas HTML (de apertura y cierre) con sus atributos.

Un ejemplo de uso:

```js run
let regexp = /tu regexp/g;

let str = '<> <a href="/"> <input type="radio" checked > <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked >', '<b>'
```

Asumimos que los atributos de etiqueta no deben contener `<` ni `>` (dentro de comillas dobles también), esto simplifica un poco las cosas. 
