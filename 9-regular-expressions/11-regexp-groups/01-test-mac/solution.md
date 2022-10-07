Un número hexadecimal de dos dígitos es `pattern:[0-9a-f]{2}` (suponiendo que se ha establecido el indicador `pattern:i`).

Necesitamos ese número `NN`, y luego `:NN` repetido 5 veces (más números);

La expresión regular es: `pattern:[0-9a-f]{2}(:[0-9a-f]{2}){5}`

Ahora demostremos que la coincidencia debe capturar todo el texto: comience por el principio y termine por el final. Eso se hace envolviendo el patrón en `pattern:^...$`.

Finalmente:

```js run
let regexp = /^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/i;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (sin dos puntos)

alert( regexp.test('01:32:54:67:89') ); // false (5 números, necesita 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ al final)
```
