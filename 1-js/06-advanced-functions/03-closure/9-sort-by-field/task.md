importance: 5

---

# Ordenar por campo

Tenemos una variedad de objetos para ordenar:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

La forma habitual de hacerlo sería:

```js
// por nombre(Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// por edad (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

¿Podemos hacerlo aún menos detallado, como este?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Entonces, en lugar de escribir una función, simplemente ponga `byField (fieldName)`.

Escriba la función `byField` que se pueda usar para eso.
