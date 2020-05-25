
El error se produce porque `ask` obtiene las funciones `loginOk/loginFail` sin el objeto.

Cuando los llama, asumen naturalmente `this = undefined`.

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

Por lo general, eso también funciona y se ve bien.

Es un poco menos confiable, aunque en situaciones más complejas donde la variable `user` podría cambiar *después* de que se llama a `askPassword`, pero *antes* el visitante responde y llama a `() => user.loginOk ()`.

