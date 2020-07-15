# Métodos con arrays 

Los arrays cuentan con muchos métodos. Para hacer las cosas más sencillas, en este capítulo se encuentran divididos en dos.

## Agregar/quitar items

Ya conocemos métodos que agregan o extraen items del inicio o final de un array:

- `arr.push(...items)` -- agrega items al final,
- `arr.pop()` -- extrae un item del final,
- `arr.shift()` -- extrae un item del inicio,
- `arr.unshift(...items)` -- agrega items al principio.

Algunos métodos más.

### splice

¿Cómo borrar un elemento del array?

Los arrays son objetos, por lo que podemos usar `delete`:

```js run
let arr = ["voy", "a", "casa"];

delete arr[1]; // remueve "a"

alert( arr[1] ); // undefined

// now arr = ["voy",  , "casa"];
alert( arr.length ); // 3
```

El elemento fue removido pero el array todavía tiene 3 elementos, podemos comprobarlo en `arr.length == 3`.

Esto es esperable porque `delete obj.key` borra el valor de la `key`. Es todo lo que hace. Funciona bien para objetos pero para arrays usualmente lo que buscamos es que el resto de los elemetos se muevan y ocupen el lugar libre. Lo que esperamos obtener es un array más corto.

Por lo tanto, necesitamos utilizar métodos especiales.

El método [arr.splice(start)](mdn:js/Array/splice) funciona como una navaja suiza para arrays. Puede hacer todo: insertar, remover y remplazar elementos.

La sintáxis es:

```js
arr.splice(index[, deleteCount, elem1, ..., elemN])
```

Comienza en el `index`: remueve `deleteCount` elementos y luego inserta `elem1, ..., elemN` en su lugar devolviendo un array con los elementos removidos.

Este método es más fácil de entender con ejemplos.

Empecemos removiendo elementos:

```js run
let arr = ["Yo", "estudio", "JavaScript"];

*!*
arr.splice(1, 1); // desde el index 1 remover 1 elemento
*/!*

alert( arr ); // ["Yo", "JavaScript"]
```

Fácil no? Empezando desde el índice `1` removió `1` elementos

En el próximo ejemplo removemos 3 elementos y los reemplazamos con otros 2:

```js run
let arr = [*!*"Yo", "estudio", "JavaScript",*/!* "ahora", "mismo"];

// remueve los primeros 3 elementos y los reemplaza con otros
arr.splice(0, 3, "a", "bailar");

alert( arr ) // ahora [*!*"a", "bailar"*/!*, "ahora", "mismo"]
```

Acá podemos ver que `splice` devuelve un array con los elementos removidos:

```js run
let arr = [*!*"Yo", "estudio",*/!* "JavaScript", "ahora", "mismo"];

// remueve los 2 primeros elementos
let removed = arr.splice(0, 2);

alert( removed ); // "Yo", "estudio" <-- array con los elementos removidos
```

El método `splice` también es capaz de insertar elementos sin remover ningún otro. Para eso necesitamos establecer `deleteCount` en `0`:

```js run
let arr = ["Yo", "estudio", "JavaScript"];

// desde el index 2
// remover 0
// después insertar "el", "complejo" y "language"
arr.splice(2, 0,"el", "complejo", "language");

alert( arr ); // "Yo", "estudio","el", "complejo", "language", "JavaScript"
```

````smart header="Negative indexes allowed"
En este y en otros mátodos de arrays, los índices negativos están permitidos. Estos índices especifican la posición comenzando desde el final del array, de la siguiente manera:

```js run
let arr = [1, 2, 5];

// desde el index -1 (un lugar desde el final)
// remover 0 elementos,
// después insertar 3 y 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```
````

### slice

El método [arr.slice](mdn:js/Array/slice) es mucho más simple que `arr.splice`.

La sintáxis es:

```js
arr.slice([principio], [final])
```

Devuelve un nuevo array copiendo en el mismo todos los elementos desde `principio` hasta `final` (sin incluir `final`). Ambos `principio` y `final` pueden ser negativos en cuyo caso se incluye la posición desde el final del array.

Es similar al método para strings `str.slice`, pero en lugar de substrings elabora subarrays.

Por ejemplo:

```js run
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s (copia desde 1 hasta 3)

alert( arr.slice(-2) ); // s,t (copia desde -2 hasta el final)
```

También podemos invocarlo sin argumentos: `arr.slice()` crea una copia de `arr`.Usualmente esto se utiliza para obtener una copia para futuras transformaciones sin afectar al array original.

### concat

The method [arr.concat](mdn:js/Array/concat) creates a new array that includes values from other arrays and additional items.

The syntax is:

```js
arr.concat(arg1, arg2...)
```

It accepts any number of arguments -- either arrays or values.

The result is a new array containing items from `arr`, then `arg1`, `arg2` etc.

If an argument `argN` is an array, then all its elements are copied. Otherwise, the argument itself is copied.

For instance:

```js run
let arr = [1, 2];

// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// create an array from: arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

Normally, it only copies elements from arrays. Other objects, even if they look like arrays, are added as a whole:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

...But if an array-like object has a special `Symbol.isConcatSpreadable` property, then it's treated as an array by `concat`: its elements are added instead:

```js run
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
*!*
  [Symbol.isConcatSpreadable]: true,
*/!*
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

## Iterate: forEach

The [arr.forEach](mdn:js/Array/forEach) method allows to run a function for every element of the array.

The syntax:
```js
arr.forEach(function(item, index, array) {
  // ... do something with item
});
```

For instance, this shows each element of the array:

```js run
// for each element call alert
["Bilbo", "Gandalf", "Nazgul"].forEach(alert);
```

And this code is more elaborate about their positions in the target array:

```js run
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
```

The result of the function (if it returns any) is thrown away and ignored.


## Searching in array

Now let's cover methods that search in an array.

### indexOf/lastIndexOf and includes

The methods [arr.indexOf](mdn:js/Array/indexOf), [arr.lastIndexOf](mdn:js/Array/lastIndexOf) and [arr.includes](mdn:js/Array/includes) have the same syntax and do essentially the same as their string counterparts, but operate on items instead of characters:

- `arr.indexOf(item, from)` -- looks for `item` starting from index `from`, and returns the index where it was found, otherwise `-1`.
- `arr.lastIndexOf(item, from)` -- same, but looks for from right to left.
- `arr.includes(item, from)` -- looks for `item` starting from index `from`, returns `true` if found.

For instance:

```js run
let arr = [1, 0, false];

alert( arr.indexOf(0) ); // 1
alert( arr.indexOf(false) ); // 2
alert( arr.indexOf(null) ); // -1

alert( arr.includes(1) ); // true
```

Note that the methods use `===` comparison. So, if we look for `false`, it finds exactly `false` and not the zero.

If we want to check for inclusion, and don't want to know the exact index, then `arr.includes` is preferred.

Also, a very minor difference of `includes` is that it correctly handles `NaN`, unlike `indexOf/lastIndexOf`:

```js run
const arr = [NaN];
alert( arr.indexOf(NaN) ); // -1 (should be 0, but === equality doesn't work for NaN)
alert( arr.includes(NaN) );// true (correct)
```

### find and findIndex

Imagine we have an array of objects. How do we find an object with the specific condition?

Here the [arr.find(fn)](mdn:js/Array/find) method comes in handy.

The syntax is:
```js
let result = arr.find(function(item, index, array) {
  // if true is returned, item is returned and iteration is stopped
  // for falsy scenario returns undefined
});
```

The function is called for elements of the array, one after another:

- `item` is the element.
- `index` is its index.
- `array` is the array itself.

If it returns `true`, the search is stopped, the `item` is returned. If nothing found, `undefined` is returned.

For example, we have an array of users, each with the fields `id` and `name`. Let's find the one with `id == 1`:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

let user = users.find(item => item.id == 1);

alert(user.name); // John
```

In real life arrays of objects is a common thing, so the `find` method is very useful.

Note that in the example we provide to `find` the function `item => item.id == 1` with one argument. That's typical, other arguments of this function are rarely used.

The [arr.findIndex](mdn:js/Array/findIndex) method is essentially the same, but it returns the index where the element was found instead of the element itself and `-1` is returned when nothing is found.

### filter

The `find` method looks for a single (first) element that makes the function return `true`.

If there may be many, we can use [arr.filter(fn)](mdn:js/Array/filter).

The syntax is similar to `find`, but `filter` returns an array of all matching elements:

```js
let results = arr.filter(function(item, index, array) {
  // if true item is pushed to results and the iteration continues
  // returns empty array if nothing found
});
```

For instance:

```js run
let users = [
  {id: 1, name: "John"},
  {id: 2, name: "Pete"},
  {id: 3, name: "Mary"}
];

// returns array of the first two users
let someUsers = users.filter(item => item.id < 3);

alert(someUsers.length); // 2
```

## Transform an array

Let's move on to methods that transform and reorder an array.

### map

The [arr.map](mdn:js/Array/map) method is one of the most useful and often used.

It calls the function for each element of the array and returns the array of results.

The syntax is:

```js
let result = arr.map(function(item, index, array) {
  // returns the new value instead of item
});
```

For instance, here we transform each element into its length:

```js run
let lengths = ["Bilbo", "Gandalf", "Nazgul"].map(item => item.length);
alert(lengths); // 5,7,6
```

### sort(fn)

The call to [arr.sort()](mdn:js/Array/sort) sorts the array *in place*, changing its element order.

It also returns the sorted array, but the returned value is usually ignored, as `arr` itself is modified.

For instance:

```js run
let arr = [ 1, 2, 15 ];

// the method reorders the content of arr
arr.sort();

alert( arr );  // *!*1, 15, 2*/!*
```

Did you notice anything strange in the outcome?

The order became `1, 15, 2`. Incorrect. But why?

**The items are sorted as strings by default.**

Literally, all elements are converted to strings for comparisons. For strings, lexicographic ordering is applied and indeed `"2" > "15"`.

To use our own sorting order, we need to supply a function as the argument of `arr.sort()`.

The function should compare two arbitrary values and return:
```js
function compare(a, b) {
  if (a > b) return 1; // if the first value is greater than the second
  if (a == b) return 0; // if values are equal
  if (a < b) return -1; // if the first value is less than the second
}
```

For instance, to sort as numbers:

```js run
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

*!*
arr.sort(compareNumeric);
*/!*

alert(arr);  // *!*1, 2, 15*/!*
```

Now it works as intended.

Let's step aside and think what's happening. The `arr` can be array of anything, right? It may contain numbers or strings or objects or whatever. We have a set of *some items*. To sort it, we need an *ordering function* that knows how to compare its elements. The default is a string order.

The `arr.sort(fn)` method implements a generic sorting algorithm. We don't need to care how it internally works (an optimized [quicksort](https://en.wikipedia.org/wiki/Quicksort) most of the time). It will walk the array, compare its elements using the provided function and reorder them, all we need is to provide the `fn` which does the comparison.

By the way, if we ever want to know which elements are compared -- nothing prevents from alerting them:

```js run
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
});
```

The algorithm may compare an element with multiple others in the process, but it tries to make as few comparisons as possible.

````smart header="A comparison function may return any number"
Actually, a comparison function is only required to return a positive number to say "greater" and a negative number to say "less".

That allows to write shorter functions:

```js run
let arr = [ 1, 2, 15 ];

arr.sort(function(a, b) { return a - b; });

alert(arr);  // *!*1, 2, 15*/!*
```
````

````smart header="Arrow functions for the best"
Remember [arrow functions](info:arrow-functions-basics)? We can use them here for neater sorting:

```js
arr.sort( (a, b) => a - b );
```

This works exactly the same as the longer version above.
````

````smart header="Use `localeCompare` for strings"
Remember [strings](info:string#correct-comparisons) comparison algorithm? It compares letters by their codes by default.

For many alphabets, it's better to use `str.localeCompare` method to correctly sort letters, such as `Ö`.

For example, let's sort a few countries in German:

```js run
let countries = ['Österreich', 'Andorra', 'Vietnam'];

alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (wrong)

alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (correct!)
```
````

### reverse

The method [arr.reverse](mdn:js/Array/reverse) reverses the order of elements in `arr`.

For instance:

```js run
let arr = [1, 2, 3, 4, 5];
arr.reverse();

alert( arr ); // 5,4,3,2,1
```

It also returns the array `arr` after the reversal.

### split and join

Here's the situation from real life. We are writing a messaging app, and the person enters the comma-delimited list of receivers: `John, Pete, Mary`. But for us an array of names would be much more comfortable than a single string. How to get it?

The [str.split(delim)](mdn:js/String/split) method does exactly that. It splits the string into an array by the given delimiter `delim`.

In the example below, we split by a comma followed by space:

```js run
let names = 'Bilbo, Gandalf, Nazgul';

let arr = names.split(', ');

for (let name of arr) {
  alert( `A message to ${name}.` ); // A message to Bilbo  (and other names)
}
```

The `split` method has an optional second numeric argument -- a limit on the array length. If it is provided, then the extra elements are ignored. In practice it is rarely used though:

```js run
let arr = 'Bilbo, Gandalf, Nazgul, Saruman'.split(', ', 2);

alert(arr); // Bilbo, Gandalf
```

````smart header="Split into letters"
The call to `split(s)` with an empty `s` would split the string into an array of letters:

```js run
let str = "test";

alert( str.split('') ); // t,e,s,t
```
````

The call [arr.join(glue)](mdn:js/Array/join) does the reverse to `split`. It creates a string of `arr` items joined by `glue` between them.

For instance:

```js run
let arr = ['Bilbo', 'Gandalf', 'Nazgul'];

let str = arr.join(';'); // glue the array into a string using ;

alert( str ); // Bilbo;Gandalf;Nazgul
```

### reduce/reduceRight

When we need to iterate over an array -- we can use `forEach`, `for` or `for..of`.

When we need to iterate and return the data for each element -- we can use `map`.

The methods [arr.reduce](mdn:js/Array/reduce) and [arr.reduceRight](mdn:js/Array/reduceRight) also belong to that breed, but are a little bit more intricate. They are used to calculate a single value based on the array.

The syntax is:

```js
let value = arr.reduce(function(accumulator, item, index, array) {
  // ...
}, [initial]);
```

The function is applied to all array elements one after another and "carries on" its result to the next call.

Arguments:

- `accumulator` -- is the result of the previous function call, equals `initial` the first time (if `initial` is provided).
- `item` -- is the current array item.
- `index` -- is its position.
- `array` -- is the array.

As function is applied, the result of the previous function call is passed to the next one as the first argument.

So, the first argument is essentially the accumulator that stores the combined result of all previous executions. And at the end it becomes the result of `reduce`.

Sounds complicated?

The easiest way to grasp that is by example.

Here we get a sum of an array in one line:

```js run
let arr = [1, 2, 3, 4, 5];

let result = arr.reduce((sum, current) => sum + current, 0);

alert(result); // 15
```

The function passed to `reduce` uses only 2 arguments, that's typically enough.

Let's see the details of what's going on.

1. On the first run, `sum` is the `initial` value (the last argument of `reduce`), equals `0`, and `current` is the first array element, equals `1`. So the function result is `1`.
2. On the second run, `sum = 1`, we add the second array element (`2`) to it and return.
3. On the 3rd run, `sum = 3` and we add one more element to it, and so on...

The calculation flow:

![](reduce.svg)

Or in the form of a table, where each row represents a function call on the next array element:

|   |`sum`|`current`|result|
|---|-----|---------|---------|
|the first call|`0`|`1`|`1`|
|the second call|`1`|`2`|`3`|
|the third call|`3`|`3`|`6`|
|the fourth call|`6`|`4`|`10`|
|the fifth call|`10`|`5`|`15`|

Here we can clearly see how the result of the previous call becomes the first argument of the next one.

We also can omit the initial value:

```js run
let arr = [1, 2, 3, 4, 5];

// removed initial value from reduce (no 0)
let result = arr.reduce((sum, current) => sum + current);

alert( result ); // 15
```

The result is the same. That's because if there's no initial, then `reduce` takes the first element of the array as the initial value and starts the iteration from the 2nd element.

The calculation table is the same as above, minus the first row.

But such use requires an extreme care. If the array is empty, then `reduce` call without initial value gives an error.

Here's an example:

```js run
let arr = [];

// Error: Reduce of empty array with no initial value
// if the initial value existed, reduce would return it for the empty arr.
arr.reduce((sum, current) => sum + current);
```

So it's advised to always specify the initial value.

The method [arr.reduceRight](mdn:js/Array/reduceRight) does the same, but goes from right to left.


## Array.isArray

Arrays do not form a separate language type. They are based on objects.

So `typeof` does not help to distinguish a plain object from an array:

```js run
alert(typeof {}); // object
alert(typeof []); // same
```

...But arrays are used so often that there's a special method for that: [Array.isArray(value)](mdn:js/Array/isArray). It returns `true` if the `value` is an array, and `false` otherwise.

```js run
alert(Array.isArray({})); // false

alert(Array.isArray([])); // true
```

## Most methods support "thisArg"

Almost all array methods that call functions -- like `find`, `filter`, `map`, with a notable exception of `sort`, accept an optional additional parameter `thisArg`.

That parameter is not explained in the sections above, because it's rarely used. But for completeness we have to cover it.

Here's the full syntax of these methods:

```js
arr.find(func, thisArg);
arr.filter(func, thisArg);
arr.map(func, thisArg);
// ...
// thisArg is the optional last argument
```

The value of `thisArg` parameter becomes `this` for `func`.

For example, here we use a method of `army` object as a filter, and `thisArg` passes the context:

```js run
let army = {
  minAge: 18,
  maxAge: 27,
  canJoin(user) {
    return user.age >= this.minAge && user.age < this.maxAge;
  }
};

let users = [
  {age: 16},
  {age: 20},
  {age: 23},
  {age: 30}
];

*!*
// find users, for who army.canJoin returns true
let soldiers = users.filter(army.canJoin, army);
*/!*

alert(soldiers.length); // 2
alert(soldiers[0].age); // 20
alert(soldiers[1].age); // 23
```

If in the example above we used `users.filter(army.canJoin)`, then `army.canJoin` would be called as a standalone function, with `this=undefined`, thus leading to an instant error.

A call to `users.filter(army.canJoin, army)` can be replaced with `users.filter(user => army.canJoin(user))`, that does the same. The former is used more often, as it's a bit easier to understand for most people.

## Summary

A cheat sheet of array methods:

- To add/remove elements:
  - `push(...items)` -- adds items to the end,
  - `pop()` -- extracts an item from the end,
  - `shift()` -- extracts an item from the beginning,
  - `unshift(...items)` -- adds items to the beginning.
  - `splice(pos, deleteCount, ...items)` -- at index `pos` delete `deleteCount` elements and insert `items`.
  - `slice(start, end)` -- creates a new array, copies elements from position `start` till `end` (not inclusive) into it.
  - `concat(...items)` -- returns a new array: copies all members of the current one and adds `items` to it. If any of `items` is an array, then its elements are taken.

- To search among elements:
  - `indexOf/lastIndexOf(item, pos)` -- look for `item` starting from position `pos`, return the index or `-1` if not found.
  - `includes(value)` -- returns `true` if the array has `value`, otherwise `false`.
  - `find/filter(func)` -- filter elements through the function, return first/all values that make it return `true`.
  - `findIndex` is like `find`, but returns the index instead of a value.

- To iterate over elements:
  - `forEach(func)` -- calls `func` for every element, does not return anything.

- To transform the array:
  - `map(func)` -- creates a new array from results of calling `func` for every element.
  - `sort(func)` -- sorts the array in-place, then returns it.
  - `reverse()` -- reverses the array in-place, then returns it.
  - `split/join` -- convert a string to array and back.
  - `reduce(func, initial)` -- calculate a single value over the array by calling `func` for each element and passing an intermediate result between the calls.

- Additionally:
  - `Array.isArray(arr)` checks `arr` for being an array.

Please note that methods `sort`, `reverse` and `splice` modify the array itself.

These methods are the most used ones, they cover 99% of use cases. But there are few others:

- [arr.some(fn)](mdn:js/Array/some)/[arr.every(fn)](mdn:js/Array/every) checks the array.

  The function `fn` is called on each element of the array similar to `map`. If any/all results are `true`, returns `true`, otherwise `false`.

- [arr.fill(value, start, end)](mdn:js/Array/fill) -- fills the array with repeating `value` from index `start` to `end`.

- [arr.copyWithin(target, start, end)](mdn:js/Array/copyWithin) -- copies its elements from position `start` till position `end` into *itself*, at position `target` (overwrites existing).

For the full list, see the [manual](mdn:js/Array).

From the first sight it may seem that there are so many methods, quite difficult to remember. But actually that's much easier.

Look through the cheat sheet just to be aware of them. Then solve the tasks of this chapter to practice, so that you have experience with array methods.

Afterwards whenever you need to do something with an array, and you don't know how -- come here, look at the cheat sheet and find the right method. Examples will help you to write it correctly. Soon you'll automatically remember the methods, without specific efforts from your side.
