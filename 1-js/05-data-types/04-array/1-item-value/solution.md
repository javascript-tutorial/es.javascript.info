El resultado es `4`:


```js run
let fruits = ["Apples", "Pear", "Orange"];

let shoppingCart = fruits;

shoppingCart.push("Banana");

*!*
alert( fruits.length ); // 4
*/!*
```

Esto es porque los arrays son objetos. Entonces ambos, `shoppingCart` y `fruits` son referencias al mismo array.

