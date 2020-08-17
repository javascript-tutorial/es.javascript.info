# Métodos del objeto, "this"

Los objetos son creados usualmente para representar entidades del mundo real, como usuarios, órdenes, etc.:

```js
let user = {
  name: "John",
  age: 30
};
```

Y en el mundo real un usuario puede *actuar*: seleccionar algo del carrito de compras, hacer login, logout, etc.

Las acciones son representadas en JavaScript por funciones en las propiedades.

## Ejemplos de métodos

<<<<<<< HEAD
Para empezar, enseñemos al usuario `user` a decir hola:
=======
For a start, let's teach the `user` to say hello:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js run
let user = {
  name: "John",
  age: 30
};

*!*
user.sayHi = function() {
  alert("¡Hola!");
};
*/!*

user.sayHi(); // ¡Hola!
```

Aquí simplemente usamos una expresión de función para crear la función y asignarla a la propiedad `user.sayHi` del objeto.

Entonces la llamamos. ¡El usuario ahora puede hablar!

Una función que es la propiedad de un objeto es denominada su *método*.

Así, aquí tenemos un método `sayHi` del objeto `user`.

Por supuesto, podríamos usar una función pre-declarada como un método, parecido a esto:

```js run
let user = {
  // ...
};

*!*
// primero, declara
function sayHi() {
  alert("¡Hola!");
};

// entonces la agrega como un método
user.sayHi = sayHi;
*/!*

user.sayHi(); // ¡Hola!
```

<<<<<<< HEAD
```smart header="Programación orientada a objetos"
Cuando escribimos nuestro código usando objetos que representan entidades, eso es llamado [Programación Orientada a Objetos](https://es.wikipedia.org/wiki/Programaci%C3%B3n_orientada_a_objetos), abreviado: "POO".

POO (OOP sus siglas en inglés) es una cosa grande, un ciencia interesante en sí misma. ¿Cómo elegir las entidades correctas? ¿Cómo organizar la interacción entre ellas? Eso es arquitectura, y hay muy buenos libros del tópico como "Patrones de diseño: Elementos de software orientado a objetos reutilizable" de E. Gamma, R. Helm, R. Johnson, J. Vissides o "Análisis y Diseño Orientado a Objetos" de G. Booch, y otros.
=======
```smart header="Object-oriented programming"
When we write our code using objects to represent entities, that's called [object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming), in short: "OOP".

OOP is a big thing, an interesting science of its own. How to choose the right entities? How to organize the interaction between them? That's architecture, and there are great books on that topic, like "Design Patterns: Elements of Reusable Object-Oriented Software" by E. Gamma, R. Helm, R. Johnson, J. Vissides or "Object-Oriented Analysis and Design with Applications" by G. Booch, and more.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
```
### Formas abreviadas para los métodos

Existe una sintaxis más corta para los métodos en objetos literales:

```js
// estos objetos hacen lo mismo

user = {
  sayHi: function() {
    alert("Hello");
  }
};

<<<<<<< HEAD
// la forma abreviada se ve mejor, ¿verdad?
=======
// method shorthand looks better, right?
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
user = {
*!*
  sayHi() { // igual que "sayHi: function()"
*/!*
    alert("Hello");
  }
};
```

Como se demostró, podemos omitir `"function"` y simplemente escribir `sayHi()`.

A decir verdad, las notaciones no son completamente idénticas. Hay diferencias sutiles relacionadas a la herencia de objetos (por cubrir más adelante) que no importan ahora. En casi todos los casos la sintaxis abreviada es la preferida.

## "this" en métodos

Es común que un método de objeto necesite acceder a la información almacenada en el objeto para cumplir su tarea.

Por ejemplo, el código dentro de `user.sayHi()` puede necesitar el nombre del usuario `user`.

**Para acceder al objeto, un método puede usar la palabra clave `this`.**

El valor de `this` es el objeto "antes del punto", el usado para llamar al método.

Por ejemplo:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
<<<<<<< HEAD
    // "this" es el "objeto actual"
=======
    // "this" is the "current object"
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
    alert(this.name);
*/!*
  }

};

user.sayHi(); // John
```

Aquí durante la ejecución de `user.sayHi()`, el valor de `this` será `user`.

Técnicamente, también es posible acceder al objeto sin `this`, haciendo referencia a él por medio de la variable externa:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert(user.name); // "user" en vez de "this"
*/!*
  }

};
```

...Pero tal código no es confiable. Si decidimos copiar `user` a otra variable, por ejemplo `admin = user` y sobrescribir `user` con otra cosa, entonces accederá al objeto incorrecto.

Eso queda demostrado en las siguientes lineas:

```js run
let user = {
  name: "John",
  age: 30,

  sayHi() {
*!*
    alert( user.name ); // lleva a un error
*/!*
  }

};


let admin = user;
user = null; // sobrescribimos para hacer las cosas evidentes

admin.sayHi(); // ¡oops! dentro de sayHi(), ¡Se usa el nombre viejo! ¡Error!
```

Si usamos `this.name` en vez de `user.name` dentro de `alert`, entonces el código funciona.

## "this" no es vinculado

<<<<<<< HEAD
En JavaScript, la palabra clave `this` se comporta de manera distinta a la mayoría de otros lenguajes de programación. Puede ser usado en cualquier función.

No hay error de sintaxis en el siguiente ejemplo:
=======
In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function.

There's no syntax error in the following example:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js
function sayHi() {
  alert( *!*this*/!*.name );
}
```

<<<<<<< HEAD
El valor de `this` es evaluado durante el tiempo de ejecución, dependiendo del contexto.

Por ejemplo, aquí la función es asignada a dos objetos diferentes y tiene diferentes "this" en sus llamados:
=======
The value of `this` is evaluated during the run-time, depending on the context.

For instance, here the same function is assigned to two different objects and has different "this" in the calls:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js run
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

*!*
<<<<<<< HEAD
// usa la misma función en dos objetos
=======
// use the same function in two objects
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05
user.f = sayHi;
admin.f = sayHi;
*/!*

// estos llamados tienen diferente "this"
// "this" dentro de la función es el objeto "antes del punto"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (punto o corchetes para acceder al método, no importa)
```

<<<<<<< HEAD
La regla es simple: si `obj.f()` es llamado, entonces `this` es `obj` durante el llamado de `f`. Entonces es tanto `user` o `admin` en el ejemplo anterior.

````smart header="Llamado sin un objeto: `this == undefined`"
Podemos incluso llamar la función sin un objeto en absoluto:
=======
The rule is simple: if `obj.f()` is called, then `this` is `obj` during the call of `f`. So it's either `user` or `admin` in the example above.

````smart header="Calling without an object: `this == undefined`"
We can even call the function without an object at all:
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

```js run
function sayHi() {
  alert(this);
}

sayHi(); // undefined
```

<<<<<<< HEAD
En este caso `this` es `undefined` en el modo estricto. Si tratamos de acceder a `this.name`, habrá un error.

En modo no estricto el valor de `this` en tal caso será el *objeto global* (`window` en un navegador, llegaremos a ello en el capítulo [](info:global-object)). Este es un comportamiento histórico que `"use strict"` corrije.

Usualmente tal llamado es un error de programa. Si hay `this` dentro de una función, se espera que sea llamada en un contexto de objeto.
````

```smart header="Las consecuencias de un `this` desvinculado"
Si vienes de otro lenguaje de programación, probablemente estés habituado a la idea de un "`this` vinculado", donde los método definidos en un objeto siempre tienen `this` referenciando ese objeto.

En JavaScript `this` es "libre", su valor es evaluado al momento de su llamado y no depende de dónde fue declarado el método sino de cuál es el objeto "delante del punto".

El concepto de `this` evaluado en tiempo de ejecución tiene sus pros y sus contras. Por un lado, una función puede ser reusada por diferentes objetos. Por otro, la mayor flexibilidad crea más posibilidades para equivocaciones.

Nuestra posición no es juzgar si la decisión del diseño de lenguaje es buena o mala. Vamos a entender cómo trabajar con ello, obtener beneficios y evitar problemas.
```

## Las funciones de flecha no tienen "this"
=======
In this case `this` is `undefined` in strict mode. If we try to access `this.name`, there will be an error.

In non-strict mode the value of `this` in such case will be the *global object* (`window` in a browser, we'll get to it later in the chapter [](info:global-object)). This is a historical behavior that `"use strict"` fixes.

Usually such call is a programming error. If there's `this` inside a function, it expects to be called in an object context.
````

```smart header="The consequences of unbound `this`"
If you come from another programming language, then you are probably used to the idea of a "bound `this`", where methods defined in an object always have `this` referencing that object.

In JavaScript `this` is "free", its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is "before the dot".

The concept of run-time evaluated `this` has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

Here our position is not to judge whether this language design decision is good or bad. We'll understand how to work with it, how to get benefits and avoid problems.
```

## Arrow functions have no "this"
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

Las funciones de flecha son especiales: ellas no tienen su "propio" `this`. Si nosotros hacemos referencia a `this` desde tales funciones, esta será tomada desde afuera de la función "normal".

Por ejemplo, aquí `arrow()` usa `this` desde fuera del método `user.sayHi()`:

```js run
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

Esto es una característica especial de las funciones de flecha, útil cuando no queremos realmente un `this` separado sino tomarlo de un contexto externo. Más adelante en el capítulo <info:arrow-functions> las trataremos en profundidad.


## Resumen

- Las funciones que son almacenadas en propiedades de objeto son llamadas "métodos".
- Los método permiten a los objetos "actuar", como `object.doSomething()`.
- Los métodos pueden hacer referencia al objeto con `this`.

<<<<<<< HEAD
El valor de `this` es definido en tiempo de ejecución.
- Cuando una función es declarada, puede usar `this`, pero ese `this` no tiene valor hasta que la función es llamada.
- Una función puede ser copiada entre objetos.
- Cuando una función es llamada en la sintaxis de método: `object.method()`, el valor de `this` durante el llamado es `object`.
=======
The value of `this` is defined at run-time.
- When a function is declared, it may use `this`, but that `this` has no value until the function is called.
- A function can be copied between objects.
- When a function is called in the "method" syntax: `object.method()`, the value of `this` during the call is `object`.
>>>>>>> fe571b36ed9e225f29239e82947005b08d74ac05

Ten en cuenta que las funciones de flecha son especiales: ellas no tienen `this`. Cuando `this` es accedido dentro de una función de flecha, su valor es tomado desde el exterior.
