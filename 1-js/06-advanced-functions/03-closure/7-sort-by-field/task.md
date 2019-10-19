importance: 5

---

# Ordenar por propiedad

Tenemos un array de objetos para ordenar:

```js
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
```

La forma habitual de hacerlo sería:

```js
// por nombre (Ann, John, Pete)
users.sort((a, b) => a.name > b.name ? 1 : -1);

// por edad (Pete, Ann, John)
users.sort((a, b) => a.age > b.age ? 1 : -1);
```

¿Podemos hacerlo incluso menos verboso, así?

```js
users.sort(byField('name'));
users.sort(byField('age'));
```

Entonces, en vez de escribir la función, ponemos `byField(fieldName)`.

Escribe la función `byField` que puede ser usada para esto.
