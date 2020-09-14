
# Sintaxis básica de `class`

```quote author="Wikipedia"
En informática, una clase es una plantilla para la creación de objetos de datos según un modelo predefinido. Las clases se utilizan para representar entidades o conceptos, como los sustantivos en el lenguaje. Cada clase es un modelo que define un conjunto de variables —el estado—, y métodos apropiados para operar con dichos datos —el comportamiento—.
```

En la práctica a menudo necesitamos crear muchos objetos del mismo tipo, como usuarios, bienes, lo que sea.

Como ya sabemos del capítulo <info:constructor-new>, `new function` puede ayudar con eso.

Pero en JavaScript moderno hay un constructor más avanzado, "class", que introduce grandes características nuevas muy útiles para la programación orientada a objetos.

## La sintaxis "class"

La sintaxis básica es:
```js
class MyClass {
  // métodos de clase
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

<<<<<<< HEAD
Entonces usamos `new MyClass()` para crear un objeto nuevo con todos los métodos listados.
=======
Then use `new MyClass()` to create a new object with all the listed methods.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

El método `constructor()` es llamado automáticamente por `new`, así podemos inicializar el objeto allí.

Por ejemplo:

```js run
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Uso:
let user = new User("John");
user.sayHi();
```

Cuando se llama a `new User("John")`:
1. Un objeto nuevo es creado.
2. El `constructor` se ejecuta con el argumento dado y lo asigna `this.name`.

<<<<<<< HEAD
...Entonces podemos llamar a sus métodos, como `user.sayHi()`.
=======
...Then we can call object methods, such as `user.sayHi()`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187


```warn header="No va una coma entre métodos de clase"
Un tropiezo común en desarrolladores principiantes es poner una coma entre los métodos de clase, lo que resulta en un error de sintaxis.

La notación aquí no debe ser confundida con la sintaxis de objeto literal. Dentro de la clase no se requieren comas.
```

## ¿Qué es una clase?

<<<<<<< HEAD
Entonces, ¿qué es exactamente `class`? No es una entidad completamente nueva a nivel de lenguaje como uno podría pensar.
=======
So, what exactly is a `class`? That's not an entirely new language-level entity, as one might think.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Develemos la magia y veamos lo que realmente es una clase. Ayudará a entender muchos aspectos complejos.

<<<<<<< HEAD
En JavaScript, una clase es un tipo de función.
=======
In JavaScript, a class is a kind of function.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Aquí, hecha un vistazo:

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// La prueba: User es una función
*!*
alert(typeof User); // function
*/!*
```

<<<<<<< HEAD
Lo que la contrucción `class User {...}` hace realmente es:

1. Crea una función llamada `User`, la que se vuelve el resultado de la declaración de la clase. El código de la función es tomado del método `constructor` (se asume vacío si no se escribe tal método).
2. Almacena los métodos de clase, tales como `sayHi`, en `User.prototype`.

Después de que el objeto `new User` es creado, cuando llamamos a sus métodos estos son tomados del prototipo, tal como se describe en el capítulo <info:function-prototype>. Así el objeto tiene acceso a métodos de clase.

Podemos ilustrar el resultado de la declaración de `class User` como:

![](class-user.svg)

Aquí el código para inspeccionarlo:
=======
What `class User {...}` construct really does is:

1. Creates a function named `User`, that becomes the result of the class declaration. The function code is taken from the `constructor` method (assumed empty if we don't write such method).
2. Stores class methods, such as `sayHi`, in `User.prototype`.

After `new User` object is created, when we call its method, it's taken from the prototype, just as described in the chapter <info:function-prototype>. So the object has access to class methods.

We can illustrate the result of `class User` declaration as:

![](class-user.svg)

Here's the code to introspect it:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// una clase es una función
alert(typeof User); // function

// ...o, más precisamente, el método contructor
alert(User === User.prototype.constructor); // true

// Los métodos están en User.prototype, por ejemplo:
alert(User.prototype.sayHi); // alert(this.name);

// Hay exactamente dos métodos en el prototipo
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

<<<<<<< HEAD
## No es solamente azúcar sintáctica

A veces se dice que `class` es "azúcar sintáctica" (sintaxis que es diseñada para que sea más fácil de leer pero no introduce nada nuevo), porque en realidad podemos declarar lo mismo sin la palabra clave `class` en absoluto:
=======
## Not just a syntactic sugar

Sometimes people say that `class` is a "syntactic sugar" (syntax that is designed to make things easier to read, but doesn't introduce anything new), because we could actually declare the same without `class` keyword at all:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
// reescribiendo la clase User puramente con funciones

// 1. Crear la función constructor
function User(name) {
  this.name = name;
}
<<<<<<< HEAD
// un prototipo de función tiene la propiedad "constructor" por defecto,
// así que no necesitamos crearla
=======
// a function prototype has "constructor" property by default,
// so we don't need to create it
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

// 2. Agregar el método al prototipo
User.prototype.sayHi = function() {
  alert(this.name);
};

// Uso:
let user = new User("John");
user.sayHi();
```

<<<<<<< HEAD
El resultado de esta definición es el mismo. Así, efectivamente hay razones para que `class` sea considerada azúcar sintáctica para definir un constructor junto con sus métodos de prototipo.

Aún así hay diferencias importantes.
=======
The result of this definition is about the same. So, there are indeed reasons why `class` can be considered a syntactic sugar to define a constructor together with its prototype methods.

Still, there are important differences.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

1. Primero, una función creada por `class` es etiquetada por una propiedad interna especial `[[FunctionKind]]:"classConstructor"`. Entones no es exactamente lo mismo que crearla manualmente.

<<<<<<< HEAD
    El lenguaje verifica esa propiedad en varios lugares. Por ejemplo, a diferencia de las funciones regulares, esta debe ser llamada con `new`:
=======
    The language checks for that property in a variety of places. For example, unlike a regular function, it must be called with `new`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    ```js run
    class User {
      constructor() {}
    }

    alert(typeof User); // function
    User(); // Error: El contructor de clase User no puede ser invocado sin 'new'
    ```

    Además una representación string de un contructor de clase en la mayoría de los motores JavaScript comienzan con "class..."

    ```js run
    class User {
      constructor() {}
    }

    alert(User); // class User { ... }
    ```
<<<<<<< HEAD
    Hay otras diferencias que veremos pronto.

2. Los métodos de clase no son enumerables.
    La definición de clase establece la bandera `enumerable` a `false` para todos los métodos en `"prototype"`.
=======
    There are other differences, we'll see them soon.

2. Class methods are non-enumerable.
    A class definition sets `enumerable` flag to `false` for all methods in the `"prototype"`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

    Esto es bueno porque si hacemos `for..in` a un objeto usualmente no queremos sus métodos de clase.

<<<<<<< HEAD
3. Las clases siempre asumen `use strict`.
    Todo el código dentro del contructor de clase está automáticamente en modo estricto.

Además la sintaxis de `class` brinda muchas otras características que exploraremos luego.

## Expresión de clases
=======
3. Classes always `use strict`.
    All code inside the class construct is automatically in strict mode.

Besides, `class` syntax brings many other features that we'll explore later.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Al igual que las funciones, las clases pueden ser definidas dentro de otra expresión, pasadas, devueltas, asignadas, etc.

<<<<<<< HEAD
Aquí hay un ejemplo de una expresión de clase:
=======
Just like functions, classes can be defined inside another expression, passed around, returned, assigned, etc.

Here's an example of a class expression:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js
let User = class {
  sayHi() {
    alert("Hello");
  }
};
```

<<<<<<< HEAD
Al igual que las expresiones de función, las expresiones de clase pueden tener un nombre.
=======
Similar to Named Function Expressions, class expressions may have a name.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Si una expresión de clase tiene un nombre, este es visible solamente dentro de la clase.

```js run
<<<<<<< HEAD
// Expresiones de clase con nombre
// ("Named Class Expression" no figura así en la especificación, pero es equivalente a "Named Function Expression")
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // El nombre de MyClass solo es visible dentro de la clase
=======
// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class *!*MyClass*/!* {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  }
};

new User().sayHi(); // Funciona, muestra la definición de MyClass

<<<<<<< HEAD
alert(MyClass); // error, el nombre de MyClass no es visible fuera de la clase
```

Podemos inclusive crear clases dinámicamente "a pedido", como esto:
=======
alert(MyClass); // error, MyClass name isn't visible outside of the class
```

We can even make classes dynamically "on-demand", like this:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
function makeClass(phrase) {
  // declara una clase y la devuelve
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// Crea una nueva clase
let User = makeClass("Hello");

new User().sayHi(); // Hello
```


## Getters/setters

<<<<<<< HEAD
Al igual que los objetos literales, las clases pueden incluir getters/setters, propiedades calculadas, etc.
=======
Just like literal objects, classes may include getters/setters, computed properties etc.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

Aquí hay un ejemplo de `user.name`, implementado usando `get/set`:

```js run
class User {

  constructor(name) {
<<<<<<< HEAD
    // invoca el setter
=======
    // invokes the setter
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
    this.name = name;
  }

*!*
  get name() {
*/!*
    return this._name;
  }

*!*
  set name(value) {
*/!*
    if (value.length < 4) {
      alert("Nombre demasiado corto.");
      return;
    }
    this._name = value;
  }

}

let user = new User("John");
alert(user.name); // John

<<<<<<< HEAD
user = new User(""); // Nombre demasiado corto.
```

Técnicamente, la declaración de clase funciona creando getters y setters en `User.prototype`.

## Nombres calculados [...]

Aquí hay un ejemplo con un nombre de método calculado usando corchetes `[...]`:
=======
user = new User(""); // Name is too short.
```

Technically, such class declaration works by creating getters and setters in `User.prototype`.

## Computed names [...]

Here's an example with a computed method name using brackets `[...]`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
class User {

*!*
  ['say' + 'Hi']() {
*/!*
    alert("Hello");
  }

}

new User().sayHi();
```

<<<<<<< HEAD
Es una característica fácil de recordar porque se asemeja a la de los objetos literales.

## Campos de clase (Class fields) 

```warn header="Los navegadores viejos pueden necesitar polyfill"
Los campos de clase son un agregado reciente al lenguaje.
```

Antes, nuestras clases tenían solamente métodos.

"Campos de clase" es una sintaxis que nos permite agregar una propiedad cualquiera.

Por ejemplo, agreguemos la propiedad `name` a la clase `User`:
=======
Such features are easy to remember, as they resemble that of literal objects.

## Class fields

```warn header="Old browsers may need a polyfill"
Class fields are a recent addition to the language.
```

Previously, our classes only had methods.

"Class fields" is a syntax that allows to add any properties.

For instance, let's add `name` property to `class User`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
class User {
*!*
  name = "John";
*/!*

  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, John!
```

<<<<<<< HEAD
Así, simplemente escribimos "<property name> = <value>" en la declaración, y eso es todo.

La diferencia importante de las propiedades definidas como "campos de clase" es que estas son establecidas en los objetos individuales, no compartidas en `User.prototype`:
=======
So, we just write "<property name> = <value>" in the declaration, and that's it.

The important difference of class fields is that they are set on individual objects, not `User.prototype`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
class User {
*!*
  name = "John";
*/!*
}
<<<<<<< HEAD

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

También podemos asignar valores usando expresiones más complejas y llamados a función:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```

### Vinculación de métodos (binding) usando campos de clase

Como se demostró en el capítulo <info:bind>, las funciones en JavaScript tienen un `this` dinámico. Este depende del contexto del llamado.

Entonces si un método de objeto es pasado y llamado en otro contexto, `this` ya no será una referencia a su objeto.

Por ejemplo, este código mostrará `undefined`:
=======

let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

We can also assign values using more complex expressions and function calls:

```js run
class User {
*!*
  name = prompt("Name, please?", "John");
*/!*
}

let user = new User();
alert(user.name); // John
```


### Making bound methods with class fields

As demonstrated in the chapter <info:bind> functions in JavaScript have a dynamic `this`. It depends on the context of the call.

So if an object method is passed around and called in another context, `this` won't be a reference to its object any more.

For instance, this code will show `undefined`:
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

```js run
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    alert(this.value);
<<<<<<< HEAD
=======
  }
}

let button = new Button("hello");

*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

The problem is called "losing `this`".

There are two approaches to fixing it, as discussed in the chapter <info:bind>:

1. Pass a wrapper-function, such as `setTimeout(() => button.click(), 1000)`.
2. Bind the method to object, e.g. in the constructor.

Class fields provide another, quite elegant syntax:

```js run
class Button {
  constructor(value) {
    this.value = value;
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

<<<<<<< HEAD
*!*
setTimeout(button.click, 1000); // undefined
*/!*
```

Este problema es denominado "pérdida de `this`".

Hay dos enfoques para solucionarlos, como se discute en el capítulo <info:bind>:

1. Pasar un contenedor o wrapper-function como: `setTimeout(() => button.click(), 1000)`.
2. Vincular el método al objeto, por ejemplo en el constructor.

Los campos de clase brindan otra sintaxis, bastante elegante:

```js run
class Button {
  constructor(value) {
    this.value = value;
  }
*!*
  click = () => {
    alert(this.value);
  }
*/!*
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

Un campo de clase `click = () => {...}` es creado para cada objeto. Hay una función para cada objeto `Button`, con `this` dentro referenciando ese objeto. Podemos pasar `button.click` a cualquier lado y el valor de `this` siempre será el correcto.

Esto es especialmente práctico, en el ambiente de los navegadores, para los "event listeners".

## Resumen
=======
setTimeout(button.click, 1000); // hello
```

The class field `click = () => {...}` is created on a per-object basis, there's a separate function for each `Button` object, with `this` inside it referencing that object. We can pass `button.click` around anywhere, and the value of `this` will always be correct.

That's especially useful in browser environment, for event listeners.

## Summary
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

La sintaxis básica de clase se ve así:

```js
class MyClass {
<<<<<<< HEAD
  prop = value; // propiedad
=======
  prop = value; // property
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

  constructor(...) { // constructor
    // ...
  }

  method(...) {} // método

  get something(...) {} // método getter
  set something(...) {} // método setter

<<<<<<< HEAD
  [Symbol.iterator]() {} // método con nombre calculado (aquí, symbol)
=======
  [Symbol.iterator]() {} // method with computed name (symbol here)
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187
  // ...
}
```

<<<<<<< HEAD
`MyClass` es técnicamente una función (la que proveemos como `constructor`), mientras que los métodos, getters y setters son escritos en `MyClass.prototype`.
=======
`MyClass` is technically a function (the one that we provide as `constructor`), while methods, getters and setters are written to `MyClass.prototype`.
>>>>>>> ff152b126ec70a9de919bfdc1913215539d37187

En los siguientes capítulos aprenderemos más acerca de clases, incluyendo herencia y otras características.
