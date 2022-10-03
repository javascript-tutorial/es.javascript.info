No podemos "reemplazar" el primer carácter, debido a que los strings en JavaScript son inmutables.

Pero podemos hacer un nuevo string basado en el existente, con el primer carácter en mayúsculas:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Sin embargo, hay un pequeño problema. Si `str` está vacío, entonces `str[0]` es `undefined`, y como  `undefined` no tiene  el método `toUpperCase()`, obtendremos un error.

<<<<<<< HEAD
Existen dos variantes:

1. Usar `str.charAt(0)`, ya que siempre devuelve una cadena (tal vez vacía).
2. Agregar una prueba para un string vacío.

Aquí está la segunda variante:
=======
The easiest way out is to add a test for an empty string, like this:
>>>>>>> 18b1314af4e0ead5a2b10bb4bacd24cecbb3f18e

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
