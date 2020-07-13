# Métodos en tipos primitivos

<<<<<<< HEAD
JavaScript nos permite trabajar con tipos de datos primitivos (string, number, etc) como si fueran objetos. Los primitivos también brindan métodos para ser llamados. Los estudiaremos pronto, pero primero veamos cómo trabajan porque, por supuesto, los primitivos no son objetos. (y aquí lo haremos aún más evidente).

Veamos las diferencias clave entre primitivos y objetos.
=======
JavaScript allows us to work with primitives (strings, numbers, etc.) as if they were objects. They also provide methods to call as such. We will study those soon, but first we'll see how it works because, of course, primitives are not objects (and here we will make it even clearer).
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Un primitivo

- Es un valor de tipo primitivo.
- Hay 7 tipos primitivos: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` y `undefined`.

<<<<<<< HEAD
Un objeto
=======
- Is a value of a primitive type.
- There are 7 primitive types: `string`, `number`, `bigint`, `boolean`, `symbol`, `null` and `undefined`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

- Es capaz de almacenar múltiples valores como propiedades.
- Puede ser creado con `{}`.  Ejemplo: `{name: "John", age: 30}`. Hay otras clases de objetos en JavaScript; las funciones, por ejemplo, son objetos.

<<<<<<< HEAD
Una de las mejores cosas de los objetos es que podemos almacenar una función como una de sus propiedades.
=======
- Is capable of storing multiple values as properties.
- Can be created with `{}`, for instance: `{name: "John", age: 30}`. There are other kinds of objects in JavaScript: functions, for example, are objects.

One of the best things about objects is that we can store a function as one of its properties.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

Aquí hemos creado un objeto `john` con el método `sayHi`.

Ya existen muchos objetos integrados al lenguaje, como los que trabajan con fechas, errores, elementos HTML, etc.  Ellos tienen diferentes propiedades y métodos.

¡Pero estas características tienen un precio!

<<<<<<< HEAD
Los objetos son más "pesados" que los primitivos. Ellos requieren recursos adicionales para soportar su maquinaria interna.
=======
Objects are "heavier" than primitives. They require additional resources to support the internal machinery.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

## Un primitivo como objeto

Aquí el dilema que enfrentó el creador de JavaScript:

- Hay muchas cosas que uno querría hacer con los primitivos como string o number. Sería grandioso accederlas como métodos.
- Los Primitivos deben ser tan rápidos y livianos como sea posible

La solución es algo enrevesada, pero aquí está:

<<<<<<< HEAD
1. Los primitivos son aún primitivos. Con un valor único, como es deseable.
2. El lenguaje permite el acceso a métodos y propiedades de strings, numbers, booleans y symbols.
3. Para que esto funcione, se crea una envoltura especial, un "object wrapper" (objeto envoltorio) que provee la funcionalidad extra y luego es destruido.
=======
1. Primitives are still primitive. A single value, as desired.
2. The language allows access to methods and properties of strings, numbers, booleans and symbols.
3. In order for that to work, a special "object wrapper" that provides the extra functionality is created, and then is destroyed.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Los "object wrappers" son diferentes para cada primitivo y son llamados: `String`, `Number`, `Boolean` y `Symbol`.  Así, proveen diferentes sets de métodos.

<<<<<<< HEAD
Por ejemplo, existe un método [str.toUpperCase()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/toUpperCase) que devuelve un string en mayúsculas.
=======
For instance, there exists a string method [str.toUpperCase()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) that returns a capitalized `str`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

Aquí el funcionamiento:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Simple, ¿no es así?  Lo que realmente ocurre en `str.toUpperCase()`:

1. El string `str` es primitivo.  Al momento de acceder a su propiedad, un objeto especial es creado, uno que conoce el valor del string y tiene métodos útiles como `toUpperCase()`.
2. Ese método se ejecuta y devuelve un nuevo string (mostrado con `alert`).
3. El objeto especial es destruido, dejando solo el primitivo `str`.

Así los primitivos pueden proveer métodos y aún permanecer livianos.

El motor JavaScript optimiza este proceso enormemente.  Incluso puede saltear la creación del objeto extra por completo.  Pero aún se debe adherir a la especificación y comportarse como si creara uno.

Un number tiene sus propios métodos, por ejemplo [toFixed(n)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Number/toFixed) redondea el número a la precisión dada:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Veremos más métodos específicos en los capítulos <info:number> y <info:string>.


<<<<<<< HEAD
````warn header="Los constructores `String/Number/Boolean` son de uso interno solamente"
Algunos lenguajes como Java permiten crear "wrapper objects" para primitivos explícitamente usando una sintaxis como `new Number(1)` o `new Boolean(false)`.
=======
````warn header="Constructors `String/Number/Boolean` are for internal use only"
Some languages like Java allow us to explicitly create "wrapper objects" for primitives using a syntax like `new Number(1)` or `new Boolean(false)`.
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

En JavaScript, eso también es posible por razones históricas, pero firmemente **desaconsejado**. Las cosas enloquecerían en varios lugares.

Por ejemplo:

```js run
alert( typeof 0 ); // "number"

alert( typeof new Number(0) ); // "object"!
```

<<<<<<< HEAD
Los objetos siempre son true en un `if`, entonces el alert mostrará:
=======
Objects are always truthy in `if`, so here the alert will show up:
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439

```js run
let cero = new Number(0);

<<<<<<< HEAD
if (cero) { // cero es true, porque es un objeto
  alert( "cero es verdadero?!?" );
=======
if (zero) { // zero is true, because it's an object
  alert( "zero is truthy!?!" );
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439
}
```

Por otro lado, usar las mismas funciones `String/Number/Boolean` sin `new` es totalmente sano y útil. Ellas convierten un valor al tipo correspondiente: a un string, number, o boolean (primitivo).

Por ejemplo, esto es perfectamente válido::
```js
let num = Number("123"); // convierte string a number
```
````


````warn header="null/undefined no poseen métodos"
Los primitivos especiales `null` y `undefined` son excepciones. No tienen "wrapper objects" correspondientes y no proveen métodos. En ese sentido son "lo más primitivo".

El intento de acceder a una propiedad de tal valor daría error:

```js run
alert(null.test); // error
````

## Resumen

- Los primitivos excepto `null` y `undefined` proveen muchos métodos útiles.  Los estudiaremos en los próximos capítulos.
- Formalmente, estos métodos trabajan a través de objetos temporales, pero los motores de JavaScript están bien afinados para optimizarlos internamente así que llamarlos no es costoso.
