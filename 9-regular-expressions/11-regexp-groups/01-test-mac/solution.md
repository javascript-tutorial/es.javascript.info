<<<<<<< HEAD
Un número hexadecimal de dos dígitos es `pattern:[0-9a-f]{2}` (suponiendo que se ha establecido el indicador `pattern:i`).

Necesitamos ese número `NN`, y luego `:NN` repetido 5 veces (más números);

La expresión regular es: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Ahora demostremos que la coincidencia debe capturar todo el texto: comience por el principio y termine por el final. Eso se hace envolviendo el patrón en `pattern:^...$`.

Finalmente:
=======
A two-digit hex number is `pattern:[0-9a-f]{2}` (assuming the flag `pattern:i` is set).

We need that number `NN`, and then `:NN` repeated 5 times (more numbers);

The regexp is: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Now let's show that the match should capture all the text: start at the beginning and end at the end. That's done by wrapping the pattern in `pattern:^...$`.

Finally:
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

```js run
let regexp = /^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

<<<<<<< HEAD
alert( regexp.test('0132546789AB') ); // false (sin dos puntos)

alert( regexp.test('01:32:54:67:89') ); // false (5 números, necesita 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ al final)
=======
alert( regexp.test('0132546789AB') ); // false (no colons)

alert( regexp.test('01:32:54:67:89') ); // false (5 numbers, need 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ in the end)
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
```
