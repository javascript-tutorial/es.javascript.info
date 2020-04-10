El test demuestra una tentación habitual del/a desarrollador/a al escribir tests.

Lo que tenemos aquí son en realidad 3 pruebas, pero presentadas como una sola función con 3 afirmaciones.

A veces es más fácil escribir de esta manera, pero si ocurre un error, es mucho menos obvio saber qué salió mal.

Sería mucho mejor dividir la prueba en múltiples bloques 'it' con entradas y salidas claramente escritas.

Como ésto:
```js
describe("Eleva x a la potencia n", function() {
  it("5 elevado a 1 es igual a 5", function() {
    assert.equal(pow(5, 1), 5);
  });

  it("5 elevado a 2 es igual a 25", function() {
    assert.equal(pow(5, 2), 25);
  });

  it("5 elevado a 3 es igual a 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```

Reemplazamos el único `it` por un `describe` y agrupamos los bloques `it` dentro. Ahora si algo sale mal, podemos ver claramente que dato fue.

Además podemos aislar un único test y ejecutarlo individualmente escribiendo `it.only` en lugar de `it`:


```js
describe("Raises x to power n", function() {
  it("5 elevado a 1 es igual a 5", function() {
    assert.equal(pow(5, 1), 5);
  });

*!*
  // Mocha sólo ejecutará este bloque
  it.only("5 elevado a 2 es igual a 25", function() {
    assert.equal(pow(5, 2), 25);
  });
*/!*

  it("5 elevado a 3 es igual a 125", function() {
    assert.equal(pow(5, 3), 125);
  });
});
```
