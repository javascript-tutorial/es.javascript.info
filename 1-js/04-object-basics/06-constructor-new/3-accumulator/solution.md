

```js run demo
function Accumulator(valorInicial) {
  this.value = valorInicial;

  this.read = function() {
    this.value += +prompt('Cuánto más agregar?', 0);
  };

}

let accumulator = new Accumulator(1);
accumulator.read();
accumulator.read();
alert(accumulator.value);
```
