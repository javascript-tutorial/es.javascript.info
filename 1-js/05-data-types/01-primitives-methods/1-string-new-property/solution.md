
Prueba ejecutándolo:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test); 
```

Depende de si usas el modo estricto "use strict" o no, el resultado será:
1. `undefined` (sin strict mode)
2. Un error.   (strict mode)

¿Por qué? Repasemos lo que ocurre en la línea `(*)`:

1. Cuando se accede a una propiedad de `str`, un "wrapper object" es creado.
2. Con modo estricto, tratar de alterarlo produce error.
3. Sin modo estricto, la operación es llevada a cabo y el objeto obtiene la propiedad `test`, pero después de ello el "wrapper object" desaparece, entonces en la última linea `str` queda sin rastros de la propiedad.

**Este ejemlplo claramente muestra que los tipos primitivos no son objetos.**

Ellos no pueden almacenar datos adicionales.

