importance: 5

---

# ¿Qué esta mal en el test?

¿Qué es incorrecto en el test de `pow` de abajo?

```js
it("Eleva x a la potencia n", function() {
  let x = 5;

  let result = x;
  assert.equal(pow(x, 1), result);

  result *= x;
  assert.equal(pow(x, 2), result);

  result *= x;
  assert.equal(pow(x, 3), result);
});
```

P.S. El test es sintácticamente correcto y pasa.
