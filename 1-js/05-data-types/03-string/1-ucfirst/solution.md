No podemos "reemplazar" el primer caracter, debido a que los strings en JavaScript son inmutables.

Pero podemos hacer un nuevo string basado en el existente, con el primer carácter en mayúsculas:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Sin embargo, hay un pequeño problema. Si `str` está vacío, entonces `str[0]`no está definido, por lo que obtendremos un error.

Existen dos variantes:

1. Usar `str.charAt(0)`, ya que siempre devuelve una cadena (tal vez vacía).
2. Agregar una prueba para un string vacío.

Aquí está la segunda variante:

```js run
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```

