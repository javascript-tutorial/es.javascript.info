function Accumulator(valorInicial) {
  this.value = valorInicial;

  this.read = function() {
    this.value += +prompt('Cuánto agregar?', 0);
  };

}