Podemos usar dicho enfoque si estamos seguros de que la propiedad `"constructor"` tiene el valor correcto.

For instance, if we don't touch the default `"prototype"`, then this code works for sure:

```js run
function User(name) {
  this.name = name;
}

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // Pete (funcionó!)
```

Funcionó, porque `User.prototype.constructor == User`.

..Pero si alguien, por así decirlo, sobrescribe `User.prototype` y olvida recrear `constructor` para hacer referencia a `User`, entonces fallaría.

Por ejemplo:

```js run
function User(name) {
  this.name = name;
}
*!*
User.prototype = {}; // (*)
*/!*

let user = new User('John');
let user2 = new user.constructor('Pete');

alert( user2.name ); // undefined
```

¿Por qué `user2.name` es `undefined`?

Así es como funciona `new user.constructor('Pete')`:

1. Primero, busca a `constructor` en `user`. Nada.
2. Luego sigue la cadena de prototipo. El prototipo de `user` es `User.prototype`, y tampoco tiene nada.
3. El valor de `User.prototype` es un objeto simple `{}`, su prototipo es `Object.prototype`. Y hay `Object.prototype.constructor == Object`. Entonces se usa.

At the end, we have `let user2 = new Object('Pete')`. The built-in `Object` constructor ignores arguments, it always creates an empty object, similar to `let user2 = {}`, that's what we have in `user2` after all.
