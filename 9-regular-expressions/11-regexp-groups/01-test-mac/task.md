# Verificar dirección MAC

La [Dirección MAC](https://es.wikipedia.org/wiki/Direcci%C3%B3n_MAC) de una interfaz de red consiste en 6  números hexadecimales de dos dígitos separados por dos puntos.

Por ejemplo: `subject:'01:32:54:67:89:AB'`.

Escriba una expresión regular que verifique si una cadena es una Dirección MAC.

Uso:
```js
let regexp = /your regexp/;

alert( regexp.test('01:32:54:67:89:AB') ); // true

alert( regexp.test('0132546789AB') ); // false (sin dos puntos)

alert( regexp.test('01:32:54:67:89') ); // false (5 números, necesita 6)

alert( regexp.test('01:32:54:67:89:ZZ') ) // false (ZZ al final)
```
