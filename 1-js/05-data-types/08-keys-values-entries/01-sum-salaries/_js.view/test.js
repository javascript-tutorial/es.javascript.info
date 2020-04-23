describe("sumSalaries", function() {
  it("devuelve suma de salarios", function() {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal( sumSalaries(salaries), 650 );
  });

  it("devuelve 0 para el objeto vacío", function() {
    assert.strictEqual( sumSalaries({}), 0);
  });
});