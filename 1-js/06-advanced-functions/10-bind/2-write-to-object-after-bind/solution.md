Respuesta: `null`.


```js run
function f() {
  alert( this ); // null
}

let user = {
  g: f.bind(null)
};

user.g();
```

El contexto de una función enlazada es fijo. Simplemente no hay forma de cambiarlo más.

Entonces, incluso mientras ejecutamos `user.g()`, la función original se llama con `this = null`.
