
<<<<<<< HEAD
# Tipo de Referencia

```warn header="Característica del lenguaje en profundidad"
Este artículo cubre un tema avanzado para comprender mejor ciertos casos límite.

Esto no es importante. Muchos desarrolladores experimentados viven bien sin saberlo. Sigue leyendo si quieres saber cómo funcionan las cosas por debajo de la tapa.
```

Una llamada al método evaluado dinámicamente puede perder `this`.

Por ejemplo:
=======
# Reference Type

```warn header="In-depth language feature"
This article covers an advanced topic, to understand certain edge-cases better.

It's not important. Many experienced developers live fine without knowing it. Read on if you're  want to know how things work under the hood.
```

A dynamically evaluated method call can lose `this`.

For instance:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

<<<<<<< HEAD
user.hi(); // Funciona

// Ahora llamemos a user.hi o user.bye dependiendo del nombre ingresado
*!*
(user.name == "John" ? user.hi : user.bye)(); // ¡Error!
*/!*
```

En la última linea hay un operador condicional que elije entre `user.hi` o `user.bye`. En este caso el resultado es `user.hi`.

Entonces el método es llamado con paréntesis `()`. ¡Pero esto no funciona correctamente!

Como puedes ver, la llamada resulta en un error porque el valor de `"this"` dentro de la llamada se convierte en `undefined`.

Esto funciona (objeto, punto, método):
=======
user.hi(); // works

// now let's call user.hi or user.bye depending on the name
*!*
(user.name == "John" ? user.hi : user.bye)(); // Error!
*/!*
```

On the last line there is a conditional operator that chooses either `user.hi` or `user.bye`. In this case the result is `user.hi`.

Then the method is immediately called with parentheses `()`. But it doesn't work correctly!

As you can see, the call results in an error, because the value of `"this"` inside the call becomes `undefined`.

This works (object dot method):
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
```js
user.hi();
```

<<<<<<< HEAD
Esto no funciona (método evaluado):
```js
(user.name == "John" ? user.hi : user.bye)(); // ¡Error!
```

¿Por qué? Si queremos entender por qué pasa esto vayamos bajo la tapa de cómo funciona la llamada `obj.method()`.

## Tipo de Referencia explicado

Mirando de cerca podemos notar dos operaciones en la declaración  `obj.method()`:

1. Primero, el punto '.'recupera la propiedad de `obj.method`.
2. Luego el paréntesis `()` lo ejecuta.

Entonces ¿cómo es trasladada la información de `this` de la primera parte a la segunda?

Si ponemos estas operaciones en líneas separadas, entonces `this` se perderá con seguridad:
=======
This doesn't (evaluated method):
```js
(user.name == "John" ? user.hi : user.bye)(); // Error!
```

Why? If we want to understand why it happens, let's get under the hood of how `obj.method()` call works.

## Reference type explained

Looking closely, we may notice two operations in `obj.method()` statement:

1. First, the dot `'.'` retrieves the property `obj.method`.
2. Then parentheses `()` execute it.

So, how does the information about `this` get passed from the first part to the second one?

If we put these operations on separate lines, then `this` will be lost for sure:
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
}

*!*
<<<<<<< HEAD
// Se divide la obtención y se llama al método en dos lineas
let hi = user.hi;
hi(); // Error porque this es indefinido
*/!*
```

Aquí `hi = user.hi` coloca la función dentro de una variable y luego la última linea es completamente independiente, por lo tanto no hay `this`.

**Para hacer que la llamada `user.hi()` funcione, JavaScript usa un truco: el punto `'.'` no devuelve una función, sino un valor especial del [Tipo de referencia](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

El Tipo de Referencia es un "tipo de especificación". No podemos usarla explícitamente pero es usada internamente por el lenguaje.

El valor del Tipo de Referencia es una combinación de triple valor `(base, name, strict)`, donde:

- `base` es el objeto.
- `name` es el nombre de la propiedad.
- `strict` es verdadero si `use strict` está en efecto.

El resultado de un acceso a la propiedad `user.hi` no es una función, sino un valor de Tipo de Referencia. Para `user.hi` en modo estricto esto es:

```js
// Valor de Tipo de Referencia
(user, "hi", true)
```

Cuando son llamados los paréntesis `()` en el tipo de referencia, reciben la información completa sobre el objeto y su método y pueden establecer el `this` correcto (`=user` en este caso).

Tipo de Referencia es un tipo interno de "intermediario", con el propósito de pasar información desde el punto `.` hacia los paréntesis de la llamada `()`.

Cualquier otra operación como la asignación `hi = user.hi` descarta el tipo de referencia como un todo, toma el valor de `user.hi` (una función) y lo pasa. Entonces cualquier operación "pierde" `this`.

Entonces, como resultado, el valor de `this` solo se pasa de la manera correcta si la función se llama directamente usando una sintaxis de punto `obj.method()` o corchetes `obj['method']()` (aquí hacen lo mismo). Más adelante en este tutorial, aprenderemos varias formas de resolver este problema así como [func.bind()](/bind#solution-2-bind).

## Resumen

El Tipo de Referencia es un tipo interno del lenguaje.

Leer una propiedad como las que tienen un punto `.` en `obj.method()` no devuelve exactamente el valor de la propiedad, sino un valor especial de "tipo de referencia" que almacena tanto el valor de la propiedad como el objeto del que se tomó.

Eso se hace para la llamada `()` al siguiente método para obtener el objeto y establecer `this` en él.

Para todas las demás operaciones, el tipo de referencia se convierte automáticamente en el valor de la propiedad (una función en nuestro caso).

Toda la mecánica está oculta a nuestros ojos. Solo importa en casos sutiles, como cuando un método se obtiene dinámicamente del objeto, usando una expresión.





El resultado del punto `.` no es en realidad un método, pero un valor de `` necesita una manera de pasar la información sobre `obj`.
=======
// split getting and calling the method in two lines
let hi = user.hi;
hi(); // Error, because this is undefined
*/!*
```

Here `hi = user.hi` puts the function into the variable, and then on the last line it is completely standalone, and so there's no `this`.

**To make `user.hi()` calls work, JavaScript uses a trick -- the dot `'.'` returns not a function, but a value of the special [Reference Type](https://tc39.github.io/ecma262/#sec-reference-specification-type).**

The Reference Type is a "specification type". We can't explicitly use it, but it is used internally by the language.

The value of Reference Type is a three-value combination `(base, name, strict)`, where:

- `base` is the object.
- `name` is the property name.
- `strict` is true if `use strict` is in effect.

The result of a property access `user.hi` is not a function, but a value of Reference Type. For `user.hi` in strict mode it is:

```js
// Reference Type value
(user, "hi", true)
```

When parentheses `()` are called on the Reference Type, they receive the full information about the object and its method, and can set the right `this` (`=user` in this case).

Reference type is a special "intermediary" internal type, with the purpose to pass information from dot `.` to calling parentheses `()`.

Any other operation like assignment `hi = user.hi` discards the reference type as a whole, takes the value of `user.hi` (a function) and passes it on. So any further operation "loses" `this`.

So, as the result, the value of `this` is only passed the right way if the function is called directly using a dot `obj.method()` or square brackets `obj['method']()` syntax (they do the same here). Later in this tutorial, we will learn various ways to solve this problem such as [func.bind()](/bind#solution-2-bind).

## Summary

Reference Type is an internal type of the language.

Reading a property, such as with dot `.` in `obj.method()` returns not exactly the property value, but a special "reference type" value that stores both the property value and the object it was taken from.

That's for the subsequent method call `()` to get the object and set `this` to it.

For all other operations, the reference type automatically becomes the property value (a function in our case).

The whole mechanics is hidden from our eyes. It only matters in subtle cases, such as when a method is obtained dynamically from the object, using an expression.
>>>>>>> b85413d0bdd6f4f468fcadeacb4c4056e3671ce1
