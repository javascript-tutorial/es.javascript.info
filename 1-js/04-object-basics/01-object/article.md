
# Objetos

Como aprendimos desde el capítulo <info:types>, hay ocho tipos de datos en JavaScript. Siete de ellos se denominan "primitivos", porque sus valores contienen solo un dato (sea un `string`, un número o lo que sea).

En contraste, los objetos son usados para almacenar colecciones varios datos por medio de una clave --`key`-- y entidades más complejas. En JavaScript, los objetos penetran casi todos los aspectos del lenguaje. Por lo tanto, debemos comprenderlos primero antes de profundizar en cualquier otro lugar.

Un objeto se puede crear usando corchetes `{…}` con una lista opcional de *propiedades*. Una propiedad es un par "clave: valor", donde `key` es una cadena (también llamada "nombre de la propiedad"), y `value` puede ser cualquier cosa.

Podemos imaginar un objeto como un gabinete con archivos firmados. Cada pieza de datos es almacenada en su archivo por la clave. Es fácil encontrar un archivo por su nombre o agregar / eliminar un archivo.

![](object.svg)

Se puede crear un objeto vacío ("gabinete vacío") utilizando una de dos sintaxis:

```js
let user = new Object(); // cintaxis del "construtor de objetos"
let user = {};  // sintaxis del "objeto literal"
```

![](object-user-empty.svg)

Regularmente, {...}se utilizan los corchetes. Esa declaración se llama *objeto literal*.

## Literales y propiedades

Podemos poner inmediatamente algunas propiedades dentro de `{...}` como pares "clave: valor":

```js
let user = {     // un objeto
  name: "John",  // Por la clave "name" se almacena el valor "John"
  age: 30        // Por la clave "age" se almacena el valor 30
};
```

Una propiedad tiene una clave (también conocida como "nombre" o "identificador") antes de los dos puntos `":"` y un valor a la derecha

En el objeto `user` hay dos propiedades:

1. La primer propiedad tiene el nombre `"name"` y el valor `"John"`.
2. La segunda tienen el nombre `"age"` y el valor `30`.

El objeto `user` resultante puede ser imaginado como un gabinete con dos archivos firmados con las etiquetas "name" y "age".

![user object](object-user.svg)

Podemos agregar, eliminar y leer archivos de ahí en cualquier momento.

Se puede acceder a los valores de las propiedades utilizando la notación de punto:

```js
// Obteniendo los valores de las propiedades del objeto:
alert( user.name ); // John
alert( user.age ); // 30
```

El valor puede ser de cualquier tipo. Agreguemos uno booleano:

```js
user.isAdmin = true;
```

![user object 2](object-user-isadmin.svg)

Para remover una propiedad podemos usar el operador `delete`:

```js
delete user.age;
```

![user object 3](object-user-delete.svg)

También podemos nombrar propiedades con más de una plabra (*multiword*). Pero, de ser así, debemos citarlos `"..."`:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // Las claves multiword deben ir citadas
};
```

![](object-user-props.svg)


La última propiedad en la lista puede terminar con una coma:
```js
let user = {
  name: "John",
  age: 30*!*,*/!*
}
```
Eso se llama una coma "final" o "colgante". Facilita agregar / eliminar / mover propiedades, porque todas las líneas se vuelven iguales.

````smart header="Los objetos con *const* pueden cambiarse"
Toma en cuenta: un objeto declarado con `const` *puede* ser modificado.

Por ejemplo:

```js run
const user = {
  name: "John"
};

*!*
user.name = "Pete"; // (*)
*/!*

alert(user.name); // Pete
```

Podría parecer que la linea `(*)` ocasiona un error, pero no. El `const` corrige el valor de `user` pero no su contenido.

El `const` podría dar error solo si intentamos configurar `user=...` en lo absoluto.

Hay otra manera de crear propiedades de objeto constantes, las cubriremos después en el capítulo <info:property-descriptors>.
````

## Corchetes

Para acceder a propiedades *multiword* la notación de punto no funciona:

```js run
// Esto nos daría un error de sintaxis
user.likes birds = true
```

JavaScript no entiende eso. El piensa que hemos accedido a `user.likes` y entonces nos da un error de sintaxis cuando aparece el inesperado `birds`.

El punto requiere que la clave sea un identificador de variable válido. Eso implica que: no contenga espacios, no comience con un dígito y no incluya caracteres especiales (`$` y `_` sí se permiten).

Existe una "notación de corchetes" alternativa que funciona con cualquier string:

```js run
let user = {};

// configurando
user["likes birds"] = true;

// obteniendo
alert(user["likes birds"]); // true

// eliminando
delete user["likes birds"];
```

Ahora todo está bien. Nota que el string dentro de los corchetes está adecuadamente citado (cualquier tipo de comillas serviría).

Los corchetes también nos proveen de una forma para obtener el nombre de la propiedad como resultado de cualquier expresión como una variable -- en lugar de una cadena literal -- de la siguiente manera:

```js
let key = "likes birds";

// Tal cual: user["likes birds"] = true;
user[key] = true;
```

Aquí la variable `key` puede calcularse en tiempo de ejecución o depender de la entrada del usuario y luego lo usamos para acceder a la propiedad. Eso nos da mucha flexibilidad.

Por ejemplo:

```js run
let user = {
  name: "John",
  age: 30
};

let key = prompt("¿Qué te gustaría saber acerca del usuario?", "name");

// acceso por medio de una variable
alert( user[key] ); // John (si se ingresara "name")
```

La notación de punto no puede ser usada de manera similar:

```js run
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```

### Propiedades calculadas

Podemos usar corchetes en un objeto literal al crear un objeto. A esto se le llama  *propiedades calculadas*.

Por ejemplo:

```js run
let fruit = prompt("¿Qué fruta comprar?", "Manzana");

let bag = {
*!*
  [fruit]: 5, // El nombre de la propiedad se obtiene de la variable fruit
*/!*
};

alert( bag.apple ); // 5 si fruit es="apple"
```

El significado de una propiedad calculada es simple: `[fruit]` significa que se debe tomar el nombre de la propiedad `fruit`.

Entonces, si un visitante ingresa `"apple"`, `bag` se convertira en `{apple: 5}`.

Esencialmente esto funciona igual que:
```js run
let fruit = prompt("¿Qué fruta comprar?", "Manzana");
let bag = {};

// Toma el nombre de la propiedad de la variable fruit
bag[fruit] = 5;
```

...Pero luce mejor.

Podemos usar expresiones más complejas dentro de los corchetes:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Los corchetes son mucho más potentes que la notación de punto. Permiten cualquier nombre de propiedad y variables. Pero también son más engorrosos de escribir.

Entonces, la mayoría de las veces, cuando los nombres de propiedad son conocidos y simples, se utiliza el punto. Y si necesitamos algo más complejo, entonces cambiamos a corchetes.

## Shorthand paraa valores de propiedad

En el código real, a menudo usamos variables existentes como valores de los nombres de propiedades.

Por ejemplo:

```js run
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...otras propiedades
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

En el ejemplo anterior las propiedades tienen los mismos nombres que las variables. El uso de la creación de propiedades a partir de las variables es tan común que existe un *shorthand (abreviatura) para valores de propiedad* especial para acortarla.

En lugar de `name:name`, simplemente podemos escribir `name`, tal cual:

```js
function makeUser(name, age) {
*!*
  return {
    name, // igual que name:name
    age,  // igual que age:age
    // ...
  };
*/!*
}
```

Podemos usar ambos tipos de notación en un mismo objeto, la normal y el shorthand:

```js
let user = {
  name,  // igual que name:name
  age: 30
};
```


## Limitaciones de nombres de propiedad

Como ya sabemos, una variable no puede tener un nombre igual a una de las palabras reservadas del lenguaje como "for", "let", "return", etc.

Pero para una propiedad de objeto no existe tal restricción:

```js run
// Estas propiedades están bien
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

En resumen, no hay limitaciones en los nombres de propiedades. Pueden ser cadenas o símbolos (un tipo especial para identificadores que se cubrirán más adelante).

Otros tipos se convierten automáticamente en cadenas.

Por ejemplo, un número `0` se convierte en cadena `"0"` cuando se usa como clave de propiedad:

```js run
let obj = {
  0: "test" // igual que "0": "test"
};

// ambos alerts acceden a la misma propiedad (el número 0 se convierte a una cadena "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (la misma propiedad)
```

Hay una pequeña sorpresa por una propiedad especial llamada `__proto__`. No podemos establecerlo dentro de un valor que no sea de objeto:

```js run
let obj = {};
obj.__proto__ = 5; // asignando un número
alert(obj.__proto__); // [objeto Object] - el valor es un objeto, no funciona como se "debería"
```

Como podemos ver en el código, se ignora la asignación a un primario `5`.

Veremos la naturaleza especial de `__proto__` en los [capítulos siguientes](info:prototype-inheritance), y sugeriremos las [formas de arreglar](info:prototype-methods) tal comportamiento.

## La prueba de propiedad existente, el operador "in"

Una notable característica de los objetos en JavaScript, en comparación con muchos otros lenguajes, es que es posible acceder a cualquier propiedad. ¡No habrá error si la propiedad no existe!

La lectura de una propiedad no existente solo devuelve `undefined`. Así que podemos probar fácilmente si la propiedad existe:

```js run
let user = {};

alert( user.noSuchProperty === undefined ); // true significa que "no existe tal propiedad"
```

También existe un operador especial para ello: `"in"`.

La sintaxis es:
```js
"key" in object
```

Por ejemplo:

```js run
let user = { name: "John", age: 30 };

alert( "age" in user ); // mostrará "true", user.age sí existe
alert( "blabla" in user ); // mostará false, user.blabla no existe
```

Nota que a la izquierda de `in` debe estar el *nombre de la propiedad* que suele ser un string citado.

Si omitimos las comillas significa una variable. Esta variable debería almacenar el nombre real que será probado. Por ejemplo:

```js run
let user = { age: 30 };

let key = "age";
alert( *!*key*/!* in user ); // true, porque su propiedad "age" si existe dentro del objeto
```

Pero... ¿Por qué existe el operador `in`? ¿No es suficiente comparar con `undefined`?

La mayoría de las veces las comparaciones con `undefined` funcionan bien. Pero hay un caso especial donde esto falla y aún así `"in"` funciona correctamente.

Es cuando existe una propiedad de objeto, pero almacena  `undefined`:

```js run
let obj = {
  test: undefined
};

alert( obj.test ); // es undefined, entonces... ¿Quiere decir realmente existe tal propiedad?

alert( "test" in obj ); //es true, ¡La propiedad sí existe!
```

En el código anterior, la propiedad  `obj.test` técnicamente existe. Entonces el operador `in` funciona correctamente.

Situaciones como esta suceden raramente ya que `undefined` no debe ser explícitamente asignado. Comunmente usamos `null` para valores "desconocidos" o "vacios". Por lo que el operdaor `in` es un invitado exótico en nuestro código.


## El bucle "for..in" 

Para recorrer todas las claves de un objeto existe una forma especial de bucle: `for..in`. Esto es algo completamente diferente a la construcción `for(;;)` que estudiaremos más adelante.

La sintaxis:

```js
for (key in object) {
  // se ejecuta e cuerpo para cada clave entre las propiedades del objeto
}
```

Por ejemplo, mostremos todas las propiedades de `user`:

```js run
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // claves
  alert( key );  // name, age, isAdmin
  // valores de las claves
  alert( user[key] ); // John, 30, true
}
```

Nota que todas las construcciones "for" nos permiten declarar variables para bucle dentro del bucle, como `let key` aquí.

Además podriamos usar otros nombres de variables en lugar de `key`. Por ejemplo, `"for (let prop in obj)"` también se usa bastante.

### Ordenado como un objeto

¿Los objetos son ordenados? Es decir, si creamos un bucle sobre un objeto, ¿obtenemos todas las propiedades en el mismo orden en el que se agregaron? ¿Podemos confiar en ello?

La respuesta corta es: "ordenados de una forma especial": las propiedades de enteros se ordenan, los demás aparecen en el orden de la creación. Entremos en detalle.

Como ejemplo, consideremos un objeto con códigos telefónicos:

```js run
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};

*!*
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}
*/!*
```

El objeto puede usarse para sugerir una lista de opciones al usuario. Si estamos haciendo un sitio principalmente para el público alemán, entonces probablemente queremos que `49` sea el primero.

Pero si ejecutamos el código, veremos una imagen totalmente diferente:

- USA (1) va primero
- Luego Switzerland (41) y así sucecivamente.

Los códigos telefónicos van en orden ascendente porque son enteros. Entonces vemos  `1, 41, 44, 49`.

````smart header="¿Propiedades de enteros? ¿Qué es eso?"
El término "propiedad de enteros" aquí significa que una cadena se puede convertir a y desde desde un entero sin nigún cambio.

Entonces, "49" es un nombre de propiedad entero, porque cuando este se transforma a un entero y viceversa continua siendo el mismo. Pero "+49" y "1.2" no lo son:

```js run
// Math.trunc es una función incorporada que elimina la parte decimal
alert( String(Math.trunc(Number("49"))) ); // "49", es igual, una propiedad entera
alert( String(Math.trunc(Number("+49"))) ); // "49", no es igual "+49" ⇒ no es una propiedad entera
alert( String(Math.trunc(Number("1.2"))) ); // "1", no es igual "1.2" ⇒ no es una propiedad entera
```
````

...Por otro lado, si las claves no son enteras, se enumeran en el orden de creación, por ejemplo:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // Se agrega una propiedad más

*!*
// Las propiedades que no son enteras se enumeran en el orden de creación
*/!*
for (let prop in user) {
  alert( prop ); // name, surname, age
}
```

Entonces, para solucionar el problema con los códigos telefónicos, podemos "hacer trampa" haciendo que los códigos no sean enteros. Agregar un signo más `"+"` antes de cada código será más que suficiente.

Justo así:

```js run
let codes = {
  "+49": "Germany",
  "+41": "Switzerland",
  "+44": "Great Britain",
  // ..,
  "+1": "USA"
};

for (let code in codes) {
  alert( +code ); // 49, 41, 44, 1
}
```

Ahora sí funciona como debería.

## Resumen

Los objetos son arreglos asociativos con varias características especiales.

Almacenan propiedades (pares de clave-valor), donde:
- Las claves de propiedad deben ser cadenas o símbolos (generalmente strings).
- Los valores pueden ser de cualquier tipo.

Para acceder a una propiedad, podemos usar:
- La notación de punto: `obj.property`.
- Notación de corchetes `obj["property"]`. Los corchetes permiten tomar la clave de una variable, como `obj[varWithKey]`.

Operadores adicionales:
- Para eliminar una propiedad: `delete obj.prop`.
-Para comprobar si existe una propiedad con la clave proporcionada: `"key" in obj`.
- Para crear bluces sobre un objeto: bucle `for (let key in obj)`.

Lo que hemos estudiado en este capítulo se llama "objeto simple", o solamente `Object`.

Hay muchos otros tipos de objetos en JavaScript:

- `Array` para almacenar colecciones de datos ordenados,
- `Date` para almacenar la información sobre fecha y hora,
- `Error` para almacenar información sobre un error.
- ...Y así.

Tienen sus características especiales que estudiaremos más adelante. A veces las personas dicen algo como "Tipo de matriz" o "Tipo de fecha", pero formalmente no son tipos en sí, sino que pertenecen a un tipo de datos de "objeto" simple y lo amplian a varias maneras.

Los objetos en JavaScript son muy poderosos. Aquí acabamos de arañar la superficie de un tema que es realmente enorme. Trabajaremos estrechamente con los objetos y aprenderemos más sobre ellos en otras partes del tutorial.
