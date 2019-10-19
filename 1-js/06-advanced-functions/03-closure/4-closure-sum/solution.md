Para hacer funcionar el segundo paréntesis, el primero tiene que devolver una función.

De esta forma:

```js run
function sum(a) {

  return function(b) {
    return a + b; // coge "a" desde el Lexical Environment externo
  };

}

alert( sum(1)(2) ); // 3
alert( sum(5)(-1) ); // 4
```
