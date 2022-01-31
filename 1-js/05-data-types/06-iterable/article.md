
# Iterables

Los objetos *iterables* son una generalización de *arrays*. Es un concepto que permite que cualquier objeto pueda ser utilizado en un bucle `for..of`.

Por supuesto, las matrices o *arrays* son iterables. Pero hay muchos otros objetos integrados que también lo son. Por ejemplo, las cadenas o *strings* son iterables también. Como veremos, muchos operadores y métodos se basan en la iterabilidad.

Si un objeto no es técnicamente una matriz, pero representa una colección (lista, conjunto) de algo, entonces el uso de la sintaxis `for..of` es una gran forma de recorrerlo. Veamos cómo funciona.


## Symbol.iterator

Podemos comprender fácilmente el concepto de iterables construyendo uno.

Por ejemplo: tenemos un objeto que no es un array, pero parece adecuado para `for..of`.

Como un objeto `range` que representa un intervalo de números:

```js
let range = {
  from: 1,
  to: 5
};

// Queremos que el for..of funcione de la siguiente manera:
// for(let num of range) ... num=1,2,3,4,5
```

Para hacer que el objeto `range` sea iterable (y así permitir que `for..of` funcione) necesitamos agregarle un método llamado `Symbol.iterator` (un símbolo incorporado especial usado solo para realizar esa función).

1. Cuando se inicia `for..of`, éste llama al método `Symbol.iterator` una vez (o genera un error si no lo encuentra). El método debe devolver un *iterador* : un objeto con el método `next()`.
2. En adelante, `for..of` trabaja *solamente con ese objeto devuelto*.
3. Cuando `for..of` quiere el siguiente valor, llama a `next()` en ese objeto.
4. El resultado de `next()` debe tener la forma `{done: Boolean, value: any}`, donde `done=true` significa que el bucle ha finalizado; de lo contrario, el nuevo valor es `value`.

Aquí está la implementación completa de `range`:

```js run
let range = {
  from: 1,
  to: 5
};

// 1. Una llamada a for..of inicializa una llamada a esto:
range[Symbol.iterator] = function() {

  // ... devuelve el objeto iterador:
  // 2. En adelante, for..of trabaja solo con el objeto iterador debajo, pidiéndole los siguientes valores
  return {
    current: this.from,
    last: this.to,

    // 3. next() es llamado en cada iteración por el bucle for..of
    next() {
      // 4. debe devolver el valor como un objeto {done:.., value :...}
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
  alert(num); // 1, luego 2, 3, 4, 5
}
```

Note una característica fundamental de los iterables: separación de conceptos.

- El `range` en sí mismo no tiene el método `next()`.
- En cambio, la llamada a `range[Symbol.iterator]()` crea un otro objeto llamado "iterador", y su `next()` genera valores para la iteración.

Por lo tanto, el objeto iterador está separado del objeto sobre el que itera.

Técnicamente, podríamos fusionarlos y usar el `range` mismo como iterador para simplificar el código.

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
  alert(num); // 1, luego 2, 3, 4, 5
}
```

Ahora `range[Symbol.iterator]()` devuelve el objeto `range` en sí: tiene el método `next()` necesario y recuerda el progreso de iteración actual en `this.current`. ¿Más corto? Sí. Y a veces eso también está bien.

La desventaja es que ahora es imposible tener dos bucles `for..of` corriendo sobre el objeto simultáneamente: compartirán el estado de iteración, porque solo hay un iterador: el objeto en sí. Pero dos for-of paralelos es algo raro, incluso en escenarios asíncronos.

```smart header="Iteradores Infinitos"
También son posibles los iteradores infinitos. Por ejemplo, el objeto `range` se vuelve infinito así: `range.to = Infinity`. O podemos hacer un objeto iterable que genere una secuencia infinita de números pseudoaleatorios. También puede ser útil.

No hay limitaciones en `next`, puede devolver más y más valores, eso es normal.

Por supuesto, el bucle `for..of` sobre un iterable de este tipo sería interminable. Pero siempre podemos detenerlo usando `break`.
```


## *String* es iterable

Las matrices y cadenas son los iterables integrados más utilizados.

En una cadena o *string*, el bucle `for..of` recorre sus caracteres:

```js run
for (let char of "test") {
  // Se dispara 4 veces: una vez por cada carácter
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

## Llamar a un iterador explícitamente

Para una comprensión más profunda, veamos cómo usar un iterador explícitamente.

Vamos a iterar sobre una cadena exactamente de la misma manera que `for..of`, pero con llamadas directas. Este código crea un iterador de cadena y obtiene valores de él "manualmente":


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

## Iterables y simil-array (array-like) [#array-like]

Los dos son términos oficiales que se parecen, pero son muy diferentes. Asegúrese de comprenderlos bien para evitar confusiones.

- *Iterables* son objetos que implementan el método `Symbol.iterator`, como se describió anteriormente.
- *simil-array* son objetos que tienen índices y longitud o `length`, por lo que se "ven" como arrays.

Cuando usamos JavaScript para tareas prácticas en el navegador u otros entornos, podemos encontrar objetos que son iterables o array-like, o ambos.

Por ejemplo, las cadenas son iterables (`for..of` funciona en ellas) y array-like (tienen índices numéricos y `length`).

Pero un iterable puede que no sea array-like. Y viceversa, un array-like puede no ser iterable.

Por ejemplo, `range` en el ejemplo anterior es iterable, pero no es array-like porque no tiene propiedades indexadas ni `length`.

Y aquí el objeto tiene forma de matriz, pero no es iterable:

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

Tanto los iterables como los array-like generalmente no son *arrays*, no tienen "push", "pop", etc. Eso es bastante inconveniente si tenemos un objeto de este tipo y queremos trabajar con él como con una matriz. P.ej. nos gustaría trabajar con `range` utilizando métodos de matriz. ¿Cómo lograr eso?

## Array.from

Existe un método universal [Array.from](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/from) que toma un valor iterable o simil-array y crea un `Array` ¨real¨ a partir de él. De esta manera podemos llamar y usar métodos que pertenecen a una matriz.

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

`Array.from` en la línea `(*)` toma el objeto, y si es iterable o simil-array crea un nuevo array y copia allí todos los elementos.

Lo mismo sucede para un iterable:

```js
// suponiendo que range se toma del ejemplo anterior
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (la conversión de matriz a cadena funciona)
```

La sintaxis completa para `Array.from` también nos permite proporcionar una función opcional de "mapeo":
```js
Array.from(obj[, mapFn, thisArg])
```

El segundo argumento opcional `mapFn` puede ser una función que se aplicará a cada elemento antes de agregarlo a la matriz, y `thisArg` permite establecer el `this` para ello.

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

// separa str en un array de caracteres
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

... Pero es más corto.    

Incluso podemos construir un `segmento` o `slice` compatible con sustitutos en él:

```js run
function slice(str, start, end) {
  return Array.from(str).slice(start, end).join('');
}

let str = '𝒳😂𩷶';

alert( slice(str, 1, 3) ); // 😂𩷶

// el método nativo no admite pares sustitutos
alert( str.slice(1, 3) ); // garbage (dos piezas de diferentes pares sustitutos)
```


## Resumen

Los objetos que se pueden usar en `for..of` se denominan *iterables*.

- Técnicamente, los iterables deben implementar el método llamado `Symbol.iterator`.
    - El resultado de `obj[Symbol.iterator]()` se llama *iterador*. Maneja el proceso de iteración adicional.
    - Un iterador debe tener el método llamado `next()` que devuelve un objeto `{done: Boolean, value: any}`, donde `done: true` marca el fin de la iteración; de lo contrario, `value` es el siguiente valor.
- El método `Symbol.iterator` se llama automáticamente por `for..of`, pero también podemos llamarlo directamente.
- Los iterables integrados, como cadenas o matrices, también implementan `Symbol.iterator`.
- El iterador de cadena es capaz de manejar los pares sustitutos.


Los objetos que tienen propiedades indexadas y `longitud` o *length* se llaman *array-like*. Dichos objetos también pueden tener otras propiedades y métodos, pero carecen de los métodos integrados de las matrices.

Si miramos dentro de la especificación, veremos que la mayoría de los métodos incorporados suponen que funcionan con iterables o array-likes en lugar de matrices "reales", porque eso es más abstracto.

`Array.from (obj[, mapFn, thisArg])` crea un verdadero `Array` de un `obj` iterable o array-like, y luego podemos usar métodos de matriz en él. Los argumentos opcionales `mapFn` y `thisArg` nos permiten aplicar una función a cada elemento.

