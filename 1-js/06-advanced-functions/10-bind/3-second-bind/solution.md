Respuesta: **John**.

```js run no-beautify
function f() {
  alert(this.name);
}

f = f.bind( {name: "John"} ).bind( {name: "Pete"} );

f(); // John
```

El objeto exótico [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects) devuelto por `f.bind(...)` recuerda el contexto (y los argumentos si se proporcionan) solo en el momento de la creación.

Una función no se puede volver a vincular.
