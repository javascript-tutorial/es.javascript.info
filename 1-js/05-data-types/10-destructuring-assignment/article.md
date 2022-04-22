# Asignación desestructurante

Las dos estructuras de datos más usadas en JavaScript son `Object` y `Array`.

- Los objetos nos permiten crear una simple entidad que almacena items con una clave cada uno.
- los arrays nos permiten reunir items en una lista ordenada.

Pero cuando los pasamos a una función, tal vez no necesitemos un objeto o array como un conjunto sino en piezas individuales.

La *asignación desestructurante* es una sintaxis especial que nos permite "desempaquetar" arrays u objetos en varias variables, porque a veces es más conveniente. 

La desestructuración también funciona bien con funciones complejas que tienen muchos argumentos, valores por defecto, etcétera. Pronto lo veremos.

## Desestructuración de Arrays

Un ejemplo de cómo el array es desestructurado en variables:

```js
// tenemos un array con el nombre y apellido
let arr = ["John", "Smith"]

*!*
// asignación desestructurante
// fija firstName = arr[0]
// y surname = arr[1]
let [firstName, surname] = arr;
*/!*

alert(firstName); // John
alert(surname);  // Smith
```

Ahora podemos trabajar con variables en lugar de miembros de array.

Se ve genial cuando se combina con `split` u otro método que devuelva un array:

```js run
let [firstName, surname] = "John Smith".split(' ');
alert(firstName); // John
alert(surname);  // Smith
```

Como puedes ver, la sintaxis es simple. Aunque hay varios detalles peculiares. Veamos más ejemplos para entenderlo mejor.

````smart header="\"Desestructuración\" no significa \"destructivo\"."
Se llama "asignación desestructurante" porque "desestructura" al copiar elementos dentro de variables, pero el array en sí no es modificado.

Es sólo una manera más simple de escribir:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Ignorar elementos utilizando comas"
Los elementos no deseados de un array también pueden ser descartados por medio de una coma extra:

```js run
*!*
// segundo elemento no es necesario 
let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
*/!*

alert( title ); // Consul
```

En el código de arriba, el segundo elemento del array es omitido, el tercero es asignado a `title`, y el resto de los elementos del array también se omiten (debido a que no hay variables para ellos).
````

````smart header="Funciona con cualquier iterable en el lado derecho"

...Incluso lo podemos usar con cualquier iterable, no sólo arrays:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
Esto funciona, porque internamente una desestructuración trabaja iterando sobre el valor de la derecha. Es una clase de azúcar sintáctica para llamar `for..of` sobre el valor a la derecha del `=` y asignar esos valores.
````


````smart header="Asignar a cualquier cosa en el lado izquierdo"
Podemos usar cualquier "asignable" en el lado izquierdo.

Por ejemplo, una propiedad de objeto:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

````smart header="Bucle con .entries()"
En el capítulo anterior vimos el método [Object.entries(obj)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object/entries).

Podemos usarlo con la desestructuración para recorrer claves-y-valores de un objeto:

```js run
let user = {
  name: "John",
  age: 30
};

// recorrer claves-y-valores
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, luego age:30
}
```

El código equivalente para `Map` es más simple, porque es iterable:

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map itera como pares [key, value], muy conveniente para desestructurar
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, luego age:30
}
```
````

````smart header="Truco para intercambiar variables"
Hay un conocido truco para intercambiar los valores de dos variables usando asignación desestructurante:

```js run
let guest = "Jane";
let admin = "Pete";

// Intercambiemos valores: hagamos guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (¡intercambiados con éxito!)
```

Aquí creamos un array temporal de dos variables e inmediatamente lo desestructuramos con el orden cambiado.

Podemos intercambiar más de dos variables de este modo.
````

### El resto '...'

En general, si el array es mayor que la lista de la izquierda, los ítems extras son omitidos.

Por ejemplo, aquí solo dos items son tomados, el resto simplemente es ignorado:

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// items posteriores no serán asignados a ningún lugar
```

si queremos también obtener todo lo que sigue, podemos agregarle un parámetro que obtiene "el resto" usando puntos suspensivos "..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
// `rest` es un array de ítems, comenzando en este caso por el tercero.
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
alert(rest.length); // 2
*/!*
```

El valor de `rest` es un array con los elementos restantes del array original. 

Podemos usar cualquier otro nombre de variable en lugar de `rest`, sólo hay que asegurar que tenga tres puntos que lo antecedan y que esté último en la asignación desestructurante.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// ahora titles = ["Consul", "of the Roman Republic"]
```

### Valores predeterminados

Si el array es más corto que la lista de variables a la izquierda, no habrá errores. Los valores ausentes son considerados undefined:

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Si queremos un valor "predeterminado" para reemplazar el valor faltante, podemos proporcionarlo utilizando `=`:

```js run
*!*
// valores predeterminados
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (desde array)
alert(surname); // Anonymous (predeterminado utilizado)
```

Los valores predeterminados pueden ser expresiones más complejas e incluso llamadas a función, que serán evaluadas sólo si el valor no ha sido proporcionado.

Por ejemplo, aquí utilizamos la función `prompt` para dos valores predeterminados.

```js run
// sólo ejecuta la captura para surname
let [name = prompt('nombre?'), surname = prompt('apellido?')] = ["Julius"];

alert(name);    // Julius (desde array)
alert(surname); // lo que reciba la captura
```

Observa que el `prompt` se ejecuta solamente para el valor faltante (`surname`).

## Desestructuración de objetos

La asignación desestructurante también funciona con objetos.

La sintaxis básica es:

```js
let {var1, var2} = {var1:…, var2:…}
```

Debemos tener un símil-objeto en el lado derecho, el que queremos separar en variables. El lado izquierdo contiene un símil-objeto "pattern" para sus propiedades correspondientes. En el caso más simple, es la lista de nombres de variables en `{...}`.

Por ejemplo:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
let {title, width, height} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Las propiedades `options.title`, `options.width` y `options.height` son asignadas a las variables correspondientes. 

No importa el orden sino los nombres. Esto también funciona:

```js
// cambiado el orden en let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

El patrón de la izquierda puede ser más complejo y especificar el mapeo entre propiedades y variables.

Si queremos asignar una propiedad a una variable con otro nombre, por ejemplo que `options.width` vaya en la variable llamada `w`, lo podemos establecer usando dos puntos:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

*!*
// { propiedadOrigen: variableObjetivo }
let {width: w, height: h, title} = options;
*/!*

// width -> w
// height -> h
// title -> title

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Los dos puntos muestran "qué : va dónde". En el ejemplo de arriba la propiedad `width` va a `w`, `height` va a `h`, y `title` es asignado al mismo nombre.

Para propiedades potencialmente faltantes podemos establecer valores predeterminados utilizando `"="`, de esta manera:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = 100, height = 200, title} = options;
*/!*

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
```

Al igual que con arrays o argumentos de función, los valores predeterminados pueden ser cualquier expresión e incluso llamados a función, las que serán evaluadas si el valor no ha sido proporcionado.

En el código de abajo `prompt` pregunta por `width`, pero no por `title`:

```js run
let options = {
  title: "Menu"
};

*!*
let {width = prompt("¿ancho?"), title = prompt("¿título?")} = options;
*/!*

alert(title);  // Menu
alert(width);  // (lo que sea el resultado de la captura)
```

También podemos combinar ambos, los dos puntos y la igualdad:

```js run
let options = {
  title: "Menu"
};

*!*
let {width: w = 100, height: h = 200, title} = options;
*/!*

alert(title);  // Menu
alert(w);      // 100
alert(h);      // 200
```

Si tenemos un objeto complejo con muchas propiedades, podemos extraer solamente las que necesitamos:

```js run
let options = {
  title: "Menu",
  width: 100,
  height: 200
};

// sólo extrae título como variable
let { title } = options;

alert(title); // Menu
```

### El patrón resto "..."

¿Qué pasa si el objeto tiene más propiedades que las variables que tenemos? ¿Podemos tomar algunas y luego asignar el "resto" en alguna parte?

Podemos usar el patrón resto de la misma forma que lo usamos con arrays. Esto no es soportado en algunos navegadores antiguos (para IE, use el polyfill Babel), pero funciona en los navegadores modernos.

Se ve así:

```js run
let options = {
  title: "Menu",
  height: 200,
  width: 100
};

*!*
// title = propiedad llamada title
// rest = objeto con el resto de las propiedades
let {title, ...rest} = options;
*/!*

// ahora title="Menu", rest={height: 200, width: 100}
alert(rest.height);  // 200
alert(rest.width);   // 100
```

````smart header="La trampa si no hay `let`"
En los ejemplos de arriba, las variables fueron declaradas en la asignación: `let {…} = {…}`. Por supuesto que también podemos usar variables existentes, sin `let`. Pero hay una trampa.

Esto no funcionará:
```js run
let title, width, height;

// error en esta línea
{title, width, height} = {title: "Menu", width: 200, height: 100};
```

El problema es que JavaScript trata al `{...}` como un bloque de código en el flujo principal de código (no dentro de otra expresión). Estos bloques de código pueden ser usados para agrupar sentencias, de esta manera:

```js run
{
  // una bloque de código
  let message = "Hola";
  // ...
  alert( message );
}
```

Aquí JavaScript supone que tenemos un bloque de código, es por eso que hay un error. Nosotros en cambio queremos desestructuración.

Para mostrarle a JavaScript que no es un bloque de código, podemos rodear la expresión entre paréntesis `(...)`:

```js run
let title, width, height;

// ahora está bien
*!*(*/!*{title, width, height} = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Desestructuración anidada

Si un objeto o array contiene objetos y arrays anidados, podemos utilizar patrones del lado izquierdo más complejos para extraer porciones más profundas.

En el código de abajo `options` tiene otro objeto en la propiedad `size` y un array en la propiedad `items`. El patrón en el lado izquierdo de la asignación tiene la misma estructura para extraer valores de ellos:

```js run
let options {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};

// la asignación desestructurante fue dividida en varias líneas para mayor claridad
let {
  size: { // colocar tamaño aquí
    width,
    height
  },
  items: [item1, item2], // asignar ítems aquí
  title = "Menu" // no se encuentra en el objeto (se utiliza valor predeterminado)
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

Todas las propiedades del objeto `options` con excepción de `extra` que no está en el lado izquierda, son asignadas a las variables correspondientes:

![](destructuring-complex.svg)

Por último tenemos `width`, `height`, `item1`, `item2` y `title` desde el valor predeterminado.

Tenga en cuenta que no hay variables para `size` e `items`, ya que tomamos su contenido en su lugar.

## Argumentos de función inteligentes

Hay momentos en que una función tiene muchos argumentos, la mayoría de los cuales son opcionales. Eso es especialmente cierto para las interfaces de usuario. Imagine una función que crea un menú. Puede tener ancho, altura, título, elementos de lista, etcétera.

Aquí hay una forma errónea de escribir tal función:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

En la vida real, el problema es cómo recordar el orden de los argumentos. Normalmente los IDEs (Entorno de desarrollo integrado) intentan ayudarnos, especialmente si el código está bien documentado, pero aún así... Otro problema es cómo llamar a una función si queremos que use sus valores predeterminados en la mayoría de los argumentos.

¿Así?

```js
// undefined para que use los valores predeterminados
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Esto no es nada grato. Y se torna ilegible cuando tratamos con muchos argumentos.

¡La desestructuración llega al rescate!

Podemos pasar los argumentos como un objeto, y la función inmediatamente los desestructura en variables:

```js run
// pasamos un objeto a la función
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...y los expande inmediatamente a variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – desde options
  // width, height – usan los predeterminados
  alert( `${title} ${width} ${height}` ); // My Menu 200 100
  alert( items ); // Item1, Item2
}

showMenu(options);
```

También podemos usar desestructuración más compleja con objetos anidados y mapeo de dos puntos:

```js run
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

*!*
function showMenu({
  title = "Untitled",
  width: w = 100,  // width va a w
  height: h = 200, // height va a h
  items: [item1, item2] // el primer elemento de items va a item1, el segundo a item2
}) {
*/!*
  alert( `${title} ${w} ${h}` ); // My Menu 100 200
  alert( item1 ); // Item1
  alert( item2 ); // Item2
}

showMenu(options);
```

La sintaxis completa es la misma que para una asignación desestructurante:
```js
function({
  incomingProperty: varName = defaultValue  // propiedadEntrante: nombreVariable = valorPredeterminado
  ...
})
```

Entonces, para un objeto de parámetros, habrá una variable `varName` para la propiedad `incomingProperty`, con `defaultValue` por defecto.

Por favor observe que tal desestructuración supone que `showMenu()` tiene un argumento. Si queremos todos los valores predeterminados, debemos especificar un objeto vacío:

```js
showMenu({}); // ok, todos los valores son predeterminados

showMenu(); // esto daría un error
```

Podemos solucionar esto, poniendo `{}` como valor predeterminado para todo el objeto de argumentos:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

En el código de arriba, todo el objeto de argumentos es `{}` por defecto, por lo tanto siempre hay algo para desestructurar.

## Resumen

- La asignación desestructurante permite mapear instantáneamente un objeto o array en varias variables.
- La sintaxis completa para objeto:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    Esto significa que la propiedad `prop` se asigna a la variable `varName`; pero si no existe tal propiedad, se usa el valor `default`.

    Las propiedades de objeto que no fueron mapeadas son copiadas al objeto `rest`.

- La sintaxis completa para array:

    ```js
    let [item1 = default, item2, ...resto] = array
    ```

    El primer item va a `item1`, el segundo a `item2`, todos los ítems restantes crean el array `resto`.

- Es posible extraer información desde arrays/objetos anidados, para esto el lado izquierdo debe tener la misma estructura que el lado derecho.
