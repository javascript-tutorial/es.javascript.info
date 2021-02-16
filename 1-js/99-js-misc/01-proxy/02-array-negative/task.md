
# Accediendo a array[-1]

En algunos lenguajes de programación podemos acceder a los arrays usando índices negativos, contando desde el final.

Como esto:

```js
let array = [1, 2, 3];

array[-1]; // 3, el último elemento
array[-2]; // 2, el penúltimo elemento, uno antes del final
array[-3]; // 1, el antepenúltimo elemento, dos antes el final 
```

En otras palabras, `array[-N]` es lo mismo que `array[array.length - N]`.

Crea un proxy para implementar tal comportamiento.

Así es como debe funcionar:

```js
let array = [1, 2, 3];

array = new Proxy(array, {
  /* tu código */
});

alert( array[-1] ); // 3
alert( array[-2] ); // 2

// el resto de la funcionalidad debe mantenerse igual.
```
