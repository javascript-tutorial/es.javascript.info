
```js run demo
function readNumber() {
  let num;

  do {
    num = prompt("Enter a number please?", 0);
  } while ( !isFinite(num) );

  if (num === null || num === '') return null;
  
  return +num;
}

alert(`Read: ${readNumber()}`);
```

La solución es un poco más intrincada de lo que podría porque necesitamos manejar `null`/líneas vacías.

Entonces pedimos ingresos hasta que sea un "número regular".  Tanto `null` (cancel) como las líneas vacías encajan en esa condición porque un su forma numérica estos son `0`.

Una vez detenido el ingreso, necesitamos tratar especialmente los casos `null` y línea vacía (return `null`), porque convertirlos devolverían `0`.

