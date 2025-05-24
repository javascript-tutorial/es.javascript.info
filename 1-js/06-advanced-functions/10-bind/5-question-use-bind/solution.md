
El error se produce porque `askPassword` obtiene las funciones `loginOk/loginFail` sin el objeto.

Cuando las llama, estas asumen `this = undefined`.

Vamos a usar `bind` para enlazar el contexto:

```js run
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  loginOk() {
    alert(`${this.name} logged in`);
  },

  loginFail() {
    alert(`${this.name} failed to log in`);
  },

};

*!*
askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
*/!*
```

Ahora funciona.

Una solución alternativa podría ser:
```js
//...
askPassword(() => user.loginOk(), () => user.loginFail());
```


En general, funciona y se ve bien.

Aunque esto es menos confiable, si puede darse el caso en donde `user` cambia después de llamar a `askPassword`, pero antes de que el visitante responda y se invoque `() => user.loginOk()`.
