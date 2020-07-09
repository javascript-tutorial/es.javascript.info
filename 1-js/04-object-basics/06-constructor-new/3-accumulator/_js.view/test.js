describe("Accumulator", function() {

  beforeEach(function() {
    sinon.stub(window, "prompt")
  });

  afterEach(function() {
    prompt.restore();
  });

  it("valor inicial es el argumento del constructor", function() {
    let accumulator = new Accumulator(1);

    assert.equal(accumulator.value, 1);
  });

  it("después de leer 0, el valor es 1", function() {
    let accumulator = new Accumulator(1);
    prompt.returns("0");
    accumulator.read();
    assert.equal(accumulator.value, 1);
  });

  it("después de leer 1, el valor es 2", function() {
    let accumulator = new Accumulator(1);
    prompt.returns("1");
    accumulator.read();
    assert.equal(accumulator.value, 2);
  });
});