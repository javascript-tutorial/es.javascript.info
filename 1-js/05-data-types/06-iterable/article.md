
# Iterables

<<<<<<< HEAD
Los objetos *iterables* son una generalización de matrices. Este es un concepto que permite que cualquier objeto pueda ser utilizado en un blucle `for..of`.

Por supuesto, las matrices o *arrays* son iterables. Pero hay muchos otros objetos integrados, que también lo son. Por ejemplo, las cadenas o *strings* son iterables también. Como veremos, muchos operadores y métodos se basan en la iterabilidad.
=======
*Iterable* objects is a generalization of arrays. That's a concept that allows us to make any object useable in a `for..of` loop.

Of course, Arrays are iterable. But there are many other built-in objects, that are iterable as well. For instance, strings are also iterable.

If an object isn't technically an array, but represents a collection (list, set) of something, then `for..of` is a great syntax to loop over it, so let's see how to make it work.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Si un objeto no es técnicamente una matriz, pero representa una colección (lista, conjunto) de algo, entonces el uso de la sintaxis `for..of` es una gran forma de recorrerlo, así que veamos cómo funciona.

## Symbol.iterator

Podemos comprender fácilmente el concepto de iterables por medio de la práctica.

Por ejemplo, tenemos un objeto, que no es una matriz, pero parece adecuado para `for..of`.

<<<<<<< HEAD
=======
For instance, we have an object that is not an array, but looks suitable for `for..of`.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Como un objeto `range` que representa un intervalo de números:

```js
let range = {
  from: 1,
  to: 5
};

// Queremos que el for..of funcione de la siguiente manera:
// for(let num of range) ... num=1,2,3,4,5
```

<<<<<<< HEAD
Para hacer que el `range` sea iterable (y así permitir que `for..of` funcione) necesitamos agregar un método al objeto llamado `Symbol.iterator` (un símbolo incorporado especial usado solo para realizar esa función, proporcionar iterabilidad).

1. Cuando se inicia el `for..of`, éste llama al método `Symbol.iterator` una vez (o genera un error si no lo encuentra). El método debe devolver un *iterador* --un objeto con el método `next()`.
2.  En adelante, `for..of` trabaja *solo con ese objeto devuelto*.
3. Cuando `for..of` quiere el siguiente valor, llama a `next()` en ese objeto.
4.El resultado de `next()` debe tener la forma `{done: Boolean, value: any}`, donde `done = true` significa que la iteración ha finalizado; de lo contrario,`value` debe ser el nuevo valor.
=======
To make the `range` iterable (and thus let `for..of` work) we need to add a method to the object named `Symbol.iterator` (a special built-in symbol just for that).

1. When `for..of` starts, it calls that method once (or errors if not found). The method must return an *iterator* -- an object with the method `next`.
2. Onward, `for..of` works *only with that returned object*.
3. When `for..of` wants the next value, it calls `next()` on that object.
4. The result of `next()` must have the form `{done: Boolean, value: any}`, where `done=true`  means that the iteration is finished, otherwise `value` is the next value.

Here's the full implementation for `range` with remarks:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Aquí está la implementación completa de `range`:
 
```js run
let range = {
  from: 1,
  to: 5
};

// 1. Una llamada a for..of inicializa una llamada a esto:
range[Symbol.iterator] = function() {

  // ... devuelve el objeto iterador:
  // 2. En adelante, for..of trabaja solo con este iterador, pidiéndole los siguientes valores
  return {
    current: this.from,
    last: this.to,      

    // 3. next() es llamado en cada iteración por el bucle for..of
    next() {
      // 4. debería devolver el valor como un objeto {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

// ¡Ahora funciona!
for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

<<<<<<< HEAD
Tenga en cuenta la característica principal de los iterables: separación de conceptos.

- El `range` en sí mismo no tiene el método `next()`.
- En cambio, la llamada a `range[Symbol.iterator]()` crea un otro objeto llamado "iterador", y su `next()` genera valores para la iteración.
=======
Please note the core feature of iterables: separation of concerns.

- The `range` itself does not have the `next()` method.
- Instead, another object, a so-called "iterator" is created by the call to `range[Symbol.iterator]()`, and its `next()` generates values for the iteration.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Por lo tanto, el objeto iterador está separado del objeto sobre el que itera.

Técnicamente, podemos fusionarlos y usar `range` en sí mismo como iterador para simplificar el código.

De esta manera:

```js run
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  }
};

for (let num of range) {
  alert(num); // 1, then 2, 3, 4, 5
}
```

Ahora `range[Symbol.iterator]()` devuelve el objeto `range` en sí: tiene el método `next()` necesario y recuerda el progreso de iteración actual en `this.current`. ¿Más corto? Sí. Y a veces eso también está bien.

<<<<<<< HEAD
La desventaja es que ahora es imposible tener dos bucles `for..of` corriendo sobre el objeto simultáneamente: compartirán el estado de iteración, porque solo hay un iterador: el objeto en sí. Pero dos for-ofs paralelos es algo raro, incluso en escenarios asíncronos.
 
```smart header="Iteradores Infinitos"
También son posibles los iteradores infinitos. Por ejemplo, el objeto `range` se vuelve infinito así: `range.to = Infinity`. O podemos hacer un objeto iterable que genere una secuencia infinita de números pseudoaleatorios. También puede ser útil.
=======
The downside is that now it's impossible to have two `for..of` loops running over the object simultaneously: they'll share the iteration state, because there's only one iterator -- the object itself. But two parallel for-ofs is a rare thing, even in async scenarios.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

No hay limitaciones en `next`, puede devolver más y más valores, eso es normal.

Por supuesto, el bucle `for..of` sobre un iterable de este tipo sería interminable. Pero siempre podemos detenerlo usando `break`.
```

## *String* es iterable

Las matrices y cadenas son los iterables integrados más utilizados.

En una cadena o *string*, el bucle `for..of` recorre sus caracteres:

```js run
for (let char of "test") {
  // Se dispara 4 veces: una vez por cada caracter
  alert( char ); // t, luego e, luego s, luego t
}
```

¡Y trabaja correctamente con valores de pares sustitutos (codificación UTF-16)!

```js run
let str = '𝒳😂';
for (let char of str) {
    alert( char ); // 𝒳, y luego 😂
}
```

<<<<<<< HEAD
## Llamar a un iterador explícitamente

Para una comprensión más profunda, veamos cómo usar un iterador explícitamente.

Vamos a iterar sobre una cadena exactamente de la misma manera que `for..of`, pero con llamadas directas. Este código crea un iterador de cadena y obtiene valores de él "manualmente":
=======
## Calling an iterator explicitly

For deeper understanding let's see how to use an iterator explicitly.

We'll iterate over a string in exactly the same way as `for..of`, but with direct calls. This code creates a string iterator and gets values from it "manually":
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

 
```js run
let str = "Hola";

// hace lo mismo que
// for (let char of str) alert(char);

*!*
let iterator = str[Symbol.iterator]();
*/!*

while (true) {
  let result = iterator.next();
  if (result.done) break;
  alert(result.value); // retorna los caracteres uno por uno
}
```
Rara vez se necesita esto, pero nos da más control sobre el proceso que `for..of`. Por ejemplo, podemos dividir el proceso de iteración: iterar un poco, luego parar, hacer otra cosa y luego continuar.
 
## Iterables y array-likes [#array-like]

Hay dos términos oficiales que se parecen, pero son muy diferentes. Asegúrese de comprenderlos bien para evitar confusiones.
 
- *Iterables* son objetos que implementan el método `Symbol.iterator`, como se describió anteriormente.
- *Array-likes* son objetos que tienen índices y `longitud` o *length*, por lo que se ven como matrices.

Cuando usamos JavaScript para tareas prácticas en el navegador u otros entornos, podemos encontrar objetos que son iterables o array-like, o ambos.

Por ejemplo, las cadenas son iterables (`for..of` funciona en ellas) y array-like (tienen índices numéricos y `length`).

Pero un iterable puede no ser array-like. Y viceversa, un array-like puede no ser iterable.

<<<<<<< HEAD
=======
When we use JavaScript for practical tasks in browser or other environments, we may meet objects that are iterables or array-likes, or both.

For instance, strings are both iterable (`for..of` works on them) and array-like (they have numeric indexes and `length`).
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Por ejemplo, `range` en el ejemplo anterior es iterable, pero no array-like, porque no tiene propiedades indexadas ni `longitud` o *length*.


Y aquí está el objeto que tiene forma de matriz, pero no es iterable:

```js run
let arrayLike = { // tiene índices y longitud => array-like
  0: "Hola",
  1: "Mundo",
  length: 2
};

*!*
// Error (sin Symbol.iterator)
for (let item of arrayLike) {}
*/!*
```

<<<<<<< HEAD
Tanto los iterables como los array-like generalmente no son *matrices*, no tienen "push", "pop", etc. Eso es bastante inconveniente si tenemos un objeto de este tipo y queremos trabajar con él como con una matriz. P.ej. nos gustaría trabajar con `range` utilizando métodos de matriz. ¿Cómo lograr eso?

## Array.from

Existe un método universal [Array.from](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/from) que toma un valor iterable o similar a una matriz y crea un `Array` ¨real¨ a partir de él. De esta manera podemos llamar y usar métodos que pertenecen a una matriz.
=======
Both iterables and array-likes are usually *not arrays*, they don't have `push`, `pop` etc. That's rather inconvenient if we have such an object and want to work with it as with an array. E.g. we would like to work with `range` using array methods. How to achieve that?

## Array.from

There's a universal method [Array.from](mdn:js/Array/from) that takes an iterable or array-like value and makes a "real" `Array` from it. Then we can call array methods on it.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Por ejemplo:

```js run
let arrayLike = {
  0: "Hola",
  1: "Mundo",
  length: 2
};

*!*
let arr = Array.from(arrayLike); // (*)
*/!*
alert(arr.pop()); // Mundo (el método pop funciona)
```

<<<<<<< HEAD
`Array.from` en la línea `(*)` toma el objeto, lo examina por ser iterable o similar a una matriz, luego crea una nueva matriz y copia allí todos los elementos.
=======
`Array.from` at the line `(*)` takes the object, examines it for being an iterable or array-like, then makes a new array and copies all items to it.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Lo mismo sucede para un iterable:

```js
// suponiendo que range se toma del ejemplo anterior
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (la conversión de matriz a cadena funciona)
```

<<<<<<< HEAD
La sintaxis completa para `Array.from` también nos permite proporcionar una función opcional de "mapeo":
=======
The full syntax for `Array.from` also allows us to provide an optional "mapping" function:
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```js
Array.from(obj[, mapFn, thisArg])
```

<<<<<<< HEAD
El segundo argumento opcional `mapFn` puede ser una función que se aplicará a cada elemento antes de agregarlo a la matriz, y `thisArg` permite establecer el `this` para ello.
=======
The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Por ejemplo:

```js
// suponiendo que range se toma del ejemplo anterior

// el cuadrado de cada número
let arr = Array.from(range, num => num * num);

alert(arr); // 1,4,9,16,25
```

Aquí usamos `Array.from` para convertir una cadena en una matriz de caracteres:

```js run
let str = '𝒳😂';

// splits str into array of characters
let chars = Array.from(str);

alert(chars[0]); // 𝒳
alert(chars[1]); // 😂
alert(chars.length); // 2
```

A diferencia de `str.split`, `Array.from` se basa en la naturaleza iterable de la cadena y, por lo tanto, al igual que `for..of`, funciona correctamente con pares sustitutos.

Técnicamente aquí hace lo mismo que:
 
```js run
let str = '𝒳😂';

let chars = []; // Array.from internamente hace el mismo bucle

for (let char of str) {
  chars.push(char);
}

alert(chars);
```

<<<<<<< HEAD
... Pero es más corto.    
=======
...But it is shorter.    
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

Incluso podemos construir un `segmento` o `slice` compatible con sustitutos en él:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

<<<<<<< HEAD
// el método nativo no admite pares sustitutos
alert( str.slice(1, 3) ); // garbage (dos piezas de diferentes pares sustitutos)
=======
// the native method does not support surrogate pairs
alert( str.slice(1, 3) ); // garbage (two pieces from different surrogate pairs)
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9
```


## Resumen

<<<<<<< HEAD
Los objetos que se pueden usar en `for..of` se denominan *iterables*.
=======
- Technically, iterables must implement the method named `Symbol.iterator`.
    - The result of `obj[Symbol.iterator]` is called an *iterator*. It handles the further iteration process.
    - An iterator must have the method named `next()` that returns an object `{done: Boolean, value: any}`, here `done:true` denotes the end of the iteration process, otherwise the `value` is the next value.
- The `Symbol.iterator` method is called automatically by `for..of`, but we also can do it directly.
- Built-in iterables like strings or arrays, also implement `Symbol.iterator`.
- String iterator knows about surrogate pairs.
>>>>>>> 445bda39806050acd96f87166a7c97533a0c67e9

- Técnicamente, los iterables deben implementar el método llamado `Symbol.iterator`.
    - El resultado de `obj[Symbol.iterator]` se llama *iterador*. Maneja el proceso de iteración adicional.
    - Un iterador debe tener el método llamado `next()` que devuelve un objeto `{done: Boolean, value: any}`, donde `done: true` denota el final de la iteración, de lo contrario, `value` es el siguiente valor.
- El método `Symbol.iterator` se llama automáticamente por `for..of`, pero también podemos hacerlo directamente.
- Los iterables integrados, como cadenas o matrices, también implementan `Symbol.iterator`.
- El iterador de cadena funciona con pares sustitutos.
 

Los objetos que tienen propiedades indexadas y `longitud` o *length* se llaman *array-like*. Dichos objetos también pueden tener otras propiedades y métodos, pero carecen de los métodos integrados de las matrices.

Si miramos dentro de la especificación, veremos que la mayoría de los métodos incorporados suponen que funcionan con iterables o array-likes en lugar de matrices "reales", porque eso es más abstracto.

`Array.from (obj[, mapFn, thisArg])` crea un verdadero `Array` de un `obj` iterable o array-like, y luego podemos usar métodos de matriz en él. Los argumentos opcionales `mapFn` y `thisArg` nos permiten aplicar una función a cada elemento.
 
