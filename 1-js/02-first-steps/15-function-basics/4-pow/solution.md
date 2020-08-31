
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
<<<<<<< HEAD:1-js/02-first-steps/15-function-basics/4-pow/solution.md
  alert(`Potencia ${n} no soportada,
    use un entero mayor a 0`);
=======
  alert(`Power ${n} is not supported, use a positive integer`);
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a:1-js/02-first-steps/15-function-basics/4-pow/solution.md
} else {
  alert( pow(x, n) );
}
```
