# Métodos de primitivos 

JavaScript nos permite trabajar con datos primitivos (strings, numbers, etc.) como si fueran objetos.

También proveen, como aquellos, métodos para ser llamados.  Los estudiaremos pronto, pero primero veamos cómo trabajan porque, por supuesto, los primitivos no son objetos (y aquí lo haremos más evidente).

Veamos las diferencias clave entre primitivos y objetos.

Un primitivo

- Es un valor de tipo primitivo.
- Hay 6 tipos primitivos: `string`, `number`, `boolean`, `symbol`, `null` y `undefined`.

Un objeto

- Es capaz de almacenar múltiples valores como propiedades.
- Puede ser creado con `{}`, por ejemplo: `{name: "John", age: 30}`. Hay otras clases de objetos en JavaScript; por ejemplo, las funciones (`function`) son objetos .

Una de las mejores cosas de los objetos es que podemos almacenar una función como una de sus propiedades.

```js run
let john = {
  name: "John",
  sayHi: function() {
    alert("Hi buddy!");
  }
};

john.sayHi(); // Hi buddy!
```

Aquí hemos hecho un función `john` con el método `sayHi` (saludar).

Ya existen muchos objetos incorporados, como aquellos que trabajan con fechas, errores, elementos HTML, etc.  Ellos tienen diferentes propiedades y métodos.

¡Pero estas características vienen con un costo!

Los objetos son más "pesados" que los primitivos. Requieren recursos adicionales para soportar su maquinaria interna. Pero como las propiedades y los métodos son tan útiles en programación, los motores JavaScript tratan de optimizarlos para reducir su carga adiional.

## Un primitivo como objeto

Aquí la paradoja que enfrentó el creador de JavaScript:

- Hay muchas cosas que uno quisiera hacer con primitivos como string o number. Sería grandioso acceder a métodos.
- Los Primitivos deben ser tan rápidos y livianos como sea posible.

La solución se ve algo enrevesada, pero aquí está:

1. Los primitivos son aún primitivos. Con un valor único, como es deseable.
2. El lenguaje permite acceder a métodos y propiedades de strings, numbers, booleans y symbols.
3. Cuando esto ocurre, un "object wrapper" (objeto envoltura) especial que provee la funcionalidad extra es creado y luego destruido.

Los "object wrappers" son diferentes para cada tipo primitivo y son llamados: `String`, `Number`, `Boolean` y `Symbol`.  Así proveen diferentes sets de métodos.

Por ejemplo, hay un método [str.toUpperCase()](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String/toUpperCase) que devuelve un string en mayúsculas.

Aquí cómo funciona:

```js run
let str = "Hello";

alert( str.toUpperCase() ); // HELLO
```

Simple, ¿no es así?  Lo que realmente ocurre en `str.toUpperCase()`:

1. El string `str` es un tipo primitivo.  Entonces al momento de acceder a su propiedad, un objeto especial es creado, uno que conoce el valor del string y tiene métodos útiles como `toUpperCase()`.
2. El método se ejecuta y devuelve un nuevo string (el mostrado con `alert`).
3. El objeto especial es destruido, dejando solo el primitivo `str`.

Así las primitivas pueden proveer métodos y aún permanecer livianas.

El motor JavaScript optimiza este proceso enormemente.  Puede incluso saltear la creación del objeto extra por completo.  Pero aún debe adherir a la especificación y comportarse como si creara uno.

Un number tiene sus propios métodos, por ejemplo [toFixed(n)](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Number/toFixed) redondea el número a la precisión dada:

```js run
let n = 1.23456;

alert( n.toFixed(2) ); // 1.23
```

Veremos más métodos específicos en los capítulos <info:number> y <info:string>.


````warn header="Constructors `String/Number/Boolean` son de uso interno solamente"
Algunos lenguajes como JAva permiten crear "wrapper objects" para primitivas explícitamente usando una sintaxis como `new Number(1)` o `new Boolean(false)`.

En JavaScript, eso también es posible por razones históricas, pero firmemente  **no recomendado**. Las cosas enloquecerán en varios lugares.

Por ejemplo:

```js run
alert( typeof 1 ); // "number"

alert( typeof new Number(1) ); // "object"!
```

Los objetos son siempre verdaderos en un if, por ello el alert se mostrará:

```js run
let zero = new Number(0);

if (zero) { // zero es true, porque es un objeto
  alert( "zero es verdadero?!?" );
}
```

Por otro lado, usar las mismas funciones `String/Number/Boolean` sin `new` es totalmente sano y útil. Ellos convierten un valor al tipo correspondiente: a un string, number, o boolean (primitivo).

Por ejemplo, esto es perfectamente válido:
```js
let num = Number("123"); // convierte string a number
```
````


````warn header="null/undefined have no methods"
Las primitivas especiales `null` y `undefined` son excepciones. No tienen "wrapper objects" correspondientes y no proveen métodos. En ese sentido son "lo más primitivo".

El intento de acceder a una propiedad de tal valor daría error:

```js run
alert(null.test); // error
````

## Resumen

- Las primitivas excepto `null` y `undefined` proveen muchos métodos útiles.  Los estudiaremos en los próximos capítulos.
- Formalmente, estos métodos trabajan a través de objetos temporales, pero los motores de JavaScript están bien afinados para optimizarlos internamente, así que llamarlos no es costoso.
