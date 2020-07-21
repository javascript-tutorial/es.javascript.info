Toma nota del sutil pero importante detalle de la solución. No convertimos `value` a número instantáneamente después de `prompt`, porque después de `value = +value` no seríamos capaces de diferenciar una cadena vacía (señal de detención) de un cero (un número válido). Lo hacemos más adelante.


```js run demo
function sumInput() {
 
  let numbers = [];

  while (true) {

    let value = prompt("Un número, por favor...", 0);

    // ¿Debemos cancelar?
    if (value === "" || value === null || !isFinite(value)) break;

    numbers.push(+value);
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert( sumInput() ); 
```
