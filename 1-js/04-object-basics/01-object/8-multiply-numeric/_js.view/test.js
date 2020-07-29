describe("multiplyNumeric", function() {
  it("multiplicar todas las propiedades numéricas por 2", function() {
    let menu = {
      width: 200,
      height: 300,
      title: "Mi menú"
    };
    let result = multiplyNumeric(menu);
    assert.equal(menu.width, 400);
    assert.equal(menu.height, 600);
    assert.equal(menu.title, "Mi menú");
  });

  it("No devuelve nada", function() {
    assert.isUndefined( multiplyNumeric({}) );
  });

});
