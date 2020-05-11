
# Iterables

Los objetos *iterables* son una generalización de matrices. Este es un concepto que permite que cualquier objeto pueda ser utilizado en un blucle `for..of`.

Por supuesto, las matrices o *arrays* son iterables. Pero hay muchos otros objetos integrados, que también lo son. Por ejemplo, las cadenas o *strings* son iterables también. Como veremos, muchos operadores y métodos se basan en la iterabilidad.

Si un objeto representa una colección (lista, conjunto) de algo, entonces el uso de la sintaxis `for..of` es una gran forma de recorrerlo, así que veamos cómo funciona.

## Symbol.iterator

Podemos comprender fácilmente el concepto de iterables por medio de la práctica.

Por ejemplo, tenemos un objeto, que no es una matriz, pero parece adecuado para `for..of`.

Como un objeto *`range`* que representa un intervalo de números:

```js
let range = {
  from: 1,
  to: 5
};

// Queremos que el for..of funcione de la siguiente manera:
// for(let num of range) ... num=1,2,3,4,5
```

Para hacer que el `range` sea iterable (y así permitir que` for..of` funcione) necesitamos agregar un método al objeto llamado `Symbol.iterator` (un símbolo incorporado especial usado solo para realiza esa función, proporcionar iterabilidad).

1. Cuando se inicia el `for..of`, éste llama al método  `Symbol.iterator` una vez (o genera un error si no lo encuentra). El método debe devolver un *iterador* --un objeto con el método `next()`.
2.  En adelante, `for..of` trabaja *solo con ese objeto devuelto*.
3. Cuando `for..of` quiere el siguiente valor, llama a `next()` en ese objeto.
4.El resultado de `next()` debe tener la forma `{done: Boolean, value: any}`, donde `done = true` significa que la iteración ha finalizado; de lo contrario,`value` debe ser el nuevo valor.

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

    // 3. next () es llamado en cada iteración por el bucle for..of
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

Tenga en cuenta la característica principal de los iterables: separación de preocupaciones.

- El `range` en sí mismo no tiene el método` next() `.
- En cambio, la llamada a `range[Symbol.iterator]()` crea un llamado "iterador" que maneja toda la iteración.

Por lo tanto, el objeto iterador está separado del objeto sobre el que itera.

Técnicamente, podemos fusionarlos y usar `range` en sí mismo como iterador para simplificar el código.

Como este:

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

Ahora `range[Symbol.iterator]()` devuelve el objeto `range` en sí: tiene el método`next()` necesario y recuerda el progreso de iteración actual en `this.current`. ¿Más corto? Sí. Y a veces eso también está bien.

La desventaja es que ahora es imposible tener dos bucles `for..of` corriendo sobre el objeto simultáneamente: compartirán el estado de iteración, porque solo hay un iterador: el objeto en sí. Pero dos for-ofs paralelos es algo raro, factible con algunos escenarios asíncronos.
 
```smart header="Iteradores Infinitos"
También son posibles los iteradores infinitos. Por ejemplo, el objeto `range` se vuelve infinito así:` range.to = Infinity`. O podemos hacer un objeto iterable que genere una secuencia infinita de números pseudoaleatorios. También puede ser útil.

No hay limitaciones en `next`, éste puede retornar muchos valores.

Por supuesto, el bucle `for..of` sobre un iterativo de este tipo sería interminable. Pero siempre podemos detenerlo usando `break`.
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

## Llamar a un iterador explícitamente

Normalmente, las partes internas de los iterables están ocultas al código externo. Hay un bucle `for..of`, que funciona, eso es todo lo que necesita saber.

Pero para comprender las cosas un poco más en profundidad, veamos cómo crear un iterador explícitamente.

Vamos a iterar sobre una cadena de la misma manera que `for..of`, pero con llamadas directas. Este código obtiene un iterador de cadena y lo llama "manualmente":
 

```js run
let str = "Hola";

// hace lo mismo que
// for (let char of str) alert(char);

let iterator = str[Symbol.iterator]();

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

Naturalmente, estas propiedades pueden combinarse. Por ejemplo, las cadenas son iterables (`for..of` funciona en ellas) y tienen forma de matriz (tienen índices numéricos y` longitud` o *length*).

Pero un iterable puede no tener forma de matriz. Y viceversa, un tipo de matriz puede no ser iterable.

Por ejemplo,`range` en el ejemplo anterior es iterable, pero no como una matriz, porque no tiene propiedades indexadas ni`longitud` o *length*.

Y aquí está el objeto que tiene forma de matriz, pero no es iterable:

```js run
let arrayLike = { // tiene índices y longitud => array-like
  0: "Hola",
  1: "Mundo",
  length: 2
};

*!*
// Error (arrayLike no es un iterable)
for (let item of arrayLike) {}
*/!*
```

¿Qué tienen en común? Tanto los iterables como los array-like generalmente son *no matrices*, no tienen "push", "pop", etc. Eso genera inconvenientes si tenemos un objeto así y queremos trabajar con él como con una matriz.

## Array.from

Existe un método universal [Array.from](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/from) que toma un valor iterable o similar a una matriz y crea una matriz ¨real¨ a partir de él. De esta manera podemos llamar y usar métodos que pertenecen a una matriz.

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

`Array.from` en la línea `(*)` toma el objeto, lo examina por ser iterable o similar a una matriz, luego crea una nueva matriz y copia allí todos los elementos.

Lo mismo sucede para un iterable:

```js
// suponiendo que range se toma del ejemplo anterior
let arr = Array.from(range);
alert(arr); // 1,2,3,4,5 (la conversión de matriz a cadena funciona)
```
La sintaxis completa para `Array.from` permite proporcionar una función opcional de "mapeo" :
 
```js
Array.from(obj[, mapFn, thisArg])
```

El segundo argumento `mapFn` debería ser la función que se aplicará a cada elemento antes de agregarlo a la matriz, y` thisArg` permite establecerlo mediante el `this`.

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

A diferencia de `str.split`,`Array.from` se basa en la naturaleza iterable de la cadena y, por lo tanto, al igual que`for..of`, funciona correctamente con pares sustitutos.

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
    - El resultado de `obj[Symbol.iterator]` se llama *iterador*. Maneja el proceso de iteración adicional.
    - Un iterador debe tener el método llamado `next()` que devuelve un objeto `{done: Boolean, value: any}`, donde `done: true` denota el final de la iteración, de lo contrario, `value` es el siguiente valor.
- El método `Symbol.iterator` se llama automáticamente por `for..of`, pero también podemos hacerlo directamente.
- Los iterables integrados, como cadenas o matrices, también implementan `Symbol.iterator`.
- El iterador de cadena funciona con pares sustitutos.
 

Los objetos que tienen propiedades indexadas y `longitud` o *length* se llaman *array-like*. Dichos objetos también pueden tener otras propiedades y métodos, pero carecen de los métodos integrados de las matrices.

Si miramos dentro de la especificación, veremos que la mayoría de los métodos incorporados suponen que funcionan con iterables o array-likes en lugar de matrices "reales", porque eso es más abstracto.

`Array.from (obj[, mapFn, thisArg])` crea un verdadero `Array` de un` obj` iterable o array-like, y luego podemos usar métodos de matriz en él. Los argumentos opcionales `mapFn` y` thisArg` nos permiten aplicar una función a cada elemento.
 
