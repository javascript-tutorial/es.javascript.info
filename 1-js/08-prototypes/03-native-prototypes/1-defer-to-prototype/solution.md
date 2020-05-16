

```js run
Function.prototype.defer = function(ms) {
  setTimeout(this, ms);
};

function f() {
  alert("Hola!");
}

f.defer(1000); // muestra "Hola!" despues de 1 seg
```
