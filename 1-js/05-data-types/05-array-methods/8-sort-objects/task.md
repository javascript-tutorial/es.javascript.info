importance: 5

---

# Ordena usuarios por edad

Escribe la función `sortByAge(users)` que cree un array de objetos con al propiedad `age` y los ordene según `age`.

Por ejemplo:

```js no-beautify
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

sortByAge(arr);

// ahora: [john, mary, pete]
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete
```
