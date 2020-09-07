
Prueba ejecutándolo:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test);
```

<<<<<<< HEAD
Depende de si usas el modo estricto "use strict" o no, el resultado será:
1. `undefined` (sin strict mode)
2. Un error.  (strict mode)
=======
Depending on whether you have `use strict` or not, the result may be:
1. `undefined` (no strict mode)
2. An error (strict mode).
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017

¿Por qué? Repasemos lo que ocurre en la línea `(*)`:

<<<<<<< HEAD
1. Cuando se accede a una propiedad de `str`, se crea un "wrapper object" (objeto envolvente ).
2. Con modo estricto, tratar de alterarlo produce error.
3. Sin modo estricto, la operación es llevada a cabo y el objeto obtiene la propiedad `test`, pero después de ello el "objeto envolvente" desaparece, entonces en la última linea `str` queda sin rastros de la propiedad.

**Este ejemlplo claramente muestra que los tipos primitivos no son objetos.**

Ellos no pueden almacenar datos adicionales.
=======
1. When a property of `str` is accessed, a "wrapper object" is created.
2. In strict mode, writing into it is an error.
3. Otherwise, the operation with the property is carried on, the object gets the `test` property, but after that the "wrapper object" disappears, so in the last line `str` has no trace of the property.

**This example clearly shows that primitives are not objects.**

They can't store additional data.
>>>>>>> 58f6599df71b8d50417bb0a52b1ebdc995614017
