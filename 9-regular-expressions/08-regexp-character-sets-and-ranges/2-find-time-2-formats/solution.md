Respuesta: `pattern:\d\d[-:]\d\d`.

```js run
let regexp = /\d\d[-:]\d\d/g;
alert( "El desayuno es a las 09:00. La cena es a las 21-30".match(regexp) ); // 09:00, 21-30
```

Tenga en cuenta que el guión `pattern:'-'` tiene un significado especial entre corchetes, pero solo entre otros caracteres, no al principio o al final, por lo que no necesitamos escaparlo.
