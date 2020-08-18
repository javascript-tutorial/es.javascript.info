Para obtener la cantidad de segundos, podemos generar una fecha en la variable "today" utilizando el día de hoy con la hora en 00:00:00, y luego restárselo a la variable "now".

El resultado será la cantidad de milisegundos transcurridos desde el comienzo del día, el cual debemos dividir por 1000 para pasarlo a segundos:

```js run
function getSecondsToday() {
  let now = new Date();

  // creamos un objeto que contenga el día/mes/año actual
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // diferencia entre fechas, representado en ms
  return Math.round(diff / 1000); // pasaje a segundos
}

alert( getSecondsToday() );
```

Una solución alternativa sería obtener las horas/minutos/segundos actuales y pasar todo a segundos:

```js run
function getSecondsToday() {
  let d = new Date();
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

alert( getSecondsToday() );
```
