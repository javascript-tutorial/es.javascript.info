importance: 5

---

<<<<<<< HEAD
=======
# Fix a function that loses "this"
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc

# Arreglar una función que perdió "this"

La llamada a `askPassword()` en el código a continuación debe verificar la contraseña y luego llamar a `user.loginOk/loginFail` dependiendo de la respuesta.

Pero lleva a un error. ¿Por qué?

Arregle la línea resaltada para que todo comience a funcionar correctamente (no se deben cambiar otras líneas).

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
askPassword(user.loginOk, user.loginFail);
*/!*
```
