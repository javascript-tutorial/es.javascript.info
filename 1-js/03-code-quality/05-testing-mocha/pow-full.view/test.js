describe("pow", function() {

  describe("eleva x a la potencia 3", function() {

    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} elevado a 3 es ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });
    }

    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }

  });

  it("si n es negativo, el resultado es NaN", function() {
    assert.isNaN(pow(2, -1));
  });

  it("si n no es un entero, el resultado es NaN", function() {
    assert.isNaN(pow(2, 1.5));
  });

});
