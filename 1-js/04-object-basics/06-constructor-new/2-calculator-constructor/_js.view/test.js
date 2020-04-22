
describe("calculator", function() {
  let calculator;
  before(function() {
    sinon.stub(window, "prompt")

    prompt.onCall(0).returns("2");
    prompt.onCall(1).returns("3");

    calculator = new Calculator();
    calculator.read();
  });

  it("cuando se ingresa 2 y 3, la suma es 5", function() {
    assert.equal(calculator.sum(), 5);
  });

  it("cuandose ingresa 2 y 3, el producto es 6", function() {
    assert.equal(calculator.mul(), 6);
  });

  after(function() {
    prompt.restore();
  });
});
