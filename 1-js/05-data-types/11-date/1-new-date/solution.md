El constructor `new Date` utiliza la zona horaria local. Lo único importante por recordar es que los meses se cuentan desde el 0.

Por ejemplo, febrero es el mes 1.

El objeto de fecha se puede crear en dos formatos:

1. new Date(año, mes, fecha, hora, minuto, segundo, milisegundo)

```js run
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```

2. new Date("fecha-en-string")

```js run
let d2 = new Date("February 20, 2012 03:12:00");
alert(d2);
```
