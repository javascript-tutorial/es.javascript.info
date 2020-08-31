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
>>>>>>> 0bfebb4b46b4b5f9c221915ab8b1e2de9bdc013d

  this.addMethod = function(name, func) {
    this.methods[name] = func;
  };
}
