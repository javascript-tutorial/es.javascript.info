describe("count", function() {
  it("cuenta el número de propiedades", function() {
    assert.equal( count({a: 1, b: 2}), 2 );
  });

  it("devuelve 0 para un objeto vacío", function() {
    assert.equal( count({}), 0 );
  });

  it("ignora propiedades simbólicas", function() {
    assert.equal( count({ [Symbol('id')]: 1 }), 0 );
  });
});