El constructor `new Date` utiliza la zona horaria local. Lo único importante por recordar es que los meses se cuentan desde el 0.

Por ejemplo, febrero es el mes 1.

```js run
let d = new Date(2012, 1, 20, 3, 12);
alert( d );
```
