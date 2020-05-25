importance: 5

---

# Aplicación parcial para inicio de sesión

La tarea es una variante un poco más compleja de <info:task/question-use-bind>. 

El objeto `user` fue modificado. Ahora, en lugar de dos funciones `loginOk/loginFail`, tiene una sola función `user.login(true/false) `.

¿Qué deberíamos pasar a `askPassword` en el código a continuación, para que llame a `user.login(true)` como `ok` y `user.login(false)` como `fail`?

```js
function askPassword(ok, fail) {
  let password = prompt("Password?", '');
  if (password == "rockstar") ok();
  else fail();
}

let user = {
  name: 'John',

  login(result) {
    alert( this.name + (result ? ' logged in' : ' failed to log in') );
  }
};

*!*
askPassword(?, ?); // ?
*/!*
```

Sus cambios solo deberían modificar el fragmento resaltado.

