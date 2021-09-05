libs:
  - 'https://cdn.jsdelivr.net/npm/idb@3.0.2/build/idb.min.js'

---

# IndexedDB

IndexedDB es una base de datos construida dentro del navegador, mucho más potente que `localStorage`.

- Almacena casi todo tipo de valores por claves, tipos de clave múltiple.
- Soporta transacciones para confiabilidad.
- Soporta consultas de rango por clave, e índices.
- Puede almacenar mucho mayor volumen de datos que `localStorage`.

Toda esta potencia es normalmente excesiva para las aplicaciones cliente-servidor tradicionales. IndexedDB está previsto para aplicaciones fuera de línea, para ser combinado con ServiceWorkers y otras tecnologías.

La interfaz nativa de IndexedDB, descrita en la <https://www.w3.org/TR/IndexedDB>, está basada en eventos.

También podemos usar `async/await` con la ayuda de un contenedor basado en promesas como idb <https://github.com/jakearchibald/idb>. Aunque ésto es muy conveniente, hay que tener en cuenta que el contenedor no es perfecto y no puede reemplazar a los eventos en todos los casos. Así que comenzaremos con eventos y, cuando hayamos avanzado en el entendimiento de IndexedDb, usaremos el contenedor.

```smart header="¿Dónde están los datos?"
Técnicamente, los datos son almacenados bajo el directorio raíz del usuario junto con la configuración personal del navegador, extensiones, etc.

Navegadores y usuarios diferentes tendrán cada uno su propio almacenamiento independiente.
```

## Apertura de una base de datos, "open"

Para empezar a trabajar con IndexedDB, primero necesitamos conectarnos o "abrir" (`open`) una base de datos.

La sintaxis:

```js
let openRequest = indexedDB.open(name, version);
```

- `name` -- un string, el nombre de la base de datos.
- `version` -- un entero positivo, predeterminado en `1` (explicado más abajo).

Podemos tener muchas bases de datos con nombres diferentes, pero todas ellas existen dentro del mismo origen (dominio/protocolo/puerto). Un sitio web no puede acceder bases de datos de otro.

La llamada devuelve un objeto `openRequest`, debemos escuchar en él los eventos:
- `success`: la base de datos está lista. Hay un "objeto database" en `openRequest.result` que habremos de usar en las llamadas subsiguientes.
- `error`: Apertura fallida.
- `upgradeneeded`: La base de datos está lista, pero su versión es obsoleta (ver abajo).

**IndexedDB tiene incorporado un mecanismo de "versión de esquema", ausente en bases de datos de servidor.**

A diferencia de las bases de datos del lado del servidor, IndexedDB se ejecuta en el lado del cliente y los datos son almacenados en el navegador, así que nosotros, desarrolladores, no tenemos acceso permanente a esas bases. Entonces, cuando publicamos una nueva versión de nuestra app y el usuario visita nuestra página web, podemos necesitar actualizar la estructura de su base de datos.

Si la versión de la base es menor a la especificada en `open`, entonces se dispara un evento especial `upgradeneeded` (actualización-requerida), donde podemos comparar versiones y hacer la actualización de la estructura de datos que se necesite.

El evento `upgradeneeded` también se dispara cuando la base aún no existe (técnicamente, su versión es `0`), lo cual nos permite llevar a cabo su inicialización.

Digamos que publicamos la primera versión de nuestra app.

Entonces podemos abrir la base con version `1` y hacer la inicialización en un manejador `upgradeneeded`:

```js
let openRequest = indexedDB.open("store", *!*1*/!*);

openRequest.onupgradeneeded = function() {
  // se dispara si el cliente no tiene la base de datos
  // ...ejecuta la inicialización...
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
  let db = openRequest.result;
  // continúa trabajando con la base de datos usando el objeto db
};
```

Luego, más tarde, publicamos la segunda versión.

Podemos abrirla con version `2` y ejecutar la actualización así:

```js
let openRequest = indexedDB.open("store", *!*2*/!*);

openRequest.onupgradeneeded = function(event) {
  // la versión de la base existente es menor que 2 (o ni siquiera existe)
  let db = openRequest.result;
  switch(event.oldVersion) { // versión de db existente
    case 0:
      // version 0 significa que el cliente no tiene base de datos
      // ejecutar inicialización
    case 1:
      // el cliente tiene la versión 1
      // actualizar
  }
};
```

Tenlo en cuenta: como nuestra versión actual es `2`, el manejador `onupgradeneeded` tiene una rama de código para la versión `0`, adecuada para usuarios que acceden por primera vez y no tienen una base de datos, y otra rama para la versión `1`, para su actualización.

Entonces, y solamente si el manejador de `onupgradeneeded` finaliza sin errores, se dispara el evento `openRequest.onsuccess` y se considera que la base de datos fue abierta con éxito.

Para borrar una base de datos:

```js
let deleteRequest = indexedDB.deleteDatabase(name)
// deleteRequest.onsuccess/onerror rastrea el resultado
```

```warn header="No se puede abrir una base de datos usando una versión más vieja de open"
Si la base del usuario tiene una versión mayor que el `open` que la abre, por ejemplo: la base existente tiene versión `3` e intentamos `open(...2)`, se producirá un error que disparará `openRequest.onerror`.

Es una situación rara pero puede ocurrir cuando un visitante carga código JavaScript viejo, por ejemplo desde un caché proxy. Así el código es viejo pero la base de datos nueva.

Para prevenir errores, debemos verificar `db.version` y sugerir la recarga de página. Usa cabeceras HTTP de caché apropiadas para evitar la carga de código viejo, así nunca tendrás tales problemas.
```

### El problema de la actualización paralela

Hablando de versionado, encaremos un pequeño problema relacionado.

Supongamos que:
1. Un visitante, en una pestaña de su navegador, abrió nuestro sitio con un base de datos con la versión `1`.
2. Luego publicamos una actualización, así que nuestro código es más reciente.
3. Y el mismo visitante abre nuestro sitio en otra pestaña.

Entonces hay una primera pestaña con una conexión abierta a una base con versión `1`, mientras la segunda intenta actualizarla a la versión `2` en su manejador `upgradeneeded`.

El problema es que la misma base está compartida entre las dos pestañas, por ser del mismo sitio y origen. Y no puede ser versión `1` y `2` al mismo tiempo. Para ejecutar la actualización a la versión `2`, todas las conexiones a la versión 1 deben ser cerradas, incluyendo las de la primera pestaña.

Para detectar estas situaciones, se dispara automáticamente el evento `versionchange` (cambio-de-versión) en el objeto de base de datos. Debemos escuchar dicho evento y cerrar la conexión vieja (y probablemente sugerir una recarga de página, para cargar el código actualizado).

Si no escuchamos el evento `versionchange` y no cerramos la conexión vieja, entonces la segunda y más nueva no se podrá hacer. El objeto `openRequest` emitirá el evento `blocked` en lugar de `success`. Entonces la segunda pestaña no funcionará.

Aquí tenemos el código para manejar correctamente la actualización paralela. Este instala un manejador `onversionchange` que se dispara si la conexión actual queda obsoleta y la cierra (la versión se actualiza en algún otro lado):

```js
let openRequest = indexedDB.open("store", 2);

openRequest.onupgradeneeded = ...;
openRequest.onerror = ...;

openRequest.onsuccess = function() {
  let db = openRequest.result;

  *!*
  db.onversionchange = function() {
    db.close();
    alert("La base de datos está desactualizada, por favor recargue la página.")
  };
  */!*

  // ...la base db está lista, úsala...
};

*!*
openRequest.onblocked = function() {
  // este evento no debería dispararse si hemos manejado onversionchange correctamente

  // significa que hay otra conexión abierta a la misma base
  // que no fue cerrada después de que se disparó db.onversionchange
};
*/!*
```

Aquí hacemos dos cosas:

1. La escucha a `db.onversionchange` nos informa de un intento de actualización paralela si la conexión actual se volvió obsoleta.
2. La escucha a `openRequest.onblocked` nos informa de la situación opuesta: hay una conexión obsoleta en algún otro lugar que no fue cerrada y por eso la conexión nueva no se pudo realizar.

Podemos manejar las cosas más suavemente en `db.onversionchange`, como pedirle al visitante que guarde los datos antes de cerrar la conexión.

Como alternativa podríamos no cerrar la base en `db.onversionchange` sino usar `onblocked` de la nueva pestaña para advertirle que no puede crear una nueva conexión hasta que cierre las viejas.

Estas colisiones ocurren raramente, pero deberíamos tener algún manejo de ella, como mínimo un manejador `onblocked` para evitar que nuestro script muera silenciosamente.

## Almacén de objetos, "store"

Para almacenar algo en IndexedDB, necesitamos un "almacén de objetos" *object store*.

Un almacén de objetos es un concepto central de IndexedDB. Equivale a lo que en otras bases de datos se denominan "tablas" o "colecciones". Es donde los datos son almacenados. Una base de datos puede tener múltiples almacenes: uno para usuarios, otro para bienes, etc.

A pesar de llamarse "almacén de objetos", también puede almacenar tipos primitivos.

**Podemos almacenar casi cualquier valor, incluyendo objetos complejos.**

IndexedDB usa el [algoritmo de serialización estándar](https://www.w3.org/TR/html53/infrastructure.html#section-structuredserializeforstorage) para clonar-y-almacenar un objeto. Es como `JSON.stringify` pero más poderoso, capaz de almacenar muchos tipos de datos más.

Hay objetos que no pueden ser almacenados, por ejemplo los que tienen referencias circulares. Tales objetos no son serializables. `JSON.stringify` también falla con ellos.

**Debe haber una clave `key` única para cada valor del almacén.**     

Una clave debe ser de uno de estos tipos: number, date, string, binary, o array. Es un identificador único, así podemos buscar/borrar/modificar valores por medio de la clave.

![](indexeddb-structure.svg)


De forma similar a `localStorage`, podemos proporcionar una clave cuando agregamos un valor al almacén. Cuando lo que almacenamos son objetos, IndexedDB permite asignar una propiedad del objeto como clave, lo que es mucho más conveniente. También podemos usar claves que se generan automáticamente.

Pero primero, necesitamos crear el almacén de objetos.


La sintaxis para crear un almacén de objetos "object store":
```js
db.createObjectStore(name[, keyOptions]);
```

Ten en cuenta que esta operación es sincrónica, no requiere `await`.

- `name` es el nombre del almacén, por ejemplo `"books"`,
- `keyOptions` es un objeto opcional con una de estas dos propiedades:
  - `keyPath` -- la ruta a una propiedad del objeto que IndexedDB usará como clave, por ejemplo `id`.
  - `autoIncrement` -- si es `true`, la clave para el objeto nuevo que se almacene se generará automáticamente con un número autoincremental.

Si no establecemos `keyOptions`, necesitaremos proporcionar una clave explícitamente más tarde: al momento de almacenar un objeto.

Por ejemplo, este objeto usa la propiedad `id` como clave:
```js
db.createObjectStore('books', {keyPath: 'id'});
```

**Un almacén de objetos solo puede ser creado o modificado durante la actualización de su versión, esto es, en el manejador `upgradeneeded`.**

Esto es una limitación técnica. Fuera del manejador podremos agregar/borrar/modificar los datos, pero los almacenes de objetos solo pueden ser creados/borrados/alterados durante la actualización de versión.

Para hacer una actualización de base de datos, hay principalmente dos enfoques:
1. Podemos implementar una función de actualización por versión: desde 1 a 2, de 2 a 3, de 3 a 4, etc. Así en `upgradeneeded` podemos comparar versiones (supongamos: vieja 2, ahora 4) y ejecutar actualizaciones por versión paso a paso para cada versión intermedia (2 a 3, luego 3 a 4).
2. O podemos simplemente examinar la base y alterarla en un paso. Obtenemos una lista de los almacenes existentes como `db.objectStoreNames`. Este objeto es un [DOMStringList](https://html.spec.whatwg.org/multipage/common-dom-interfaces.html#domstringlist) que brinda el método `contains(name)` para chequear existencias. Y podemos entonces hacer actualizaciones dependiendo de lo que existe y lo que no.

En bases de datos pequeñas la segunda variante puede ser más simple.

Aquí hay un demo del segundo enfoque:

```js
let openRequest = indexedDB.open("db", 2);

// crea/actualiza la base de datos sin chequeo de versiones
openRequest.onupgradeneeded = function() {
  let db = openRequest.result;
  if (!db.objectStoreNames.contains('books')) { // si no hay un almacén de libros ("books"),
    db.createObjectStore('books', {keyPath: 'id'}); // crearlo
  }
};
```


Para borrar un almacén de objetos:

```js
db.deleteObjectStore('books')
```

## Transacciones

El término transacción es genérico, usado por muchos tipos de bases de datos.

Una transacción es un grupo de operaciones cuyos resultados están vinculados: todas deben ser exitosas o todas fallar.

Por ejemplo, cuando una persona compra algo, necesitamos:
1. Restar el dinero de su cuenta personal.
2. Agregar el ítem a su inventario.

Sería muy malo que si se completara la primera operación y algo saliera mal (como un corte de luz), fallara la segunda. Ambas deberían ser exitosas (compra completa, ¡bien!) o ambas fallar (al menos la persona mantuvo su dinero y puede reintentar).

Las transacciones garantizan eso.

**Todas las operaciones deben ser hechas dentro de una transacción en IndexedDB.**

Para iniciar una transacción:

```js
db.transaction(store[, type]);
```

- `store` – el nombre de almacén al que la transacción va a acceder, por ejemplo `"books"`. Puede ser un array de nombres de almacenes si vamos a acceder a múltiples almacenes.
- `type` – el tipo de transacción, uno de estos dos:
  - `readonly` -- solo puede leer (es el predeterminado).
  - `readwrite` -- puede leer o escribir datos (pero no crear/quitar/alterar almacenes de objetos).

También existe el tipo de transacción `versionchange`: tal transacción puede hacer de todo, pero no podemos crearla nosotros a mano. IndexedDB la crea automáticamente cuando abre la base de datos para el manejador `updateneeded`. Por ello, es el único lugar donde podemos actualizar la estructura de base de datos, crear o quitar almacenes de objetos.

```smart header="¿Por qué hay diferentes tipos de transacciones?"
El rendimiento es la razón por la que necesitamos identificar las transacciones como `readonly` (lectura solamente) o `readwrite` (lectura y escritura).

Muchas transacciones `readonly` pueden leer en un mismo almacén concurrentemente, en cambio las transacciones de escritura `readwrite`, no. Una transacción `readwrite` bloquea el almacén para escribir en él. La siguiente transacción debe esperar a que la anterior termine antes de acceder al mismo almacén.
```

Una vez que la transacción ha sido creada, podemos agregar un ítem al almacén:

```js
let transaction = db.transaction("books", "readwrite"); // (1)

// obtiene un almacén de objetos para operar con él
*!*
let books = transaction.objectStore("books"); // (2)
*/!*

let book = {
  id: 'js',
  price: 10,
  created: new Date()
};

*!*
let request = books.add(book); // (3)
*/!*

request.onsuccess = function() { // (4)
  console.log("Libro agregado al almacén", request.result);
};

request.onerror = function() {
  console.log("Error", request.error);
};
```

Básicamente, hay cuatro pasos:

1. Crea una transacción, mencionando todos los almacenes a los que irá a acceder, en `(1)`.
2. Obtiene el almacén usando `transaction.objectStore(name)`, en `(2)`.
3. Ejecuta lo petición al almacén `books.add(book)`, en `(3)`.
4. ...Maneja el éxito o fracaso de la petición `(4)`, a continuación podemos hacer otras peticiones si lo necesitamos, etc.

Los almacenes de objetos soportan dos métodos para almacenar un valor:

- **put(value, [key])**
    Agrega `value` al almacén. La clave `key` debe ser suministrada solo si al almacén no se le asignó la opción `keyPath` o `autoIncrement`. Si ya hay un valor con la misma clave, este será reemplazado.

- **add(value, [key])**
    Lo mismo que `put`, pero si ya hay un valor con la misma clave, la petición falla y se genera un error con el nombre `"ConstraintError"`.

Al igual que al abrir una base de datos, podemos enviar una petición: `books.add(book)` y quedar a la espera  de los eventos `success/error`.

- El resultado `request.result` de `add` es la clave del nuevo objeto.
- El error, si lo hay, está en `request.error`.

## Commit, culminación automática de las transacciones

En el ejemplo anterior, empezamos la transacción e hicimos una petición `add`. Pero, como explicamos antes, una transacción puede tener muchas peticiones asociadas, que deben todas ser exitosas o todas fallar. ¿Cómo marcamos que una transacción se da por finalizada, que no tendrá más peticiones asociadas?

Respuesta corta: no lo hacemos.

En la siguiente versión 3.0 de la especificación, probablemente haya una manera de finalizarla manualmente, pero ahora mismo en la 2.0 no la hay.

**Cuando todas las peticiones de una transacción terminaron y la [cola de microtareas](info:microtask-queue) está vacía, se hace un commit (consumación) automático.**

De forma general, podemos asumir que una transacción se consuma cuando todas sus peticiones fueron completadas y el código actual finaliza.

Entonces, en el ejemplo anterior no se necesita una llamada especial para finalizar la transacción.

El principio de auto-commit de las transacciones tiene un efecto colateral importante. No podemos insertar una operación asincrónica como `fetch`, `setTimeout` en mitad de una transacción. IndexedDB no mantendrá la transacción esperando a que terminen.

En el siguiente código, `request2` en la línea `(*)` falla, porque la transacción ya está finalizada y no podemos hacer más peticiones sobre ella:

```js
let request1 = books.add(book);

request1.onsuccess = function() {
  fetch('/').then(response => {
*!*
    let request2 = books.add(anotherBook); // (*)
*/!*
    request2.onerror = function() {
      console.log(request2.error.name); // TransactionInactiveError
    };
  });
};
```

Esto es porque `fetch` es una operación asincrónica, una macrotarea. Las transacciones se cierran antes de que el navegador comience con las macrotareas.

Los autores de la especificación de IndexedDB creen que las transacciones deben ser de corta vida. Mayormente por razones de rendimiento.

Es de notar que las transacciones `readwrite` "traban" los almacenes para escritura. Entonces si una parte de la aplicación inició `readwrite` en el almacén `books`, cuando otra parte quiera hacer lo mismo tendrá que esperar: la nueva transacción "se cuelga" hasta que la primera termine. Esto puede llevar a extraños retardos si las transacciones toman un tiempo largo.

Entonces, ¿qué hacer?

En el ejemplo de arriba podemos hacer una nueva `db.transaction` justo antes de la nueva petición `(*)`.

Pero, si queremos mantener las operaciones juntas en una transacción, será mucho mejor separar las transacciones IndexedDB de la parte asincrónica.

Primero, hacer `fetch` y preparar todos los datos que fueran necesarios y, solo entonces, crear una transacción y ejecutar todas las peticiones de base de datos. Así, funcionaría.

Para detectar el momento de finalización exitosa, podemos escuchar al evento `transaction.oncomplete`:

```js
let transaction = db.transaction("books", "readwrite");

// ...ejecutar las operaciones...

transaction.oncomplete = function() {
  console.log("Transacción completa");
};
```

Solo `complete` garantiza que la transacción fue guardada como un todo. Las peticiones individuales pueden ser exitosas, pero la operación final de escritura puede ir mal (por ejemplo por un error de Entrada/Salida u otra cosa).

Para abortar una transacción manualmente:

```js
transaction.abort();
```

Esto cancela todas las modificaciones hechas por las peticiones y dispara el evento `transaction.onabort`.


## Manejo de error

Las peticiones de escritura pueden fallar.

Esto es esperable, no solo por posibles errores de nuestro lado, sino también por razones no relacionadas con la transacción en si misma. Por ejemplo, la cuota de almacenamiento podría haberse exedido. Por tanto, debemos estar preparados para manejar tal caso.

**Una petición fallida automáticamente aborta la transacción, cancelando todos sus cambios.**

En algunas situaciones, podemos querer manejar el fallo (por ejemplo, intentar otra petición) sin cancelar los cambios en curso, y continuar la transacción. Eso es posible. El manejador `request.onerror` es capaz de evitar el aborto de la transacción llamando a `event.preventDefault()`.

En el ejemplo que sigue, un libro nuevo es agregado con la misma clave (`id`) que otro existente. El método `store.add` genera un `"ConstraintError"` en ese caso. Lo manejamos sin cancelar la transacción:

```js
let transaction = db.transaction("books", "readwrite");

let book = { id: 'js', price: 10 };

let request = transaction.objectStore("books").add(book);

request.onerror = function(event) {
  // ConstraintError ocurre cuando un objeto con el mismo id ya existe
  if (request.error.name == "ConstraintError") {
    console.log("Ya existe un libro con ese id"); // manejo del error
    event.preventDefault(); // no abortar la transacción
    // ¿usar otra clave para el libro?
  } else {
    // error inesperado, no podemos manejarlo
    // la transacción se abortará
  }
};

transaction.onabort = function() {
  console.log("Error", transaction.error);
};
```

### Delegación de eventos

¿Necesitamos onerror/onsuccess en cada petición? No siempre. En su lugar podemos usar la delegación de eventos.

**Propagación de eventos IndexedDB: `request` -> `transaction` -> `database`.**

Todos los eventos son eventos DOM, con captura y propagación, pero generalmente solo se usa el escenario de la propagación.

Así que podemos capturar todos los errores usando el manejador `db.onerror`, para reportarlos u otros propósitos:

```js
db.onerror = function(event) {
  let request = event.target; // la petición (request) que causó el error

  console.log("Error", request.error);
};
```

...Pero ¿y si el error fue completamente manejado? No queremos elevarlo en ese caso.

Podemos detener la propagación y en consecuencia `db.onerror` usando `event.stopPropagation()` en `request.onerror`.

```js
request.onerror = function(event) {
  if (request.error.name == "ConstraintError") {
    console.log("Ya existe un libro con ese id"); // manejo de error
    event.preventDefault(); // no abortar la transacción
    event.stopPropagation(); // no propagar el error
  } else {
    // no hacer nada
    // la transacción será abortada
    // podemos encargarnos del error en transaction.onabort
  }
};
```

## Búsquedas

Hay dos maneras principales de buscar en un almacén de objetos:

1. Por clave o por rango de claves. En nuestro almacén "books", puede ser por un valor o por un rango de valores de `book.id`.
2. Por algún otro campo del objeto, por ejemplo `book.price`. Esto requiere una estructura de datos adicional llamada índice "index".

### Por clave

Veamos el primer tipo de búsqueda: por clave.

Los métodos de búsqueda soportan tanto las claves exactas como las denominadas "consultas por rango" que son objetos [IDBKeyRange](https://www.w3.org/TR/IndexedDB/#keyrange) que especifican un "rango de claves" aceptable.

Los objetos `IDBKeyRange` son creados con las siguientes llamadas:

- `IDBKeyRange.lowerBound(lower, [open])` significa: `≥ lower` (o `> lower` si `open` es true)
- `IDBKeyRange.upperBound(upper, [open])` significa: `≤ upper` (o `< upper` si `open` es true)
- `IDBKeyRange.bound(lower, upper, [lowerOpen], [upperOpen])` significa: entre `lower` y `upper`. Si el indicador "open" es true, la clave correspondiente no es incluida en el rango.
- `IDBKeyRange.only(key)` -- es un rango compuesto solamente por una clave `key`, es raramente usado.

Veremos ejemplos prácticos de uso muy pronto.

Para efectuar la búsqueda, existen los siguientes métodos. Ellos aceptan un argumento `query` que puede ser una clave exacta o un rango de claves:

- `store.get(query)` -- busca el primer valor, por clave o por rango.
- `store.getAll([query], [count])` -- busca todos los valores, limitado a la cantidad `count` si esta se especifica.
- `store.getKey(query)` -- busca la primera clave que satisface la consulta, usualmente un rango.
- `store.getAllKeys([query], [count])` -- busca todas las claves que satisfacen la consulta, usualmente un rango, hasta la cantidad `count` si es suministrada.
- `store.count([query])` -- obtiene la cantidad de claves que satisfacen la consulta, usualmente un rango.

Por ejemplo, tenemos un montón de libros en nuestro almacén. Recuerda, el campo `id` es la clave, así que todos estos métodos pueden buscar por `id`.

Ejemplos de peticiones:

```js
// obtiene un libro
books.get('js')

// obtiene libros con: 'css' <= id <= 'html'
books.getAll(IDBKeyRange.bound('css', 'html'))

// obtiene libros con  id < 'html'
books.getAll(IDBKeyRange.upperBound('html', true))

// obtiene todos los libros
books.getAll()

// obtiene todas las claves donde id > 'js'
books.getAllKeys(IDBKeyRange.lowerBound('js', true))
```

```smart header="El almacén de objetos siempre está ordenado"
El almacén internamente guarda los valores ordenados por clave.

Entonces, en las peticiones que devuelvan varios valores, estos siempre estarán ordenados por la clave.
```

## Buscando por cualquier campo con un índice

Para buscar por otro campo del objeto, necesitamos crear una estructura de datos adicional llamada "índice (index)".

Un índice es un agregado al almacén que rastrea un campo determinado del objeto dado. Para cada valor de ese campo, almacena una lista de claves de objetos que tienen ese valor. Veremos una imagen más detallada abajo.

La sintaxis:

```js
objectStore.createIndex(name, keyPath, [options]);
```

- **`name`** -- nombre del índice,
- **`keyPath`** -- ruta al campo del objeto que el índice debe seguir (vamos a buscar por ese campo),
- **`option`** -- un objeto opcional con las propiedades:
  - **`unique`** -- si es true, un valor no podrá repetirse en el índice. Solamente puede haber un único objeto en el almacén con un valor dado de su `keyPath`. El índice forzará esto generando un error si intentamos agregar un duplicado.
  - **`multiEntry`** -- solo se usa si el valor en `keyPath` es un array. En ese caso, de manera predeterminada, el índice tratará el array completo como clave. Pero si `multiEntry` es true, entonces el índice mantendrá una lista de objetos almacenados para cada valor en ese array. Así los miembros del array se vuelven claves de ese índice.

En nuestro ejemplo, almacenamos libros usando la propiedad `id` como clave.

Digamos que queremos buscar por precio `price`.

Primero necesitamos crear un índice. Esto debe hacerse en `upgradeneeded`, al igual que hacíamos la creación del almacén de objetos.

```js
openRequest.onupgradeneeded = function() {
  // debemos crear el índice aquí, en la transacción versionchange
  let books = db.createObjectStore('books', {keyPath: 'id'});
*!*
  let index = books.createIndex('price_idx', 'price');
*/!*
};
```

- El índice hará seguimiento del campo `price`.
- El precio no es único, puede haber múltiples libros con el mismo precio así que no establecemos la opción `unique`.
- El precio no es un array, entonces el indicador `multiEntry` no es aplicable.

Imagine que nuestro `inventory` tiene 4 libros. Aquí la imagen muestra exactamente lo que es el `índice`:

![](indexeddb-index.svg)

Como se dijo, el índice para cada valor de `price` (segundo argumento) mantiene la lista de claves que tienen ese precio.

El índice se mantiene actualizado automáticamente, no necesitamos preocuparnos de eso.

Ahora, cuando queremos buscar por un determinado precio, simplemente aplicamos el mismo método de búsqueda al índice:

```js
let transaction = db.transaction("books"); // readonly
let books = transaction.objectStore("books");
let priceIndex = books.index("price_idx");

*!*
let request = priceIndex.getAll(10);
*/!*

request.onsuccess = function() {
  if (request.result !== undefined) {
    console.log("Books", request.result); // array de libros con precio = 10
  } else {
    console.log("No hay libros así");
  }
};
```

También podemos usar `IDBKeyRange` para crear rangos y vistas de libros baratos/caros:

```js
// encontrar libros donde price <= 5
let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
```

Los índices están ordenados internamente por el campo del índice, en nuestro caso `price`. Entonces cuando hacemos la búsqueda, los resultados también estarán ordenados por `price`.

## Borrando del almacén

El método `delete` (eliminar) busca a través de una consulta valores para borrarlos. El formato de la llamada es similar a `getAll`:

- **`delete(query)`** -- elimina valores coincidentes con una consulta (query).

Por ejemplo:
```js
// borra el libro cuyo id='js'
books.delete('js');
```

Si queremos borrar libros basados en un precio u otro campo del objeto, debemos primero encontrar la clave en el índice, luego llamar a `delete` con dicha clave:

```js
// encuentra la clave donde price = 5
let request = priceIndex.getKey(5);

request.onsuccess = function() {
  let id = request.result;
  let deleteRequest = books.delete(id);
};
```

Para borrar todo:
```js
books.clear(); // clear "limpia" el almacén.
```

## Cursores

Métodos como `getAll/getAllKeys` devuelven un array de claves/valores.

Pero un almacén de objetos puede ser enorme, incluso más que la memoria disponible. Entonces `getAll` fallaría al tratar de llenar de registros el array.

¿Qué hacer?

Los cursores brindan los medios para manejar esta situación.

**Un *cursor* es un objeto especial que, dada una consulta, recorre el almacén y devuelve un solo par clave/valor cada vez, ahorrando así memoria.**

Como un almacén está ordenado internamente por clave, un cursor lo recorre en el orden de la clave (ascendente de forma predeterminada).

La sintaxis:
```js
// como getAll, pero con un cursor:
let request = store.openCursor(query, [direction]);

// para obtener las claves y no sus valores (como getAllKeys): store.openKeyCursor
```

- **`query`** (consulta) es una clave o un rango de claves, al igual que para `getAll`.
- **`direction`** es un argumento opcional, el orden que se va a usar:
  - `"next"` -- el predeterminado: el cursor recorre en orden ascendente comenzando por la clave más baja.
  - `"prev"` -- el orden inverso: decrece comenzando con el registro con la clave más alta.
  - `"nextunique"`, `"prevunique"` -- igual que las anteriores, pero saltando los registros con la misma clave (válido solo para cursores sobre índices; por ejemplo, de múltiples libros con price=5, solamente el primero será devuelto).

**La diferencia principal del cursor es que `request.onsuccess` se dispara múltiples veces: una por cada resultado.**

Aquí hay un ejemplo de cómo usar un cursor:

```js
let transaction = db.transaction("books");
let books = transaction.objectStore("books");

let request = books.openCursor();

// llamado por cada libro encontrado por el cursor
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let key = cursor.key; // clave del libro (el campo id)
    let value = cursor.value; // el objeto libro
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No hay más libros");
  }
};
```

Los principales métodos de cursor son:

- `advance(count)` -- avanza el cursor `count` veces, saltando valores.
- `continue([key])` -- avanza el cursor al siguiente valor en el rango o, si se provee la clave `key`, al valor inmediatamente posterior a `key`.

El evento `onsuccess` será llamado haya o no más valores coincidentes, y en `result` obtenemos el cursor apuntando al siguiente registro o `undefined`.

En el ejemplo anterior, el cursor fue hecho sobre el almacén de objetos.

Pero también podemos hacerlo sobre un índice. Recordamos, los índices nos permiten buscar por los campos del objeto. Los cursores sobre índices hacen precisamente lo mismo que sobre el almacén de objetos: ahorran memoria al devolver un solo valor cada vez.

Para cursores sobre índices, `cursor.key` es la clave del índice (es decir "price"), y debemos usar la propiedad `cursor.primaryKey` para la clave del objeto:

```js
let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

// es llamado para cada registro
request.onsuccess = function() {
  let cursor = request.result;
  if (cursor) {
    let primaryKey = cursor.primaryKey; // la siguiente clave (campo id) del almacén 
    let value = cursor.value; // el siguiente objeto (objeto book) del almacén
    let key = cursor.key; // siguiente clave del índice (price)
    console.log(key, value);
    cursor.continue();
  } else {
    console.log("No hay más libros");
  }
};
```

## Contenedor promisificador 

Agregar `onsuccess/onerror` a cada petición es una tarea agobiante. A veces podemos hacernos la vida más fácil usando delegación de eventos (por ejemplo, estableciendo manejadores para las transacciones completas), pero `async/await` es mucho más conveniente.

Usemos en adelante para este capítulo un contenedor (wrapper) liviano que añade promesas <https://github.com/jakearchibald/idb>. Este contenedor crea un objeto global `idb` con métodos IndexedDB [promisificados](info:promisify).

Entonces, en lugar de `onsuccess/onerror`, podemos escribir:

```js
let db = await idb.openDB('store', 1, db => {
  if (db.oldVersion == 0) {
    // ejecuta la inicialización
    db.createObjectStore('books', {keyPath: 'id'});
  }
});

let transaction = db.transaction('books', 'readwrite');
let books = transaction.objectStore('books');

try {
  await books.add(...);
  await books.add(...);

  await transaction.complete;

  console.log('jsbook saved');
} catch(err) {
  console.log('error', err.message);
}

```

Así tenemos todo lo dulce de "código async plano" y "try..catch".

### Manejo de Error

Si no atrapamos un error, este se propaga hasta el `try..catch` externo más cercano.

Un error no atrapado se vuelve un evento "rechazo de promesa no manejado" sobre el objeto `window`.

Podemos manejar tales errores así:

```js
window.addEventListener('unhandledrejection', event => {
  let request = event.target; // objeto request nativo de IndexedDB
  let error = event.reason; //  objeto error no manejado, igual que request.error
  ...reportar el error...
});
```

### La trampa "transacción inactiva"


Como sabemos, una transacción se autofinaliza tan pronto como el navegador termina el código actual y las microtareas. Por tanto, si ponemos una *macrotarea* como `fetch` en el medio de una transacción, la transacción no esperará a que termine. Simplemente se autofinaliza. Así la siguiente petición fallaría.


Para el contenedor de promisificación y `async/await` la situación es la misma.

Este es un ejemplo de `fetch` en el medio de una transacción:

```js
let transaction = db.transaction("inventory", "readwrite");
let inventory = transaction.objectStore("inventory");

await inventory.add({ id: 'js', price: 10, created: new Date() });

await fetch(...); // (*)

await inventory.add({ id: 'js', price: 10, created: new Date() }); // Error
```

El `inventory.add` que sigue a `fetch` `(*)` falla con el error "transacción inactiva", porque la transacción se autocompletó y, llegado ese momento, ya está cerrada.

La forma de sortear esto es la misma que con el IndexedDB nativo: Hacer una nueva transacción o simplemente partir las cosas.
1. Preparar los datos y buscar todo lo que sea necesario primero.
2. Solo entonces, grabar en la base de datos.

### Obtener objetos nativos

Internamente, el contenedor ejecuta una petición IndexedDB nativa, agregándole `onerror/onsuccess` y devolviendo una promesa que rechaza/resuelve con el resultado.

Esto funciona bien la mayor parte del tiempo. Los ejemplos están en la página lib de idb <https://github.com/jakearchibald/idb>.

En algunos raros casos necesitamos el objeto `request` original. Podemos accederlo con la propiedad `promise.request` de la promesa:

```js
let promise = books.add(book); // obtiene una promesa (no espera por su resultado)

let request = promise.request; // objeto request nativo
let transaction = request.transaction; // objeto transaction nativo

// ...hace algún vudú IndexedDB...

let result = await promise; // si aún se necesita
```

## Resumen

IndexedDB puede considerarse como "localStorage con esteroides". Es una simple base de datos de clave-valor, suficientemente poderosa para apps fuera de línea y fácil de usar.

El mejor manual es la especificación, [la actual](https://www.w3.org/TR/IndexedDB-2/) es 2.0, pero algunos métodos de [3.0](https://w3c.github.io/IndexedDB/) (no muy diferente) están soportados parcialmente.

El uso básico puede ser descrito en pocas frases:

1. Obtenga un contenedor promisificador como [idb](https://github.com/jakearchibald/idb).
2. Abra la base de datos: `idb.openDb(name, version, onupgradeneeded)`
    - Cree almacenes de objetos e índices en el manejador `onupgradeneeded` o ejecute la actualización de versión cuando sea necesario.
3. Para peticiones:
    - Cree una transacción `db.transaction('books')` (readwrite si es necesario).
    - Obtenga el almacén de objetos `transaction.objectStore('books')`.
4. Entonces, para buscar por clave, llame métodos sobre el almacén directamente.
    - Para buscar por un campo de objeto, cree un índice.
5. Si los datos son demasiados para la memoria, use un cursor.

Una pequeña app de demo:

[codetabs src="books" current="index.html"]
