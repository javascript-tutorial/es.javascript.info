importance: 5

---

# La diferencia entre llamadas

Creemos un nuevo objeto `rabbit`:

```js
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.sayHi = function() {
  alert(this.name);
};

let rabbit = new Rabbit("Conejo");
```

Estas llamadas hacen lo mismo o no?

```js
rabbit.sayHi();
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();
```
