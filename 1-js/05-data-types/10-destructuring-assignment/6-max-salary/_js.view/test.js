describe("topSalary", function() {
  it("devuelvo persona mejor pagada", function() {
    let salaries = {
      "John": 100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal( topSalary(salaries), "Pete" );
  });

  it("devuelve null para objeto vacío", function() {
    assert.isNull( topSalary({}) );
  });
});