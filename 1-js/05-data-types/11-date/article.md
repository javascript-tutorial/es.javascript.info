# Fecha y Hora

Aprendamos un nuevo objeto incorporado de JS: [Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date). Este objeto almacena la fecha, la hora, y brinda métodos para administrarlas.

Por ejemplo, podemos usarlo para almacenar horas de creación o modificación, medir tiempo, o simplemente mostrar en pantalla la fecha actual.

## Creación

Para crear un nuevo objeto `Date` se lo instancia con `new Date()` junto con uno de los siguientes argumentos:

`new Date()`
: Sin argumentos -- crea un objeto `Date` para la fecha y la hora actuales:

    ```js run
    let now = new Date();
    alert( now ); // muestra en pantalla la fecha y la hora actuales
    ```

`new Date(milliseconds)`
: Crea un objeto `Date` con la cantidad de tiempo igual al número de milisegundos (1/1000 de un segundo) transcurrido a partir del 1° de enero de 1970 UTC+0.

    ```js run
    // 0 significa 01.01.1970 UTC+0
    let Jan01_1970 = new Date(0);
    alert( Jan01_1970 );

    // ahora se le agregan 24 horas, se obtiene 02.01.1970 UTC+0
    let Jan02_1970 = new Date(24 * 3600 * 1000);
    alert( Jan02_1970 );
    ```

    Un *timestamp* es un número entero que representa la cantidad de milisegundos transcurridos desde el inicio de 1970.

    Este *timestamp* es una representación numérica liviana de una fecha. Es posible crear una fecha a partir de un *timestamp* usando `new Date(timestamp)`, y convertir el objeto `Date` actual a un *timestamp* utilizando el método `date.getTime()` (ver abajo).

    Las fechas anteriores a 01.01.1970 tienen *timestamps* negativos, por ejemplo:
    ```js run
    // 31 Dec 1969
    let Dec31_1969 = new Date(-24 * 3600 * 1000);
    alert( Dec31_1969 );
    ```

`new Date(datestring)`
: Si se pasa un único argumento, y es de tipo string, entonces es analizado y convertido a fecha automáticamente. El algoritmo es el mismo que el que utiliza `Date.parse`, lo veremos mas en detalle luego.

    ```js run
    let date = new Date("2017-01-26");
    alert(date);
    // La hora no está definida, por lo que se asume que es la medianoche GMT (0 hs. de la fecha) y
    // se ajusta de acuerdo al huso horario de la zona geográfica en la que está ejecutándose el código.
    // Por consiguiente, el resultado podría ser
    // Thu Jan 26 2017 11:00:00 GMT+1100 (Hora Estándar del Este de Australia)
    // o
    // Wed Jan 25 2017 16:00:00 GMT-0800 (Hora Estándar del Pacífico)
    ```

`new Date(año, mes, fecha, horas, minutos, segundos, ms)`
: Crea una fecha con los componentes pasados como argumentos en la zona horaria local. Sólo los primeros dos parámetros son obligatorios.

    - El `año` debe tener 4 dígitos: `2013` es correcto, `98` no.
    - La cuenta del `mes` comienza desde el `0` (enero), y termina en el `11` (diciembre).
    - El parámetro `fecha` efectivamente es el día del mes, si está ausente se asume su valor en `1`.
    - Si los parámetros `horas/minutos/segundos/ms` están ausentes, se asumen sus valores iguales a `0`.

    Por ejemplo:

    ```js run
    new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
    new Date(2011, 0, 1); // Igual que la línea de arriba, sólo que a los últimos 4 parámetros se les asigna '0' por defecto.
    ```

    La precisión máxima es de 1 ms (1/1000 de segundo):

    ```js run
    let date = new Date(2011, 0, 1, 2, 3, 4, 567);
    alert( date ); // 1.01.2011, 02:03:04.567
    ```

## Acceso a los componentes de la fecha

Existen métodos que sirven para obtener el año, el mes, y los demás componentes a partir de un objeto de tipo `Date`:

[getFullYear()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getFullYear)
: Devuelve el año (4 dígitos)

[getMonth()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getMonth)
: Devuelve el mes, **de 0 a 11**.

[getDate()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getDate)
: Devuelve el día del mes desde 1 a 31. Nótese que el nombre del método no es muy intuitivo.

[getHours()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getHours), [getMinutes()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getMinutes), [getSeconds()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getSeconds), [getMilliseconds()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getMilliseconds)
: Devuelve los componentes del horario correspondientes.

```warn header="No `getYear()`, sino `getFullYear()`"
Algunos motores de JavaScript poseen implementado un método no estándar llamado `getYear()`. Este método actualmente está obsoleto. A veces devuelve un año de 2 dígitos. Por favor, nunca lo uses. Usa `getFullYear()` para obtener el año.
```

Además, podemos obtener un día de la semana:

[getDay()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getDay)
: Devuelve el día de la semana, partiendo de `0` (Domingo) hasta `6` (Sábado). El primer día siempre es el Domingo. Por más que en algunos países no sea así, no se puede modificar.

**Todos los métodos mencionados anteriormente devuelven los componentes correspondientes a la zona horaria local.**

También existen sus contrapartes UTC, que devuelven el día, mes, año, y demás componentes, para la zona horaria UTC+0: [getUTCFullYear()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getUTCFullYear), [getUTCMonth()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCMonth), [getUTCDay()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getUTCDay). Solo debemos agregarle el `"UTC"` justo después de `"get"`.

Si tu zona horaria está desplazada respecto de UTC el código de abajo va a mostrar horas diferentes:

```js run
// fecha actual
let date = new Date();

// la hora en tu zona horaria actual
alert( date.getHours() );

// la hora respecto de la zona horaria UTC+0 (Hora de Londres sin horario de verano)
alert( date.getUTCHours() );
```

Además de los anteriormente mencionados, hay dos métodos especiales que no poseen una variante de UTC:

[getTime()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/getTime)
: Devuelve el _timestamp_ para una fecha determinada -- cantidad de milisegundos transcurridos a partir del 1° de Enero de 1970 UTC+0.

[getTimezoneOffset()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
: Devuelve la diferencia entre UTC y el huso horario de la zona actual, en minutos:

    ```js run
    // Si estás en la zona horaria UTC-1, devuelve 60
    // Si estás en la zona horaria UTC+3, devuelve -180
    alert( new Date().getTimezoneOffset() );

    ```

## Estableciendo los componentes de la fecha

Los siguientes métodos permiten establecer los componentes de fecha y hora:

- [`setFullYear(year, [month], [date])`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/setFullYear)
- [`setMonth(month, [date])`](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/setMonth)
- [`setDate(date)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate)
- [`setHours(hour, [min], [sec], [ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setHours)
- [`setMinutes(min, [sec], [ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMinutes)
- [`setSeconds(sec, [ms])`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setSeconds)
- [`setMilliseconds(ms)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMilliseconds)
- [`setTime(milliseconds)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setTime) (Establece la cantidad de segundos transcurridos desde 01.01.1970 GMT+0)

A excepción de `setTime()`, todos los demás métodos poseen una variante UTC, por ejemplo: `setUTCHours()`.

Como podemos ver, algunos métodos nos permiten fijar varios componentes al mismo tiempo, por ej. `setHours`. Los componentes que no son mencionados no se modifican.

Por ejemplo:

```js run
let today = new Date();

today.setHours(0);
alert(today); // Sigue siendo el día de hoy, pero con la hora cambiada a 0.

today.setHours(0, 0, 0, 0);
alert(today); // Sigue siendo la fecha de hoy, pero ahora en formato 00:00:00 en punto.
```

## Autocorrección

La _autocorrección_ es una característica muy útil de los objetos `Date`. Podemos fijar valores fuera de rango, y se ajustarán automáticamente.

Por ejemplo:

```js run
let date = new Date(2013, 0, *!*32*/!*); // ¿32 de Enero 2013?
alert(date); // ¡Se autocorrigió al 1° de Febrero de 2013!
```

Los componentes de la fecha que están fuera de rango se distribuyen automáticamente.

Por ejemplo, supongamos que necesitamos incrementar la fecha "28 Feb 2016" en 2 días. El resultado puede ser "2 Mar" o "1 Mar" dependiendo de si es año bisiesto. Afortunadamente, no tenemos de qué preocuparnos. Sólo debemos agregarle los 2 días y el objeto `Date` se encargará del resto:

```js run
let date = new Date(2016, 1, 28);
*!*
date.setDate(date.getDate() + 2);
*/!*

alert( date ); // 1 Mar 2016
```

Esta característica se usa frecuentemente para obtener la fecha, a partir de un período de tiempo específico. Por ejemplo, supongamos que queremos obtener "la fecha de hoy pero transcurridos 70 segundos a partir de este preciso instante."

```js run
let date = new Date();
date.setSeconds(date.getSeconds() + 70);

alert( date ); // Se muestra la fecha correcta.
```

También podemos fijar valores en 0 o incluso valores negativos. Por ejemplo:

```js run
let date = new Date(2016, 0, 2); // 2 Jan 2016

date.setDate(1); // Fija '1' día del mes
alert( date );

date.setDate(0); // el día mínimo es 1, entonces asume el último día del mes anterior
alert( date ); // 31 Dec 2015
```

## Conversión de fechas a números y diferencia entre fechas.

Cuando convertimos un objeto `Date` a número toma el valor del _timestamp_ actual, al igual que el método `date.getTime()`:

```js run
let date = new Date();
alert(+date); // devuelve el número de milisegundos, al igual que date.getTime()
```

El efecto secundario importante: las fechas pueden ser restadas, el resultado es su diferencia en ms.

Esto puede ser usado para medición de tiempo:

```js run
let start = new Date(); // comienza a medir el tiempo (valor inicial)

// la función hace su trabajo
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

let end = new Date(); // termina de medir el tiempo (valor final)

alert(`El tiempo transcurrido es de ${end - start} ms`);
```

## Date.now()

Si lo único que queremos es medir el tiempo transcurrido, no es necesario utilizar el objeto `Date`.

Podemos utilizar el método especial `Date.now()` que nos devuelve el _timestamp_ actual.

Es el equivalente semántico a `new Date().getTime()`, pero no crea una instancia intermediaria del objeto `Date`. De esta manera, el proceso es mas rápido y, por consiguiente, no afecta a la recolección de basura.

Mayormente se utiliza por conveniencia o cuando la performance del código es fundamental, como por ejemplo en juegos de JavaScript u otras aplicaciones específicas.

Por lo tanto, es mejor hacerlo de esta manera:

```js run
*!*
let start = Date.now(); // milisegundos transcurridos a partir del 1° de Enero de 1970
*/!*

// la función realiza su trabajo
for (let i = 0; i < 100000; i++) {
  let doSomething = i * i * i;
}

*!*
let end = Date.now(); // listo
*/!*

alert( `El bucle tardó ${end - start} ms` ); // restamos números en lugar de fechas
```

## Benchmarking

Si queremos realizar una medición de performance confiable de una función que vaya a consumir muchos recursos de CPU, debemos hacerlo con precaución.

En este caso, vamos a medir dos funciones que calculen la diferencia entre dos fechas determinadas: ¿Cuál es la más rápida?

Estas evaluaciones de performance son comúnmente denominadas _"benchmarks"_.

```js
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

Pero entonces, ¿Cuál de las dos es más rápida?

La primera idea sería ejecutar las funciones varias veces seguidas y medir la diferencia de tiempo de ejecución. En nuestro caso, las funciones son bastante simples, por lo que debemos hacerlo al menos unas 100000 veces.

Midamos:

```js run
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

alert("Tiempo de ejecución de diffSubtract: " + bench(diffSubtract) + "ms");
alert("Tiempo de ejecución de diffGetTime: " + bench(diffGetTime) + "ms");
```

¡Guau! ¡Utilizando el método `getTime()` es mucho más rápido! Esto es debido a que no se produce ninguna conversión de tipo de dato, por lo que se le hace mucho mas fácil de optimizar a los motores.

Bueno, ya tenemos algo. Pero todavía no es un _benchmark_ completo.

Imaginemos que en el momento en el que `bench(diffSubtract)` estaba corriendo, la CPU estaba ejecutando otra tarea en paralelo que consumía recursos y al momento de correr `bench(diffGetTime)` esa tarea ya había concluido.

Es un escenario bastante posible para los sistemas operativos multi-procesos de hoy en día.

Como consecuencia, el primer _benchmark_ dispondrá de una menor cantidad de recursos de CPU que el segundo, lo que podría generar resultados engañosos.

**Para realizar un _benchmarking_ más confiable, todas las _benchmarks_ deberían ser ejecutadas múltiples veces.**

Como por ejemplo:

```js run
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
// ejecuta bench(diffSubtract) y bench(diffGetTime) cada 10 iteraciones alternándolas
for (let i = 0; i < 10; i++) {
  time1 += bench(diffSubtract);
  time2 += bench(diffGetTime);
}
*/!*

alert( 'Tiempo total de diffSubtract: ' + time1 );
alert( 'Tiempo total de diffGetTime: ' + time2 );
```

Los motores modernos de JavaScript realizan una optimización avanzada únicamente a los bloques de código que se ejecutan varias veces (no es necesario optimizar código que raramente se ejecuta). En el ejemplo de abajo, las primeras ejecuciones no están bien optimizadas, por lo que quizás querríamos agregar ejecuciones antes de realizar el _benchmark_, a modo de "precalentamiento":

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

```warn header="Cuidado con los micro-benchmarks"
Los motores Modernos de JavaScript realizan varias optimizaciones al ejecutar código. Esto podría alterar los resultados de las "pruebas artificiales" respecto del "uso normal", especialmente cuando hacemos un *benchmark* tan pequeño, como por ejemplo: el funcionamiento de un operador o una función incorporada de JavaScript. Por esta razón, si se quiere entender más en profundidad cómo funciona la performance, se recomienda estudiar el funcionamiento del motor de JavaScript. Probablemente no necesites realizar *microbenchmarks* en absoluto.

Se pueden encontrar una gran cantidad de artículos acerca del motor V8 en <http://mrale.ph>.
```

## Date.parse a partir de un string

El método [Date.parse(str)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date/parse) permite leer una fecha desde un string.

El formato del string debe ser: `YYYY-MM-DDTHH:mm:ss.sssZ`, donde:

- `YYYY-MM-DD` -- es la fecha: año-mes-día.
- El carácter `"T"` se usa como delimitador.
- `HH:mm:ss.sss` -- es la hora: horas, minutos, segundos y milisegundos.
- El carácter `'Z'` es opcional y especifica la zona horaria, con el formato `+-hh:mm`. Si se incluye únicamente la letra `Z` equivale a UTC+0.

También es posible pasar como string variantes abreviadas, tales como `YYYY-MM-DD` o `YYYY-MM` o incluso `YYYY`.

La llamada del método `Date.parse(str)` convierte el string en el formato especificado y nos devuelve un _timestamp_ (cantidad de milisegundos transcurridos desde el 1° de Enero de 1970 UTC+0). Si el formato del string no es válido, devuelve es `NaN`.

Por ejemplo:

```js run
let ms = Date.parse("2012-01-26T13:51:50.417-07:00");

alert(ms); // 1327611110417  (timestamp)
```

Podemos crear un objeto  `new Date` instantáneamente desde el timestamp:

```js run
let date = new Date(Date.parse("2012-01-26T13:51:50.417-07:00"));

alert(date);
```

## Resumen

- En JavaScript, la fecha y la hora se representan con el objeto [Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date). No es posible obtener sólo la fecha o sólo la hora: los objetos `Date` incluyen ambas.
- Los meses se cuentan desde el cero (sí: enero es el mes cero).
- Los días de la semana en `getDay()` también se cuentan desde el cero (que corresponde al día Domingo).
- El objeto `Date` se autocorrige cuando recibe un componente fuera de rango. Es útil para sumar o restar días/meses/horas.
- Las fechas se pueden restar entre sí, dando el resultado expresado en milisegundos: esto se debe a que el objeto `Date` toma el valor del _timestamp_ cuando es convertido a número.
- Para obtener el _timestamp_ actual de manera inmediata se utiliza `Date.now()`.

Nótese que, a diferencia de otros sistemas, los _timestamps_ en JavaScript están representados en milisegundos (ms), no en segundos.

Suele suceder que necesitemos tomar medidas de tiempo más precisas. En sí, JavaScript no tiene incorporada una manera de medir el tiempo en microsegundos (1 millonésima parte de segundo), pero la mayoría de los entornos de ejecución sí lo permiten. Por ejemplo, el navegador posee [performance.now()](https://developer.mozilla.org/es/docs/Web/API/Performance/now) que nos permite saber la cantidad de milisegundos que tarda una página en cargar, con una precisión de microsegundos (3 dígitos después del punto):

```js run
alert(`La carga de la página comenzó hace ${performance.now()}ms`);
// Devuelve algo así como: "La carga de la página comenzó hace 34731.26000000001ms"
// los dígitos .26 son microsegundos (260 microsegundos)
// Sólo los 3 primeros dígitos después del punto decimal son correctos, los demás son errores de precisión.
```

Node.js posee el módulo `microtime`, entre otros. Prácticamente casi cualquier dispositivo y entorno de ejecución permite mayor precisión, sólo que no es posible almacenarla en `Date`.
