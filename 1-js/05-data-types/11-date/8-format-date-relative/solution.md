Para obtener el tiempo que transcurrió desde la fecha `date` hasta ahora, restemos ambas fechas entre sí.

```js run demo
function formatDate(date) {
  let diff = new Date() - date; // la diferencia entre ambas, representada en milisegundos

  if (diff < 1000) { // menos de 1 segundo
    return 'ahora mismo';
  }

  let sec = Math.floor(diff / 1000); // convierte el resultado en segundos

  if (sec < 60) {
    return 'hace ' sec + ' seg.';
  }

  let min = Math.floor(diff / 60000); // convierte el resultado en minutos
  if (min < 60) {
    return 'hace ' + min + ' min.';
  }

  // cambia le formato de la fecha
  // se le agrega un dígito 0 al día/mes/horas/minutos que contenga un único digito.
  let d = date;
  d = [
    '0' + d.getDate(),
    '0' + (d.getMonth() + 1),
    '' + d.getFullYear(),
    '0' + d.getHours(),
    '0' + d.getMinutes()
  ].map(component => component.slice(-2)); // toma los últimos 2 dígitos de cada componente

  // une los componentes para formar una única fecha
  return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

alert( formatDate(new Date(new Date - 1)) ); // "ahora mismo"

alert( formatDate(new Date(new Date - 30 * 1000)) ); // "hace 30 seg."

alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "hace 5 min."

// la fecha de ayer en formato 31.12.2016 20:00
alert( formatDate(new Date(new Date - 86400 * 1000)) );
```

Solución alternativa:

```js run
function formatDate(date) {
  let dayOfMonth = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let diffMs = new Date() - date;
  let diffSec = Math.round(diffMs / 1000);
  let diffMin = diffSec / 60;
  let diffHour = diffMin / 60;

  // dándole formato
  year = year.toString().slice(-2);
  month = month < 10 ? '0' + month : month;
  dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  if (diffSec < 1) {
    return 'ahora mismo';  
  } else if (diffMin < 1) {
    return `hace ${diffSec} seg.`
  } else if (diffHour < 1) {
    return `hace ${diffMin} min.`
  } else {
    return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  }
}
```
