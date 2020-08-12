# Fecha y Hora

Conozcamos ahora un nuevo objeto incorporado de JS: [Date](mdn:js/Date). Este objeto contiene la fecha, la hora y provee métodos para administrarlas.

Por ejemplo, lo podemos usar para almacenar horas de creación/modificación, medir tiempo, o simplemente mostrar en pantalla la fecha actual.

## Creación

Para crear un nuevo objeto `Date` se lo instancia con `new Date()` junto con uno de los siguientes argumentos:

`new Date()`
: Sin argumentos -- crea un objeto `Date` para la fecha y hora actuales:

    ```código js 
    let now = new Date();
    alert( now ); // muestra la fecha y hora actuales
    ```

`new Date(milliseconds)`
: Crea un objeto `Date` con la cantidad de tiempo igual al número de milisegundos (1/1000 de un segundo) transcurrido a partir del 1° de enero de 1970 UTC+0.

    ```código js
    // 0 significa 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // ahora se le agregan 24 horas, se obtiene 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```
    
    A un numero entero representando el numero de milisegundos, transcurridos desde principios de 1970, se lo denomina *timestamp*.
    
    Es una representación numérica liviana de una fecha. Es posible crear una fecha a partir de un *timestamp* usando `new Date(timestamp)` y convertir el objeto `Date` actual a un *timestamp* utilizando el método `date.getTime()` (ver abajo).

    Las fechas anteriores a 01.01.1970 tienen *timestamps* negativos, por ej.:
    ```código js
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Si se pasa un único argumento, y es de tipo string, entonces es analizado y convertido a fecha automáticamente. El algoritmo es el mismo que el que utiliza `Date.parse`, lo veremos mas en detalle luego.

    ```código js
    let date = new Date("2017-01-26");
    alert(date);
    // La hora no está definida, por lo que se asume que es la medianoche GMT (0 hs. de la fecha) y
    // se ajusta de acuerdo al huso horario de la zona geográfica en la que estáejecutándose el código.
    // Por consiguiente, el resultado podría ser
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Hora Estándar del Este de Australia)
    // o
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Hora Estándar del Pacífico)
    ```

`new Date(year, month, date, hours, minutes, seconds, ms)`
: Crea una fecha con los componentes pasados como argumentos en la zona horaria local. Sólo los primeros dos parámetros son obligatorios.

    - El año `year` debe tener 4 dígitos: `2013` está bien, `98` no.
    - La numeración del mes `month` se cuenta desde el '0' (Enero), hasta el '11' (Diciembre).
    - El parámetro de fecha `date` es el día actual del mes, si está ausente entoces se asume que es '1'.
    - si los parámetros `hours/minutes/seconds/ms` están ausentes, se asumen iguales a `0`.

    Por ejemplo:

    ```código js
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // Igual que la linea de arriba, sólo que a los ultimos 4 parámetros se les asigna '0' por default.
    ```

    La precisión mínima es de 1 ms (1/1000 de segundo):

    ```código js
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Acceso a los componentes del objeto Date

Existen métodos que sirven para obtener el año, mes, y demás componentes a partir de un objeto de tipo `Date`:

[getFullYear()](mdn:js/Date/getFullYear)
: Devuelve el año (4 dígitos)

[getMonth()](mdn:js/Date/getMonth)
: Devuelve el mes, **de 0 a 11**.

[getDate()](mdn:js/Date/getDate)
: Devuelve el dia del mes desde 1 a 31. Nótese que el nombre del método no es muy intuitivo.

[getHours()](mdn:js/Date/getHours), [getMinutes()](mdn:js/Date/getMinutes), [getSeconds()](mdn:js/Date/getSeconds), [getMilliseconds()](mdn:js/Date/getMilliseconds)
: Devuelve los componentes de la hora correspondientes.

```warn header="Not `getYear()`, but `getFullYear()`"
Algunos motores de JavaScript tienen implementado un método no estándar `getYear()`. Este método está deprecado. A veces devuelve un año de 2 digitos. Por favor, nunca lo uses. Usa `getFullYear()` para obtener el año en su lugar.
```

Además, podemos obtener un día específico de la semana:

[getDay()](mdn:js/Date/getDay)
: Devuelve el día de la semana, partiendo de `0` (Domingo) hasta `6` (Sábado). El primer día siempre es el Domingo. Por más que en algunos paises no lo sea, no se puede modificar.

**Todos los métodos mencionados anteriormente devuelven los componentes dependiendo de la zona horaria local.**

Tambien existen sus contrapartes UTC, que devuelven el día, mes, año, y demás componentes, para la zona horaria UTC+0: [getUTCFullYear()](mdn:js/Date/getUTCFullYear), [getUTCMonth()](mdn:js/Date/getUTCMonth), [getUTCDay()](mdn:js/Date/getUTCDay). Unicamente se le agrega el `"UTC"` justo despues de `"get"`.

Si tu zona horaria está desplazada respecto de UTC, también conocido como Greenwich Mean Time (GMT), el código de abajo va a mostrar horas diferentes:

```js run
// fecha actual
let date = new Date();

// la hora en tu zona horaria actual
alert( date.getHours() );

// la hora en respecto de la zona horaria UTC+0 (Hora de Londres sin horario de verano)
alert( date.getUTCHours() );
```

Además de los anteriormente mencionados, hay dos métodos especiales que no poseen una variante de UTC:

[getTime()](mdn:js/Date/getTime)
: Devuelve el *timestamp* para una fecha determinada -- un numero de milisegundos transcurridos a partir del 1° de Enero de 1970 UTC+0.

[getTimezoneOffset()](mdn:js/Date/getTimezoneOffset)
: Devuelve la diferencia entre UTC y el huso horario de la zona actual, en minutos:

    ```código js
    // Si estás en la zona horaria UTC-1, devuelve 60
    // Si estás en la zona horaria UTC+3, devuelve -180
    alert( new Date().getTimezoneOffset() );

    ```

## Estableciendo los componentes de la fecha

Los siguientes métodos permiten establecer componentes de fecha y hora:

- [`setFullYear(year, [month], [date])`](mdn:js/Date/setFullYear)
- [`setMonth(month, [date])`](mdn:js/Date/setMonth)
- [`setDate(date)`](mdn:js/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](mdn:js/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](mdn:js/Date/setMinutes)
- [`setSeconds(sec, [ms])`](mdn:js/Date/setSeconds)
- [`setMilliseconds(ms)`](mdn:js/Date/setMilliseconds)
- [`setTime(milliseconds)`](mdn:js/Date/setTime) (Establece la cantidad de segundos transcurridos desde 01.01.1970 GMT+0)

A excepción de `setTime()`, todos los demás métodos poseen una variante UTC, por ejemplo: `setUTCHours()`.

Como podemos observar, algunos métodos pueden fijar varios componentes al mismo tiempo, por ej. `setHours`. Los componentes que no son mencionados no se modifican.

Ejemplificando:

```código js
let today = new Date();

today.setHours(0);
alert(today); // Sigue siendo el día de hoy, pero con la hora cambiada a 0.

today.setHours(0, 0, 0, 0);
alert(today); // Sigue siendo la fecha de hoy, pero ahora en formato 00:00:00 en punto.
```

## Autocorrección

La *autocorrección* es una *feature* muy útil de los objetos `Date`. Podemos fijar valores fuera de rango, y se autoajustará sólo.

Por ejemplo:

```código js
let date = new Date(2013, 0, *!*32*/!*); // ¿32 de Enero 2013?
alert(date); // ¡Se autocorrigió al 1° de Febrero de 2013!
```

Los componentes de la fecha que están fuera de rango se distribuyen automáticamente.

Por ejemplo, supongamos que necesitamos incrementar la fecha "28 Feb 2016" en 2 días. El resultado puede ser "2 Mar" o "1 Mar" dependiendo de si es año biciesto. Afortunadamente, no tenemos que preocuparnos. Sólo debemos agregarle los 2 días y el objeto `Date` se encargará del resto:

```código js
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Esta *feature* es util cuando queremos obtener la fecha, a partir de un período de tiempo específico. Por ejemplo, digamos que queremos obtener "la fecha de hoy pero transcurridos 70 segundos a partir de este preciso instante."

```código js
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // Se muestra la fecha correcta.
```

También podemos fijar valores en 0 o incluso hasta valores negativos. Por ejemplo:

```código js
let date = new Date(2016, 0, 2); // 2 de Enero de 2016

date.setDate(1); // Fija '1' como numero del mes (Febrero).
alert( date );

date.setDate(0); // El valor mínimo posible del día es 1, por lo que se autocorrije devolviendo el último día del mes anterior.
alert( date ); // 31 Dec 2015
```

## Conversión de Fechas a números y diferencia (substracción) entre Fechas.

Cuando un objeto `Date` es convertido a número toma el valor del *timestamp*, al igual que utilizando el método `date.getTime()`:

```código js
let date = new Date();
alert(+date); // devuelve el número de milisegundos, al igual date.getTime()
```

¿Para qué nos sirve esto? Podemos restar fechas entre sí, siendo su resultado la diferencia en ms.

Lo podemos usar para medir el tiempo transcurrido:

```js run
let start = new Date(); // Comienza a medir el tiempo (valor inicial)

// do the job
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // Termina de medir el tiempo (valor final)

alert( `El tiempo transcurrido es de ${end - start} ms` );
```

## Date.now()

Si lo único que queremos hacer es medir el tiempo transcurrido, no tenemos necesidad de utilizar el objeto `Date`.

Podemos utilizar el método especial `Date.now()` que nos devuelve el *timestamp* actual.

Es el equivalente semántico a `new Date().getTime()`, pero sin crear una instancia intermediaria del objeto `Date`. De esta manera, el proceso es mas rápido y, por consiguiente, no afecta a la recolección de basura o *'garbage collection'*.

Se utiliza mayormente cuando la performance del código importa, como por ejemplo en juegos de JavasCript u otras aplicaciones específicas.

Por lo tanto, es mejor hacerlo de esta manera:

```código js
*!*
let start = Date.now(); // milisegundos transcurridos a partir del 1° de Enero de 1970
*/!*

// escribimos el codigo de nuestra aplicación
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // ¡Listo!
*/!*

alert( `The loop took ${end - start} ms` ); // subtract numbers, not dates
```

## Benchmarking

Si queremos realizar una medición de performance de una función que vaya a consumir muchos recursos de CPU, debemos hacerlo con precaución.

En este caso, vamos a medir dos funciones que calculan la diferencia entre dos fechas determinadas: ¿Cuál es más rápida?

Estas evaluaciones de performance son comúnmente denominadas *"benchmarks"*.

```código js
// Tenemos date1 y date2. ¿Cuál de las siguientes funciones nos devuelve su diferencia, expresada en ms, más rápido?
function diffSubtract(date1, date2) {
  return date2 - date1;
}

// o
function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}
```

Ambas funciones hacen exactamente lo mismo, pero una de ellas utiliza explícitamente `date.getTime()` para obtener la fecha expresada en ms, y la otra se basa en la autoconversión de fecha a número. Sin embargo, su resultado es el mismo.

Pero entonces, ¿Cual de las dos es más rápida?

La primera idea sería ejecutar las funciones varias veces seguidas y medir la diferencia de tiempo de ejecución. En nuestro caso, las funciones son bastante simples por lo que no es necesario hacerlo una gran cantidad de veces.

Midamos el tiempo de ejecución de cada una:

```código js
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

alert( 'Tiempo de ejcución de diffSubtract: ' + bench(diffSubtract) + 'ms' );
alert( 'Tiempo de ejecución de diffGetTime: ' + bench(diffGetTime) + 'ms' );
```

¡Guau! ¡Utilizar el método `getTime()` es mucho más rápido! Esto se debe a que no se produce ninguna conversión de tipo de datos, por lo que se le hace mucho mas fácil de optimizar a los motores.

Bueno, ya tenemos algunos indicios. Pero todavía no es un *benchmark* completo.

Imaginemos que en el momento en el que `bench(diffSubtract)` estaba corriendo, la CPU estaba ejecutando otra tarea en paralelo que consumía recursos y al momento de correr `bench(diffGetTime)` esa tarea ya había terminado.

Es un escenario bastante posible para los sistemas operativos multi-procesos de hoy en día.

Como resultado, el primer *benchmark* dispondrá de una menor cantidad de recursos de CPU que el segundo, lo que podría generar resultados incorrectos.

**Para realizar un *benchmarking* confiable, todas las funciones de *benchmarks* deberían ser ejecutadas múltiples veces.**

Por ejemplo:

```código js 
function diffSubtract(date1, date2) {
  return date2 - date1;
}

function diffGetTime(date1, date2) {
  return date2.getTime() - date1.getTime();
}

function bench(f) {
  let date1 = new Date(0);
  let date2 = new Date();

  let start = Date.now();
  for (let i = 0; i < 100000; i++) f(date1, date2);
  return Date.now() - start;
}

let time1 = 0;
let time2 = 0;

*!*
// ejecuta bench(upperSlice) y bench(upperLoop) cada 10 iteraciones, alternando entre cada una.
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Total time for diffSubtract: ' + time1 );
alert( 'Total time for diffGetTime: ' + time2 );
```

Los motores modernos de JavaScript realizan una optimización avanzada únicamente a los bloques de código que se ejecutan varias veces (no es necesario optimizar código que no raramente se ejecuta). En el ejemplo de abajo, las primeras ejecuciones no están bien optimizadas, por lo que quizás querríamos agregar ejecuciones antes de realizar el *benchmark*, a modo de "precalentamiento":

```js
// Agregamos las funciones, antes de realizar el *benchmark*, a modo de "precalentamiento"
bench(diffSubtract);
bench(diffGetTime);

// Ahora sí realizamos el benchmark
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
```

```warn header="Tomar precauciones al realizar microbenchmarking"
Los motores Modernos de Javascript Modern JavaScript engines realizan varias optimizaciones al ejecutar código. Esto podría alterar los resultados de las "pruebas artificiales" respecto del "uso normal", especialmente cuando hacemos un *benchmark* tan pequeño, como por ejemplo: el funcionamiento de un operador o una funcion incorporada de JavaScript. Por esta razón, si se quiere entender más en profundidad cómo funciona la performance, se recomienda estudiar el funcionamiento del motor de JavaScript. Probablemente no necesites realizar *microbenchmarks* en la vida real.

Se pueden encontrar una gran cantidad de artículos acerca del motor V8 en <http://mrale.ph>.
```

## Date.parse a partir de un string

El método [Date.parse(str)](mdn:js/Date/parse) permite leer una fecha desde un string.

El formato del string debe ser: `YYYY-MM-DDTHH:mm:ss.sssZ`, donde:

- `YYYY-MM-DD` -- es la fecha: año-mes-día.
- El caracter `"T"` se usa como delimitador.
- `HH:mm:ss.sss` -- es la hora: horas, minutos, segundos y milisegundos.
- El caracter `'Z'` es opcional y especifica la zona horaria, con el formato `+-hh:mm`. Si se incluye únicamente la letra `Z` equivale a UTC+0.

Tambien es posible pasar como string variantes abreviadas, tales como `YYYY-MM-DD` o `YYYY-MM` o incluso `YYYY`.

La llamada del método `Date.parse(str)` convierte el string en el formato especificado y nos devuleve el *timestamp* (cantidad de milisegundos transcurridos desde el 1° de Enero de 1970 UTC+0). Si el formato del string no es válido, el valor de retorno es `NaN`.

Por ejemplo:

```código js 
let ms = Date.parse('2012-01-26T13:51:50.417-07:00');

alert(ms); // 1327611110417  (timestamp)
```

Además, podemos crear inmediatamente un objeto `new Date` a partir del *timestamp* obtenido:

```código js
let date = new Date( Date.parse('2012-01-26T13:51:50.417-07:00') );

alert(date);  
```

## Resumen

- En JavaScript, la fecha y la hora se representan con el objeto [Date](mdn:js/Date). No es posible obtener sólo la fecha o sólo la hora: los objetos `Date` incluyen ambas.
- Los meses se cuentan desde el cero (Siendo Enero el mes cero)
- Los días de la semana en `getDay()` también se cuentan desde el cero (que corresponde al día Domingo).
- El objeto `Date` se autocorrije cuando recibe un componente fuera de rango. Es especialmente útil para sumar o restar días/meses/horas.
- Las fechas se pueden restar entre sí, realizando la operación con el resultado expresado en milisegundos. Esto funciona porque, al hacerlo, el objeto `Date` se convierte automáticamente en *timestamp*.
- Para obtener rápidamente el *timestamp* actual se utiliza `Date.now()`.

Nótese que, a diferencia de otros sistemas, los *timestamps* en JavaScripts están representados en milisegundos (ms), no en segundos.

Suele pasar que necesitemos tomar medidas de tiempo mas precisas. JavaScript en sí, no tiene incorporado una forma de medir el tiempo en microsegundos (1 millonésima parte de segundo), pero la mayoría de los entornos de ejecución sí lo permiten. Por ejemplo, el navegador posee [performance.now()](mdn:api/Performance/now) que nos permite saber el número de milisegundos que tarda una página en cargar, con una presición de microsegundos (3 dígitos despues del punto):

```código js
alert(`La carga de la página comenzó hace ${performance.now()}ms`);
// Devuelve algo así como: "La carga de la página comenzó hace 34731.26000000001ms"
// los dígitos .26 son microsegundos (260 microsegundos)
// Sólo los 3 primeros dígitos después del punto decimal son correctos, los demás son errores de precisión.
```

Por otra parte, Node.js posee el módulo `microtime` entre otros. Practicamente, casi cualquier dispositivo y entorno de ejecución permite mayor precisión, sólo que no está permitido en `Date`.
