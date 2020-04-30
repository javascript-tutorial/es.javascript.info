
```js run
let usuario = {
  nombre: "John",
  años: 30
};

let {nombre, años: edad, esAdmin = false} = usuario;

alert( nombre ); // John
alert( edad ); // 30
alert( esAdmin ); // false
```