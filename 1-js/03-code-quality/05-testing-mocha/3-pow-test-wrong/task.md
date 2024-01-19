importance: 5

---

# ¿Qué está mal en el test?

¿Qué es incorrecto en la prueba de `pow` que aparece a continuación?

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

P.S. La prueba es sintácticamente correcta y la supera.
