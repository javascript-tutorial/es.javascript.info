
Podrías notar lo siguiente:

```js no-beautify
<<<<<<< HEAD
function pow(x,n)  // <- sin espacio entre argumentos
{  // <- llave en una línea separada
  let result=1;   // <- sin espacios antes o después de =
  for(let i=0;i<n;i++) {result*=x;}   // <- sin espacios
  // el contenido de {...} debe estar en una nueva línea
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- técnicamente posible,
// pero mejor que sea 2 líneas, también no hay espacios y falta ;
if (n<0)  // <- sin espacios dentro (n < 0), y debe haber una línea extra por encima
{   // <- llave en una línea separada
  // debajo - las líneas largas se pueden dividir en varias líneas para mejorar la legibilidad
=======
function pow(x,n)  // <- no space between arguments
{  // <- curly brace on a separate line
  let result=1;   // <- no spaces before or after =
  for(let i=0;i<n;i++) {result*=x;}   // <- no spaces
  // the contents of { ... } should be on a new line
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- technically possible,
// but better make it 2 lines, also there's no spaces and missing ;
if (n<=0)  // <- no spaces inside (n <= 0), and should be extra line above it
{   // <- curly brace on a separate line
  // below - long lines can be split into multiple lines for improved readability
>>>>>>> 52c1e61915bc8970a950a3f59bd845827e49b4bf
  alert(`Power ${n} is not supported, please enter an integer number greater than zero`);
}
else // <- podría escribirlo en una sola línea como "} else {"
{
  alert(pow(x,n))  // sin espacios y falta ;
}
```

La variante corregida:

```js
function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", "");
let n = prompt("n?", "");

if (n <= 0) {
  alert(`Power ${n} is not supported,
    please enter an integer number greater than zero`);
} else {
  alert( pow(x, n) );
}
```
