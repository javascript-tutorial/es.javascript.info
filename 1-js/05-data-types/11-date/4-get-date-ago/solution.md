La idea es simple: restarle a la fecha `date` la cantidad de días especificada.

```js
function getDateAgo(date, days) {
  date.setDate(date.getDate() - days);
  return date.getDate();
}
```

...Pero la función no debería modificar la fecha `date`. Esto es importante, ya que no se espera que cambie la variable externa que contiene la fecha.

Para hacerlo, clonemos la fecha de esta manera:

```js run demo
function getDateAgo(date, days) {
  let dateCopy = new Date(date);

  dateCopy.setDate(date.getDate() - days);
  return dateCopy.getDate();
}

let date = new Date(2015, 0, 2);

alert( getDateAgo(date, 1) ); // 1, (1 Jan 2015)
alert( getDateAgo(date, 2) ); // 31, (31 Dec 2014)
alert( getDateAgo(date, 365) ); // 2, (2 Jan 2014)
```
