Para que funcionen los segundos paréntesis, los primeros deben devolver una función.

Como esto:

```js run
function sum(a) {

  return function(b) {
    return a + b; // toma "a" del entorno léxico externo
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```
