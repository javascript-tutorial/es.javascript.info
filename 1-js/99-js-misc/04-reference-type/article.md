
# Tipo de Referencia

```warn header="Característica del lenguaje en profundidad"
Este artículo cubre un tema avanzado para comprender mejor ciertos casos límite.

Esto no es importante. Muchos desarrolladores experimentados viven bien sin saberlo. Sigue leyendo si quieres saber cómo funcionan las cosas por debajo de la tapa.
```

Una llamada al método evaluado dinámicamente puede perder `this`.

Por ejemplo:

```js run
let user = {
  name: "John",
  hi() { alert(this.name); },
  bye() { alert("Bye"); }
};

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
```js
user.hi();
```

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

```js run
let user = {
  name: "John",
  hi() { alert(this.name); }
};

*!*
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

Entonces, como resultado, el valor de `this` solo se pasa de la manera correcta si la función se llama directamente usando una sintaxis de punto `obj.method()` o corchetes `obj['method']()` (aquí hacen lo mismo). Hay varias formas de resolver este problema, como [func.bind()](/bind#solution-2-bind).

## Resumen

El Tipo de Referencia es un tipo interno del lenguaje.

Leer una propiedad como las que tienen un punto `.` en `obj.method()` no devuelve exactamente el valor de la propiedad, sino un valor especial de "tipo de referencia" que almacena tanto el valor de la propiedad como el objeto del que se tomó.

Eso se hace para la llamada `()` al siguiente método para obtener el objeto y establecer `this` en él.

Para todas las demás operaciones, el tipo de referencia se convierte automáticamente en el valor de la propiedad (una función en nuestro caso).

Toda la mecánica está oculta a nuestros ojos. Solo importa en casos sutiles, como cuando un método se obtiene dinámicamente del objeto, usando una expresión.

