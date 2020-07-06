
# Propiedades y métodos estáticos.

<<<<<<< HEAD
También podemos asignar métodos a la funcionalidad de una clase en sí, no a su `"prototype"`. Dichos métodos se llaman *static*.

En una clase, están precedidos por la palabra clave `static`, como esta:
=======
We can also assign a method to the class function itself, not to its `"prototype"`. Such methods are called *static*.

In a class, they are prepended by `static` keyword, like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
class User {
*!*
  static staticMethod() {
*/!*
    alert(this === User);
  }
}

User.staticMethod(); // verdadero
```

<<<<<<< HEAD
Eso realmente hace lo mismo que asignarlo como una propiedad directamente:
=======
That actually does the same as assigning it as a property directly:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
class User { }

User.staticMethod = function() {
  alert(this === User);
};

<<<<<<< HEAD
User.staticMethod(); // verdadero
```

El valor de `this` en la llamada `User.staticMethod()` es el mismo constructor de clase `User` (la regla "objeto antes de punto").
=======
User.staticMethod(); // true
```

The value of `this` in `User.staticMethod()` call is the class constructor `User` itself (the "object before dot" rule).
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Por lo general, los métodos estáticos se utilizan para implementar funciones que pertenecen a la clase, pero no a ningún objeto particular de la misma.

<<<<<<< HEAD
Por ejemplo, tenemos objetos `Article` y necesitamos una función para compararlos. Una solución natural sería agregar el método `Article.compare`, como este:
=======
For instance, we have `Article` objects and need a function to compare them. A natural solution would be to add `Article.compare` method, like this:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
*/!*
}

// uso
let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

*!*
articles.sort(Article.compare);
*/!*

alert( articles[0].title ); // CSS
```

<<<<<<< HEAD
Aquí `Article.compare` se encuentra "encima" de los artículos, como un medio para compararlos. No es el método de un artículo, sino de toda la clase.
=======
Here `Article.compare` stands "above" articles, as a means to compare them. It's not a method of an article, but rather of the whole class.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Otro ejemplo sería un método llamado "factory". Imagina, necesitamos pocas formas para crear un artículo:

<<<<<<< HEAD
1. Crearlo por parámetros dados (`title`,`date` etc.).
2. Crear un artículo vacío con la fecha de hoy.
3. ... o cualquier otra manera.
=======
1. Create by given parameters (`title`, `date` etc).
2. Create an empty article with today's date.
3. ...or else somehow.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

La primera forma puede ser implementada por el constructor. Y para el segundo podemos hacer un método estático de la clase.

Al igual que `Article.createTodays()` aquí:

```js run
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

*!*
  static createTodays() {
    // recuerda, this = Article
    return new this("Resumen de hoy", new Date());
  }
*/!*
}

let article = Article.createTodays();

<<<<<<< HEAD
alert( article.title ); // Resumen de hoy
=======
alert( article.title ); // Today's digest
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```
Ahora, cada vez que necesitamos crear un resumen de hoy, podemos llamar a `Article.createTodays()`. Una vez más, ese no es el método de un objeto artículo, sino el método de toda la clase.

Los métodos estáticos también se utilizan en clases relacionadas con base de datos para buscar/guardar/eliminar entradas de la misma, como esta:

```js
// suponiendo que el artículo es una clase especial para gestionar artículos
// método estático para eliminar el artículo:
Article.remove({id: 12345});
```

## Propiedades estáticas

[recent browser=Chrome]

<<<<<<< HEAD
Las propiedades estáticas también son posibles, se ven como propiedades de clase regular, pero precedidas por `static`:
=======
Static properties are also possible, they look like regular class properties, but prepended by `static`:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
class Article {
  static publisher = "Ilya Kantor";
}

alert( Article.publisher ); // Ilya Kantor
```

Eso es lo mismo que una asignación directa a `Article`:

```js
Article.publisher = "Ilya Kantor";
```

<<<<<<< HEAD
## Herencia de propiedades y métodos estáticos.

Las propiedades y métodos estáticos son heredados.

Por ejemplo, `Animal.compare` y `Animal.planet` en el siguiente código son heredados y accesibles como `Rabbit.compare` y `Rabbit.planet`:

```js run
class Animal {
  static planet = "Tierra";
=======
## Inheritance of static properties and methods

Static properties and methods are inherited.

For instance, `Animal.compare` and `Animal.planet` in the code below are inherited and accessible as `Rabbit.compare` and `Rabbit.planet`:

```js run
class Animal {
  static planet = "Earth";

>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }

  run(speed = 0) {
    this.speed += speed;
    alert(`${this.name} corre a una velocidad de ${this.speed}.`);
  }

*!*
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed;
  }
*/!*

}

// Hereda de Animal
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} se esconde!`);
  }
}

let rabbits = [
  new Rabbit("Conejo Blanco", 10),
  new Rabbit("Conejo Negro", 5)
];

*!*
rabbits.sort(Rabbit.compare);
*/!*

<<<<<<< HEAD
rabbits[0].run(); // Conejo Negro corre a una velocidad de 5.

alert(Rabbit.planet); // Tierra
```

Ahora, cuando llamemos a `Rabbit.compare`, se llamará a `Animal.compare` heredado.

¿Como funciona? Nuevamente, usando prototipos. Como ya habrás adivinado, `extends` da a `Rabbit` el `[[Prototype]]` referente a `Animal`.

![](animal-rabbit-static.svg)

Entonces, `Rabbit extends Animal` crea dos referencias `[[Prototype]]`:

1. La función de `Rabbit` se hereda prototípicamente de la función de `Animal`.
2. `Rabbit.prototype` prototípicamente hereda de `Animal.prototype`.

Como resultado, la herencia funciona tanto para métodos regulares como estáticos.

Verifiquemos eso por código, aquí:
=======
rabbits[0].run(); // Black Rabbit runs with speed 5.

alert(Rabbit.planet); // Earth
```

Now when we call `Rabbit.compare`, the inherited `Animal.compare` will be called.

How does it work? Again, using prototypes. As you might have already guessed, `extends` gives `Rabbit` the `[[Prototype]]` reference to `Animal`.

![](animal-rabbit-static.svg)

So, `Rabbit extends Animal` creates two `[[Prototype]]` references:

1. `Rabbit` function prototypally inherits from `Animal` function.
2. `Rabbit.prototype` prototypally inherits from `Animal.prototype`.

As a result, inheritance works both for regular and static methods.

Here, let's check that by code:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js run
class Animal {}
class Rabbit extends Animal {}

<<<<<<< HEAD
// para la estática
alert(Rabbit.__proto__ === Animal); // verdadero

// para métodos regulares
alert(Rabbit.prototype.__proto__ === Animal.prototype); // verdadero
```

## Resumen

Los métodos estáticos se utilizan en la funcionalidad propia de la clase "en su conjunto". No se relaciona con una instancia de clase concreta.

Por ejemplo, un método para comparar `Article.compare (article1, article2)` o un método de fábrica `Article.createTodays()`.

Están etiquetados por la palabra `static` en la declaración de clase.
=======
// for statics
alert(Rabbit.__proto__ === Animal); // true

// for regular methods
alert(Rabbit.prototype.__proto__ === Animal.prototype); // true
```

## Summary

Static methods are used for the functionality that belongs to the class "as a whole". It doesn't relate to a concrete class instance.

For example, a method for comparison `Article.compare(article1, article2)` or a factory method `Article.createTodays()`.

They are labeled by the word `static` in class declaration.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Las propiedades estáticas se utilizan cuando queremos almacenar datos a nivel de clase, también no vinculados a una instancia.

La sintaxis es:

```js
class MyClass {
  static property = ...;

  static method() {
    ...
  }
}
```

<<<<<<< HEAD
Técnicamente, la declaración estática es lo mismo que asignar a la clase misma:
=======
Technically, static declaration is the same as assigning to the class itself:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

```js
MyClass.property = ...
MyClass.method = ...
```

<<<<<<< HEAD
Las propiedades y métodos estáticos se heredan.

Para `class B extends A` el prototipo de la clase `B` en sí mismo apunta a `A`: `B.[[Prototipo]] = A`. Entonces, si no se encuentra un campo en `B`, la búsqueda continúa en `A`.
=======
Static properties and methods are inherited.

For `class B extends A` the prototype of the class `B` itself points to `A`: `B.[[Prototype]] = A`. So if a field is not found in `B`, the search continues in `A`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
