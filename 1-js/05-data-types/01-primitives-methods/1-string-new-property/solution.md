
Prueba a ejecutar:

```js run
let str = "Hello";

str.test = 5; // (*)

alert(str.test); 
```

Puede haber dos clases de resultado:
1. `undefined`
2. Un error.

¿Por qué? Repasemos qué ocurre en la línea `(*)`:

1. Cuando una propiedad de `str` es accedida, un "wrapper object" es creado.
2. La operación con la propiedad es llevada a cabo con él. Entonces, el objeto obtiene la propiedad `test`.
3. La operación termina y el "wrapper object" desaparece.

Entonces, en la última línea, `str` no tiene rastros de la propiedad. Por cada operación de objeto en un string, un nuevo wrapper object es usado.

Aunque algunos navegadores pueden decidir ir más allá y limitar al programador e impedir la asignación de propiedades a primitivas del todo.  Por eso en la práctica podemos ver errores en la línea `(*)`. Aunque con ello van un poco más lejos que la especificación.

**Este ejemlplo claramente muestra que las primitivas no son objetos.**

Ellas simplemente no pueden almacenar datos. 

Todas las operaciones de propiedades y métodos son hechas con la ayuda de objetos temporales.

