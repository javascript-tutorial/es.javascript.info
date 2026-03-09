
Podrías notar lo siguiente:

```js no-beautify
function pow(x,n)  // <- sin espacio entre argumentos
{  // <- llave en una línea separada
  let result=1;   // <- sin espacios antes o después de =
  for(let i=0;i<n;i++) {result*=x;}   // <- sin espacios
  // el contenido de { ... } debe estar en una nueva línea
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'') // <-- técnicamente posible,
// pero mejor que sean 2 líneas. También faltan espacios y el ";"
if (n<0)  // <- sin espacios dentro (n <= 0), y debe haber una línea extra por encima
{   // <- llave en una línea separada
  // debajo - las líneas largas se pueden dividir en varias líneas para mejorar la legibilidad
  alert(`Potencia ${n} no está soportada, por favor ingrese un número entero mayor que cero`);
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
  alert(`Potencia ${n} no está soportada,
 por favor ingrese un número entero mayor que cero`);
} else {
  alert( pow(x, n) );
}
```
