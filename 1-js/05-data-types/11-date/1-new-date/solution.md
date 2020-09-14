<<<<<<< HEAD
El constructor `new Date` utiliza la zona horaria local. Lo único importante por recordar es que los meses se cuentan desde el 0.

Por ejemplo, febrero es el mes 1.

Aquí hay un ejemplo con números como componentes de fecha:

```js run
//new Date(año, mes, día, hora, minuto, segundo, milisegundo)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```

También podríamos crear una fecha a partir de un string, así:
=======
The `new Date` constructor uses the local time zone. So the only important thing to remember is that months start from zero.

So February has number 1.

Here's an example with numbers as date components:

```js run
//new Date(year, month, date, hour, minute, second, millisecond)
let d1 = new Date(2012, 1, 20, 3, 12);
alert( d1 );
```
We could also create a date from a string, like this:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
//new Date(datastring)
let d2 = new Date("February 20, 2012 03:12:00");
alert( d2 );
```
<<<<<<< HEAD

=======
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
