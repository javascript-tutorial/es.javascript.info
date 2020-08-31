<<<<<<< HEAD
La razón es que la captura devuelve la entrada del usuario como una cadena.

Entonces las variables tienen valores `"1"` y `"2"` respectivamente.

```js run
let a = "1"; // prompt("Primer número?", 1);
let b = "2"; // prompt("Segundo número?", 2);
=======
The reason is that prompt returns user input as a string.

So variables have values `"1"` and `"2"` respectively.

```js run
let a = "1"; // prompt("First number?", 1);
let b = "2"; // prompt("Second number?", 2);
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

alert(a + b); // 12
```

<<<<<<< HEAD
Lo que debemos hacer es convertir las cadenas de texto a números antes `+`. Por ejemplo, utilizando `Number()` o anteponiendo `+`.

Por ejemplo, justo antes de `prompt`:

```js run
let a = +prompt("Primer número?", 1);
let b = +prompt("Segundo número?", 2);
=======
What we should to is to convert strings to numbers before `+`. For example, using `Number()` or prepending them with `+`.

For example, right before `prompt`:

```js run
let a = +prompt("First number?", 1);
let b = +prompt("Second number?", 2);
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

alert(a + b); // 3
```

<<<<<<< HEAD
O en el `alert`:

```js run
let a = prompt("Primer número?", 1);
let b = prompt("Segundo número?", 2);
=======
Or in the `alert`:

```js run
let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

alert(+a + +b); // 3
```

<<<<<<< HEAD
Usar ambos unario y binario `+` en el último ejemplo, se ve raro no?
=======
Using both unary and binary `+` in the latest code. Looks funny, doesn't it?
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a
