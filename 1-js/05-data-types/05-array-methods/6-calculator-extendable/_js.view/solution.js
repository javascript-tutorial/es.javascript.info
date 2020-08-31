function Calculator() {

  this.methods = {
    "-": (a, b) => a - b,
    "+": (a, b) => a + b
  };

  this.calculate = function(str) {

    let split = str.split(' '),
      a = +split[0],
      op = split[1],
      b = +split[2];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
<<<<<<< HEAD
  }
=======
  };
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}
