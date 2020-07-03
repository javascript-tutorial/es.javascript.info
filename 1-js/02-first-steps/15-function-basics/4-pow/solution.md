
```js run demo
function pow(x, n) {
  let result = x;

  for (let i = 1; i < n; i++) {
    result *= x;
  }

  return result;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
  alert(`Potencia ${n} no soportada,
    use un entero mayor a 0`);
} else {
  alert( pow(x, n) );
}
```

