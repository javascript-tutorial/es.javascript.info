No podemos "reemplazar" el primer carácter, debido a que los strings en JavaScript son inmutables.

Pero podemos hacer un nuevo string basado en el existente, con el primer carácter en mayúsculas:

```js
let newStr = str[0].toUpperCase() + str.slice(1);
```

Sin embargo, hay un pequeño problema. Si `str` está vacío, entonces `str[0]` es `undefined`, y como  `undefined` no tiene  el método `toUpperCase()`, obtendremos un error.

Lo más fácil es agregar una verificación de cadena vacía:

```js run demo
function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

alert( ucFirst("john") ); // John
```
