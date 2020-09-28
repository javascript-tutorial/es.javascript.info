El constructor `new Date` utiliza la zona horaria local. Lo único importante por recordar es que los meses se cuentan desde el 0.

Por ejemplo, febrero es el mes 1.

Aquí hay un ejemplo con números como componentes de fecha:

```js run
//new Date(año, mes, día, hora, minuto, segundo, milisegundo)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
También podríamos crear una fecha a partir de un string, así:

```js run
//new Date(datastring)
let d2 = new Date("February 20, 2012 03:12:00");
alert( d2 );
```
