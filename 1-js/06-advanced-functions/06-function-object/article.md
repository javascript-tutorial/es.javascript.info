
# Función como objeto, NFE

<<<<<<< HEAD
Como ya sabemos, una función en JavaScript es un valor.
=======
As we already know, a function in JavaScript is a value.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Cada valor en JavaScript tiene un tipo. ¿Qué tipo es una función?

En JavaScript, las funciones son objetos.

Una buena manera de imaginar funciones es como "objetos de acción" invocables. No solo podemos llamarlos, sino también tratarlos como objetos: agregar/eliminar propiedades, pasar por referencia, etc.


## La propiedad "name"

<<<<<<< HEAD
Las funciones como objeto contienen algunas propiedades utilizables.
=======
Function objects contain some useable properties.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Por ejemplo, el nombre de una función es accesible mediante la propiedad "name":

```js run
function sayHi() {
  alert("Hi");
}

alert(sayHi.name); // sayHi
```

<<<<<<< HEAD
Lo que es divertido, es que la lógica de asignación de nombres es inteligente. También da el nombre correcto a una función, incluso si se creó sin uno:
=======
What's kind of funny, the name-assigning logic is smart. It also assigns the correct name to a function even if it's created without one, and then immediately assigned:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let sayHi = function() {
  alert("Hi");
};

<<<<<<< HEAD
alert(sayHi.name); // sayHi (¡hay un nombre!)
=======
alert(sayHi.name); // sayHi (there's a name!)
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
```

También funciona si la asignación se realiza mediante un valor predeterminado:

```js run
function f(sayHi = function() {}) {
  alert(sayHi.name); // sayHi (¡funciona!)
}

f();
```

En la especificación, esta característica se denomina "nombre contextual". Si la función no proporciona una, entonces en una asignación se deduce del contexto.

Los métodos como objeto también tienen nombres:

```js run
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}

alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye
```

Sin embargo, no hay magia. Hay casos en que no hay forma de encontrar el nombre correcto. En ese caso, la propiedad de nombre está vacía, como aquí:

```js run
<<<<<<< HEAD
// función creada dentro de un array
=======
// function created inside array
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
let arr = [function() {}];

alert( arr[0].name ); // <empty string>
// el motor no tiene forma de configurar el nombre correcto, por lo que no asigna ninguno
```

En la práctica, sin embargo, la mayoría de las funciones tienen un nombre.

## La propiedad "length"

Hay una nueva propiedad "length" incorporada  que devuelve el número de parámetros de una función, por ejemplo:

```js run
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
```

Aquí podemos ver que los *parámetros rest* no se cuentan.

<<<<<<< HEAD
La propiedad `length` a veces se usa para [introspección](https://es.wikipedia.org/wiki/Introspecci%C3%B3n_de_tipos) en funciones que operan en otras funciones.
=======
The `length` property is sometimes used for [introspection](https://en.wikipedia.org/wiki/Type_introspection) in functions that operate on other functions.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Por ejemplo, en el siguiente código, la función `ask` , acepta una `question`  y un número arbitrario de funciones `handler` para llamar.

Una vez que un usuario proporciona su respuesta, la función llama a los controladores. Podemos pasar dos tipos de controladores:

- Una función de cero argumentos, que solo se llama cuando el usuario da una respuesta positiva.
- Una función con argumentos, que se llama en cualquier caso y devuelve una respuesta.

<<<<<<< HEAD
Para llamar a `handler` de la manera correcta, examinamos la propiedad `handler.length`.

La idea es que tenemos una sintaxis de controlador simple y sin argumentos para casos positivos (la variante más frecuente), pero también podemos admitir controladores universales:
=======
To call `handler` the right way, we examine the `handler.length` property.

The idea is that we have a simple, no-arguments handler syntax for positive cases (most frequent variant), but are able to support universal handlers as well:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// para una respuesta positiva, ambos controladores se llaman
// para respuesta negativa, solo el segundo
ask("Question?", () => alert('You said yes'), result => alert(result));
```

Este es un caso particular llamado [polimorfismo](https://es.wikipedia.org/wiki/Polimorfismo_(inform%C3%A1tica)) -- tratar los argumentos de manera diferente según su tipo o, en nuestro caso, según la 'longitud'. La idea tiene un uso en las bibliotecas de JavaScript.

## Propiedades personalizadas

También podemos agregar nuestras propias propiedades.

Aquí agregamos la propiedad `counter` para rastrear el recuento total de llamadas:

```js run
function sayHi() {
  alert("Hi");

  *!*
  //vamos a contar las veces que se ejecuta
  sayHi.counter++;
  */!*
}
sayHi.counter = 0; // valor inicial

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); //  Llamamos 2 veces
```

```warn header="Una propiedad no es una variable"
Una propiedad asignada a una función como `sayHi.counter = 0` *no* define una variable local `counter` dentro de ella. En otras palabras, una propiedad `counter` y una variable `let counter` son dos cosas no relacionadas.

<<<<<<< HEAD
Podemos tratar una función como un objeto, almacenar propiedades en ella, pero eso no tiene ningún efecto en su ejecución. Las variables no son propiedades de la función y viceversa. Estos solo son dos mundos paralelos.
=======
We can treat a function as an object, store properties in it, but that has no effect on its execution. Variables are not function properties and vice versa. These are just parallel worlds.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2
```

Las propiedades de la función a veces pueden reemplazar las clausuras o *closures*. Por ejemplo, podemos reescribir el ejemplo de la función de contador del capítulo <info:closure> para usar una propiedad de función:

```js run
function makeCounter() {
  // en vez de:
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

`count` ahora se almacena en la función directamente, no en su entorno léxico externo.

¿Es mejor o peor que usar una clausura (*closure*)?

La principal diferencia es que si el valor de `count` vive en una variable externa, entonces el código externo no puede acceder a él. Solo las funciones anidadas pueden modificarlo. Y si está vinculado a una función, entonces tal cosa es posible:

```js run
function makeCounter() {

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();

*!*
counter.count = 10;
alert( counter() ); // 10
*/!*
```

Por lo tanto, la elección de la implementación depende de nuestros objetivos.

## Expresión de Función con Nombre

*Named Function Expression*, o *NFE*, es un término para `Expresiones de funciones` que tienen un nombre.

Por ejemplo, tomemos una expresión de función ordinaria:

```js
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};
```

Y agrégale un nombre:

```js
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};
```

¿Logramos algo aquí? ¿Cuál es el propósito de ese nombre adicional de `"func"`?

Primero, tengamos en cuenta que todavía tenemos una Expresión de Función. Agregar el nombre `"func"` después de `function` no lo convirtió en una Declaración de Función, porque todavía se crea como parte de una expresión de asignación.

Agregar ese nombre tampoco rompió nada.

La función todavía está disponible como `sayHi()`:

```js run
let sayHi = function *!*func*/!*(who) {
  alert(`Hello, ${who}`);
};

sayHi("John"); // Hello, John
```

<<<<<<< HEAD
Hay dos cosas especiales sobre el nombre `func`, que le hacen útil:
=======
There are two special things about the name `func`, that are the reasons for it:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

1. Permite que la función se haga referencia internamente.
2. No es visible fuera de la función..

Por ejemplo, la función `sayHi` a continuación se vuelve a llamar a sí misma con `"Guest"` si no se proporciona `who`:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // usa func para volver a llamarse a sí misma
*/!*
  }
};

sayHi(); // Hello, Guest

// Pero esto no funcionará.
func(); // Error, func no está definido (no visible fuera de la función)
```

¿Por qué usamos `func`? ¿Quizás solo usa `sayHi` para la llamada anidada?


En realidad, en la mayoría de los casos podemos:

```js
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest");
*/!*
  }
};
```

<<<<<<< HEAD
El problema con ese código es que `sayHi` puede cambiar en el código externo. Si la función se asigna a otra variable, el código comenzará a dar errores:
=======
The problem with that code is that `sayHi` may change in the outer code. If the function gets assigned to another variable instead, the code will start to give errors:
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

```js run
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    sayHi("Guest"); // Error: sayHi no es una función
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error, ¡la llamada sayHi anidada ya no funciona!
```

Eso sucede porque la función toma `sayHi` de su entorno léxico externo. No hay `sayHi` local, por lo que se utiliza la variable externa. Y en el momento de la llamada, ese `sayHi` externo es `nulo`.

El nombre opcional que podemos poner en la Expresión de función está destinado a resolver exactamente este tipo de problemas.

Usémoslo para arreglar nuestro código:

```js run
let sayHi = function *!*func*/!*(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
*!*
    func("Guest"); // Ahora todo va bien
*/!*
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest (la llamada anidada funciona)
```

Ahora funciona, porque el nombre `"func"` es una función local. No se toma desde el exterior (y no es visible allí). La especificación garantiza que siempre hará referencia a la función actual.

El código externo todavía tiene su variable `sayHi` o `welcome`. Y `func` es un "nombre de función interna", porque la función puede llamarse internamente.

<<<<<<< HEAD
```smart header="No existe tal cosa para la Declaración de funciones"
La característica "nombre interno" descrita aquí solo está disponible para Expresiones de funciones, no para Declaraciones de funciones. Para las declaraciones de funciones, no hay sintaxis para agregar un nombre "interno".
=======
```smart header="There's no such thing for Function Declaration"
The "internal name" feature described here is only available for Function Expressions, not for Function Declarations. For Function Declarations, there is no syntax for adding an "internal" name.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

A veces,  necesitamos un nombre interno confiable, este es un motivo para reescribir un formulario de Declaración de funciones en Expresión de funciones con nombre.
```

## Resumen

Las funciones son objetos.

Aquí cubrimos sus propiedades:

- `name` -- El nombre de la función. Por lo general, se toma de la definición de la función, pero si no hay ninguno, JavaScript intenta adivinarlo por el contexto (por ejemplo, una asignación).
- `length` -- El número de argumentos en la definición de la función. Los *parámetros rest* no se cuentan.

<<<<<<< HEAD
=======
- `name` -- the function name. Usually taken from the function definition, but if there's none, JavaScript tries to guess it from the context (e.g. an assignment).
- `length` -- the number of arguments in the function definition. Rest parameters are not counted.
>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Si la función se declara como una Expresión de función (no en el flujo de código principal), y lleva el nombre, se llama Expresión de Función con Nombre *(Named Function Expression)*. El nombre se puede usar dentro para hacer referencia a sí mismo, para llamadas recursivas o similares.

Además, las funciones pueden tener propiedades adicionales. Muchas bibliotecas de JavaScript conocidas hacen un gran uso de esta función.

<<<<<<< HEAD
Crean una función "principal" y le asignan muchas otras funciones "auxiliares". Por ejemplo, la biblioteca [jQuery](https://jquery.com) crea una función llamada `$`. La biblioteca  [lodash](https://lodash.com) crea una función  `_`, y luego agrega `_.clone`, `_.keyBy` y otras propiedades (mira los [docs](https://lodash.com/docs) cuando quieras aprender más sobre ello). En realidad, lo hacen para disminuir su contaminación del espacio global, de modo que una sola biblioteca proporciona solo una variable global. Eso reduce la posibilidad de conflictos de nombres.
=======
They create a "main" function and attach many other "helper" functions to it. For instance, the [jQuery](https://jquery.com) library creates a function named `$`. The [lodash](https://lodash.com) library creates a function `_`, and then adds `_.clone`, `_.keyBy` and other properties to it (see the [docs](https://lodash.com/docs) when you want learn more about them). Actually, they do it to lessen their pollution of the global space, so that a single library gives only one global variable. That reduces the possibility of naming conflicts.

>>>>>>> b0464bb32c8efc2a98952e05f363f61eca1a99a2

Por lo tanto, una función puede hacer un trabajo útil por sí misma y también puede tener muchas otras funcionalidades en las propiedades.
