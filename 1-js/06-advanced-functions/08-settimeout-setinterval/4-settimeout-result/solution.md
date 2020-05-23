
Cualquier `setTimeout` se ejecutará solo después de que el código actual haya finalizado.

La `i` será la última:` 100000000`.

```js run
let i = 0;

setTimeout(() => alert(i), 100); // 100000000

// supongamos que el tiempo para ejecutar esta función es> 100 ms
for(let j = 0; j < 100000000; j++) {
  i++; 
}
```
