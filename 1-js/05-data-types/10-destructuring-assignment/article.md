# Asignación Desestructurante

Las dos estructuras de datos más usadas en JavaScript son `Objetos` y `Array`.

<<<<<<< HEAD
Los objetos nos permiten crear una entidad individual que almacena elementos de información por propiedad, y los arrays nos permiten reunir elementos de información en una colección ordenada.

Pero cuando pasamos estos a una función, tal vez no necesite un objeto/array como un conjunto, sino más bien piezas individuales.

*Asignación Desestructurante* es una sintaxis especial que nos permite "vaciar" arrays u objetos en varias variables, ya que esto a veces es más conveniente. La desestructuración también funciona bien con funciones complejas que tienen muchos argumentos, valores por defecto, etcétera.
=======
- Objects allow us to create a single entity that stores data items by key. 
- Arrays allow us to gather data items into an ordered list.

Although, when we pass those to a function, it may need not an object/array as a whole. It may need individual pieces.

*Destructuring assignment* is a special syntax that allows us to "unpack" arrays or objects into a bunch of variables, as sometimes that's more convenient. 

Destructuring also works great with complex functions that have a lot of parameters, default values, and so on. Soon we'll see that.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

## Desestructuración  de Arrays

<<<<<<< HEAD
Un ejemplo de cómo el array es desestructurado en variables:

```js
// tenemos un array con el nombre y apellido
let arr = ["Ilya", "Kantor"]
=======
Here's an example of how an array is destructured into variables:

```js
// we have an array with the name and surname
let arr = ["John", "Smith"]
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

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

<<<<<<< HEAD
````smart header="\"Desestructuración\" no significa \"destructivo\"."
Se llama "asignación desestructurante," porque "desestructura" al copiar elementos dentro de variables. Pero el array en sí no es modificado.
=======
As you can see, the syntax is simple. There are several peculiar details though. Let's see more examples, to better understand it.

````smart header="\"Destructuring\" does not mean \"destructive\"."
It's called "destructuring assignment," because it "destructurizes" by copying items into variables. But the array itself is not modified.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Es sólo una manera más simple de escribir:
```js
// let [firstName, surname] = arr;
let firstName = arr[0];
let surname = arr[1];
```
````

````smart header="Ignorar elementos utilizando comas"
Elementos no deseados de un array también pueden ser descartados por medio de una coma extra:

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

...Incluso, lo podemos usar con cualquier iterable, no sólo arrays:

```js
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);
```
That works, because internally a destructuring assignment works by iterating over the right value. It's kind of syntax sugar for calling `for..of` over the value to the right of `=` and assigning the values.
````


<<<<<<< HEAD
````smart header="Asignar a cualquier cosa en el lado izquierdo"

Podemos usar cualquier "asignable" en el lado izquierdo.
=======
````smart header="Assign to anything at the left-side"
We can use any "assignables" at the left side.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Por ejemplo, una propiedad de objeto:
```js run
let user = {};
[user.name, user.surname] = "John Smith".split(' ');

alert(user.name); // John
alert(user.surname); // Smith
```

````

<<<<<<< HEAD
````smart header="Bucle con .entries()"

En el capítulo anterior vimos el método [Object.entries(obj)](mdn:js/Object/entries).
=======
````smart header="Looping with .entries()"
In the previous chapter we saw the [Object.entries(obj)](mdn:js/Object/entries) method.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

Podemos usarlo con la desestructuración para recorrer propiedades-y-valores de un objeto:

```js run
let user = {
  name: "John",
  age: 30
};

// recorrer propiedades-y-valores
*!*
for (let [key, value] of Object.entries(user)) {
*/!*
  alert(`${key}:${value}`); // name:John, luego age:30
}
```

<<<<<<< HEAD
...Y lo mismo para map:
=======
The similar code for a `Map` is simpler, as it's iterable:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
let user = new Map();
user.set("name", "John");
user.set("age", "30");

*!*
// Map iterates as [key, value] pairs, very convenient for destructuring
for (let [key, value] of user) {
*/!*
  alert(`${key}:${value}`); // name:John, luego age:30
}
```
````
### El resto '...'

<<<<<<< HEAD
Si queremos no sólo obtener los primeros valores, pero también reunir todo lo que sigue -- podemos agregar un argumento más que obtiene "el resto" utilizando tres puntos `"..."`:
=======
````smart header="Swap variables trick"
There's a well-known trick for swapping values of two variables using a destructuring assignment:

```js run
let guest = "Jane";
let admin = "Pete";

// Let's swap the values: make guest=Pete, admin=Jane
*!*
[guest, admin] = [admin, guest];
*/!*

alert(`${guest} ${admin}`); // Pete Jane (successfully swapped!)
```

Here we create a temporary array of two variables and immediately destructure it in swapped order.

We can swap more than two variables this way.
````

### The rest '...'

Usually, if the array is longer when the list at the left, the "extra" items are omitted.

For example, here only two items are taken, and the rest is just ignored:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// Furher items aren't assigned anywhere
```

If we'd like also to gather all that follows -- we can add one more parameter that gets "the rest" using three dots `"..."`:

```js run
let [name1, name2, *!*...rest*/!*] = ["Julius", "Caesar", *!*"Consul", "of the Roman Republic"*/!*];

*!*
<<<<<<< HEAD
// Notar que el tipo de `rest` es Array.
alert(resto[0]); // Consul
alert(resto[1]); // of the Roman Republic
=======
// rest is array of items, starting from the 3rd one
alert(rest[0]); // Consul
alert(rest[1]); // of the Roman Republic
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f
alert(rest.length); // 2
*/!*
```

<<<<<<< HEAD
El valor de `rest` es un array de los elementos restantes. Podemos usar cualquier otro nombre de variable en lugar de `rest`, sólo hay que asegurar que tenga tres puntos que lo antecedan y que esté último en la asignación desestructurante.
=======
The value of `rest` is the array of the remaining array elements. 

We can use any other variable name in place of `rest`, just make sure it has three dots before it and goes last in the destructuring assignment.

```js run
let [name1, name2, *!*...titles*/!*] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
// now titles = ["Consul", "of the Roman Republic"]
```
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

### Valores predeterminados

<<<<<<< HEAD
Si hay menor cantidad de valores en el array que variables en la asignación, no habrá error. Valor ausentes son considerados undefined:
=======
If the array is shorter than the list of variables at the left, there'll be no errors. Absent values are considered undefined:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
*!*
let [firstName, surname] = [];
*/!*

alert(firstName); // undefined
alert(surname); // undefined
```

Si queremos un valor "predeterminado" para reemplzar el valor faltante, podemos proporcionarlo utilizando `=`:

```js run
*!*
// valores predeterminados
let [name = "Guest", surname = "Anonymous"] = ["Julius"];
*/!*

alert(name);    // Julius (desde array)
alert(surname); // Anonymous (predeterminado utilizado)
```

Los valores predeterminados pueden ser más complejos o incluso llamadas de función. Son evaluados sólo si el valor no ha sido proporcionado.

<<<<<<< HEAD
Por ejemplo, aquí utilizamos la función `prompt` para dos valores predeterminados. Pero sólo se ejecutará para el valor faltante:
=======
For instance, here we use the `prompt` function for two defaults:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js run
// sólo ejecuta la captura para surname
let [name = prompt('nombre?'), surname = prompt('apellido?')] = ["Julius"];

alert(name);    // Julius (desde array)
alert(surname); // lo que reciba la captura
```

Please note: the `prompt` will run only for the missing value (`surname`).

## Desestructuración de Objeto

La asignación desestructurante también funciona con objetos.

La sintaxis básica es:

```js
let {var1, var2} = {var1:…, var2:…}
```

<<<<<<< HEAD
Tenemos un objeto existente en el lado derecho, que queremos dividir en variables. El lado izquierdo contiene un "patrón" para propiedades correspondientes. En el caso simple, esto es una lista de nombre de variables en `{...}`.
=======
We should have an existing object at the right side, that we want to split into variables. The left side contains an object-like "pattern" for corresponding properties. In the simplest case, that's a list of variable names in `{...}`.
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

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

<<<<<<< HEAD
Las propiedades `options.title`, `options.width` y `options.height` son asignadas a las variables correspondientes. El órden no importa. Esto también funciona:
=======
Properties `options.title`, `options.width` and `options.height` are assigned to the corresponding variables. 

The order does not matter. This works too:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

```js
// cambiado el órden en let {...}
let {height, width, title} = { title: "Menu", height: 200, width: 100 }
```

El patrón de la izquierda puede ser más complejo y especificar el mapeo entre propiedades y variables.

<<<<<<< HEAD
Si queremos asignar una propiedad a una variable con otro nombre, por ejemplo, `options.width` que vaya en la variable llamada `w`, entonces la podemos fijar usando dos puntos:
=======
If we want to assign a property to a variable with another name, for instance, make `options.width` go into the variable named `w`, then we can set the variable name using a colon:
>>>>>>> 468e3552884851fcef331fbdfd58096652964b5f

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

Los dos puntos muestran "qué : va dónde". En el ejemplo de arriba la propiedad `width` va a `w`, propiedad `height` va a `h`, y `title` es asignado al mismo nombre.

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

Al igual que con arrays o argumentos de función, los valores predeterminados pueden ser cualquier expresión o incluso llamados a función. Serán evaluados si el valor no ha sido proporcionado.

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

Qué pasa si el objeto tiene más propiedades que las variables que tenemos? Podemos tomar algunas y luego asignar el "resto" en alguna parte?

Podemos usar el patrón resto, de la misma forma que lo usamos con arrays. No es compatible con algunos navegadores antiguos (IE, use Babel para rellenarlo), pero funciona en los navegadores modernos.


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

````smart header="Trampa si no hay `let`"
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

Para mostrarle a JavaScript que no es un bloque de código, podemos rodear la expresión en paréntesis `(...)`:

```js run
let title, width, height;

// ahora está bien
*!*(*/!*{title, width, height}
 = {title: "Menu", width: 200, height: 100}*!*)*/!*;

alert( title ); // Menu
```
````

## Desestructuración anidada

Si un objeto o un array contiene objetos y arrays anidados, podemos utilizar patrones del lado izquierdo más complejos para extraer porciones más profundas.

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

// asignación desestructurante dividida en varias líneas para mayor claridad
let {
  size: { // colocar tamaño aqui
    width,
    height
  },
  items: [item1, item2], // asignar items aqui
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

Por último tenemos `width`, `height`, `item1`, `item2` y `title` del valor predeterminado.

Tenga en cuenta que no hay variables para `size` e `items`, ya que tomamos su contenido en su lugar.

## Argumentos de función inteligentes

Hay momentos en que una función tiene muchos argumentos, la mayoría de los cuales son opcionales. Eso es especialmente cierto para las interfaces de usuario. Imagine una función que crea un menú. Puede tener ancho, una altura, un título, elementos de lista, etcétera.

Aquí hay una forma errónea de escribir tal función:

```js
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
  // ...
}
```

En la vida real, el problema es cómo recordar el orden de los argumentos. Normalmente los IDEs (Entorno de desarrollo integrado) intentan ayudarnos, especialmente si el código está bien documentado, pero aún... Otro problema es cómo llamar a la función cuando la mayoría de los argumentos están bien por defecto.

Así?

```js
// undefined cuando los valores predeterminados son correctos
showMenu("My Menu", undefined, undefined, ["Item1", "Item2"])
```

Esto es nada grato. Y se torna ilegible cuando tratamos con muchos argumentos.

¡La desestructuración llega al rescate!

Podemos pasar argumentos como un objeto, y la función inmediatamente los desestructura en variables:

```js run
// pasamos objeto a función
let options = {
  title: "My menu",
  items: ["Item1", "Item2"]
};

// ...y los expande inmediatamente a variables
function showMenu(*!*{title = "Untitled", width = 200, height = 100, items = []}*/!*) {
  // title, items – taken from options,
  // width, height – defaults used
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
  width: w = 100,  // width goes to w
  height: h = 200, // height goes to h
  items: [item1, item2] // items primer elemento va a item1, segundo elemento a item2
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
  incomingProperty: varName = defaultValue
  ...
})
```

Luego, para un objeto de argumentos, habrá una variable `varName` para la propiedad `incomingProperty`, con `defaultValue` por defecto.

Por favor tome nota que tal des-estructuración supone que `showMenu()` tiene un argumento. Si queremos todos los valores predeterminados, entonces debemos especificar un objeto vació:

```js
showMenu({}); // ok, todos los valores son predeterminados

showMenu(); // esto daría un error
```

Podemos solucionar esto al hacer `{}` el valor predeterminado para todo el objeto de argumentos:

```js run
function showMenu({ title = "Menu", width = 100, height = 200 }*!* = {}*/!*) {
  alert( `${title} ${width} ${height}` );
}

showMenu(); // Menu 100 200
```

En el código de arriba, todo el objeto de argumentos es `{}` por defecto, por lo tanto siempre hay algo para desestructurar.

## Resumen

- La asignación desestructurante permite mapear instantáneamente un objeto o array en varias variables.
- La sintaxis objeto completo:
    ```js
    let {prop : varName = default, ...rest} = object
    ```

    Esto significa que la propiedad `prop` debería ir en la variable `varName` y, si no existe tal propiedad, entonces el valor `default` debe ser usado.

    Las propiedades de objeto que no tienen mapeo son copiadas al objeto `rest`.

- La sintaxis array completa:

    ```js
    let [item1 = default, item2, ...resto] = array
    ```

    El primer item va a `item1`; el segundo va dentro de `item2`, todo el resto crea el array `resto`.

- Es posible extraer información desde arrays/objetos anidados, para esto el lado izquierdo debe tener la misma estructura que el lado derecho.
