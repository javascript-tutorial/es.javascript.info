importance: 5

---

# ¿Son independientes los contadores?

Vamos a hacer dos contadores: `counter` y `counter2` usando la misma función `makeCounter`.

Are they independent? What is the second counter going to show? `0,1` or `2,3` or something else?
¿Son independientes? ¿Qué es lo que va a mostrar el segundo contador? `0,1`, `2,3` u otra cosa?

```js
function makeCounter() {
  let count = 0;

  return function() {
    return count++;
  };
}

let counter = makeCounter();
let counter2 = makeCounter();

alert( counter() ); // 0
alert( counter() ); // 1

*!*
alert( counter2() ); // ?
alert( counter2() ); // ?
*/!*
```
