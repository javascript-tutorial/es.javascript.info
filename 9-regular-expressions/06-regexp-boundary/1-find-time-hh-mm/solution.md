
La respuesta: `pattern:\b\d\d:\d\d\b`.

```js run
alert( "Desayuno a las 09:00 en la habitación 123:456.".match( /\b\d\d:\d\d\b/ ) ); // 09:00
```
