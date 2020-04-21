# Constructor, operador "new"

El sintaxis habitual `{...}` permite crear un objeto. Pero a menudo necesitamos crear varios objetos similares, como múltiples usuarios o elementos de menú, etcétera.

Esto se puede realizar utilizando el constructor de Funciones y el operador `"new"`.

## Constructor de Función

El Constructor de funciones es técnicamente una función normal. Aunque hay dos convenciones:

1. Son nombradas con la primera letra mayúscula.
2. Sólo deben ejecutarse con el operador `"new"`.

Por ejemplo:

```js run
function User(nombre) {
  this.nombre = nombre
  this.isAdmin = false;
}

*!*
let user = new User("Jack");
*/!*

alert(user.nombre); // Jack
alert(user.isAdmin); // false
```

Cuando una función es ejecutada con `new`, realiza los siguientes pasos:

1. Se crea un nuevo objeto vacío y se asigna a `this`.
2. Se ejecuta el cuerpo de la función. Normalmente se modifica `this` y se le agrega nuevas propiedades.
3. Se devuelve el valor de `this`.

En otras palabras, `new User(...)` realiza algo como:

```js
function User(nombre) {
*!*
  // this = {};  (implícitamente)
*/!*

  // agrega propiedades a this
  this.nombre = nombre;
  this.isAdmin = false;

*!*
  // return this;  (implícitamente)
*/!*
}
```

Entonces `let user = new User("Jack")` da el mismo resultado que:

```js
let user = {
  nombre: "Jack",
  isAdmin: false
};
```

Ahora si queremos crear otros usuarios, podemos llamar a `new User("Ann")`, `new User("Alice")`, etcétera. Mucho más corto que usar literales todo el tiempo y también fácil de leer.

Este es el principal propósito del constructor -- implementar código de creación de objetos re-utilizables.

Tomemos nota otra vez -- técnicamente cualquier función puede ser utilizada como constructor. Es decir: cualquier función puede ser ejecutada con `new`, y ejecutará el algoritmo de arriba. La "primera letra mayúscula" es un acuerdo común, para dejar en claro que la función debe ser ejecutada con `new`.

````smart header="new function() { ... }"
Si tenemos muchas líneas de código todas sobre la creación de un único objeto complejo, podemos rodearlas en constructor de función, de ésta manera:

```js
let user = new function() {
  this.nombre = "John";
  this.isAdmin = false;

  // ...otro código para creación de usuario
  // tal vez lógica compleja y sentencias
  // variables locales etc
};
```

El constructor no puede ser llamado de nuevo porque no es guardado en ninguna parte, sólo es creado y llamado. Por lo tanto este truco apunta a encapsular el código que construye el objeto individual, sin reutilización futura.

````

## Constructor modo test: new.target

```smart header="Temas avanzados"
La sintaxis a partir de ésta sección es raramente utilizada, puedes saltearla a menos que quieras saber todo.
```

Dentro de una función, podemos verificar si ha sido llamada con o sin el `new`, utilizando una propiedad especial `new.target`.

Está vacía para llamadas normales y es equivalente a la función si es llamada con `new`:

```js run
function User() {
  alert(new.target);
}

// sin "new":
*!*
User(); // undefined
*/!*

// con "new":
*!*
new User(); // function User { ... }
*/!*
```

Esto puede ser utilizado dentro de la función para conocer si ha sido llamada con `new`, "en modo constructor ", o sin él, "en modo regular".

También podemos realizar ambas llamadas `new` y regular para que realicen lo mismo, de esta manera:

```js run
function User(nombre) {
  if (!new.target) { // si me ejecutas sin new
    return new User(nombre); // ...Yo te agrego new por ti
  }

  this.nombre = nombre;
}

let john = User("John"); // redirige llamado a new User
alert(john.nombre); // John
```

Este enfoque es utilizado aveces para hacer el sintaxis más flexible. Para que la gente pueda llamar a la función con o sin `new`, y aun funciona.

Sin embargo, probablemente no sea algo bueno para usar en todas partes, porque omitir 'new' hace que sea un poco menos obvio lo que está sucediendo. Con `new` todos sabemos que se está creando el nuevo objeto.

## Return desde constructores

Normalmente, los constructores no tienen una sentencia `return`. Su tarea es escribir todo lo necesario al `this`, y automáticamente se convierte en el resultado.

Pero si hay una sentencia `return`, entonces la regla es simple:

- Si `return` es llamado con un objeto, entonces se devuelve el objeto en vez de `this`.
- Si `return` es llamado con un tipo de dato primitivo, es ignorado.

En otras palabras, `return` con un objeto devuelve ese objeto, en todos los demás casos se devuelve `this`.

Por ejemplo, aquí `return` anula `this` al devolver un objeto:

```js run
function BigUser() {

  this.nombre = "John";

  return { nombre: "Godzilla" };  // <-- devuelve este objeto
}

alert( new BigUser().nombre );  // Godzilla, recibió ese objeto
```

Y aquí un ejemplo con un `return` vacío (o podemos colocar un primitivo después de él, no importa):

```js run
function SmallUser() {

  this.nombre = "John";

  return; // <-- devuelve this
}

alert( new SmallUser().nombre );  // John
```

Normalmente los constructores no tienen una sentencia `return`. Aquí mencionamos el comportamiento especial con devolución de objetos principalmente por el bien de la integridad.

````smart header="Omitir paréntesis"
Por cierto, podemos omitir paréntesis después de `new`, si no tiene argumentos:

```js
let user = new User; // <-- sin paréntesis
// lo mismo que
let user = new User();
```

Omitir paréntesis aquí no se considera "buen estilo", pero el sintaxis es permitido por especificación.
````

## Métodos en constructor

Utilizar constructor de funciones para crear objetos nos da mucha flexibilidad. La función constructor puede tener argumentos que definan cómo construir el objeto y qué colocar dentro.

Por supuesto podemos agregar a `this` no sólo propiedades, sino también métodos.

Por ejemplo, `new User(nombre)` de abajo, crea un objeto con el `nombre` dado y el método `sayHi`:

```js run
function User(nombre) {
  this.nombre = nombre;

  this.sayHi = function() {
    alert( "Mi nombre es: " + this.nombre );
  };
}

*!*
let john = new User("John");

john.sayHi(); // Mi nombre es: John
*/!*

/*
john = {
   nombre: "John",
   sayHi: function() { ... }
}
*/
```

Para crear objetos complejos, existe un sintaxis más complejo, [classes](info:classes), que cubriremos más adelante.

## Resumen

- Las funciones Constructor or, más corto, constructores, son funciones normales, pero existe un acuerdo común para nombrarlas con la primera letra en mayúscula.
- Las funciones Constructor sólo deben ser llamadas utilizando `new`. Tal llamado implica la creación de un `this` vacío al comienzo y devolver el `this` rellenado al final.

Podemos utilizar funciones constructor para crear múltiples objetos similares.

JavaScript proporciona funciones constructor para varios objetos de lenguaje incorporados: como `Date` para fechas, `Set` para sets (conjuntos) y otros que planeamos estudiar.

```smart header="Objetos, volveremos!"
En este capítulo solo cubrimos los conceptos básicos sobre objetos y constructores. Son esenciales para aprender más sobre tipos de datos y funciones en los próximos capítulos.

Después de aprender eso, volvemos a los objetos y los cubrimos en profundidad en los capítulos <info:prototypes> y <info:classes>.
```
