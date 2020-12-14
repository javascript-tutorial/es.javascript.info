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
>>>>>>> 23e85b3c33762347e26276ed869e491e959dd557
