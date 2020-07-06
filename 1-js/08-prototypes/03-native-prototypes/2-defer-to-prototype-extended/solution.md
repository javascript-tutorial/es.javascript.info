

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

// revisalo
function f(a, b) {
  alert( a + b );
}

f.defer(1000)(1, 2); // muestra 3 despues de 1 seg
```

Tenga en cuenta: utilizamos `this` en `f.apply` para que nuestro decorado funcione para los métodos de objetos.

Entonces, si la función contenedora es llamada como método de objeto, `this` se pasa al método original `f`.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```

Please note: we use `this` in `f.apply` to make our decoration work for object methods.

So if the wrapper function is called as an object method, then `this` is passed to the original method `f`.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```

Please note: we use `this` in `f.apply` to make our decoration work for object methods.

So if the wrapper function is called as an object method, then `this` is passed to the original method `f`.

```js run
Function.prototype.defer = function(ms) {
  let f = this;
  return function(...args) {
    setTimeout(() => f.apply(this, args), ms);
  }
};

let user = {
  name: "John",
  sayHi() {
    alert(this.name);
  }
}

user.sayHi = user.sayHi.defer(1000);

user.sayHi();
```
