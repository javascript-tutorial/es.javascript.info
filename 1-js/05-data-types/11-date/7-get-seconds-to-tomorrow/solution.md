Para obtener la cantidad de milisegundos que faltan para mañana, podemos restarle la fecha actual a "mañana 00:00:00".

Primero generamos ese "mañana" y luego restamos:

```js run
function getSecondsToTomorrow() {
  let now = new Date();

  // el día de mañana
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), *!*now.getDate()+1*/!*);

  let diff = tomorrow - now; // diferencia en ms
  return Math.round(diff / 1000); // conversión a segundos
}
```

Solución alternativa:

```js run
function getSecondsToTomorrow() {
  let now = new Date();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
  let totalSecondsInADay = 86400;

  return totalSecondsInADay - totalSecondsToday;
}
```

Ten en cuenta que algunos países tienen horarios de verano (DST), así que es posible que existan días con 23 o 25 horas. Podríamos querer tratar estos días por separado.
