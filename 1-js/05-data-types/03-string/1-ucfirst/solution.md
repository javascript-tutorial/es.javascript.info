No podemos "reemplazar" el primer carácter, debido a que los strings en JavaScript son inmutables.

Pero podemos hacer un nuevo string basado en el existente, con el primer carácter en mayúsculas:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

<<<<<<< HEAD
Sin embargo, hay un pequeño problema. Si `str` está vacío, entonces `str[0]` es `undefined`, y como  `undefined` no tiene  el método `toUpperCase()`, obtendremos un error.
=======
There's a small problem though. If `str` is empty, then `str[0]` is `undefined`, and as `undefined` doesn't have the `toUpperCase()` method, we'll get an error.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

Existen dos variantes:

1. Usar `str.charAt(0)`, ya que siempre devuelve una cadena (tal vez vacía).
2. Agregar una prueba para un string vacío.

Aquí está la segunda variante:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
