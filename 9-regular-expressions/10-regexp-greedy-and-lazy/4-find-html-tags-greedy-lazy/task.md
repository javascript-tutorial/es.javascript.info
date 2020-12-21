# Encontrar las etiquetas HTML

Crear una expresión regular para encontrar todas las etiquetas HTML (de apertura y cierre) con sus atributos.

Un ejemplo de uso:

```js run
let regexp = /tu regexp/g;

let str = '<> <a href="/"> <input type="radio" checked > <b>';

alert( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked >', '<b>'
```

<<<<<<< HEAD
Asumimos que los atributos de etiqueta no deben contener `<` ni `>` (dentro de comillas dobles también), esto simplifica un poco las cosas. 
=======
Here we assume that tag attributes may not contain `<` and `>` (inside quotes too), that simplifies things a bit.
>>>>>>> fc3f811c03ca97ff8304271bb2b918413bed720f
