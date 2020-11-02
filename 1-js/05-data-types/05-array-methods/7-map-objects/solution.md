
```js run no-beautify
let john = { name: "John", surname: "Smith", id: 1 };
let pete = { name: "Pete", surname: "Hunt", id: 2 };
let mary = { name: "Mary", surname: "Key", id: 3 };

let users = [ john, pete, mary ];

*!*
let usersMapped = users.map(user => ({
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
*/!*

/*
usersMapped = [
  { fullName: "John Smith", id: 1 },
  { fullName: "Pete Hunt", id: 2 },
  { fullName: "Mary Key", id: 3 }
]
*/

alert( usersMapped[0].id ); // 1
alert( usersMapped[0].fullName ); // John Smith
```

<<<<<<< HEAD
Ten en cuenta que para las funciones arrow necesitamos usar paréntesis adicionales.
=======
Please note that in the arrow functions we need to use additional brackets. 
>>>>>>> dccca58f268ad6d5a6f2160613a8ea3c5cd53a2d

No podemos escribirlo de la siguiente manera:
```js
let usersMapped = users.map(user => *!*{*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
});
```

Como recordarás, existen dos funciones arrow: sin cuerpo `value => expr` y con cuerpo `value => {...}`.

Acá JavaScript tratará `{` como el inicio de cuerpo de la función, no el inicio del objeto. La manera de resolver esto es encerrarlo dentro de paréntesis:

```js
let usersMapped = users.map(user => *!*({*/!*
  fullName: `${user.name} ${user.surname}`,
  id: user.id
}));
```

Ahora funciona.
