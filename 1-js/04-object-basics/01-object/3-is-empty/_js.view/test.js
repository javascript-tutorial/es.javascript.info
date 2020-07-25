describe("isEmpty", function() {
  it("retorna true para un objeto vacío", function() {
    assert.isTrue(isEmpty({}));
  });

  it("retorna false si existe una propiedad", function() {
    assert.isFalse(isEmpty({
      anything: false
    }));
  });
});