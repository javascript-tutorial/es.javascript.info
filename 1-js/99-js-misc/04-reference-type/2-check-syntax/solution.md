¡**Error**!

Inténtalo:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}

(user.go)() // ¡Error!
```

El mensaje de error en la mayoría de los navegadores no nos da una pista sobre lo que salió mal.

**El error aparece porque falta un punto y coma después de `user = {...}`.**

JavaScript no inserta automáticamente un punto y coma antes de un paréntesis `(user.go)()`, por lo que lee el código así:

```js no-beautify
let user = { go:... }(user.go)()
```

Entonces también podemos ver que tal expresión conjunta es sintácticamente una llamada del objeto `{ go: ... }` como una función con el argumento `(user.go)`. Y eso también ocurre en la misma línea con `let user`, por lo que el objeto `user` aún no se ha definido y de ahí el error.

Si insertamos el punto y coma todo está bien:

```js run
let user = {
  name: "John",
  go: function() { alert(this.name) }
}*!*;*/!*

(user.go)() // John
```

Tenga en cuenta que los paréntesis alrededor de `(user.go)` no hacen nada aquí. Usualmente son configurados para ordenar las operaciones, pero aquí el punto `.` funciona primero de todas formas, por lo que no tienen ningún efecto en él. Solamente el punto y coma importa.
